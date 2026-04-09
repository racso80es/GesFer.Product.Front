---
id: plan-kaizen-typing-improvements
title: Plan for Kaizen Typing Improvements
status: ACTIVE
---
# Plan
1. Update `src/components/ui/loading.tsx`.
2. Add `'data-testid'?: string;` to `LoadingProps`.
3. Pass `'data-testid': testId` via destructuring and apply it to the `div`.
