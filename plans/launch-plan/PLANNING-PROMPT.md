# Project Planning Prompt — Safetrekr Marketing Site Launch

> Copy everything between the ``` fences into Claude Code to begin planning.
>
> This is the SECOND step in a three-prompt workflow:
> 1. **Discovery** (COMPLETE) — Explore, assess, decompose, recommend
> 2. **Planning** (this prompt) — Turn recommendations into Phase/Workstream/SOW structure
> 3. **Execution** — Implement every workstream in the plan
>
> Prerequisites:
> - `combined-recommendations.md` from Discovery (COMPLETE)
> - `agent-roster.md` from Discovery (COMPLETE)
> - Access to the full agent fleet
> - Codebase at `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2`

---

```
I need you to run a multi-phase, multi-agent project planning pipeline.
You will take a set of Combined Recommendations and an Agent Roster, then
produce a complete set of Statements of Work (SOWs) organized by phase
and workstream, with synthesis and review at every gate.

Read these instructions fully before taking any action.

────────────────────────────────────────────────────────────────────────────────
1. INPUTS
────────────────────────────────────────────────────────────────────────────────

Project Name:              Safetrekr Marketing Site Launch
Codebase Path:             /Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2
Plans Output Path:         plans/launch-plan
Combined Recommendations:  plans/launch-plan/combined-recommendations.md
Agent Roster:              plans/launch-plan/agent-roster.md

The Combined Recommendations file contains the decisions, architecture
choices, detailed requirements, constraints, risk register, and phase
decomposition for this project. It is the primary source of truth for
WHAT to build.

The Agent Roster file contains a phase-by-phase table mapping workstreams
to assigned agents, plus standing pipeline roles. It uses this format:

    ## Phase X: Phase Title
    | WS   | Title              | Agent                         |
    |------|--------------------|-------------------------------|
    | WS-X.1 | Workstream Title | agent-slug or TBD             |
    | WS-X.2 | Workstream Title | agent-slug or TBD             |

    ## Standing Pipeline Roles
    (software-product-owner, enterprise-software-project-manager-controller-pmo,
     every-time — with touchpoint tables per pipeline phase)

Phase identifiers are letters (A, B, C, D). If an agent column says "TBD"
or is empty, you must resolve it (see Section 8).

INPUT VALIDATION (before proceeding):
  Verify combined-recommendations.md contains these sections:
    - Context
    - Critical Gap Resolutions (or equivalent decisions section)
    - Architecture Decisions
    - Phase Decomposition (with work areas)
    - Risk Register
  Verify agent-roster.md has a table for each phase with WS IDs and agents.
  Verify agent-roster.md has a "Standing Pipeline Roles" section with
    touchpoint tables for software-product-owner, PMO, and every-time.
  If any section is missing, report to the user and ask for guidance.

────────────────────────────────────────────────────────────────────────────────
1b. PROJECT CONTEXT (Non-Negotiable Constraints for All SOW Agents)
────────────────────────────────────────────────────────────────────────────────

Every agent writing a SOW MUST be given this context. These constraints
override any agent's default behavior.

VISUAL IDENTITY: Oblivion (2013) HUD / Mission-Control Aesthetic
  - Dark backgrounds (#061A23 → #0A2A38 → #365462), green primary (#4BA467)
  - Glass-morphism cards (bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%])
  - Breathing glow CTAs, ambient effects (particles, scanlines)
  - Monospace for metadata/labels/status; sans-serif (Geist Sans) for body/headlines
  - Thin-stroke SVG icons (strokeWidth: 1), low-chrome 1px borders
  - ALL pages carry this DNA — no white pages, no generic B2B SaaS templates
  - Content pages feel like zones of the same command center, not a different website
  - Text opacity floor: 40% minimum for readable content
  - See CLAUDE.md "Visual Identity" section and AD-2 in combined-recommendations.md

NAMING: Always "Safetrekr" (never "SafeTrekr" camelCase)

