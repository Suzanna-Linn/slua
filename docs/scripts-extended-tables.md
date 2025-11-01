## Extended tables

Xtable extends the functionality of standard SLua tables, providing a set of methods for array and dictionary manipulation using metatable capabilities to create a more versatile table object.

### Example of use

-- Create an Xtable from an existing array
local myArray = Xtable:new({1, 2, 3, 4, 5})

-- You can also use the call syntax for convenience
local anotherArray = Xtable({6, 7, 8})

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

