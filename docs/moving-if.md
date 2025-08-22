## If

The "if" condition:
	if someValue == 0 then
		-- do something
	else
		-- do something else
	end

There the keywords "then" and "end" instead of { and }.

The condition doesn't need to be inside ( and ).

There is a keyword "elsif" instead of "else if".

And there is an inline if:
	pointsText = "You have " .. tostring(points) .. if points == 1 then " point" else " points"

The "then" and "else" parts are a value instead of statements. The "else" is mandatory. There is no "end".

In LSL:
	pointsText = "You have " + (string)points;
	if (points == 1) {
		pointsText += " point";
	} else {
		pointsText += " points";
	}

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



EXPRESSION EVALUATION IN LSL

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

