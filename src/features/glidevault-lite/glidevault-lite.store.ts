import { useEffect, useMemo, useReducer } from 'react';
import {
  createInitialGlideVaultState,
  setGlideVaultDifficulty,
  startGlideVaultEngine,
  stepGlideVaultRuntime,
  toggleGlideVaultPause,
  toGlideVaultRuntimeSnapshot,
  type GlideVaultDifficulty,
  type GlideVaultRuntimeSnapshot,
  type GlideVaultRuntimeState,
} from '../../game/game-runtime';
import {
  clearGlideVaultPreferences,
  loadGlideVaultPreferences,
  saveGlideVaultPreferences,
} from './glidevault-lite.repo';

type StoreAction =
  | { type: 'start' }
  | { type: 'toggle-pause' }
  | { type: 'restart' }
  | { type: 'tick' }
  | { type: 'set-difficulty'; difficulty: GlideVaultDifficulty }
  | { type: 'reset-preferences' };

export interface GlideVaultAppState {
  engine: GlideVaultRuntimeState;
  runtime: GlideVaultRuntimeSnapshot;
  preferences: {
    difficulty: GlideVaultDifficulty;
  };
}

export interface GlideVaultAppActions {
  startEngine: () => void;
  togglePause: () => void;
  restart: () => void;
  setDifficulty: (difficulty: GlideVaultDifficulty) => void;
  savePreferences: () => void;
  resetToDefault: () => void;
}

function hydrateState(): GlideVaultAppState {
  const preferences = loadGlideVaultPreferences();
  const engine = createInitialGlideVaultState(preferences.difficulty);

  return {
    engine,
    runtime: toGlideVaultRuntimeSnapshot(engine),
    preferences,
  };
}

function withEngine(engine: GlideVaultRuntimeState): GlideVaultAppState {
  return {
    engine,
    runtime: toGlideVaultRuntimeSnapshot(engine),
    preferences: { difficulty: engine.difficulty },
  };
}

function reducer(state: GlideVaultAppState, action: StoreAction): GlideVaultAppState {
  switch (action.type) {
    case 'start':
      return withEngine(startGlideVaultEngine(state.engine));
    case 'toggle-pause':
      return withEngine(toggleGlideVaultPause(state.engine));
    case 'restart':
      return withEngine(startGlideVaultEngine(createInitialGlideVaultState(state.preferences.difficulty)));
    case 'tick':
      return withEngine(stepGlideVaultRuntime(state.engine));
    case 'set-difficulty':
      return withEngine(setGlideVaultDifficulty(state.engine, action.difficulty));
    case 'reset-preferences':
      return withEngine(createInitialGlideVaultState(clearGlideVaultPreferences().difficulty));
    default:
      return state;
  }
}

export function useGlideVaultLiteStore() {
  const [state, dispatch] = useReducer(reducer, undefined, hydrateState);

  useEffect(() => {
    if (!state.engine.running || state.engine.paused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => dispatch({ type: 'tick' }), 700);
    return () => window.clearInterval(intervalId);
  }, [state.engine.paused, state.engine.running]);

  const actions = useMemo<GlideVaultAppActions>(
    () => ({
      startEngine: () => dispatch({ type: 'start' }),
      togglePause: () => dispatch({ type: 'toggle-pause' }),
      restart: () => dispatch({ type: 'restart' }),
      setDifficulty: (difficulty) => dispatch({ type: 'set-difficulty', difficulty }),
      savePreferences: () => saveGlideVaultPreferences({ difficulty: state.preferences.difficulty }),
      resetToDefault: () => dispatch({ type: 'reset-preferences' }),
    }),
    [state.preferences.difficulty],
  );

  return { state, actions };
}
