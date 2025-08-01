## Using SLua in the beta grid

These are the steps to follow before starting to script in SLua:

* Install the "Second Life Project Lua Editor" viewer, from: <https://releasenotes.secondlife.com/viewer.html>. This is a different viewer, with a different icon, than the "Second Life Viewer". We can keep our usual viewer for the main grid and use this one for the beta grid.

* Access the Beta Grid (Aditi), explained in:
  <https://lindenlab.freshdesk.com/support/solutions/articles/31000156725-accessing-aditi>

* Teleport to one of the four regions that have SLua activated. It doesn't work in the other regions. Sometimes one or two of these regions are offline, try another one if you can't tp or login:
  * [SLua Yardang](secondlife://Aditi/secondlife/SLua%20Yardang/241/235/27)
  * [SLua Tombolo](secondlife://Aditi/secondlife/SLua%20Tombolo/241/235/27)
  * [SLua Mesa](secondlife://Aditi/secondlife/SLua%20Mesa/241/235/27)
  * [SLua Tideland](secondlife://Aditi/secondlife/SLua%20Tideland/241/235/27)

* Rez an object and add a new script as usual. The script editor has a "compiler" drop-down list, at bottom center. Choose "SLua":
  * LSL Legacy (LSO2) : LSL, with "Mono" unchecked.
  * LSL Mono : LSL, with "Mono" checked (the usual one).
  * LSL 2025 VM : LSL, but compiled into VM Luau instead of VM Mono.
  * SLua
