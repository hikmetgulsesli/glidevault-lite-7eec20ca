---
name: Cyber-Kinetic Arcade
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363940'
  surface-container-lowest: '#0b0e14'
  surface-container-low: '#191c22'
  surface-container: '#1d2026'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2eb'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#ffabf3'
  on-secondary: '#5b005b'
  secondary-container: '#fe00fe'
  on-secondary-container: '#500050'
  tertiary: '#fff6ed'
  on-tertiary: '#412d00'
  tertiary-container: '#ffd58c'
  on-tertiary-container: '#7e5900'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810081'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#ffba20'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#10131a'
  on-background: '#e1e2eb'
  surface-variant: '#32353c'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.15em
  hud-data:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.02em
spacing:
  grid-unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  hud-safe-area: 32px
---

## Brand & Style
The design system embodies a high-octane, futuristic arcade experience. It targets players who value precision, speed, and immersive digital environments. The aesthetic is a fusion of **Futuristic Minimalism** and **Neon-Noir**, characterized by deep contrasts and luminescent focal points.

The UI is designed to stay out of the way of the action while providing critical data through a "cockpit" mental model. Every element should feel energized, as if powered by the same neon energy as the game world itself. We avoid traditional "chrome" in favor of floating, light-based interfaces that feel integrated into the game's vacuum.

## Colors
The palette is built on a foundation of **Deep Obsidian Night**, which provides the necessary infinite-depth effect for a space-faring or digital-grid setting. 

- **Primary (Cyber Neon Cyan):** Used for the player character (glider), interactive keys, and successful state indicators. It represents movement and agency.
- **Secondary (Electric Magenta):** Reserved strictly for hazards, laser gates, and high-tension areas. It is the visual signal for "danger."
- **Accent (Glowing Amber):** Used for score multipliers, status effects, and mission-critical HUD updates. It provides a warm contrast to the cooler primary palette.
- **Surface/Neutral:** Grays are eschewed in favor of very dark blues and deep obsidian to maintain the "infinite" feel.

## Typography
Typography is treated as an instrumentation tool. We use **Space Grotesk** for headlines and branding to provide a geometric, technical feel with wide characters that suggest horizontal velocity. 

For the HUD and body text, **JetBrains Mono** is utilized. Its monospaced nature ensures that score counters and timers don't "jitter" as numbers change rapidly, providing a stable reading experience during high-speed gameplay. All labels should lean toward uppercase styling to reinforce the industrial/military-grade software aesthetic.

## Layout & Spacing
The layout follows a **Fluid HUD** model. The game content is full-viewport, with interface elements anchored to the corners and edges to maximize the central field of view.

- **HUD Positioning:** Elements are placed in the "Safe Zone" (32px from screen edges) to avoid visual clipping.
- **The Grid:** While the layout is fluid, elements themselves are sized in 4px increments to maintain a sharp, digital precision.
- **Desktop vs. Mobile:** On desktop, HUD elements are spread to the far corners. On mobile, elements are grouped at the top or bottom-third of the screen to accommodate thumb-controls without obscuring the glider's path.

## Elevation & Depth
Depth is achieved through **Luminance and Glassmorphism** rather than traditional drop shadows.

- **The Backdrop:** A subtle, fixed-position vector grid on the #0B0E14 background creates a sense of scale and movement.
- **Glass Panels:** HUD containers use a 10% opacity Cyan fill with a heavy `backdrop-filter: blur(12px)`. This makes the UI feel like it is a physical projection or glass overlay sitting between the player and the game world.
- **Outer Glows:** Active elements (like the current score or the glider icon) use a `box-shadow` or `filter: drop-shadow` with the Primary Cyan color at 40% opacity to simulate a neon emission.

## Shapes
This design system utilizes **Sharp (0px)** corners exclusively. Softness or roundness contradicts the high-energy, technical nature of the game. 

Angular cuts (e.g., 45-degree clipped corners) should be used for primary buttons and HUD panels to suggest aerodynamics and precision. Borders should be kept thin (1px) to maintain a refined, high-tech appearance.

## Components
- **Buttons:** Sharp-edged, 1px Cyan border, transparent background. On hover, the background fills with Cyan and the text flips to Obsidian, accompanied by a subtle outer glow.
- **HUD Panels:** Semi-transparent "Glass" panels with 1px Cyan borders. Top-right corners may feature a decorative "Data-Bit" (a small square or scanline detail).
- **Progress Bars (Energy/Boost):** Segmented blocks rather than a solid fill, creating a digital "loading" feel. 
- **Score Readouts:** Large, monospaced digits using the Accent Amber color for high visibility against the dark background.
- **Hazard Markers:** Magenta triangles with a pulsing 2px border to draw immediate attention.
- **Toasts/Notifications:** Slide in from the right edge with a sharp "glitch" animation; text should appear to type-in rapidly.