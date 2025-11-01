## Extended tables

Xtable extends the functionality of standard SLua tables, providing a set of methods for array and dictionary manipulation using metatable capabilities to create a more versatile table object.

### Example of use

-- Create an Xtable from an existing array
local myArray = Xtable:new({1, 2, 3, 4, 5})

-- You can also use the call syntax for convenience
local anotherArray = Xtable({6, 7, 8})

### Functions and operators

#### Creation and Introspection

**`Xtable:new(tab)`**
Creates a new Xtable instance from an existing table `tab`.
  **Parameters:**
    `tab` (table): The table to be wrapped by Xtable.
  **Returns:** A new Xtable instance.

**`Xtable:len()`**
Returns the number of elements in the table, considering both array and dictionary parts. It iterates through all key-value pairs to determine the count.
  **Returns:** (number) The total number of elements.

**`Xtable:type()`**
Determines the type of the table based on its keys.
  **Returns:** (string) One of the following:
    `"empty"`: If the table has no elements.
    `"array"`: If all keys are sequential integers starting from 1.
    `"dictionary"`: If there are no array elements.
    `"mix"`: If the table contains both array and dictionary-style keys.

#### Array Manipulation

**`Xtable:slice(from, to)`**
Extracts a portion of an array. Negative indices can be used to count from the end of the array.
  **Parameters:**
    `from` (number): The starting index.
    `to` (number): The ending index.
  **Returns:** A new Xtable containing the sliced elements.

**`Xtable:insertArray(ins, from)`**
Inserts the elements of one array into another at a specified position.
  **Parameters:**
    `ins` (table): The array to be inserted.
    `from` (number): The index at which to insert the new elements.
  **Returns:** The modified original Xtable.

**`Xtable:replaceArray(rep, from, to)`**
Replaces a range of elements in an array with the elements of another array.
  **Parameters:**
    `rep` (table): The array of replacement elements.
    `from` (number): The starting index of the range to replace.
    `to` (number): The ending index of the range to replace.
  **Returns:** The modified original Xtable.

**`Xtable:removeArray(from, to)`**
Removes a range of elements from an array.
  **Parameters:**
    `from` (number): The starting index of the range to remove.
    `to` (number): The ending index of the range to remove.
  **Returns:** The modified original Xtable.

**`Xtable:reverse()`**
Reverses the order of the elements in the array part of the table in-place.
  **Returns:** The modified original Xtable.

#### Functional Programming Methods

**`Xtable:map(func, ...)`**
Applies a function to each element of one or more arrays and returns a new Xtable with the results. The mapping continues until the shortest array is exhausted.
  **Parameters:**
    `func` (function): The function to apply to each element.
    `...`: Optional additional tables to be iterated over in parallel.
  **Returns:** A new Xtable containing the results of the function applications.

**`Xtable:filter(func)`**
Creates a new Xtable with all elements that pass the test implemented by the provided function.
  **Parameters:**
    `func` (function): The function to test each element. Should return `true` to keep the element.
  **Returns:** A new Xtable with the filtered elements.

**`Xtable:reject(func)`**
The opposite of `filter`. Creates a new Xtable with all elements that do not pass the test implemented by the provided function.
  **Parameters:**
    `func` (function): The function to test each element. Should return `false` to keep the element.
  **Returns:** A new Xtable with the rejected elements.

**`Xtable:reduce(func, init)`**
Applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.
  **Parameters:**
    `func` (function): The function to execute on each value in the array.
    `init` (any): Optional initial value for the accumulator. If not provided, the first element of the array is used.
  **Returns:** The single value that results from the reduction.

**`Xtable:each(func)`**
Executes a provided function once for each table element.
  **Parameters:**
    `func` (function): The function to execute for each element.

**`Xtable:detect(func)`**
Returns the first element in the table for which the provided function returns a truthy value.
  **Parameters:**
    `func` (function): The function to test each element.
  **Returns:** The first element that passes the test, or `nil` if no element passes.

**`Xtable:any(func)`**
Checks if at least one element in the table passes the test implemented by the provided function.
  **Parameters:**
    `func` (function): The function to test each element.
  **Returns:** (boolean) `true` if any element passes the test, otherwise `false`.

**`Xtable:all(func)`**
Checks if all elements in the table pass the test implemented by the provided function.
  **Parameters:**
    `func` (function): The function to test each element.
  **Returns:** (boolean) `true` if all elements pass the test, otherwise `false`.

**`Xtable:none(func)`**
Checks if no elements in the table pass the test implemented by the provided function.
  **Parameters:**
    `func` (function): The function to test each element.
  **Returns:** (boolean) `true` if no elements pass the test, otherwise `false`.

**`Xtable:count(funcOrValue)`**
Counts the number of elements that match a given value or satisfy a given function.
  **Parameters:**
    `funcOrValue` (function or any): A function to test each element or a value to compare against.
  **Returns:** (number) The number of matching elements.

#### Dictionary and Utility Methods

**`Xtable:keys()`**
Returns a new Xtable containing the keys of the table.
  **Returns:** A new Xtable with the keys.

**`Xtable:values()`**
Returns a new Xtable containing the values of the table.
  **Returns:** A new Xtable with the values.

**`Xtable:update(other)`**
Updates the table with the key-value pairs from another table, overwriting existing keys.
  **Parameters:**
    `other` (table): The table containing new key-value pairs.
  **Returns:** The modified original Xtable.

**`Xtable:unique()`**
Creates a new Xtable with the unique values from the table.
  **Returns:** A new Xtable with unique values.

**`Xtable:intersection(other)`**
Creates a new Xtable with the values that are present in both the original table and the `other` table.
  **Parameters:**
    `other` (table): The table to intersect with.
  **Returns:** A new Xtable with the common values.

**`Xtable:difference(other)`**
Creates a new Xtable with the values from the original table that are not present in the `other` table.
  **Parameters:**
    `other` (table): The table to compare against.
  **Returns:** A new Xtable with the values unique to the original table.

#### Operators

**`__add` (Concatenation)**
The `+` operator concatenates two tables or a table and a single value.

**`__mul` (Merging)**
The `*` operator merges two tables. For duplicate keys, the value from the right-hand table is used.

### Script

