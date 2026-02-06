---
layout: default
title: lljson
slua_beta: true
json : true
---

## The library lljson

### Quick start

If you want to store tables in linkset data or send tables to another script with linked messages, reading this section is enough:

We can encode any kind of table with its nested tables, no matter how complex the structure is, in a string and decode the string to the same table with:
- to encode: <code class="language-sluab">myString = lljson.slencode(myTab)</code>
- to decode: <code class="language-sluab">myTab = lljson.sldecode(myString)</code>

Example storing a table in linkset data:
<pre class="language-sluab"><code class="language-sluab">-- storing a table in linkset data
local resort = {
    name = "Sunny Sands",
    activities = {"Sunbathing", "Jet skiing", "Frisbee competitions"},
    rating = 4.2,
    open = true,
    tips = {"Bring sunscreen", "Smile for photos", "Don't feed the seagulls"}
}

-- writing
ll.LinksetDataWrite("resort", lljson.slencode(resort))

-- reading
resort = lljson.decode(ll.LinksetDataRead("resort"))

-- checking that it has worked
for k, v in resort do
    print(k, if type(v) == "table" then table.concat(v, ", ") else v)
end
-- > name        Sunny Sands
-- > activities  Sunbathing, Jet skiing, Frisbee competitions
-- > rating      4.2
-- > open        true
-- > tips        Bring sunscreen, Smile for photos, Don't feed the seagulls</code></pre>

Example sending a table in a linked message:
<pre class="language-sluab"><code class="language-sluab">-- script1 - sending a table with a linked message
local resort = {
    name = "Sunny Sands",
    activities = {"Sunbathing", "Jet skiing", "Frisbee competitions"},
    rating = 4.2,
    open = true,
    tips = {"Bring sunscreen", "Smile for photos", "Don't feed the seagulls"}
}

LLEvents:on("touch_start", function(events)
    -- sending
    ll.MessageLinked(LINK_THIS, 0, lljson.slencode(resort), "")
end)</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- script2 - receiving a table with a linked message
local resort = {}

LLEvents:on("link_message", function(sender_num, num, str, id)
    -- receiving
    resort = lljson.decode(str)
	
    -- checking that it has worked
    for k, v in resort do
        print(k, if type(v) == "table" then table.concat(v, ", ") else v)
    end
	-- > name        Sunny Sands
	-- > activities  Sunbathing, Jet skiing, Frisbee competitions
	-- > rating      4.2
	-- > open        true
	-- > tips        Bring sunscreen, Smile for photos, Don't feed the seagulls
end)</code></pre>

Go on reading to learn much more...

### What is JSON?

JSON, short for JavaScript Object Notation, is a data format used to store and exchange information.  
It is simple and readable, using a clean, minimal structure that is easy to understand. 
It's widely supported. It's supported by nearly all programming languages and tools, making it ideal for exchanging data between systems.

SLua tables fit well in the JSON format, making the conversion much easier than in LSL.

JSON is useful, in general, to exchange complex multilevel structured data between:
- external resources, using http.
- scripts, using linked messages.
- objects, using say and listen.
- Linkset Data storage.

JSON organizes data into two basic structures:
- **Arrays**: list of values, like the array tables in SLua:
	- [ "apple", "banana", "cherry" ]
  - The values are separated by commas (,) and the entire array is enclosed in brackets ([ and ]).
- **Objects**: collections of (key, value) pairs, like the dictionary tables in SLua:
	- { "type" : "dog" ,   "name" : "Dufa",   "color" : "white" }
  - Keys and values are separated by colons (:), pairs are separated by commas (,), and the entire object is enclosed in curly braces ({ and }).
  - Keys must be strings. 

There are 4 data types:
- **String**: text enclosed in double quotes ("hello").
- **Number**: Numbers, either integers (42) or decimals (3.14).
- **Boolean**: true or false.
- **Null**: null, a special value indicating no data.

Objects and arrays can contain a mix of these types.  
They also can contain other objects and arrays, in any depth and complexity.  
We can have arrays of objects with keys that are arrays with more arrays and with more objects, etc. Up to 100 levels of depth.

