# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`run-forever` is a small npm package that provides infinite loop execution using `setImmediate()` instead of recursive functions, avoiding stack overflow. It exports two main functions (`forever`, `foreverPromise`) and a sentinel value (`END`) from a single source file.

## Commands

- **Build**: `npm run dist` (compiles TypeScript to `dist/`)
- **Watch mode**: `npm run dev`
- **Run all tests**: `npm test`
- **Watch tests**: `npm run test:dev`
- **Publish**: `npm run deploy` (upgrades deps, builds, and publishes to npm)

## Architecture

Single-file library at `src/index.ts`:

- `END` — Symbol sentinel value to signal loop termination
- `forever(fn, previousValue?, callback?)` — callback-based infinite loop using `setImmediate()`
- `foreverPromise(fn, previousValue)` — Promise wrapper around `forever()`

The loop pattern: `fn` receives the previous iteration's return value. Returning `END` stops the loop; any other value is passed to the next iteration.

## Tech Stack

- TypeScript 4.x, compiled to ES6/CommonJS (`dist/`)
- Jest + ts-jest for testing
- Tests are in `tests/index.test.ts`, examples in `example/`
