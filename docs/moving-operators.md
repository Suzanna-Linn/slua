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


### Bitwise operations


### The operator #