### Library lljson

The functions to work with JSON have their own library: lljson.

There are two pairs of functions:
- **lljson.encode()** / l**ljson.decode()** :
  - They generate or read standard JSON
  - They are useful to exchange data with external resources and other scripting languages.
  - SLua types without a JSON equivalent are encoded as strings.
- **lljson.slencode()** / **lljson.sldecode()** :
  - They generate non-standard JSON-like code.
  - They are useful to exchange code with other scripts or objects or to store in linkset data.
  - They are decoded into the original SLua types. 

### encode()

It takes an SLua table and generates standard JSON to send to an external website or for use with another scripting language.

<pre class="language-sluab"><code class="language-sluab">-- array table, encodes to a JSON array
local fruits = { "apples", "bananas", "oranges" }
print(lljson.encode(fruits))
-- > ["apples","bananas","oranges"]</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- dictionary table, encodes to a JSON object
local fruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }
print(lljson.encode(fruitsQuantity))
-- > {"Apple":50,"Cherry":20,"Orange":15,"Banana":30}</code></pre>

To work in SLua scripts with JSON strings that can be encoded and decoded as the same table use **slencode()**/**sldecode()**.

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
<pre class="language-sluab"><code class="language-sluab">-- dictionary table (with null keys), encodes to a JSON object
local fruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15, Kiwi = lljson.null }
print(lljson.encode(fruitsQuantity))
-- > {"Kiwi":null,"Apple":50,"Cherry":20,"Orange":15,"Banana":30}</code></pre>

#### Empty tables

Empty tables are exported as objects:
<pre class="language-sluab"><code class="language-sluab">-- empty table as JSON object
local tab = {}
print(lljson.encode(tab))
--> {}</code></pre>
We can use the constant **lljson.empty_array** to generate an empty JSON array:
<pre class="language-sluab"><code class="language-sluab">-- empty table as JSON array
local tab = lljson.empty_array
print(lljson.encode(tab))
--> []</code></pre>
We can export an empty table as JSON array setting the table **lljson.empty_array_mt** as its metatable:
<pre class="language-sluab"><code class="language-sluab">-- empty table as JSON array
local tab = { "hello" }
setmetatable(tab, lljson.empty_array_mt)
print(lljson.encode(tab))
--> ["hello"]
table.remove(tab, 1)
print(lljson.encode(tab))
--> []</code></pre>
**issue** : with mixed tables only the array part of the table is exported. This will be fixed to export all the table.

#### Sparse arrays

Moderately sparse arrays are exported as JSON objects.  
**nil** values are exported as **null**.
<pre class="language-sluab"><code class="language-sluab">-- sparse array as JSON array
local vegetables = { "Carrot", "Tomato", "Potato", "Onion", "Lettuce" }
vegetables[4] = nil
print(lljson.encode(vegetables))
-- > ["Carrot","Tomato","Potato",null,"Lettuce"]</code></pre>
	
If there are more nils than elements and the last index is bigger than 10, it throws the run-time error "Cannot serialise table: excessively sparse array":
<pre class="language-sluab"><code class="language-sluab">-- sparse array as JSON array, up to index 10 it works no matter how many nils
local tab = {}
tab[10] = "value 10"
print(lljson.encode(tab))
-- > [null,null,null,null,null,null,null,null,null,"value 10"]
tab[11] = "value 11"
print(lljson.encode(tab))
-- > Cannot serialise table: excessively sparse array</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- sparse array as JSON array, it works if there aren't more nils than values
local tab = {}
for i = 1, 15, 2 do
    tab[i] = "value " .. i
end
print(lljson.encode(tab))
-- > ["value 1",null,"value 3",null,"value 5",null,"value 7",null,"value 9",null,"value 11",null,"value 13",null,"value 15"]
tab[20] = "value 20"
print(lljson.encode(tab))
-- > Cannot serialise table: excessively sparse array</code></pre>

**possible improvement** : it is requested that excessively sparse arrays are exported as objects, or to have an option to export array tables as objects.

#### Mixed tables

Mixed tables are exported as JSON objects.  
Numeric keys are exported as strings:
<pre class="language-sluab"><code class="language-sluab">-- mixed table to JSON object with string keys
local vegetables = { "Carrot", "Tomato", "Potato", Lettuce = "favorite" }
print(lljson.encode(vegetables))
-- > {"1":"Carrot","2":"Tomato","3":"Potato","Lettuce":"favorite"}</code></pre>
We can export only the array part of a mixed table as JSON array setting the table **lljson.array_mt** as its metatable:
<pre class="language-sluab"><code class="language-sluab">-- array part of mixed table to JSON array
local vegetables = { "Carrot", "Tomato", "Potato", Lettuce = "favorite" }
setmetatable(vegetables, lljson.array_mt)
print(lljson.encode(vegetables))
-- > ["Carrot","Tomato","Potato"]</code></pre>

#### Dictionary tables

Keys with data types other than numbers and strings throw the run-time error "Cannot serialise userdata: table key must be a number or string":
<pre class="language-sluab"><code class="language-sluab">-- dictionary table with other data types
local staff = { [ll.GetOwner()] = "VIP" }
print(lljson.encode(staff))
-- > Cannot serialise userdata: table key must be a number or string</code></pre>
**possible improvement** : it is requested that all datatypes (except functions and threads) are exported as strings.

#### inf and -inf

**inf** and **-inf** are exported as numbers with values **1e9999** and **-1e9999**:
<pre class="language-sluab"><code class="language-sluab">-- inf and -inf to numbers
local bigNumbers = { math.huge, -math.huge }
print(lljson.encode(bigNumbers))
-- > [1e9999,-1e9999]</code></pre>

#### nan
**nan** is exported as the literal **NaN** (a literal, not a string).
<pre class="language-sluab"><code class="language-sluab">-- nan to the literal NaN
local puffedNumbers = { 0/0 }
print(lljson.encode(puffedNumbers))
-- > [NaN]</code></pre>
**issue** : this is not standard JSON. This will be changed to export as **null**.

#### Special characters

Characters with ASCII codes from 0 to 31 are encoded as JSON unicode:
<pre class="language-sluab"><code class="language-sluab">-- special characters to JSON unicode
local idBytes = ll.GetOwner().bytes
print(idBytes)
-- > ??8NK_?Έm?;?A
print(lljson.encode(idBytes))
-- > "\u000f\u0016??8NK_?Έm?;?A"</code></pre>

#### Indexing (0 vs 1)

JSON arrays do not store explicit index values in the file. They only define an ordered list of elements.  
- When a programming language decodes a JSON array received from SLua, it assigns indices according to its own array indexing rules. Most languages use 0-based indexing, so decoded arrays start at index 0.  
- When SLua decodes a JSON array received from an external source, it creates SLua tables using 1-based indexing, so the first element starts at index 1.

#### Examples

A longer example:
<pre class="language-sluab"><code class="language-sluab">local shelter = {
    -- General info about the shelter
    info = {
        name = "Happy Tails Shelter",
        location = "Riverdale",
        open_hours = { "Mon-Fri", "10:00-18:00" },
        staff = {
            manager = "Alice",
            volunteers = { "Bob", "Clara", "Dylan" }
        }
    },
    -- Pets section: dictionary of species
    pets = {
        dogs = {
            count = 8,
            breeds = { "Labrador", "Beagle", "Poodle" },
            vaccinated = true
        },
        cats = {
            count = 6,
            breeds = { "Siamese", "Maine Coon" },
            vaccinated = true
        },
        ["tropical fish"] = {
            count = 15,
            species = { "Guppy", "Goldfish", "Betta" },
            vaccinated = false
        }
    },
    -- Adoption records (array of dictionaries)
    adoptions = {
        { pet = "dog", adopter = "Emma", date = "2025-10-01" },
        { pet = "cat", adopter = "Lucas", date = "2025-10-12" }
    }
}

print(lljson.encode(shelter))</code></pre>

There are several websites where you can copy-paste JSON and show it well formatted, like <https://jsonlint.com/>.

Generated JSON:

<pre><code class="language-json">{
  "pets": {
    "dogs": {
      "breeds": [
        "Labrador",
        "Beagle",
        "Poodle"
      ],
      "count": 8,
      "vaccinated": true
    },
    "tropical fish": {
      "vaccinated": false,
      "species": [
        "Guppy",
        "Goldfish",
        "Betta"
      ],
      "count": 15
    },
    "cats": {
      "breeds": [
        "Siamese",
        "Maine Coon"
      ],
      "count": 6,
      "vaccinated": true
    }
  },
  "info": {
    "location": "Riverdale",
    "open_hours": [
      "Mon-Fri",
      "10:00-18:00"
    ],
    "name": "Happy Tails Shelter",
    "staff": {
      "volunteers": [
        "Bob",
        "Clara",
        "Dylan"
      ],
      "manager": "Alice"
    }
  },
  "adoptions": [
    {
      "date": "2025-10-01",
      "pet": "dog",
      "adopter": "Emma"
    },
    {
      "date": "2025-10-12",
      "pet": "cat",
      "adopter": "Lucas"
    }
  ]
}</code></pre>

An example with SLua data types:
<pre class="language-sluab"><code class="language-sluab">local build = {
    build_id = uuid("a1b2c3d4-1111-2222-3333-abcdefabcdef"),
    info = {
        name = "Beach Hangout",
        owner = uuid("9f8e7d6c-5555-4444-3333-bbbbbbbbbbbb"),
        category = "Social"
    },
    props = {
        {
            name = "Palm Tree",
            position = vector(128, 64, 22.5),
            orientation = rotation(0, 0, 0, 1)
        },
        {
            name = "Campfire",
            position = vector(130.5, 63.2, 21.8),
            orientation = rotation(0, 0.3827, 0, 0.9239),
            effects = {
                sound = "fire-crackle",
                color = vector(1, 0.5, 0.2)
            }
        }
    }
}

print(lljson.encode(build))</code></pre>

Generated JSON:

<pre><code class="language-json">{
  "props": [
    {
      "orientation": "<0,0,0,1>",
      "name": "Palm Tree",
      "position": "<128,64,22.5>"
    },
    {
      "orientation": "<0,0.3827,0,0.9239>",
      "effects": {
        "sound": "fire-crackle",
        "color": "<1,0.5,0.2>"
      },
      "name": "Campfire",
      "position": "<130.5,63.2,21.8>"
    }
  ],
  "info": {
    "owner": "9f8e7d6c-5555-4444-3333-bbbbbbbbbbbb",
    "name": "Beach Hangout",
    "category": "Social"
  },
  "build_id": "a1b2c3d4-1111-2222-3333-abcdefabcdef"
}</code></pre>

### decode()

It takes standard JSON received from an external website and generates an SLua table.

An example sending a request to a website that returns JSON data containing a random quote:
<pre class="language-sluab"><code class="language-sluab">local url  = "https://zenquotes.io/api/random"

LLEvents:on("touch_start", function(events)
    ll.HTTPRequest(url, {}, "")
end)

LLEvents:on("http_response", function(request_id, status, metadata, body)
    if status == 200 then
        print("json: ", body)
        local quote = lljson.decode(body)
        print("quote:", quote[1].q)
        print("author:", quote[1].a)
    else
        print("Request failed.")
    end
end)</code></pre>

The received JSON:
<pre><code class="language-json">[
  {
    "q": "Remember that sometimes not getting what you want is a wonderful stroke of luck.",
    "a": "Dalai Lama",
    "h": "<blockquote>&ldquo;Remember that sometimes not getting what you want is a wonderful stroke of luck.&rdquo; &mdash; <footer>Dalai Lama</footer></blockquote>"
  }
]
</code></pre>

To work in SLua scripts with JSON strings that can be encoded and decoded as the same table use **slencode()**/**sldecode()**.

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

