# Project Audit — Remediation Plan

**Date:** 2026-07-18
**Branch:** `learn/nick`
**Purpose:** Fix the drift and rot found in a full-directory audit (config, docs, curriculum, code) without blowing up any single session's context. Each session below is scoped to be picked up independently — read only this plan + the files that session names.

**How to use:** Do sessions in order. Each starts fresh: open this plan, jump to the session, do it, check the boxes, commit. Sessions A/C/D are mostly mechanical; Session B is a real teaching lesson (you write the code).

---

## Already fixed (session of 2026-07-18)

These safe text corrections were applied during the audit (no code logic touched):

- [x] Note-taking rule downgraded from MANDATORY → recommended-for-hard-concepts (`.claude/rules/learning-workflow.md`)
- [x] Broken `project-decisions.md` reference repointed to `learning-progress.md` Decisions Log (`.claude/rules/learning-workflow.md`)
- [x] `docs/lessons/README.md` structure tree + branch name (`learn/fresh-architecture` → `learn/nick`) corrected
- [x] `.claude/README.md` hooks description corrected (they ARE scripts in `.claude/hooks/`)
- [x] Section 02-04 (Shadows & Surfaces) marked complete — git-confirmed via commit `68ad75e`
- [x] gridMath test count corrected 8 → 12
- [x] Teaching output-style student context de-staled (LED grid → generic current phase)

> ⚠️ Commit these before starting the sessions below, so each session has a clean diff.

---

## Open decision (needs your call before Session A)

**The `material-showroom` demo was deleted, probably by accident.**
- Built in commit `68ad75e` ("shadows & surfaces - material showroom demo, Section 02 complete").
- Deleted in commit `c6be838` ("fix: platform cleanup — control attributes, useFPS rename, config fixes"). The "cleanup" label suggests collateral damage, not intent.
- `learning-progress.md` and `MEMORY.md` still list it as an existing demo — currently false.
- **Recoverable:** `git checkout 68ad75e -- src/demos/04-material-showroom` restores it.

**Decide:** restore the demo (it's your only PBR/shadows/env-map artifact, and Section 06 lists shadows as a prerequisite) **or** accept it's gone and strip the claim from the docs. Recommendation: **restore** — it's free, and it's a genuine artifact you'll want when reasoning about materials in the shader sections.

---

## Session A — Reconcile "where am I?" (docs + one small code fix)

**Why:** Three status files disagree with each other and with disk. Until they agree, you (and any agent) start every session with a wrong map. Cheap, high-value.

**Files:** `docs/learning-progress.md`, `MEMORY.md`, `docs/context-modules/progress-tracking.md`, `src/composables/useDemoRegistry.js`, `.claude/agents/debugger.md`

- [ ] **Resolve material-showroom** per the decision above (restore or strip claim). If restoring: `git checkout 68ad75e -- src/demos/04-material-showroom`, then verify it loads (`/demo-test`).
- [ ] **Fix demo URL routing.** `useDemoRegistry.js` keys demos by full folder name (`01-hello-cube`), but docs/`debugger.md` tell you to use `?demo=hello-cube` — which 404s. Pick one:
  - Recommended: strip the numeric prefix when building the registry key so `?demo=hello-cube` works and URLs read cleanly. Verify each demo still loads afterward.
  - Then update `.claude/agents/debugger.md` examples to whatever convention you land on.
- [ ] **Make the three status files agree.** Designate `docs/lessons/00-curriculum-outline.md` as source-of-truth for *completion status*, `learning-progress.md` for *narrative*. In `progress-tracking.md`: bump the understated progress bars (TresJS integration is way past 40%), check the skill boxes that are actually done (scene/materials/lighting, memory management via `useDynamicInstancedMesh` disposal).
- [ ] **Spaced-repetition table:** it's ~135 days overdue and missing 10+ recent concepts. Either re-date after a quick review pass, or add a one-line note that the SR system is dormant and stop presenting stale "Next Review" dates as authoritative. (Your call — don't let it silently lie.)

**Done when:** outline, learning-progress, and progress-tracking tell the same story; every `?demo=` URL in the docs actually loads.

---

## Session B — Unblock & continue gate-prototype (Section 05-03) — TEACHING SESSION

**Why:** This is your actual next lesson, and the demo is currently broken (crashes on open). This is the one session where *you write the code* with guidance.

**Files:** `src/demos/07-gate-prototype/{useControls.js, Experience.vue, index.vue}`, `src/composables/useDynamicInstancedMesh.js`, `src/composables/useManualRaycaster.js` (+ the 05-01 chain), `src/lib/gridMath.js`

**First, the bugs (why it crashes):**
- `Experience.vue` calls `updateInstances(delta)` every frame, but `useDynamicInstancedMesh()` returns `{ mesh, add, remove, update, flush }` — no `updateInstances`. → `TypeError` frame 1.
- `useControls.js` calls `useDynamicInstancedMesh()` with **no geometry/material**, so it builds `new InstancedMesh(undefined, undefined, 1000)` → render error. Also the call is at module top level (constructs the broken mesh at import).

