---
id: kaizen-duplicate-html-layouts
action_id: feature-execution
feature_id: kaizen-duplicate-html-layouts
title: Fix duplicate html tags in locale layout
status: in_progress
---
# Specification: Fix duplicate html tags in locale layout
The `src/app/[locale]/layout.tsx` file defines `<html>` and `<body>` tags as well as providers that are already defined in `src/app/layout.tsx`. This causes duplicate HTML elements in the DOM. The solution is to remove these redundant elements from the localized layout.