JSON nulls are decoded to **lljson.null** to preserve the keys with null values from JSON objects. These keys would disappear decoding nulls to **nil**.

#### Example

An example with **encode()** and **decode()**, sending a JSON to a website that returns the same JSON and information about the headers of the request:

<pre class="language-sluab"><code class="language-sluab">local url = "https://postman-echo.com/post"

local function send()
    local sending = { task = "test", value = 123, object_name = ll.GetObjectName()}
    local json = lljson.encode(sending)
    ll.HTTPRequest(url, {HTTP_METHOD, "POST", HTTP_MIMETYPE, "application/json"}, json)
end

local function receive(json)
    local receiving = lljson.decode(json)
    for k, v in receiving do
        if type(v) == "table" then
            print(k)
            for k, v in v do
                print(" ", k, v)
            end
        else
            print(k, v)
        end
    end
end

LLEvents:on("http_response", function(request_id, status, metadata, body)
    if status == 200 then
        receive(body)
    else
        print("Request failed.")
    end
end)

send()
</code></pre>

The received JSON:
<pre><code class="language-json">{
  "args": {},
  "data": {
    "value": 123,
    "task": "test",
    "object_name": "JSON testing object"
  },
  "files": {},
  "form": {},
  "headers": {
    "host": "postman-echo.com",
    "x-secondlife-local-velocity": "(0.000000, 0.000000, 0.000000)",
    "accept-encoding": "gzip, br",
    "x-secondlife-local-position": "(104.017860, 190.604568, 22.250095)",
    "x-forwarded-proto": "https",
    "content-type": "application/json",
    "x-secondlife-region": "SLua Beta Nicoise (255744, 253952)",
    "x-secondlife-local-rotation": "(0.000000, 0.000000, 0.000000, 1.000000)",
    "x-secondlife-object-key": "db02d587-2bf9-3322-007b-5d80cf3f43fc",
    "x-secondlife-owner-key": "0f16c0e1-384e-4b5f-b7ce-886dda3bce41",
    "accept": "text/*, application/xhtml+xml, application/atom+xml, application/json, application/xml, application/llsd+xml, application/x-javascript, application/javascript, application/x-www-form-urlencoded, application/rss+xml",
    "content-length": "63",
    "x-secondlife-shard": "Production",
    "cache-control": "no-cache, max-age=0",
    "accept-charset": "utf-8;q=1.0, *;q=0.5",
    "user-agent": "Second-Life-LSL/2026-01-06.20757451310 (https://secondlife.com)",
    "x-secondlife-owner-name": "SuzannaLinn Resident",
    "pragma": "no-cache",
    "x-secondlife-object-name": "JSON testing object"
  },
  "json": {
    "value": 123,
    "task": "test",
    "object_name": "JSON testing object"
  },
  "url": "https://postman-echo.com/post"
}
</code></pre>

