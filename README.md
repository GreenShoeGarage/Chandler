# CHANDLER (FI-269)

A common parts library for people building things in the stretch between a prototype and a few hundred units. Electronic and mechanical, in one file, offline.

A chandlery is a curated stock of the things builders always need, kept on hand because they are always needed. That is what this is.

Version 1.4.0. Single file. Open `chandler.html` by double clicking it. There is no server, no build step, no install, and no network request of any kind.

## Why this exists

Octopart ran a Common Parts Library from 2017. It was a curated set of generic parts, each with one or more orderable part numbers, at least two alternates where possible, and an explicit flag wherever an alternate was not a drop in replacement. It deliberately aimed at covering about eighty percent of a design rather than everything, and it standardized on hand assemblable sizes. It grew out of Seeed's Open Parts Library.

It is gone. Seeed's OPL still exists but is tied to one manufacturer's supply chain and one assembly service, and it is electronics only.

Meanwhile the mechanical side of the same problem has never had an answer at all. Nobody maintains a public, curated, "here is the M3 fastener family you should standardize on and here is why" reference for small shops.

CHANDLER answers one question: **what part should I design in, given that I need to buy ten, then a hundred, then a thousand of them without a sourcing adventure?**

## What it is not

- Not a live price aggregator. It has no network access.
- Not a distributor API client, a scraper, or a search engine over every part in existence.
- Not an inventory system. What you have on the shelf is a different problem.
- Not a quoting bench. Cost rollup happens in TALLY.
- Not a CAD or footprint library. It names footprints, it does not ship them.

## The three layers

Keeping these apart is the whole value of the instrument.

1. **Slot**, the generic part. What job it does, the preferred family, and why that family and not the obvious alternative. This is the opinionated layer.
2. **Orderable part**, a specific thing you can buy. Manufacturer part number or published standard designation, package, lifecycle, whether it is a drop in for the primary, and if not, exactly what differs.
3. **Sourcing snapshot**, evidence. A distributor, a region, a date, an observer, and what they saw: stock, minimum order, pack quantity, lead time class, price ladder. Never a fact, always an observation with a name and a date on it.

A fourth record type, the **decision**, captures which part you chose for a project and why. That is the paper trail that makes the tool worth reopening.

## The admission test

The library is useful because of what it excludes. Inclusion is an explicit rule set you can inspect and tune, not taste. Every gate returns pass, fail, or unknown, and unknown is a real state that is kept visually and logically distinct from fail. All gates are evaluated only against sourcing evidence that is not stale.

1. **Multiple sources.** At least two distinct distributors on current evidence, or a published standard designation, which means many manufacturers make an interchangeable item. Standard hardware usually passes on the second path where a single manufacturer part number would fail.
2. **Buyable in ones.** The lowest recorded minimum order quantity is at or below the configured ceiling, default ten. No reel only parts.
3. **Buyable in hundreds.** A real price break exists at the configured volume quantity, default one hundred, and the lead time class at that quantity is not long.
4. **Lifecycle.** Active passes. Obsolete never passes. Not recommended for new designs passes only in the alternate role, and is flagged. Unrecorded is unknown.
5. **Hand workable.** Placeable, solderable or assemblable with common shop tooling. This is what makes 0603 beat 0201 and a socket head cap screw beat a security torx.
6. **Documented.** A recorded datasheet, or a published dimensional standard, or an observer confirming on a dated visit that documentation was available on the page.
7. **Price sanity.** Unit price at the volume quantity is within a configurable multiple of the median for its category, default five times. This is what keeps boutique parts out. The median needs at least three priced parts in a category before it means anything, and until then the gate is honestly unknown.
8. **Not regionally trapped.** Evidence from at least two regions, or a published standard.

An item that fails goes to the **Waiting Room** with its failing gates listed, so the reason survives and the item can be reconsidered when the evidence changes. Nothing is ever deleted.

## Curation policy

Two rules govern every published copy, and both are enforced by the build rather than by good intentions.

**The library stays evidence free.** Slots, orderable parts, preferred families and the reasoning behind them are the library. Prices, stock figures, minimum orders and lead times are not. They are observations, and they belong to whoever made them.

