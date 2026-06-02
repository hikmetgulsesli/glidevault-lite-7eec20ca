import type {
  GlideVaultAppActions,
  GlideVaultAppState,
} from '../features/glidevault-lite/glidevault-lite.store';

export interface GlideVaultTestBridge {
  state: GlideVaultAppState;
  actions: GlideVaultAppActions;
}

export function getGlideVaultTestBridge(): GlideVaultTestBridge | undefined {
  return globalThis.app;
}

declare global {
  var app: GlideVaultTestBridge | undefined;

  interface Window {
    app?: GlideVaultTestBridge;
  }
}
