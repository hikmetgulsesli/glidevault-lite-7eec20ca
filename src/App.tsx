import { useEffect, useMemo, useState } from 'react';
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

type AppView = 'gameplay' | 'settings';

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
  const [view, setView] = useState<AppView>('gameplay');

  useEffect(() => {
    window.app = { state, actions };
    globalThis.app = { state, actions };
  }, [state, actions]);

  const gameplayActions = useMemo<Partial<Record<GameplayGlidevaultLiteActionId, () => void>>>(
    () => ({
      'start-engine-1': actions.startEngine,
      'pause-2': actions.togglePause,
      'settings-3': () => setView('settings'),
      'restart-alt-4': actions.restart,
    }),
    [actions],
  );

  const settingsActions = useMemo<Partial<Record<GameSettingsGlidevaultLiteActionId, () => void>>>(
    () => ({
      'return-to-game-1': () => setView('gameplay'),
      'normal-2': () => actions.setDifficulty('normal'),
      'hard-3': () => actions.setDifficulty('hard'),
      'ace-4': () => actions.setDifficulty('ace'),
      'save-preferences-5': () => {
        actions.savePreferences();
        setView('gameplay');
      },
      'reset-to-default-6': actions.resetToDefault,
    }),
    [actions],
  );

  return (
    <div data-setfarm-root="glidevault-lite" data-testid="setfarm-app-root" className="min-h-screen">
      {view === 'settings' ? (
        <GameSettingsGlidevaultLite actions={settingsActions} />
      ) : (
        <GameplayGlidevaultLite actions={gameplayActions} runtime={state.runtime} />
      )}
    </div>
  );
}