BRAND VOICE: "Calm Authority" — the most prepared person in the room
  - Precise, factual, confident, operational vocabulary
  - Core message: "When someone asks 'Did you do everything you could?' —
    Safetrekr is the documented answer."
  - Never lead with "peace of mind" (emotional close only, never the opener)
  - Avoid: "seamless," "revolutionary," "AI-powered" without context

KILLER DIFFERENTIATOR: Independent safety analyst review
  - No competitor offers this. Separation of duties is non-negotiable.
  - Every page connects back to this feature.

TARGET AUDIENCE: Security directors, safety officers, risk managers
  - Organizations: K-12 schools, higher ed, churches, youth sports, businesses
  - Age 40-60, risk-averse, process-oriented, liability-focused
  - Purchase triggers: compliance mandates, liability exposure, near-miss incidents

TECH CONSTRAINTS:
  - Next.js 16 App Router — server components for all marketing pages (SEO)
  - pnpm only (never npm)
  - motion/react (never framer-motion)
  - Zustand 5 + Immer for state management
  - Tailwind CSS v4 with spatial token system
  - Supabase for form backend
  - Zod 4 for validation
  - Node >= 22

KEY CODEBASE FACTS (from Discovery):
  - 82% of existing codebase is reusable (ZUI engine, camera store, morph system,
    ambient components, CSS tokens)
  - Zero marketing copy, zero content pages, zero SEO infrastructure exist today
  - 6 Tarva districts must be remapped to 6 Safetrekr marketing districts
  - @tarva/ui workspace dependency (../../tarva-org/tarva-ui-library) is a
    deployment blocker (R-11 in risk register)
  - User confirmed: preserve and augment existing layouts, card animations,
    capsule → morph → detail panel navigation pattern
  - /public/images/ has 18+ Midjourney traveler/chaperone photos (reusable)
  - About page reference: /Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html
    (real team bios, agency badges, partner data — promoted to Phase B P0)

