# Site consistency and trust spec (2026-09-22)

Owner of copy: kg-cmo. Implementer: kg-site-engineer. Branch only, no deploy until Rodolfo approves the diff.

Scope: configuration and text. No structural or design changes. Every sentence below is final copy; the engineer does not paraphrase. Where a sentence is not given, the engineer applies the canonical values from section 1 mechanically and keeps the surrounding text intact.

Decisions by Rodolfo (2026-09-22): cost claim is a single number (60%), timeline is "shortlist in 5 business days, most hires close in 2 to 4 weeks", Outsourcing & Staffing is a PJ contractor engagement in practice, but the site KEEPS the familiar term "employer of record" because that is what clients search for and understand; the only thing that changes is that no Staffing price breakdown may list CLT charges or "mandatory Brazilian employment charges", because a PJ engagement has none, ICP is "up to 100 employees", author of all 22 legacy posts is Rodolfo Chaves with the signature at the END of the post (existing PostAuthor placement), candidate-facing posts stay untouched except one typo, kaptas.io is not ours, no paid traffic runs to lp.kaptasglobal.io, the /calculator page was never meant to be public and is removed from the site, the front end and every AEO/GEO surface. CLT load figure confirmed at 70 to 80%. Rodolfo LinkedIn: https://www.linkedin.com/in/rodolfoch . The "Series G startup" case is accurate and stays.

## 1. Canonical values (single source of truth)

Create `src/data/claims.ts` and import from it wherever the value appears in TSX or schema code. Markdown and txt sources (`content/llms-full-core.md`, `public/llms.txt`) are edited by hand to the same strings.

| Key | Canonical string | Notes |
|---|---|---|
| COST_CLAIM | `up to 60% lower cost than equivalent U.S. hires` | Single number, never a range. Case-study figures (55%) stay as outcomes, not claims. |
| COST_CLAIM_SHORT | `Up to 60% lower cost` | Hero and badges. |
| SHORTLIST | `a pre-vetted shortlist within 5 business days` | |
| TIME_TO_HIRE | `most hires close in 2 to 4 weeks` | Replaces every "14 days", "day 14", "14-day". |
| ICP_SIZE | `up to 100 employees` | Replaces "1 to 70 employees" and "1-100 employees". |
| CLT_LOAD | `70 to 80% above gross salary` | Educational only (Hire in Brazil page and blog). Never part of the Staffing price breakdown. |
| GUARANTEE | `90 to 180 day replacement guarantee` | Unchanged. |
| FEE | `one-time placement fee of 18% of first-year compensation` | Unchanged. |

Rule for "60%": wherever the current text says "40 to 60%", "40-60%", "50%+", "above 50%", "up to 67%", or bare "60%", the replacement is "up to 60%". Sentences must still read as a single number, for example "Companies typically save up to 60% versus equivalent U.S.-based hires", never "save up to 60% to 60%". The DirectHire example ($70.8K to $94.4K first-year cost) is consistent with "up to 60%" against a U.S. senior at $180K to $220K; keep the numbers, change only the badge and footnote.

Known occurrences to replace (grep confirmed 2026-09-22): `src/components/home/Hero.tsx:96`, `src/pages/Home.tsx:24` (meta description), `src/pages/DirectHire.tsx:542,547`, `src/data/seoSchemas.ts:96,111,238,689,690`, `src/components/pricing/PricingFAQ.tsx:18`, `src/components/home/HomeFAQ.tsx:16,28`, `src/data/aeoContent.ts` (home and pricing paragraphs; the calculator paragraph is deleted, see section 12), `public/llms.txt:27`, `content/llms-full-core.md:79,88`. Blog post bodies are NOT touched for this item.

## 2. Timeline copy (verbatim)

