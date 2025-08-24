## Functions

### Variadic functions

A function with variable parameters is defined using ... (3 points) as parameter name.

For instance, a function to send several messages to a person:
- <code class="language-slua">local function messaging( avatarId, ... )</code>

There is a fixed parameter, avatarId, and then ... parameters, from 0 to many, any quantity.

This function can be called with any quantity of messages, for instance:
- <code class="language-slua">messaging( ll.GetOwner(), "Hello", "How are you", "Nice to have you here" )</code>

Only one ... can be used in each function, and it must be the last one of the parameters.

To access the ... parameters there is the function select(), with two parameters.

The first parameter can be:
- "#", to get the quantity of parameters
- an index, to get the parameters in this position, starting with 1

The second parameter is the ...

And the function is:
<pre class="language-slua"><code class="language-slua">-- Variadic function (SLua)

local function messaging( avatarId, ... )
	for i = 1, select( "#", ... ) do
		ll.RegionSayTo( avatarId, select( i, ... ) )
	end
end</code></pre>

It gets the total of messages with select("#",...) to be used as the limit of the loop for and it says the messages one by one using   select(i,...).

### Multiple-value return functions

It's just placing all the values in the return statement:
- <code class="language-slua">return myVal1, myVal2, myVal3</code>

For instance, a function that takes numbers, any quantity of them, and returns the total sum and the average:
<pre class="language-slua"><code class="language-slua">-- Variadic function with multiple returns (SLua)

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
end</code></pre>

The two returned values are stored assigning them to two variables:
- <code class="language-slua">tot, avg = stats( 3, 28, 8, 45, 14 )</code>

Lua evaluates the expression on the right of the = and assigns its values to the variables on the left of the =.

With:
- <code class="language-slua">tot = stats( 3, 28, 8, 45, 14 )</code>
the second value returned is discarded.

And with:
- <code class="language-slua">tot, avg, lotteryWinner = stats( 3, 28, 8, 45, 14 )</code>
  - lotteryWinner gets nil, because there are no more values.

Assigning several values at once works not only with functions.

It can exchange the values of two variables, without using an intermediate one:
- <code class="language-slua">a, b = b, a</code>

Lua first evaluates all the values on the right, before assigning them to the variables on the left.

### Anonymous functions

SLua has anonymous functions (function literals), which can be written inline and used directly as arguments or values.  
Inline, unnamed functions are useful for short functions that are going to be used only once.

For instance, to get the length of a dictionary table:
<pre class="language-slua"><code class="language-slua">-- Anonymous, inline function (SLua)

tableLen = (function(tab)
	local n = 0
	for _ in pairs(tab) do
		n += 1
	end
	return n
end)(myTab)</code></pre>

From " (funtion " to " end) " is the definition of the function. The function is called with " (myTab) ".

Of course, if the function is going to be used in several places is better to define it as usual, with a name.

Inline functions are also useful when translating LSL scripts to replace assignations used in expressions.

For instance, in LSL:
- <code class="language-lsl">if ( people = llGetAgentList( AGENT_LIST_PARCEL, [] ) != [] ) {</code>
  - it's assigning the agent list to people and checking if there is people, to do something with them.

In SLua, assignations are statements, not expressions, and they don't return a value. They can't be used were a value is expected. It would assign the agent list to people, but there will not be anything to compare with the empty table.

One option is, in SLua:
- <code class="language-slua">people = ll.GetAgentList( AGENT_LIST_PARCEL, {} ) if #people ~= 0 then</code>

And the other option, with an inline function, is, in SLua:
- <code class="language-slua">if #(function() people = ll.GetAgentList( AGENT_LIST_PARCEL, {} ) return people end)() ~= 0 then</code>

In the function the table people is assigned in the same way, and its value is returned so it can be used in a expression. Since the function has no parameters, its' being called with " () ".

### Passing parameters to functions

In general, in programming languages, there are two ways of passing parameters to functions: by value or by reference.  
Passing by value means the function gets a copy of the original data. Changes made inside the function do not affect the original value outside.  
Passing by reference means the function receives a reference to the original data. Changes to that data do affect the original.  
In SLua (as in LSL) all the parameters, of any type, are passed by value, the contents of the original variables can't be changed.

For instance:
<pre class="language-slua"><code class="language-slua">function test( tab )
	tab = { "x", "y", "z" }
	print( tab[1] )  -- >   x
end
tabTest = { "a", "b", "c" }
test( tabTest )
print( tabTest[1] )  -- >   a</code></pre>

tabTest is unchanged by the modification in the function.

But some of the data types have a reference as value: table, function and thread (coroutines).  
The value of a variable passed as parameter to a function can't be changed. But the reference can be used to change its contents.

For instance:
<pre class="language-slua"><code class="language-slua">function test( tab )
	tab[1] = "x"
	print( tab[1] )  -- >   x
end
tabTest = { "a", "b", "c" }
test( tabTest )
print( tabTest[1] )  -- >   x</code></pre>

Which doesn't happen in LSL, where variables with lists contain the list instead of a reference to it.

We need to be careful when translating our LSL scripts to SLua, if any of them is modifying lists passed as parameters.
