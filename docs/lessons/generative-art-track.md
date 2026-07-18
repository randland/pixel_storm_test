# Generative Art Track

**Created:** 2026-07-18 (from web research across three domains: shader art, compute/simulation, particle/path rendering)
**Purpose:** A parallel "fun projects" track so scene-building doesn't get stale. Every project here teaches a real curriculum skill (Section 06 shaders, Section 07 compute) but produces frame-it-on-the-wall generative art instead of placing objects in a scene.

**How to use:** These are optional demos to intersperse with the main curriculum. Pick one whenever a lesson's concept needs a more motivating vehicle, or when you want a creative break that still builds the target skill. Difficulty and TSL-portability are flagged so you know what you're signing up for.

---

## The through-line

The three domains chain into one continuous arc — each stage reuses the last:

```
palettes → noise → vertex displacement        (Stage 1: Section 06 shaders)
   → curl-noise / attractor particles          (Stage 2: Section 07 compute-to-render)
   → Game of Life → reaction-diffusion          (Stage 3: Section 07 ping-pong)
   → trails / flow-field lines / attractors     (Stage 4: path rendering, woven throughout)
```

This is why generative art is the *natural* home for the GPU skills you came for — the techniques build on each other far more cleanly than the logic-gate capstone's irregular compute does.

---

## Three anchor resources (the spine)

These are the rare **teach-in-the-target-stack** references (TSL/WebGPU-native, not GLSL-only). Lean on them throughout:

1. **Maxime Heckel — "Field Guide to TSL and WebGPU"** (Oct 2025) — covers colorNode/positionNode, `uv()`, noise, vertex displacement, AND `instancedArray` GPGPU particles (Thomas attractor). The single best resource for this whole track. https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/
2. **Three.js Roadmap — "10 Noise Functions for TSL Shaders"** — TSL ships MaterialX noise built in (`mx_noise_float`=Perlin, `mx_worley_noise`=voronoi, `mx_fractal_noise`=fBm). No hand-written noise needed. https://threejsroadmap.com/blog/10-noise-functions-for-threejs-tsl-shaders
3. **Official example — TSL Compute Attractors Particles** — the canonical compute-to-render pattern; view source. https://threejs.org/examples/webgpu_tsl_compute_attractors_particles.html