- `src/components/home/HowItWorks.tsx` H2: `From kickoff to hire in <span>2 to 4 weeks</span>` (span keeps the purple class).
- `src/components/home/LeadGenerationForm.tsx` default subtext: `The role you've been trying to fill for months? We can close it in 2 to 4 weeks.`
- `src/components/home/FaqSection.tsx` answer: `Our typical time-to-hire is 2 to 4 weeks from the kickoff call to the accepted offer, with a pre-vetted shortlist within 5 business days. We maintain an active network of passive candidates, allowing us to move much faster than traditional recruiting methods.`
- `src/pages/Home.tsx` ogSubtitle: `Outsourcing, Direct Hire, Executive Mapping. Candidates in 5 days, hires in 2 to 4 weeks.`
- `src/pages/Home.tsx` meta description: `Hire senior Brazilian developers, engineers, and specialists for your US team. Outsourcing & Staffing, Direct Hire, Executive Mapping, and market entry support. Up to 60% lower cost, US timezone overlap, candidates in 5 days.`
- `src/data/seoSchemas.ts` HowTo step 4 last sentence: `The new hire typically starts within 2 to 4 weeks of kickoff.` HowTo `totalTime`, if present, becomes `P4W`.
- `src/data/seoSchemas.ts:307` and `src/pages/ContractorStaffing.tsx:55`: `Kaptas Global typically delivers a shortlist of three pre-vetted candidates within five business days of kickoff. Most hires close within 2 to 4 weeks of the first alignment call. Kaptas Global achieves this speed through direct sourcing and a structured screening process that eliminates wasted interviews and low-signal candidates.`
- `src/pages/DirectHire.tsx:47`: `Most clients receive a shortlist of 3 to 5 pre-vetted candidates within 5 business days. Most hires close within 2 to 4 weeks of kickoff. For context, the industry average to hire a senior engineer is 35 to 45 days when recruiting internally, and up to 90 days for hard-to-fill roles.`
- `src/pages/DirectHire.tsx:477` value cell: `2 to 4 weeks`.
- `src/pages/ContractorStaffing.tsx:89` meta description: replace `14-day average` with `2 to 4 week average`.
- `src/pages/GetStarted.tsx` timeline comment and any visible "14 days": `2 to 4 weeks`.
- `src/data/aeoContent.ts` outsourcingStaffing: `The average time from kickoff to a signed hire is 2 to 4 weeks.`
- `content/llms-full-core.md:61` heading: `## Hiring process (4 steps, shortlist in 5 business days, most hires in 2 to 4 weeks)`; line 66 last sentence: `The new hire typically starts within 2 to 4 weeks of kickoff.`

## 3. Outsourcing & Staffing: keep "employer of record", remove CLT from the price breakdown

Decision: the term "employer of record" STAYS everywhere it appears today (FAQ, AEO, schemas, llms files). Clients know the term and it describes what they buy: someone who contracts the professional on their behalf for compliance reasons. Do not introduce "PJ" or "contractor (PJ)" wording into Staffing copy. Do not touch `TermsOfService.tsx`.

What changes is only the description of what the monthly fee is made of. Today it lists "CLT charges" or "mandatory Brazilian employment charges (which typically add 70 to 80% above gross salary under CLT contracts)", which is false for a PJ engagement and would make an AI tell a prospect their fee includes CLT benefits. Canonical composition sentence:

`the professional's compensation, Kaptas Global's management fee, and ongoing HR support`

Apply it verbatim in these places, keeping the rest of each sentence intact:

