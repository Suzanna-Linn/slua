## Enums

An enumeration is a special type that represents a set of named values. Instead of using raw numbers or strings in our code, we give meaningful names to those values. Code becomes clearer and self-documenting and enums enforce that only valid values are used.

**Enum(table)** or **Enum:new(table)**  
Creates a new enumeration from an array or a dictionary table
<pre class="language-slua"><code class="language-slua">local Colors = Enum { "Red", "Green", "Blue" }
print(Colors.Red)   -- > 1
print(Colors.Green) -- > 2</code></pre>

**Enum:nameOf(value): string**  
Looks up the name associated with a value in the enum.
<pre class="language-slua"><code class="language-slua">print(Colors:nameOf(2))   -- > "Green"
print(Colors(3))          -- > "Blue"   (shortcut without :nameOf)</code></pre>

### Examples
<div class="script-box beginner">
<h4>Using enums</h4>
<p>Examples of use</p>
<pre class="language-slua"><code class="language-slua">local SEASONS = Enum{ "WINTER", "SPRING", "SUMMER", "AUTUMN" }
print(SEASONS.AUTUMN)  -- > 4
local season = SEASONS.WINTER
print(SEASONS(season))  -- > WINTER

local POINTS = Enum{ NORTH = 0, EAST = 90, SOUTH = 180, WEST = 270 }
print(POINTS.WEST)  -- > 270
local point = POINTS.SOUTH
print(POINTS(point))  -- > SOUTH</code></pre>
</div>

### Script
<div class="script-box advanced">
<h4>Class Enum</h4>
<p>An enumeration data structure</p>
<pre class="language-slua line-numbers"><code class="language-slua">-- class Enum (by Suzanna Linn, 2025-09-14)

local Enum = {}
Enum.__index = Enum
Enum._reverse = setmetatable({}, { __mode = "k" })

setmetatable(Enum, {
	__call = function(t, ...)
		return Enum:new(...)
	end,
	__iter = pairs,
})

function Enum:new(init)
	assert(typeof(init) == "table", "Enum must be initialized with a table")
	local enum = table.clone(init)
	if #enum > 0 then
		for index, name in ipairs(init) do
			if index ~= name then
				assert(enum[name] == nil, `Duplicate enum name: {name} (values {enum[name]} and {index})`)
				enum[name] = index
				enum[index] = nil
			end
		end
	end
	local reverse = {}
	for name, value in pairs(enum) do
		assert(reverse[value] == nil, `Duplicate enum value: {value} (names {reverse[value]} and {name})`)
		reverse[value] = name
	end
	table.freeze(reverse)
	Enum._reverse[enum] = reverse
	enum = setmetatable(enum, Enum)
	table.freeze(enum)
	return enum
end

function Enum:nameOf(value)
	return tostring(Enum._reverse[self][value])
end

function Enum:__call(...)
	return self:nameOf(...)
end

Enum.__iter = pairs
</code></pre>
</div>