### metamethod __tojson

When there is a metamethod **__tojson**, **lljson.encode()** calls it and uses the returned data to generate the JSON representation of the table, instead of reading the table.

It's useful to adapt the contents of the table to the format that the external language or website expects:
<pre class="language-sluab"><code class="language-sluab">-- exporting a table formatted with __tojson
local fruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }
print(lljson.encode(fruitsQuantity))
-- > {"Apple":50,"Cherry":20,"Orange":15,"Banana":30}
	
local fruitsQuantity_mt = {
    __tojson = function(t)
        local jsonFruits = { title = "List of fruits and quantities", total = 0, fruits = {} }
        for k, v in t do
            table.insert(jsonFruits.fruits, { name = k, quantity = v })
            jsonFruits.total += v
        end
        return jsonFruits
    end
}
setmetatable(fruitsQuantity, fruitsQuantity_mt)
print(lljson.encode(fruitsQuantity))
-- > {"fruits":[{"name":"Apple","quantity":50},{"name":"Cherry","quantity":20},{"name":"Orange","quantity":15},{"name":"Banana","quantity":30}],"total":115,"title":"List of fruits and quantities"}</code></pre>

Generated JSON ready to export:
<pre><code class="language-json">{
  "fruits": [
    {
      "name": "Apple",
      "quantity": 50
    },
    {
      "name": "Cherry",
      "quantity": 20
    },
    {
      "name": "Orange",
      "quantity": 15
    },
    {
      "name": "Banana",
      "quantity": 30
    }
  ],
  "total": 115,
  "title": "List of fruits and quantities"
}</code></pre>

