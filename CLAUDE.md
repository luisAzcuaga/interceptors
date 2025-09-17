# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@mswjs/interceptors`, a low-level HTTP/HTTPS/XHR/fetch request interception library. It extends native Node.js modules and browser APIs using class extensions rather than module rewrites, allowing for more resilient request interception.

## Commands

### Building
- `pnpm build` - Clean and build the project for production (outputs to `lib/` directory)
- `pnpm start` - Start TypeScript compiler in watch mode
- `pnpm clean` - Remove built files from `lib/` directory

### Testing
- `pnpm test` - Run all tests (unit + integration)
- `pnpm test:unit` - Run unit tests only (using Vitest)
- `pnpm test:integration` - Run integration tests (both Node.js and browser)
- `pnpm test:node` - Run Node.js integration tests (using Vitest with custom config)
- `pnpm test:browser` - Run browser integration tests (using Playwright)

### Development
- `pnpm prepare` - Initialize git hooks
- `pnpm release` - Publish a release
- `pnpm prepublishOnly` - Build and test before publishing (runs automatically on publish)

## Architecture

### Core Components

- **`Interceptor`** - Abstract base class for all interceptors with `apply()`, `on()`, and `dispose()` methods
- **`BatchInterceptor`** - Combines multiple interceptors and manages them as a group
- **`RemoteHttpInterceptor`** - Enables request interception in child processes with parent process resolution

### Interceptor Types

The library provides specific interceptors for different request sources:
- **`ClientRequestInterceptor`** - Intercepts `http.get`/`http.request` calls (Node.js only)
- **`XMLHttpRequestInterceptor`** - Intercepts `XMLHttpRequest` (both Node.js and browser)
- **`FetchInterceptor`** - Intercepts `fetch` calls (both Node.js and browser)

### Build System

- **Dual Platform Builds**: Uses `tsup` to build separate bundles for Node.js (`lib/node/`) and browser (`lib/browser/`)
- **Multiple Formats**: Outputs both CommonJS (`.js`) and ES modules (`.mjs`) with TypeScript declarations (`.d.ts`)
- **Package Exports**: Complex export map in `package.json` provides platform-specific entry points

### Request/Response Flow

1. All intercepted requests are normalized to Fetch API `Request` instances
2. Responses use Fetch API `Response` instances as the common format
3. The library handles coercion between different request/response formats (e.g., `http.OutgoingMessage` for `http.ClientRequest`)

### Event System

All interceptors emit:
- `request` - When a request is dispatched (allows inspection and mocking)
- `response` - When any request receives a response (read-only observation)

### Testing Strategy

- **Unit Tests**: Located in `src/` alongside source files (`.test.ts` files), use Vitest
- **Integration Tests**: Located in `test/` directory
  - Node.js integration tests use Vitest with custom config
  - Browser integration tests use Playwright
  - Tests are organized by interceptor type and feature

### Key Directories

- `src/interceptors/` - Individual interceptor implementations
- `src/presets/` - Pre-configured interceptor combinations for Node.js and browser
- `src/utils/` - Utility functions for request/response handling
- `test/` - Integration tests with separate configurations for different environments