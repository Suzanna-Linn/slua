## Functions

### Variadic functions

We define a function with variable parameters using ... (3 points) as parameter name.

For instance, a function to send several messages to a person:
	local function messaging( avatarId, ... )

We have a fixed parameter, avatarId, and then ... parameters, from 0 to many, any quantity.

We call this function with any quantity of messages, for instance:
	messaging( ll.GetOwner(), "Hello", "How are you", "Nice to have you here" )

We can only use one ... in each function, and it must be the last one of the parameters.

And how do we access this ... parameters in the function?

We have the function select(), with two parameters.

The first parameter can be:
	"#", to get the quantity of parameters
	an index, to get the parameters in this position, starting with 1

The second parameter is the ...

And our function is:
	local function messaging( avatarId, ... )
		for i = 1, select( "#", ... ) do
			ll.RegionSayTo( avatarId, select( i, ... ) )
		end
	end

We get the total of messages with   select("#",...)   to use as the limit of the loop for and we say the messages one by one using   select(i,...).

### Multiple-value return functions

We only need to place all the values in the return statement:
	return myVal1, myVal2, myVal3

Let's see another example of a function using ... parameters, and also returning two values.

A function that takes numbers, any quantity of them, and returns the total sum and the average:
local function stats(...)
local sum = 0
local mean = 0
local count = select("#", ...) 
for i = 1, count do
sum = sum + select(i, ...)
end
if count > 0 then
mean = sum / count
end
return sum, mean
end

To store the two returned values we assign them to two variables:
	tot, avg = stats( 3, 28, 8, 45, 14 )

Lua evaluates the expression on the right of the = and assigns its values to the variable on the left of the =.

With this:
	tot= stats( 3, 28, 8, 45, 14 )
the second value returned is discarded.

And with this:
	tot, avg, lotteryWinner = stats( 3, 28, 8, 45, 14 )
lotteryWinner gets nil, because there are no more values.

Assigning several values at once works not only with functions.

We can use it to exchange the values of two variables, without using an intermediate one:
	a, b = b, a

Lua first evaluates all the values on the right, before assigning them to the variables on the left.

### Anonymous functions

SLua has anonymous functions (function literals), which can be written inline and used directly as arguments or values.

We can use inline, unnamed functions. This is useful for short functions that we are going to use only once.

For instance, to get the length of a dictionary table:
tableLen = (function(tab)
local n = 0
for _ in pairs(tab) do
n += 1
end
return n
end)(myTab)

From " (funtion " to " end) " we are defining the function. With " (myTab) " we are calling it.

Of course, if we are going to use this function in several places is better to define it as usual, with a name.

We can also use inline functions when translating LSL scripts to replace assignations used in expressions.

For instance, in LSL:
	if ( people = llGetAgentList( AGENT_LIST_PARCEL, [] ) != [] ) {
we are assigning the agent list to people and checking if there is people, to do something with them.

In SLua, assignations are statements, not expressions, and they don't return a value. We can't use them were a value is expected. We would the agent list in people, but there will not be anything to compare with and empty table.

One option is, in SLua:
	people = ll.GetAgentList( AGENT_LIST_PARCEL, {} )
	if #people ~= 0 then

And the other option, with an inline function, is, in SLua:
	if #(function() people = ll.GetAgentList( AGENT_LIST_PARCEL, {} ) return people end)() ~= 0 then

In the function we assign the table people in the same way, and we also return its value so it can be used in a expression. Since the function has no parameters, we are calling it with " () ".

Which looks much more complicated, so use the previous versions in two lines.

### Passing parameters to functions

In general, in programming languages, there are two ways of passing parameters to functions: by value or by reference.

Passing by value means the function gets a copy of the original data. Changes made inside the function do not affect the original value outside.

Passing by reference means the function receives a reference to the original data. Changes to that data do affect the original.

In SLua (as in LSL) all the parameters, of any type, are passed by value, we can't change the contents of the original variables.

For instance:
	function test( tab )
		tab = { "x", "y", "z" }
		print( tab[1] )  -- >   x
	end
	tabTest = { "a", "b", "c" }
	test( tabTest )
	print( tabTest[1] )  -- >   a

tabTest is unchanged by the modification in the function.

But some of the data types have a reference as value: table, function and thread (coroutines).

We can't change the value of a variable passed as parameter in a function. But we can use the reference to change its contents.

For instance:
	function test( tab )
		tab[1] = "x"
		print( tab[1] )  -- >   x
	end
	tabTest = { "a", "b", "c" }
	test( tabTest )
	print( tabTest[1] )  -- >   x

Which doesn't happen in LSL, where variables with lists contain the list instead of a reference to it.

With functions and threads there is not so much to change and, if we are passing them as parameters, the changes are probably expected. And anyway they don't exist in LSL.

But we need to be careful when translating our LSL scripts to SLua, if any of them is modifying lists passed as parameters.