**Published copies ship empty.** No maintainer's observations ride along. You do not inherit a price somebody else checked in a month you cannot see, and nothing in the file can go quietly stale on your behalf. What you record stays on your machine unless you deliberately export a pack.

The build audit fails outright if `library.json` contains a single sourcing record or decision record, so this cannot erode by accident during a future release.

## Evidence, and why the shipped library has none

The library ships with 91 slots and 182 orderable parts, and with **zero sourcing evidence**.

That is deliberate. A price, a stock figure, a minimum order quantity and a lead time are things a person saw on a page on a day. There is no honest way to ship them in a file with no network. So every part in the shipped library starts as **unverified**: nothing fails, but the gates that need evidence are unknown until someone looks.

Record what you see at the Evidence station. Sign it. It counts until it goes stale, which defaults to 180 days.

No slot ships provisional any longer. Every slot that names a purchasable thing now has at least one orderable entry against it. Three cross domain slots are conventions rather than purchases and correctly have none.

The About station can load a small **sample evidence** set so you can see what a fully scored part looks like. Every sample record is labelled, is excluded from scoring unless you explicitly switch it on at the Admission station, and can be removed in one click. Those figures are illustrative and are not observations of anything.

## Stations

- **LIBRARY**: search and browse. A category tree with live slot counts, faceted filters, honest coverage counts, and a BOM coverage check that tells you what fraction of an existing BOM the library already covers. Press `/` anywhere in the app to jump here with the caret in the search box; `Escape` clears it.
- **SLOT**: one generic part as a bin card. Family, reason, parameters, orderables with drop in status called out, coverage note, decisions. Slots and parts are editable in place, and every edit is marked as yours so it rides out in a proposal pack.
- **ADMISSION**: the rule set, the library health view, the Waiting Room, and the record of parts considered and rejected.
- **BASKET**: the working selection for one project, with quantity per build.
- **STOCK PLAN**: given N builds, what to buy, with pack quantity and minimum order rounding, grouped by distributor so each block is one order. Parts with no observation land in a separate group at the end, because they are not orderable yet.
- **PACKS**: export the library, export a proposal pack of just your own changes, import and diff a pack with per record accept.
- **EVIDENCE**: a verification queue, a batch sheet, a worksheet round trip, single entry, and every observation on file sorted by age. See below.
- **ABOUT**: version, licence, themes, debug logging, self test, sample data, fresh start.

## Three kinds of identifier

Not every entry in a parts library is a manufacturer part number, and pretending otherwise is how mechanical libraries go wrong. Every orderable declares which kind it is, and the app labels it.

- **`mpn`**, a manufacturer part number. One company makes it. `AP2112K-3.3TRG1`.
- **`standard`**, a published dimensional standard. Many companies make an interchangeable item, and the standard is the specification. `ISO 4762 M3 x 8, A2-70`. This is the only kind that satisfies the multiple sources and region gates without distributor evidence, because interchangeability is the second source.
- **`specification`**, a description precise enough to shop by, where no single part number is the right answer. `Shielded SMD power inductor, 10 uH, 4.0 x 4.0 mm, 1.5 A saturation`. Common for electrolytics, power inductors, springs, glands and anything sold under a dozen names. A specification gets **no** shortcut on any gate: it still has to earn its sourcing evidence like everything else.

The shipped library is 108 part numbers, 21 standard designations and 53 specifications.

## Tooling is part of the decision

The JST crimp tool, the heat set installation tip, the ferrule crimper, the flush cutter. None of these appear on a bill of materials, every one of them can stop a build dead, and they are bought once and then forgotten forever.

Eighteen slots declare their required tooling, split into one time purchases and consumables, each with the reason it matters. The Stock Plan station collects the tooling for everything in your basket, deduplicated, showing which slots wanted each item, and exports it as its own list. It rides out in the markdown basket summary too.

This is the single most useful thing the mechanical half of the library does that a spreadsheet does not.

## Ladders

Some families are one purchase, not several. `M3 x 6 through 20` is one decision about what to keep in the drawer, and the library treats it that way: the slot carries a ladder of the sizes to stock, each with its full designation, and the bin card lets you add one rung or stock the whole ladder at once.

A ladder rung that has its own orderable record is matched to it. A rung that does not becomes a basket line in its own right, flagged as not being a library part, so nothing is quietly invented.

## Measuring coverage instead of claiming it

