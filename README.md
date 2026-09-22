# Collage Gemeenskapskerk — website

Concept redesign for [Collage Gemeenskapskerk](https://collage.org.za/), an Afrikaans congregation in Elarduspark, Pretoria. Client work delivered by ASC Software.

**Status: concept, not production.** Copy, event dates, hours and contact details are still waiting on the church. The contact page opens the visitor's email app with a filled-in message, because this site has no form backend.

## Stack

Static HTML/CSS/JS. No build step, no backend, no dependencies. Fonts (Newsreader, Archivo) are self-hosted as woff2. Designed to be cheap to host anywhere and easy to hand off.

## Structure

```
index.html       Home — the week as the page's spine (seven-day rail, today marked live)
gebeure.html      Gebeure (events) — service times and upcoming events
berading.html     Berading Sentrum (counseling centre)
kliniek.html      Mediese Kliniek (medical clinic)
english.html      English Service
geloof.html       Geloof (beliefs)
gee.html          Gee (giving/tithes)
winkel.html       Winkel (shop)
kontak.html       Kontak (contact + general inquiries)
styles.css        Shared design system and components
script.js         Mobile nav toggle, "today" marking, next-service line
fonts/, images/   Shared assets
```

`stack-pass/` and `week-spine/` are earlier single-page homepage concepts kept for design history; `week-spine` is the direction this site was built from.

## Design tokens

Ink (`#141820`) on a warm paper ground (`#f3efe6`), gold accent (`#c6a15a`), Newsreader paired with Archivo. The header, type and footer are shared. Each page has its own layout so the inner pages are not the same template repeated. Motion is a short entrance and scroll reveal, and it switches off for reduced-motion.

## Next steps

- Church to confirm: bank details for giving, clinic/counseling hours, real event calendar, shop items and pricing, office email and hours.
- Higher-resolution photo originals (current assets pulled from collage.org.za are 768×432–1024×576).
- Decide hosting and whether content should be editable by church staff.
