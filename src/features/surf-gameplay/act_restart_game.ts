import type { GameplayGlidevaultLiteActionId } from '../../screens';

export const RESTART_GAME_ACTION_ID = 'restart-alt-4' satisfies GameplayGlidevaultLiteActionId;

export function actRestartGame(actions?: Partial<Record<GameplayGlidevaultLiteActionId, () => void>>) {
  actions?.[RESTART_GAME_ACTION_ID]?.();
}
