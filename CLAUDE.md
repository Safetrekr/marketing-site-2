# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## What This Repo Is

`safetrekr-marketing` is the **Safetrekr marketing site** — a futuristic spatial mission-control interface built with Next.js 16. It uses the same spatial ZUI engine as Tarva Launch, adapted with the Safetrekr green/amber color scheme.

## Tech Stack

- Next.js 16 (App Router), React 19, Tailwind CSS v4
- @tarva/ui component library (workspace link)
- Zustand 5 + Immer for state management
- motion/react for animations (never framer-motion)
- pnpm (never npm)
- CSS Transforms spatial engine (ZUI)
- Three-tier animation: rAF physics / motion/react morphs / CSS @keyframes ambient

## Build Commands

- `pnpm dev` — Dev server (uses --webpack flag)
- `pnpm build` — Production build (uses --webpack flag)
- `pnpm typecheck` — TypeScript strict check

## Key Conventions

- Import `motion/react` (never `framer-motion`)
- Use `pnpm` (never `npm`)
- Types go in `src/lib/interfaces/` or feature-local, never `src/types/`
- Default color scheme: `safetrekr` (green primary + amber accent)
- Color scheme toggle available (safetrekr ↔ tarva-core)

## Color Scheme

The app defaults to the `safetrekr` color scheme:
- Primary: Green (#22c55e)
- Secondary: Amber (#b87a1c)
- Backgrounds: Forest-dark (hue 150)
- Text: Green-tinted whites

Users can toggle to `tarva-core` (orange/teal) via the scheme switcher.
