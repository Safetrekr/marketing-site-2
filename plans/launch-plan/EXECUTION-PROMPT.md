# Project Execution Prompt — Safetrekr Marketing Site Launch

> Copy everything between the ``` fences into Claude Code to begin execution.
>
> This is the THIRD step in a three-prompt workflow:
> 1. **Discovery** — Explore, assess, decompose, recommend (COMPLETE)
> 2. **Planning** — Turn recommendations into Phase/Workstream/SOW structure (COMPLETE)
> 3. **Execution** (this prompt) — Implement every workstream in the plan
>
> Prerequisites (all met):
> - 21 SOWs written across 4 phases
> - MASTER-PLAN.md and FINAL-SYNTHESIS.md exist
> - FINAL-VALIDATION-REPORT.md verdict: CONDITIONAL (R-11 blocker)
> - All 4 phase reviews: PASS WITH ISSUES (non-blocking)

---

```
I need you to EXECUTE a fully-scoped project plan. The plan has already been
written — your job is to implement it, not redesign it. Every phase, every
workstream, every deliverable must be built. Nothing gets skipped.

Read these instructions fully before taking any action.

────────────────────────────────────────────────────────────────────────────────
1. INPUTS
────────────────────────────────────────────────────────────────────────────────

Project Name:         Safetrekr Marketing Site Launch
Codebase Path:        /Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2
Plan Directory:       plans/launch-plan
Master Plan:          plans/launch-plan/MASTER-PLAN.md
Final Synthesis:      plans/launch-plan/FINAL-SYNTHESIS.md
Validation Report:    plans/launch-plan/FINAL-VALIDATION-REPORT.md

Build Command:        pnpm build
Test Command:         pnpm typecheck    (no test runner configured — typecheck is the primary gate)
Lint Command:         pnpm lint
Typecheck Command:    pnpm typecheck

Discovery Outputs:
  Combined Recommendations: plans/launch-plan/combined-recommendations.md
  Agent Roster:             plans/launch-plan/agent-roster.md
  Discovery Log:            plans/launch-plan/DISCOVERY-LOG.md

Planning Outputs:
  Planning Log:             plans/launch-plan/PLANNING-LOG.md
  Phase A SOWs:             plans/launch-plan/phase-a-foundation/ws-a.*.md
  Phase A Overview:         plans/launch-plan/phase-a-foundation/PHASE-A-OVERVIEW.md
  Phase A Review:           plans/launch-plan/phase-a-foundation/PHASE-A-REVIEW.md
  Phase B SOWs:             plans/launch-plan/phase-b-p0-content-pages/ws-b.*.md
  Phase B Overview:         plans/launch-plan/phase-b-p0-content-pages/PHASE-B-OVERVIEW.md
  Phase B Review:           plans/launch-plan/phase-b-p0-content-pages/PHASE-B-REVIEW.md
  Phase C SOWs:             plans/launch-plan/phase-c-integration-polish/ws-c.*.md
  Phase C Overview:         plans/launch-plan/phase-c-integration-polish/PHASE-C-OVERVIEW.md
  Phase C Review:           plans/launch-plan/phase-c-integration-polish/PHASE-C-REVIEW.md
  Phase D SOWs:             plans/launch-plan/phase-d-content-depth/ws-d.*.md
  Phase D Overview:         plans/launch-plan/phase-d-content-depth/PHASE-D-OVERVIEW.md
  Phase D Review:           plans/launch-plan/phase-d-content-depth/PHASE-D-REVIEW.md

Start by reading MASTER-PLAN.md end to end. Then read FINAL-SYNTHESIS.md.
Then read FINAL-VALIDATION-REPORT.md for the conditional verdict and 19 issues.
These are your source of truth for what to build. Do NOT improvise scope.

────────────────────────────────────────────────────────────────────────────────
1a. PROJECT CONTEXT (non-negotiable constraints)
────────────────────────────────────────────────────────────────────────────────

VISUAL IDENTITY: Oblivion (2013) HUD / Mission-Control Aesthetic
  - Dark backgrounds (#061A23 void → #365462 overlay), green primary (#4BA467)
  - Glass-morphism cards: bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]
    border border-white/[0.08] with ember glow shadow
  - Breathing glow CTAs, ambient particle effects, scanlines
  - Monospace (Geist Mono) for metadata/status codes, sans-serif (Geist) for body
  - ALL pages carry this DNA — no white pages, no generic B2B SaaS templates
  - See CLAUDE.md "Color Scheme" section and src/styles/spatial-tokens.css