Anything that we return in **__tojson** will be generated instead of the table:
<pre class="language-sluab"><code class="language-sluab">-- exporting a table formated with __tojson
local fruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }
local fruitsQuantity_mt = {
    __tojson = function(t)
        return "non exportable table"
    end
}
setmetatable(fruitsQuantity, fruitsQuantity_mt)
print(lljson.encode(fruitsQuantity))
-- > "non exportable table"</code></pre>

We can export a sparse array as a JSON object, avoiding the "Cannot serialise table: excessively sparse array" error:
<pre class="language-sluab"><code class="language-sluab">-- sparse array to JSON object with __tojson
local tab = {}
tab[25], tab[50] = "value 25", "value 50"
local mt = {
    __tojson = function(t)
        local jsonTab = {}
        for k, v in t do
            jsonTab[tostring(k)] = v
        end
        return jsonTab
    end
}
setmetatable(tab, mt)
print(lljson.encode(tab))
-- > {"25":"value 25","50":"value 50"}</code></pre>

We can improve the previous script for a more general use to export proper arrays as JSON arrays and sparse arrays as JSON objects.  
The idea is that if the array isn't sparse the metamethod will return the unchanged table.  
But it can return the same table, because **lljson.encode()** would call **__tojson** on it and go into infinite recursion, until throwing the error "Cannot serialise, excessive nesting (101)".  
It returns a cloned table (cloned along with its metatable) with its metatable subsequently set to nil:
<pre class="language-sluab"><code class="language-sluab">-- array to JSON array and sparse array to JSON object with __tojson
local vegetables = { "Carrot", "Tomato", "Potato", "Onion", "Lettuce" }
local mt = {
    __tojson = function(t)
        if table.maxn(t) > #t then
            local jsonVegetables = {}
            for k, v in t do
                jsonVegetables[tostring(k)] = v
            end
            return jsonVegetables
        else
			-- return t  -- WRONG! __tojson is called again and goes into infinite recursion
			-- return table.clone(t)  -- WRONG! the table is cloned with its metatable
            return setmetatable(table.clone(t), nil)
        end
    end
}
setmetatable(vegetables, mt)
print(lljson.encode(vegetables))
-- > ["Carrot","Tomato","Potato","Onion","Lettuce"]</code></pre>

