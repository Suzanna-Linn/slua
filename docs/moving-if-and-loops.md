## If and loops

### if

It uses the keywords "then" and "end" instead of { and }.  
The condition doesn't need to be inside ( and ).  
There is a keyword "elsif" that can be used instead of "else if".

Basic if-else:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">if (someValue == 0) {
	// do something
} else {
	// do something else
}</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">if someValue == 0 then
	-- do something
else
	-- do something else
end</code></pre>
</td></tr></table>

Multiple if-else using the SLua keyword elseif:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">if (option == 1) {
	// do something
} else if (option == 2) {
	// do something else
} else {
	// do something other else
}</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">if option == 1 then
	-- do something
elseif option == 2 then
	-- do something else
else
	-- do something other else
end</code></pre>
</td></tr></table>

Chain of if-else-if using a SLua table:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">if (option == "one") {
	FirstOption()
} else if (option == "this") {
	OptionThis()
} else if (option == "that") {
	OptionThat()
} else if (option == "last") {
	LastOption()
} else if (option == "") {
	MissingOption()
} else  {
	WhateverElse()
}</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">local tabOptions = {
	one = FirstOption,
    this = OptionThis,
	that = OptionThat,
    last = LastOption,
    [""] = MissingOption  -- "" is not a valid identifier, must be in []
}

-- if the option exists in tabOptions call it, otherwise call the "else" function
(tabOptions[option] or WhateverElse)()


--</code></pre>
</td></tr></table>

SLua inline if:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">pointsText = "You have " + (string)points;
if (points == 1)
	pointsText += " point";
else
	pointsText += " points";
}</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">

pointsText = "You have " .. tostring(points) .. if points == 1 then " point" else " points"

-- or the same with string interpolation
pointsText = `You have {points} {if points == 1 then "point" else "points"}`</code></pre>
</td></tr></table>
The "then" and "else" parts are values or expressions instead of statements. The "else" is mandatory. There is no "end".

The LSL constants TRUE and FALSE exist, but they can't be used in the same way. They are numbers and have values 1 and 0. In SLua true and false are boolean values.
<pre class="language-slua"><code class="language-slua">local isOk = FALSE
if isOk then
	-- always true
  	print("yes, 0 is true")	
end</code></pre>
In SLua, FALSE, with a value of 0, is true.    
The only false values in SLua are the boolean false and nil.

The variables must be compared with the default value of their type.  
The type uuid has .istruthy that returns true if the variable contains a valid not null uuid.
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">if (count) {}
if (message) {}
if (avatarId) {}
if (vec) {}
if (rot) {}
if (someList) {}
</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">if count ~= 0 then end
if message ~= "" then end
if avatarId.istruthy then end
if vec ~= ZERO_VECTOR then end
if rot ~= ZERO_ROTATION then end
if #someList ~= 0 then end
</code></pre>
</td></tr></table>


### while

It uses the keywords "do" and "end" instead of { and }.  
The condition doesn't need to be inside ( and ).  
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">while (condition) {
	// do something
}</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">while  condition do
	-- do something
end</code></pre>
</td></tr></table>