NAMING: Always "Safetrekr" (never "SafeTrekr" camelCase)

BRAND VOICE: "Calm Authority" — precise, factual, confident, operational vocabulary
  - Core message: "When someone asks 'Did you do everything you could?' —
    Safetrekr is the documented answer."
  - Never lead with "peace of mind" (emotional close only)
  - See WS-B.1 for complete voice/tone guide and per-page copy

KILLER DIFFERENTIATOR: Independent safety analyst review (no competitor has this)

TARGET AUDIENCE: Security directors, safety officers, risk managers at schools,
  churches, businesses, youth sports. Age 40-60, risk-averse, liability-focused.

ARCHITECTURE: Hybrid approach — traditional marketing pages at /(marketing) route
  group, spatial ZUI preserved at /launch as "Explore the Platform" experience.

TECH STACK:
  - Next.js 16 (App Router), React 19, Tailwind CSS v4
  - pnpm only (never npm)
  - motion/react for animations (NEVER framer-motion)
  - Zustand 5 + Immer for state management
  - @tanstack/react-query for server state
  - Supabase for backend
  - Zod 4 for validation
  - Path alias: @/* maps to ./src/*
  - Node >= 22 required

KNOWN BLOCKING ISSUE:
  R-11: @tarva/ui workspace dependency — package.json has workspace link to
  ../../tarva-org/tarva-ui-library. This WILL FAIL in production deployment
  (Vercel, Netlify, Docker). Must resolve before Phase A can be deployed.
  Options: (a) publish @tarva/ui to npm, (b) vendor into project, (c) Vercel
  monorepo config. This should be resolved as WS-A.0 before other work begins.

KNOWN PLANNING ISSUES (19 total, documented in PLANNING-LOG.md):
  - 6 HIGH issues (all correctable, non-blocking for implementation):
    #1: A.2 placeholder copy wrong industries (superseded by B.1 real copy)
    #6-8: Phase B Overview factual errors (overview doc only, not SOWs)
    #11: C.4 OG image claims unverified SOC 2 (remove claim)
    #14: D.2 missing 4 standard SOW sections (additive fix)
  - 13 MEDIUM issues: hardcoded URLs, missing effort estimates, icon class
    format, module path conflicts, missing CSS tokens. All fixable during
    implementation.

────────────────────────────────────────────────────────────────────────────────
2. PROTOCOL SCALING
────────────────────────────────────────────────────────────────────────────────

This is a LARGE PROJECT (21 workstreams, 4 phases).

Full protocol as specified:
  - Full pre-flight and post-flight checks via #every-time for CODE workstreams
  - Full phase gates with #every-time + #software-product-owner
  - Context management via EXECUTION-LOG.md and memory MCP
  - Parallel phase execution where the plan allows (C.1 after B.2, not all of B)

────────────────────────────────────────────────────────────────────────────────
3. PROGRESS TRACKER
────────────────────────────────────────────────────────────────────────────────

Create a file: plans/launch-plan/EXECUTION-LOG.md

This is the living progress tracker. It persists across sessions. Structure:

    # Execution Log

    > **Project:** Safetrekr Marketing Site Launch
    > **Started:** <date>
    > **Last Updated:** <date>
    > **Current Phase:** <phase>
    > **Current Workstream:** <ws-id>

    ## Status Summary

    | Phase | Status | WS Complete | WS Total | Blocking Issues |
    |-------|--------|-------------|----------|-----------------|
    | A — Foundation & Infrastructure | NOT STARTED | 0 | 5 | R-11 (@tarva/ui) |
    | B — P0 Content Pages | NOT STARTED | 0 | 9 | |
    | C — Integration & Polish | NOT STARTED | 0 | 4 | |
    | D — Content Depth (Post-Launch) | NOT STARTED | 0 | 3 | |

    ## Workstream Checklist

    ### Phase A: Foundation & Infrastructure
    - [ ] WS-A.1: Marketing Route Group + Layout — react-developer — CODE
    - [ ] WS-A.2: District System Remapping + Tarva Cleanup — react-developer — CODE
    - [ ] WS-A.3: SEO Infrastructure — world-class-digital-marketing-lead — CODE
    - [ ] WS-A.4: Form Backend + Contact Page — world-class-backend-api-engineer — CODE+MIGRATION
    - [ ] WS-A.5: Error Pages — react-developer — CODE

    ### Phase B: P0 Content Pages
    - [ ] WS-B.1: Content Strategy + Copy Drafting — world-class-product-narrative-strategist — SPEC
    - [ ] WS-B.2: Landing Page — react-developer — CODE
    - [ ] WS-B.3: How It Works Page — react-developer — CODE
    - [ ] WS-B.4: Platform Page — react-developer — CODE
    - [ ] WS-B.5: Pricing Page — react-developer — CODE
    - [ ] WS-B.6: Security Page — react-developer — CODE
    - [ ] WS-B.7: Solutions Overview Page — react-developer — CODE
    - [ ] WS-B.8: Legal Pages — react-developer — CODE
    - [ ] WS-B.9: About / Team Page — react-developer — CODE

    ### Phase C: Integration & Polish
    - [ ] WS-C.1: Gateway Integration — react-developer — CODE
    - [ ] WS-C.2: Mobile + Accessibility Audit — world-class-ui-designer — SPEC
    - [ ] WS-C.3: Analytics Integration — world-class-digital-marketing-lead — CODE
    - [ ] WS-C.4: OG Images & Social Sharing — world-class-ui-designer — CODE

    ### Phase D: Content Depth (Post-Launch)
    - [ ] WS-D.1: Vertical Solution Pages — react-developer — CODE
    - [ ] WS-D.2: Social Proof System — react-developer — CODE
    - [ ] WS-D.4: Blog Infrastructure — react-developer — CODE

    ## In Progress

    (empty)

    ## Completed Work Log

    (empty)

    ## Issues Encountered

    | # | Phase | WS | Issue | Resolution | Status |
    |---|-------|----|-------|------------|--------|

    ## Deviations from Plan

    | # | WS | What Changed | Why | Severity | Approved By |
    |---|-----|-------------|-----|----------|-------------|

Update EXECUTION-LOG.md after EVERY workstream completion. Check the box,
log the work, update the status summary. This file is how we track progress
across sessions and how the user knows what is done.

────────────────────────────────────────────────────────────────────────────────
4. WORKSTREAM TYPES
────────────────────────────────────────────────────────────────────────────────

Classify each workstream before executing. The type determines the protocol:

SPEC — Deliverable is a specification, audit report, or content document.
  Protocol: Read SOW → implement deliverables (data files, copy, audit) →
  verify completeness → commit.
  Gates: No pre-flight. Post-flight = verify content is complete.
  For this project: WS-B.1 (copy drafting), WS-C.2 (accessibility audit)

CODE — Deliverable is implementation (features, components, services).
  Protocol: Full 7-step sequence (Section 5).
  Gates: Full pre-flight and post-flight via #every-time.
  For this project: Most workstreams (A.1-A.3, A.5, B.2-B.9, C.1, C.3-C.4,
  D.1, D.2, D.4)

CODE+MIGRATION — Deliverable includes a database migration.
  Protocol: Full 7-step sequence PLUS:
  - Dry-run the migration before applying
  - Verify rollback path exists
  - Apply and verify BEFORE implementing code that depends on schema change
  For this project: WS-A.4 (Supabase DDL for contact form)

────────────────────────────────────────────────────────────────────────────────
5. EXECUTION PROTOCOL — PER WORKSTREAM (CODE AND MIGRATION)
────────────────────────────────────────────────────────────────────────────────

For CODE and MIGRATION workstreams, follow this exact sequence. No shortcuts.

STEP 1: READ THE SOW
  Read the full SOW file for this workstream.
  Read any SOW files listed in its "Depends On" field.
  Read the Phase Overview for context.
  Read the Phase Review for known issues affecting this workstream.
  Read any referenced codebase files (Section 3 and 4 of the SOW).

STEP 2: PRE-FLIGHT CHECK (#every-time)
  Before writing any code, spawn a Task:
    subagent_type: every-time
    prompt: "Pre-flight check for WS-X.N. Here is the SOW: [full content].
            Here is the current state of the codebase files we will touch:
            [read and include relevant files]. Verify:
            1. All input dependencies are met (files exist, schemas match)
            2. The SOW deliverables are implementable as specified
            3. No conflicts with work already completed in prior workstreams
            4. Acceptance criteria are clear and testable
            Report: GO / NO-GO with specific concerns."

  For SMALL CODE workstreams (<100 lines, <3 files), use this inline
  checklist instead of spawning #every-time:
    [ ] Dependencies exist
    [ ] Files referenced in SOW exist
    [ ] No obvious conflicts with prior work

  If NO-GO: fix the identified issues before proceeding. If the issue
  requires a plan deviation, check in with the user (Section 8).

STEP 3: IMPLEMENT
  Use the agent specified in the SOW's "Assigned Agent" field.
  Spawn a Task with subagent_type set to that agent.

  The implementation prompt MUST include:
    - The full SOW content (objective, scope, deliverables, acceptance criteria)
    - The codebase path
    - All files to read before writing (from SOW Section 3 and Section 4)
    - Outputs from prior workstreams this one depends on
    - Explicit instruction: "Read all relevant existing files before writing
      any new code. Match existing patterns, naming conventions, and
      architecture. Do not introduce new patterns without justification."
    - Explicit instruction: "Use pnpm (never npm). Use motion/react (never
      framer-motion). Use Zod 4 syntax. Path alias @/* maps to ./src/*."
    - Known issues from the Phase Review that affect this workstream
      (e.g., "Do NOT use hardcoded safetrekr.com URLs — use SITE_CONFIG
      or relative paths per Phase B Review MEDIUM-2")

  For SOWs longer than 500 lines, distill a "Task Brief" before spawning:
    - Objective (from Section 1)
    - Deliverables list (from Section 2 In Scope)
    - Acceptance criteria (from Section 5)
    - Key files to read (from Sections 3 and 4)
    - Critical constraints and patterns to follow
  Include the Task Brief in the prompt. Reference the full SOW path for
  the agent to read if it needs more detail.

  For large workstreams (>500 lines of new code or >10 files), break into
  sub-steps and commit after each logical unit. Do NOT write 2000 lines
  in a single pass.

STEP 4: POST-FLIGHT CHECK (#every-time)
  After implementation, spawn a Task:
    subagent_type: every-time
    prompt: "Post-flight check for WS-X.N.
            SOW acceptance criteria: [list from SOW Section 5]
            Files created: [list]
            Files modified: [list]
            Verify:
            1. Every acceptance criterion is met (check each one explicitly)
            2. No regressions in existing functionality
            3. Code follows existing project patterns
            4. No compilation/lint errors (run pnpm typecheck && pnpm lint)
            5. All spatial token references use CSS variables, not hardcoded hex
            6. No framer-motion imports (must be motion/react)
            7. No hardcoded safetrekr.com URLs (use SITE_CONFIG or relative paths)
            Report: PASS / FAIL with specific findings."

  If FAIL: fix the findings. Re-run the post-flight check. Max 3 cycles.
  If still failing after 3 cycles, check in with the user.

  IF #every-time is unavailable, use this inline checklist:
    [ ] Each acceptance criterion checked explicitly
    [ ] pnpm typecheck passes
    [ ] pnpm lint passes
    [ ] No hardcoded URLs or hex colors
    Log [FALLBACK: inline checklist used] in EXECUTION-LOG.md.

STEP 5: VERIFY BUILD AND TESTS
  Run the project's verification commands:
    - pnpm typecheck (no errors)
    - pnpm lint (no new warnings)

  No test runner is configured for this project. Typecheck is the primary
  verification gate. If a test runner is added during execution (e.g., via
  a SOW), use it from that point forward.

  If verification fails, fix before proceeding. Do NOT move to the next
  workstream with failing typecheck.

STEP 6: COMMIT
  Create a git commit for this workstream's changes.
  Commit type by workstream:
    - feat(<phase>)       — New feature implementation
    - fix(<phase>)        — Bug fix or defect correction
    - docs(<phase>)       — Spec-only workstreams, documentation
    - chore(<phase>)      — Infrastructure, tooling, refactoring
    - migration(<phase>)  — Database schema changes

  Commit message format:

    <type>(<phase>): WS-X.N — <workstream title>

    <2-3 sentence summary of what was built>

    Deliverables:
    - <list key files created/modified>

    Acceptance criteria verified:
    - AC-X.N.1: <criterion> — PASS
    - AC-X.N.2: <criterion> — PASS

    Plan ref: plans/launch-plan/phase-x-<slug>/ws-x.n-<slug>.md

    Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

STEP 7: UPDATE TRACKER
  Update EXECUTION-LOG.md:
    - Check off the workstream
    - Add entry to Completed Work Log (with timestamps)
    - Update Status Summary counts
    - Clear the "In Progress" section
    - Log any issues encountered
    - Log any deviations from plan

────────────────────────────────────────────────────────────────────────────────
6. PHASE GATE PROTOCOL
────────────────────────────────────────────────────────────────────────────────

After ALL workstreams in a phase are complete:

6a. PHASE VALIDATION
  Spawn #every-time Task:
    "Phase X is complete. All workstreams:
     [list each WS, its acceptance criteria, and PASS/FAIL status]

     Validate:
     1. All workstreams in this phase are complete and committed
     2. All acceptance criteria across all workstreams are met
     3. pnpm typecheck passes, pnpm lint passes
     4. Cross-workstream integration is sound (outputs feed correctly
        into consuming workstreams)
     5. Phase exit criteria from PHASE-X-OVERVIEW.md are met

     Report: PHASE PASS / PHASE FAIL with findings."

  RECOMMENDED: Spawn #software-product-owner Task (in parallel with above):
    "Phase X is complete. Review from a product perspective:
     [list each WS with its acceptance criteria and deliverables]

     Assess:
     1. Do the deliverables meet the product intent, not just the
        technical specification?
     2. Are there user-facing gaps — things a user would expect that
        weren't built?
     3. Are the acceptance criteria actually verifiable from a user's
        perspective?
     4. Any product risks carrying into the next phase?

     Report: PRODUCT PASS / PRODUCT CONCERNS with specifics."

6b. CHECK IN WITH USER
  Present a Phase Gate Report:
    - Workstreams completed: [count] / [total]
    - Workstream types: [N spec, M code, K migration]
    - Typecheck: passing / failing
    - Deviations: [count] (list if any)
    - Open issues: [count] (list if any)
    - What the next phase will tackle
    - Any decisions needed from the user before proceeding

  WAIT for user confirmation before starting the next phase.

6c. UPDATE MASTER TRACKER
  Update EXECUTION-LOG.md phase status to COMPLETE.

PARALLEL PHASES: Per MASTER-PLAN.md, these can overlap:
  - B.1 (content strategy) can start during Phase A
  - C.1 (gateway fix) can start as soon as B.2 is done
  - C.3 (analytics) can start as soon as A.1 is done
  - Phase D is entirely post-launch and independent
  Execute overlapping work on the same branch (no sub-branches needed).
  Phase gates still apply — complete all WS in a phase before the gate.

────────────────────────────────────────────────────────────────────────────────
7. BRANCHING STRATEGY
────────────────────────────────────────────────────────────────────────────────

Create a project branch before starting: safetrekr-marketing-launch

Work on this branch for the entire project. Do NOT create sub-branches
per workstream (adds merge overhead).

If parallel phases are needed, create phase branches:
  safetrekr-marketing-launch/phase-c, safetrekr-marketing-launch/phase-d
Merge phase branches back to the project branch after phase gate passes.

────────────────────────────────────────────────────────────────────────────────
8. CHECK-IN PROTOCOL
────────────────────────────────────────────────────────────────────────────────

Check in with the user at these points. Do NOT proceed silently.

MANDATORY CHECK-INS:
  - Before starting each phase (confirm scope, flag any pending decisions)
  - After completing each phase (report results, get approval to proceed)
  - When a pre-flight check returns NO-GO
  - When a post-flight check fails 3 times
  - When a deviation from the plan is needed
  - When a blocking decision is required (see Open Questions below)
  - When pnpm typecheck or pnpm lint fails and the fix is non-obvious

BLOCKING DECISIONS (must resolve before relevant phase):
  - Q-6: Who writes marketing copy? (blocks Phase B)
  - Q-8: Production domain? (blocks deployment)
  - Q-9: GA4 property ID? (blocks C.3 analytics data collection)
  - Q-11: Gateway fate — keep at / or move landing there? (blocks A.1 routing)
  - Q-12: @tarva/ui deployment strategy (blocks ALL deployment — R-11)

RECOMMENDED CHECK-INS (use judgment):
  - After completing a complex workstream (>5 files changed)
  - When you discover something unexpected in the codebase
  - When a workstream takes significantly longer than estimated
  - Every 3-4 workstreams within a phase, as a progress pulse

Check-in format:
  "STATUS: Execution — Phase X, WS-X.N complete (M of N workstreams done)
   COMPLETED: [what was just finished]
   NEXT: [what comes next]
   FINDINGS: [key observations, or 'None']
   ISSUES: [any concerns, or 'None']
   DECISIONS NEEDED: [anything requiring user input, or 'None']
   Shall I proceed with WS-X.M?"

DEVIATION THRESHOLDS:
  MINOR (log only): Renamed a file, adjusted an implementation detail,
    chose a different library that serves the same purpose.
  MODERATE (check in): Changed a component's API, modified acceptance
    criteria, added/removed a deliverable within a workstream.
  MAJOR (requires user approval before proceeding): Skipped or deferred
    a workstream, changed a cross-workstream interface, modified a
    database schema differently than the SOW specifies.

────────────────────────────────────────────────────────────────────────────────
9. AGENT USAGE
────────────────────────────────────────────────────────────────────────────────

USE THE ASSIGNED AGENT for each workstream. The SOW header specifies:
  > **Assigned Agent:** `<agent-slug>`

Spawn that agent via Task with subagent_type set to the agent slug.

PRIMARY AGENTS (from agent-roster.md):
  - react-developer — 14 workstreams (A.1, A.2, A.5, B.2-B.9, C.1, D.1, D.2, D.4)
  - world-class-product-narrative-strategist — 2 workstreams (B.1, D.1)
  - world-class-digital-marketing-lead — 2 workstreams (A.3, C.3)
  - world-class-backend-api-engineer — 1 workstream (A.4)
  - world-class-ui-designer — 2 workstreams (C.2, C.4)

STANDING PIPELINE ROLES:
  - #every-time — quality gates (pre/post-flight, phase validation)
  - #software-product-owner — phase gate product review, deviation consultation
  - #enterprise-software-project-manager-controller-pmo — escalation only

EVERY-TIME USAGE: #every-time is your quality gate. Use it for:
  - Pre-flight checks (before implementing CODE workstreams)
  - Post-flight checks (after implementing)
  - Phase validation (after all WS in a phase)
  - Any time something feels wrong or inconsistent
  - Complex debugging when you're stuck
  NOTE: #every-time cannot write files. If it produces a report, you must
  extract and save the content yourself.

PRODUCT OWNER USAGE: #software-product-owner at phase gates. Use when:
  - Phase gate validation (Section 6a)
  - When deviations from plan affect user-facing behavior
  - When acceptance criteria are ambiguous during implementation

PMO ESCALATION: #enterprise-software-project-manager-controller-pmo when:
  - Deviations accumulate (3+ moderate deviations in a phase)
  - Phase is taking significantly longer than estimated
  - Cross-phase dependencies need renegotiation

────────────────────────────────────────────────────────────────────────────────
10. MCP TOOLS
────────────────────────────────────────────────────────────────────────────────

You have access to all MCP servers. Use them freely and proactively.

FOR REASONING AND RESEARCH:
  mcp__sequential-thinking__sequentialthinking
    Use when: decomposing complex implementation problems, planning
    multi-file changes, working through edge cases before coding.

  mcp__sequential-research__sequential_research_plan + compile
    Use when: you need to research a library, pattern, or approach
    that isn't clear from the codebase alone.

  mcp__openai-second-opinion__openai_second_opinion
    Use when: validating architecture decisions, checking for blind spots
    in complex implementations, reviewing security-sensitive code.

  mcp__research-consensus__research_consensus
    Use when: making irreversible decisions (schema migrations, API
    contracts, authentication flows).

FOR DATABASE:
  Use Supabase MCP tools for:
    - WS-A.4: Creating the contact_submissions table
    - Validating migrations before applying
    - Testing RLS policies
    - Verifying the form submission API route works end-to-end

FOR BROWSER TESTING:
  Use Playwright MCP tools for:
    - Visual verification of page layouts (glass-morphism cards, dark theme)
    - Navigation flow testing (header, footer, mobile nav)
    - Responsive verification at 375px, 768px, 1280px
    - Gateway → marketing page transition flow
    - Screenshot documentation of completed pages

FOR MEMORY:
  Use memory MCP tools to:
    - Store the GlassCard component API after B.2 (reused by all B.x pages)
    - Store the SITE_CONFIG pattern after A.3 (referenced everywhere)
    - Store the marketing layout structure after A.1
    - Track patterns established in earlier phases
    - Recall context when resuming after a break

Use any other MCP tools available to you when they would improve the work.

────────────────────────────────────────────────────────────────────────────────
11. QUALITY STANDARDS
────────────────────────────────────────────────────────────────────────────────

Every piece of code must meet these standards. No exceptions.

CODE QUALITY:
  - Match existing project patterns (naming, file structure, imports)
  - Strict typing — no `any` types unless existing code uses them
  - No new lint warnings
  - No debug logging left in production code
  - Error handling matches existing patterns
  - Accessible UI (ARIA labels, keyboard nav) — WCAG 2.1 AA target
  - All colors via CSS variables from spatial-tokens.css (no hardcoded hex)
  - All animations via motion/react (never framer-motion)
  - All URLs via SITE_CONFIG or relative paths (no hardcoded safetrekr.com)
  - All compliance claims use ComplianceBadge with verified/unverified status

TESTING:
  - No test runner is configured. Verification is via pnpm typecheck.
  - If a SOW specifies adding a test runner, implement it and use from then on.
  - All existing functionality must continue to work after changes.
  - Manual verification via Playwright MCP for visual/interaction testing.

COMMITS:
  - One logical unit per commit (final state of a workstream)
  - Commit message references the workstream ID
  - No "WIP" or "fix fix" commits in the final history
  - EXCEPTION: Session breaks. Use wip(<phase>) commits to preserve
    progress. When resuming, squash the WIP commit into the final
    workstream commit before updating the tracker.

MIGRATIONS:
  - WS-A.4 is the only migration workstream
  - Use Supabase MCP to apply and verify
  - Include RLS policies as specified in the SOW

DOCUMENTATION:
  - Update any existing docs affected by changes
  - Do NOT create new doc files unless the SOW specifies it
  - Update CLAUDE.md if new architectural patterns are established

SECURITY:
  - Never log, commit, or paste secrets/tokens/API keys
  - Use environment variables for all credentials
  - Honeypot field + rate limiting on contact form (WS-A.4)
  - Never store sensitive data in EXECUTION-LOG.md

────────────────────────────────────────────────────────────────────────────────
12. ERROR HANDLING
────────────────────────────────────────────────────────────────────────────────

When something goes wrong (and it will), follow this protocol:

BUILD FAILS:
  1. Read the error message carefully
  2. Fix the root cause (not a workaround)
  3. Re-run pnpm typecheck && pnpm lint
  4. If the fix requires changing the approach, log it as a deviation

PLAN DOESN'T MATCH REALITY:
  1. The codebase has been evolving — spatial-tokens.css, gateway components,
     ambient effects may have changed since planning
  2. Read the actual code. Trust the code over the plan.
  3. Adapt the implementation to work with the real codebase
  4. Log the deviation in EXECUTION-LOG.md
  5. If the deviation is significant, check in with the user

DEFECT IN PRIOR WORKSTREAM:
  If a pre-flight check reveals a defect in a previously-completed WS:
  1. Log the issue in EXECUTION-LOG.md Issues table with source WS
  2. Assess: can it be fixed inline, or does it need a dedicated fix?
  3. If dedicated fix: create a fix commit referencing the original WS
     (fix(<phase>): WS-X.N — <description of defect>)
  4. Re-run the post-flight check for the original WS scope
  5. Log the deviation in EXECUTION-LOG.md
  6. If the fix changes acceptance criteria, check in with the user

STUCK FOR MORE THAN 15 MINUTES ON ONE ISSUE:
  1. Use #every-time to analyze the problem
  2. Use sequential-thinking to decompose it
  3. Use openai-second-opinion if it's an architecture issue
  4. If still stuck, check in with the user. Do NOT spin.

────────────────────────────────────────────────────────────────────────────────
13. RESUMABILITY
────────────────────────────────────────────────────────────────────────────────

This project will span multiple sessions. At the start of any session:

1. Read plans/launch-plan/EXECUTION-LOG.md
2. Verify git state matches EXECUTION-LOG.md:
   Run git log --oneline to confirm commits match logged workstreams.
   If discrepancies exist, reconcile before proceeding and log the
   finding in the Issues table.
3. Read the Completed Work Log for the current phase to understand
   what was built, what patterns were established, and what files
   were created. This is essential context for the next workstream.
4. Search memory MCP for prior decisions:
   mcp__memory__search_nodes with query: "Safetrekr Marketing Site Launch"
   Review any stored entities for decisions, patterns, and constraints.
5. Identify the current phase and next unchecked workstream
6. Read the SOW for that workstream
7. Read any workstreams it depends on and verify they are checked off
8. Report to the user: "Resuming at Phase X, WS-X.N. Last completed:
   WS-X.M on <date>. <N> of <total> workstreams complete."
9. Continue from where you left off

At the end of any session (if the user says they're done for now):
1. Update EXECUTION-LOG.md with current status (including "In Progress")
2. Store critical decisions and patterns in memory MCP
3. Commit any in-progress work with message:
   "wip(<phase>): WS-X.N in progress — <what's done, what's remaining>"
4. Report what's left to do

CONTEXT MANAGEMENT:
  At the start of each phase, note in EXECUTION-LOG.md:
    - Key decisions made in prior phases
    - Shared patterns established (naming conventions, component patterns)
    - Files created that downstream workstreams depend on
    - Open risks carried forward

  Use memory MCP (mcp__memory__create_entities) to store critical decisions
  and patterns that must survive across sessions. Key items to store:
    - GlassCard API and import path (after B.2)
    - SectionContainer API and import path (after B.2)
    - BreathingCTA API and import path (after B.2)
    - SITE_CONFIG structure and import path (after A.3)
    - Marketing layout header/footer structure (after A.1)
    - Contact form API route and schema (after A.4)
    - Content data module patterns (after B.2)

────────────────────────────────────────────────────────────────────────────────
14. COMPLETION
────────────────────────────────────────────────────────────────────────────────

After ALL phases are complete:

1. Run pnpm typecheck one final time
2. Run pnpm lint one final time
3. Run pnpm build one final time
4. Spawn #every-time for a final project-wide validation:
   "All phases are complete. Validate:
    - Every workstream in EXECUTION-LOG.md is checked off
    - pnpm build compiles cleanly
    - pnpm typecheck passes
    - pnpm lint passes
    - MASTER-PLAN.md acceptance criteria are met
    - Cross-phase integration is sound
    - All pages render correctly (use Playwright for visual check)
    Report: PROJECT PASS / PROJECT FAIL"

5. Update EXECUTION-LOG.md with final status
6. Report to user:
   - Total workstreams completed (by type: spec/code/migration)
   - Total files created / modified
   - Total commits
   - Any deviations from plan
   - Any open items or recommendations for follow-up
   - Final verdict

────────────────────────────────────────────────────────────────────────────────
15. PERMISSIONS
────────────────────────────────────────────────────────────────────────────────

You have full read/write permission on:
  - /Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2 (codebase)
  - plans/launch-plan (plan docs — read SOWs, update tracker)

You may:
  - Create, modify, and delete files in the codebase
  - Run pnpm build, pnpm typecheck, pnpm lint
  - Create git branches and commits
  - Use any MCP tool available to you
  - Spawn any agent available to you
  - Install dependencies if a SOW specifies them (via pnpm add)

You may NOT:
  - Push to remote without user approval
  - Modify the SOW files (they are the spec — log deviations instead)
  - Skip workstreams or acceptance criteria
  - Merge branches without user approval
  - Delete existing tests (fix them instead)
  - Use npm (only pnpm)
  - Use framer-motion (only motion/react)

────────────────────────────────────────────────────────────────────────────────
16. START
────────────────────────────────────────────────────────────────────────────────

1. Read MASTER-PLAN.md
2. Read FINAL-SYNTHESIS.md
3. Read FINAL-VALIDATION-REPORT.md (note the CONDITIONAL verdict and R-11)
4. Read combined-recommendations.md and agent-roster.md
5. Check if EXECUTION-LOG.md exists (resuming?) — if so, read it and
   report current status
6. If starting fresh, create EXECUTION-LOG.md with the full workstream
   checklist (pre-populated above in Section 3)
7. Report to me:
   - Total phases and workstreams (by type)
   - Status of R-11 (@tarva/ui deployment blocker)
   - Status of blocking open questions (Q-6, Q-8, Q-9, Q-11, Q-12)
   - pnpm typecheck and pnpm lint status
   - Recommended starting point
   - Any concerns from reading the plan
8. Wait for my GO before writing any code
```
