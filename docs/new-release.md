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

**LLEvents:handlers()** is the new name for **LLEvents:listeners()** to avoid confusion with the listeners used in ll.Listen().

**listeners()** doesn't work and must be renamed.

### table library

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

To save memory, instead of <code class="language-sluab">table.append(t, "a", "b", "c")</code> we can use <code class="language-sluab">table.extend(t, { "a", "b", "c" })</code>

### bit32 library

**bit32.s32()**

**bit32.smul**

### vector library

**vector.lerp()**

### math library

**math.isfinite(n)** : Returns true if the number is finite (not *inf*, *-inf* or *NaN*).

**math.isinf(n)** : Returns true if the number is infinite (*inf* or *-inf*).

**math.isnan(n)** : Returns true if the number is a Nan.

<pre class="language-sluab"><code class="language-sluab">-- math.isfinite(), math.isinf(), math.isnan()
print(math.isfinite(42))      -- > true
print(math.isinf(math.huge))  -- > true
print(math.isnan(0/0))        -- > true</code></pre>

For any number, one of the functions is true and the other two functions are false.

### global library

**tovector()**, **tororation()**/**toquaternion()**, **touuid()**/**uuid()** : Return **nil** when called with a parameter that is not a string (instead of throwing an error).

This way they behave the same than **tonumber()**

### LL functions

**ll.List2Key()** : Returns **NULL_KEY** when the parameter has not a valid uuid format (instead of returning a string).

**ll.FindNotecardTextSync()** : Its parameter **start** is 1-based.
The description of **start** is *Index of the first match to return.* (instead of *The number of matches to skip before returning values.*).

### lljson library



### Yieldability