The Octopart library aimed at covering about eighty percent of a design. CHANDLER inherits that as a goal and refuses to state it as a fact, because it is measurable and until you measure it against your own boards it is somebody else's number.

Run a BOM through the coverage check on the Library station and **save the run**. What is kept is the name, the date, the score and the part numbers. The BOM itself is never stored. Enough runs and the Library station reports coverage across every board you have measured, alongside the most recent one.

The payoff is **what to curate next**: part numbers that turned up in your BOMs and are not in the library, ranked by how many separate boards they appeared in, with the boards named. A part in four of your designs is a slot waiting to be written. A part in one is probably the thing that makes that design yours, and the library was never meant to cover it.

Each gap offers two actions, and both of them close it:

- **Open a slot for it** creates a provisional slot with the part already attached, marked as having come from a coverage check rather than from curation. The slot says out loud that it is unfinished until it has a preferred family and a reason for that family, because a slot without an opinion is a note to self.
- **Record why not** files the part as considered and rejected, with the reason, the date and who decided. It then stops appearing in the gap list.

That second one is the quiet one that matters. Without it you evaluate the same reel only part every eight months and reach the same conclusion. Rejections live on the Admission station, ride out in proposal packs like everything else, and can be reconsidered, which archives the old reasoning rather than deleting it.

A rejection with no reason is refused. It would be worse than no record.

## Collecting evidence without hating it

The library is only worth what the evidence in it is worth, so the Evidence station is built around how the work actually happens: one distributor, one sitting, many parts.

**The verification queue** shows what needs a human, worst first: parts with no evidence at all, then parts whose every observation has gone stale, then parts sitting below the distributor bar, then observations due to expire within thirty days. Because unevidenced parts outnumber everything else on a fresh copy, the queue can be narrowed to one reason at a time, with a live count on each.

**The batch sheet** takes a set of parts from the queue and gives you one row each. You fill the distributor, region, date and observer once at the top, then run down the list entering stock, minimum order, pack, lead class and the price ladder. Blank rows are skipped, so you can stop whenever the tab you are on runs out of parts.

**The worksheet round trip** is for when you are not at the machine holding the library. Download a CSV with one row per distributor still wanted, part number and slot already filled in. Take it anywhere, fill it in, load it back. Rows you never got to are counted and ignored rather than reported as errors. Rows that cannot be used are listed with the reason before anything is written, and you get a chance to back out.

The same importer reads any CSV with those column names, so it doubles as a bulk evidence import.

Price ladders are written as `1:0.10; 100:0.04`. Commas, semicolons, spaces and `@` all work, which matters because commas do not survive a CSV cell gracefully.

Re-importing the same worksheet does not duplicate anything. A sourcing record is keyed on part, distributor, region and observation date, so a second import of the same sheet replaces in place, while the same part observed on a different day is correctly a second record.

**Datasheet links** can be captured while you are already on the page, at single entry or in a worksheet column, and are written onto the part. A link implies a sighting, so it satisfies the documented gate on its own.

## Interoperation

- **BOM CSV for TALLY**, header tokens exactly `ref,mpn,description,qty`.
- **TALLY job JSON**, shape `{meta, buildQty, bom:[{ref, mpn, desc, qtyPer, offers:[{vendor, sku, moq, pack, leadDays, stock, breaks:[{qty, price}]}]}]}`. Currency is deliberately not carried into the job, because TALLY is single currency.
- **Library JSON**, **proposal pack JSON**, **evidence CSV**, **stock plan CSV**, and a **markdown summary** of a basket.
- **BOM CSV import** for the coverage check. It needs a column called `mpn`, `part number`, or `manufacturer part number`.

Every export is written as a real named file to your downloads folder, because the receiving instruments read from a file picker.

## Pack contribution workflow

There is no server, so curation happens through files.

1. Add or correct things in your own copy. Anything you touch is marked as yours.
2. Packs station, **Export a proposal pack**. That file holds only your additions and edits, not the whole library.
3. Attach it to a pull request or send it to whoever maintains the copy you started from.
4. They open Packs, choose your file, and get a diff: new records, changed records, and a field level list of what changed. They tick what they want and merge. Records that are already identical are reported and skipped.

