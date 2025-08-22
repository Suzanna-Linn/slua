## Strings

Another thing that we can use is an alternative way to format strings.

For instance, if we have, in LSL:
	llOwnerSay( "Units: " + (string)units + "   Price: " + (string)price + "   Amount: " + (string)(units * price) );
	// for instance -->   Units: 10   Price: 1.25   Amount: 12.5

That in SLua is:
	ll.OwnerSay( "Units: " .. tostring(units) .. "   Price: " .. tostring(price) .. "   Amount: " .. tostring(units * price) );

We can write it also as:
	ll.OwnerSay( `Units: {units}    Price: {price}   Amount: {units * price}` ); 

We use backticks (ascii code 96) instead of double quotes. Inside we have text and, between { and }, variables or expressions.

The variables and expressions between { and } are evaluated and casted to string.

We can use anything that returns a value:
	ll.OwnerSay( `my name is {ll.GetDisplayName(ll.GetOwner())}` )  -- >   my name is SuzannaLinn

LIBRARY STRING

With other libraries, we will always use the Lua libraries instead of the LL functions. We will use the table library instead of the LL list functions, and the table math instead of the LL mathematical functions.

But it's not the same with the string library.

Let's see why, with this string:
	local s = "café"    -- it has é with accent

This is what happens:
	print(ll.StringLength(s))  -- 4
	print(#s)  -- 5
	print(string.len(s))  -- 5
	print(utf8.len(s))  -- 4

Because the string library only works with byte-length characters (ASCII codes from 0 to 127) and not with unicode characters.

the é with accent is a 2-byte unicode character, so it counts as 2 bytes for the length of the string.

The   utf8   in the last print command is another library. It works with unicode characters but it has very few and limited functions.

We will not look at the utf8 library, the LL string functions are much much better.

Why the string library doesn't work with unicode? Because this way the functions can run much faster, not needing to check for unicode characters.

So, if we are sure that our strings doesn't contain unicode, we will use the string library, otherwise we will use the LL string functions.

Let's look at the functions in the string library:

string.len(s) or #s : returns the number of characters in the string s (as the number of bytes, as we have seen).
	LL : ll.StringLength(s)

string.lower(s) : returns a lowercase version of the string.
	LL : ll.ToLower(s)

string.upper(s) : returns an uppercase version of the string.
	LL : ll.ToUpper(s)

string.find(s, pattern [, init [, plain]]) : searches for a pattern in the string and returns the start and end positions. If plain == true, the pattern is treated as a plain string (no pattern matching).Supports negative indices.
	LL : ll.SubStringIndex(s, sub), only with a substring, no pattern match, only returns the start position

string.sub(s, i [, j]) : returns the substring of s from position i to j (inclusive).
	LL : ll.GetSubString(s, i, j)

string.split(s, sep) : splits the string into parts using sep as the delimiter. Returns an array.
	LL : llParseString2List(s, [sep], [])

string.rep(s, n) : repeats the string s n times.
	local spaces24 = string.rep(" ", 24)  -- for instance, to get a string of white spaces

string.reverse(s) : returns the string reversed (characters in reverse order).

string.gsub(s, pattern, replacement [, n]) : returns a new string where occurrences of pattern are replaced by replacement.
Also returns the number of substitutions.

srring.gsub can also take a function as the replacement parameter:
	local input = "I have 2 apples and 5 bananas"
	local result, subs = string.gsub(input, "%d+", function(number)
		local n = tonumber(number)
		return tostring(n * 2)
	end)
	print(result, "Substitutions:", subs)  -- > I have 4 apples and 10 bananas    Substitutions:    2

string.format(fmt, ...) : formats a string with placeholders like in C's printf.

for instance:
	print(string.format("Hello, %s!", "Dufa"))            -- Hello, Dufa!
	print(string.format("Score: %d", 42))                  -- Score: 42
	print(string.format("Pi rounded: %.2f", 3.14159265))   -- Pi rounded: 3.14
	print(string.format("Padded number: %03d", 7))         -- Padded number: 007
	print(string.format("%s is %d years old.", "Dufa", 2)) -- Dufa is 2 years old.
	print(string.format("Progress: %.1f%%", 75.5))          -- Progress: 75.5%
	print(string.format("Coordinates: (%.2f, %.2f)", 12.3456, 78.9012))  -- Coordinates: (12.35, 78.90)
	print(string.format("Hex colors: #%02X%02X%02X", 255, 165, 0))       -- Hex colors: #FFA500

string.match(s, pattern [, init]) : finds the first match of the pattern in the string. Returns the matched part.
	local text = "My email is user@example.com"
	local email = string.match(text, "[%w%.%-]+@[%w%.%-]+%.%a+")
	print(email)  -- Output: user@example.com

string.match can return only the captured part, the parts of the pattern marked with parentheses.
	local s = "Price: $123.45"
	local dollars, cents = string.match(s, "%$(%d+)%.(%d+)")
	print(dollars, cents)  -- Output: 123  45

string.gmatch(s, pattern) : returns an iterator over all matches of the pattern in the string.
	for word in string.gmatch("one two three", "%w+") do
		print(word)
	end
	-- Output: one  two  three

The string library is the only library where we can use the : (colon) notation to call the methods on variables of type string.
