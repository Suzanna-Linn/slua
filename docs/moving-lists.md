## Tables

We don't have lists, now we have tables.

There are two types of tables: array tables and dictionary tables.

array tables are the ones that we use instead of lists. We will use them today, in a next class we will study dictionary tables.

Tables use { and } instead of [ and ]:
	local myTab1 = {}    -- empty table, like   list myTab1 = [];
	local myTab = { "apples", "bananas", "oranges" }  --  like   list myTab = [ "apples", "bananas", "oranges" ];

The operator # returns the length of a dictionary table:
	local  length = #myTab    -- like   integer length = llGetListLength(myTab2);

This is the same, but longer and slower:
	local  length = ll.GetListLength(myTab)

We can get a value in the table using [ and ] with the index number:
	local value = myTab[2]

But, big but!, array tables start with index 1 and LSL lists start with index 0.

So, this is the same:
	local value = myTab[2]    -- > bananas
	local value = ll.List2String(myTab,1)    -- > bananas

There is no operator + for tables. To add an element to the end of a table is:
	myTab[ #myTab + 1 ] = "melons"    -- like:   myTab = myTab + "melons";

#myTab, the lengh of the table, is 3. We add the index 4, because it starts with index 1.


There are two types of tables:
	array tables: They are like the LSL lists, but starting with index 1 instead of 0. We used them in the practice last week.
	dictionary tables: They are pairs of key-value, like the linkset data.

Each type has its own syntax to create and modify, and its own functions.

Let's start with the array tables.

To create an empty table:
	local myTab = {}

And a table with values:
	local tabFruits = { "Apple", "Banana", "Cherry", "Orange" }

It's the same than LSL lists, but using {} instead of [].

To get the number of elements, the length, of the table, we have the operator #:
	ll.OwnerSay( "We have " .. tostring(#tabFruits) .. " fruits)

We can use # instead of ll.GetListLength().

# also returns the length of a string:
	myStr = "Hello world"
	ll.OwnerSay( tostring( #myStr ) )  -- > 11

But # does NOT work with dictionary tables.

To get an element from the table we use [ and ] with the index of the element, starting with 1:
	ll.OwnerSay( tabFruits[2] )  -- > Banana

It's the same than:
	ll.OwnerSay( ll.List2String( tabFruits, 1 ) )  -- > Banana

But will not use the functions ll.List2***, it's better to access the table in the Lua way.

To modify an element from the table, instead of using ll.ListReplaceList():
	tabFruits[2] =  "Melon"
	ll.OwnerSay( tabFruits[2] )  -- > Melon

We haven't got a + operator for tables in SLua. We can NOT do   myList = myList + newElement.


Now we will study several functions that are in the library table.

In the same way that the library ll has the LL functions, the library table has the table functions.

To add an element to the end of an array table, we can get the length of the table and add the next one:
	tabFruits[ #tabFruits + 1 ] = "Pear"

Or also with a function in the library table:
	table.insert( tabFruits, "Pear" )

The function table.insert, unlike ll.ListInsertList, doesn't return a value. It modifies the table that we have sent as parameter. We don't assign a return value to the table.

To insert at the start we use the same function but with 3 parameters. Now the second parameter is the index before which the element will be inserted.:
	table.insert( tabFruits, 1, "Lemon" )

Or anywhere in the table, the index in the second parameter must be between 1 and #table:
	table.insert( tabFruits, 3, "Lemon" )

If we use an index out of the range, the value will be inserted with this index, but all the index values in between will not exist. It will not be an array table and the functions for array tables and the operator # will not work.

To remove the last element in an array table:
	table.remove( tabFruits )

Again, table.remove, unlike llDeleteSubList, modifies the table and doesn't return the table.

To remove any element in the table we have the same function with a second paramenter, the index of the element:
	table.remove( tabFruits, 3 )

To add one table to another, like   tabFruits = tabFruits + tabExoticFruits, we have:
	table.move( tabExoticFruits, 1, #tabExoticFruits, #tabFruits + 1, tabFruits )

In this example table.move copies the first table (tabExoticFruits) from the index 1 to the index #tabExoticFruits (from start to end), into the second table (tabFruits) starting at #tabFruits + 1 (at the end).

The parameters are:
	- table to be copied
	- copy from index (1, from start)
	- copy to index (#table, to the end)
	- index where to insert the copied table (#table + 1, to add after; 0, to add before)
	- table to be copied to

Again, it doesn't return a table, it modifies the table in the 5th parameter.

Another example with table.move:
	local newTab = ll.List2List( myTab, 3, 5 )
is:
	local newTab = {}
	table.move(myTab, 4, 6, 1, newTab)

To make a string with the element of the table, like ll.DumpList2String(), we have:
	myStr = table.concat( tabFruits, ", " )

Tables in SLua are much more efficient than lists in LSL. Tables are a core feature of Lua and they used everywhere for many things. Tables are very optimized by the compiler.

We will stop using the LL functions for lists and we will use the tables in Lua style.

Now let's look at the dictionary tables, with pairs of keys and values:

To create a dictionary table:
	tabFruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }

Instead of a list of values, we use keys (the name of the fruit) and values (the quantity of each fruit).

We add a new pair of key value with:
	tabFruitsQuantity["Melon"] = 5

Or with:
	tabFruitsQuantity.Melon = 5

You can use the one that you prefer.

To get a value from the table we use the key:
	ll.OwnerSay( tabFruitsQuantity["Melon"] )  -- >  5
or
	ll.OwnerSay( tabFruitsQuantity.Melon  )  -- >  5

If the key doesn't exist we will get a value of nil:
	ll.OwnerSay( tabFruitsQuantity["Pumpkin"] )  -- >  nil

To remove a pair of key value we set the key to nil:
	tabFruitsQuantity["Cherry"] = nil
The key is removed (it's not set to nil) and the memory is cleaned up.

Array tables are a special case of dictionary tables, where the keys are correlative numbers starting with 1.

All the values, in array tables and in dictionary tables, can be anything, including another table.

And the tables in the tables can also have other tables as values, to make lists of lists of lists...


Let's look at an example. Open the "script test 1 LSL".

We make a list (lst1), make a copy of this list (lst2), modify lst1 and, obviously, lst1 is modified and lst2 is not. As it must be.

Now let's look at the same example in SLua. Open the "script test 1 SLua".

We do the same, change tab1, and it happens that tab1 is changed (OK) and tab2 is also changed (WTF?!).

To understand what happens, let's look at an example of this behaviour in LSL. Open the "script test 2 LSL".

Here we are doing the same with the lists.

And something similar with the object where the script is in.

We have obj1 with the key of this object, and obj2 empty. And we set the object description to "original description".

We copy obj1 to obj2. And we change the description to "new" description.

Of course, either with obj1 or with obj2 we get the same changed description.

We know well that the variables have the uuid of the object, not the object itself. And that with   obj2 = obj1  we are copying this uuid, not making a new copy of the full object.

And this is what happens with tables in SLua.

Tables can be a big thing. They are not stored in the variables.

We can see tables as "objects" that are "rezzed" in the script memory and that have an "uuid", a reference to the table. This reference is what is stored in the variables.

With   tab2 = tab1  we are copying the reference to the table, not the table. Both variables have the same "uuid" to the only one "object" table.

We can make a copy of a table, with the table.clone function:
	tab2 = table.clone( tab1 )

Now we have two different tables (with the same values), each one with its reference.

It makes a "shallow" copy, only the elements in the first level of the table are copied. If an element is a table, this "sub-table" is not copied, and the new table has the same reference to the "sub-table".


Now let's look at comparing tables.

In LSL   myList1 == myList2   doesn't compare the elements of the lists, it compares the length of the lists.

In SLua   myTab1 == myTab2 doesn't compare the elements of the tables neither, but it compares the references of the tables.

If myTab1 and myTab2 have the same reference to the same "object" table the comparison is true, otherwise is false.

The LSL   myList1 == myList2   translates to the SLua:
	#myTab1 == #myTab2

And the LSL   myTab == []  to check if the list is empty to the SLua:
	#myTab == 0

But the operator # only works with array tables, not with dictionary tables.

To know if a dictionary table is empty is:
	next( myTab ) == nil


Let's see how to get it sorted.

As a example we will use a table of farm animals and their products:
local farmAnimals = {
    Cow = "Milk",
    Chicken = "Eggs",
    Sheep = "Wool",
    Pig = "Meat",
    Goat = "Milk",
    Duck = "Eggs",
    Horse = "Labor",
}

With:
	for animal, product in pairs(farmAnimals) do
	ll.OwnerSay(animal .. " => " .. product)
end

We could get, for instance:
Cow => Milk
Pig => Meat
Chicken => Eggs
Duck => Eggs
Goat => Milk
Horse => Labor
Sheep => Wool

Dictionary tables can't be sorted, only array tables can. So we will make an array table with the keys in the dictionary, the names of the animals, and we will sort this array table.

First the array table with the animals:
local sortedAnimals = {}
for animal in pairs(farmAnimals) do
	table.insert(sortedAnimals, animal)
end

Then sorting the table:
	table.sort(sortedAnimals)

And we have got them in alphabetical ascending order, with:
for _, animal in ipairs(sortedAnimals) do
	ll.OwnerSay(animal .. " => " .. farmAnimals[animal])
end

Like this:
Chicken => Eggs
Cow => Milk
Duck => Eggs
Goat => Milk
Horse => Labor
Pig => Meat
Sheep => Wool

We have a table sortedAnimals with the keys of the table farmAnimals sorted in alphabetical ascending order.

This is the default order of   table.sort   . But we can sort in any order than we want. For instance, by product and then by animal.

table.sort()   has a second parameter, which is a... function. This is something that doesn't exist in LSL, we can't send a function as parameter. But Lua is much more flexible.

table.sort()   will call our function with two parameters (let's call them "a" and "b"), which are two elements in the array list. We have to return a boolean value, true if we want a before b, false if we want b before a.

Since we will only use this function in   table.sort()   we define them as an inline, unnamed function:
table.sort(sortedAnimals, function(a, b)
if farmAnimals[a] == farmAnimals[b] then  -- comparing products
	return a < b  -- if products are equal, sorting by name
else
	return farmAnimals[a] < farmAnimals[b]  -- sorting by product
end
end)

Saying them:
for _, animal in sortedAnimals do
	ll.OwnerSay(animal .. " => " .. farmAnimals[animal])
end

We get:
Eggs <= Chicken
Eggs <= Duck
Labor <= Horse
Meat <= Pig
Milk <= Cow
Milk <= Goat
Wool <= Sheep

Have you seen anything different in this last for?

Where is ipairs()?

We studied that the loop for needs ipairs() to read an arrray table and pairs() to read a dictionary table.

This is true for standard Lua. In Luau and SLua is enough with:
	for k, v in myTab do
no matter if   myTab   is array or dictionary.

It's important to know how ipairs() and pairs() work because we will see them very often in examples based in standard Lua, but we don't really need to use them.



COMPARING

When we compare, like   table1 == table2,  SLua is not comparing the contents of the tables. It compares the contents of the variables, which are references. table1 and table2 are equal is they have the same reference.

With:
	table1 = { 10, 20, 30 }
	table2 = { 10, 20, 30 }
	print( table1 == table2 )  -- >  false

With:
	table1 = { 10, 20, 30 }
	table2 = table1
	print( table1 == table2 )  -- >  true

In LSL, when we compare two lists, we don't compare the contents of the lists neither, but the lengths of the lists.

So:
	if ( list1 == list2 ) {  // LSL, returns 1 or 0
is:
	if #table1 == #table2 then  // SLua, returns boolean

Comparing with not equal is a bit more tricky:
	if ( list1 != list2 ) {  // LSL, returns the difference of length
if we want a boolean result:
	if #table1 ~= #table2 then  // SLua, returns boolean
if we want a number with the difference:
	local diff = #table1 - #table2   // SLua, returns number

And the LSL alternative of llGetListLength():
	len = list1 != [];  // LSL, length of the list
is just:
	len = #table1  // SLua



LENGTH OF ARRAYS

Now we are going to see some weird behaviours of the # operator with array tables.

All is perfect and predictable if the table is a nice array with correlative indexes starting with 1.

But if there are missing values (nils) in the array things get interesting.

Let's with this:
	x = {}
	for _, v in { 1, 2, 4, 6, 8, 9, 10, 12, 13, 16 } do
		x[v] = 1
	end

A bad array missing the indexes 3, 5, 7, 11, 14 and 15.

We can get the length:
	print(#x)  -- 16
	print(ll.GetListLength(x))  -- 16
It looks well with #. The LL function returns the same.

But:
	for index, value in ipairs(x) do
		print(index, value)  -- 1 1 / 2 1
	end
We only get two pairs of key-values. Ipairs() stops at the first nil at index 3.

Going on:
	x[4] = "hello"

But:
	print(table.find(x, "hello"))  -- nil
Doesn't find the hello. table.find(), like ipairs(), stops at the first nil at index 3.

We insert another value:
	table.insert(x, "bye")
	print(x[17])  -- bye
table.insert() always inserts at #t+1.

But the length that was 16:
	print(#x)  -- 13
	print(ll.GetListLength(x))
After inserting the element 17, now is the length is 13.

We can only trust that #t always exist and #t+1 never exists (always nil)

We remove the element 17:
	table.remove(x, 17)
	print(x[17])  -- bye
But the element it's still there. table.remove() only removes from 1 to #t and ignores calls with other indexes.
If the element is from 1 to #t, it is deleted and the elements after it until #t are moved one index down. But the elements after #t are not moved.



LIBRARY TABLE

Now let's look at some table functions that we are not using often, or haven't used.

table.concat() : joins the elements of an array table into a single string, optionally with a separator.

We have used it today in line 197.

Its problem is that only works with the types number and string. Any other type (boolean or any SLua type) throws an error.

This is why we are making another table with tostring() before using table.concat(), in lines 192-198.
\ WAIT = 10
table.maxn() : returns the largest positive numerical key in the table (array or dictionary).

We can use it to find the upper index in a sparse array. table.maxn(tab) will be the same or bigger than #tab.
\ WAIT = 10
table.move() : copies or moves a range of elements from one part of an array table to another part or into a different array table.

It's more efficient that copying with a loop and It handles overlapping ranges correctly.

The format is:
	table.move(a, from, to, dest [, b])

The parameters are:
	a	source table
	from	starting index in source table
	to	ending index in source table
	dest	destination index in the target table
	b	destination table (optional; if omitted, table a is used)

It returns the destination table.
\ WAIT = 10
table.clone() : creates a shallow copy of a table (array or dictionary). That means it copies the table’s top-level keys and values, but does not recursively copy nested tables. If the table has nested tables, only the reference is copied.

We can use it in functions that receive tables as parameters, when we want to modify the table in the function, but not the original table outside the function.

For instance, when translating LSL code, where the functions always received a copy of the lists passed as parameters.
\ WAIT = 10
table,create() : creates a pre-filled array table, optionally filling it with a default value.

It's used for performance and memory optimization when creating large arrays and to initialize to some value:
	myTotals = tableCreate( 10, 0 )    --  array from 1 to 10, initialized at 0



list3 = list1 + list2

With table.clone() to duplicate the first table and table.move() to add the second table to the duplicated table:
	table3 = table.move(table2, 1, #table2, #table1 + 1, table.clone(table1))

Or with two table.move(), adding the first table to a new empty table:
	table3 = table.move(table2, 1, #table2, #table1 + 1, table.move(table1, 1, #table1, 1, {}))

table.clone() is also useful if, inside a function, we are changing a table passed as parameter.

We can start with:
	paramTab = table.clone(paramTab)
to avoid changing the external table.


