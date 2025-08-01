## Libraries

### Global namespace

The global namespace is a table with the name "_G".

It contains the global functions and libraries. Each library is a table with its functions.

SLua has added all the LL constants (1002 constants, currently).

The global variables and functions created by the script will also be in this table.

<pre class="language-slua line-numbers"><code class="language-slua">-- list of global functions (SLua)

for key, value in pairs(_G) do
    if type(value) == "function" then
        ll.OwnerSay(key)
    end
end</code></pre>

There are 22 functions that come from Luau, they are documented in https://luau.org/library:

* type, typeof, tonumber, tostring
* ipairs, pairs, next, select
* getmetatable, setmetatable
* rawget, rawset, rawequal, rawlen
* assert, error, pcall, xpcall, gcinfo
* print, unpack, newproxy


And 7 functions added by Slua:

* integer, uuid, rotation, quaternion
* tovector, torotation, toquaternion

We will see them in the Datatypes section below.


3 Luau functions are not in SLua:

* getfenv, setfenv: old Lua functions out of use.

* require: to import modules with functions, a very useful option, hopefully it will be in SLua in some future, but it's not planned yet.


### Libraries

The libraries are in the global namespace as tables.

<pre class="language-slua line-numbers"><code class="language-slua">-- list of global tables (SLua)

for key, value in pairs(_G) do
    if type(value) == "table" then
        ll.OwnerSay(key)
    end
end</code></pre>

There are 10 libraries that come from Luau, with all the same functions, documented in https://luau.org/library:

* table, string, math, bit32, os, vector (these ones have functions in common with the LSL functions, we will see them below)
* coroutine, utf8, debug, buffer


SLua has added:

* ll

with all the functions coming from LSL (523 functions, currently).

The functions have the same name, without the "ll" at the start (because "ll" is now the name of the library).

So <code class="language-lsl">llSay</code> becomes the function <code class="language-lua">Say</code> in the library <code class="language-lua">ll</code> and is used as <code class="language-lua">ll.Say</code>.
