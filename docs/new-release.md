---
layout: default
title: New Release
slua_beta: true
---

## What is new in the release 2026-03-23

There is a new SLua release in the SLua regions on the Beta Grid!

I’ve gathered all the info I could find about the changes coming in this release. In the next days I will add more examples as I test them.

The scripts need to be recompiled, saving them again, to work with this release. 

*(this page updated on Monday, Mar 23th)*

### LLEvents

**LLEvents:handlers()** is the new name for **LLEvents:listeners()**, to avoid confusion with the listeners used in **ll.Listen()**.

**LLEvents:listeners()** doesn't work and must be renamed.

### table library

New functions:

**table.append(t, ...)** : Inserts the given values into t, starting at #t + 1. It is a replacement for multiple calls to table.insert():
<pre class="language-sluab"><code class="language-sluab">-- table.append()
local t = { "a", "b", "c" }
table.append(t, "d", "e", "f")
print(table.concat(t,", "))  -- > a, b, c, d, e, f</code></pre>

It differs from multiple table.insert() calls in that, when used with sparse arrays, it can overwrite values:
<pre class="language-sluab"><code class="language-sluab">-- table.append()
-- overwriting sparse array
local t1, t2 = { 1, 2 }, { 1 ,2 }
t1[5], t2[5] = 5, 5

table.insert(t1, "a")
table.insert(t1, "b")
table.insert(t1, "c")
print(table.concat(t1))  -- > 12ab5c

table.append(t2, "a", "b", "c")
print(table.concat(t2))  -- > 12abc</code></pre>