**One dependency worth adopting:** [`makio-meshline`](https://github.com/Makio64/makio-meshline) — WebGPU + TSL + **ships a Vue integration** (needs three r180+; you're on r182). Native GL lines are locked to 1px width, so every path/trail project needs this (or `Line2`). It underpins all of Stage 4.

---

## Stage 1 — Shader generative art (Section 06: fragment + vertex)

| Project | Teaches (06 skill) | Difficulty | TSL fit | Resource |
|---|---|---|---|---|
| **Cosine color palettes** ★ | `colorNode`, uv — the color engine reused everywhere | Beginner | Native | [IQ palettes](https://iquilezles.org/articles/palettes/) |
| **Animated plasma** ★ | `sin/cos` shaping + `time` uniform | Beginner | Native | [Book of Shaders §5](https://thebookofshaders.com/05/) |
| **Perlin noise field** ★ | `mx_noise_float`, noise→color | Beginner | Native | [10 Noise Functions for TSL](https://threejsroadmap.com/blog/10-noise-functions-for-threejs-tsl-shaders) |
| **fBm + domain warping** | octave stacking, `f(p+f(p))` — the "how is this just math" moment | Intermediate | Very good (`mx_fractal_noise`) | [IQ domain warping](https://iquilezles.org/articles/warp/) |
| **Truchet tiles** | `fract`/`floor` tile-space model, per-cell hashing | Beginner→Int | Good (port hash) | [Book of Shaders §9](https://thebookofshaders.com/09/) |
| **Voronoi / cellular art** | `mx_worley_noise`, distance fields | Intermediate | Good/native | [IQ voronoise](https://iquilezles.org/articles/voronoise/) |
| **Kaleidoscope** | cartesian↔polar uv folding (`atan`, `length`) | Intermediate | Good (port math) | [Ronja polar coords](https://www.ronja-tutorials.com/post/053-polar-coordinates/) |
| **Dithering / halftone** | `step`, quantization, Bayer matrix — styles any earlier demo | Intermediate | Good | [Codrops dithering (2025)](https://tympanus.net/codrops/2025/06/04/building-a-real-time-dithering-shader/) |
| **Noise vertex displacement** (organic blob) ★ | `positionNode` + normal recalc — the Section-06 finale | Intermediate | Native (best-documented) | [Heckel Field Guide](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/) |
| **Raymarched SDF scene** | SDFs + loops — the advanced frontier | Advanced (stretch) | TSL-documented | [Codrops TSL liquid raymarching](https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/) |

★ = the **re-entry taster set**: palette → plasma → noise field. They stack (palette colors the plasma; noise reuses the palette), reach a beautiful controllable result in one sitting, and need zero noise-algorithm porting.

---

## Stage 2 — Compute particles (Section 07: the "GPU clicks" wins)

| Project | Teaches (07 skill) | Difficulty | TSL fit | Resource |
|---|---|---|---|---|
| **Curl-noise flow-field particles** ★ | compute-to-render, `instancedArray`, noise advection — gentlest real compute win | Beginner→Int | Native | [Three.js Blocks CurlNoise](https://www.threejs-blocks.com/docs/module-CurlNoise) |
| **Strange-attractor particles** (Lorenz/Thomas) | per-particle integration in a compute buffer | Beginner→Int | Native | [Official attractors example](https://threejs.org/examples/webgpu_tsl_compute_attractors_particles.html) |
| **GPGPU shape/text particles** | full compute-to-render pipeline snapping points into forms | Intermediate | Native | [Wawa Sensei GPGPU/TSL](https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu) |
| **Pointer interaction forces** | cursor uniform → compute; **reuses your Section-05 raycaster** | Easy add-on | Native | [Interactive galaxy](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders) |
| **Sprite polish** (additive blend, size/color-over-life) | `SpriteNodeMaterial` craft — dots → glowing embers | Easy | Native | [SpriteNodeMaterial docs](https://threejs.org/docs/pages/SpriteNodeMaterial.html) |

★ = best confidence-building first compute project.

---

## Stage 3 — Ping-pong simulations (Section 07 → the reaction-diffusion payoff)

| Project | Teaches (07 skill) | Difficulty | TSL fit | Resource |
|---|---|---|---|---|
| **Game of Life** | ping-pong buffers + neighbor reads (already in the plan) | Beginner (of family) | Doable | [Codrops CA in Three.js](https://tympanus.net/codrops/2022/11/25/conways-game-of-life-cellular-automata-and-renderbuffers-in-three-js/) |
| **★ Reaction-Diffusion (Gray-Scott)** | ping-pong graduation + Laplacian neighbor reads — the requested payoff | Intermediate | Doable (port from WGSL) | [Codrops WebGPU RD](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) + [Karl Sims math](https://www.karlsims.com/rd.html) |

**Note:** There is no great *TSL-native* reaction-diffusion tutorial yet — the strong reference is WGSL. That gap is a feature: porting it into TSL forces real understanding. Read the [ping-pong-in-TSL forum thread](https://discourse.threejs.org/t/struggling-to-recreate-webgl-ping-pong-buffers-with-webgpu-and-tsl/87462) first — it's the exact snag to expect.

---

## Stage 4 — Particle & path rendering (woven through 06/09)

| Project | Teaches | Difficulty | TSL fit | Resource |
|---|---|---|---|---|
| **Particle trails / ribbons** ◆ | history buffers — **upgrades existing demos** (art-grid, gate nodes) so they feel alive | Easy→Int | Native (makio-meshline) | [makio-meshline](https://github.com/Makio64/makio-meshline) |
| **Flow-field line art** (Fidenza-style) | noise advection + stroke rendering — the genre you love | Intermediate | Hybrid (CPU integrate, TSL render) | [clicktorelease flow lines](https://www.clicktorelease.com/code/generative-lines-flow-fields/) + [Tyler Hobbs essay](https://tylerxhobbs.com/essays/2020/flow-fields) |
| **Strange attractors as point clouds** | iterative math → geometry; CPU-first then port to GPU (bridges 06→07) | Beginner→Int | Both | [quaintitative Lorenz](https://writing.quaintitative.com/gen_strange_attractor/) |
| **Harmonograph / spirograph** | parametric curve sampling — gentlest math→beauty | Beginner | On-stack | [spirograph math](https://www.artbylogic.com/parametricart/spirograph/spirograph.htm) |
| **L-systems / fractal plants** | grammar rewriting → turtle → line geometry | Intermediate | On-stack (CPU + Line2) | [jsantell L-systems](https://jsantell.com/l-systems/) |
| **Differential line growth** | node insertion + neighbor repulsion (like `useDynamicList`) | Intermediate | CPU + makio-meshline | [inconvergent differential line](https://inconvergent.net/generative/differential-line/) |

◆ = the **reusable upgrade** for your existing work — adding trails is the cheapest way to make current demos feel fresh, and it's the same primitive that turns attractor/flow particles from dots into flowing strokes.

---

## Section 09 "boss levels" (ambitious — defer until fundamentals land)

| Project | Why hard | Resource |
|---|---|---|
| **Physarum / slime-mold** | needs **atomics** for trail deposit (thin TSL support) | [slime-sim-webgpu](https://github.com/SuboptimalEng/slime-sim-webgpu) |
| **Boids / flocking** | neighbor reads across particles + spatial hashing | [Boids WebGPU](https://www.threejs-blocks.com/docs/Boids) |
| **N-body galaxy** | all-pairs / tiled interaction (native TSL buffers though) | [Galaxy sim WebGPU](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders) |
| **Lenia / SmoothLife** | large-kernel convolution (expensive) | [Lenia project](https://chakazul.github.io/lenia.html) |
| **GPU fluid (Stable Fluids)** | many coupled ping-pong passes; pressure projection | [GPU Gems Ch.38](https://developer.nvidia.com/gpugems/gpugems/part-vi-beyond-triangles/chapter-38-fast-fluid-dynamics-simulation-gpu) |
| **DLA (aggregation)** | "stick once then freeze" fights the parallel model (atomics) | [GPU DLA](https://jbaker.graphics/writings/dla.html) |
| **Path tracing** (awareness only) | BVH + ray-surface intersection — use a library, don't hand-roll | [three-gpu-pathtracer](https://github.com/gkjohnson/three-gpu-pathtracer) |

---

## Three honest caveats

1. **The real Section-06 meta-skill is translating GLSL → TSL.** Most classic references (IQ, Book of Shaders, Shadertoy) are GLSL, so you'll convert `a + b*cos(c)` into `a.add(b.mul(c.cos()))`. Heckel's Field Guide + NikLever's TSL series are the teach-in-TSL exceptions — make them the spine.
2. **Atomics are the hard line.** Any sim where many threads write the same cell (physarum deposit, DLA sticking) needs atomics, which TSL barely supports. Those are the Section-09 boss levels, not early demos.
3. **Native GL lines can't do width** (1px, always). Adopt `makio-meshline` or `Line2` before any path project.

---

## Toolset currency (2026)

The ecosystem moved fast in late 2025 / early 2026 — WebGPU went cross-browser (Firefox 141 Jul 2025, Safari 26 incl. iOS Sep 2025; shipping in all major browsers, though MDN still lists it as "Limited availability," not formally Baseline as of May 2026). What this means for the projects here:

- **Use the WebGPU path.** `import ... from 'three/webgpu'` + TSL from `three/tsl`. It's zero-config with automatic WebGL2 fallback (since Three.js r171), and TSL / compute shaders *only* work on this path. The docs still say "experimental" — that label is stale; it's the recommended path for new work.
- **⚠️ TSL rename gotcha — the copy-paste trap.** Most online TSL tutorials predate mid-2025 renames and will throw or warn. Fix on paste: `three/nodes` → **`three/tsl`**; `timerGlobal`/`timerLocal` → **`time`**; `timerDelta` → **`deltaTime`**; main WebGPU import `three` → **`three/webgpu`**. (GLSL references like IQ/Shadertoy are unaffected — you're translating those to TSL by hand anyway.)
- **Version:** bump to **r185+** before compute work (r184 fixed a large per-frame allocation problem and sped TSL compile ~3×). TSL noise nodes, `instancedArray`/`storage`/`Fn`, and steady additions keep landing release-to-release.
- **Atomics are int32-only** in WebGPU — relevant to the physarum/DLA "boss levels" and the capstone's parallel state.
- **TresJS v5** (current) has experimental WebGPU via a renderer-factory on `<TresCanvas>`; note it removed `useRaycaster` (your `useManualRaycaster` is the v5-aligned approach).
