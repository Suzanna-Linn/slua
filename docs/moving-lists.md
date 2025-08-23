## Tables

### Array tables

They are like the LSL lists, but starting with index 1 instead of 0.

Tables use { and } instead of [ and ]:
- local myTab1 = {}    -- empty table
  - like list myTab1 = [];
- local myTab = { "apples", "bananas", "oranges" }
  - like list myTab = [ "apples", "bananas", "oranges" ];

The operator # returns the length of an array table:
- local  length = #myTab
  - like integer length = llGetListLength(myTab2);

This also works:
- local length = ll.GetListLength(myTab)

We can get a value in the table using [ and ] with the index number:
- local value = myTab[2]    -- > bananas
  - like local value = ll.List2String(myTab,1)    -- > bananas
 
The functions ll.List2*** also work, but it's better to access the table in the SLua way.

There is no operator + for tables. To add an element to the end of a table we can get the length of the table and add the next one:
- myTab[ #myTab + 1 ] = "melons"
  - like myTab = myTab + "melons";

Or also with a function in the library table:
- table.insert( tabFruits, "Pear" )

The function table.insert, unlike ll.ListInsertList, doesn't return a value. It modifies the table that we have sent as parameter. We don't assign a return value to the table.

To insert at the start we use the same function but with 3 parameters. Now the second parameter is the index before which the element will be inserted.:
- table.insert( tabFruits, 1, "Lemon" )

Or anywhere in the table, the index in the second parameter must be between 1 and #table:
- table.insert( tabFruits, 3, "Lemon" )

If we use an index out of the range, the value will be inserted with this index, but all the index values in between will not exist. It will not be an array table and the functions for array tables and the operator # will not work.

To remove the last element in an array table:
- table.remove( tabFruits )

Again, table.remove, unlike llDeleteSubList, modifies the table and doesn't return the table.

To remove any element in the table we have the same function with a second paramenter, the index of the element:
- table.remove( tabFruits, 3 )

To add one table to another, like   tabFruits = tabFruits + tabExoticFruits, we have:
- table.move( tabExoticFruits, 1, #tabExoticFruits, #tabFruits + 1, tabFruits )

In this example table.move() copies the first table (tabExoticFruits) from the index 1 to the index #tabExoticFruits (from start to end), into the second table (tabFruits) starting at #tabFruits + 1 (at the end).

The parameters of table.move() are:
- table to be copied
- copy from index (1, from start)
- copy to index (#table, to the end)
- index where to insert the copied table (#table + 1, to add after; 0, to add before)
- table to be copied to

It returns the modified table in the 5th parameter.

Another example with table.move:
- local newTab = table.move(myTab, 4, 6, 1, {})
 - like list newTab = llList2List( myTab, 3, 5 )

To make a string with the elements of the table:
- local myStr = table.concat( tabFruits, ", " )
  - like string myStr = llDumpList2String( tabFruits, ", " )

Tables in SLua are much more efficient than lists in LSL. Tables are a core feature of Lua and they used everywhere for many things. Tables are very optimized by the compiler.  
It's better to stop using the LL functions for lists and we will use the tables in Lua style.

### Dictionary tables

They are pairs of key-value, like the linkset data.

To create a dictionary table:
	tabFruitsQuantity = { Apple = 50, Banana = 30, Cherry = 20, Orange = 15 }

Instead of a list of values, we use keys (the name of the fruit) and values (the quantity of each fruit).

We add a new pair of key value with:
- tabFruitsQuantity["Melon"] = 5

Or with:
- tabFruitsQuantity.Melon = 5

Using one or the other is a matter of preference, internally both are the same.

To get a value from the table we use the key:
- ll.OwnerSay( tabFruitsQuantity["Melon"] )  -- >  5

Or
- ll.OwnerSay( tabFruitsQuantity.Melon  )  -- >  5

If the key doesn't exist it returns a value of nil:
- ll.OwnerSay( tabFruitsQuantity["Pumpkin"] )  -- >  nil

To remove a pair of key value we set the key to nil:
- tabFruitsQuantity["Cherry"] = nil
- 
The key is removed (it's not set to nil) and the memory is cleaned up.

Array tables are a special case of dictionary tables, where the keys are consecutive numbers starting with 1.

All values, in array tables and in dictionary tables, can be anything, including another table. Tables in  tables can also have other tables as values, to make lists of lists of lists...

The operator # only works with array tables, not with dictionary tables.

To know if a dictionary table is empty is:
- next( myTab ) == nil

### Copying tables

In this example:

local tab1 = { 10, 20, 30 }
local tab2 = {}

tab2 = tab1
tab1[2] = 15  -- changing a value in tab1

ll.OwnerSay(tostring(tab1[2]))  -- > 15  -- ok
ll.OwnerSay(tostring(tab2[2]))  -- > 15  -- tab2 is also changed!

Tables can be a big thing. They are not stored in the variables. Variables store a reference to the table.

tab2 = tab1 copies the reference to the table, not the table itself. Both variables have the same reference to the only one table.

We can make a copy of a table, with the table.clone function:
- tab2 = table.clone( tab1 )

Now we have two different tables (with the same values), each one with its reference.

It makes a "shallow" copy, only the elements in the first level of the table are copied. If an element is a table, this "sub-table" is not copied, and the new table has the same reference to the "sub-table".

### Comparing tables

In SLua myTab1 == myTab2 doesn't compare the elements of the tables neither, it compares the references of the tables.
-- Comparing tables (SLua)

local table1 = { 10, 20, 30 }
local table2 = { 10, 20, 30 }
print( table1 == table2 )  -- >  false

local table3 = { 10, 20, 30 }
local table4 = table3
print( table3 == table4 )  -- >  true

In LSL myList1 == myList2 doesn't compare the elements of the lists meither, it compares the length of the lists.

If myTab1 and myTab2 have a reference to the same table the comparison is true, otherwise is false.

The LSL myList1 == myList2 in SLua is:
- #myTab1 == #myTab2

And the LSL myTab == [] to check if the list is empty is:
- #myTab == 0

Comparing with not equal is a bit more tricky, in LSL if ( list1 != list2 ) {   returns the difference of length:
- to get a boolean result:
  - if #table1 ~= #table2 then
- to get a number with the difference:
  - local diff = #table1 - #table2
 
And the LSL alternative to llGetListLength(), integer len = list1 != [];, is:
- local len = #table1
