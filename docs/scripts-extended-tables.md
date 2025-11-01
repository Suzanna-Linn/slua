### **ExTable: A Powerful Lua Table Extension**

ExTable is a Lua library that extends the functionality of standard Lua tables, providing a rich set of methods for array and dictionary manipulation. It leverages Lua's metatable capabilities to create a more versatile and expressive table object.

### **Installation and Usage**

To use ExTable, simply include the `ExTable.lua` file in your project and create new ExTable instances from existing tables.

```lua
local ExTable = require("ExTable")

-- Create an ExTable from an existing array
local myArray = ExTable:new({1, 2, 3, 4, 5})

-- Create an ExTable from an existing dictionary
local myDict = ExTable:new({a = 1, b = 2, c = 3})

-- You can also use the call syntax for convenience
local anotherArray = ExTable({6, 7, 8})
```

### Core Concepts

ExTable works by setting a metatable on a standard Lua table. This metatable intercepts operations and provides new methods. The `__index` metamethod allows an ExTable instance to access both its own methods and the standard `table` library functions. The `__call` metamethod provides a convenient shortcut for creating new ExTable instances.

---

### **API Reference**

#### **Creation and Introspection**

*   **`ExTable:new(tab)`**
    Creates a new ExTable instance from an existing table `tab`.
    *   **Parameters:**
        *   `tab` (table): The table to be wrapped by ExTable.
    *   **Returns:** A new ExTable instance.

*   **`ExTable:len()`**
    Returns the number of elements in the table, considering both array and dictionary parts. It iterates through all key-value pairs to determine the count.
    *   **Returns:** (number) The total number of elements.

*   **`ExTable:type()`**
    Determines the type of the table based on its keys.
    *   **Returns:** (string) One of the following:
        *   `"empty"`: If the table has no elements.
        *   `"array"`: If all keys are sequential integers starting from 1.
        *   `"dictionary"`: If there are no array elements.
        *   `"mix"`: If the table contains both array and dictionary-style keys.

#### **Array Manipulation**

*   **`ExTable:slice(from, to)`**
    Extracts a portion of an array. Negative indices can be used to count from the end of the array.
    *   **Parameters:**
        *   `from` (number): The starting index.
        *   `to` (number): The ending index.
    *   **Returns:** A new ExTable containing the sliced elements.

*   **`ExTable:insertArray(ins, from)`**
    Inserts the elements of one array into another at a specified position.
    *   **Parameters:**
        *   `ins` (table): The array to be inserted.
        *   `from` (number): The index at which to insert the new elements.
    *   **Returns:** The modified original ExTable.

*   **`ExTable:replaceArray(rep, from, to)`**
    Replaces a range of elements in an array with the elements of another array.
    *   **Parameters:**
        *   `rep` (table): The array of replacement elements.
        *   `from` (number): The starting index of the range to replace.
        *   `to` (number): The ending index of the range to replace.
    *   **Returns:** The modified original ExTable.

*   **`ExTable:removeArray(from, to)`**
    Removes a range of elements from an array.
    *   **Parameters:**
        *   `from` (number): The starting index of the range to remove.
        *   `to` (number): The ending index of the range to remove.
    *   **Returns:** The modified original ExTable.

*   **`ExTable:reverse()`**
    Reverses the order of the elements in the array part of the table in-place.
    *   **Returns:** The modified original ExTable.

#### **Functional Programming Methods**

*   **`ExTable:map(func, ...)`**
    Applies a function to each element of one or more arrays and returns a new ExTable with the results. The mapping continues until the shortest array is exhausted.
    *   **Parameters:**
        *   `func` (function): The function to apply to each element.
        *   `...`: Optional additional tables to be iterated over in parallel.
    *   **Returns:** A new ExTable containing the results of the function applications.

*   **`ExTable:filter(func)`**
    Creates a new ExTable with all elements that pass the test implemented by the provided function.
    *   **Parameters:**
        *   `func` (function): The function to test each element. Should return `true` to keep the element.
    *   **Returns:** A new ExTable with the filtered elements.

