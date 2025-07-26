= Moving from LSL to SLua =

In this section, we will learn how to rewrite our LSL scripts in SLua through a two-step process:
* First, we will translate them into SLua while maintaining a structure as close as possible to the original LSL format (SLua in LSL style).
* Next, we will refine and improve them to take full advantage of Lua’s capabilities (SLua in Lua style).
To follow this section effectively, a basic understanding of Lua is required, as covered in the previous two sections.


== Using SLua in the beta grid ==

These are the steps to follow before starting to script in SLua:

* Install the "Second Life Project Lua Editor" viewer, from: https://releasenotes.secondlife.com/viewer.html. This is a different viewer, with a different icon, than the "Second Life Viewer". We can keep our usual viewer for the main grid and use this one for the beta grid.

* Access the Beta Grid (Aditi), explained in: https://lindenlab.freshdesk.com/support/solutions/articles/31000156725-accessing-aditi

* Teleport to one of the four regions that have SLua activated. It doesn't work in the other regions. Sometimes one or two of these regions are offline, try another one if you can't tp or login:
** [secondlife://Aditi/secondlife/SLua%20Yardang/241/235/27 SLua Yardang]
** [secondlife://Aditi/secondlife/SLua%20Tombolo/241/235/27 SLua Tombolo]
** [secondlife://Aditi/secondlife/SLua%20Mesa/241/235/27 SLua Mesa]
** [secondlife://Aditi/secondlife/SLua%20Tideland/241/235/27 SLua Tideland]

* Rez an object and add a new script as usual. The script editor has a "compiler" drop-down list, at bottom center. Choose "SLua":
** LSL Legacy (LSO2) : LSL, with "Mono" unchecked.
** LSL Mono : LSL, with "Mono" checked (the usual one).
** LSL 2025 VM : LSL, but compiled into VM Luau instead of VM Mono.
** SLua


== Global namespace ==

The global namespace is a table with the name "_G".

It contains the global functions and libraries. Each library is a table with its functions.

SLua has added all the LL constants (1002 constants, currently).

The global variables and functions created by the script will also be in this table.

<syntaxhighlight lang="lua" line copy>
-- list of global functions (SLua)

for key, value in pairs(_G) do
    if type(value) == "function" then
        ll.OwnerSay(key)
    end
end
</syntaxhighlight>

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


== Libraries ==

The libraries are in the global namespace as tables.

<syntaxhighlight lang="lua" line copy>
-- list of global tables (SLua)

for key, value in pairs(_G) do
    if type(value) == "table" then
        ll.OwnerSay(key)
    end
end
</syntaxhighlight>

There are 10 libraries that come from Luau, with all the same functions, documented in https://luau.org/library:

* table, string, math, bit32, os, vector (these ones have functions in common with the LSL functions, we will see them below)
* coroutine, utf8, debug, buffer


SLua has added:

* ll

with all the functions coming from LSL (523 functions, currently).

The functions have the same name, without the "ll" at the start (because "ll" is now the name of the library).

So <code>llSay</code> becomes the function <code>Say</code> in the library <code>ll</code> and is used as <code>ll.Say</code>.


== Datatypes ==


=== LSL integer ===

Used as a boolean value, with contants <code>TRUE</code> and <code>FALSE</code> is a <code>boolean</code>, with values <code>true</code> and <code>false</code>.

Used as an integer is a <code>number</code> (which has integer and float values all in the same datatype).

SLua adds the type <code>integer</code>, which is the same than the LSL integer, because some LL functions that use lists as parameters need the integers to be of type <code>integer</code>, not <code>number</code>.

* We get an integer value using <code>myInt = integer(42)</code>.

* Use always the type <code>number</code> for any number, use the type <code>integer</code> only when it is necessary for the LL functions.
{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// integers (LSL)

integer isOk = TRUE;
integer count = 0;
integer face = 0;



llSetPrimitiveParams([PRIM_GLOW, face, 1]);





llOwnerSay("glowed!");
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- integers (SLua)

local isOk = true
local count = 0
local face = integer(0)

-- there is no type list, LL functions use tables instead of lists
-- tables are enclosed in { and }, instead of [ and ]
ll.SetPrimitiveParams({PRIM_GLOW, face, 1})

-- when a function is called with only one table literal the parentheses can be omitted
ll.SetPrimitiveParams{PRIM_GLOW, face, 1}

-- same with only one string literal
ll.OwnerSay "glowed!"  -- instead of ll.OwnerSay("glowed!")
</syntaxhighlight>
|}

=== LSL float ===

It is a <code>number</code> (floats and integers all go in the datatype <code>number</code>)

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// floats (LSL)

float height = 1.65;
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- floats (SLua)

local height = 1.65
</syntaxhighlight>
|}

=== LSL string ===

It is a <code>string</code>. We will see about strings in its section below.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// strings (LSL)

string message = "hello";
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- strings (SLua)

local message = "hello"
</syntaxhighlight>
|}

=== LSL key ===

SLua adds the type <code>uuid</code>, which is the same than the LSL key.The change of name is probably to avoid confusion with the key of a table.

* We get an uuid using <code>myId = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code>.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// keys (LSL)

key myId = "0f16c0e1-384e-4b5f-b7ce-886dda3bce41";
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- uuids (SLua)

local myId = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")
</syntaxhighlight>
|}

=== LSL vector ===

It is a <code>vector</code>. It uses the library vector.

* We get a vector using <code>myVec = vector(50, 50, 0)</code>.

* It's not possible to assign a value to a coordinate. We need to create a new vector.

* We can get a coordinate from the return value of a function, not only from a variable.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// vectors (LSL)

vector myVec = <50, 50, 0>;

myVec.z = 20;

vector pos = llGetPos();  // we need a variable before reading the coordinate
float posZ = pos.z;
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- vectors (SLua)

local myVec = vector(50, 50, 0)

myVec = vector(myVec.x, myVec.y, 20)  -- we can't assign a value to a coordinate


local posZ = ll.GetPos().z 
</syntaxhighlight>
|}

