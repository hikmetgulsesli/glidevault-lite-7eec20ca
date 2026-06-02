import type { GlideVaultDifficulty } from '../game/game-runtime';

export interface GlideVaultPreferences {
  difficulty: GlideVaultDifficulty;
}

export const defaultGlideVaultPreferences: GlideVaultPreferences = {
  difficulty: 'normal',
};
