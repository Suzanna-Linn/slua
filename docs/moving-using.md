## Using SLua on the main grid

These are the steps to follow before starting to script in SLua:

- Install the official LL "Second Life Viewer", from:  
  <https://releasenotes.secondlife.com/viewer/26.5.0.40714792196.html>  
  This viewer has the option to edit SLua scripts, most of the other viewers haven't got it yet.

- Teleport to one of the nine regions that have SLua activated. It doesn't work in the other regions:
  - [Lua Beta Landing](http://maps.secondlife.com/secondlife/Lua%20Beta%20Landing/128/128/23)
  - [Lua Beta Porridge](http://maps.secondlife.com/secondlife/Lua%20Beta%20Porridge/128/128/23)
  - [Lua Beta Eraserhead](http://maps.secondlife.com/secondlife/Lua%20Beta%20Eraserhead/128/128/23)
  - [Lua Beta Glass](http://maps.secondlife.com/secondlife/Lua%20Beta%20Glass/128/128/23)
  - [Lua Beta Void](http://maps.secondlife.com/secondlife/Lua%20Beta%20Void/128/128/23) (this region is mostly water)
  - [Lua Beta Anderson](http://maps.secondlife.com/secondlife/Lua%20Beta%20Anderson/128/128/23)
  - [Lua Beta Sausage](http://maps.secondlife.com/secondlife/Lua%20Beta%20Sausage/128/128/23)
  - [Lua Beta Nicoise](http://maps.secondlife.com/secondlife/Lua%20Beta%20Nicoise/128/128/23)
  - [Lua Beta IsNeat](http://maps.secondlife.com/secondlife/Lua%20Beta%20IsNeat/128/128/23)

- Rez an object and add a new script as usual. The script editor has a "compiler" drop-down list, at bottom center. Choose "Lua":
  - LSL on Mono : LSL, with "Mono" checked (the usual one).
  - LSL Legacy : LSL, with "Mono" unchecked.
  - LSL on Lua : LSL, but compiled into VM Luau instead of VM Mono.
  - Lua
 
- All the LL functions exist in SLua with the same name, but with a "." added between "ll" and the name of the function:  
  - <code class="language-lsl">llSay(0, "Hello world") // LSL</code> is <code class="language-slua">ll.Say(0, "Hello world")  -- SLua</code>.

- About the editor, some things to keep in mind:
  - Some errors are not detected when compiling, we will get them in an error window, which sometimes opens behind the editor window. If the script does nothing after compiling, move the editor window to check.
  - Coloring and highlighting do not work perfectly.
 
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