=== LSL rotation ===

SLua adds the types <code>rotation</code> and <code>quaternion</code>. They are synonims, internally they are the same datatype <code>quaternion</code>.

* We get a rotation using <code>myRot = rotation(1, 1, 1, 0)</code> or <code>myRot = quaternion(1, 1, 1, 0)</code>.

* It's not possible to assign a value to a coordinate. We need to create a new rotation.

* We can get a coordinate from the return value of a function, not only from a variable.

* Vectors can use uppercase coordinates (X, Y, Z) but rotations can't. Use always lowercase coordinates.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// rotations (LSL)

rotation myRot = <1, 1, 1, 0>;
quaternion myRot2 = <2, 2, 2, 0>;

myRot.s = -myRot.s;

rotation rot = llGetRot();  // we need a variable before reading the coordinate
float rotS = rot.s;
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- rotations (SLua)

local myRot = rotation(1, 1, 1, 0)
local myRot2 = quaternion(2, 2, 2, 0)

myRot = vector(myRot.x, myRot.y, myRot.z, -myRot.s)  -- we can't assign a value to a coordinate


local rotS = ll.GetRot().s
</syntaxhighlight>
|}

=== LSL list ===

Lists are tables. We will see about lists in its section below.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// lists (LSL)

list fruits = ["apple", "banana", "orange"];
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- tables (SLua)

local fruits = {"apple", "banana", "orange"}  -- tables are enclosed in { and }, instead of [ and ]
</syntaxhighlight>
|}

=== Typecasting ===

* to <code>boolean</code>
** from <code>number</code> or <code>integer</code>: <code>myBool = (myNum ~= 0)</code>

* to <code>number</code>
** from <code>string</code>:
*** if the string is fully numeric: <code>myNum = tonumber("123")</code> or <code>myNum = tonumber("1.75")</code>, but <code>tonumber("123abc")</code> gets <code>nil</code>
*** if the string starts with an integer: <code>myNum = integer("123abc")</code>, but <code>integer("1.75abc")</code> gets <code>1</code>, <code>integer("abc")</code> gets  <code>0</code>
** from <code>integer</code>: <code>myNum = tonumber(integer(42))</code>

* to <code>integer</code>
** from <code>boolean</code>: <code>myInt = integer(true)</code> gets <code>1</code>, <code>myNum = integer(false)</code> gets <code>0</code>
** from <code>number</code>: <code>myInt = integer(1.75)</code> gets <code>1</code>
** from <code>string</code>: <code>myInt = integer("123abc")</code> gets <code>123</code>

* to <code>string</code>
** from any type: <code>myStr = tostring(myVar)</code>

* to <code>uuid</code>
** from <code>string</code>: <code>myUuid = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")</code>

* to <code>vector</code>
** from <code>string</code>: <code>myVec = tovector("<50,50,20>")</code>

* to <code>rotation/quaternion</code> 
** from <code>string</code>: <code>myRot = torotation("<1,1,1,0>")</code> or <code>myRot = toquaternion("<1,1,1,0>")</code>


The types <code>integer</code> and <code>uuid</code> haven't got a "to" function because they already use or can use a string to create the value.

We need to typecast from booleans and to booleans because the LL functions use numeric TRUE/FALSE as parameters and return value.


== Events ==

Events are writen as global functions (without the <code>local</code> keyword).

They have the same names and parameters.
{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// events (LSL)

touch_start(integer num_detected)
{
    // do something
}

listen(integer channel, string name, key id, string message)
{
    // do something
}
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- events (SLua)

function touch_start(num_detected)
    -- do something
end


function listen(channel, name, id, message)
    // do something
end
--
</syntaxhighlight>
|}

