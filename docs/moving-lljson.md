---
layout: default
title: lljson
slua_beta: true
---

## The library lljson

### What is JSON?

JSON, short for JavaScript Object Notation, is a data format used to store and exchange information.  
It's simple and readable. It uses a clean and minimal structure, easy to understand.  
It's widely supported. It's supported by nearly all programming languages and tools, making it ideal for exchanging data between systems.  

JSON is useful, in general, to exchange complex multilevel structured data between:
- external resources, using http.
- scripts, using linked messages.
- objects, using say and listen.
- Linkset Data storage.

JSON organizes data into two basic structures:
- **Arrays**: list of values, like the array tables in SLua:
	- [ "apple", "banana", "cherry" ]
  - The values are separated by "," and all the array is enclosed in "[" and "]".
- **Objects**: collections of (key, value) pairs, like the dictionary tables in SLua:
	- { "type" : "dog" ,   "name" : "Dufa",   "color" : "white" }
  - The key and the value are separated by ":", the (key, value) pairs are separated by "," and all the object is enclosed in "{" and "}".
  - Keys must be strings. 

There are 4 data types:
- **String**: text enclosed in double quotes ("hello").
- **Number**: Numbers, either integers (42) or decimals (3.14).
- **Boolean**: true or false.
- **Null**: null, a special value indicating no data.

Objects and arrays can contain a mix of these types.  
They also can contain other objects and arrays, in any depth and complexity.  
We can have arrays of objects with keys that are arrays with more arrays and with more objects, etc.

### Library lljson

The functions to work with JSON have their own library: lljson.

There are two pairs of functions:
- **lljson.encode()** / l**ljson.decode()** :
  - They generate or read standard JSON
  - They are useful to exchange data with external resources and other scripting languages.
  - SLua types without a JSON equivalent are encoded as strings.
- **lljson.slencode()** / **lljson.sldecode()** :
  - They generate non standard JSON-like code.
  - They are useful to exchange code with other scripts or objects or to store in linkset data.
  - They are decoded into the original SLua types. 

### encode()

It takes an SLua table and generates standard JSON to send to an external website and be used with another scripting language.

<pre class="language-slua"><code class="language-slua">-- array table, encodes to a JSON array
local tabFruits = { "apples", "bananas", "oranges" }
print(lljson.encode(tabFruits))
-- > ["apples","bananas","oranges"]</code></pre>
<pre class="language-slua"><code class="language-slua">-- dictionary table, encodes to a JSON object
local tabFruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }
print(lljson.encode(tabFruitsQuantity))
-- > {"Apple":50,"Cherry":20,"Orange":15,"Banana":30}</code></pre>

Datatypes mapping with **lljson.encode()**:
<table style="width: 50%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">SLua type</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">JSON type</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">format</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">nil</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">null</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">lljson.null</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">null</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">array table</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">array []</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">dictionary table</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">object {}</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">keys encoded as strings</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">vector</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">"<25,50,10>"</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">rotation/quaternion</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">"<0.5,0.25,0,1>"</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">uuid</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">buffer</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">encoded as base64 string</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">function</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">run-time error</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">thread (coroutine)</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">run-time error</td>
    </tr>
  </tbody>
</table>

#### lljson.null

**lljson.null** is a constant in the lljson library.  
We can use it in dictionary tables when we want to export a key that has no value.
<pre class="language-slua"><code class="language-slua">-- dictionary table (with null keys), encodes to a JSON object
local tabFruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15, Kiwi = lljson.null }
print(lljson.encode(tabFruitsQuantity))
-- > {"Kiwi":null,"Apple":50,"Cherry":20,"Orange":15,"Banana":30}</code></pre>

#### Empty tables

Empty tables are exported as objects:
<pre class="language-slua"><code class="language-slua">-- empty table as JSON object
local tab = {}
print(lljson.encode(tab))
--> {}</code></pre>
We can use the constant **lljson.empty_array** to generate an empty JSON array:
<pre class="language-slua"><code class="language-slua">-- empty table as JSON array
local tab = lljson.empty_array
print(lljson.encode(tab))
--> []</code></pre>
We can export an empty table as JSON array setting the table **lljson.empty_array_mt** as its metatable:
<pre class="language-slua"><code class="language-slua">-- empty table as JSON array
local tab = { "hello" }
setmetatable(tab, lljson.empty_array_mt)
print(lljson.encode(tab))
--> ["hello"]
table.remove(tab, 1)
print(lljson.encode(tab))
--> []</code></pre>
**issue** : with mixed tables only the array part of the table is exported. It will be solved to export all the table.

