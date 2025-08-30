## Strings

### String interpolation

We can embed expressions directly within a string literal, enclosing the string in backticks and using curly braces {} to insert and evaluate expressions within the string.

For instance, in LSL:
- <code class="language-lsl">llOwnerSay( "Units: " + (string)units + "   Price: " + (string)price + "   Amount: " + (string)(units * price) );</code>

In SLua could be:
- <code class="language-slua">ll.OwnerSay( "Units: " .. tostring(units) .. "   Price: " .. tostring(price) .. "   Amount: " .. tostring(units * price) );</code>

Or we can use string interpolation, which is more concise and readable:
- <code class="language-slua">ll.OwnerSay( `Units: {units}    Price: {price}   Amount: {units * price}` ); </code>

We use backticks (ascii code 96) instead of double quotes. Inside we have text and, between { and }, variables or expressions.  
The variables and expressions between { and } are evaluated and casted to string. We can use anything that returns a value:
- <code class="language-slua">ll.OwnerSay( `my name is {ll.GetDisplayName(ll.GetOwner())}` )  -- >   my name is SuzannaLinn</code>

### String library

With other libraries, it's better to use the Lua libraries instead of the LL functions, using the table library instead of the LL list functions, and the table math instead of the LL mathematical functions.

But it's not the same with the string library, this is why:
<pre class="language-slua line-numbers"><code class="language-slua">-- string length (SLua)

local s = "café"    -- café has é with accent

print(ll.StringLength(s))  -- 4
print(#s)  -- 5
print(string.len(s))  -- 5
print(utf8.len(s))  -- 4</code></pre>

Because the string library only works with byte-length characters (ASCII codes from 0 to 127) and not with unicode characters.  
The é with accent is a 2-byte unicode character, so it counts as 2 bytes for the length of the string.

The utf8 in the last line is another library. It works with unicode characters but it has very few and limited functions. The LL string functions are much better than the utf8 library.

The string library doesn't work with unicode because this way the functions can run much faster, not needing to check for unicode characters.  
If the strings doesn't contain unicode the string library is faster, otherwise is better to use the LL string functions.

### String library functions

string.len(s) or #s : returns the number of characters in the string s (as the number of bytes).
- LL : ll.StringLength(s)

string.lower(s) : returns a lowercase version of the string.
- LL : ll.ToLower(s)

string.upper(s) : returns an uppercase version of the string.
- LL : ll.ToUpper(s)

string.find(s, pattern [, init [, plain]]) : searches for a pattern in the string and returns the start and end positions. If plain == true, the pattern is treated as a plain string (no pattern matching). Supports negative indices.
- LL : ll.SubStringIndex(s, sub), only with a substring, no pattern match, only returns the start position

string.sub(s, i [, j]) : returns the substring of s from position i to j (inclusive).
- LL : ll.GetSubString(s, i, j)

string.split(s, sep) : splits the string into parts using sep as the delimiter. Returns an array table.
- LL : llParseString2List(s, [sep], [])

string.rep(s, n) : repeats the string s n times:
- <code class="language-slua">local spaces24 = string.rep(" ", 24)  -- a string of 24 white spaces</code>

string.reverse(s) : returns the string reversed (characters in reverse order).

string.gsub(s, pattern, replacement [, n]) : returns a new string where occurrences of pattern are replaced by replacement.
Also returns the number of substitutions.

string.gsub can also take a function as the replacement parameter:
- <pre class="language-slua line-numbers"><code class="language-slua">-- string.gsub (SLua)
local input = "I have 2 apples and 5 bananas"
local result, subs = string.gsub(input, "%d+", function(number)
	local n = tonumber(number)
	return tostring(n * 2)
end)
print(result, "Substitutions:", subs)  -- > I have 4 apples and 10 bananas    Substitutions:    2</code></pre>

string.format(fmt, ...) : formats a string with placeholders.
- <pre class="language-slua line-numbers"><code class="language-slua">-- string.format (SLua)
print(string.format("Hello, %s!", "Dufa"))            -- Hello, Dufa!
print(string.format("Score: %d", 42))                  -- Score: 42
print(string.format("Pi rounded: %.2f", 3.14159265))   -- Pi rounded: 3.14
print(string.format("Padded number: %03d", 7))         -- Padded number: 007
print(string.format("%s is %d years old.", "Dufa", 2)) -- Dufa is 2 years old.
print(string.format("Progress: %.1f%%", 75.5))          -- Progress: 75.5%
print(string.format("Coordinates: (%.2f, %.2f)", 12.3456, 78.9012))  -- Coordinates: (12.35, 78.90)
print(string.format("Hex colors: #%02X%02X%02X", 255, 165, 0))       -- Hex colors: #FFA500</code></pre>

string.match(s, pattern [, init]) : finds the first match of the pattern in the string. Returns the matched part.
- <pre class="language-slua line-numbers"><code class="language-slua">-- string.match (SLua)
local text = "My email is user@example.com"
local email = string.match(text, "[%w%.%-]+@[%w%.%-]+%.%a+")
print(email)  -- Output: user@example.com</code></pre>
- string.match can return the captured part only, the parts of the pattern marked with parentheses.
  - <pre class="language-slua line-numbers"><code class="language-slua">-- string.match (SLua)
local s = "Price: $123.45"
local dollars, cents = string.match(s, "%$(%d+)%.(%d+)")
print(dollars, cents)  -- Output: 123  45</code></pre>

string.gmatch(s, pattern) : returns an iterator over all matches of the pattern in the string.
- <pre class="language-slua line-numbers"><code class="language-slua">-- string.gmatch (SLua)
for word in string.gmatch("one two three", "%w+") do
	print(word)
end
-- Output: one  two  three</code></pre>

The string library is the only library where we can use the : (colon) notation to call the methods on variables of type string.
- <pre class="language-slua line-numbers"><code class="language-slua">local s ="--<(Hello World)>--"
print(string.sub(s, 5, -5))  -- > Hello World
print(s:sub(5, -5))  -- > Hello World</code></pre>

### String interning

String interning is a memory-optimization technique to enhance efficiency by storing only one copy of each distinct string value.

Lua automatically interns all strings. When a new string is created, Lua computes a hash of the string and searches for it in a global table of all strings. If a matching string is found, a reference to the existing one is used. If not, a new string is created, stored in this central table, and then its reference is returned.

When two variables have the same string value, the string is only stored once and both variables have a reference to it.

It's especially useful when passing strings as parameters to functions. The string doesn't have to be copied, only the reference is, saving memory and time.

What makes this system work safely is that strings are immutable. Once a string is created, its contents can never be changed.  
Any operation that modifies a string, such as concatenation, does not alter the original string. Instead, it creates a completely new string, interns it, and the local variable is updated to reference this new string.  
The original string remains untouched and any other variables refering it are unaffected.
