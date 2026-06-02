export type GlideVaultDifficulty = 'normal' | 'hard' | 'ace';

export interface GlideVaultEntity {
  lane: number;
  position: number;
}

export interface GlideVaultRuntimeState {
  player: GlideVaultEntity;
  obstacles: GlideVaultEntity[];
  shards: GlideVaultEntity[];
  score: number;
  energy: number;
  lives: number;
  paused: boolean;
  running: boolean;
  difficulty: GlideVaultDifficulty;
}

export interface GlideVaultRuntimeSnapshot {
  player: GlideVaultEntity;
  obstacles: GlideVaultEntity[];
  shards: GlideVaultEntity[];
  score: number;
  energy: number;
  lives: number;
  paused: boolean;
}

const difficultySpeed: Record<GlideVaultDifficulty, number> = {
  normal: 6,
  hard: 9,
  ace: 12,
};

export function createInitialGlideVaultState(
  difficulty: GlideVaultDifficulty = 'normal',
): GlideVaultRuntimeState {
  return {
    player: { lane: 1, position: 18 },
    obstacles: [
      { lane: 0, position: 78 },
      { lane: 2, position: 122 },
    ],
    shards: [
      { lane: 1, position: 54 },
      { lane: 0, position: 136 },
    ],
    score: 0,
    energy: 100,
    lives: 3,
    paused: true,
    running: false,
    difficulty,
  };
}

export function startGlideVaultEngine(state: GlideVaultRuntimeState): GlideVaultRuntimeState {
  return {
    ...state,
    paused: false,
    running: true,
  };
}

export function toggleGlideVaultPause(state: GlideVaultRuntimeState): GlideVaultRuntimeState {
  if (!state.running) {
    return startGlideVaultEngine(state);
  }

  return {
    ...state,
    paused: !state.paused,
  };
}

export function setGlideVaultDifficulty(
  state: GlideVaultRuntimeState,
  difficulty: GlideVaultDifficulty,
): GlideVaultRuntimeState {
  return {
    ...createInitialGlideVaultState(difficulty),
    paused: state.paused,
    running: state.running,
  };
}

export function stepGlideVaultRuntime(state: GlideVaultRuntimeState): GlideVaultRuntimeState {
  if (!state.running || state.paused || state.lives <= 0) {
    return state;
  }

  const speed = difficultySpeed[state.difficulty];
  const wrap = (entity: GlideVaultEntity, offset: number): GlideVaultEntity => ({
    lane: entity.lane,
    position: entity.position - speed <= -12 ? 140 + offset : entity.position - speed,
  });

  const nextEnergy = Math.max(0, state.energy - (state.difficulty === 'ace' ? 3 : 2));

  return {
    ...state,
    obstacles: state.obstacles.map((entity, index) => wrap(entity, index * 38)),
    shards: state.shards.map((entity, index) => wrap(entity, 18 + index * 34)),
    score: state.score + speed * 10,
    energy: nextEnergy,
    lives: nextEnergy === 0 ? Math.max(0, state.lives - 1) : state.lives,
    paused: nextEnergy === 0,
    running: nextEnergy > 0,
  };
}

export function toGlideVaultRuntimeSnapshot(
  state: GlideVaultRuntimeState,
): GlideVaultRuntimeSnapshot {
  return {
    player: state.player,
    obstacles: state.obstacles,
    shards: state.shards,
    score: state.score,
    energy: state.energy,
    lives: state.lives,
    paused: state.paused,
  };
}