*   **`ExTable:reject(func)`**
    The opposite of `filter`. Creates a new ExTable with all elements that do not pass the test implemented by the provided function.
    *   **Parameters:**
        *   `func` (function): The function to test each element. Should return `false` to keep the element.
    *   **Returns:** A new ExTable with the rejected elements.

*   **`ExTable:reduce(func, init)`**
    Applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.
    *   **Parameters:**
        *   `func` (function): The function to execute on each value in the array.
        *   `init` (any): Optional initial value for the accumulator. If not provided, the first element of the array is used.
    *   **Returns:** The single value that results from the reduction.

*   **`ExTable:each(func)`**
    Executes a provided function once for each table element.
    *   **Parameters:**
        *   `func` (function): The function to execute for each element.

*   **`ExTable:detect(func)`**
    Returns the first element in the table for which the provided function returns a truthy value.
    *   **Parameters:**
        *   `func` (function): The function to test each element.
    *   **Returns:** The first element that passes the test, or `nil` if no element passes.

*   **`ExTable:any(func)`**
    Checks if at least one element in the table passes the test implemented by the provided function.
    *   **Parameters:**
        *   `func` (function): The function to test each element.
    *   **Returns:** (boolean) `true` if any element passes the test, otherwise `false`.

*   **`ExTable:all(func)`**
    Checks if all elements in the table pass the test implemented by the provided function.
    *   **Parameters:**
        *   `func` (function): The function to test each element.
    *   **Returns:** (boolean) `true` if all elements pass the test, otherwise `false`.

*   **`ExTable:none(func)`**
    Checks if no elements in the table pass the test implemented by the provided function.
    *   **Parameters:**
        *   `func` (function): The function to test each element.
    *   **Returns:** (boolean) `true` if no elements pass the test, otherwise `false`.

*   **`ExTable:count(funcOrValue)`**
    Counts the number of elements that match a given value or satisfy a given function.
    *   **Parameters:**
        *   `funcOrValue` (function or any): A function to test each element or a value to compare against.
    *   **Returns:** (number) The number of matching elements.

#### **Dictionary and Utility Methods**

*   **`ExTable:keys()`**
    Returns a new ExTable containing the keys of the table.
    *   **Returns:** A new ExTable with the keys.

*   **`ExTable:values()`**
    Returns a new ExTable containing the values of the table.
    *   **Returns:** A new ExTable with the values.

*   **`ExTable:update(other)`**
    Updates the table with the key-value pairs from another table, overwriting existing keys.
    *   **Parameters:**
        *   `other` (table): The table containing new key-value pairs.
    *   **Returns:** The modified original ExTable.

*   **`ExTable:unique()`**
    Creates a new ExTable with the unique values from the table.
    *   **Returns:** A new ExTable with unique values.

*   **`ExTable:intersection(other)`**
    Creates a new ExTable with the values that are present in both the original table and the `other` table.
    *   **Parameters:**
        *   `other` (table): The table to intersect with.
    *   **Returns:** A new ExTable with the common values.

*   **`ExTable:difference(other)`**
    Creates a new ExTable with the values from the original table that are not present in the `other` table.
    *   **Parameters:**
        *   `other` (table): The table to compare against.
    *   **Returns:** A new ExTable with the values unique to the original table.

#### **Operator Overloads**

ExTable overloads the addition and multiplication operators for intuitive table manipulation.

*   **`__add` (Concatenation)**
    The `+` operator is overloaded to concatenate two tables (or a table and a single value).
    ```lua
    local t1 = ExTable({1, 2})
    local t2 = ExTable({3, 4})
    local t3 = t1 + t2 -- {1, 2, 3, 4}
    ```

*   **`__mul` (Merging)**
    The `*` operator is overloaded to merge two tables. For duplicate keys, the value from the right-hand table is used.
    ```lua
    local t1 = ExTable({a = 1, b = 2})
    local t2 = ExTable({b = 3, c = 4})
    local t3 = t1 * t2 -- {a = 1, b = 3, c = 4}
    ```
