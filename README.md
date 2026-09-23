# Collage Gemeenskapskerk | website

Concept redesign for [Collage Gemeenskapskerk](https://collage.org.za/), an Afrikaans congregation in Elarduspark, Pretoria. Client work delivered by ASC Software.

**Status: concept, not production.** Frontend only. The contact form opens the visitor's email app, because this site has no form backend. Shop payments and the doctrine PDFs stay on collage.org.za.

## Stack

Static HTML/CSS/JS. No build step, no backend, no dependencies. Work Sans is self-hosted as woff2. Designed to be cheap to host anywhere and easy to hand off.

## Structure

```
index.html        Home: Sunday times, the three home icons, and the full Inligting board
inligting.html    The toonbank board (Meer Info on the live site)
gebeure.html      Standing weekly times; dated events stay on the live calendar and app
besoekers.html    A Sunday morning, including Kinderstad, Zone 7 and teens
berading.html     Counselling, groups, Wednesday chapel
kliniek.html      Medical clinic, appointment only
tuine.html        Gardens of Hope, stations, chapel booklets
english.html      English service, 11:00
geloof.html       What to expect, the dream, the team, doctrine PDFs
gee.html          Tithes and Touch Wellness bank details
winkel.html       Shop catalogue; checkout stays on collage.org.za
kontak.html       Office details and an email enquiry
lidmaatskap.html, doop.html, toewyding.html, trou.html, begrafnis.html
musikante.html, vrywilligers.html, besighede.html, hospitaal.html
styles.css        Shared design
script.js         Mobile nav, enquiry mailto
images/icons/     The congregation's own circular icons
```

`stack-pass/` and `week-spine/` are earlier homepage sketches kept for history.

## Design

Navy and white, Work Sans, and the pastel icons from collage.org.za. No invented clinic hours or a fake seven-day diary. Forms open the visitor's email app. Shop links go to the live products.

## Next steps

- Church to confirm anything that has changed since the live site: clinic days, the next dedication and baptism dates, and shop prices.
- Higher-resolution photo originals (current assets pulled from collage.org.za are 768×432–1024×576).
- Decide hosting and whether content should be editable by church staff.
