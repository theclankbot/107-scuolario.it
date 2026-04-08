# Reviewer Signoff — Scuolario

Date: 2026-04-08
Reviewer: Web Factory Reviewer
Local URL: http://localhost:3107
Live URL: https://107-scuolarioit.vercel.app
Repo: https://github.com/theclankbot/107-scuolario.it

Hard gates
- [x] branded custom 404 exists locally and on live deploy
  - Local: /nonexistent-page shows “Questa pagina non e disponibile su Scuolario”
  - Live: https://107-scuolarioit.vercel.app/nonexistent-page shows same branded 404
- [x] favicon verified visually or by code path
  - Homepage serves /icon.svg and homepage head includes rel=icon for /icon.svg plus favicon.ico fallback
- [x] homepage checked
  - Local and live homepage loaded; hero, stats, regions, cities, guides verified
- [x] at least 5 random detail pages checked
  - /scuole/RMIC8F2007
  - /scuole/MIPC03000N
  - /scuole/BAPS060001
  - /scuole/NAPC01000Q
  - /scuole/VEPS01000X
- [x] one unpublished URL checked for proper gate/404
  - /comuni/genova local 404
  - /comuni/bari linked as muted from unpublished context on school page/search
- [x] browser console checked
  - browser_console invoked; Camofox backend reports no console messages / no JS errors available from capture
- [x] legal pages checked
  - /privacy, /terms, /contact checked locally; privacy/contact verified noindex by HTML meta robots
- [x] sitemap checked
  - /sitemap.xml returns 200 locally and live; no privacy/terms/contact URLs present
- [x] one live Vercel spot-check after deploy
  - Live homepage, live 404, and live school page /scuole/MIPC03000N checked

Additional review confirmations
- [x] Vercel Analytics present in src/app/layout.tsx
- [x] year is 2026 in visible copyright/footer and legal timestamps checked
- [x] logo is now a real SVG brand mark in header/footer
- [x] legal pages are noindex and excluded from sitemap
- [x] IndexNow key file exists in /public and submission script added
- [x] dynamic route links audited and publication-safe in reviewed surfaces (school detail, compare, search, comuni listing)

Notes
- Browser snapshot backend does not expose full DevTools network waterfall; QA relied on browser navigation plus direct HTTP spot-checks with curl.
- Data scope remains seed-sized, but gating and UX now make the current publication state honest and coherent.
