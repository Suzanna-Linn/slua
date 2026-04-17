---
layout: default
title: New Release
slua_beta: true
json : true
---

## What is new in the release 2026-04-09

There is a new SLua release in the SLua regions on the Main Grid!

I’ve gathered all the info I could find about the changes coming in this release.

In our scripts we have to change:
- [**LLEvents**](new-release#llevents) : change **LLEvents:listeners()** to **LLEvents:handlers()**
- [**lljson**](new-release#lljson-library)  : many changes on the use of metamethods and **lljson** constants.

Scripts must to be recompiled, saving them again, to work with this release.

##### Updates in release 2026-04-09 since 2026-03-24

(release 2026-03-24 was deployed on the Beta Grid only)

- **table.append()** is now equivalent to multiple **table.insert()** calls: [**table library**](new-release#table-library)
- **table.find()**  can yield internally if execution takes too long: [**yieldability**](new-release#yieldability)
- Compiled scripts bytecode can use up to the 128k of script memory, it was limited to 64k for the bytecode.
- Memory used internally when growing or shrinking a dictionary table is not counted as script memory: [**resizing tables**](new-release#resizing-tables)

*(this page updated on Friday, Apr 17th)*

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

-- The Precision Loss problem (Why smul is necessary):
-- If we do native math, precision is lost and bit32.s32() fails:
print(bit32.s32(123456789 * 123456789))
--> -1757895752 (inaccurate result)
-- smul() guarantees perfect math and wrapping:
print(bit32.smul(123456789, 123456789))
--> -1757895751 (correct result)</code></pre>

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

<pre class="language-sluab"><code class="language-sluab">-- vector.lerp()
print(vector.lerp(vector(10, 50, 20),vector(60, 60, 20), 0.5))
-- > <35, 55, 20></code></pre>

It's equivalent to:
<pre class="language-sluab"><code class="language-sluab">-- vector.lerp() in SLua
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

**tovector()**, **torotation()**/**toquaternion()**, **touuid()** : Return **nil** when called with a value that is not a string (instead of throwing an error).

This way they behave the same than **tonumber()**

### LL functions

**ll.List2Key()** : Returns **NULL_KEY** when the parameter has not a valid uuid format (instead of returning a string).
- **llcompat.List2Key()** also returns **NULL_KEY** with a not valid uuid format.

### lljson library

Many changes here. There are the same library functions but with many more options to deal with the contents and its shape (as JSON arrays or JSON objects) and improvements on the encoding.

##### New parameters when encoding

`encode()` and `slencode()` have a second parameter which is a table with named parameters.

`allow_sparse`: boolean, `false` by default, if `true` all sparse arrays are encoded as arrays, no matter how sparse they are, instead of throwing a "excessively sparse array" error.

`skip_tojson`: boolean, `false` by default, if `true` the metamethod `__tojson` is not called.

`replacer`: call back function used to transform values during encoding, explained below.

<pre class="language-sluab"><code class="language-sluab">local myJson = lljson.encode(myTab, { allow_sparse = true, skip_tojson = true, replacer = myReplacerFunc })</code></pre>

##### New parameters when decoding

`decode()` and `sldecode()` have a second parameter which is a table with named parameters.

`track_path`: boolean, `false` by default, if `true` the `reviver` function will be passed an array table representing the traversal path across the nested tables from the root to the current value, allowing the reviver to know where it is in the tree.

`reviver`: call back function used to transform values after they are parsed, explained below.

<pre class="language-sluab"><code class="language-sluab">local myTab = lljson.decode(myJson, { track_path = true, reviver = myReviverFunc })</code></pre>

##### New callbacks `replacer` / `reviver` when encoding and decoding

**Replacer**

A replacer is a callback function that allows us to intercept and modify values during the serialization process. It gives us fine-grained control over the final JSON output, making it ideal for filtering data, formatting custom types, or censoring sensitive information.

**replacer(key, value, parent)**: callback function to modify the contents before encoding them with `encode()` or `slencode()`.

Parameters:
- *key*: The key or index of the value being processed. The key is nil for the root value.
- *value*: The value associated with the key.
- *parent*: The table that contains the current value. The parent is nil for the root value.

Return value: The value we return from the replacer determines what gets written to the JSON string.
- any value: The returned value will be serialized in place of the original value. This is used for transformation.
- the constant `lljson.remove`: This constant instructs the encoder to completely omit the key-value pair from the final JSON. This is used for filtering.
- `nil`: it's a valid value to return. It will be serialized as null in `encode()` or *"!n"* in `slencode`.

A return value of `lljson.remove` for the root value evaluates to `lljson.null` and will be serialized as *null*.

If a table has a `__tojson` metamethod, it is called before passing the values to the replacer function.

**Reviver**

A reviver is a callback function that lets us inspect and transform data as it is being parsed from a JSON string. It is called for every key-value pair after it has been parsed but before it's added to its parent container. This is useful for "reviving" data into custom types (like dates or vectors) or restructuring the data on the fly.

**reviver(key, value, parent, ctx)**: callback function to modify the contents while decoding them with `decode()` or `sldecode()`.

Parameters:
- *key*: The key or index of the value being processed. The key is nil for the root value.
- *value*: The value that was just parsed from the JSON.
- *parent*: The table that the value will be placed into. The parent is nil for the root value.
- *ctx*: A table containing metadata about the parse operation.
- *ctx.path*: A table representing the traversal path to the current value. For a value at data.users[20], the path would be {"data", "users", 20}. This is only populated if we enable it with the { track_path = true } option.

Return value: The value we return from the reviver determines what gets written to the tables.
- any value: The returned value will be inserted into the parent table instead of the original parsed value.
- the constant `lljson.remove`: This constant prevents the value from being added to its parent. In an array the element is skipped, and subsequent elements are shifted down to fill the gap, resulting in a shorter array.

A return value of `lljson.remove` for the root value will return `lljson.null`.

The reviver processes nested structures from the inside out. The children of an object or array are revived before the parent object or array itself is revived. This means when we are processing a table, all of its nested tables have already been transformed by the reviver.

In `sldecode()` the reviver receives keys and values already converted to SLua datatypes from the internal format.

##### Example with *replacer* and *reviver*

This example converts datetimes stored as timestamps (returned by `os.clock()`) into JSON objects with "date" and "hour". The keys containing a timestamp are identified by their names starting with "time".

<pre class="language-sluab"><code class="language-sluab">-- a table for the replacer/reviver example with 5 timestamps
local shelter = {
    name = "Happy Tails",
    timeCreated = 1770112800,    
    animals = {
        {
            type = "dog",
            name = "Buddy",
            health = {
                vaccinated = true,
                timeLastCheckup = 1772275380 
            },
            adoption = {
                available = true,
                timeListed = 1771158400 
            }
        },
        {
            type = "cat",
            name = "Whiskers",
            health = {
                vaccinated = true,
                timeLastCheckup = 1772372000 
            },
            adoption = {
                available = false,
                timeAdopted = 1771658400 
            }
        }
    }
}</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- Converts numeric fields starting with "time" into a { date, hour } table.
local function timeReplacer(key, value, parent)
    if type(key) == "string" and string.sub(key, 1, 4) == "time" and type(value) == "number" then
        local d = os.date("!*t", value)
        return {
            date = string.format("%04d-%02d-%02d", d.year, d.month, d.day),
            hour = string.format("%02d:%02d:%02d", d.hour, d.min, d.sec)
        }
    end
    return value
end

local jsonShelter = lljson.encode(shelter, { replacer = timeReplacer })</code></pre>

Resulting JSON:
<pre class="language-json"><code class="language-json">{
  "animals": [
    {
      "health": {
        "vaccinated": true,
        "timeLastCheckup": { "date": "2026-02-28", "hour": "10:43:00" }
      },
      "type": "dog",
      "name": "Buddy",
      "adoption": {
        "timeListed": { "date": "2026-02-15", "hour": "12:26:40" },
        "available": true
      }
    },
    {
      "health": {
        "vaccinated": true,
        "timeLastCheckup": { "date": "2026-03-01", "hour": "13:33:20" }
      },
      "type": "cat",
      "name": "Whiskers",
      "adoption": {
        "timeAdopted": { "date": "2026-02-21", "hour": "07:20:00" },
        "available": false
      }
    },
  "name": "Happy Tails",
  "timeCreated": { "date": "2026-02-03", "hour": "10:00:00" },
  ]
}</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- Looks for objects under keys starting with "time" and parses them back into timestamps.
local function timeReviver(key, value, parent, ctx)
    if type(key) == "string" and string.sub(key, 1, 4) == "time" and type(value) == "table" then
        if value.date and value.hour then
            local year, month, day = string.match(value.date, "(%d+)-(%d+)-(%d+)")
            local hour, min, sec = string.match(value.hour, "(%d+):(%d+):(%d+)")
            if year and month and day and hour and min and sec then
                return os.time({
                    year = tonumber(year), month = tonumber(month), day = tonumber(day),
                    hour = tonumber(hour), min = tonumber(min), sec = tonumber(sec)
                })
            end
        end
    end
    return value
end

local newShelter = lljson.decode(jsonShelter, { reviver = timeReviver })</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- comparing the resulting table with the original
local function deepCompare(t1, t2)
    if t1 == t2 then return true end
    if type(t1) ~= "table" or type(t2) ~= "table" then return false end
    for key, value in t1 do
        if not deepCompare(value, t2[key]) then return false end
    end
    for key in t2 do
        if t1[key] == nil then return false end
    end
    return true
end

print(deepCompare(shelter, newShelter))  -- > true</code></pre>

##### Changes in encoding with `encode()`

Keys of type *uuid* are encoded as *string*, instead of throwing a "table key must be a number or string" error.

**NaN** is encoded as `lljson.null` (instead of *Nan*, that is not standard JSON).

Empty tables are encoded as arrays by default.

##### Changes in decoding with `decode()`

All tables are decoded with its metatable set to `array_mt` or `object_mt` depending on the JSON type.

This is useful in case of re-encoding the data or to know the JSON type in a *reviver* function.

##### Changes in `__tojson`

`__tojson` has a second parameter *ctx* which is a table providing information about the encoding mode. It contains two keys:
- *ctx.mode*: A string, either "json" (for `encode()`) or "sljson" (for `slencode()`).
- *ctx.tight*: A boolean indicating if the *tight* encoding option is enabled (only relevant for `slencode()`).

If `__tojson` returns a table that has a metamethod `__tojson`, this other one is not called. We can return the same table without going into infinite recursion.

<pre class="language-sluab"><code class="language-sluab">-- __tojson to format the table only for encode()
local tab = setmetatable({}, {
    __tojson = function(t, ctx)
        if ctx.mode == "sljson" then
            return t
        else
            -- return a formated table
        end
    end
})</code></pre>

##### New metamethod `__jsonhint` for `encode()`

The `__jsonhint` metamethod is a special directive used during serialization to resolve ambiguity in SLua tables. Because a SLua table can represent both a key-value map (object) and a sequential list (array), the encoder must guess the user's intent. The `__jsonhint` gives us explicit control over this process, hinting a table to be encoded as either a JSON object ({}) or a JSON array ([]).

We set `__jsonhint` as a key within a table's metatable. The value must be one of the string values that "hint" at the desired JSON structure.

Valid Values for `__jsonhint`
- *"array"*: Hints the table to be encoded as a JSON array. This is a soft hint. If the table contains keys that are not positive integers, it cannot be a valid JSON array. In this case, the encoder will ignore the hint and serialize it as a JSON object to preserve all the data.
- *"object"*: Hints the table to be encoded as a JSON object. This is a strong hint. It will always produce a JSON object, converting any numeric keys into string keys in the final output.

This is useful for:
- Empty tables: An empty SLua table {} could be either {} or [] in JSON. Without a hint they are encoded as JSON arrays.
- Tables with only numeric keys: A table like { [1] = "a" } would normally become an array, but we might intend for it to be an object {"1": "a"}.
- Sparse array: An excessively sparse array will be encoded as a JSON array with `__jsonhint="array"`, instead of throwing a "excessively sparse array" error. 

For convenience, the lljson library provides pre-configured, read-only metatables that we can use directly:
- `lljson.array_mt`: Use this to hint that a table should be an array.
- `lljson.object_mt`: Use this to hint that a table should be an object.

`__jsonhint` is not used by `slencode()`. `slencode()` uses the encoding that is more efficient. 

<pre class="language-sluab"><code class="language-sluab">-- using __jsonhint
  
-- with array hint: array
local sparseData = { [1] = "Level 1", [5] = "Level 5", [12] = "Level 12" }
setmetatable(sparseData, { __jsonhint = "array" })
print(lljson.encode(sparseData))
-- > ["Level 1",null,null,null,"Level 5",null,null,null,null,null,null,"Level 12"]

-- with object hint: object
local sparseData = { [1] = "Level 1", [5] = "Level 5", [12] = "Level 12" }
setmetatable(sparseData, { __jsonhint = "object" })
print(lljson.encode(sparseData))
-- > {"1":"Level 1","5":"Level 5","12":"Level 12"}

-- without hint but allowing sparse: array
local sparseData = { [1] = "Level 1", [5] = "Level 5", [12] = "Level 12" }
print(lljson.encode(sparseData, { allow_sparse = true }))
-- > ["Level 1",null,null,null,"Level 5",null,null,null,null,null,null,"Level 12"]

-- with array hint but non-array keys: object
local sparseData = { [1] = "Level 1", [5] = "Level 5", [12] = "Level 12", ["others"] = "Other levels" }
setmetatable(sparseData, { __jsonhint = "array" })
print(lljson.encode(sparseData))
-- > {"1":"Level 1","12":"Level 12","5":"Level 5","others":"Other levels"}

-- without hint: too sparse error
local sparseData = { [1] = "Level 1", [5] = "Level 5", [12] = "Level 12" }
print(pcall(lljson.encode(sparseData)))
-- > runtime error: Cannot serialise table: excessively sparse array</code></pre>

##### Changes in tables and metatables to encode to array or object

**`array_mt` and the new `object_mt`**  
They are tables with a `__jsonhint` metamethod set to "array" or "object". Previously `array_mt` was an empty table.

**`empty_array` and the new `empty_object`**  
They are empty tables with a metatable with a `__jsonhint` metamethod set to "array" or "object". Previously `empty_array` was lljson constant.

**`empty_array_mt` doesn't exist**  
It's not needed since an empty table becomes a JSON array by default. We have `object_mt` or `__jsonhint="object"` to generate an empty JSON object.

These shaping tables are not used by `slencode()`. `slencode()` uses the encoding that is more efficient.

<pre class="language-sluab"><code class="language-sluab">-- internal values of the shaping lljson constants

array_mt = { __jsonhint = "array" }
object_mt = { __jsonhint = "object" }

empty_array = setmetatable( {}, array_mt )
empty_object = setmetatable( {}, object_mt )

empty_array = setmetatable( {}, { __jsonhint = "array" } )
empty_object = setmetatable( {}, { __jsonhint = "object" } )</code></pre>

##### Metamethods `__len` and `__index` are not used

With the new improvements they are not needed. Not calling them avoid issues in the cases where `__len` was used for another purpose.

`__len` was useful to encode excessively sparse arrays. Now we can use `__jsonhint="array"` or the parameter `allow_sparse=true`.

`__len` and `__index` together were useful to add calculated elements to an array. We can use `__tojson` and now a *replacer* function.

`__len` was useful to encode only the array part of a table. There is no shaping option now, but we can use `__tojson`.
<pre class="language-sluab"><code class="language-sluab">-- array part of the table
local fruits = { "apples", "bananas", "oranges", ["n"] = 3 }
setmetatable(fruits, {
    __tojson = function(t, ctx)
        return table.move(t, 1, #t, 1, {})
    end
})
print(lljson.encode(fruits))
-- > ["apples","bananas","oranges"]</code></pre>

##### Objects

A table is encoded as a JSON object if it meets any of the following conditions:
- Explicit hint: It has a metatable with `__jsonhint = "object"`.
- Array incompatible keys: It contains at least one key that is not a positive integer.

##### Arrays

An array table is encoded as a JSON array if it satisfies any of the following conditions, provided it is not explicitly forced to be an object via `__jsonhint = "object"`.
- Explicit hint: It has a metatable with `__jsonhint = "array"` and contains only array-compatible keys.
- Empty table default: It is an empty table ({}) and does not have an "object" hint.
- Automatic Detection: If all its keys are positive integers and it's not excessively sparse.

An excessively sparse array table is encoded as a JSON array if:
- Explicit hint: It has a metatable with `__jsonhint = "array"`.
- *allow_sparse* parameter: If we pass the `allow_sparse=true` option.

`__jsonhint` has priority over *allow_sparse*. With `__jsonhint = "array"` an excessively sparse array will be encoded as an array even if we have passed `allow_sparse=false`.

##### Encoding sequence of execution

`encode()` uses two different execution pipelines depending on whether we provided a replacer function in our options.

**Without a Replacer**

When no replacer is used,  `__jsonhint` is read before `__tojson` is executed:
- Read `__jsonhint` (Original Table): The encoder looks at the original table's metatable and reads the `__jsonhint`. It saves this shape intent.
- Execute `__tojson` (Original Table): Next, it checks if the original table has a `__tojson` metamethod. If it does, it calls it and takes the returned value. (The original table is now discarded).
- Apply shape and serialize:
  - If __tojson returned a non-table (e.g., a string), it serializes it directly (ignoring hints).
  - If __tojson returned a table, the encoder takes the shape hint saved in the first step and applies it to this new table, forcing it to serialize as that shape.

Why this order?  
It allows a table to dictate its content via `__tojson`, but dictate its shape via its own `__jsonhint`, without requiring us to attach a metatable to the temporary table returned by `__tojson`.

**With a Replacer**

When a replacer is provided, `__tojson` executes first, then the *replacer* function, and `__jsonhint` is read last:
- Execute `__tojson` (Original Table): Before the replacer sees the value, the encoder checks for `__tojson` on the original table and executes it.
- Execute replacer (on the resolved value): The *replacer* function is called. The value argument passed to the replacer is the result of the `__tojson` call from the first step.
- Read __jsonhint (Final Table): After the replacer returns its final value, the encoder processes it. If the final value is a table, the encoder looks at the metatable of this final table for a `__jsonhint`.
- Serialize: The table is serialized according to the hint found in the previous step (or auto-detected if no hint exists).

Why this order?  
It ensures that our replacer function always receives the final data that an object intends to serialize, rather than forcing the replacer to try and understand the object's complex internal structure.  
It also guarantees strict compatibility with the JavaScript JSON.stringify specification, which requires an object's toJSON method to fully resolve its serializable value before that value is ever passed to the replacer function.

##### Changes in `slencode()`/ `sldecode()` encoding

**nil** is encoded as *"!n"* and is decoded back to **nil** (instead of *null* that was decoded to `lljson.null`).

**NaN** is encoded as *"!fNaN"* (instead of *Nan*, that is not standard JSON).

In tigh encoding (with the parameter `tight=true`):
- `ZERO_VECTOR` is encoded as *"!v"*.
- `ZERO_ROTATION` is encoded as *"!q"*.

`slencode()` ignores `__jsonhint` and the shaping metatables.

##### Constants `_NAME` and `_VERSION` don't exist

The lljson constants `_NAME` and `_VERSION` had few use and have been removed.

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
- *table.sort()*, *table.find()*
- lljson library functions and the *__tojson* metamethod

Are not yieldable:
- metamethods (except *__tojson*): we need to optimize the code and avoid using LL functions that call the simulator.

Examples of yieldable:
<pre class="language-sluab"><code class="language-sluab">-- yielding in an iterator
local t = { uuid("552e76a0-8ed8-499f-ba2e-0ab1ba0fa018"), uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41") }
local function iterNames(tab)
    local count = 0
    return function()
        count += 1
        local id = tab[count]
        local name
        if id then
            name = ll.GetDisplayName(id)
            if name == "" then
                print("yielding...", coroutine.isyieldable())
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

<pre class="language-sluab"><code class="language-sluab">-- a very long sort yielding internally at the end of the time slice
local t = {}
for i = 1, 1000 do
    table.insert(t, math.random(1000))
end
local ti = os.clock()
table.sort(t, function(a,b)
    return a > b
end)
print(os.clock() - ti)</code></pre>

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
-- > runtime error: Failed to perform mandatory yield</code></pre>

### Resizing tables

When a dictionary table grows or shrinks, the table is recreated because the internal hash calculation must be adapted to the new size. The engine allocates space for the new table and copies the elements one by one. The original table's memory is freed only once the copy is complete; in the meantime, the table temporarily occupies double the memory.

Now this internal overhead is not counted toward our script’s memory limit, and we do not need to manually reserve extra space to perform these resizes.

Examples that now work and previously threw an out of memory error:
<pre class="language-sluab"><code class="language-sluab">-- growing a table
local t = {}
for i = 1, 1024 do t[10000 + i] = 0 end

local tt = table.create(3500, 0)  -- this simulates memory used with something else
print(ll.GetFreeMemory())  -- > 39835

-- growing the table from 1024 to 2048 keys, it needs 32k of memory, 
-- and another 32k internally to copy the 1024 keys to the new, bigger, table
t[11025] = 0
print(ll.GetFreeMemory())  -- > 7067</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- shrinking a table
local t = {}
for i = 1, 1025 do t[10000 + i] = 0 end

local tt = table.create(3500, 0)  -- this simulates memory used with something else
print(ll.GetFreeMemory())  -- > 7031

-- shrinking the table from 2048 to 1024 keys, it will free 32k of memory,
-- but before it needs 32k internally to copy the 1024 keys to the new, smaller, table
t[11025] = nil
table.shrink(t)
print(ll.GetFreeMemory())  -- > 39799</code></pre>
