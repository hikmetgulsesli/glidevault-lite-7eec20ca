import { useEffect, useMemo } from 'react';
import {
  GameSettingsGlidevaultLite,
  GameplayGlidevaultLite,
  type GameSettingsGlidevaultLiteActionId,
  type GameplayGlidevaultLiteActionId,
} from './screens';
import {
  useGlideVaultLiteStore,
  type GlideVaultAppActions,
  type GlideVaultAppState,
} from './features/glidevault-lite/glidevault-lite.store';
import { PAUSE_GAME_ACTION_ID } from './features/surf-gameplay/act_pause_game';
import { RESTART_GAME_ACTION_ID } from './features/surf-gameplay/act_restart_game';
import { START_GAME_ACTION_ID } from './features/surf-gameplay/act_start_game';

declare global {
  var app:
    | {
        state: GlideVaultAppState;
        actions: GlideVaultAppActions;
      }
    | undefined;

  interface Window {
    app?: {
      state: GlideVaultAppState;
      actions: GlideVaultAppActions;
    };
  }
}

export default function App() {
  const { state, actions } = useGlideVaultLiteStore();
  const gameplayInputActive = state.visibleScreen === 'gameplay' && state.status === 'running';

  useEffect(() => {
    window.app = { state, actions };
    globalThis.app = { state, actions };
  }, [state, actions]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!gameplayInputActive) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        actions.moveLeft();
      }

      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        actions.moveRight();
      }

      if (event.key === 'ArrowUp' || event.key === ' ' || event.key.toLowerCase() === 'w') {
        event.preventDefault();
        actions.boost();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [actions, gameplayInputActive]);

  const gameplayActions = useMemo<Partial<Record<GameplayGlidevaultLiteActionId, () => void>>>(
    () => ({
      [START_GAME_ACTION_ID]: actions.startEngine,
      [PAUSE_GAME_ACTION_ID]: actions.togglePause,
      'settings-3': () => actions.setVisibleScreen('settings'),
      [RESTART_GAME_ACTION_ID]: actions.restart,
    }),
    [actions],
  );

  const settingsActions = useMemo<Partial<Record<GameSettingsGlidevaultLiteActionId, () => void>>>(
    () => ({
      'return-to-game-1': () => actions.setVisibleScreen('gameplay'),
      'normal-2': () => actions.setDifficulty('normal'),
      'hard-3': () => actions.setDifficulty('hard'),
      'ace-4': () => actions.setDifficulty('ace'),
      'save-preferences-5': () => {
        actions.savePreferences();
        actions.setVisibleScreen('gameplay');
      },
      'reset-to-default-6': actions.resetToDefault,
    }),
    [actions],
  );

  return (
    <div data-setfarm-root="glidevault-lite" data-testid="setfarm-app-root" className="min-h-screen">
      <style>{`
        [data-setfarm-root="glidevault-lite"] [data-alt^="A high-speed, futuristic neon-noir race track"] {
          background-position: center;
          background-repeat: repeat;
          background-size: 100% 100%;
        }
      `}</style>
      {state.visibleScreen === 'settings' ? (
        <GameSettingsGlidevaultLite actions={settingsActions} />
      ) : (
        <>
          <GameplayGlidevaultLite actions={gameplayActions} runtime={state.runtime} />
          <div className="glidevault-touch-controls" data-testid="glidevault-touch-controls">
            <button
              type="button"
              className="glidevault-touch-button"
              disabled={!gameplayInputActive}
              aria-label="Move left"
              onClick={actions.moveLeft}
            >
              Left
            </button>
            <button
              type="button"
              className="glidevault-touch-button glidevault-touch-button--primary"
              disabled={!gameplayInputActive}
              aria-label="Boost"
              onClick={actions.boost}
            >
              Boost
            </button>
            <button
              type="button"
              className="glidevault-touch-button"
              disabled={!gameplayInputActive}
              aria-label="Move right"
              onClick={actions.moveRight}
            >
              Right
            </button>
          </div>
        </>
      )}
    </div>
  );
}