- `src/data/seoSchemas.ts:198` OfferCatalog: `Flat monthly cost per professional including the professional's compensation and Kaptas Global's management fee, billed as a single USD invoice.`
- `src/data/seoSchemas.ts:96` and `content/llms-full-core.md:79` FAQ answer: `example Senior Full-Stack Engineer $4,000-$6,000/month fully loaded, including the professional's compensation and Kaptas Global's management fee`.
- `src/data/seoSchemas.ts:218` and the matching pricing FAQ in `src/components/pricing/PricingFAQ.tsx`: `The flat monthly cost covers the professional's compensation, Kaptas Global's management fee, and ongoing HR support. You receive one USD invoice with no separate charges for payroll, taxes, benefits, or compliance, and unlimited replacements are included.`
- `src/data/seoSchemas.ts:178` HowTo step 4: replace `covering salary and all mandatory Brazilian employment charges` with `covering the professional's compensation and Kaptas Global's management fee`.
- `src/data/aeoContent.ts` pricing paragraph: replace `covers salary, all mandatory Brazilian employment charges (which typically add 70 to 80% above gross salary under CLT contracts), Kaptas Global's management fee, and ongoing HR support` with `covers the professional's compensation, Kaptas Global's management fee, and ongoing HR support`.
- `src/data/aeoContent.ts` outsourcingStaffing paragraph: replace `covers salary, all mandatory Brazilian employment charges, Kaptas Global's management fee, and ongoing HR support` with `covers the professional's compensation, Kaptas Global's management fee, and ongoing HR support`.
- `src/data/aeoContent.ts` hireInBrazil paragraph: the CLT explanation (13th salary, FGTS, INSS, 70 to 80%) STAYS. It is educational and correct there.
- Any other occurrence of `CLT charges` or `mandatory Brazilian employment charges` inside Staffing or pricing copy found by grep gets the same substitution. `StartOperation.tsx` (Hire in Brazil) is out of scope for this section.

## 4. ICP size

Replace `1 to 70 employees` (aeoContent home, llms-full-core:9) and `1-100 employees` (llms.txt:18) with `up to 100 employees`.

## 5. CLT load figure

Site-wide figure stays `70 to 80% above gross salary`. `src/data/blog-posts.json`, post `brazil-hiring-costs-2025-total-cost-guide`, metaDescription becomes: `CLT adds 70 to 80% on top of base salary. See the full build-up, salary, charges, fees, and what a Brazilian engineer actually costs per month.` The body example "$50,000 base results in roughly $75,000" becomes `a 50,000 USD base in this example results in roughly 85,000 to 90,000 USD in annual employer cost`.

## 6. Hidden text becomes visible

- `AEOContent` renders a visible, collapsed `<details>` block instead of `sr-only`: summary text `Kaptas Global at a glance`, placed at the bottom of the page above the footer, styled like the FAQ accordion (same border and text tokens). Content unchanged. Blog posts: remove the AEO block entirely (Article + publisher schema already carry the entity). The per-post "X, a Kaptas Global blog article" prefix is dropped with it.
- Remove `<meta name="keywords">` support from `SEO.tsx` and every `keywords=` prop.

## 7. Blog mechanics (`src/data/blog-posts.json` and `BlogPost.tsx`)

- Strip `?utm_source=chatgpt.com` (and any `utm_*` query) from internal links in all posts, and strip the trailing slash so links match canonical URLs. 34 occurrences across 6 posts.
- Post `brazil-hiring-costs-2025-total-cost-guide`: title becomes `Brazil hiring costs in 2026: the complete total cost guide for US teams` (H1 follows title). Slug stays. Add `dateModified: "2026-09-22"`. Support `dateModified` in `build-sitemap.mjs` (use it as lastmod when present) and in the Article schema (already reads it).
- Post `salaries-in-brazil-for-us-remote-teams-2026`: add `dateModified: "2026-09-22"` only if the engineer touches its content (utm cleanup does not count). Otherwise leave.
- "Cost comparison in one view" section of the costs post: convert the two-model prose into a 3-column HTML table (Model | Annual cost | When it fits) using only the numbers already in the text.
- Author: add to all 22 posts `author: { name: "Rodolfo Chaves", role: "Founder & CEO, Kaptas Global", bio: <existing PostAuthor bio if any, else the one-liner below>, sameAs: "https://www.linkedin.com/in/rodolfoch" }`. Article schema Person gets `sameAs` and `url`. PostAuthor stays at the end of the post (current placement). Bio one-liner: `Founder & CEO of Kaptas Global. Has placed senior Brazilian professionals with U.S. companies since 2024 and writes about how to hire in Brazil without the guesswork.`
- Typo: in post `how-brazilian-professionals-save-up-to-70-in-taxes-...` replace `Internacional` with `International`. Nothing else in the three candidate-facing posts changes.
- Home AEO paragraph: `a Series G startup` is accurate. Do not change it.