We can typecast keys to string, avoiding the "Cannot serialise userdata: table key must be a number or string" error:
<pre class="language-sluab"><code class="language-sluab">-- dictionary keys as string to JSON object with __tojson
local tab = { [ll.GetOwner()] = true }
local mt = {
    __tojson = function(t)
        local jsonTab = {}
        for k, v in t do
            jsonTab[tostring(k)] = v
        end
        return jsonTab
    end
}
setmetatable(tab, mt)
print(lljson.encode(tab))
-- > {"0f16c0e1-384e-4b5f-b7ce-886dda3bce41":true}</code></pre>

### metamethod __len

When there is a **__len** metamethod, **lljson.encode()** generates an array with the array part of the table and the length returned by **__len**. It uses **null** for the **nil** indexes, and adds **null**s at the end if there are not enough elements:
<pre class="language-sluab"><code class="language-sluab">-- table to JSON array with __len length
local tab = { 1, 2, 3, a = "a", b = "b" }
local mt = {
	__len = function(t)  -- nonsense function for testing
		return math.random(0, 10)
	end
}
setmetatable(tab, mt)
print(lljson.encode(tab))
-- > [1,2,3,null]
print(lljson.encode(tab))
-- > [1,2]
print(lljson.encode(tab))
-- > [1,2,3,null,null,null,null]</code></pre>

There is no limit to the quantity of **null**s used.

We can export a sparse array as a JSON array, avoiding the "Cannot serialise table: excessively sparse array" error:
<pre class="language-sluab"><code class="language-sluab">-- excessively sparse array to JSON array with __len
local tab = {}
tab[25], tab[50] = "value 25", "value 50"
local mt = { 
	__len = function(t)
		return table.maxn(t)
	end
}
setmetatable(tab, mt)
print(lljson.encode(tab))
--> [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"value 25",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"value 50"]</code></pre>

