## Libraries

### Global namespace

The global namespace is a table with the name "_G". It contains the global functions and libraries. Each library is a table with its functions.  
SLua has added all the LL constants (1010 constants, currently) to the global namespace.

<pre class="language-slua"><code class="language-slua">-- list of global functions (SLua)

for key, value in pairs(_G) do
    if type(value) == "function" then
        ll.OwnerSay(key)
    end
end</code></pre>

There are 22 functions that come from Luau, they are documented in [Standard Luau Libraries](https://luau.org/library):
- type, typeof, tonumber, tostring
- ipairs, pairs, next, select
- getmetatable, setmetatable
- rawget, rawset, rawequal, rawlen
- assert, error, pcall, xpcall, gcinfo
- print, unpack, newproxy

And 7 functions added by Slua:
- integer, uuid, rotation, quaternion
- tovector, torotation, toquaternion

We will see them in the Datatypes page below.

3 Luau functions are not in SLua:
- getfenv, setfenv: old Lua functions out of use.
- require: to import modules with functions.

### Libraries

The libraries are in the global namespace as tables.

<pre class="language-slua"><code class="language-slua">-- list of global tables (SLua)

for key, value in pairs(_G) do
    if type(value) == "table" then
        ll.OwnerSay(key)
    end
end</code></pre>

There are 10 libraries that come from Luau, with all their Luau functions, also documented in [Standard Luau Libraries](https://luau.org/library):
- table, string, math, bit32, os, vector (these ones have functions in common with the LSL functions, we will see them in the next pages)
- coroutine, utf8, debug, buffer


SLua has added:
- ll : with all the functions coming from LSL (525 functions, currently).

The functions have the same name, without the "ll" at the start (because "ll" is now the name of the library).  
So <code class="language-lsl">llSay()</code> becomes the function <code class="language-slua">Say()</code> in the library <code class="language-slua">ll</code> and is used as <code class="language-slua">ll.Say()</code>.

New functions that will be added to SLua in the future will be in other libraries, we already have two new libraries:
- lljson: to convert tables to JSON string and back, with the functions:
  - <code class="language-slua">str = lljson.encode( tab )</code>
  - <code class="language-slua">tab = lljson.decode( str )</code>
- llbase64: to convert string to base 64 strings and back, with functions with the same names:
  - <code class="language-slua">str64 = llbase64.encode( str )</code>
  - <code class="language-slua">tab = llbase64.decode( str64 )</code>
  
### Expected SLua improvements

#### require / include

It's expected before the final version. It seems that it will be some kind of include, similar to what Firestorm does in LSL, copying source code from other scripts or files. Probably not like require() in Luau/Roblox, that executes compiled code from another script that returns a value, usually a table of functions.

The canny is: [Require canny](https://feedback.secondlife.com/slua-alpha/p/a-require-function-to-load-and-execute-other-scripts).

#### type-checking and linting

Type checking automatically infers types from the values assigned to variables or manually by adding type annotations. These annotations can define types, combinations of types, or subtypes. There are directives that allow to control the level of type checking in each script, ranging from none to stricter than LSL.

Linting identifies possible issues like uninitialized or unused variables, duplicated functions, mismatched parameter counts, return values, and many more. There are also directives to enable or disable specific linting checks.

It would be achieved adding the Luau/Roblox analyzer to the SLua editor.

The canny is: [Type-checking and Linting canny](https://feedback.secondlife.com/slua-alpha/p/the-type-checking-warnings-are-not-displayed).
