## Extended tables

Xtable extends the functionality of standard SLua tables, providing a set of methods for array and dictionary manipulation using metatable capabilities to create a more versatile table object.

### Example of use

<div class="script-box intermediate">
<h4>Using extended tables</h4>
<p>an example of use, add the extended table code that is at the end of page</p>
<pre class="language-slua line-numbers"><code class="language-slua">
-- ===== COPY THE XTABLE CODE HERE =====

-- Create a new Xtable (works like a normal table)
local fruits = Xtable({"apple", "banana", "cherry"})
print("Fruits:", table.concat(fruits, ", "))

-- You can still use standard table functions,
-- but with Xtable you can call them as methods using ':' instead of 'table.'.

-- These two lines do the same thing:
table.insert(fruits, "pear")     -- regular Lua style
fruits:insert("pear")            -- method style (Xtable lets you do this)

print("After insert:", fruits:concat(", "))

-- You can also mix normal table functions with Xtable methods:
print("Length:", #fruits)                -- Standard length operator
print("Custom length:", fruits:len())    -- Using Xtable's len() method
print("Type:", fruits:type())            -- "array", "dictionary", or "mix"

-- Slice (like ll.List2List)
local sliced = fruits:slice(2, 3)
print("Slice (2–3):", sliced:concat(", "))

-- Map: apply a function to each element
local upper = fruits:map(string.upper)
print("Uppercase:", upper:concat(", "))

-- Filter: keep elements that match a condition
local longNames = fruits:filter(function(fruit)
	return #fruit > 5
end)
print("Long names:", longNames:concat(", "))

-- Detect: find the first that matches a condition
local found = fruits:detect(function(fruit)
	return fruit:sub(1,1) == "b"
end)
print("First fruit starting with 'b':", found)

-- Count: how many equal to something
print("Count 'apple':", fruits:count("apple"))

-- Unique: remove duplicates
local dupes = Xtable({"apple", "banana", "apple", "cherry"})
print("With duplicates:", dupes:concat(", "))
local unique = dupes:unique()
print("Unique:", unique:concat(", "))

-- Keys and Values (works for dictionaries)
local person = Xtable({name = "Alice", age = 25, city = "Paris"})
print("Keys:", person:keys():concat(", "))
print("Values:", person:values():concat(", "))

-- Update: add/replace values from another table
person:update({age = 26, country = "France"})
print("After update:")
for k, v in person do
	print(" ", k, v)
end

-- + Operator: concatenates arrays
local more = Xtable({"fig", "grape"})
local combined = fruits + more
print("Combined:", combined:concat(", "))

-- * Operator: merges dictionaries
local dict1 = Xtable({a = 1, b = 2})
local dict2 = Xtable({b = 3, c = 4})
local merged = dict1 * dict2
for k, v in merged do
	print("Merged", k, v)
end
</code></pre>
</div>

### Functions and operators

#### Creation and Introspection

**new(tab)**  
Creates a new Xtable instance from an existing table tab.  
- **Parameters:**
  - tab (table): The table to be wrapped by Xtable.
- **Returns:** A new Xtable instance.

**len()**  
Returns the number of elements in the table, considering both array and dictionary parts. It iterates through all key-value pairs to determine the count.  
- **Returns:** (number) The total number of elements.

**type()**  
Determines the type of the table based on its keys.  
- **Returns:** (string) One of the following:
  - "empty": If the table has no elements.
  - "array": If all keys are sequential integers starting from 1.
  - "dictionary": If there are no array elements.
  - "mix": If the table contains both array and dictionary-style keys.

#### Array Manipulation

**slice(from, to)**  
Extracts a portion of an array.  
Similar to ll.List2List(). Supports negative indices but not exclusion range.  
- **Parameters:**
  - from (number): The starting index.
  - to (number): The ending index.
- **Returns:** A new Xtable array containing the sliced elements.

**insertArray(ins, from)**  
Inserts the elements of one array into another at a specified position.  
Similar to ll.ListInsertList() but modifying the original table. Supports negative indices.  
- **Parameters:**
  - ins (table): The array to be inserted.
  - from (number): The index at which to insert the new elements.
- **Returns:** The modified original Xtable.

**replaceArray(rep, from, to)**  
Replaces a range of elements in an array with the elements of another array.  
Similar to ll.ListReplaceList() but modifying the original table. Supports negative indices but not exclusion range.  
- **Parameters:**
  - rep (table): The array of replacement elements.
  - from (number): The starting index of the range to replace.
  - to (number): The ending index of the range to replace.
- **Returns:** The modified original Xtable.

**removeArray(from, to)**  
Removes a range of elements from an array.  
Similar to ll.DeleteSubList() but modifying the original table. Supports negative indices but not exclusion range.
- **Parameters:**
  - from (number): The starting index of the range to remove.
  - to (number): The ending index of the range to remove.
- **Returns:** The modified original Xtable.

**reverse()**  
Reverses the order of the elements in the array part of the table in-place.  
- **Returns:** The modified original Xtable.

#### Functional Programming Methods

**map(func, ...)**  
Applies a function to each element of one or more arrays and returns a new Xtable with the results. The mapping continues until the shortest array is exhausted.  
- **Parameters:**
  - func (function): The function to apply to each element.
  - ...: Optional additional tables to be iterated over in parallel.
- **Returns:** A new Xtable array containing the results of the function applications.

**filter(func)**  
Creates a new Xtable with all elements that pass the test implemented by the provided function.  
- **Parameters:**
  - func (function): The function to test each element. Should return true to keep the element.
- **Returns:** A new Xtable array with the filtered elements.

**reject(func)**  
The opposite of filter. Creates a new Xtable with all elements that do not pass the test implemented by the provided function.  
- **Parameters:**
  - func (function): The function to test each element. Should return true to keep the element.
- **Returns:** A new Xtable array with the rejected elements.

**reduce(func, init)**  
Applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.  
- **Parameters:**
  - func (function): The function to execute on each value in the array.
  - init (any): Optional initial value for the accumulator. If not provided, the first element of the array is used.
- **Returns:** The single value that results from the reduction.

**each(func)**  
Executes a provided function once for each table element.  
- **Parameters:**
  - func (function): The function to execute for each element.

**detect(func)**  
Returns the first element in the table for which the provided function returns a truthy value.  
- **Parameters:**
  - func (function): The function to test each element.
- **Returns:** The first element that passes the test, or nil if no element passes.

**any(func)**  
Checks if at least one element in the table passes the test implemented by the provided function.  
- **Parameters:**
  - func (function): The function to test each element.
- **Returns:** (boolean) true if any element passes the test, otherwise false.

**all(func)**  
Checks if all elements in the table pass the test implemented by the provided function.  
- **Parameters:**
  - func (function): The function to test each element.
- **Returns:** (boolean) true if all elements pass the test, otherwise false.

**none(func)**  
Checks if no elements in the table pass the test implemented by the provided function.  
- **Parameters:**
  - func (function): The function to test each element.
- **Returns:** (boolean) true if no elements pass the test, otherwise false.

**count(funcOrValue)**  
Counts the number of elements that match a given value or satisfy a given function.  
- **Parameters:**
  - funcOrValue (function or any): A function to test each element or a value to compare against.
- **Returns:** (number) The number of matching elements.

#### Dictionary and Utility Methods

**keys()**  
Returns a new Xtable containing the keys of the table.  
- **Returns:** A new Xtable array with the keys.

**values()**  
Returns a new Xtable containing the values of the table.  
- **Returns:** A new Xtable array with the values.

**update(other)**  
Updates the table with the key-value pairs from another table, overwriting existing keys.  
- **Parameters:**
  - other (table): The table containing new key-value pairs.
- **Returns:** The modified original Xtable.

**unique()**  
Creates a new Xtable with the unique values from the table.  
- **Returns:** A new Xtable array with unique values.

**intersection(other)**  
Creates a new Xtable with the values that are present in both the original table and the other table.  
- **Parameters:**
  - other (table): The table to intersect with.
- **Returns:** A new Xtable array with the common values.

**difference(other)**  
Creates a new Xtable with the values from the original table that are not present in the other table.  
- **Parameters:**
  - other (table): The table to compare against.
- **Returns:** A new Xtable array with the values unique to the original table.

#### Operators

**__add (Concatenation)**  
The + operator concatenates two array tables or an array table and a single value.  
- **Returns:** A new Xtable array.

**__mul (Merging)**  
The * operator merges two dictionary tables. For duplicate keys, the value from the right-hand table is used.  
- **Returns:** A new Xtable dictionary.

### Script

<div class="script-box advanced">
<h4>Class Extended Table</h4>
<pre class="language-slua line-numbers"><code class="language-slua">-- Extended table (by Suzanna Linn, 2025-10-31)

local Xtable = {}

Xtable.__index = function(tab, key)
	return Xtable[key] or table[key]
end

setmetatable(Xtable, {
	__call = function(t, ...)
		return Xtable:new(...)
	end,
	__iter = pairs,
})

function Xtable:new(tab)
	return setmetatable(tab, Xtable)
end

function Xtable:len()
	local count = 0
	for _ in self do
		count += 1
	end
	return count
end

function Xtable:type()
	local arrayLen = #self
	local dictLen = self:len()
	return if dictLen == 0 then "empty"
		elseif arrayLen == dictLen then "array"
		elseif arrayLen == 0 then "dictionary"
		else "mix"
end

function Xtable:slice(from, to)
	from, to = if from < 0 then #self + from + 1 else from, if to < 0 then #self + to + 1 else to 
	return Xtable:new(table.move(self, from, to, 1, {}))
end

function Xtable:insertArray(ins, from)
	from = if from < 0 then #self + from + 1 else from
	table.move(ins, 1, #ins, from,
		table.move(self, from, #self, from + #ins)
	)
	return self
end

function Xtable:replaceArray(rep, from, to)
	from, to = if from < 0 then #self + from + 1 else from, if to < 0 then #self + to + 1 else to 
	table.move(rep, 1, #rep, from,
		table.move(
			table.move({}, 1, to - from + 1, #self - to + from,
				table.move(self, to + 1, #self, from)
			)
		, from, #self, from + #rep)
	)
	return self
end

function Xtable:removeArray(from, to)
	from, to = if from < 0 then #self + from + 1 else from, if to < 0 then #self + to + 1 else to 
	table.move({}, 1, to - from + 1, #self - to + from,
		table.move(self, to + 1, #self, from)
	)
	return self
end

function Xtable:reverse()
	local right = #self
	for left = 1, right // 2 do
		self[left], self[right] = self[right], self[left]
		right -= 1
	end
	return self
end

function Xtable:map(func, ...)
	local mapped = {}
	local tables = {self, ...}
	local elements = #tables[1]
	for iTable = 2, #tables do
		local len = #tables[iTable]
		if len < elements then
			elements = len
		end
	end
	for iElement = 1, elements do
		local element = {}
		for _, tab in tables do
			table.insert(element, tab[iElement])
		end
		table.insert(mapped, func(table.unpack(element)))
	end
	return Xtable:new(mapped)
end

function Xtable:filter(func)
	local filtered = {}
	for iElement = 1, #self do
		if func(self[iElement]) then
			table.insert(filtered, self[iElement])
		end
	end
	return Xtable:new(filtered)
end

function Xtable:reject(func)
	local rejected = {}
	for iElement = 1, #self do
		if func(self[iElement]) then
			table.insert(rejected, self[iElement])
		end
	end
	return Xtable:new(rejected)
end

function Xtable:reduce(func, init)
	local reduced = if init ~= nil then init else self[1]
	for iElement = if init ~= nil then 1 else 2, #self do
		reduced = func(reduced, self[iElement])
	end
	return reduced
end

function Xtable:each(func)
	for _, v in self do
		func(v)
	end
end

function Xtable:detect(func)
	for _, v in self do
		if func(v) then
			return v
		end
	end
	return nil
end

function Xtable:any(func)
	for _, v in self do
		if func(v) then
			return true
		end
	end
	return false
end

function Xtable:all(func)
	for _, v in self do
		if not func(v) then
			return false
		end
	end
	return true
end

function Xtable:none(func)
	for _, v in self do
		if func(v) then
			return false
		end
	end
	return true
end

function Xtable:count(funcOrValue)
	local count = 0
	if type(funcOrValue) == "function" then
		for _, v in self do
			if funcOrValue(v) then
				count += 1
			end
		end
	else
		for _, v in self do
			if v == funcOrValue then
				count += 1
			end
		end
	end
	return count
end

function Xtable:keys()
	local res = {}
	for k in self do
		table.insert(res, k)
	end
	return Xtable:new(res)
end

function Xtable:values()
	local res = {}
	for _, v in self do
		table.insert(res, v)
	end
	return Xtable:new(res)
end

function Xtable:update(other)
	for k, v in other do
		self[k] = v
	end
	return self
end

function Xtable:unique()
	local seen = {}
	local res = {}
	for _, v in self do
		if not seen[v] then
			table.insert(res, v)
			seen[v] = true
		end
	end
	return Xtable:new(res)
end

function Xtable:intersection(other)
	local res = {}
	local seen = {}
	for _, v in other do
		seen[v] = true
	end
	for _, v in self do
		if seen[v] then
			table.insert(res, v)
		end
	end
	return Xtable:new(res)
end

function Xtable:difference(other)
	local res = {}
	local seen = {}
	for _, v in other do
		seen[v] = true
	end
	for _, v in self do
		if not seen[v] then
			table.insert(res, v)
		end
	end
	return Xtable:new(res)
end

Xtable.__add = function(left, right)
	left, right = if type(left) == "table" then left else {left}, if type(right) == "table" then right else {right}
	return Xtable:new(table.move(right, 1, #right, #left + 1, table.move(left, 1, #left, 1, {})))
end

Xtable.__mul = function(left, right)
	local res = {}
	for k, v in left do
		res[k] = v
	end
	for k, v in right do
		res[k] = v
	end
	return Xtable:new(res)
end</code></pre>
</div>
