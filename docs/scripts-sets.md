## Class Set

A set is a collection of unique elements, and the elements are not ordered. Sets are useful for checking membership and for performing mathematical operations such as union, intersection, and difference. In this implementation, a set is represented internally as a table with the elements as keys and true as their values.

### Constructor

**Set(...)** or **Set:new(...)**  
Creates a new set from a list of elements or from a table.  
<code class="language-slua">local s1 = Set(1, 2, 3)</code>  
<code class="language-slua">local s2 = Set({"a", "b", "c"})</code>

### Methods

**Set:update(...): nil**  
Adds multiple elements to the set (from variadic arguments or from a table).  
<code class="language-slua">s:update(4, 5, 6)</code>  
<code class="language-slua">s:update({"x", "y"})</code>

**Set:add(element): nil**  
Adds a single element.  
<code class="language-slua">s:add("hello")</code>

**Set:remove(element): nil**  
Removes an element. Raises an error if it does not exist.  
<code class="language-slua">s:remove(3)</code>

**Set:discard(element): nil**  
Removes an element if present. Does nothing otherwise.  
<code class="language-slua">s:discard(42)</code>

**Set:has(element): boolean**  
Checks if an element exists.  
<code class="language-slua">print(s:has("x"))  -- > true/false</code>

**Set:len(): number**  
Returns the number of elements.  
<code class="language-slua">print(s:len())  -- > 3</code>

**Set:clear(): nil**  
Removes all elements.  
<code class="language-slua">s:clear()</code>

**Set:list(): {any}**  
Returns a list (array) of all elements.  
<code class="language-slua">local arr = s:list()</code>

**Set:copy(): Set**  
Returns a shallow copy of the set.  
<code class="language-slua">local s2 = s:copy()</code>

**Set:pop(): any | nil**  
Removes and returns an arbitrary element. Returns nil if empty.  
<code class="language-slua">local val = s:pop()</code>

**Set:isdisjoint(other: Set): boolean**  
Checks if two sets have no elements in common.  
<code class="language-slua">print(s1:isdisjoint(s2))</code>

### Operators

**A + B** (Union)  
All elements in A or B.

**A * B** (Intersection)  
Elements common to both A and B.

**A - B** (Difference)  
Elements in A but not in B.

**A ^ B** (Symmetric Difference)  
Elements in A or B, but not both.

**A == B**  
True if both sets contain exactly the same elements.

**A < B**  
True if A is a strict subset of B.

**A <= B**  
True if A is a subset of B (allowing equality).

**\#A**  
Returns the number of elements in the set. Equivalent to A:len().

##### Iteration  
We can iterate over a set directly with for ... in.  
<pre class="language-slua line-numbers"><code class="language-slua">for element in s do
	print(element)
end</code></pre>

##### String Representation  
**Set:__tostring()** produces a comma-separated list of elements:  
<code class="language-slua">print(Set(1, 2, 3))  -- > "1, 2, 3"</code>

### Examples 

