## Operators

### Division

There are two division operators: / and //.

The / is the decimal division. The // is the integer division.

If in LSL we are dividing two integers, in Slua we use //, otherwise we use /.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// division (LSL)

integer total = 10;
integer people = 7;

llOwnerSay((string)(total / people));         // --> 1
llOwnerSay((string)((float)total / people));  // --> 1.428571</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- division (SLua)

local total = 10
local people = 7

ll.OwnerSay(tostring(total // people))  -- > 1
ll.OwnerSay(tostring(total / people))   -- > 1.4285714285714286</code></pre>
</td></tr></table>

### Exponentiation

In Lua, the ^ is the exponentiation operator.

We can use ^ instead of the function ll.Pow()

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// exponentiation (LSL)

integer base = 2;
integer exp = 3;

llOwnerSay((string)llPow(base,exp));  // --> 8.000000</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- exponentiation (SLua)

local base = 2;
local exp = 3;

ll.OwnerSay(tostring(base ^ exp))  -- > 8</code></pre>
</td></tr></table>

### Not equal

The unequality operator is ~= instead of !=.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// not equal (LSL)

if (llGetColor(ALL_SIDES) != <1,1,1>) {
    llOwnerSay("it isn't white");
}</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- not equal (SLua)

if ll.GetColor(ALL_SIDES) ~= vector(1,1,1) then
    ll.OwnerSay("it isn't white")
end</code></pre>
</td></tr></table>

### Increment / decrement

In Lua ++ and -- don't exist.

We need to add or subtract one.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// increment / decrement (LSL)

integer total = 0;
integer count = 10;

total++;
count--;</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- increment / decrement (SLua)

local total = 0
local count = 10

total += 1
count -= 1</code></pre>
</td></tr></table>

### Concatenation

The concatenation operator is .. instead of +.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// concatenation (LSL)

string greet1 = "hello";
string greet2 = "world";

llOwnerSay(greet1 + " " + greet2);  // --> hello world</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- concatenation (SLua)

local greet1 = "hello"
local greet2 = "world"

ll.OwnerSay(greet1.." "..greet2)  -- > hello world</code></pre>
</td></tr></table>

### And / Or / Not

The logical operators are "and", "or", "not" instead of &&, ||, !

In SLua "and" has higher precedence than "or". In LSL, && and || have the same precendence

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// logical operators (LSL)

integer isDone = FALSE;
integer value = 50;

if ( value < 0 || value > 25 && !isDone ) {
    // do something
}</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- logical operators (SLua)

local isDone = false
local value = 50

if (value < 0 or value > 25) and not isDone then  -- and has higher precedence than or
    -- do something
end</code></pre>
</td></tr></table>

In LSL both operators are always evaluated.
In SLua, the left operator is evaluated:
- with "and", if the left operator is false, the result is false, and the right operator is not evaluated
- with "or", if the left operator is true, the result is true, and the right operator is not evaluated
We can do:
- <code class="language-slua">if people > 0 and total / people > 10 then</code>
- If people is 0 the right operator ( total / people ) is not evaluated, and we don't divide by zero

We can use them as value selectors:
- <code class="language-slua">result = optionA and optionB</code>
  - same as <code class="language-slua">result = if option A then optionB else option A</code>
- <code class="language-slua">result = optionA or optionB</code>
  - same as <code class="language-slua">result = if option A then optionA else option B</code>

To set a default value in case that a variable is nil:
- <code class="language-slua">total = total or 0</code>
- except with boolean variables with a default value of true, in this case it must be:
  - <code class="language-slua">total = total ~= nil or true</code>

As a ternary operator:
- <code class="language-slua">text = count == 1 and "1 item" or count .. " items"</code>
  - same as <code class="language-slua">if count == 1 then "1 item" else count .. " items"</code>

To call a function on a condition:
- <code class="language-slua">isReady and start()</code>
  - same as <code class="language-slua">if isReady then start() end</code>

### Bitwise operations

The bitwise operators &, |, ~, ^, <<, >> don't exist in SLua.

We have the library bit32, with functions for bitwise operations:
-  & : bit32.band()
-  | : bit32.bor()
-  ~ : bit32.bnot()
-  ^ : bit32.bxor()
-  << : bit32.lshift()
-  >> : bit32.arshift()
band, bor and bnot can take any quantity of operators.

In LSL:
- <code class="language-lsl">if (change & (CHANGED_OWNER | CHANGED_INVENTORY | CHANGED_REGION )) {</code>
In SLua:
- <code class="language-slua">if bit32.band(change, bit32.bor(CHANGED_OWNER, CHANGED_INVENTORY, CHANGED_REGION)) ~= 0 then</code>
Or with bit32.btest() that does a bitwise and, returning true if the resulting value is not 0, or false if it is 0.
- <code class="language-slua">if bit32.btest(change, bit32.bor(CHANGED_OWNER, CHANGED_INVENTORY, CHANGED_REGION)) then</code>

### Integer division and modulo

LSL and SLua behaves different in the integer division and the modulo division when one, and only one, of the operands is negative.

The integer division in LSL:
	<code class="language-lsl">llOwnerSay((string)(-7 / 4));  // -->   -1</code>
	<code class="language-lsl">llOwnerSay((string)(7 / -4));  // -->   -1</code>

And in SLua:
	<code class="language-slua">print(-7 // 4)  -- >   -2</code>
	<code class="language-slua">print(7 // -4)  -- >   -2</code>

In LSL, integer division always truncates toward zero. This means that the result of dividing two integers is the whole number part of the result, with any fractional portion discarded, and the sign of the result follows the sign of the numerator.

In SLua, integer division using the // operator rounds down toward negative infinity. This is known as floor division. It always returns the largest integer less than or equal to the result of the division.

To simulate LSL behaviour we can use this:
	<code class="language-slua">function divLSL(a, b)
		return if a * b < 0 then math.ceil(a / b) else math.floor(a / b)
	end</code>

The modulo division in LSL:
	<code class="language-lsl">llOwnerSay((string)(-7 % 4));  // -->   -3</code>
	<code class="language-lsl">llOwnerSay((string)(7 % -4));  // -->   3</code>

And in SLua:
	<code class="language-slua">print(-7 % 4)  -- >   1</code>
	<code class="language-slua">print(7 % -4)  -- >   -1</code>

In LSL, the modulo operator (%) returns the remainder after division, and its result always carries the same sign as the numerator. This is known as truncating remainder, and it matches the way LSL performs integer division, both operations are consistent in that they truncate toward zero.

In SLua, the % operator performs true modulo, which means the result always has the same sign as the divisor. Lua defines this operation mathematically as the difference between the dividend and the product of the divisor and the floor of the division result. This ensures that the result is always non-negative if the divisor is positive, and always non-positive if the divisor is negative.

To simulate LSL behaviour we can use this:
	<code class="language-slua">function modLSL(a, b)
		return a % b - if a * b < 0 and a % b ~= 0 then b else 0
	end</code>
