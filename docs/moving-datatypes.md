## Datatypes

### LSL integer

Used as a boolean value, with contants <code class="language-lsl">TRUE</code> and <code class="language-lsl">FALSE</code> is an SLua type boolean, with values <code class="language-slua">true</code> and <code class="language-slua">false</code>.

Used as an integer is an SLua type number (which has integer and float values all in the same datatype).

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// integers (LSL)

integer isOk = TRUE;
integer count = 0;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- integers (SLua)

local isOk = true
local count = 0</code></pre>
</td></tr></table>

### LSL float

It is an SLua type number (floats and integers all go in the datatype number). SLua numbers are stored in 64 bits.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// floats (LSL)

float height = 1.65;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- floats (SLua)

local height = 1.65</code></pre>
</td></tr></table>

### LSL string

It is an SLua type string.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// strings (LSL)

string message = "hello";</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- strings (SLua)

local message = "hello"</code></pre>
</td></tr></table>

More about strings here: [Strings](/slua/moving-strings).

### LSL key

SLua adds the type uuid, which is the same than the LSL key.The change of name is to avoid confusion with the key of a table.
- We get a uuid using <code class="language-slua">myId = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code>.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// keys (LSL)

key myId = "0f16c0e1-384e-4b5f-b7ce-886dda3bce41";</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- uuids (SLua)

local myId = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code></pre>
</td></tr></table>

### LSL vector

It is an SLua type vector. It uses the Luau library vector.
- We get a vector using <code class="language-slua">myVec = vector(50, 50, 0)</code>.
- It's not possible to assign a value to a component. We need to create a new vector.
- We can get a component from the return value of a function, not only from a variable.
- Components are stored in 32 bits (same as LSL).

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// vectors (LSL)

vector myVec = <50, 50, 0>;

myVec.z = 20;

vector pos = llGetPos();  // we need a variable before reading the component
float posZ = pos.z;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- vectors (SLua)

local myVec = vector(50, 50, 0)

myVec = vector(myVec.x, myVec.y, 20)  -- we can't assign a value to a component


local posZ = ll.GetPos().z </code></pre>
</td></tr></table>

### LSL rotation

SLua adds the types rotation and quaternion. They are synonims, internally they are the same datatype quaternion.
- We get a rotation using <code class="language-slua">myRot = rotation(1, 1, 1, 0)</code> or <code class="language-slua">myRot = quaternion(1, 1, 1, 0)</code>.
- It's not possible to assign a value to a component. We need to create a new rotation.
- We can get a component from the return value of a function, not only from a variable.
- Components are stored in 32 bits (same as LSL).
- Vectors can use uppercase components (X, Y, Z) but rotations can't. Let's use always lowercase components.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// rotations (LSL)

rotation myRot = <1, 1, 1, 0>;
quaternion myRot2 = <2, 2, 2, 0>;

myRot.s = -myRot.s;

rotation rot = llGetRot();  // we need a variable before reading the component
float rotS = rot.s;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- rotations (SLua)

local myRot = rotation(1, 1, 1, 0)
local myRot2 = quaternion(2, 2, 2, 0)

myRot = vector(myRot.x, myRot.y, myRot.z, -myRot.s)  -- we can't assign a value to a component


local rotS = ll.GetRot().s</code></pre>
</td></tr></table>

### LSL list

Lists are tables.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// lists (LSL)

list fruits = ["apple", "banana", "orange"];

//</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- tables (SLua)

local fruits = {"apple", "banana", "orange"}

-- tables are enclosed in { and }, instead of [ and ]</code></pre>
</td></tr></table>

More about tables here: [Tables](/slua/moving-lists).

### The SLua datatype integer

SLua adds the type integer (32 bits). It exists only for compatibility reasons with a few LL functions.

It's not to be used as an LSL integer, the LSL integer is an SLua number (which has integer and float values all in the same datatype).

The SLua type integer is only for a few uses that requires it. We can't make operations with a number and an integer, they are different types. Integers must be casted to numbers to operate with numbers.

<pre class="language-slua line-numbers"><code class="language-slua">-- type integer (SLua)

	local myInt = integer(42)    -- don't use this type unless there is a good reason
</code></pre>

The uses of "integer" are:
- Typecasting in LSL-style
  - <code class="language-slua">integer("123abc") -- > 123</code> or <code class="language-slua">integer("aaa") -- > 0</code>
    - tonumber() returns nil in both cases.
	- same as <code class="language-slua">string.match( "123abc", "^%s*([-+]?%d+)" ) or 0</code>
  - <code class="language-slua">integer(myBool) -- > 1 or 0</code>
	- same as <code class="language-slua">if myBool then 1 else 0</code>
- ll.List2Integer() returns type integer.
- ll.DumpList2String() and ll.List2CSV() print type number always with six decimals and type integer without decimals
- the bit32 library functions return type integer when all the parameters have type integer.

### Typecasting

- to boolean
  - from number or integer: <code class="language-slua">myBool = (myNum ~= 0)</code>

- to number
  - from string:
    - if the string is fully numeric:
      - <code class="language-slua">myNum = tonumber("123") -- > 123</code> or <code class="language-slua">myNum = tonumber("1.75") -- > 1.75</code>
	  - but <code class="language-slua">tonumber("123abc") --> nil</code>
    - if the string starts with an integer:
      - <code class="language-slua">myNum = integer("123abc") -- > 123</code> or <code class="language-slua">integer("abc") -- > 0</code>
	  - but <code class="language-slua">integer("1.75abc") -- > 1</code>
  - from integer: <code class="language-slua">myNum = tonumber(integer(42)) -- > 42</code>