## 8. Sitemap lastmod

`scripts/build-sitemap.mjs`: static pages get `lastmod` from the last git commit date of their page file (`git log -1 --format=%cs -- <file>`), with `today` only as fallback when git is unavailable. Map: `/` Home.tsx, `/pricing` Pricing.tsx, `/blog` build date (it changes with every post), `/direct-hire` DirectHire.tsx, `/contractor-staffing` ContractorStaffing.tsx, `/executive-mapping` ExecutiveMapping.tsx, `/hire-in-brazil` StartOperation.tsx, `/get-started` GetStarted.tsx, `/ebook` Ebook.tsx, `/privacy-policy` and `/terms-of-service` their files.

## 9. Organization and founder identity

`organizationSchema.sameAs`:
```
https://www.linkedin.com/company/kaptas-global/
https://clutch.co/profile/kaptas-global
https://www.g2.com/sellers/kaptas-global
https://www.trustpilot.com/review/kaptasglobal.io
```
Founders:
```
{ "@type": "Person", "name": "Rodolfo Chaves", "jobTitle": "Founder & CEO", "sameAs": ["https://www.linkedin.com/in/rodolfoch"] }
{ "@type": "Person", "name": "Henry Novaes", "jobTitle": "Co-Founder", "sameAs": ["https://www.linkedin.com/in/henry-novaes/"] }
```
Add the same URLs to the `## Contact` block of `public/llms.txt` and the Company block of `content/llms-full-core.md`.

## 10. lp.kaptasglobal.io

Live, indexable, self-canonical, same title as the home page. Engineer locates the deployment (Vercel project list first). Add `<meta name="robots" content="noindex, follow">` and `<link rel="canonical" href="https://kaptasglobal.io/">`. If the deployment is not reachable from our accounts, report back instead of guessing.

## 12. Remove the calculator from the site and from every AEO/GEO surface

`/calculator` was never meant to be public. It is live today (HTTP 200, `index, follow`, in the sitemap, in `llms.txt`, prerendered, with a WebApplication schema and an AEO paragraph). Remove it completely:

- `src/App.tsx`: remove the `calculator` route.
- `scripts/prerender.mjs`: remove `/calculator` from the route list.
- `scripts/build-sitemap.mjs`: remove the `/calculator` entry.
- `public/llms.txt`: remove the "Brazil Hiring Cost Calculator" line.
- `content/llms-full-core.md` and `scripts/build-llms-full.mjs`: remove any calculator mention.
- `src/data/aeoContent.ts`: delete the `calculator` paragraph.
- `src/data/seoSchemas.ts`: delete the calculator WebApplication schema and the calculator FAQ schema (around lines 650 to 700) and every export that only the calculator used.
- `src/pages/Calculator.tsx` and `src/data/calculatorData.ts`: delete, unless `calculatorData` is imported by another page. If it is, keep the data file and delete only the page.
- `vercel.json`: add a 301 from `/calculator` to `/pricing` (Google may already have the URL).
- Any internal link or mention of the calculator in `Home.tsx`, `Pricing.tsx`, ebook or blog components: remove.
- Confirm after build that `dist/calculator/index.html` does not exist and that a grep for "calculator" across `dist`, `public`, `content`, `src` returns nothing except unrelated words.

## 11. Definition of done

- `grep -rniE "14 days|day 14|14-day|CLT charges|mandatory Brazilian employment charges|40-60|40 to 60|50%\+|67%|1 to 70|1-100 employees|utm_source=chatgpt|keywords=|calculator" src content public/llms.txt scripts` returns only: the Hire in Brazil page and its AEO paragraph (educational CLT text), Terms of Service, and blog bodies not in scope.
- `npm run lint` and `npm test` pass; `npm run build` produces prerendered HTML where the "at a glance" block is visible markup, not `sr-only`.
- Sitemap shows distinct lastmod values for static pages.
- Branch pushed, no deploy. Rodolfo reviews the diff.
