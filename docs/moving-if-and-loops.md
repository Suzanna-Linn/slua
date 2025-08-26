## If and loops

### If

It uses the keywords "then" and "end" instead of { and }.  
The condition doesn't need to be inside ( and ).  
There is a keyword "elsif" instead of "else if".

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

Chain of if-else if using a SLua table:
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
<pre class="language-slua"><code class="language-slua">local tabOptions = { one = FirstOption,
                     this = OptionThis,
                     that = OptionThat,
                     last = LastOption,
                     [""] = MissingOption  -- not a valid identifier, must be in []
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
pointsText += " points";</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">
pointsText = "You have " .. tostring(points) .. if points == 1 then " point" else " points"

// or the same with string interpolation
pointsText = `You have {points} {if points == 1 then " point" else " points"}`</code></pre>
</td></tr></table>
The "then" and "else" parts are values or expressions instead of statements. The "else" is mandatory. There is no "end".








TRUE and FALSE are LSL constants. They are numbers and have values 1 and 0. In SLua true and false are boolean values.

We could use TRUE or FALSE in the same way that we use them in LSL, with numbers, except that FALSE, with a value of 0, is true in SLua.

The only false values in SLua are the boolean false and nil.

0 is true, "" is true, a NULL_KEY is true.

We can't do something like
	isOk = FALSE
	if isOk then
		-- always true
	end
because no matter if isOk is TRUE or FALSE, the condition will be always true.

We would need to do
	if isOk ~= 0 then
or with a string
	if str ~= "" then

Uuid's have the function .istruthy that return true if the variable contains a valid uuid:
	if avatarId.istruthy then		-- it's the same than in LSL:   if (avatarId) {

## Loops

The loop for is very different in Lua. A way that always work is to change it into a loop while.

In LSL:
	for ( i = 0; i < 10; i++ ) {
		// do something
	}

In SLua:
	i = 0
	while i < 10  do
		-- do something
		i += 1
	end


Let's start with the loop while.

It's similar to the LSL while.

In LSL:
	while (condition) {
		// do something
	}

In SLua;
	while  condition do
		-- do something
	end

Replacing { and } with "do" and "end", and the condition doesn`t need parentheses (same as the command if).

But... let's look at this in LSL:
	while (--count) {    // LSL

It has a nice bunch of problems in a short space. There are 3 problems.

First, the decrement -- doesn't exist in Lua (neither the increment ++).

We could try with this, which work the same in LSL:
	 while (count = count - 1) {    // LSL

But... second problem:

In LSL, assignments are expressions, they return a value. LSL calculates count-1, assigns it to count, and returns the value of count (which is discarded if not needed).

In SLua, assignments are statements, they return nothing. Not even nil, just nothing.

Conditions expect a return value, so using an assignment in a condition in SLua throws an error at compile time.

We could try with this LSL version:
	count = count - 1;
	while (count) {
		// do something
		count = count - 1;
	}

And, third problem, in SLua this would run forever.

Because a value of 0 is true in Lua.

0 is true, "" is true, NULL_KEY is true, the LL constant FALSE, which has a value of 0, is true. Any value of any type that we use in LSL is true in SLua.

The only false values are the boolean false and nil.

We need to get a boolean value, comparing with 0. 

This is the good one, in SLua:
	count = count - 1;
	while count ~= 0 do
		-- do something
		count = count - 1;
	end



NUMERIC FOR
´
The loop for is very different in Lua. A way that always works is to change it into a loop while.

In LSL:
	for ( i = 0; i < 10; i++ ) {
		// do something
	}

In SLua:
	local i = 0
	while i < 10  do
		-- do something
		i += 1
	end

Or, if we are going to use the variable i to index an array table, that we remember that start with index 1, in SLua:
	local i = 0
	while i < 10  do
		i += 1
		-- do something
	end
with the increment at the start of the loop, not at the end.

This is good to translate a LSL script without analizing what it does. But often it's not the best way.

There are two types of loop for:
	- Numeric for
	- Generic for

Let's start with the numeric, its format is, in SLua:
	for i = start, stop, step do
-- do something
	end

To count from 0 to 15 by 3 is, in SLua:
	for i = 0, 15, 3 do
		ll.OwnerSay(tostring(i))
	end
	-- > 0, 3, 6, 9, 12, 15

The values for start, stop and step can be numbers, or variables, or expressions that return a number.

The step can be negative. It's optional, it defaults to 1 if we don't write it.

Important! start, stop and step are evaluated only once, at the start of the loop. We can't change them inside the for.

We can change the index variable, but only for the current loop. It will be replaced in the next loop.

For instance, in SLua:
	for i = 1, 3 do
		ll.OwnerSay("for: " .. tostring(i));
		i = 2  -- nonsense line that seems to make the loop last forever, but it doesn't
		ll.OwnerSay("new value: " .. tostring(i));
	end
	-- > for 1, new value 2, for 2, new value 2, for 3, new value 2

Let's see the numeric for with an example, saying the colors of the prim, in LSL:
	integer totalFaces = llGetNumberOfSides();
	integer i;
	for ( i = 0; i < totalFaces; i++) {
		llOwnerSay("Face: " + (string)i + " color: " + (string)llGetColor(i));
	}

In SLua:
	for i = 0, ll.GetNumberOfSides() - 1 do
		ll.OwnerSay(`Face:  {i}  color: {ll.GetColor(i)}`)
	end

ll.GetNumberOfSides() is called only once, while in LSL we need a variable to store its value and avoid calling it in each loop.

But now let's assume that we know for sure that one of the faces is red, and we want to know which face.

In LSL:
	vector RED = <1, 0, 0>;
	integer i;
	for ( i = 0; llGetColor(i) != RED; i++) {
	}
	llOwnerSay("Face in red is number: " + (string)i);

No way to rewrite this LSL loop for into a SLua numeric for. But there is an alternative.

SLua has a command break to jump out of the loop for.

Let's do a first try with this, in SLua:
	local RED = vector(1, 0, 0)
	local i = 0    -- this is wrong
	for i = 0, ll.GetNumberOfSides() - 1 do    -- going to loop on all the faces
		if ll.GetColor(i) == RED then
			break    -- but ending the loop when we find the color, same as LSL
		end
	end
	ll.OwnerSay(`Face in red is number: {i}`)    -- this is very WRONG!!!!!!
	-- > 0 (always 0!!!)

It happens that the index variable in the loop for is automatically declared local to the loop.

The "i" in the "for i = 0" is local to the for. The "local i = 0" is another variable, with the same name.

At the end of the loop for, or when it breaks, the "i" in the "for i = 0" goes out of scope. The "i" used in ll.OwnerSay is the "local i = 0", which has been 0 all the time.

This is the good one:
	local RED = vector(1, 0, 0)
	local face 
	for i = 0, ll.GetNumberOfSides() - 1 do    -- going to loop on all the faces
		if ll.GetColor(i) == RED then
			face = i
			break    -- but ending the loop when we find the color, same as LSL
		end
	end
	ll.OwnerSay(`Face in red is number: {face}`) 

If we want to use the value of the index after the loop for, we need to copy it to another variable.



Now let's see the generic for. We will use it for tables.

First let's write an array table using a numeric for, which is not the best way, in SLua:
	local vegetables = {"Carrot", "Tomato", "Potato", "Onion", "Lettuce"}
	for i = 1, #vegetables do
		ll.OwnerSay(`index {i} is {vegetables[i]}`)
	end

Since reading a table is something that we do often, there is a function to do it: ipairs().

Just ipairs(). We have seen functions like table.insert(), table.clone(),... that are in the library table. But ipairs() is in the global library and it doesn't use a library name.

With ipairs() is this, in SLua:
	local vegetables = {"Carrot", "Tomato", "Potato", "Onion", "Lettuce"}
	for i, veggie in ipairs(vegetables) do
		ll.OwnerSay(`index {i} is {veggie}`)
	end

The format is: "for", the indexes (i and veggie), "in", and a function that returns the keys and values  (in this example ipairs() with a table).

The strange behaviour here, from a LSL point of view, is... is ipairs() returning two values?

Yes, Lua functions can return several values.

For instance, in SLua:
	local username, displayName
function names(id)
	return ll.GetUsername(id), ll.GetDisplayName(id)
end
username, displayName = names(ll.GetOwner())

The "return" in the function names returns two values, separated by commas (Could be more values, all separated by commas).

We use two variables, separated by commas, to assign the two returned values.

So in
	for i, veggie in ipairs(vegetables) do
we get the index and the value at the same time.

Sometimes we only want the values, not the index. In this case is usual to do, in SLua:
	local vegetables = {"Carrot", "Tomato", "Potato", "Onion", "Lettuce"}
	for _, veggie in ipairs(vegetables) do
		ll.OwnerSay(veggie)
	end

The _ (underscore) in the indexes of the loop for is the name of a variable. Variable names can start with underscore, or can be only an underscore.

Using _ we are meaning that we are not going to use this variable, and the _ is there because we need it as a placeholder. It's a way to make the script more clear.


GENERIC FOR (DICTIONARY TABLES)

Now let's write a dictionary table, for instance:
local vegetables = {
    Carrot = 60,
    Potato = 150,
    Tomato = 100,
    Onion = 110,
    Lettuce = 500
}
with the vegetables as keys and its average weight in grams as values.

We can write the table using a loop while and the next() function, in SLua:
local key, value = next(vegetables)
while key do
	ll.OwnerSay(`{key} has an average weight of {value} grams`)
	key, value = next(vegetables, key)
end

next() with one parameter returns the first key in the table. With a key as second parameter returns the next key.

And, like ipairs(), it returns two values,  the key and the value.

But, being a common process, it also has its own function: pairs().

pairs() works like ipairs() but in a dictionary table. We need to remember that ipairs() works in array tables only and pairs() in dictionary tables only.

With for and pairs(), in SLua:
for name, weight in pairs(vegetables) do
	ll.OwnerSay(`{name} has an average weight of {weight} grams`)
end

It's possible to use our own functions as iterators for the loop for, in the same way than ipairs() and pairs() are working. We will see it in future classes.

Dictionary tables haven't got a defined key order. It's not the order that we added them, it's not an alphabetical order, no order at all. The keys are stored and accesed in the way that is internally more efficient.



The last loop is repeat...until. It's similar to do...while, in LSL:
	do {
		// do something
	} while (condition)    -- loops while the condition is true, ends when it becomes false

In SLua:
	repeat
		-- do something
	until condition    -- loops while the condition is false, ends when it becomes true

So to translate a do...while without changing its condition, it would be, in SLua:
	repeat
		-- do something
	until not (condition)

## Expression evaluation

Now this is more weird, and probably we will not find this problem in a real, or secondreal, script. But it's good to know.

In LSL:
	integer a = 0;
	integer b = a * 20 + a = 1;
	llOwnerSay((string)b);

And in SLua:
	local a = 0
	local b = a * 20 + (function() a = 1 return a end)()
	print(b)

Are both versions the same? What is the value of b?

In SLua b is 1, but in LSL b is 21.

LSL, before doing any calculation, gets all the values in:
	- assignations
	- functions
	- variables

And it gets them from right to left, no matter parentheses, priorities or anything.

So first, from the right:
	a = 1, assigns 1 to a and gets 1 as the value of a

Next, the other a at the start:
	a, gets 1 as its values

And the expression, after replacing asisgnations and variables (and functions if there is any) is:
	integer b = 1 * 20 + 1;

SLua gets the variables and functions, from left to right, as they are needed, so the result is 1 ( 0 * 20 + 1 ).

The correct translation is assigning before the expression:
	local a = 0
	a = 1
	b = a * 20 + a
	print(b)

We can see the difference more clear with this other example:

In LSL:
	integer func1() { llOwnerSay("one"); return 1; }
	integer func2() { llOwnerSay("two"); return 2; }
	integer func3() { llOwnerSay("three"); return 3; }
	default { state_entry() {
		integer b = func1() + func2() + func3();
	}}

In SLua:
	function func1() print("one") return 1 end
	function func2() print("two") return 2 end
	function func3() print("three") return 3 end
	local b = func1() + func2() + func3()

b is always 6, but the printed messages are:
	in LSL: "three", "two", "one"
	in SLua: "one", "two", "three"

And back to translating this LSL:
	if ( func1() && func2() )  

It's not this:
	local tmp_func1 = func1()
	local tmp_func2 = func2()
	if tmp_func1 ~= 0 and tmp_func2 ~= 0 then
		--
	end

But this, executing the function 2 first:
	local tmp_func2 = func2()
	local tmp_func1 = func1()
	if tmp_func1 ~= 0 and tmp_func2 ~= 0 then
		--
	end

LSL evaluates all the variables, functions and assignations, from right to left, before looking at the operators. This is why both sides of && and || are always evaluated.


