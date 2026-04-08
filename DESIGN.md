# DESIGN.md — Factory Data Authority

## 1. Visual Theme & Atmosphere
- Clean, premium, data-heavy, trustworthy.
- Feels closer to Stripe/Vercel/Linear than random AI boilerplate.
- Calm, structured, high-signal. No startup-bro gradient sludge.
- Prioritize hierarchy, spacing, readability, and credibility over visual tricks.

## 2. Color Palette & Roles
- Background: #F8FAFC
- Surface: #FFFFFF
- Surface Alt: #F1F5F9
- Text Primary: #0F172A
- Text Secondary: #475569
- Border: #E2E8F0
- Primary: #0F172A
- Secondary / Accent: #2563EB
- Accent Soft: #DBEAFE
- Success: #059669
- Warning: #D97706
- Danger: #DC2626

## 3. Typography Rules
- Sans serif only. Clean, modern, neutral.
- Large headings with tight tracking and strong contrast.
- Body text optimized for scanning, not essay aesthetics.
- Numbers in cards/tables use tabular numerals where possible.

## 4. Component Styling
- Buttons: medium radius, crisp contrast, subtle hover transitions.
- Cards: soft border + small shadow, never giant glow.
- Inputs: quiet, professional, generous padding.
- Tables: zebra-free unless needed; use spacing and borders for clarity.
- Navigation: simple, compact, sticky only when it truly helps.

## 5. Layout Principles
- Generous whitespace.
- 1 clear primary CTA per section max.
- Avoid repeating the same CTA block 3 times.
- Avoid overly tall hero sections.
- Grid density should remain readable on mobile.

## 6. Depth & Elevation
- Minimal shadows.
- Let borders, spacing, and typography carry the UI.
- No neumorphism, no glassmorphism, no fake 3D nonsense.

## 7. Do
- Make data pages feel authoritative.
- Use short explanatory copy around metrics.
- Prefer comparison blocks, source references, and useful summaries.
- Make mobile stat cards readable without truncation.
- Keep titles specific and SEO-strong but natural.

## 8. Don't
- No purple AI gradients by default.
- No generic SaaS hero with meaningless floating cards.
- No repeated brand name in titles/headings.
- No “best X franchises franchises”.
- No fake counters or inflated claims beyond the real published scope.

## 9. Responsive Behavior
- Mobile first.
- Stat cards must wrap cleanly.
- Tables collapse into cards when readability drops.
- Sticky bars must not duplicate existing global nav.
- Touch targets >= 40px.

## 10. Agent Prompt Guide
- Use this as the default design baseline for Web Factory data/reference sites.
- If a project has a custom DESIGN.md, prefer that over this file.
- If the brief includes a named visual benchmark, merge it with this system instead of throwing this away.
