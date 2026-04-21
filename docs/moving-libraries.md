---
layout: default
title: Libraries
slua_beta: true
---

## Libraries

### Global namespace

The global namespace is a table with the name "_G". It contains the global functions and libraries. Each library is a table with its functions.  
SLua has added all the LL constants (1021 constants, currently) to the global namespace.

<pre class="language-sluab"><code class="language-sluab">-- list of global functions (SLua)

for key, value in pairs(_G) do
    if type(value) == "function" then
        ll.OwnerSay(key)
    end
end</code></pre>

There are 22 functions that come from Luau, they are documented in [Standard Luau Libraries](https://luau.org/library):
- tonumber, tostring, type, typeof
- ipairs, pairs, next, select
- getmetatable, setmetatable
- rawget, rawset, rawequal, rawlen
- assert, error, pcall, xpcall, gcinfo
- print, unpack, newproxy

And 7 functions added by Slua, they are explained in [Datatypes](/slua/moving-datatypes);
- uuid, rotation, quaternion
- tovector, touuid, torotation, toquaternion

3 Luau functions are not in SLua:
- getfenv, setfenv: old Lua functions out of use.
- require: to import modules with functions.

### Libraries

The libraries are in the global namespace as tables.

<pre class="language-sluab"><code class="language-sluab">-- list of global tables (SLua)

for key, value in pairs(_G) do
    if type(value) == "table" then
        ll.OwnerSay(key)
    end
end</code></pre>

There are 10 libraries that come from Luau, with all their Luau functions, documented in [Standard Luau Libraries](https://luau.org/library):
- table, string, math, bit32, vector ([Vectors](/slua/moving-vectors#the-vector-library))
- os, coroutine, utf8, debug, buffer


SLua has added:
- ll : with all the functions coming from LSL (526 functions, currently).
  - The functions have the same name, without the "ll" at the start (because "ll" is now the name of the library).  
  - So <code class="language-lsl">llSay()</code> becomes the function <code class="language-sluab">Say()</code> in the library <code class="language-sluab">ll</code> and is used as <code class="language-sluab">ll.Say()</code>.

- rotation / quaternion ([Rotations](/slua/moving-rotations#the-rotation-or-quaternion-library))

- lljson: to convert tables to JSON string and back ([lljson library](/slua/moving-lljson))

- llbase64: to convert string to base 64 strings and back, with these functions:
  - <code class="language-sluab">str64 = llbase64.encode( str )</code>
  - <code class="language-sluab">tab = llbase64.decode( str64 )</code>

### New functions in the table library

SLua has added 3 functions to the standard table library.

**table.append(t, ...)** : Inserts the given values into t, starting at #t + 1. It is a replacement for multiple calls to table.insert():
<pre class="language-sluab"><code class="language-sluab">-- table.append()
local t = { "a", "b", "c" }
table.append(t, "d", "e", "f")
print(table.concat(t,", "))  -- > a, b, c, d, e, f</code></pre>

It's the same than:
<pre class="language-sluab"><code class="language-sluab">-- table.append()
function append(t, ...)
    for i = 1, select("#", ...) do
        table.insert(t, select(i, ...))
    end
end</code></pre>

**table.extend(t1, t2)**: Inserts the values of t2 into t1, starting at #t1 + 1:
<pre class="language-sluab"><code class="language-sluab">-- table.extend()
local t1 = { "a", "b", "c" }
local t2 = { "d", "e", "f" }
table.extend(t1, t2)
print(table.concat(t1,", "))  -- > a, b, c, d, e, f</code></pre>

It can only extend by one table at a time, but it returns the extended table, so we can nest calls:
<pre class="language-sluab"><code class="language-sluab">-- table.extend()
-- t4 = t1 + t2 + t3
local t1 = { "a", "b", "c" }
local t2 = { "d", "e", "f" }
local t3 = { "g", "h", "i" }
local t4 = table.extend(table.extend(table.extend({}, t1), t2), t3)
print(table.concat(t4,", "))  -- > a, b, c, d, e, f, g, h, i</code></pre>

It's the same than:
<pre class="language-sluab"><code class="language-sluab">-- table.extend()
function extend(t1, t2)
    return table.move(t2, 1, #t2, #t1 +1, t1)
end</code></pre>

**table.append()** is optimized for speed and **table.extend()** is optimized for memory.

To save memory, instead of <code class="language-sluab">table.append(t,"a","b","c")</code> we can use <code class="language-sluab">table.extend(t,{"a","b","c" })</code>

**table.shrink(t, shrink_sparse)**: Frees the unused allocated memory space.
- with array tables clears all the unused allocated space, adjusting to the used space.
- with dictionary tables can only shrink to a lower power of two.
- The parameter *shrink_sparse* is optional, set to *true* will move keys from the sparse array to the dictionary part if it saves memory.

Details on memory allocation for tables: [Memory allocation for tables](/slua/moving-lists#memory-allocation-for-tables)

For arrays, **table.shrink(t)** frees all the unused allocated space:
<pre class="language-sluab"><code class="language-sluab">-- shrinking an array
local tab = {}
local before = ll.GetUsedMemory()

for i = 1, 10 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 256 (16*16)

for i = 2, 9 do tab[i] = nil end  -- now the table has only indexes 1 and 10

-- the table still uses ten indexes, 8 of them with nil
table.shrink(tab)
print(#tab)  -- > 10
print(ll.GetUsedMemory() - before)  -- > 160 (10*16)</code></pre>

For sparse arrays, **table.shrink(t, shrink_sparse)** can move keys from the sparse array to the dictionary part if it saves memory:
<pre class="language-sluab"><code class="language-sluab">-- shrinking an array and reallocating sparse keys
local tab = {}
local before = ll.GetUsedMemory()

for i = 1, 10 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 256 (16*16)

for i = 2, 9 do tab[i] = nil end  -- now the table has only indexes 1 and 10

-- with shrink_sparse index 10 is moved to the dictionary part of the table
table.shrink(tab, true)
print(#tab)  -- > 1
print(ll.GetUsedMemory() - before)  -- > 48 (16+32)</code></pre>

For dictionary tables, **table.shrink(t)** can only shrink to a lower power of two:
<pre class="language-sluab"><code class="language-sluab">-- shrinking a dictionary
local tab = {}
local before = ll.GetUsedMemory()

for i = 10001, 11025 do tab[i] = i end  -- the table has 1025 keys, allocated space for 2048
print(ll.GetUsedMemory() - before)  -- > 65536 (2048*32)

for i = 11001, 11025 do tab[i] = nil end  -- now the table has 1000 keys, it can shrink to 1024

table.shrink(tab)
print(ll.GetUsedMemory() - before)  -- > 32768 (1024*32)</code></pre>

### New functions in the bit32 library

SLua has added 2 functions to the standard bit32 library, to allow signed 32-bit math in SLua.

In SLua, all numbers are 64-bit floats. And the standard **bit32** library outputs unsigned integers (positive numbers from 0 to 4,294,967,295).

The new **s32()** and **smul()** functions allow to work with signed 32-bit integers. A signed 32-bit integer has a strict range from -2,147,483,648 to 2,147,483,647. If a number goes above or below these limits, it "wraps around" (overflows).

**bit32.s32(n)**: Converts a number into a signed 32-bit integer. It truncates decimals and forces the number to wrap around if it exceeds the signed 32-bit limits.
Returns an integer number (of type *number*) within the range of [-2147483648, 2147483647].

Its primary use case is converting the unsigned outputs of standard **bit32** operations into standard signed negative numbers (two's-complement). Standard **bit32** functions don't return negative numbers. Wrapping them in **s32()** properly converts them:
- <code class="language-sluab">bit32.bnot(0) --> 4294967295</code>
- <code class="language-sluab">bit32.s32(bit32.bnot(0)) --> -1</code>

Behavior Rules:
- Truncation: Decimals are chopped off (3.9 becomes 3, -2.7 becomes 2).
- Wrapping: If the number is larger than 2147483647, it wraps around into negative numbers. The wrapping is infinite. We can pass big numbers or scientific notation (like 1e15), and it will wrap it down into the 32-bit range using modulo math.
- Invalid numbers: Passing *math.huge* (Infinity) *-math.huge*, or *0/0* (NaN) will return the minimum 32-bit integer: -2147483648.

<pre class="language-sluab"><code class="language-sluab">-- bit32.s32()
print(bit32.s32(bit32.bnot(0)))
--> -1
print(bit32.s32(4000000000))
--> -294967296  
print(bit32.s32(1e15))
--> -1530494976
print(bit32.s32(2147483648))
--> -2147483648 (Overflows and wraps to the lowest negative number)</code></pre>

**bit32.smul(n1, n2)**: Multiplies two numbers together as if they were signed 32-bit integers.
Returns the wrapped, signed 32-bit result of the multiplication.

Normally in SLua, multiplying 2,000,000,000 * 2 yields 4,000,000,000. However, in 32-bit systems, that result is too large to fit in memory and causes an "integer overflow". **bit32.smul()** replicates this overflow behavior.

Why not just use <code class="language-sluab">bit32.s32(n1 * n2)</code>?
- SLua numbers (64-bit floats) can only safely store integers up to 2^53.
- If we multiply two large 32-bit numbers together natively (like 2^31 * 2^31), the  result requires up to 62 bits. Native SLua math will lose precision before **bit32.s32()** gets a chance to wrap it. **smul()** solves this by multiplying the numbers internally as 64-bit integers and wrapping them back to 32 bits, avoiding float64 precision loss.

<pre class="language-sluab"><code class="language-sluab">-- bit32.smul()
print(bit32.smul(2000000000, 2)) 
--> -294967296 (The math overflows into the negative range)
print(bit32.smul(10.5, 10.9)) 
--> 100 (Decimals are ignored before multiplying, acts like 10 * 10)

-- The Precision Loss problem (Why smul is necessary):
-- If we do native math, precision is lost and bit32.s32() fails:
print(bit32.s32(123456789 * 123456789))
--> -1757895752 (inaccurate result)
-- smul() guarantees perfect math and wrapping:
print(bit32.smul(123456789, 123456789))
--> -1757895751 (correct result)</code></pre>
  
### Expected SLua improvements

#### require / include

It's expected before the final version. It seems that it will be some kind of include, similar to what Firestorm does in LSL, copying source code from other scripts or files. Probably not like require() in Luau/Roblox, that executes compiled code from another script that returns a value, usually a table of functions.

The canny is: [Require canny](https://feedback.secondlife.com/slua-alpha/p/a-require-function-to-load-and-execute-other-scripts).

#### type-checking and linting

Type checking automatically infers types from the values assigned to variables or manually by adding type annotations. These annotations can define types, combinations of types, or subtypes. There are directives that allow to control the level of type checking in each script, ranging from none to stricter than LSL.

Linting identifies possible issues like uninitialized or unused variables, duplicated functions, mismatched parameter counts, return values, and many more. There are also directives to enable or disable specific linting checks.

It would be achieved adding the Luau/Roblox analyzer to the SLua editor.

The canny is: [Type-checking and Linting canny](https://feedback.secondlife.com/slua-alpha/p/the-type-checking-warnings-are-not-displayed).
