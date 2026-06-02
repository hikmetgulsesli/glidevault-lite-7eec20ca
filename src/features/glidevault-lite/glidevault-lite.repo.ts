import {
  defaultGlideVaultPreferences,
  type GlideVaultPreferences,
} from '../../__fixtures__/glidevault-lite.fixture';

const storageKey = 'glidevault-lite.preferences';

export function loadGlideVaultPreferences(): GlideVaultPreferences {
  if (typeof window === 'undefined') {
    return defaultGlideVaultPreferences;
  }

  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) {
      return defaultGlideVaultPreferences;
    }

    const parsed = JSON.parse(value) as Partial<GlideVaultPreferences>;
    if (parsed.difficulty === 'normal' || parsed.difficulty === 'hard' || parsed.difficulty === 'ace') {
      return { difficulty: parsed.difficulty };
    }
  } catch {
    return defaultGlideVaultPreferences;
  }

  return defaultGlideVaultPreferences;
}

export function saveGlideVaultPreferences(preferences: GlideVaultPreferences): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(preferences));
}

export function clearGlideVaultPreferences(): GlideVaultPreferences {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(storageKey);
  }

  return defaultGlideVaultPreferences;
}
