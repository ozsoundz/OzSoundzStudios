# Oz Soundz Studios — Website

Static multi-page site for **ozsoundzstudios.com.au**, in the same grungy family as Oz Soundz Records and The Oz Soundz Group.
Studios gets its own colour lane, **Verdigris & Valve**: oxidised-copper patina green, valve/VU-meter amber, and a hot REC red.

No build step and no framework. Upload the folder to any static host (GitHub Pages, Netlify, cPanel, etc.) and it works.

## Structure

```
index.html                 Home (interactive console hero, services, planner teaser, progress, rooms, group)
about-us/                  About Us · Our Purpose · Our Team
the-studio/                The Rooms (interactive floor plan) · Services + Session Planner · Gear Locker
dev-progress/              Overview (LED meters + phase timeline) · Plan · Design · Build · Test
                           Documents · Photos & Videos · Q&A (searchable)
our-media/                 Blogs & Articles (filter + search) · Social Media
the-group/                 The Oz Soundz Group
contact.html               Register Interest (3-step) · Enquiry · Join The Crew
404.html, sitemap.xml, robots.txt

assets/css/studios.css     All styling. Colour tokens are at the top (:root)
assets/js/data.js          ← SITE CONTENT & SETTINGS: edit this most often
assets/js/site.js          Header, footer, icons and all interactive widgets
assets/fonts/              Self-hosted fonts (Big Shoulders Display/Stencil, IBM Plex Mono, Barlow, all under the SIL OFL)
assets/img/                favicon.svg, og-image.svg
```

The header, navigation and footer are built by `site.js`, so a menu change only has to be made once, in the `NAV` list in `site.js`.

## Everyday updates, all in `assets/js/data.js`

| What | Where in data.js |
|---|---|
| Dev progress meters (%) and "last updated" | `progress`, `lastUpdated` |
| Phase status and checklist ticks | `phases` (status: done / active / pending; task: ok / wip / '') |
| Gear Locker items | `gear` |
| Blog posts (add a `url` once a post is written) | `posts` |
| Q&A | `faq` |
| Floor-plan room descriptions | `rooms` |
| Email, socials, ABN | `site` |

## Forms (to do before going live)

By default, forms open the visitor's email app with everything filled in, addressed to studios@ozsoundz.com.au.
For real in-page submissions, create a free form endpoint (e.g. Formspree) and paste its URL into `site.formEndpoint` in `data.js`.
All forms (register, enquiry, crew, Q&A, gear suggestions, newsletter) then post there automatically. Each form has a honeypot field to catch spam bots.

## Session Planner pricing

The planner estimates **hours and days** only. The cost shows "Rates TBA" until you set
`planner.rates` in `data.js` (AUD per hour for tracking, mixing and mastering). The hour rules of thumb are in the same block if you want to tune them.

## Placeholders to replace over time

- **Photos & Videos:** swap the striped placeholders for `<img>` tags or YouTube `<iframe>` embeds.
- **Documents:** put PDFs in `assets/docs/` and link them in the table.
- **Blog posts:** each card says "Full article coming soon" until you give it a `url`.
- **Floor plan:** this is a concept only. Update the SVG in `the-studio/index.html` once the architect's plan exists.

## Deploying on GitHub Pages

1. Push this folder's contents to the root of the `OzSoundzStudios` repo.
2. Go to Settings → Pages → deploy from the `main` branch, root folder.
3. To point `ozsoundzstudios.com.au` at it, add a `CNAME` file with the domain and update DNS (this moves the domain off Google Sites).
