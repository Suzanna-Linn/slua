## Datatypes

### LSL integer

Used as a boolean value, with contants <code class="language-lsl">TRUE</code> and <code class="language-lsl">FALSE</code> is a SLua type boolean, with values <code class="language-slua">true</code> and <code class="language-slua">false</code>.

Used as an integer is a SLua type number (which has integer and float values all in the same datatype).

SLua adds the type integer, which is the same than the LSL integer, because some LL functions that use lists as parameters need the integers to be of type integer, not number.

* We get an integer value using <code class="language-slua">myInt = integer(42)</code>.

* Use always the type number for any number, use the type integer only when it is necessary for the LL functions.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// integers (LSL)

integer isOk = TRUE;
integer count = 0;
integer face = 0;



llSetPrimitiveParams([PRIM_GLOW, face, 1]);





llOwnerSay("glowed!");</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- integers (SLua)

local isOk = true
local count = 0
local face = integer(0)

-- there is no type list, LL functions use tables instead of lists
-- tables are enclosed in { and }, instead of [ and ]
ll.SetPrimitiveParams({PRIM_GLOW, face, 1})

-- when a function is called with only one table literal the parentheses can be omitted
ll.SetPrimitiveParams{PRIM_GLOW, face, 1}

-- same with only one string literal
ll.OwnerSay "glowed!"  -- instead of ll.OwnerSay("glowed!")</code></pre>
</td></tr></table>

### LSL float

It is a SLua type number (floats and integers all go in the datatype number)

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// floats (LSL)

float height = 1.65;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- floats (SLua)

local height = 1.65</code></pre>
</td></tr></table>

### LSL string

It is a SLua type string. We will see about strings in its section below.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// strings (LSL)

string message = "hello";</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- strings (SLua)

local message = "hello"</code></pre>
</td></tr></table>

### LSL key

SLua adds the type uuid, which is the same than the LSL key.The change of name is to avoid confusion with the key of a table.

* We get an uuid using <code class="language-slua">myId = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code>.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// keys (LSL)

key myId = "0f16c0e1-384e-4b5f-b7ce-886dda3bce41";</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- uuids (SLua)

local myId = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code></pre>
</td></tr></table>

### LSL vector

It is a SLua type vector. It uses the library vector.

* We get a vector using <code class="language-slua">myVec = vector(50, 50, 0)</code>.

* It's not possible to assign a value to a coordinate. We need to create a new vector.

* We can get a coordinate from the return value of a function, not only from a variable.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// vectors (LSL)

vector myVec = <50, 50, 0>;

myVec.z = 20;

vector pos = llGetPos();  // we need a variable before reading the coordinate
float posZ = pos.z;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- vectors (SLua)

local myVec = vector(50, 50, 0)

myVec = vector(myVec.x, myVec.y, 20)  -- we can't assign a value to a coordinate


local posZ = ll.GetPos().z </code></pre>
</td></tr></table>

### LSL rotation

SLua adds the types rotation and quaternion. They are synonims, internally they are the same datatype quaternion.

* We get a rotation using <code class="language-slua">myRot = rotation(1, 1, 1, 0)</code> or <code class="language-slua">myRot = quaternion(1, 1, 1, 0)</code>.

* It's not possible to assign a value to a coordinate. We need to create a new rotation.

* We can get a coordinate from the return value of a function, not only from a variable.

* Vectors can use uppercase coordinates (X, Y, Z) but rotations can't. Use always lowercase coordinates.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// rotations (LSL)

rotation myRot = <1, 1, 1, 0>;
quaternion myRot2 = <2, 2, 2, 0>;

myRot.s = -myRot.s;

rotation rot = llGetRot();  // we need a variable before reading the coordinate
float rotS = rot.s;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- rotations (SLua)

local myRot = rotation(1, 1, 1, 0)
local myRot2 = quaternion(2, 2, 2, 0)

myRot = vector(myRot.x, myRot.y, myRot.z, -myRot.s)  -- we can't assign a value to a coordinate


local rotS = ll.GetRot().s</code></pre>
</td></tr></table>

### LSL list

Lists are tables. We will see about lists in its section below.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// lists (LSL)

list fruits = ["apple", "banana", "orange"];

//</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- tables (SLua)

local fruits = {"apple", "banana", "orange"}

-- tables are enclosed in { and }, instead of [ and ]</code></pre>
</td></tr></table>

### Typecasting

* to boolean
  * from number or integer: <code class="language-slua">myBool = (myNum ~= 0)</code>

* to number
  * from string:
    * if the string is fully numeric: <code class="language-slua">myNum = tonumber("123")</code> or <code class="language-slua">myNum = tonumber("1.75")</code>, but <code class="language-slua">tonumber("123abc")</code> gets <code class="language-slua">nil</code>
    * if the string starts with an integer: <code class="language-slua">myNum = integer("123abc")</code>, but <code class="language-slua">integer("1.75abc")</code> gets <code class="language-slua">1</code>, <code class="language-slua">integer("abc")</code> gets <code class="language-slua">0</code>
  * from integer: <code class="language-slua">myNum = tonumber(integer(42))</code>

* to integer
  * from boolean: <code class="language-slua">myInt = integer(true)</code> gets <code class="language-slua">1</code>, <code class="language-slua">myNum = integer(false)</code> gets <code class="language-slua">0</code>
  * from number: <code class="language-slua">myInt = integer(1.75)</code> gets <code class="language-slua">1</code>
  * from string: <code class="language-slua">myInt = integer("123abc")</code> gets <code class="language-slua">123</code>

* to string
  * from any type: <code class="language-slua">myStr = tostring(myVar)</code>

* to uuid
  * from string: <code class="language-slua">myUuid = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code>

* to vector
  * from string: <code class="language-slua">myVec = tovector("<50,50,20>")</code>

* to rotation/quaternion 
  * from string: <code class="language-slua">myRot = torotation("<1,1,1,0>")</code> or <code class="language-slua">myRot = toquaternion("<1,1,1,0>")</code>


The types integer and uuid haven't got a "to" function because they already use or can use a string to create the value.

We need to typecast from booleans and to booleans because the LL functions use numeric TRUE/FALSE as parameters and return value.