Sourcing records are keyed on orderable, distributor, region and observation date, so two people observing the same part on different days produce two records rather than a conflict. That is correct: both observations happened.

`library-pack.json` in this repository is a worked example of the format.

## Licence

GPL-3.0

## Credits

Built by M.B. Parks, Green Shoe Garage. Concept debt to the Octopart Common Parts Library and to Seeed Studio's Open Parts Library. No third party code is vendored, which is why this is one file.

Support: buymeacoffee.com/mbparks

## Known Limitations

- **No sourcing evidence ships with the library.** Everything starts unverified. This is a design decision, not an omission, but it means the instrument is only as useful as the evidence you put into it.
- **No datasheet links ship with the library.** Rather than invent URLs, the documented gate accepts a dated sighting recorded by an observer. Add real links as you find them.
- **Sixteen slots are provisional** with no orderable part recorded. The preferred family is settled, the part number is not.
- **Local storage may be unavailable** when the file is opened directly from disk in some browser configurations. The app detects this, says so in the header, and keeps working in memory. Export before closing the tab if you see that message.
- **No PWA layer at v1.0.** A service worker requires an http origin, which contradicts the run from disk rule. Install to a home screen from a hosted copy if you want that.
- **Tooling is declared on eighteen slots, not on all of them.** A slot with no tooling recorded means nobody has written it down, not that none is needed.
- **Only one slot carries a ladder.** The M3 socket head cap screw family. The other fastener families, the bearing sizes and the O ring dash sizes all want one and do not have one yet.
- **A specification is not a purchase order.** It narrows the search; it does not guarantee two suppliers will hand you the same thing. Verify a sample before committing, particularly on electrolytics and modules.
- **Some identifiers are type designations, not single manufacturer part numbers.** SS14, SG90, MG996R, 17HS4401, 608-2RS, LM8UU and MGN12H are made by many people to varying quality. They are recorded that way on purpose and are marked in the notes. Verify the seller before committing.
- **Mechanical stock leans on standard designations** rather than part numbers, because that is how it is actually bought. A designation plus a material and a finish is a complete specification. A distributor SKU is not.
- **The price sanity gate needs at least three priced parts in a category** before a median exists. Until then it reports unknown rather than guessing.
- **The stock plan defaults pack quantity and minimum order to one** wherever no observation exists, which understates what you will actually have to buy.
- **The batch sheet applies one distributor to every row.** That matches how the work is done, but it means a part you can only get from a different distributor has to wait for that distributor's pass.
- **The worksheet has no conflict handling.** If two people fill in the same part, same distributor, same region and same day, the later import silently wins. That is the correct outcome for a re-check and the wrong one for a disagreement.
- **Stock plan grouping uses one observation per part**, the first current one on file, so a part stocked by three distributors is grouped under whichever was recorded first rather than the cheapest or the fastest. Choosing between distributors is a v1.5 problem.
- **T slot extrusion slot width is not interchangeable between vendors.** The library says so on the slot, but no software can protect you from a supplier who calls a 5 mm slot 20 series.
- **The library is not certification, not a load calculation, and not a safety case.** It tells you what is buyable, not what is safe. Mains, structural and life safety work needs a real engineering process on top.
- **Coverage is only as honest as the BOMs you feed it.** The eighty percent target remains a design goal until you have measured enough boards for the number to mean something. Three runs is an anecdote.
- **Coverage matching is exact on the part number**, normalised for case and punctuation. A BOM that names a part differently from the library reads as a gap even when the same part is sitting in a slot. Alternates are matched only if they are in the library under that number.
- **Coverage runs are local and do not travel in packs.** They are your measurements of your boards, not library content.

## Development

The single file is assembled from sources for maintainability. It has no build dependency at runtime.

```
node build-lib.js        # regenerate the seed library from the curated generators
node gen-sample.js       # regenerate the labelled sample evidence
node assemble.js 1.4.0   # inline everything into chandler.html and run the build audits
node harness.js          # 157 core assertions
node browser-harness.js  # 126 assertions against the built file in a headless DOM
```

The build audit fails the build on an unreplaced template token, any occurrence of `innerHTML`, `eval`, the `Function` constructor, `fetch`, `XMLHttpRequest`, a dynamic import, an external script reference, an em dash, or any sourcing, decision or candidate record in the shipped library.