**table.extend(t1, t2)**: Inserts the values of t2 into t1, starting at #t1 + 1.  
It is the same as <code class="language-sluab">table.move(t2, 1, #t2, #t1 + 1, t1)</code>:
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

**table.append()** is optimized for speed and **table.extend()** is optimized for memory.

To save memory, instead of <code class="language-sluab">table.append(t,"a","b","c")</code> we can use <code class="language-sluab">table.extend(t,{"a","b","c" })</code>

### bit32 library

New functions to allow signed 32-bit math in SLua.

In SLua, all numbers are 64-bit floats. And the standard **bit32** library  outputs unsigned integers (positive numbers from 0 to 4,294,967,295).

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
--
-- The Precision Loss problem (Why smul is necessary):
-- If we do native math, precision is lost and bit32.s32() fails:
-- bit32.s32(0x10000 * 0x10000) yields an inaccurate result
-- smul() guarantees perfect math and wrapping:
print(bit32.smul(0x10000, 0x10000)) --> 0</code></pre>

### vector library

New function:

**vector.lerp(vec1, vec2, t)**: Performs linear interpolation between two vectors. It calculates a specific point along the straight, shortest line between vector *vec1* and vector *vec2*, based on a fractional value *t*.
Parameters:
- *vec1* (vector): The starting vector.
- *vec2* (vector): The target/ending vector.
- *t* (number): The interpolation fraction (alpha).
Returns a new vector representing the interpolated position.

Behaviors:
- Fractional Movement (*t*):
  - If t == 0, it returns the position of vector *vec1*.
  - If t == 1, it returns the position of vector *vec2*.
  - If t == 0.5, it returns a vector exactly halfway between *vec1* and *vec2*.
- Extrapolation: The function does not clamp *t* between 0 and 1. If we pass a *t* value less than 0 or greater than 1, it will "extrapolate," meaning the point will continue past the start or end vectors along the same line.
- Component-wise operation: The operation evaluates the X, Y, and Z axes independently. It does not curve or track rotation; it simply draws a straight line between the two points.

It's equivalent to:
<pre class="language-sluab"><code class="language-sluab">-- vector.lerp()
local function vectorLerp(vec1: vector, vec2: vector, t: number): vector
    -- (vec2 - vec1) gets the directional distance between the two vectors
    -- * t scales that distance
    -- vec1 + adds that scaled distance to the starting point
    return vec1 + (vec2 - vec1) * t
end</code></pre>

### math library

New functions:

**math.isfinite(n)** : Returns true if the number is finite (not *inf*, *-inf* or *NaN*).

**math.isinf(n)** : Returns true if the number is infinite (*inf* or *-inf*).

**math.isnan(n)** : Returns true if the number is a Nan.

<pre class="language-sluab"><code class="language-sluab">-- math.isfinite(), math.isinf(), math.isnan()
print(math.isfinite(42))      -- > true
print(math.isinf(math.huge))  -- > true
print(math.isnan(0/0))        -- > true</code></pre>

For any number, one of the functions is true and the other two functions are false.

### global library

**tovector()**, **torotation()**/**toquaternion()**, **touuid()**/**uuid()** : Return **nil** when called with a value that is not a string (instead of throwing an error).

This way they behave the same than **tonumber()**

### LL functions

**ll.List2Key()** : Returns **NULL_KEY** when the parameter has not a valid uuid format (instead of returning a string).

**ll.FindNotecardTextSync()** : Its parameter **start** is 1-based.  
The description of **start** is *Index of the first match to return.* (instead of *The number of matches to skip before returning values.*).

### lljson library

Many changes here. There are the same library functions but with many more options to deal with the contents and its shape (as JSON arrays or JSON objects) and improvements on the encoding.

##### New parameters when encoding

`encode()` and `slencode()` have a second parameter which is a table with named parameters.

`allow_sparse`: boolean, `false` by default, if `true` all sparse array are encoded as arrays, no matter how sparse they are, instead of throwing a "excessively sparse array" error.

`skip_tojson`: boolean, `false` by default, if `true` the metamethod `__tojson` is not called.

`replacer`: call back function to modify the data to be encoded, explained below.

<pre class="language-sluab"><code class="language-sluab">local myJson = lljson.encode(myTab, { allow_sparse = true, skip_tojson = true, replacer = myReplacerFunc })</code></pre>

##### New parameters when decoding

`decode()` and `sldecode()` have a second parameter which is a table with named parameters.

`track_path`: boolean, `false` by default, if `true` the `reviver` function will be passed an array table representing the traversal path across the nested tables from the root to the current value. 

`reviver`: call back function to modify the data being decoded, explained below.

<pre class="language-sluab"><code class="language-sluab">local myTab = lljson.decode(myJson, { track_path = true, reviver = myReviverFunc })</code></pre>

##### New callbacks `replacer` / `reviver` when encoding and decoding

replacer(key, value, parent)
return value
retun nil encode as null
return lljson.remove to ignore the key
	in array result is compacted, no index to nil
	in main table encodes lljson.null
key == nil and parent == nil in main table
__tojson is previously executed

reviver(key, value)
return value
return nil decodes as nil
return lljson.remove to ignore the key
	in array result is compacted, no index to nil
	in main table decodes lljson.null
key == nil in main table
key, value are previously decoded in sldecode()
ctx.path in reviver, with track_path = true parameter, with the tables path

ctx  (path)

`lljson.remove`

##### Changes in `encode()`encoding

nan

empty tables as array by default

##### Changes in `decode()`decoding

array_mt and object_mt added to all tables in decode()

##### Changes in `__tojson`

parameter ctx (mode, tight)

mode = "json" / "sljson"

non recursive

##### New metamethod `__jsonhint`

"array" / "object"

__jsonhint="array" ignored if it can't be an array
__jsonhint="array" encodes excessively sparse array (ignores allow_sparse = false)

##### Changes in tables and metatables to encode to array or object

`array_mt`
`object_mt`

`empty_array`
`empty_object`

no `empty_array_mt`

##### Metamethods `__len`and `__index`not used

##### Objects

##### Arrays

##### Sparse arrays

##### Sequence of execution

##### Changes in `slencode()`/ `sldecode()`encoding

`slencode()`ignores `__jsonhint` and shape metatables

nil

nan

!v, !q

##### Constants ' _NAME` and `_VERSION` don't exist

The lljson constants ' _NAME` and `_VERSION` had few use and have been removed.

### Yieldability

In SLua, yielding is the act of pausing a running function (a coroutine) so that it can be resumed later. This is done via coroutine.yield().

Yielding is restricted in certain contexts. If we try to yield in these places, we will get an "attempt to yield across metamethod/C-call boundary" error.

The technical reason of the "C-Call Boundary" limitation is that SLua is a scripting language embedded within a C++ engine.  
When SLua code runs, it uses a SLua stack, which can be easily paused and resumed.  
However, when a SLua script calls a built-in C++ function (such as a metamethod), and that C++ function calls back into SLua (our function for the metamethod), a C++ stack frame is created.  
Unlike SLua, C++ cannot simply "pause" and "resume" its execution state mid-function. Therefore, SLua forbids yielding whenever there is a C++ function active in the middle of the call stack.

In SL, scripts must yield regularly to avoid using more runtime than the time slice assigned to them.  
If we execute a long process in a place that can't yield (like a function within a metamethod), the script exceeds its allotted running time, and the scheduler will force it to stop, resulting in a "Failed to perform mandatory yield" error.

In this release many of these cases has been solved. The following are now yieldable:
- iterators in a generic for loop
- string library functions that use callbacks or complex pattern matching, which can be slow to execute.
- *string.find()*, *string.match()*, *string.gmatch()*, *string.gsub()*
- *table.sort()*
- lljson library functions and the *__tojson* metamethod

Are not yieldable:
- metamethods (except *__tojson*): we need to optimize the code and avoid using LL functions that call the simulator.

Examples of yieldable:
<pre class="language-sluab"><code class="language-sluab">-- yielding in an iterator
local t = { ll.GetOwner() }
local function iterNames(tab)
    local count = 0
    return function()
        count += 1
        local id = tab[count]
        local name
        if id then
            name = ll.GetDisplayName(id)
            if name == "" then
                name = coroutine.yield(ll.RequestDisplayName(id))
            end
        end
        return id, name
    end
end
local co = coroutine.create(function()
    for k, v in iterNames(t) do
        print(k, v)
    end
end)
LLEvents:on("dataserver", function(queryId, data)
    coroutine.resume(co, data)
end)
coroutine.resume(co)</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- a very long sort
local t = {}
for i = 1, 1000 do
    table.insert(t, math.random(1000))
end
table.sort(t, function(a,b)
    return a > b
end)</code></pre>

Examples of not yieldable:
<pre class="language-sluab"><code class="language-sluab">-- metamethods are not yieldable, "attempt to yield across metamethod/C-call boundary"
local t = setmetatable({}, {
    __index = function()
        print("yieldable: ", coroutine.isyieldable())
        coroutine.yield()
    end
})
print(coroutine.resume(coroutine.create(function()
    print(t.test)
end)))
-- > yieldable: false
-- > false    attempt to yield across metamethod/C-call boundary</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- metamethods are not yieldable, "Failed to perform mandatory yield"
local t = setmetatable({}, {
    __index = function()
        print("yieldable: ", coroutine.isyieldable())
        -- slow function that exceeds the time slice
        ll.SetText("test", vector(1, 1, 1), 1)
    end
})
print(t.test)
-- > yieldable: false
-- > Error: Failed to perform mandatory yield</code></pre>
