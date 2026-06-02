import { useEffect, useMemo, useReducer } from 'react';
import {
  createInitialGlideVaultState,
  boostGlideVaultPlayer,
  moveGlideVaultPlayer,
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
  | { type: 'move-left' }
  | { type: 'move-right' }
  | { type: 'boost' }
  | { type: 'set-visible-screen'; visibleScreen: GlideVaultVisibleScreen }
  | { type: 'set-difficulty'; difficulty: GlideVaultDifficulty }
  | { type: 'reset-preferences' }
  | { type: 'storage-result'; storageStatus: GlideVaultStorageStatus; lastError: string | null };

export type GlideVaultVisibleScreen = 'gameplay' | 'settings';
export type GlideVaultStatus = 'menu' | 'running' | 'paused' | 'game-over';
export type GlideVaultStorageStatus = 'idle' | 'loaded' | 'saved' | 'error';

export interface GlideVaultAppState {
  engine: GlideVaultRuntimeState;
  runtime: GlideVaultRuntimeSnapshot;
  preferences: {
    difficulty: GlideVaultDifficulty;
  };
  visibleScreen: GlideVaultVisibleScreen;
  status: GlideVaultStatus;
  gameOver: boolean;
  storageStatus: GlideVaultStorageStatus;
  lastError: string | null;
}

export interface GlideVaultAppActions {
  startEngine: () => void;
  togglePause: () => void;
  restart: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  boost: () => void;
  setVisibleScreen: (visibleScreen: GlideVaultVisibleScreen) => void;
  setDifficulty: (difficulty: GlideVaultDifficulty) => void;
  savePreferences: () => void;
  resetToDefault: () => void;
}

function getStatus(engine: GlideVaultRuntimeState): GlideVaultStatus {
  if (engine.lives <= 0 || engine.energy <= 0) {
    return 'game-over';
  }

  if (!engine.running) {
    return 'menu';
  }

  return engine.paused ? 'paused' : 'running';
}

function getGameOver(engine: GlideVaultRuntimeState): boolean {
  return getStatus(engine) === 'game-over';
}

function hydrateState(): GlideVaultAppState {
  const preferences = loadGlideVaultPreferences();
  const engine = createInitialGlideVaultState(preferences.difficulty);

  return {
    engine,
    runtime: toGlideVaultRuntimeSnapshot(engine),
    preferences,
    visibleScreen: 'gameplay',
    status: getStatus(engine),
    gameOver: getGameOver(engine),
    storageStatus: 'loaded',
    lastError: null,
  };
}

function withEngine(
  state: GlideVaultAppState,
  engine: GlideVaultRuntimeState,
  overrides: Partial<Pick<GlideVaultAppState, 'visibleScreen' | 'storageStatus' | 'lastError'>> = {},
): GlideVaultAppState {
  return {
    engine,
    runtime: toGlideVaultRuntimeSnapshot(engine),
    preferences: { difficulty: engine.difficulty },
    visibleScreen: overrides.visibleScreen ?? state.visibleScreen,
    status: getStatus(engine),
    gameOver: getGameOver(engine),
    storageStatus: overrides.storageStatus ?? state.storageStatus,
    lastError: overrides.lastError ?? state.lastError,
  };
}

function reducer(state: GlideVaultAppState, action: StoreAction): GlideVaultAppState {
  switch (action.type) {
    case 'start':
      return withEngine(state, startGlideVaultEngine(state.engine), { visibleScreen: 'gameplay' });
    case 'toggle-pause':
      return withEngine(state, toggleGlideVaultPause(state.engine));
    case 'restart':
      return withEngine(state, startGlideVaultEngine(createInitialGlideVaultState(state.preferences.difficulty)), {
        visibleScreen: 'gameplay',
      });
    case 'tick':
      return withEngine(state, stepGlideVaultRuntime(state.engine));
    case 'move-left':
      if (state.visibleScreen !== 'gameplay') {
        return state;
      }
      return withEngine(state, moveGlideVaultPlayer(state.engine, -1));
    case 'move-right':
      if (state.visibleScreen !== 'gameplay') {
        return state;
      }
      return withEngine(state, moveGlideVaultPlayer(state.engine, 1));
    case 'boost':
      if (state.visibleScreen !== 'gameplay') {
        return state;
      }
      return withEngine(state, boostGlideVaultPlayer(state.engine));
    case 'set-visible-screen':
      return {
        ...state,
        visibleScreen: action.visibleScreen,
      };
    case 'set-difficulty':
      return withEngine(state, setGlideVaultDifficulty(state.engine, action.difficulty));
    case 'reset-preferences':
      return withEngine(state, createInitialGlideVaultState(clearGlideVaultPreferences().difficulty), {
        storageStatus: 'idle',
        lastError: null,
      });
    case 'storage-result':
      return {
        ...state,
        storageStatus: action.storageStatus,
        lastError: action.lastError,
      };
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
      moveLeft: () => dispatch({ type: 'move-left' }),
      moveRight: () => dispatch({ type: 'move-right' }),
      boost: () => dispatch({ type: 'boost' }),
      setVisibleScreen: (visibleScreen) => dispatch({ type: 'set-visible-screen', visibleScreen }),
      setDifficulty: (difficulty) => dispatch({ type: 'set-difficulty', difficulty }),
      savePreferences: () => {
        try {
          saveGlideVaultPreferences({ difficulty: state.preferences.difficulty });
          dispatch({ type: 'storage-result', storageStatus: 'saved', lastError: null });
        } catch (error) {
          dispatch({
            type: 'storage-result',
            storageStatus: 'error',
            lastError: error instanceof Error ? error.message : 'Unable to save preferences',
          });
        }
      },
      resetToDefault: () => dispatch({ type: 'reset-preferences' }),
    }),
    [state.preferences.difficulty],
  );

  return { state, actions };
}