ADDITIONAL REFERENCE FILES:
  - plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md
    (Code-verified product capabilities — authoritative source for what Safetrekr does)
  - plans/launch-plan/intitial-reviews/holistic-overview.md
    (Synthesized plan from 10 specialist reviews — messaging framework, site architecture)
  - plans/launch-plan/intitial-reviews/*.md (10 individual specialist reviews)
  - plans/launch-plan/DISCOVERY-LOG.md (full discovery audit trail)

────────────────────────────────────────────────────────────────────────────────
2. OUTPUT STRUCTURE
────────────────────────────────────────────────────────────────────────────────

Create this folder structure under plans/launch-plan:

    plans/launch-plan/
    ├── MASTER-PLAN.md
    ├── FINAL-SYNTHESIS.md
    ├── FINAL-VALIDATION-REPORT.md
    ├── PLANNING-LOG.md
    ├── phase-a-foundation/
    │   ├── PHASE-A-OVERVIEW.md
    │   ├── PHASE-A-REVIEW.md
    │   ├── ws-a.1-marketing-route-group-layout.md
    │   ├── ws-a.2-district-system-remapping-tarva-cleanup.md
    │   ├── ws-a.3-seo-infrastructure.md
    │   ├── ws-a.4-form-backend-contact-page.md
    │   └── ws-a.5-error-pages.md
    ├── phase-b-p0-content-pages/
    │   ├── PHASE-B-OVERVIEW.md
    │   ├── PHASE-B-REVIEW.md
    │   ├── ws-b.1-content-strategy-copy-drafting.md
    │   ├── ws-b.2-landing-page.md
    │   ├── ws-b.3-how-it-works-page.md
    │   ├── ws-b.4-platform-page.md
    │   ├── ws-b.5-pricing-page.md
    │   ├── ws-b.6-security-page.md
    │   ├── ws-b.7-solutions-overview-page.md
    │   ├── ws-b.8-legal-pages.md
    │   └── ws-b.9-about-team-page.md
    ├── phase-c-integration-polish/
    │   ├── PHASE-C-OVERVIEW.md
    │   ├── PHASE-C-REVIEW.md
    │   ├── ws-c.1-gateway-integration.md
    │   ├── ws-c.2-mobile-accessibility-audit.md
    │   ├── ws-c.3-analytics-integration.md
    │   └── ws-c.4-og-images-social-sharing.md
    └── phase-d-content-depth/
        ├── PHASE-D-OVERVIEW.md
        ├── PHASE-D-REVIEW.md
        ├── ws-d.1-vertical-solution-pages.md
        ├── ws-d.2-social-proof-system.md
        └── ws-d.4-blog-infrastructure.md

Naming conventions:
- Phase directories: phase-<id>-<kebab-case-phase-title>/
- SOW files: ws-<id>.<seq>-<kebab-case-workstream-title>.md
- Phase overviews: PHASE-<ID>-OVERVIEW.md (uppercase ID)
- Phase reviews: PHASE-<ID>-REVIEW.md (uppercase ID)
- Use lowercase kebab-case for slugs. No spaces, no underscores.
- Phase identifiers are letters (A, B, C, D) matching the Agent Roster.

NOTE: WS-D.3 (About Page) was promoted to WS-B.9. Phase D has 3 SOWs
(WS-D.1, WS-D.2, WS-D.4), not 4. The numbering gap is intentional to
maintain traceability to Discovery outputs.

────────────────────────────────────────────────────────────────────────────────
3. SOW TEMPLATE
────────────────────────────────────────────────────────────────────────────────

Every SOW file MUST use this structure. Agents may add sections but may not
remove or reorder these.

    # WS-X.N: <Workstream Title>

    > **Workstream ID:** WS-X.N
    > **Phase:** X — <Phase Title>
    > **Assigned Agent:** `<agent-slug>`
    > **Status:** Draft
    > **Created:** <date>
    > **Last Updated:** <date>
    > **Depends On:** <list of WS IDs this reads from, or "None">
    > **Blocks:** <list of WS IDs that depend on this, or "None">
    > **Resolves:** <list of open questions or issues, or "None">

    ## 1. Objective
    <What this workstream produces and why. 2-4 sentences.
    Tie back to specific decisions from the Combined Recommendations.
    Reference source: e.g., "per Gap Resolution #3" or "per AD-2".>

    ## 2. Scope
    ### In Scope
    | Area | Description |
    |------|-------------|

    ### Out of Scope
    | Area | Rationale |
    |------|-----------|

    ## 3. Input Dependencies
    | Source | What Is Needed | Status |
    |--------|----------------|--------|

    ## 4. Deliverables
    <The substantive content. Structure with subsections (4.1, 4.2, ...)
    appropriate to the domain. Each deliverable must be concrete — not a
    promise to do something, but the thing itself.

    For architecture: decisions, diagrams, interface contracts.
    For product: requirements, acceptance criteria, user stories.
    For documentation: guides, templates, procedures.
    For engineering: specifications, schemas, algorithms, exact file paths,
      type definitions, and function signatures.
    For quality: test strategies, rubrics, validation rules.

    CODE-LEVEL SPECIFICITY: When the workstream involves implementation,
    deliverables MUST reference exact file paths, type names, function
    signatures, and patterns from the codebase. The SOW should be
    implementable without re-reading the codebase.>

    ## 5. Acceptance Criteria
    | ID | Criterion | Verification Method |
    |----|-----------|---------------------|

    ## 6. Decisions Made
    | ID | Decision | Rationale | Alternatives Considered |
    |----|----------|-----------|------------------------|

    ## 7. Open Questions
    | ID | Question | Assigned To | Target Phase |
    |----|----------|-------------|--------------|

    ## 8. Risk Register
    | ID | Risk | Likelihood | Impact | Mitigation |
    |----|------|------------|--------|------------|

────────────────────────────────────────────────────────────────────────────────
4. PHASE OVERVIEW TEMPLATE
────────────────────────────────────────────────────────────────────────────────

After all SOWs in a phase are written, the synthesis team writes the overview.
The synthesis team is always:
  - #chief-technology-architect — architectural coherence
  - #software-product-owner — requirements coverage and product logic
  - #software-tech-writer — clarity, consistency, documentation quality
  - #enterprise-software-project-manager-controller-pmo — sequencing,
    resource allocation, effort realism, cross-phase dependencies

The CTA task must address each section from four lenses:
  1. Architectural coherence (CTA perspective)
  2. Requirements/product logic completeness (SPO perspective)
  3. Documentation clarity and consistency (STW perspective)
  4. Sequencing, effort realism, and resource conflicts (PMO perspective)

The synthesis team may add sections beyond these ten.

    # Phase X Overview: <Phase Title>

    > **Synthesized by:** CTA + SPO + STW + PMO
    > **Parent Plan:** MASTER-PLAN.md

    ## 1. Executive Summary
    ## 2. Key Findings (grouped by theme, not by workstream)
    ## 3. Cross-Workstream Conflicts
    <For each conflict: identify the contradicting SOWs, describe the
    specific disagreement, and provide a resolution recommendation.>
    ## 4. Architecture Decisions (consolidated table from all SOWs)
    ## 5. Cross-Workstream Dependencies
    ## 6. Consolidated Open Questions (flag which are blocking)
    ## 7. Phase Exit Criteria
    | Criterion | Met? | Evidence |
    ## 8. Inputs Required by Next Phase
    ## 9. Gaps and Recommendations
    <Anything missing from the SOWs that should be addressed before
    or during execution.>
    ## 10. Effort & Sequencing Assessment (PMO)
    <PMO perspective on: effort estimates vs. complexity, resource
    loading across workstreams, parallel execution opportunities,
    bottleneck risks, and recommended execution order within phase.>

────────────────────────────────────────────────────────────────────────────────
5. PHASE REVIEW TEMPLATE
────────────────────────────────────────────────────────────────────────────────

After the overview is written, #every-time reviews the entire phase.

    # Phase X Review: <Phase Title>

    > **Reviewer:** `every-time`
    > **Classification:** HIGH
    > **Documents Reviewed:** <count> (<filenames>)

    ## Review Verdict: <PASS | PASS WITH ISSUES | FAIL>

    ## Per-SOW Assessment
    For each SOW:
    | SOW | Completeness | Codebase Grounding | Issues Found | Rating |
    |-----|-------------|-------------------|--------------|--------|

    ## Issues Found
    ### HIGH Severity
    <For each HIGH issue, provide a specific actionable fix recommendation.>
    ### MEDIUM Severity
    <For each MEDIUM issue, provide a fix recommendation or accept-with-caveat.>
    ### LOW Severity

    ## Cross-Phase Consistency Check
    | Check | Status | Notes |
    |-------|--------|-------|
    | SOW decisions align with Combined Recommendations | OK/ISSUE | |
    | SOW scopes do not overlap | OK/ISSUE | |
    | SOW scopes have no gaps (every requirement traced) | OK/ISSUE | |
    | Dependencies are bidirectionally consistent | OK/ISSUE | |
    | Acceptance criteria are measurable | OK/ISSUE | |
    | Open questions have owners and target phases | OK/ISSUE | |
    | Effort estimates are internally consistent | OK/ISSUE | |
    | File modifications across SOWs do not conflict | OK/ISSUE | |
    | All codebase references (paths, types) are verified | OK/ISSUE | |

    ## Blocking Assessment
    **Blocking for next phase?** Yes / No
    **Required fixes before proceeding:**
    **Recommended fixes (non-blocking):**

────────────────────────────────────────────────────────────────────────────────
6. FINAL DOCUMENTS
────────────────────────────────────────────────────────────────────────────────

After ALL phases pass their gate checks, produce three final documents:

MASTER-PLAN.md (synthesis team — PMO leads sections 3-5, 9):
  Focuses on implementation — what to build, in what order, at what cost.
  1. Executive Summary
  2. Phase Gate Summary (verdict + blocking issues per phase)
  3. Cross-Phase Dependency Chain (PMO: critical path, parallel opportunities)
  4. Implementation Sequence (PMO: recommended order with rationale,
     resource loading, and bottleneck analysis)
  5. Effort Summary (PMO: table with estimates per phase/workstream,
     resource allocation, and conflict flags)
  6. Risk Heat Map (consolidated, cross-phase)
  7. Decision Log (all resolved decisions across all phases)
  8. File Impact Summary (new/modified/deleted files per phase)
  9. Pre-Implementation Checklist (PMO: owner decisions, infrastructure,
     environment setup, dependency prerequisites, team readiness)
  10. Acceptance Criteria Summary (count per phase, test strategy)
  11. SOW Inventory (full table: WS ID, title, agent, phase, status)

FINAL-SYNTHESIS.md (synthesis team):
  Focuses on analysis — cross-phase insights and consolidated findings.
  1. Executive Summary (1 page max)
  2. Problem Statement
  3. Solution Overview
  4. Phase Summaries (3-5 sentences each)
  5. Consolidated Architecture Decisions (master table)
  6. Cross-Phase Dependency Map
  7. Cross-Phase Conflicts and Resolutions
  8. Consolidated Risk Register (deduplicated)
  9. Consolidated Open Questions (any still unresolved)
  10. Deferred Items (out of scope for this effort)
  11. Success Criteria
  12. Implementation Sequencing

FINAL-VALIDATION-REPORT.md (#every-time):
  1. Verdict (PASS | PASS WITH CONDITIONS | FAIL)
  2. Success Criteria Coverage
  3. Review Findings Resolution (all findings, all phases, current status)
  4. Unresolved Tensions
  5. Conditions for Implementation Start
  6. Recommendations

NOTE: MASTER-PLAN.md and FINAL-SYNTHESIS.md are complementary documents,
not duplicates. MASTER-PLAN.md is the primary reference for the Execution
prompt. FINAL-SYNTHESIS.md provides the analytical context.

────────────────────────────────────────────────────────────────────────────────
7. PROGRESS TRACKER
────────────────────────────────────────────────────────────────────────────────

Create a file: plans/launch-plan/PLANNING-LOG.md

This is the living progress tracker. It persists across sessions. Structure:

    # Planning Log

    > **Project:** Safetrekr Marketing Site Launch
    > **Started:** <date>
    > **Last Updated:** <date>
    > **Current Phase:** <phase>
    > **Current Step:** <WRITING SOWs | SYNTHESIZING | REVIEWING | GATE CHECK>

    ## Status Summary

    | Phase | SOWs Written | SOWs Total | Overview | Review | Gate |
    |-------|-------------|------------|----------|--------|------|
    | A     | 0/5         | 5          | -        | -      | -    |
    | B     | 0/9         | 9          | -        | -      | -    |
    | C     | 0/4         | 4          | -        | -      | -    |
    | D     | 0/3         | 3          | -        | -      | -    |

    ## Issues Log

    | # | Phase | SOW | Issue | Severity | Resolution | Status |
    |---|-------|-----|-------|----------|------------|--------|

    ## Deviations from Discovery Input

    | # | What Changed | Why | Impact |
    |---|-------------|-----|--------|

Update PLANNING-LOG.md after each SOW, after each overview, after each
review, and after each gate check. This file is how we track progress
across sessions.

────────────────────────────────────────────────────────────────────────────────
8. AGENT RESOLUTION PROTOCOL
────────────────────────────────────────────────────────────────────────────────

When a workstream has no assigned agent (marked "TBD"):

  1. If mcp__tarvacode-agent-selector__select_best_agent is available,
     call it with the workstream title and objective as the task description.
  2. If confidence >= 0.7, use the recommended agent.
  3. If confidence < 0.7, call mcp__tarvacode-agent-selector__list_agents
     and pick the best match manually based on agent descriptions.
  4. If no agent-selector MCP is available, review the agent definitions
     and select based on description and tools.
  5. If no agent fits, fall back to chief-technology-architect (technical)
     or software-product-owner (product/requirements).
  6. Log in SOW header: "> **Agent Resolved By:** agent-selector MCP
     (confidence: X.XX)" or "> **Agent Resolved By:** manual selection"

After resolution, verify the agent's description matches the workstream's
primary domain. If the agent's skills don't cover the deliverable type,
override manually.

When a missing workstream is identified during synthesis or review:
  1. Flag it as an issue in the Phase Review.
  2. Use agent-selector to recommend an agent.
  3. Add a new SOW file.
  4. Update the phase overview.
  5. Log the addition in PLANNING-LOG.md.

NOTE: All agents in the current roster are resolved — no TBDs. The
resolved roster is:
  - react-developer: WS-A.1, A.2, A.5, B.2–B.9, C.1, D.2, D.4
  - world-class-product-narrative-strategist: WS-B.1, D.1
  - world-class-digital-marketing-lead: WS-A.3, C.3
  - world-class-backend-api-engineer: WS-A.4
  - world-class-ui-designer: WS-C.2, C.4

────────────────────────────────────────────────────────────────────────────────
9. RESEARCH PROTOCOL
────────────────────────────────────────────────────────────────────────────────

Agents MUST ground their work in the codebase at
/Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2 first.
Every SOW must read the relevant codebase files before writing deliverables.
When codebase context is insufficient, escalate:

LEVEL 1 — Reasoning (use freely):
  mcp__sequential-thinking__sequentialthinking

LEVEL 2 — Targeted Research (when codebase lacks answers):
  mcp__sequential-research__sequential_research_plan
  mcp__sequential-research__sequential_research_compile

LEVEL 3 — Multi-Model Validation (high-stakes decisions):
  mcp__openai-second-opinion__openai_second_opinion

LEVEL 4 — Consensus (critical/irreversible decisions):
  mcp__research-consensus__research_consensus

Citation labels (use in SOW deliverables):
  [CODEBASE]   — from files in the codebase
  [INFERENCE]  — derived from reasoning
  [RESEARCH]   — from sequential-research
  [CONSENSUS]  — from multi-model validation
  [ASSUMPTION] — unvalidated (must appear in Open Questions)

────────────────────────────────────────────────────────────────────────────────
10. EXECUTION PROTOCOL
────────────────────────────────────────────────────────────────────────────────

Execute phases strictly in sequence. Within each phase, independent SOWs
may be written in parallel.

STEP 1: SETUP
  - Read both input files end to end
  - Run input validation (Section 1)
  - Create PLANNING-LOG.md with the full phase/SOW checklist
  - Resolve any TBD agents (Section 8)
  - Create all phase directories
  - Check in with user: present the resolved roster and folder structure

STEP 2: FOR EACH PHASE (sequential)

  2a. WRITE SOWs
      Spawn a Task per workstream with:
        subagent_type: <assigned-agent-slug>
        prompt: SOW template + workstream-specific context

      CONTEXT MANAGEMENT: Do NOT pass the entire combined-recommendations.md
      to every Task. Instead, pass:
        1. The specific work area description from the Phase Decomposition
        2. Architecture decisions relevant to THIS workstream
        3. Gap resolutions relevant to THIS workstream
        4. The full list of workstream TITLES (for dependency context)
        5. Any prior phase outputs this workstream depends on
        6. The codebase path + instruction to read relevant files
        7. The output file path
        8. The project context from Section 1b (non-negotiable constraints)

      Independent workstreams: spawn in parallel.
      Dependent workstreams: wait for dependencies.

  2b. SYNTHESIZE
      Spawn Task (subagent_type: chief-technology-architect) with:
        Phase Overview template + ALL SOW files for this phase +
        relevant sections of Combined Recommendations +
        prior phase overviews + instruction to synthesize from CTA,
        SPO, STW, and PMO perspectives.

      The synthesis team MUST produce a Conflicts section. For each
      conflict: identify the contradicting SOWs, describe the specific
      disagreement, and provide a resolution recommendation.

  2c. REVIEW
      Spawn Task (subagent_type: every-time) with:
        Phase Review template + ALL SOW files + overview +
        relevant Combined Recommendations + prior phase reviews

  2d. GATE CHECK
      Read the review verdict:
        PASS              → proceed to next phase
        PASS WITH ISSUES  → proceed if no blocking issues; otherwise fix
        FAIL              → fix blocking issues, re-synthesize, re-review
      Max 2 fix cycles per phase. If still FAIL, check in with the user
      and proceed with caveats noted.

  2e. UPDATE TRACKER
      Update PLANNING-LOG.md: mark phase complete, log issues, log gate.

STEP 3: FINAL SYNTHESIS
  Spawn CTA task to produce MASTER-PLAN.md and FINAL-SYNTHESIS.md.

STEP 4: FINAL VALIDATION
  Spawn #every-time task to produce FINAL-VALIDATION-REPORT.md.

STEP 5: COMPLETION
  Update PLANNING-LOG.md with final status. Check in with user.

────────────────────────────────────────────────────────────────────────────────
11. CHECK-IN PROTOCOL
────────────────────────────────────────────────────────────────────────────────

Check in with the user at these points. Do NOT proceed silently.

MANDATORY CHECK-INS:
  - After reading inputs and resolving agents (present roster + structure)
  - After each phase gate (present verdict, blocking issues, resolution)
  - Before final synthesis (present all-phase summary)
  - After final validation (present verdict and conditions)

RECOMMENDED CHECK-INS:
  - When a workstream scope seems much larger than expected
  - When SOWs produce contradictory decisions
  - When a TBD agent cannot be resolved with confidence >= 0.7
  - When a phase fails its gate check twice
  - Every 5+ SOWs within a phase (progress pulse)

Check-in format:
  "STATUS: Planning — Phase X [WRITING SOWs | SYNTHESIZING | REVIEWING]
   COMPLETED: [what was just finished]
   NEXT: [what comes next]
   FINDINGS: [key observations, or 'None']
   ISSUES: [concerns, or 'None']
   DECISIONS NEEDED: [anything requiring user input, or 'None']
   Shall I continue?"

────────────────────────────────────────────────────────────────────────────────
12. QUALITY STANDARDS
────────────────────────────────────────────────────────────────────────────────

Every SOW and synthesis document must meet these standards.

SPECIFICITY:
  - SOW deliverables reference exact codebase files, types, and patterns
  - Acceptance criteria are measurable and testable
  - Scope tables have concrete items, not vague categories
  - No hand-waving ("improve performance", "clean up the code")

COMPLETENESS:
  - Every goal from combined-recommendations.md maps to at least one SOW
  - Every architecture decision is reflected in relevant SOWs
  - Every risk from the risk register appears in relevant SOW risk tables
  - No requirement is silently dropped

TRACEABILITY:
  - SOW objectives reference their source (e.g., "per Gap Resolution #3",
    "per AD-2", "per combined-recommendations.md Section 4")
  - Phase Overviews trace decisions back to Combined Recommendations
  - MASTER-PLAN.md traces requirements to SOWs to acceptance criteria

ACCURACY:
  - File paths verified against the actual codebase
  - Schema descriptions match the actual database
  - Type names match the actual codebase
  - Don't assume — read the code

CONSISTENCY:
  - SOW scopes do not overlap (no two SOWs own the same file/feature)
  - Dependencies are bidirectional (if A depends on B, B blocks A)
  - Terminology is consistent across all documents

────────────────────────────────────────────────────────────────────────────────
13. ERROR HANDLING
────────────────────────────────────────────────────────────────────────────────

SOW CONTRADICTIONS:
  When two SOWs make contradictory decisions or claim overlapping scope:
  1. Identify the conflict in the Phase Overview (Section 3)
  2. Provide a resolution recommendation
  3. The Phase Review must verify the conflict is addressed
  4. If the resolution changes a SOW's scope, update both SOWs

SYNTHESIS QUALITY ISSUES:
  If the Phase Overview misses conflicts or produces vague findings:
  1. Re-run synthesis with more specific instructions
  2. Flag the quality gap in the Phase Review

GATE CHECK FAILURE:
  After 2 fix cycles, if a phase still fails:
  1. Document all unresolved issues in PLANNING-LOG.md
  2. Check in with the user — present the issues and ask for guidance
  3. Proceed with caveats noted in the Phase Review

IRRECONCILABLE AMBIGUITY:
  If the combined-recommendations.md is ambiguous on a critical point:
  1. Check in with the user before writing SOWs that depend on it
  2. Do NOT guess through high-uncertainty decisions
  3. Log the ambiguity as an Open Question with "Stakeholder" as owner

────────────────────────────────────────────────────────────────────────────────
14. RESUMABILITY
────────────────────────────────────────────────────────────────────────────────

This planning effort may span multiple sessions.

AT SESSION START:
  1. Read plans/launch-plan/PLANNING-LOG.md
  2. Identify the current phase and step
  3. Read the most recent Phase Overview and Review (if they exist)
  4. Search memory MCP for prior decisions:
     mcp__memory__search_nodes with query: "Safetrekr Marketing Site Launch planning"
  5. Report to user: "Resuming planning at Phase X, step Y. Last completed:
     [description]. M of N phases complete."
  6. Continue from where you left off

AT SESSION END (if the user says they're done for now):
  1. Update PLANNING-LOG.md with current status
  2. Store critical decisions in memory MCP
  3. Report what remains to the user

────────────────────────────────────────────────────────────────────────────────
15. PERMISSIONS AND CONSTRAINTS
────────────────────────────────────────────────────────────────────────────────

Permissions:
  - Read, Write, Edit: files under plans/launch-plan
  - Read, Grep, Glob: files under /Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2
  - Read: /Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html (reference)
  - All MCP tools listed in agent definitions
  - WebSearch, WebFetch: only when codebase context is insufficient

Constraints:
  - Do NOT modify any files under /Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2/src.
    Read only.
  - Do NOT create files outside plans/launch-plan.
  - Do NOT skip phases or workstreams.
  - Do NOT merge multiple workstreams into a single SOW file.
  - Every SOW must be grounded in the codebase.
  - Never commit secrets, tokens, or credentials in any document.

────────────────────────────────────────────────────────────────────────────────
16. START
────────────────────────────────────────────────────────────────────────────────

1. Read Combined Recommendations (plans/launch-plan/combined-recommendations.md)
2. Read Agent Roster (plans/launch-plan/agent-roster.md)
3. Run input validation (Section 1)
4. Check if PLANNING-LOG.md exists (resuming?) — if so, read it and
   report current status
5. If starting fresh, create PLANNING-LOG.md with the full phase/SOW
   checklist
6. Resolve any TBD agents (Section 8) — NOTE: all agents are pre-resolved
7. Report to me:
   - Total phases and workstreams (4 phases, 21 workstreams)
   - Resolved roster (all agents confirmed)
   - Folder structure to be created
   - Any ambiguities or concerns from reading the inputs
   - Any PENDING decisions that need stakeholder input (13 open questions
     from Discovery — see combined-recommendations.md Open Questions table)
8. Wait for my GO before writing any SOW files
```
