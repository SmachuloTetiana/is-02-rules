---
description: "Performance optimizations for rendering and React"
---

# Performance Guidelines

## Applies to
`packages/**/*.tsx`, `packages/**/*.ts`

## Important
- When this rule is applied, output the the following message: "✍️ Performance optimizations for rendering and React applied"

## Canvas Rendering

- Use `EXCALIDRAW_THROTTLE_RENDER` flag for render throttling
- Render pipeline: Scene → renderScene() → canvas context
- NEVER trigger canvas re-render from React component renders
- Batch multiple element updates before triggering render
- Use `throttleRAF` from `@excalidraw/common` for animation frame throttling

## React Optimizations

- Use `React.memo()` for components receiving stable props
- Use `useMemo()` for expensive computations derived from props/state
- Use `useCallback()` for event handlers passed to child components
- AVOID creating new objects/arrays in render — move to useMemo or outside component
- AVOID inline arrow functions in JSX that cause child re-renders

## State Updates

- Batch related state updates into single `setState` call
- Use functional updates `setState(prev => ...)` when new state depends on previous
- AVOID storing derived data in state — compute with useMemo instead

## Anti-patterns to AVOID

- `any` type that bypasses memoization comparison
- Spreading props without filtering: `{...props}` breaks memo
- Deep object comparisons in render path
- Synchronous work in render — defer to useEffect

## How to verify

1. Use React DevTools Profiler to check re-render counts
2. Check canvas FPS during intensive operations
3. Run `yarn test:app` to ensure no regressions
