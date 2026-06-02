// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Gameplay - GlideVault Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Key, Pause, RotateCcw, Settings } from "lucide-react";


export type GameplayGlidevaultLiteActionId = "start-engine-1" | "pause-2" | "settings-3" | "restart-alt-4";

export interface GameplayGlidevaultLiteProps {
  actions?: Partial<Record<GameplayGlidevaultLiteActionId, () => void>>;
  runtime?: { player?: { lane?: number; position?: number }; obstacles?: Array<{ lane?: number; position?: number }>; shards?: Array<{ lane?: number; position?: number }>; score?: number; energy?: number; lives?: number; paused?: boolean; running?: boolean; difficulty?: string };

}

export function GameplayGlidevaultLite({ actions, runtime }: GameplayGlidevaultLiteProps) {
  const score = runtime?.score ?? 0;
  const highScore = Math.max(140999, score);
  const energy = Math.max(0, Math.min(100, runtime?.energy ?? 100));
  const lives = Math.max(0, runtime?.lives ?? 3);
  const playerLane = Math.max(0, Math.min(2, runtime?.player?.lane ?? 1));
  const playerPosition = Math.max(0, Math.min(100, runtime?.player?.position ?? 18));
  const isRunning = runtime?.running === true && runtime?.paused !== true;
  const engineStateLabel = runtime?.running ? (runtime.paused ? "Paused" : "Run Active") : "System Ready";
  const startCopy = runtime?.running ? "Resume Run" : "Start Engine";
  const energyCellOpacity = (index: number) => ({ opacity: energy >= (index + 1) * 20 ? 1 : 0.25 });
  const lanePercent = 35 + playerLane * 15;
  const playerOffsetX = (playerLane - 1) * 7.5;
  const playerOffsetY = Math.max(-12, Math.min(12, 30 - playerPosition));

  return (
    <>
      {/* Playfield Background */}
      <div
      className="absolute inset-0 grid-bg z-0"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 22%, rgba(0, 242, 255, 0.18) 0 1px, transparent 2px), linear-gradient(180deg, rgba(0, 242, 255, 0.16) 0 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.12) 0 1px, transparent 1px), linear-gradient(180deg, #10131a 0%, #071018 100%)",
        backgroundPosition: "center, top, left, center",
        backgroundRepeat: "repeat, repeat, repeat, repeat",
        backgroundSize: "160px 160px, 100% 32px, 32px 100%, 100% 100%",
      }}
      ></div>
      <div className="absolute inset-0 scanlines z-50 pointer-events-none opacity-30"></div>
      {/* Gameplay Canvas (The World) */}
      <main className="absolute inset-0 z-10 flex items-center justify-center">
      {runtime?.obstacles?.map((obstacle, index) => (
      <div
      key={`obstacle-${index}`}
      className="absolute hazard-marker z-10"
      style={{ left: `${35 + Math.max(0, Math.min(2, obstacle.lane ?? 1)) * 15}%`, bottom: `${Math.max(8, Math.min(82, obstacle.position ?? 40))}%` }}
      ></div>
      ))}
      {runtime?.shards?.map((shard, index) => (
      <div
      key={`shard-${index}`}
      className="absolute w-3 h-3 rotate-45 bg-tertiary-fixed-dim drop-shadow-[0_0_8px_rgba(255,186,32,0.7)] z-10"
      style={{ left: `${35 + Math.max(0, Math.min(2, shard.lane ?? 1)) * 15}%`, bottom: `${Math.max(8, Math.min(82, shard.position ?? 40))}%` }}
      ></div>
      ))}
      {/* Player Character (Glider) */}
      <div className="relative w-12 h-12 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-20" style={{ left: `${lanePercent - 50}%`, top: `${playerOffsetY}%`, translate: `${playerOffsetX}rem 0` }}>
      <svg className="w-full h-full text-primary drop-shadow-[0_0_12px_rgba(0,242,255,0.8)]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 22L12 17L22 22L12 2Z" fill="currentColor"></path>
      <path d="M12 7L6 19L12 16L18 19L12 7Z" fill="#10131a"></path>
      </svg>
      {/* Thrust Exhaust */}
      <div className="absolute -bottom-4 w-4 h-6 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50 blur-sm"></div>
      </div>
      {/* Start Game Overlay */}
      <div className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-sm flex flex-col items-center justify-center z-30 transition-opacity duration-500" id="start-overlay" style={{ opacity: isRunning ? 0 : 1, pointerEvents: isRunning ? "none" : "auto" }}>
      <h2 className="font-headline-lg text-headline-lg text-primary tracking-widest uppercase mb-8 drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]">{engineStateLabel}</h2>
      <button className="group relative px-8 py-4 border border-primary text-primary font-label-caps text-label-caps uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-primary hover:text-surface-container-lowest hover:drop-shadow-[0_0_15px_rgba(0,242,255,0.8)] overflow-hidden" type="button" data-action-id="start-engine-1" onClick={actions?.["start-engine-1"]}>
      <span className="relative z-10">{startCopy}</span>
      {/* Data bit corner decoration */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-primary transform group-hover:bg-surface-container-lowest transition-colors"></div>
      </button>
      <p className="mt-8 font-body-md text-body-md text-on-surface-variant/70 text-center max-w-md">
                      Controls inactive until sequence initiation.<br />Initialize engine to begin run.
                  </p>
      </div>
      {/* Example Hazard on Field */}
      <div className="absolute bottom-[20%] right-[30%] hazard-marker z-10"></div>
      </main>
      {/* TopAppBar (Shared Component injected styles applied directly) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-hud-safe-area py-4 bg-transparent bg-surface-container/10 backdrop-blur-md border-b border-primary/20 drop-shadow-[0_0_10px_rgba(0,242,255,0.2)]">
      {/* Left: Brand / Title */}
      <div className="flex items-center gap-4">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile italic tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] md:font-headline-lg md:text-headline-lg">
                      GLIDEVAULT LITE
                  </h1>
      </div>
      {/* Center: HUD Data (Scores) */}
      <div className="hidden md:flex flex-col items-center">
      <div className="flex gap-8">
      <div className="flex flex-col items-end">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">Score</span>
      <span className="font-hud-data text-hud-data text-tertiary-fixed-dim glitch-hover drop-shadow-[0_0_5px_rgba(255,186,32,0.4)]">{score.toString().padStart(6, "0")}</span>
      </div>
      <div className="w-px h-8 bg-primary/30"></div>
      <div className="flex flex-col items-start">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">High Score</span>
      <span className="font-hud-data text-hud-data text-on-surface opacity-80">{highScore.toString().padStart(6, "0")}</span>
      </div>
      </div>
      </div>
      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
      <button className="w-10 h-10 flex items-center justify-center text-primary dark:text-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200 active:scale-95 active:brightness-125 border border-transparent rounded hover:border-primary/50 relative group" type="button" aria-label="Pause" data-action-id="pause-2" onClick={actions?.["pause-2"]}>
      <Pause  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
      {/* Data bit corner decoration */}
      <div className="absolute top-0 right-0 w-1 h-1 bg-primary/0 group-hover:bg-primary transition-colors"></div>
      </button>
      <button className="hidden md:flex w-10 h-10 items-center justify-center text-primary dark:text-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200 active:scale-95 active:brightness-125 border border-transparent rounded hover:border-primary/50 relative group" type="button" aria-label="Settings" data-action-id="settings-3" onClick={actions?.["settings-3"]}>
      <Settings  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
      <div className="absolute top-0 right-0 w-1 h-1 bg-primary/0 group-hover:bg-primary transition-colors"></div>
      </button>
      <button className="w-10 h-10 flex items-center justify-center text-primary dark:text-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200 active:scale-95 active:brightness-125 border border-transparent rounded hover:border-primary/50 relative group" type="button" aria-label="Restart Alt" data-action-id="restart-alt-4" onClick={actions?.["restart-alt-4"]}>
      <RotateCcw  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
      <div className="absolute top-0 right-0 w-1 h-1 bg-primary/0 group-hover:bg-primary transition-colors"></div>
      </button>
      </div>
      </header>
      {/* Side HUD Panel (Progress & Inventory) */}
      {/* Positioned according to Fluid HUD model (anchored to edges/corners) */}
      <aside className="fixed left-hud-safe-area top-1/2 -translate-y-1/2 w-48 z-40 hidden md:flex flex-col gap-6">
      {/* Energy/Boost Progress */}
      <div className="bg-primary/10 backdrop-blur-[12px] border border-primary/30 p-4 relative group">
      <div className="absolute top-0 right-0 w-2 h-2 bg-primary/50"></div>
      <h3 className="font-label-caps text-label-caps text-primary mb-3">Boost Energy</h3>
      <div className="flex gap-1 h-3 w-full">
      <div className="flex-1 bg-primary/80 box-shadow-[0_0_5px_rgba(0,242,255,0.5)]" style={energyCellOpacity(0)}></div>
      <div className="flex-1 bg-primary/80 box-shadow-[0_0_5px_rgba(0,242,255,0.5)]" style={energyCellOpacity(1)}></div>
      <div className="flex-1 bg-primary/80 box-shadow-[0_0_5px_rgba(0,242,255,0.5)]" style={energyCellOpacity(2)}></div>
      <div className="flex-1 bg-primary/20" style={energyCellOpacity(3)}></div>
      <div className="flex-1 bg-primary/20" style={energyCellOpacity(4)}></div>
      </div>
      <div className="mt-2 text-right font-hud-data text-hud-data text-primary text-sm">{energy}%</div>
      </div>
      {/* Inventory: Vault Keys */}
      <div className="bg-primary/10 backdrop-blur-[12px] border border-primary/30 p-4 relative group">
      <div className="absolute top-0 right-0 w-2 h-2 bg-primary/50"></div>
      <h3 className="font-label-caps text-label-caps text-primary mb-3">Vault Keys</h3>
      <div className="flex items-center gap-3">
      <Key  style={{fontVariationSettings: "'FILL' 1"}} className="text-tertiary-fixed-dim drop-shadow-[0_0_5px_rgba(255,186,32,0.6)]" aria-hidden={true} focusable="false" />
      <span className="font-hud-data text-hud-data text-on-surface">{lives} / 3</span>
      </div>
      </div>
      </aside>
      {/* Mobile Bottom HUD (Progress & Score for small screens) */}
      <div className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-surface-container/50 backdrop-blur-md border-t border-primary/20 px-margin-mobile py-4 flex justify-between items-end">
      <div className="flex flex-col">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px] mb-1">Score</span>
      <span className="font-hud-data text-hud-data text-tertiary-fixed-dim text-lg">{score.toString().padStart(6, "0")}</span>
      </div>
      <div className="flex flex-col items-end w-1/2">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest text-[10px] mb-2">Boost</span>
      <div className="flex gap-1 h-2 w-full">
      <div className="flex-1 bg-primary/80" style={energyCellOpacity(0)}></div>
      <div className="flex-1 bg-primary/80" style={energyCellOpacity(1)}></div>
      <div className="flex-1 bg-primary/80" style={energyCellOpacity(2)}></div>
      <div className="flex-1 bg-primary/20" style={energyCellOpacity(3)}></div>
      <div className="flex-1 bg-primary/20" style={energyCellOpacity(4)}></div>
      </div>
      </div>
      </div>
    </>
  );
}
