// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Settings - GlideVault Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Gauge, Keyboard, PlaneTakeoff, RotateCcw, Save, Volume2, X } from "lucide-react";


export type GameSettingsGlidevaultLiteActionId = "return-to-game-1" | "normal-2" | "hard-3" | "ace-4" | "save-preferences-5" | "reset-to-default-6";

export interface GameSettingsGlidevaultLiteProps {
  actions?: Partial<Record<GameSettingsGlidevaultLiteActionId, () => void>>;

}

export function GameSettingsGlidevaultLite({ actions }: GameSettingsGlidevaultLiteProps) {
  return (
    <>
      {/* Background Gameplay Blur Canvas */}
      <div className="absolute inset-0 z-0 bg-[url('image-gameplay-bg')] bg-cover bg-center opacity-30 blur-sm" data-alt="A high-speed, futuristic neon-noir race track zooming through a digital cityscape. Deep contrasts of obsidian blacks and bright cyan highlights. The scene is slightly blurred to simulate motion and act as a background canvas for a user interface."></div>
      {/* Main Settings Modal */}
      <main className="relative z-10 w-full max-w-2xl bg-surface-container-lowest/80 backdrop-blur-xl border border-primary/30 p-8 flex flex-col gap-8 neon-border">
      <div className="data-bit hidden md:block"></div>
      <div className="absolute bottom-[-1px] left-[-1px] w-8 h-8 border-b-2 border-l-2 border-primary hidden md:block"></div>
      {/* Header */}
      <header className="flex justify-between items-center border-b border-primary/20 pb-4">
      <div>
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase italic tracking-tighter neon-text">
                          SYSTEM CALIBRATION
                      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Adjust GlideVault Parameters</p>
      </div>
      <button className="text-primary hover:text-primary-fixed hover:bg-primary/10 p-2 rounded transition-colors group flex items-center gap-2" type="button" data-action-id="return-to-game-1" onClick={actions?.["return-to-game-1"]}>
      <span className="font-label-caps text-label-caps uppercase hidden md:inline">Return to Game</span>
      <X  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
      </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Core Settings */}
      <div className="flex flex-col gap-6">
      {/* Difficulty Section */}
      <section>
      <h2 className="font-label-caps text-label-caps text-primary mb-3 uppercase flex items-center gap-2">
      <Gauge className="text-sm" aria-hidden={true} focusable="false" />
                              Difficulty Protocol
                          </h2>
      <div className="flex bg-surface-variant/50 p-1 rounded-sm border border-outline-variant">
      <button className="flex-1 py-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" type="button" data-action-id="normal-2" onClick={actions?.["normal-2"]}>NORMAL</button>
      <button className="flex-1 py-2 font-label-caps text-label-caps text-surface-container-lowest bg-primary shadow-[0_0_10px_rgba(0,242,255,0.3)]" type="button" data-action-id="hard-3" onClick={actions?.["hard-3"]}>HARD</button>
      <button className="flex-1 py-2 font-label-caps text-label-caps text-on-surface-variant hover:text-error transition-colors" type="button" data-action-id="ace-4" onClick={actions?.["ace-4"]}>ACE</button>
      </div>
      </section>
      {/* Speed/Sensitivity Section */}
      <section>
      <div className="flex justify-between items-end mb-3">
      <h2 className="font-label-caps text-label-caps text-primary uppercase flex items-center gap-2">
      <PlaneTakeoff className="text-sm" aria-hidden={true} focusable="false" />
                                  Glider Sensitivity
                              </h2>
      <span className="font-hud-data text-hud-data text-secondary">0.85</span>
      </div>
      <input className="w-full appearance-none bg-transparent" max="100" min="0" type="range" defaultValue="85" />
      </section>
      {/* Audio Section */}
      <section className="space-y-4">
      <h2 className="font-label-caps text-label-caps text-primary uppercase flex items-center gap-2 mb-2">
      <Volume2 className="text-sm" aria-hidden={true} focusable="false" />
                              Audio Output
                          </h2>
      <div>
      <div className="flex justify-between mb-1">
      <label className="font-body-md text-body-md text-on-surface-variant text-sm">SFX Volumetric</label>
      <span className="font-hud-data text-hud-data text-primary text-sm">90%</span>
      </div>
      <input className="w-full appearance-none bg-transparent" max="100" min="0" type="range" defaultValue="90" />
      </div>
      <div>
      <div className="flex justify-between mb-1">
      <label className="font-body-md text-body-md text-on-surface-variant text-sm">Music Sync</label>
      <span className="font-hud-data text-hud-data text-primary text-sm">60%</span>
      </div>
      <input className="w-full appearance-none bg-transparent" max="100" min="0" type="range" defaultValue="60" />
      </div>
      </section>
      </div>
      {/* Right Column: Info & Actions */}
      <div className="flex flex-col gap-6 justify-between border-t md:border-t-0 md:border-l border-primary/20 pt-6 md:pt-0 md:pl-8">
      {/* Input Help Panel */}
      <section className="bg-primary/5 border border-primary/20 p-4 relative">
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary"></div>
      <h2 className="font-label-caps text-label-caps text-primary uppercase mb-4 flex items-center gap-2">
      <Keyboard className="text-sm" aria-hidden={true} focusable="false" />
                              Input Diagnostics
                          </h2>
      <ul className="space-y-3 font-body-md text-body-md text-sm text-on-surface">
      <li className="flex justify-between items-center">
      <span className="text-on-surface-variant">Thrust / Brake</span>
      <div className="flex gap-1">
      <kbd className="px-2 py-1 bg-surface-bright border border-outline-variant text-primary rounded-sm font-hud-data">W</kbd>
      <kbd className="px-2 py-1 bg-surface-bright border border-outline-variant text-primary rounded-sm font-hud-data">S</kbd>
      </div>
      </li>
      <li className="flex justify-between items-center">
      <span className="text-on-surface-variant">Bank Left / Right</span>
      <div className="flex gap-1">
      <kbd className="px-2 py-1 bg-surface-bright border border-outline-variant text-primary rounded-sm font-hud-data">A</kbd>
      <kbd className="px-2 py-1 bg-surface-bright border border-outline-variant text-primary rounded-sm font-hud-data">D</kbd>
      </div>
      </li>
      <li className="flex justify-between items-center">
      <span className="text-on-surface-variant">Pause Sync</span>
      <kbd className="px-2 py-1 bg-surface-bright border border-outline-variant text-error rounded-sm font-hud-data">ESC</kbd>
      </li>
      </ul>
      </section>
      {/* Actions */}
      <div className="flex flex-col gap-3 mt-auto">
      <button className="w-full py-3 border border-primary bg-transparent text-primary font-label-caps text-label-caps uppercase hover:bg-primary hover:text-surface-container-lowest transition-colors duration-300 relative group overflow-hidden" type="button" data-action-id="save-preferences-5" onClick={actions?.["save-preferences-5"]}>
      <span className="relative z-10 flex items-center justify-center gap-2">
      <Save className="text-sm" aria-hidden={true} focusable="false" />
                                  SAVE PREFERENCES
                              </span>
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
      </button>
      <button className="w-full py-2 text-on-surface-variant hover:text-error font-label-caps text-label-caps text-xs uppercase flex items-center justify-center gap-2 transition-colors" type="button" data-action-id="reset-to-default-6" onClick={actions?.["reset-to-default-6"]}>
      <RotateCcw  style={{fontVariationSettings: "'FILL' 0"}} className="text-sm" aria-hidden={true} focusable="false" />
                              RESET TO DEFAULT
                          </button>
      </div>
      </div>
      </div>
      </main>
    </>
  );
}