But we need to be careful if we are using **__len** for something else:
<pre class="language-sluab"><code class="language-sluab"> -- dictionary table to JSON object generates array of nulls with __len
local tab = { a = 1, b = 2, c = 3 }
local mt = { 
	__len = function(t)
		local len = 0 
		for _ in t do 
			len += 1 
		end 
		return len 
	end
}
setmetatable(tab, mt)
print(lljson.encode(tab))
-- > [null,null,null]</code></pre>

The solution is to use **__tojson** to return the same table without its metatable:
<pre class="language-sluab"><code class="language-sluab">-- dictionary table to JSON object with __tojson to avoid __len
local tab = { a = 1, b = 2, c = 3 }
local mt = {
	__len = function(t)
		local len = 0 
		for _ in t do 
			len += 1 
		end 
		return len 
	end,
    __tojson = function(t)
		return setmetatable(table.clone(t), nil) 
	end
}
setmetatable(tab, mt)
print(lljson.encode(tab))
-- > {"a":1,"c":3,"b":2}</code></pre>

### lljson constants

Asides from the 4 functions, there are 6 constants to give instructions for encoding and for information.

#### null and empty_array

They are two values that can't be represented with SLua values.

**lljson.null** : encodes to a JSON null. Useful to add null keys to a JSON object.
<pre class="language-sluab"><code class="language-sluab">-- lljson.null as null JSON key
local animals = { { kind = "dog", name = "Dufa", color = "white", wingspan = lljson.null } }
print(lljson.encode(animals))
-- > [{"color":"white","kind":"dog","name":"Dufa","wingspan":null}]</code></pre>

**lljson.empty_array** : encodes a JSON empty array (instead of a JSON empty object, that is the default for an empty table).
<pre class="language-sluab"><code class="language-sluab">-- lljson.empty_array as empty JSON array
local animals = { { kind = "dog", name = "Dufa", color = "white", puppies = lljson.empty_array } }
print(lljson.encode(animals))
-- > [{"color":"white","kind":"dog","name":"Dufa","puppies":[]}]</code></pre>

They have type "lljson_constant" derived from "userdata" (internally a value type derived from light userdata). They can't be confused with any other value of another type:
<pre class="language-sluab"><code class="language-sluab">print( type(lljson.null), typeof(lljson.null), lljson.null )
-- > userdata    lljson_constant    lljson_constant: 0x0000000000000003
print( type(lljson.empty_array), typeof(lljson.empty_array), lljson.empty_array )
-- > userdata    lljson_constant    lljson_constant: 0x0000000000000005</code></pre>

#### array_mt and empty_array_mt

They are two metatables that can be set to the table to give encoding instructions

**lljson.array_mt** : encodes the array part of the table as JSON array.
<pre class="language-sluab"><code class="language-sluab">-- array part of mixed table to JSON array
local vegetables = { "Carrot", "Tomato", "Potato", Lettuce = "favorite" }
setmetatable(vegetables, lljson.array_mt)
print(lljson.encode(vegetables))
-- > ["Carrot","Tomato","Potato"]</code></pre>

**lljson.empty_array_mt** : if the table is empty, encodes a JSON empty array (instead of a JSON empty object, that is the default for an empty table).
<pre class="language-sluab"><code class="language-sluab">-- empty table as JSON array
local tab = { "hello" }
setmetatable(tab, lljson.empty_array_mt)
print(lljson.encode(tab))
--> ["hello"]
table.remove(tab, 1)
print(lljson.encode(tab))
--> []</code></pre>

They are empty tables, used as markers. **lljson.encode()** gets the metatable and uses it as a parameter.

#### _NAME and _VERSION

They are two string constants with the name and version of the library:
<pre class="language-sluab"><code class="language-sluab">print(lljson._NAME)
--> lljson
print(lljson._VERSION)
--> 2.1.0.11</code></pre>

### slencode() / sldecode()