#### Sparse arrays

Moderately sparse arrays are exported as JSON objects.  
**nil** values are exported as **null**. Up to 6 nulls are allowed, without counting the possible nulls in index 1, 2 and 3 (so it can be up to 9 nulls).  
With more nulls it throws the run-time error "Cannot serialise table: excessively sparse array":
<pre class="language-slua"><code class="language-slua">-- sparse array as JSON array
local vegetables = { "Carrot", "Tomato", "Potato" }
vegetables[10] = "Lettuce"
print(lljson.encode(vegetables))
-- > ["Carrot","Tomato","Potato",null,null,null,null,null,null,"Lettuce"]

vegetables[12] = "Onion"
print(lljson.encode(vegetables))
-- > Cannot serialise table: excessively sparse array
</code></pre>
**possible improvement** : it is requested that excessively sparce arrays are exported as objects, or to have an option to export array tables as objects.

#### Mixed tables

Mixed tables are exported as JSON objects.  
Numeric keys are exported as strings:
<pre class="language-slua"><code class="language-slua">-- mixed table to JSON object with string keys
local vegetables = { "Carrot", "Tomato", "Potato", Lettuce = "favorite" }
print(lljson.encode(vegetables))
-- > {"1":"Carrot","2":"Tomato","3":"Potato","Lettuce":"favorite"}</code></pre>
We can export only the array part of a mixed table as JSON array setting the table **lljson.array_mt** as its metatable:
<pre class="language-slua"><code class="language-slua">-- array part of mixed table to JSON array
local vegetables = { "Carrot", "Tomato", "Potato", Lettuce = "favorite" }
setmetatable(vegetables, lljson.array_mt)
print(lljson.encode(vegetables))
-- > ["Carrot","Tomato","Potato"]</code></pre>

#### Dictionary tables

Keys with data types other than numbers and strings throw the run-time error "Cannot serialise userdata: table key must be a number or string":
<pre class="language-slua"><code class="language-slua">-- dictionary table with other data types
local staff = { [ll.GetOwner()] = "VIP" }
print(lljson.encode(staff))
-- > Cannot serialise userdata: table key must be a number or string</code></pre>
**possible improvement** : it is requested that all datatypes (except functions and threads) are exported as strings.

#### inf and -inf

**inf** and **-inf** are exported as numbers with values **1e9999** and **-1e9999**:
<pre class="language-slua"><code class="language-slua">-- inf and -inf to numbers
local bigNumbers = { math.huge, -math.huge }
print(lljson.encode(bigNumbers))
-- > [1e9999,-1e9999]</code></pre>

#### nan
**nan** is exported as the literal **NAN** (a literal, not a string).
<pre class="language-slua"><code class="language-slua">-- inf and -inf to numbers
local puffedNumbers = { 0/0 }
print(lljson.encode(puffedNumbers))
-- > [NaN]</code></pre>
**issue** : this is not standard JSON. It will be changed to export it as **null**.

#### Indexing (0 vs 1)

JSON arrays do not store explicit index values in the file. They only define an ordered list of elements.  
When a programming language decodes a JSON array, it assigns indices according to its own array indexing rules. Most languages use 0-based indexing, so decoded arrays start at index 0.  
When SLua decodes a JSON array received from an external source, it creates Lua tables using 1-based indexing, so the first element starts at index 1.

#### Examples



### decode()



Datatypes mapping with **lljson.decode()**:
<table style="width: 30%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">JSON type</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">SLua type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">null</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">lljson.null</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">array []</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">table</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">object {}</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">table</td>
    </tr>
  </tbody>
</table>

#### lljson.null



#### Example



### metamethod __tojson



### slencode() / sldecode()



#### Tight encoding



### lljson constants



#### null and empty_array



#### array_mt and empty_array_mt



#### _NAME and _VERSION


