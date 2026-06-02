import type { GameplayGlidevaultLiteActionId } from '../../screens';

export const START_GAME_ACTION_ID = 'start-engine-1' satisfies GameplayGlidevaultLiteActionId;

export function actStartGame(actions?: Partial<Record<GameplayGlidevaultLiteActionId, () => void>>) {
  actions?.[START_GAME_ACTION_ID]?.();
}