- to string
  - from any type: <code class="language-slua">myStr = tostring(myVar)</code>

- to uuid
  - from string: <code class="language-slua">myUuid = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code>

- to vector
  - from string: <code class="language-slua">myVec = tovector("<50, 50, 20>")</code>

- to rotation/quaternion 
  - from string:
    - <code class="language-slua">myRot = torotation("<1, 1, 1, 0>")</code>
	- <code class="language-slua">myRot = toquaternion("<1, 1, 1, 0>")</code>

- to integer
  - from boolean: <code class="language-slua">myInt = integer(isOk) -- > myInt will be 1 or 0</code>
  - from number: <code class="language-slua">myInt = integer(1.75)</code>
  - from string: <code class="language-slua">myInt = integer("123abc")</code>

The types integer and uuid haven't got a "to" function because they already use or can use a string to create the value.

### type() and typeof()

type( myVar ) returns the Lua base type of the variable. All the types added by SLua return "userdata", which is an internal datatype used to define new types in the language itself. We can't use "userdata".

typeof( myVar ) returns the type of the variable, including the new types:
- <code class="language-slua">typeof( vector( 1, 2, 3 ) ) -- > vector</code>
- <code class="language-slua">typeof( uuid( "0f16c0e1-384e-4b5f-b7ce-886dda3bce41" ) ) -- > uuid</code>
- <code class="language-slua">typeof ( rotation ( 1, 2, 3, 4) ) -- > quaternion</code>

We have the datatypes rotation and quaternion and the functions torotation() and toquaternion() to cast from string, but internally only exists the type quaternion, rotation is just an alias.

<pre class="language-slua"><code class="language-slua">-- typeof() (SLua)

if typeof(myVar) == "quaternion" then  -- NOT "rotation", it would never happen!
	-- do rotations stuff
end</code></pre>

<code class="language-slua">typeof( ZERO_ROTATION ) -- > quaternion</code>. There is no constant ZERO_QUATERNION.

### Types in LL constants and functions

In SLua, LL constants, function return values, and the elements of lists returned by LL functions have the type number if their LSL type is integer or float.
- The only exception is ll.List2Integer(), which returns an SLua integer.

For LL function parameters that are integer or float in LSL, SLua accepts both number and integer types.
- If a number with decimals is passed to a parameter expecting an integer, the decimal part is truncated (not rounded).
- Many, but not all, of these functions also accept a boolean type, which is internally cast to an integer.

In SLua, LL constants that contain a uuid have type uuid. In LSL they have type string.

### Use of memory

Every variable or literal value, of any type, is stored as a 16 bytes tagged value (TValue) that includes the type identifier.
- Primitive types (boolean, number, vector and nil) have their value in the TValue.
- Reference types (string, table, function, thread, buffer and userdata) have a pointer to the heap.

- SLua vector is derived from Luau vector and is a primitive type.  
- SLua quaternion and uuid are derived from userdata and are reference types.
  - rotation is an alternative name for quaternion, internally there is only the type quaternion.
- SLua integer is derived from the internal type "light userdata" that stores the data in the TValue like the primitive types.
  - "light userdata" returns "userdata" as type.

The format of the TValue is:
- 8 bytes : value (for primitive types) or pointer (for reference types)
- 4 bytes : extra (used for Luau vectors to store their 3rd component)
- 4 bytes : type identifier

When used as a key in a table, it changes to a Tkey, with this format:
- 8 bytes : value
- 4 bytes : extra
- 4 bits : type identifier
- 28 bits : link to the next node in the table

Each node in a dictionary table has a TKey and a TValue. Array tables are very optimized and in the best case only need the to store the TValues (depending on how the elements are added, preallocating the array with table.create() when the number of elements is known, gives the best optimization).

Reference types have their data stored in the heap (pointed by the TValue) with a header with internal metadata:
- string has its length (in bytes) and data for string interning (explained here [string interning](slua/moving-strings#string-interning)).
- table has the length of the array part, a pointer to its metatable, the read-only parameter and data to optimize search.
- userdata has the length and a pointer to its internal metatable.

Memory used for each datatype:

<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">Datatype</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">Bytes</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">Comments</th>
    </tr>
  </thead>
  <tbody>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">nil</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">16</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">16</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">16</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">vector</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">16</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">Luau vector</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">integer</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">16</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">userdata, internally light userdata, stored in the TValue</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">quaternion</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">48</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">userdata, rotations are stored as quaternions</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">37 + string length</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">uses string interning</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">uuid (valid)</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">61</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">userdata, stored in numeric format</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">uuid (string)</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">61 + string length</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">userdata, stored as string, uses string interning</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">buffer</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">32 + buffer length</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">more exactly: 24 + buffer length with a minimum of 32</td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">table</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">52 (empty)</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">function</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">36 (empty)</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
	<tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">thread</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">1024 (empty)</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">coroutines</td>
    </tr>
  </tbody>
</table>

Strings and string uuids are stored as UTF-8. The characters ASCII 0-127 use 1 byte (instead of 2 bytes in LSL):

<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">Bytes</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">Unicode Range</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">Character Types</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">1</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">U+0000 to U+007F</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">ASCII characters (basic English letters, digits, etc.)</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">2</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">U+0080 to U+07FF</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">Extended Latin, Greek, Cyrillic, Hebrew, Arabic</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">3</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">U+0800 to U+FFFF</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">Chinese, Japanese, Korean, symbols, most emojis</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">4</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">U+10000 to U+10FFFF</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">Supplementary characters, rare scripts, more emojis</td>
    </tr>
  </tbody>
</table>
