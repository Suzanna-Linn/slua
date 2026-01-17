---
layout: default
title: Tables
slua_beta: true
---

## Tables

### Array tables

They are like the LSL lists, but starting with index 1 instead of 0.

Tables use { and } instead of [ and ]:
- <code class="language-slua">local myTab1 = {}    -- empty table</code>
  - like <code class="language-lsl">list myTab1 = [];</code>
- <code class="language-slua">local myTab = { "apples", "bananas", "oranges" }</code>
  - like <code class="language-lsl">list myTab = [ "apples", "bananas", "oranges" ];</code>

The operator # returns the length of an array table:
- <code class="language-slua">local length = #myTab</code>
  - like <code class="language-lsl">integer length = llGetListLength(myTab2);</code>

This also works, but is longer and slower:
- <code class="language-slua">local length = ll.GetListLength(myTab)</code>

To get a value in the table using [ and ] with the index number:
- <code class="language-slua">local value = myTab[2]    -- > bananas</code>
  - like <code class="language-lsl">string value = ll.List2String(myTab,1)    -- > bananas</code>
 
The functions ll.List2*** also work, but it's better to access the table in the SLua way.
 
To modify a value is also using [ and ] with the index number:
- <code class="language-slua">myTab[3] = "kiwis"</code>

There is no operator + for tables. To add an element to the end of a table we can get the length of the table and add the next one:
- <code class="language-slua">myTab[ #myTab + 1 ] = "melons"</code>
  - like <code class="language-lsl">myTab = myTab + "melons";</code>

Or with a function in the library table:
- <code class="language-slua">table.insert( tabFruits, "Pear" )</code>

The function table.insert(), unlike ll.ListInsertList(), doesn't return a value. It modifies the table that we have sent as parameter. We don't assign the return value to the table.

To insert at the start we use the same function but with 3 parameters. Now the second parameter is the index before which the element will be inserted.:
- <code class="language-slua">table.insert( tabFruits, 1, "Lemon" )</code>

Or anywhere in the table, the index in the second parameter must be between 1 and #table:
- <code class="language-slua">table.insert( tabFruits, 3, "Lemon" )</code>

If we use an index out of the range, the value will be inserted with this index, but all the index values in between will not exist. It will not be an array table and the functions for array tables and the operator # will not work.

To remove the last element in an array table:
- <code class="language-slua">table.remove( tabFruits )</code>

table.remove(), unlike ll.DeleteSubList(), modifies the table and doesn't return the table. It returns the value of the removed key.
 
To remove any element in the table we have the same function with a second paramenter, the index of the element:
- <code class="language-slua">table.remove( tabFruits, 3 )</code>

To add one table to another:
- <code class="language-slua">table.move( tabExoticFruits, 1, #tabExoticFruits, #tabFruits + 1, tabFruits )</code>
  - like <code class="language-lsl">tabFruits = tabFruits + tabExoticFruits</code>

In this example table.move() copies the first table (tabExoticFruits) from the index 1 to the index #tabExoticFruits (from start to end), into the second table (tabFruits) starting at #tabFruits + 1 (at the end).

table.move() copies or moves a range of elements from one part of an array table to another part or into a different array table. It returns the modified table. It's more efficient that copying with a loop and It handles overlapping ranges correctly.

The parameters of table.move() are:
- table to be copied
- copy from index (1, from start)
- copy to index (#table, to the end)
- index where to insert the copied table (#table + 1, to add after; 1, to add before)
- table to be copied to (optional, if omitted it copies to the same table)

Another example with table.move:
- <code class="language-slua">local newTab = table.move(myTab, 4, 6, 1, {})</code>
  - like <code class="language-lsl">list newList = llList2List( myTab, 3, 5 )</code>

Use of table.move() to copy two tables into another one:
- <code class="language-slua">local myTab3 = table.move(myTab2, 1, #myTab2, #myTab1 + 1, table.move(myTab1, 1, #myTab1, 1, {}))</code>
  - like <code class="language-lsl">list myList3 = myList1 + myList2</code>

To make a string with the elements of the table:
- <code class="language-slua">local myStr = table.concat( tabFruits, ", " )</code>
  - like <code class="language-lsl">string myStr = llDumpList2String( tabFruits, ", " )</code>
 
But table.concat() only works with the types number and string. Any other type (boolean or any SLua type) throws an error.

To get the largest positive numerical key in the table (array or dictionary):
- <code class="language-slua">local maxNumKey = table.maxn()</code>

To create a pre-filled array table, optionally filling it with a default value:
- <code class="language-slua">local myTotals = table.create( 10, 0 )  -- array from 1 to 10, initialized at 0</code>

It's used for performance and memory optimization when creating large arrays and to initialize to some value.

To assign the elements in a table to several variables:
- <code class="language-slua">local name, descr, pos, rot = unpack(ll.GetObjectDetails(id, { OBJECT_NAME, OBJECT_DESC, OBJECT_POS, OBJECT_ROT }))</code>

unpack() converts the elements in an array to a series of single values that are assigned to the variables in the same order.

Tables in SLua are much more efficient than lists in LSL. Tables are a core feature of Lua and they are used everywhere for many things. Tables are very optimized by the compiler.  
It's better to stop using the LL lists functions and use the tables in Lua style.

### Dictionary tables

They are pairs of key-value, like the linkset data.

To create a dictionary table:
- <code class="language-slua">local tabFruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }</code>

Instead of a list of values, we use keys (the name of the fruit) and values (the quantity of each fruit).

To add a new pair of key value:
- <code class="language-slua">tabFruitsQuantity["Melon"] = 5</code>

Or, only when the key would be a valid identifier:
- <code class="language-slua">tabFruitsQuantity.Melon = 5</code>

Using one format or the other is a matter of preference, internally both are the same.

To modify a value is also assigning a value to it, replacing the previous value.

To get a value from the table:
- <code class="language-slua">ll.OwnerSay( tabFruitsQuantity["Melon"] )  -- >  5</code>

Or:
- <code class="language-slua">ll.OwnerSay( tabFruitsQuantity.Melon  )  -- >  5</code>

If the key doesn't exist it returns a value of nil:
- <code class="language-slua">ll.OwnerSay( tabFruitsQuantity["Pumpkin"] )  -- >  nil</code>

To remove a pair of key value:
- <code class="language-slua">tabFruitsQuantity["Cherry"] = nil</code>

The key is removed (it's not set to nil) and the memory is cleaned up.

Array tables are a special case of dictionary tables, where the keys are consecutive numbers starting with 1.

All values, in array tables and in dictionary tables, can be anything, including another table. Tables in  tables can also have other tables as values, to make lists of lists of lists...

The operator # only works with array tables, not with dictionary tables.

To know if a dictionary table is empty:
- <code class="language-slua">next( myTab ) == nil</code>

### Copying tables

In this example:
<pre class="language-slua"><code class="language-slua">local tab1 = { 10, 20, 30 }
local tab2 = {}

tab2 = tab1
tab1[2] = 15  -- changing a value in tab1

ll.OwnerSay(tostring(tab1[2]))  -- > 15  -- ok
ll.OwnerSay(tostring(tab2[2]))  -- > 15  -- tab2 is also changed!</code></pre>

Tables can be a big thing. They are not stored in the variables. Variables store a reference to the table.

tab2 = tab1 copies the reference to the table, not the table itself. Both variables have the same reference to the only one table.

We can make a copy of a table, with the table.clone function:
- <code class="language-slua">tab2 = table.clone( tab1 )</code>

Now there are two different tables (with the same values), each one with its reference.

It makes a "shallow" copy, only the elements in the first level of the table are copied. If an element is a table, this "sub-table" is not copied, and the new table has the same reference to the "sub-table".

It's useful in functions that receive tables as parameters, when we want to modify the table in the function, but not the original table outside the function. For instance, when translating LSL code, where the functions always receive a copy of the lists passed as parameters:
- <code class="language-slua">paramTab = table.clone(paramTab)</code>

table.clone() can be used to add two tables into another one:
- <code class="language-slua">local myTab3 = table.move(myTab2, 1, #myTab2, #myTab1 + 1, table.clone(table1))</code>

### Comparing tables

In SLua myTab1 == myTab2 doesn't compare the elements of the tables, it compares the references of the tables. If myTab1 and myTab2 have a reference to the same table the comparison is true, otherwise is false.
<pre class="language-slua"><code class="language-slua">-- Comparing tables (SLua)

local table1 = { 10, 20, 30 }
local table2 = { 10, 20, 30 }
print( table1 == table2 )  -- >  false

local table3 = { 10, 20, 30 }
local table4 = table3
print( table3 == table4 )  -- >  true</code></pre>

In LSL myList1 == myList2 doesn't compare the elements of the lists neither, it compares the length of the lists.

The LSL <code class="language-lsl">myList1 == myList2</code> in SLua is:
- <code class="language-slua">#myTab1 == #myTab2</code>

And the LSL <code class="language-lsl">myTab == []</code> to check if the list is empty is:
- <code class="language-slua">#myTab == 0</code>

Comparing with not equal is a bit more tricky, in LSL <code class="language-lsl">if ( list1 != list2 ) {</code>   returns the difference of length:
- to get a boolean result:
  - <code class="language-slua">if #table1 ~= #table2 then</code>
- to get a number with the difference:
  - <code class="language-slua">local diff = #table1 - #table2</code>
 
And the LSL alternative to llGetListLength(), <code class="language-lsl">integer len = list1 != [];</code>, is just:
- <code class="language-slua">local len = #table1</code>

### Sorting tables

As a example let's use a table of farm animals and their products:
<pre class="language-slua"><code class="language-slua">local farmAnimals = {
	Cow = "Milk",
	Chicken = "Eggs",
	Sheep = "Wool",
	Pig = "Meat",
	Goat = "Milk",
	Duck = "Eggs",
	Horse = "Labor",
}
  
for animal, product in pairs(farmAnimals) do
	ll.OwnerSay(animal .. " -> " .. product)
end

--[[
result:

Chicken -> Eggs
Pig -> Meat
Duck -> Eggs
Sheep -> Wool
Goat -> Milk
Horse -> Labor
Cow -> Milk
]]</code></pre>

Dictionary tables don't have a defined order, their keys can appear in any order when looping on them.

Dictionary tables can't be sorted, only array tables can. The solution is to make an array table with the keys in the dictionary, the names of the animals, and to sort this array table.

The array table with the animals:
<pre class="language-slua"><code class="language-slua">local sortedAnimals = {}

for animal in pairs(farmAnimals) do
	table.insert(sortedAnimals, animal)
end</code></pre>

And sorting the table:
<pre class="language-slua"><code class="language-slua">table.sort(sortedAnimals)

for _, animal in ipairs(sortedAnimals) do
	ll.OwnerSay(animal .. " -> " .. farmAnimals[animal])
end

--[[
result:

Chicken -> Eggs
Cow -> Milk
Duck -> Eggs
Goat -> Milk
Horse -> Labor
Pig -> Meat
Sheep -> Wool
]]</code></pre>

The result is the table sortedAnimals with the keys of the table farmAnimals sorted in alphabetical ascending order. This is the default order of table.sort(). But it can sort in any order, for instance, by product and then by animal.

table.sort() has a second parameter, a function, that will be called and passed two parameters (let's call them "a" and "b") which are two elements in the array list.  
The function has to return a boolean value, true if a goes before b, false if b before goes a. Since this function is only used in table.sort(), it can be defined as an inline, unnamed function:
<pre class="language-slua"><code class="language-slua">table.sort(sortedAnimals, function(a, b)
  if farmAnimals[a] == farmAnimals[b] then  -- comparing products
  	return a < b  -- if products are equal, sorting by name
  else
  	return farmAnimals[a] < farmAnimals[b]  -- sorting by product
  end
end)

for _, animal in ipairs(sortedAnimals) do
	ll.OwnerSay(farmAnimals[animal] .. " <- " .. animal)
end

--[[
result:

Eggs <- Chicken
Eggs <- Duck
Labor <- Horse
Meat <- Pig
Milk <- Cow
Milk <- Goat
Wool <- Sheep
]]</code></pre>

### Sparse array tables

The operator # and the library functions for array tables work perfectly if the table is an array with consecutive indexes starting with 1. But if there are missing values (nils) in the array their behaviour is sometimes surprising.

As example, this table x, a sparse array missing the indexes 3, 5, 7, 11, 14 and 15.
<pre class="language-slua"><code class="language-slua">x = {}
for _, v in { 1, 2, 4, 6, 8, 9, 10, 12, 13, 16 } do
	x[v] = 1
end</code></pre>

Let's try different things with the table x.

<pre class="language-slua"><code class="language-slua">print(#x)  -- > 16
print(ll.GetListLength(x))  -- > 16</code></pre>
It looks well with #. The LL function returns the same.

<pre class="language-slua"><code class="language-slua">for index, value in ipairs(x) do
	print(index, value)
end
-- > 1 1
-- > 2 1</code></pre>
It only prints two pairs of key-values. ipairs() stops at the first nil at index 3.

<pre class="language-slua"><code class="language-slua">x[4] = "hello"
print(table.find(x, "hello"))  -- > nil</code></pre>
It doesn't find the hello. table.find(), like ipairs(), stops at the first nil at index 3.

<pre class="language-slua"><code class="language-slua">table.insert(x, "bye")
print(x[17])  -- > bye</code></pre>
table.insert() always inserts at #t+1.

<pre class="language-slua"><code class="language-slua">print(#x)  -- > 13
print(ll.GetListLength(x))  -- > 13</code></pre>
After inserting the element 17, now the length is 13.  
We can only trust that #t always exist and #t+1 never exists (always nil)

<pre class="language-slua"><code class="language-slua">table.remove(x, 17)
print(x[17])  -- > bye</code></pre>
Removing the element 17, but the element is still there. table.remove() only removes from 1 to #t and ignores calls with other indexes.  
If the element is from 1 to #t, it is deleted and the elements after it until #t are moved one index down. But the elements after #t are not moved.

### Memory allocation for tables

- The memory for tables is allocated dynamically and optimized for speed.
- Tables start with zero memory allocated. As elements are added, SLua allocates memory in chunks sized as powers of two (e.g., 4, 8, 16).
- The array part of the table (consecutive integer indexes starting with 1) only stores TValue (16 bytes per element). We can use table.create() to preallocate its exact size.
- Adding elements to an array with table.move() allocates for the exact size needed but keeps the current allocation if it is bigger than needed.
- The array part grows to the next multiple of 128 when it exceeds 128 elements, instead of growing to the next power of two.
- The dictionary part of the table stores TKey and TValue (32 bytes per element). There is no way to avoid allocation to the next power of two.
- Each part of the table has its own allocation space.
- The allocation never shrinks, only grows.
- To free memory from an array table after removing elements or clearing unused allocated space, we can use table.shrink().
- In dictionary tables, the only way to free memory after removing elements is to copy the remaining elements to a new table. There is no way to free the unused allocated space.

Array with 32 elements:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()
for i = 1, 32 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 512 (32*16)</code></pre>

With 33 elements allocates memory for 64:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()
for i = 1, 33 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 1024 (64*16)</code></pre>

We can use table.create() to allocate 33:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()
tab = table.create(33)
for i = 1, 33 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 528 (33*16)</code></pre>

Adding 3 elements to an array of 15 with table.move() allocates for 18:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local tabmove = { 101, 102, 103 }
local before = ll.GetUsedMemory()

for i = 1, 15 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 256 (16*16)

table.move( tabmove, 1 ,3 , #tab + 1, tab)
print(ll.GetUsedMemory() - before)  -- > 288 (18*16)</code></pre>

Dictionaries use 32 bytes for element, with 100 elements allocates memory for 128, no way to allocate only for 100:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()
for i = 10, 1000, 10 do tab[i] = i end
print(ll.GetUsedMemory() - before)  -- > 4096 (128*32)</code></pre>

Arrays and dictionaries use different allocations, a dictionary of 33 elements allocates for 64 (of 32 bytes), an array of 17 elements allocates for 32 (of 16 bytes):
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()

for i = 1010, 1330, 10 do tab[i] = i end
print(ll.GetUsedMemory() - before)  -- > 2048 (64*32)

for i = 1, 17 do tab[i] = i end
print(ll.GetUsedMemory() - before)  -- > 2560 (+512, 32*16)</code></pre>

Arrays with more than 128 elements allocate to the next multiple of 128:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()

for i = 1, 1024 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 16384 (1024*16)

table.insert(tab, 1025)
print(ll.GetUsedMemory() - before)  -- > 18432 (+2048, 128*16)</code></pre>

Dictionaries always allocate to the next power of 2:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()

for i = 100010, 110240, 10 do tab[i] = i end
print(ll.GetUsedMemory() - before)  -- > 32768 (1024*32)

tab[110250] = 110250
print(ll.GetUsedMemory() - before)  -- > 65536 (+32768, 1024*32)</code></pre>

For arrays, <code class="language-sluab">table.shrink(tab)</code> frees the unused allocated space:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()

for i = 1, 10 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 256 (16*16)

for i = 2, 9 do tab[i] = nil end  -- now the table has only indexes 1 and 10

-- the table still uses ten indexes, 8 of them with nil
table.shrink(tab)
print(#tab)  -- > 10
print(ll.GetUsedMemory() - before)  -- > 160 (10*16)</code></pre>

For sparse arrays, table.shrink() has a second optional parameter, "reorder", that is false by default.
With reorder set to true, <code class="language-sluab">table.shrink(tab, true)</code> can move keys from the sparse array to the dictionary part if it saves memory:
<pre class="language-sluab"><code class="language-sluab">local tab = {}
local before = ll.GetUsedMemory()

for i = 1, 10 do table.insert(tab, i) end
print(ll.GetUsedMemory() - before)  -- > 256 (16*16)

for i = 2, 9 do tab[i] = nil end  -- now the table has only indexes 1 and 10

-- with reorder index 10 is moved to the dictionary part of the table
table.shrink(tab, true)
print(#tab)  -- > 1
print(ll.GetUsedMemory() - before)  -- > 48 (16+32)</code></pre>