== States ==


There aren't states in Slua.

The events <code>state_entry</code> and <code>state_exit</code> doesn't exist.

The script executes the code that is at the top level, out of the functions.

We can simulate states with functions with different names, one for each state, for each event. To change to another "state" we assign the function for this "state" to the name of the event.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// states (LSL)

default
{
    touch_end(integer num_detected)
    {
        llOwnerSay("Changing to state ready");
        state ready;
    }
}

state ready
{
    touch_end(integer num_detected)
    {
        llOwnerSay("Changing to state default");
        state default;
    }
}


//
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- states (SLua)


-- function for the event in the "state" default
function touch_end_default(num_detected)
    ll.OwnerSay("Changing to state ready")
    touch_end = touch_end_ready  -- we change the function that handles the event
end




-- function for the event in the "state" ready
function touch_end_ready(num_detected)
    ll.OwnerSay("Changing to state default")
    touch_end = touch_end_default  -- we change the function that handles the event
end


-- in Lua we can assign a function to a variable
-- touch_end becomes a function, the same than touch_end_default
touch_end = touch_end_default
</syntaxhighlight>
|}

== The "New Script" ==

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// the "New Script" (LSL)

default
{
    state_entry()
    {
        llSay(0, "Hello, Avatar!");
    }

    touch_start(integer total_number)
    {
        llSay(0, "Touched.");
    }
}

//
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line copy>
-- the "New Script" (SLua - LSL style)



function state_entry()
    ll.Say(0, "Hello, Avatar!")
end


function touch_start(total_number)
   ll.Say(0, "Touched.")
end



state_entry()
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- the "New Script" (SLua - Lua style)








function touch_start(total_number)
   ll.Say(0, "Touched.")
end



ll.Say(0, "Hello, Avatar!")
</syntaxhighlight>
|}

SLua doesn't have states and there are no events <code>state_entry</code> or <code>state_exit</code>.

To keep the LSL structure, we can write a function with name <code>state_entry</code> (it's not an event, just a function) and call it from the top-level code (LSL-style script, line  16).

Or move the code in the LSL <code>state_entry</code> to the top-level code (Lua-style script, line  16).

== Operators ==


==== Division ====

There are two division operators: / and //.

The / is the decimal division. The // is the integer division.

If in LSL we are dividing two integers, in Slua we use //, otherwise we use /.

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// division (LSL)

integer total = 10;
integer people = 7;

llOwnerSay((string)(total / people));         // --> 1
llOwnerSay((string)((float)total / people));  // --> 1.428571
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- division (SLua)

local total = 10
local people = 7

ll.OwnerSay(tostring(total // people))  -- > 1
ll.OwnerSay(tostring(total / people))   -- > 1.4285714285714286
</syntaxhighlight>
|}

==== Exponentiation ====

In Lua, the ^ is the exponentiation operator.

We can use ^ instead of the function ll.Pow()

{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// exponentiation (LSL)

integer base = 2;
integer exp = 3;

llOwnerSay((string)llPow(base,exp));  // --> 8.000000
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- exponentiation (SLua)

local base = 2;
local exp = 3;

ll.OwnerSay(tostring(base ^ exp))  -- > 8
</syntaxhighlight>
|}

==== Not equal ====

The unequality operator is ~= instead of !=.
{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// not equal (LSL)

if (llGetColor(ALL_SIDES) != <1,1,1>) {
    llOwnerSay("it isn't white");
}
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- not equal (SLua)

if ll.GetColor(ALL_SIDES) ~= vector(1,1,1) then
    ll.OwnerSay("it isn't white")
end
</syntaxhighlight>
|}

==== Increment / decrement ====

In Lua ++ and -- don't exist.

We need to add or subtract one.
{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// increment / decrement (LSL)

integer total = 0;
integer count = 10;

total++;
count--;
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- increment / decrement (SLua)

local total = 0
local count = 10

total += 1
count -= 1
</syntaxhighlight>
|}

==== Concatenation ====

The concatenation operator is .. instead of +.
{| {{KBtable}}
|
<syntaxhighlight lang="lsl2" line>
// concatenation (LSL)

string greet1 = "hello";
string greet2 = "world";

llOwnerSay(greet1 + " " + greet2);  // --> hello world
</syntaxhighlight>
|
<syntaxhighlight lang="lua" line>
-- concatenation (SLua)

local greet1 = "hello"
local greet2 = "world"

ll.OwnerSay(greet1.." "..greet2)  -- > hello world
</syntaxhighlight>
|}

==== And / Or / Not ====


==== Bitwise operations ====


==== The operator # ====

== Functions ==


== Expressions ==


== If ==


== Loops ==


== Strings ==


== Lists ==
