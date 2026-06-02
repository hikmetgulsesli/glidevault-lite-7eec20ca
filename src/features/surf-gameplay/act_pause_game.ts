import type { GameplayGlidevaultLiteActionId } from '../../screens';

export const PAUSE_GAME_ACTION_ID = 'pause-2' satisfies GameplayGlidevaultLiteActionId;

export function actPauseGame(actions?: Partial<Record<GameplayGlidevaultLiteActionId, () => void>>) {
  actions?.[PAUSE_GAME_ACTION_ID]?.();
}