These functions work with non standard JSON-like code that can be encoded and decoded as the same table. They are useful to exchange code with other scripts or objects or to store in linkset data:
<pre class="language-sluab"><code class="language-sluab">-- encoding to internal JSON ready to be decoded unchanged
local tab = { 42, 3.14, "hello", true, ll.GetOwner(), vector(25, 50, 0), rotation(0.50, 0.25, 0, 1), "!vStringInVectorDisguise" }
local s = lljson.slencode(tab)
print(s)
-- > [42,3.14,"hello",true,"!u0f16c0e1-384e-4b5f-b7ce-886dda3bce41","!v<25,50,0>","!q<0.5,0.25,0,1>","!!vStringInVectorDisguise"]
local tabs = lljson.sldecode(s)
for _, v in tabs do
    print(typeof(v), v)
end
-- > number     42
-- > number     3.14
-- > string     hello
-- > boolean    true
-- > uuid       0f16c0e1-384e-4b5f-b7ce-886dda3bce41
-- > vector     <25, 50, 0>
-- > quaternion <0.5, 0.25, 0, 1>
-- > string     !vStringInVectorDisguise</code></pre>

To send JSON data to external resources use **encode()**.
To receive JSON data from external resources use **decode()**.

The generated code doesn't contain any special character so we can store it safely in linkset data.

A table's metatable can't be encoded. We have to set it again after decoding the table. If it is decoded in another script, the metatable has to be defined there too.

**issue** : **nil**s are decoded as **lljson.null**. This will be resolved.
**issue** : **lljson.empty_array** is decoded as an empty table. This will be resolved.

**slencode()** uses the metamethods **__tojson** and **__len** and the metatables **lljson.array_mt** and **lljson.empty_array_mt**, like **encode()**.  
We can use them to export to an external resource and also be able to use it internally:
<pre class="language-sluab"><code class="language-sluab">-- encoding for external and internal use
local slEncode
local fruits = { "apples", "bananas", "oranges" }
local fruits_mt = {
    __tojson = function(t)
        if slEncode then
            return setmetatable(table.clone(t), nil)
        end
        local jsonFruits = {}
        for _, v in t do
            table.insert(jsonFruits, v:upper())
        end
        return jsonFruits
    end
}
setmetatable(fruits, fruits_mt)
slEncode = false
print(lljson.encode(fruits))  -- external use
-- > ["APPLES","BANANAS","ORANGES"]  -- ready to export
slEncode = true
print(lljson.slencode(fruits))  -- internal use
-- > ["apples","bananas","oranges"]  -- ready to be decoded</code></pre>

If the table has a **__len** metamethod we have to add a **__tojson** to return the table without the metatable:
<pre class="language-sluab"><code class="language-sluab">-- using __tojson to avoid __len
local tab = { a = 1, b = 2, c = 3 }
local mt = {
	__len = function(t)
		local len = 0 
		for _ in t do 
			len += 1 
		end 
		return len 
	end,
    __tojson = function(t)
		return setmetatable(table.clone(t), nil) 
	end
}
setmetatable(tab, mt)
print(lljson.slencode(tab))
-- > {"a":1,"c":3,"b":2}</code></pre>

**possible improvement** : It is requested that **slencode()** not use metatables and metamethods.

#### Tight encoding

**slencode()** has a second parameter for tight encoding, **false** by default. With **true** some data types are encoded with less characters.

Changes are:
- vectors and rotations: encoded without "<" and ">" and coordinates with value 0 as empty.
- uuids : encoded in numeric format as base64 strings in 22 characters instead of 36 (plus the 2 characters of the "!u" tag).

<pre class="language-sluab"><code class="language-sluab">-- encoding tight
local tab = { ll.GetOwner(), vector(25, 50, 0), rotation(0.50, 0.25, 0, 1) }
print(lljson.slencode(tab))
-- > ["!u0f16c0e1-384e-4b5f-b7ce-886dda3bce41","!v<25,50,0>","!q<0.5,0.25,0,1>"]
print(lljson.slencode(tab, true))
-- > ["!uDxbA4ThOS1+3zoht2jvOQQ","!v25,50,","!q0.5,0.25,,1"]</code></pre>

**sldecode()** identifies both formats automatically, so we don't have to specify the format.