**Then the lesson (well-scoped for one session):**
- [ ] Fix the wiring: pass a real geometry + material, resolve the `flush` vs `updateInstances` name, move the composable call to the right scope.
- [ ] Build a **gate factory** that snaps placements to the grid via `gridMath.snapToGrid`.
- [ ] Add **ground-plane raycasting** — reuse the 05-01 `useManualRaycaster` chain — to convert clicks into grid cells.
- [ ] Feed placements into `useDynamicInstancedMesh.add`.
- [ ] Update the 05-03 lesson file status to `[>]` and check off completed foundation objectives so it's a usable resume point.

**Done when:** you can click the ground plane and drop grid-snapped gate nodes; demo runs with no console errors.

---

## Session C — Config diet (make the setup serve a solo learner)

**Why:** The config preaches "context fills fast — delegate" while eagerly loading a large fixed payload every session. Fixing this makes *every future session cheaper* — directly serves your cost concern.

**Files:** `CLAUDE.md`, `.claude/settings.json`, `.claude/settings.local.json`, `.gitignore`, index READMEs

- [ ] **Convert eager `@`-imports to lazy references.** In `CLAUDE.md`, `@path` is an *eager import* (force-loads the file at session start), not a link. Everything under "On-Demand Only", "Load On-Demand", "Consultants", "Agents", and "Detailed Context Modules" is being force-loaded despite the labels. Change `@path` → plain backtick paths (`` `.claude/agents/git-manager.md` ``) for everything not needed *every* turn. Keep `@` only for genuinely always-active content (`learning-workflow.md`, and the output style is already applied via settings so it may not need `@` at all).
- [ ] **Fix the settings split.** Hooks + output style currently live in `settings.local.json`, which is `.gitignore`d *and* tracked (contradiction). Move `hooks` and `outputStyle` into the committed `settings.json`; keep only truly-local keys (`defaultMode`) in `settings.local.json`; then either `git rm --cached settings.local.json` to honor the ignore, or remove it from `.gitignore` — pick one.
- [ ] **Optional trim (judgment).** 6 agents/consultants + 8 skills + ~6 index READMEs is a lot of surface for one person to keep consistent (the broken refs this audit found are the symptom). Consider folding thin index READMEs (`.claude/README.md`, `output-styles/README.md`) into what they point at. Only do this if it feels like it's helping — don't churn for its own sake.

**Done when:** a fresh session loads noticeably less fixed context; hooks/output-style are committed and would work on a clean clone.

---

## Session D — Pre-Section-06 prep (do RIGHT BEFORE starting shaders)

**Why:** The upcoming lesson stubs are good, but a few contain landmines that'll waste time if hit cold. Fix these when you're about to start Section 06, not before (APIs may shift).

**Files:** `docs/reference/tsl-patterns.md`, `docs/reference/webgpu-compute-patterns.md`, `docs/lessons/06-shader-foundations/04-noise-and-procedural.md`, `docs/lessons/07-gpu-compute/*`, `docs/lessons/08-capstone-projects/04-gate-sim-polish.md`, `00-curriculum-outline.md`

- [ ] **Fix TSL reference doc bugs** (verify against installed Three 0.182 first):
  - `storageBuffer` → `storage()` (the canonical TSL storage-node factory) in `tsl-patterns.md` and `webgpu-compute-patterns.md`.
  - `material.fragmentNode` → `material.colorNode` in `tsl-patterns.md` (checkerboard/rings examples).
  - Add one sentence to the vec3-alignment section: manual padding is for raw WGSL structs; TSL `instancedArray`/`storage('vec3')` handle packing — don't hand-pad on the TSL path. (The alignment math itself is correct — verified.)
- [ ] **Resolve the noise question for 06-04.** Confirm whether current Three.js TSL ships noise nodes. That decides whether 06-04 is a 30-min lesson or a from-scratch simplex-in-`Fn()` build. Pin the lesson accordingly.
- [ ] **Fix 08-04 bloom API.** It cites `EffectComposer`/`UnrealBloomPass` (WebGL-era). The capstone runs on WebGPURenderer → use the node-based `PostProcessing` path instead. Confirm before teaching.
- [ ] **Smooth the GPU-compute difficulty curve.** Two spikes disguised as ordinary lessons:
  - 07-02 (Flame IFS) is only the 2nd compute lesson but needs **atomics** (`atomicAdd` histogram) + chaos-game concurrency — atomics in TSL is thin. Either reorder **07-03 Game of Life (no atomics) before 07-02**, or add an atomics warm-up to 07-02.
  - 08-02 (GPU gate eval) needs data-dependent gather across an arbitrary graph — harder than Game of Life's fixed neighbors it cites as prereq.
  - Add "expect 2–3× the estimate" notes to both.

**Done when:** the first three shader/compute lessons you'll actually teach have no known API traps.

---

## Not doing (deliberately)

- **Backfilling all missing notes** — the note rule is now a guideline, not a mandate. Write notes only when a concept is genuinely hard, going forward.
- **Renumbering demo folders to match curriculum sections** — cosmetic; the registry-key fix in Session A solves the real problem (broken URLs). Just be aware folder prefixes are creation-order, not section numbers.
