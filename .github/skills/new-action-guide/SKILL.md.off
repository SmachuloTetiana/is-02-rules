---
description: "Guide for adding new actions via actionManager"
---

# New Action Guide

## Applies to
`packages/excalidraw/actions/**`

## Important
- When this rule is applied, output the the following message: "✍️ New Action Guide applied"

## Context

Actions are the primary way to modify state in Excalidraw. All state changes flow through `actionManager.dispatch()`. This guide explains how to add new actions.

## Required Files

1. Create action file: `packages/excalidraw/actions/action{ActionName}.ts`
2. Export from: `packages/excalidraw/actions/index.ts`
3. Add action name to `ActionName` type in `packages/excalidraw/actions/types.ts`

## Action Interface (Required Properties)

```typescript
import { register } from "./register";
import { CaptureUpdateAction } from "@excalidraw/element";

export const actionMyAction = register({
  // REQUIRED: unique identifier, must be added to ActionName type
  name: "myAction",
  
  // REQUIRED: i18n key or string for UI label
  label: "labels.myAction",
  
  // REQUIRED: analytics tracking config, use `false` to disable
  trackEvent: { category: "element" }, // or "toolbar" | "canvas" | "menu" | etc.
  
  // REQUIRED: the action logic
  perform: (elements, appState, formData, app) => {
    return {
      elements: modifiedElements,      // or null to keep unchanged
      appState: { ...partialState },   // or null to keep unchanged
      captureUpdate: CaptureUpdateAction.IMMEDIATELY, // for undo/redo
    };
  },
});
```

## Optional Properties

```typescript
{
  // Icon for toolbar/menu display
  icon: myIcon,
  
  // Keyboard shortcut test
  keyTest: (event) => event.code === CODES.X && event.shiftKey,
  
  // Keyboard priority (higher = checked first)
  keyPriority?: number,
  
  // Whether action is available (return false to hide)
  predicate: (elements, appState, appProps, app) => boolean,
  
  // For toggle actions, whether currently "on"
  checked: (appState) => appState.myFeatureEnabled,
  
  // Panel UI component for properties sidebar
  PanelComponent: MyPanelComponent,
  
  // Search keywords for command palette
  keywords: ["flip", "mirror", "reverse"],
  
  // Allow in view-only mode (default: false)
  viewMode: true,
}
```

## CaptureUpdateAction Options

- `CaptureUpdateAction.IMMEDIATELY` — capture for undo/redo now
- `CaptureUpdateAction.NEVER` — don't track (for UI-only changes)
- `CaptureUpdateAction.EVENTUALLY` — batch with other updates

## Registration Steps

1. Add action name to `ActionName` union in `types.ts`:
   ```typescript
   export type ActionName = 
     | "existingAction"
     | "myAction"  // Add here
   ```

2. Export from `index.ts`:
   ```typescript
   export { actionMyAction } from "./actionMyAction";
   ```

3. Action is auto-registered via `register()` call

## Anti-patterns to AVOID

- NEVER modify state directly — always return from `perform()`
- NEVER use `any` type in action signatures
- NEVER import from `./manager.tsx` (circular dependency)
- AVOID side effects in `perform()` — keep it pure

## How to verify

1. Action appears in command palette (if has label)
2. Keyboard shortcut works (if has keyTest)
3. Undo/redo works correctly
4. Run `yarn test:app` for regression tests
