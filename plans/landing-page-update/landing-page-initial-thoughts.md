Below is a functional outline for the landing experience you described (desktop-first, cinematic, pushes users toward the Futuristic app, while still offering a Traditional site).

⸻

Landing Page Functional Outline v0.1

Purpose: A minimal “arrival surface” that feels alive, runs a <10s ritual, then presents two paths—Futuristic App (primary) and Traditional Website (secondary)—while continuing ambient “security + travel safety narrative” motion around the choices.

⸻

1) Page structure (what exists on screen)

A. Background Layer (always-on)
	•	Dark, clean, high-end field (Oblivion-style glass/soft glow)
	•	Subtle depth + parallax on mouse move
	•	Ambient micro-noise/grain at very low intensity
	•	Ultra-faint grid / contour lines (only visible when elements flare)

B. Foreground “System Overlay” Layer (animated UI dressing)
	•	Thin instrument strips along edges (top/left/right/bottom)
	•	Small animated “status ticks” and pulse indicators
	•	Small non-clickable telemetry blocks that appear/disappear (some real, some decorative)

C. Center Stage (the only “true content” at first)
	•	Brand mark / name (small)
	•	One short line of copy (minimal, calm)
	•	No buttons at first—buttons are revealed after the sequence

⸻

2) State machine (how it behaves)

State 0 — Idle / Arrival (0.0s → 0.5s)

Goal: establish “alive” without demanding interaction.
	•	Center text fades in (brand + one line)
	•	A single “attractor” glyph appears subtly near center (not clickable yet)

⸻

State 1 — Futuristic “Loading Ritual” (0.5s → ~8.0s)

Goal: run a narrative loading sequence that feels purposeful, not like a spinner.

Behavior:
	•	Micro-elements pop in → scan → validate → pop out in cycles
	•	Elements appear in different zones (left, right, corners) but never overwhelm the center
	•	The “loading” reads like checks being performed:
	•	“Routing”
	•	“Signal integrity”
	•	“Environment check”
	•	“Threat surface scan”
	•	“Location services”
	•	“Comms readiness”
	•	“Guardian channel ready”
	•	“Receipt channel online”
	•	Each check has:
	•	a short label
	•	a progress micro-bar / tick sweep
	•	a completion pulse
	•	then it collapses into a tiny dot and joins an edge strip

Timing rules:
	•	Total ritual completes in <10 seconds
	•	A visible “completion cadence” around ~7–9 seconds so users feel a payoff

⸻

State 2 — Choice Reveal (8.0s → 10.0s)

Goal: reveal both paths, bias hard toward Futuristic.

UI appears:
	•	Two choices appear as a paired selector:
	•	Primary (Dominant): “Enter Futuristic Experience”
	•	bigger, brighter, centered
	•	has subtle motion halo / focus glow
	•	default focus state
	•	Secondary (De-emphasized): “Traditional Website”
	•	smaller text, off-axis placement (e.g., lower-left)
	•	no halo, no glow, minimal affordance

Bias mechanics:
	•	Primary is centered and gets continuous micro-affirmations (pulses / focus ring)
	•	Secondary is present but quiet and never steals attention
	•	If the user does nothing for ~2 seconds after reveal:
	•	the primary gets a gentle “suggestion nudge” (a soft pulse + micro text like “Recommended”)

⸻

State 3 — Post-Reveal Ambient “Security Narrative” (10.0s onward)

Goal: keep the scene alive and shift from “loading” to “security + travel safety story.”

Narrative overlay transitions:
	•	Loading checks stop; security-focused elements begin:
	•	“Perimeter monitoring”
	•	“Route risk scan”
	•	“Live check-ins armed”
	•	“Emergency channels ready”
	•	“Local advisories streaming”
	•	“Guardian notifications standing by”
	•	Edge strips gain “flow” (tiny particles moving along borders)
	•	A few small map-like or route-like line animations appear in the periphery (not full maps—more like schematic traces)

Important:
Ambient elements continue around the choice buttons without interfering. The primary CTA remains the “hero” anchor.

⸻

3) Interaction behaviors (what the user can do)

Primary CTA behavior

Click “Enter Futuristic Experience”
	•	Transition: camera moves forward / the UI “latches” and re-forms
	•	A short “security handshake” animation plays (1–2 seconds)
	•	Then the futuristic hub/app opens

Secondary CTA behavior

Click “Traditional Website”
	•	Immediate route to standard site
	•	Minimal transition (quick fade) so it feels “less special” (by design)

Keyboard behavior (desktop-first)
	•	Default focus is on primary CTA once revealed
	•	Enter triggers Futuristic
	•	Tab still reaches Traditional (but it’s 2nd in order)
	•	ESC can skip animations and immediately reveal choices (for impatient users)

⸻

4) Content requirements (copy + tone)

Minimal initial copy (examples)
	•	“Travel protection, continuously monitored.”
	•	“Prepared before departure. Guided during travel.”
	•	“Safety, verified. Events, documented.”

CTA labels (recommendation)
	•	Primary: “Enter Mission Control” / “Enter Futuristic Experience”
	•	Secondary: “Traditional Website”

Micro-label library (security narrative)

Use short, confident, system-like phrases:
	•	“MONITORING ACTIVE”
	•	“CHECK-IN CHANNEL READY”
	•	“ROUTE RISK: SCANNING”
	•	“ADVISORY FEED: LIVE”
	•	“GUARDIAN LINK: ARMED”
	•	“EVIDENCE: CAPTURING”

⸻

5) Visual hierarchy rules (so it stays usable)
	•	Center always remains readable
	•	Only one “hot” region at a time (the primary CTA after reveal)
	•	Ambient elements must never create visual noise near the CTA hit area
	•	Animation intensity decays if user is hovering CTAs (reduce distraction)

⸻

6) Performance + safety constraints (functional, not technical)
	•	Whole ritual must complete in <10 seconds under normal conditions
	•	If performance is poor:
	•	fall back to a simplified ritual (fewer elements, same story)
	•	If user prefers reduced motion:
	•	show a minimal version: static “system checks” list + quick reveal of CTAs

⸻

7) Success criteria (what “done” means)
	•	80–95% of users choose Futuristic Experience
	•	Users understand there are two choices within 10 seconds
	•	The sequence feels intentional (not like “loading for loading’s sake”)
	•	The page communicates “travel safety / protection / monitoring” without paragraphs

