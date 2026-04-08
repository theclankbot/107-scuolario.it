     1|     1|# PROJECT BRIEF DRAFT — Scuolario
     2|     2|
     3|     3|## CEO definition
     4|     4|- Web number: 107
     5|     5|- Working domain: scuolario.it
     6|     6|- Backup names worth keeping in reserve: scuolatlas.it, scuolavista.it
     7|     7|- Idea source: ideas-master #16 — Scuola in Chiaro Italia
     8|     8|- Site family: data authority directory + comparison utility
     9|     9|- Primary market: Italy
    10|    10|- Primary language at launch: Italian only
    11|    11|- Expansion rule: no multilingual routing now; prove the Italian site first
    12|    12|
    13|    13|## Core concept
    14|    14|A structured school finder for Italy built on official public school data.
    15|    15|
    16|    16|This should not be just a copy of ministry pages. The value has to come from:
    17|    17|- clearer school pages than the official tools
    18|    18|- stronger geography-first navigation
    19|    19|- city / province / region school listings that are actually pleasant to use
    20|    20|- useful compare views only when backed by real fields
    21|    21|- parent-facing UX instead of institutional sludge
    22|    22|
    23|    23|## Audience
    24|    24|- parents comparing nearby schools
    25|    25|- families checking school details and codes quickly
    26|    26|- users searching schools by city / province / type
    27|    27|- people who want a faster alternative to ministry search
    28|    28|
    29|    29|## Positioning
    30|    30|- practical Italian school finder
    31|    31|- easier to browse than the ministry tools
    32|    32|- geography-first and comparison-friendly
    33|    33|- utility/reference first, not bloggy edu content
    34|    34|
    35|    35|## Seed keywords for strategist
Use this root seed first. No duplicate variants.
1. scuola

Reasoning:
- `scuola` is the broad root and Semrush broad match will expand the real variants

## Competition — what looks real
    47|    47|Current real SERP patterns from DDG:
    48|    48|- official dominates branded/head intent: unica.istruzione.gov.it, mim.gov.it, cercalatuascuola.istruzione.it
    49|    49|- strongest directory layer: tuttitalia.it/scuole
    50|    50|- private search / directory players also show up: cercascuole.it, scuoladvisor.it, scuolaitaly.it
    51|    51|
    52|    52|## Competitors to analyze deeply
    53|    53|1. https://unica.istruzione.gov.it/portale/it/scuola-in-chiaro
    54|    54|   - strongest official intent owner
    55|    55|   - beat it on browse UX, filters and crawlable local pages
    56|    56|2. https://www.tuttitalia.it/scuole/
    57|    57|   - strongest SEO-style directory comparator
    58|    58|   - study geography structure and page depth
    59|    59|3. https://www.cercascuole.it/
    60|    60|   - useful benchmark for finder-oriented private UX
    61|    61|4. https://www.scuoladvisor.it/
    62|    62|   - useful benchmark for parent-facing framing and compare language
    63|    63|
    64|    64|## Reference products to borrow from — then improve
    65|    65|1. Scuola in Chiaro / CercaLaTuaScuola
    66|    66|   Improve by:
    67|    67|   - less clunky search
    68|    68|   - cleaner region > province > city > school navigation
    69|    69|   - school pages with the right fields above the fold
    70|    70|2. Tuttitalia Scuole
    71|    71|   Improve by:
    72|    72|   - better filtering and school-type navigation
    73|    73|   - stronger page templates, not just directory lists
    74|    74|   - more useful compare layers and cleaner internal linking
    75|    75|
    76|    76|## Design direction
    77|    77|Desired feel:
    78|    78|- calm, practical, trustworthy
    79|    79|- parent-friendly, not childish and not bureaucratic
    80|    80|- information-dense with strong breadcrumbing and filters
    81|    81|
    82|    82|Avoid:
    83|    83|- ministry-style clunkiness
    84|    84|- startup fluff
    85|    85|- rankings with fake precision
    86|    86|
    87|    87|## Initial architecture hypothesis
    88|    88|- Home targeting school-finder / compare-schools-in-Italy intent
    89|    89|- Region pages
    90|    90|- Province pages
    91|    91|- City pages
    92|    92|- School detail pages
    93|    93|- School-type pages (licei, tecnici, professionali, etc.)
    94|    94|- compare/ranking views only if the data genuinely supports them
    95|    95|- Mandatory About / Data Sources / Contact / Privacy / Terms
    96|    96|
    97|    97|## Data/source hypotheses
    98|    98|- MIM / MIUR open data
    99|    99|- Scuola in Chiaro / CercaLaTuaScuola registry fields
   100|   100|- possible enrichment from INVALSI or other public school datasets if stable and useful
   101|   101|- strategist must validate which metrics are safe enough for comparison pages
   102|   102|
   103|   103|## Open questions strategist must validate
   104|   104|- exact URL hierarchy: region > province > city > school
   105|   105|- whether municipality pages need thresholds to avoid thin tails
   106|   106|- which school types deserve standalone hubs
   107|   107|- whether compare pages should be by city, province, or school type first
   108|   108|- what fields are strong enough for useful parent decisions without fake scoring theatre
   109|   109|
   110|   110|## Notes
   111|   111|Very good programmatic fit if kept geography-first and product-first. The trap is a bloated school dump. The strategist needs to define where the actual utility lives and where not to overbuild thin pages.
   112|   112|