<div class="script-box intermediate">
<h4>Using sets</h4>
<p>Examples of use</p>
<pre class="language-slua"><code class="language-slua">local function printSet(name, set)
	print(name .. " = {" .. tostring(set) .. "} (size: " .. #set .. ")")
end

-- Create some sets with funny elements
local fruits = Set({"apple", "banana", "kiwi", "banana"})  -- banana duplicate
local veggies = Set{"carrot", "broccoli", "kiwi"}          -- kiwi is a fruit, but let's pretend it's a veggie today
local mythical = Set{"unicorn", "dragon", "phoenix"}
local emptySet = Set{}

printSet("fruits", fruits)  -- > fruits = {apple, kiwi, banana} (size: 3) 
printSet("veggies", veggies)  -- > veggies = {broccoli, kiwi, carrot} (size: 3) 
printSet("mythical", mythical)  -- > mythical = {dragon, unicorn, phoenix} (size: 3) 
printSet("emptySet", emptySet)  -- > emptySet = {} (size: 0) 

-- Test add with silly element
fruits:add("durian")  -- the smelly king!
printSet("fruits after adding durian", fruits)
-- > fruits after adding durian = {apple, durian, kiwi, banana} (size: 4)

-- Remove something that exists
veggies:remove("broccoli")
printSet("veggies after removing broccoli", veggies)
-- > veggies after removing broccoli = {kiwi, carrot} (size: 2)

-- Discard something not present (should be safe)
veggies:discard("celery")
printSet("veggies after discarding celery (not present)", veggies)
-- >  veggies after discarding celery (not present) = {kiwi, carrot} (size: 2) 

-- Pop an element and announce it dramatically
local popped = mythical:pop()
print("Mythical set pop: " .. (popped or "nothing to pop, mythical beasts have fled!"))
-- > Mythical set pop: dragon 
printSet("mythical after pop", mythical)
-- > mythical after pop = {unicorn, phoenix} (size: 2)

-- Union: fruits and veggies
local market = fruits + veggies
printSet("market (fruits + veggies)", market)
-- > market (fruits + veggies) = {carrot, kiwi, apple, durian, banana} (size: 5) 

-- Intersection: fruits and veggies (kiwi is the traitor!)
local traitors = fruits * veggies
printSet("traitors (fruits * veggies)", traitors)
-- > traitors (fruits * veggies) = {kiwi} (size: 1) 

-- Difference: fruits without veggies (banish the veggies from fruit land!)
local pureFruit = fruits - veggies
printSet("pureFruit (fruits - veggies)", pureFruit)
-- > pureFruit (fruits - veggies) = {apple, durian, banana} (size: 3) 

-- Symmetric difference: mythical and fruits (mythical fruits?)
local weirdMix = mythical ^ fruits
printSet("weirdMix (mythical ^ fruits)", weirdMix)
-- > weirdMix (mythical ^ fruits) = {unicorn, kiwi, apple, phoenix, durian, banana} (size: 6)

-- Check if emptySet is disjoint with fruits (should be true, because empty)
print("emptySet is disjoint with fruits?", tostring(emptySet:isdisjoint(fruits)))
-- > emptySet is disjoint with fruits? true

-- Check subset relations (fruits <= market, veggies <= market)
print("fruits <= market?", tostring(fruits <= market))  -- > fruits <= market? true 
print("veggies <= market?", tostring(veggies <= market))  -- > veggies <= market? true 

-- Equality test (copy and equality)
local fruitsCopy = fruits:copy()
print("fruitsCopy equals fruits?", tostring(fruitsCopy == fruits))  -- > fruitsCopy equals fruits? true 

-- Try removing an element that doesn't exist to catch error
local status, err = pcall(function() veggies:remove("pizza") end)
print("Removing 'pizza' from veggies: ", status and "Succeeded?" or "Failed as expected!", err or "")
-- > Removing 'pizza' from veggies:  Failed as expected! Cannot remove pizza: element not found in the set 

-- Clear a set and check
mythical:clear()
printSet("mythical after clear", mythical)  -- > mythical after clear = {} (size: 0)
print("Length of mythical after clear:", #mythical)  -- > Length of mythical after clear: 0 

-- Update with a list and a set, chain style
fruits:update({"elderberry", "fig"})
fruits:update(Set{"grape", "honeydew"}:list())
printSet("fruits after updating with elderberry, fig, grape, honeydew", fruits)
-- > fruits after updating with elderberry, fig, grape, honeydew = {honeydew, grape, kiwi, fig, apple, elderberry, durian, banana} (size: 8) 

-- Test has() with a funny question
print("Do fruits have durian?", tostring(fruits:has("durian")))  -- > Do fruits have durian? true
print("Do fruits have pizza?", tostring(fruits:has("pizza")))  -- > Do fruits have pizza? false 

-- Test length consistency
print("Length of fruits:", #fruits)  -- > Length of fruits: 8
print("Length of veggies:", #veggies)  -- > Length of veggies: 2 
print("Length of emptySet:", #emptySet)  -- > Length of emptySet: 0
</code></pre>
</div>

### Script

<div class="script-box advanced">
<h4>Set</h4>
<p>A Set data structure, modeled after mathematical sets and similar to Python’s set type.</p>
<pre class="language-slua"><code class="language-slua">local Set = {}
Set.__index = Set

setmetatable(Set, {
	__call = function(t, ...)
		return Set:new(...)
	end,
	__iter = pairs,
})

function Set:new(...)
	local iset = if typeof(...) == "table" then ... else {...}
	local set = {}
	for index, element in ipairs(iset) do
		set[element] = true
	end
	local res = setmetatable({ _set = set }, Set)
	table.freeze(res)
	return res
end

function Set:update(...)
	local iset = if typeof(...) == "table" then ... else {...}
	for index, element in ipairs(iset) do
		self._set[element] = true
	end
end

function Set:add(element)
	self._set[element] = true
end

function Set:remove(element)
	assert(self._set[element],`Cannot remove {element}: element not found in the set`)
	self._set[element] = nil
end

function Set:discard(element)
	self._set[element] = nil
end

function Set:has(element)  -- contains
	return self._set[element] ~= nil
end

function Set:len()
	local count = 0
	for _ in self._set do
		count += 1
	end
	return count
end

function Set:clear()
	for element in self._set do
		self._set[element] = nil
	end
end

function Set:list()
	local res = {}
	for element in self._set do
		table.insert(res, element)
	end
	return res
end

function Set:copy()
	local copy = {}
	for element in self._set do
		table.insert(copy, element)
	end
	return Set(copy)
end

function Set:pop()
	local res = next(self._set)
	if res ~= nil then
		self._set[res] = nil
	end
	return res
end

function Set:isdisjoint(other)
	assert(getmetatable(other) == Set, "Parameter must be of type Set")
	for element in self._set do
		if other._set[element] then
			return false
		end
	end
	return true
end

function Set.__add(A, B)  -- union
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	local res = {}
	for element in pairs(A._set) do
		table.insert(res, element)
	end
	for element in pairs(B._set) do
		table.insert(res, element)
	end
	return Set(res)
end

function Set.__mul(A, B)  -- intersection
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	local res = {}
	for element in pairs(A._set) do
		if B._set[element] then
			table.insert(res, element)
		end
	end
	return Set(res)
end

function Set.__sub(A, B)  -- difference
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	local res = {}
	for element in pairs(A._set) do
		if not B._set[element] then
			table.insert(res, element)
		end
	end
	return Set(res)
end

function Set.__pow(A, B)  -- symetric difference
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	local res = {}
	for element in pairs(A._set) do
		if not B._set[element] then
			table.insert(res, element)
		end
	end
	for element in pairs(B._set) do
		if not A._set[element] then
			table.insert(res, element)
		end
	end
	return Set(res)
end

function Set.__eq(A, B)  -- equal
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	local res = {}
	for element in pairs(A._set) do
		if not B._set[element] then
			return false
		end
	end
	for element in pairs(B._set) do
		if not A._set[element] then
			return false
		end
	end
	return true
end

function Set.__lt(A, B)  -- subset
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	local res = {}
	for element in pairs(A._set) do
		if not B._set[element] then
			return false
		end
	end
	for element in pairs(B._set) do
		if not A._set[element] then
			return true
		end
	end
	return false
end

function Set.__le(A, B)     -- subset or equal
	assert(getmetatable(A) == Set and getmetatable(B) == Set, "Operators must be of type Set")
	for k in pairs(A._set) do
		if not B._set[k] then return false end
	end
	return true
end

function Set.__len(self)
	return self:len()
end

function Set:__iter()
	return pairs(self._set)
end

function Set:__tostring()
	local res = {}
	for element in pairs(self._set) do
		table.insert(res, tostring(element))
	end
	return table.concat(res,", ")
end</code></pre>
</div>
