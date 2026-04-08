---
id: Kaizen_2026_04_08_typing_improvements
status: PENDING
priority: low
created: 2026-04-08
type: Kaizen
---
# Kaizen Task: Typing Improvements for UI Components

## Objective
Standardize testing hooks across UI components by ensuring that parameters like `data-testid` are explicitly typed in the component interfaces. Currently, `src/components/ui/loading.tsx` lacks an explicit type for `data-testid`.

## Rationale
Explicit typings for testing data attributes ensure that developers can confidently pass these properties without risking TypeScript errors when `strict` mode is heavily enforced, and it signals intent that the component is designed to be easily testable.

## Action Plan
1. Edit `src/components/ui/loading.tsx` to add `'data-testid'?: string;` to the `LoadingProps` interface.
2. Ensure the parameter is passed appropriately into the root element of the returned component.