But... let's look at this in LSL:  
<code class="language-lsl">while (--count) {  // LSL</code>

It has a nice bunch of problems in a short space. There are 3 problems.

First problem, the decrement \-\- doesn't exist in Lua (neither the increment ++).

We could try with this, which work the same in LSL:  
<code class="language-slua">while (count = count - 1) {  // LSL</code>

But... second problem:

In LSL, assignments are expressions, they return a value. LSL calculates count-1, assigns it to count, and returns the value of count (which is discarded if not needed).  
In SLua, assignments are statements, they return nothing. Not even nil, just nothing.  
Conditions expect a return value, so using an assignment in a condition in SLua throws an error at compile time.

We could try with this LSL version:
<pre class="language-lsl"><code class="language-lsl">// while (--count) in LSL

count = count - 1;
while (count) {
	// do something
	count = count - 1;
}</code></pre>

And, third problem, in SLua this would run forever.

Because a value of 0 is true in Lua.  
0 is true, "" is true, NULL_KEY is true, the LL constant FALSE, which has a value of 0, is true. Any value of any type that we use in LSL is true in SLua.  
The only false values are the boolean false and nil.  
We need to get a boolean value, comparing with 0.

This is the good one, in SLua:
<pre class="language-slua"><code class="language-slua">-- while (--count) in SLua

count = count - 1;
while count ~= 0 do
	-- do something
	count = count - 1;
end</code></pre>

### for

The loop for is very different in SLua. A way that always work is to change it into a loop while:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">
for ( i = 0; i < 10; i++ ) {
	// do something
}

</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">i = 0
while i < 10  do
	-- do something
	i += 1
end</code></pre>
</td></tr></table>

This is a good way to translate a LSL script without analizing what it does. But often it's not the best way.

There are three types of loop for:
- Numeric for
- Generic for
- Generic for with generalized iteration

### Numeric for

<pre class="language-slua"><code class="language-slua">local start, stop, end = 1, 10, 1

for i = start, stop, step do
	-- do something
end</code></pre>

To count from 0 to 15 by 3:
<pre class="language-slua"><code class="language-slua">for i = 0, 15, 3 do
	ll.OwnerSay(tostring(i))
end

-- > 0, 3, 6, 9, 12, 15</code></pre>

The values for start, stop and step can be numbers, or variables, or expressions that return a number.  
The step can be negative. It's optional, it defaults to 1.

Important! start, stop and step are evaluated only once, at the start of the loop. They can't be changed inside the for.

Trying to change the index variable will only work in the current loop. It will be replaced in the next loop:
<pre class="language-slua"><code class="language-slua">for i = 1, 3 do
	ll.OwnerSay("for: " .. tostring(i));
	i = 2  -- nonsense line that seems to make the loop last forever, but it doesn't
	ll.OwnerSay("new value: " .. tostring(i));
end

-- > for 1, new value 2, for 2, new value 2, for 3, new value 2</code></pre>

An example saying the colors of the prim:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// prim colors (LSL)

integer totalFaces = llGetNumberOfSides();
integer i;
for ( i = 0; i < totalFaces; i++) {
	llOwnerSay("Face: " + (string)i + " color: " + (string)llGetColor(i));
}</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- prim colors (SLua)



for i = 0, ll.GetNumberOfSides() - 1 do
	ll.OwnerSay(`Face:  {i}  color: {ll.GetColor(i)}`)
end</code></pre>
</td></tr></table>

In SLua, ll.GetNumberOfSides() is called only once, in LSL is better to store its value in a variable to avoid calling it in each loop.

But now let's assume that we know for sure that one of the faces is red, and we want to know which face.
<pre class="language-lsl"><code class="language-lsl">// looking for the red face (LSL)

vector RED = <1, 0, 0>;
integer i;
for ( i = 0; llGetColor(i) != RED; i++) {
}
llOwnerSay("Face in red is number: " + (string)i);</code></pre>

No way to rewrite this LSL loop for into a SLua numeric for. But there is an alternative.  
SLua has a command break to jump out of the loop for.

Let's do a first try with this:
<pre class="language-slua"><code class="language-slua">-- looking for the red face (SLua)
	
local RED = vector(1, 0, 0)
local i = 0    -- this is wrong
for i = 0, ll.GetNumberOfSides() - 1 do    -- going to loop on all the faces
	if ll.GetColor(i) == RED then
		break    -- but ending the loop when we find the color, same as LSL
	end
end
ll.OwnerSay(`Face in red is number: {i}`)    -- this is very WRONG!!!!!!
-- > 0 (always 0!!!)</code></pre>

It happens that the index variable in the loop for is automatically declared local to the loop.  
The "i" in the "for i = 0" is local to the for. The "local i = 0" is another variable, with the same name.  
At the end of the loop for, or when it breaks, the "i" in the "for i = 0" goes out of scope. The "i" used in ll.OwnerSay is the "local i = 0", which has been 0 all the time.

This is the good one:
<pre class="language-slua"><code class="language-slua">-- looking for the red face (SLua)

local RED = vector(1, 0, 0)
local face 
for i = 0, ll.GetNumberOfSides() - 1 do    -- going to loop on all the faces
	if ll.GetColor(i) == RED then
		face = i
		break    -- but ending the loop when we find the color, same as LSL
	end
end
ll.OwnerSay(`Face in red is number: {face}`)</code></pre>

To use the value of the index after the loop for, it has to be copied to another variable.

### Generic for

It is used with tables.

Saying an array table using a numeric for, which is not the best way:
<pre class="language-slua"><code class="language-slua">local vegetables = {"Carrot", "Tomato", "Potato", "Onion", "Lettuce"}
for i = 1, #vegetables do
	ll.OwnerSay(`index {i} is {vegetables[i]}`)
end</code></pre>

Since reading a table is something that is done often, there is a function to do it: ipairs():
<pre class="language-slua"><code class="language-slua">local vegetables = {"Carrot", "Tomato", "Potato", "Onion", "Lettuce"}
for i, veggie in ipairs(vegetables) do
	ll.OwnerSay(`index {i} is {veggie}`)
end</code></pre>

The format is: "for", the indexes (i and veggie), "in", and a function, ipairs() with array tables or pairs() with dictionary tables, with the table as parameter.
ipairs() and pairs() return two values: the key and the value, in this example assigned to i and veggie.

Sometimes we only want the values, not the index. In this case is usual to do:
<pre class="language-slua"><code class="language-slua">local vegetables = {"Carrot", "Tomato", "Potato", "Onion", "Lettuce"}
for _, veggie in ipairs(vegetables) do
	ll.OwnerSay(veggie)
end</code></pre>

The _ (underscore) in the variables is the name of a variable. Variable names can start with underscore, or can be only an underscore.  
Using _ we are meaning that we are not going to use this variable, and the _ is there because we need it as a placeholder.

Using this dictionary table:
<pre class="language-slua"><code class="language-slua">local vegetables = {
    Carrot = 60,
    Potato = 150,
    Tomato = 100,
    Onion = 110,
    Lettuce = 500
}</code></pre>
with the vegetables as keys and its average weight in grams as values.

We can say the table using a loop while and the function next():
<pre class="language-slua"><code class="language-slua">local key, value = next(vegetables)
while key do
	ll.OwnerSay(`{key} has an average weight of {value} grams`)
	key, value = next(vegetables, key)
end</code></pre>

next() with one parameter returns the first key in the table. With a key as second parameter returns the next key. And, like ipairs(), it returns two values: the key and the value.

But, being a common process, it also has its own function: pairs().  
pairs() works like ipairs() but on a dictionary table.

With for and pairs():
<pre class="language-slua"><code class="language-slua">for name, weight in pairs(vegetables) do
	ll.OwnerSay(`{name} has an average weight of {weight} grams`)
end</code></pre>

Dictionary tables haven't got a defined key order. It's not the order in which they are added, it's not an alphabetical order, it's no order at all. The keys are stored and accesed in the way that is internally more efficient.

### Generic for with generalized iteration

This one was a later addition to the previous types of loop for.  
It loops on a table or a table literal without using ipairs() or pairs():
<pre class="language-slua"><code class="language-slua">local rivers = {
    Nile = 6650,
    Amazon = 6400,
    Yangtze = 6300,
    Mississippi = 6275,
    Yenisei = 5539,
    Yellow = 5464
}
for name, length in rivers do
    ll.OwnerSay(`{name} River is about {length} km long.`)
end</code></pre>
<pre class="language-slua"><code class="language-slua">for _, val in { 5, 10, 20, 50 } do
    ll.OwnerSay(`Value {val}`)
end</code></pre>

### repeat

The loop repeat...until is similar to do...while, in LSL:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">do {
	// do something
} while (condition)    // loops while the condition is true, ends when it becomes false</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">repeat
	-- do something
until condition    -- loops while the condition is false, ends when it becomes true</code></pre>
</td></tr></table>


To translate a do...while without changing its condition:
<pre class="language-slua"><code class="language-slua">repeat
	-- do something
until not (condition)</code></pre>

### block

A block to have an inner variable scope:
<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">string s = "outer";
{
    string s = "inner";
    llOwnerSay(s);
}
llOwnerSay(s);

// -- > inner, outer
</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">local s = "outer"
do
    local s = "inner"
    ll.OwnerSay(s)
end
ll.OwnerSay(s)

-- > inner, outer</code></pre>
</td></tr></table>
