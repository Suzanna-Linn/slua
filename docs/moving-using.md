## Using SLua in the beta grid

These are the steps to follow before starting to script in SLua:

- Install the "Second Life Project Lua Editor" viewer, from:  
  <https://releasenotes.secondlife.com/viewer.html>  
  This is a different viewer, with a different icon, than the "Second Life Viewer". We can keep our usual viewer for the main grid and use this one for the beta grid.

- Teleport to one of the nine regions that have SLua activated. It doesn't work in the other regions:
  - [SLua Beta Landing](http://maps.secondlife.com/secondlife/SLua%20Beta%20Landing/128/128/23)
  - [SLua Beta Porridge](http://maps.secondlife.com/secondlife/SLua%20Beta%20Porridge/128/128/23)
  - [SLua Beta Eraserhead](http://maps.secondlife.com/secondlife/SLua%20Beta%20Eraserhead/128/128/23)
  - [SLua Beta Glass](http://maps.secondlife.com/secondlife/SLua%20Beta%20Glass/128/128/23)
  - [SLua Beta Void](http://maps.secondlife.com/secondlife/SLua%20Beta%20Void/128/128/23) (this region is mostly water)
  - [SLua Beta Anderson](http://maps.secondlife.com/secondlife/SLua%20Beta%20Anderson/128/128/23)
  - [SLua Beta Sausage](http://maps.secondlife.com/secondlife/SLua%20Beta%20Sausage/128/128/23)
  - [SLua Beta Nicoise](http://maps.secondlife.com/secondlife/SLua%20Beta%20Nicoise/128/128/23)
  - [SLua Beta IsNeat](http://maps.secondlife.com/secondlife/SLua%20Beta%20IsNeat/128/128/23)

- Rez an object and add a new script as usual. The script editor has a "compiler" drop-down list, at bottom center. Choose "SLua":
  - LSL Legacy (LSO2) : LSL, with "Mono" unchecked.
  - LSL Mono : LSL, with "Mono" checked (the usual one).
  - LSL 2025 VM : LSL, but compiled into VM Luau instead of VM Mono.
  - SLua
 
- All the LL functions exist in SLua with the same name, but with a "." added between "ll" and the name of the function:  
  - <code class="language-lsl">llSay(0, "Hello world") // LSL</code> is <code class="language-slua">ll.Say(0, "Hello world")  -- SLua</code>.

- About the editor, some things to keep in mind:
  - Some errors are not detected when compiling, we will get them in an error window, which sometimes opens behind the editor window. If the script does nothing after compiling, move the editor window to check.
  - SLua counts script lines starting with 1, while the editor still shows a line numbered 0. We must always subtract 1 from the error line number to find it in the editor.
  - Coloring and highlighting do not work perfectly.
  - Highlighting is much slower than in LSL. If editing large scripts becomes too slow we can disable it with the debug setting **ScriptEditorDisableSyntaxHighlight**.
 
- Some common runtime errors and what to check first (especially when we are new to SLua):

  - **attempt to call a nil value**
    - Check typos, or missing . in a LL function, on the left of ().
  - **attempt to perform arithmetic (add) on string**
    - Check use of .. (not +) to concatenate strings.
  - **attempt to index nil with ...**
    - Check typos on the left of [].
  - **attempt to call a table value**
    - Check use of [] (not ()) to index a table.
  - In general, if the error is about **nil**, check typos.
