---
layout: default
title: Upcoming Features
slua_beta: true
---

## Upcoming Luau Features in SLua

**IMPORTANT!!!** These features are **NOT** in SLua yet. They will arrive in a more or less near future.

Some of them are already released in Luau, they can be used here:
- Roblox Studio: <https://create.roblox.com/docs/studio/setting-up-roblox-studio#installing-studio>
- Luau Playground: <https://play.luau.org>

Others are in development in Luau.

### const

*status: released, we can use it in Luau.*

The **const** keyword is designed for declaring local variables that cannot be reassigned after their initial value is set, providing a way to enforce read-only variables within a script.

**const** offers several practical benefits for codebase maintenance, safety, and development workflow:
- Accidental Reassignment Protection: Restricting reassignment helps eliminate accidentally overwriting of variables or functions.
- Clear Developer Intent: Using constant declarations makes code more self-documenting. It explicitly communicates which variables are intended to remain unchanged throughout their lifecycle.
- Early Bug Detection: Because reassignment is checked at the compiler level, tools like linters and script analyzers can detect invalid reassignments immediately.
- Optimization Potential: When the compiler has a guarantee that a local variable will not be reassigned, it can optimize bytecode generation more effectively.

It can be used in any context where a local variable declaration is valid, with **const** instead of **local**. They must be initialized in the declaration:

<pre class="language-sluab"><code class="language-sluab">-- declaring constants
const x = 5
const tab = { a = 1 }

const a, b = 1, 2

const function f()
  -- do something
end

-- they can be initialized to nil
const val = tab.b</code></pre>

A **const** variable is equivalent to a variable declared with **local** however **const** variables cannot be reassigned after they are initialized.

A key aspect of the const keyword is the distinction between binding immutability and value immutability:
- Binding Immutability: Once a variable is declared with the **const** keyword, the variable name is permanently bound to the initialized reference. The compiler will prevent any subsequent attempt to reassign that variable to a different value.
- Value Immutability: **const** does not make the underlying data structure deeply immutable.
  - For primitive types (such as numbers, booleans, and strings), the variable is effectively constant because the types themselves cannot be mutated.
  - For reference types (such as tables), the variable cannot be reassigned to point to a new table, but the internal elements or properties of the table can still be modified.

<pre class="language-sluab"><code class="language-sluab">-- constant tables

-- constant tables can be modified
const tab = { count = 0 }
t.count += 1 -- ok (modifying the table)
-- t = {}    -- error (reassigning the constant)

-- we need to freeze the table for full immutability
const t = table.freeze({
	count = 0,
})
-- t.count += 1 -- error (modifying a frozen table)
-- t = {}       -- error (reassigning the constant)</code></pre>

Constant support standard scoping and shadowing rules, meaning a constant can still be shadowed by a new declaration in a nested or subsequent scope:
<pre class="language-sluab"><code class="language-sluab">-- shadowing constants
const a = 1
do
	const a = 2 -- ok: new constant in inner scope
end

const b = 1
const b = 2 -- also ok: redeclaring a constant in same scope</code></pre>

**const** is a contextual keyword that is only valid in positions where **local** is valid. This makes the introduction fully backwards compatible with existing code:
<pre class="language-sluab"><code class="language-sluab">-- using const as identifier (but better don't do it)
const const = 1
print(const) --> 1</code></pre>

*Luau RFC: [Const Keyword](https://rfcs.luau.org/const-keyword.html)*

### integer

*status: implemented, in testing, not released.*

The **integer** library introduces native support for the new 64-bit integer built-in type and provides a suite of dedicated functions to perform arithmetic, bitwise, and logical operations with them.

Historically, Lua represented all numeric values using 64-bit double-precision floating-point numbers, which limits lossless integer representation to 53 bits. The integer library addresses this limitation, offering full 64-bit precision for complex calculations, low-level data processing, and large-value tracking.

Why a Dedicated Library?

To preserve the simplicity of the language and avoid the performance overhead of dynamic operator resolution, the integer type does not support standard arithmetic operators (with the exception of basic equality checks).  
Using a library-driven design instead of operator overloading provides:
- Explicit Signedness Control: Because a 64-bit sequence can be interpreted as either signed or unsigned, the library features separate functions for signed and unsigned operations. This design prevents ambiguity and ensures developers explicitly declare their intended mathematical interpretation.
- Avoidance of Type Coercion: This approach helps maintain clear boundaries between the standard floating-point number type and the strict integer type, preventing accidental, performance-reducing coercions in math-heavy scripts.

Implementing the native integer library brings several benefits to developers working on performance-critical or low-level systems:
- Full 64-bit Precision: By supporting the full range of 64-bit integers, the library allows for precise calculations involving values larger than 2^53.
- Native Execution Performance: Utilizing a native value type rather than emulating 64-bit arithmetic through complex user-space alternatives improves execution speed. The underlying engine can translate these operations directly to native instructions.
- Low-Level Buffer and Binary Integration: The library integrates directly with buffer utilities, facilitating efficient binary data parsing, custom serialization, and native format handling.
- Rich Utility Set: It includes built-in functions designed for low-level diagnostics and manipulations, such as counting leading or trailing zeros, byte-swapping (for endianness conversion), and precise division behaviors.

A character `i` may be specified at the end of numeric literals to signify a 64-bit integer literal. 64-bit integer literals support separators, hexadecimal, and binary values:
<pre class="language-sluab"><code class="language-sluab">--creating integers
local a = 123i
local b = 1_000i
local c = 0xABABi
local d = 0b1000_1000i</code></pre>

Binary and hexadecimal literals can specify the full value including the sign bit:
<pre class="language-sluab"><code class="language-sluab">--creating integers
local e = 0xFFFF_FFFF_FFFF_FFFFi -- -1i
local f = 0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111i -- -1i</code></pre>

Integer values have a built-in equality comparison, but do not have any other operators or metamethods defined.
<pre class="language-sluab"><code class="language-sluab">--equality operators are the only operators available
local myInt = 42i
print(myInt == 100i)  -- > false
print(myInt ~= 100i)  -- > true</code></pre>

Negative integer literals are only allowed when unary - is applied to the literal directly:
<pre class="language-sluab"><code class="language-sluab">--negative integer literals
local g = -123i
local h = -0b1000i</code></pre>

Integers are never automatically converted to numbers or strings, and vice-versa. Passing an integer to a function expecting a number (or string) will result in a type error.

**Conversion and Creation**  
Functions for converting other types to and from the `integer` type.

- **`integer.create(n: number): integer?`**  
  Converts a double-precision number to an `integer`. Returns `nil` if the number cannot be represented exactly (e.g., if it has a fractional part, is out of range, or is `NaN`).
- **`integer.fromstring(str: string, base: number?): integer?`**  
  Converts a string representation of an integer into an `integer` value. Accepts an optional base from 2 to 36.
- **`integer.tonumber(n: integer): number`**  
  Converts an `integer` to a double-precision number (precision loss can occur).

**Signed Arithmetic**  
Basic mathematical operations using signed integer arithmetic.

- **`integer.neg(a: integer): integer`**  
  Negates the value (two's complement wrap-around on overflow).
- **`integer.add(a: integer, b: integer): integer`**  
  Adds `a` and `b`.
- **`integer.sub(a: integer, b: integer): integer`**  
  Subtracts `b` from `a`.
- **`integer.mul(a: integer, b: integer): integer`**  
  Multiplies `a` and `b`.
- **`integer.div(a: integer, b: integer): integer`**  
  Performs signed truncated division of `a` by `b`. Errors on division by zero or division of $-2^{63}$ by $-1$.
- **`integer.rem(a: integer, b: integer): integer`**  
  Computes the remainder of the signed truncated division of `a` by `b`. Errors on division by zero.
- **`integer.idiv(a: integer, b: integer): integer`**  
  Performs signed floored division of `a` by `b`. Errors on division by zero or division of $-2^{63}$ by $-1$.
- **`integer.mod(a: integer, b: integer): integer`**  
  Performs signed floored modulus division of `a` by `b`. Errors on division by zero.

**Unsigned Arithmetic**  
Mathematical operations that treat the inputs as unsigned integers.

- **`integer.udiv(a: integer, b: integer): integer`**  
  Performs unsigned division of `a` by `b`. Errors on division by zero.
- **`integer.urem(a: integer, b: integer): integer`**  
  Computes the remainder of the unsigned division of `a` by `b`. Errors on division by zero.

**Signed Comparisons**  
Relational operators using signed comparison.

- **`integer.lt(a: integer, b: integer): boolean`**  
  Performs a signed less-than (`<`) comparison.
- **`integer.le(a: integer, b: integer): boolean`**  
  Performs a signed less-than-or-equal (`<=`) comparison.
- **`integer.gt(a: integer, b: integer): boolean`**  
  Performs a signed greater-than (`>`) comparison.
- **`integer.ge(a: integer, b: integer): boolean`**  
  Performs a signed greater-than-or-equal (`>=`) comparison.

**Unsigned Comparisons**  
Relational operators treating the inputs as unsigned integers.

- **`integer.ult(a: integer, b: integer): boolean`**  
  Performs an unsigned less-than (`<`) comparison.
- **`integer.ule(a: integer, b: integer): boolean`**  
  Performs an unsigned less-than-or-equal (`<=`) comparison.
- **`integer.ugt(a: integer, b: integer): boolean`**  
  Performs an unsigned greater-than (`>`) comparison.
- **`integer.uge(a: integer, b: integer): boolean`**  
  Performs an unsigned greater-than-or-equal (`>=`) comparison.

**Bitwise Logical Operations**  
Boolean logic operations executed at the bit level.

- **`integer.bnot(a: integer): integer`**  
  Returns the bitwise negation (NOT) of the integer.
- **`integer.band(...integer): integer`**  
  Performs a bitwise AND of all arguments. Returns `-1i` if there are no arguments.
- **`integer.bor(...integer): integer`**  
  Performs a bitwise OR of all arguments. Returns `0i` if there are no arguments.
- **`integer.bxor(...integer): integer`**  
  Performs a bitwise XOR (exclusive OR) of all arguments. Returns `0i` if there are no arguments.
- **`integer.btest(...integer): boolean`**  
  Performs a bitwise AND of all arguments and returns `true` if the result is not zero. Returns `true` if there are no arguments.

**Bitwise Shifts and Rotations**  
Functions for shifting and rotating bits.

- **`integer.lshift(n: integer, i: integer): integer`**  
  Shifts `n` to the left by `i` bits (performs a right shift if `i` is negative). Returns `0` if `i` is outside of `[-63..63]`.
- **`integer.rshift(n: integer, i: integer): integer`**  
  Shifts `n` to the right by `i` bits (performs a left shift if `i` is negative). Returns `0` if `i` is outside of `[-63..63]`.
- **`integer.arshift(n: integer, i: integer): integer`**  
  Performs an arithmetic right shift on `n` by `i` bits (performs a left shift if `i` is negative), propagating the sign bit.
- **`integer.lrotate(n: integer, i: integer): integer`**  
  Rotates `n` to the left by `i` bits (interpreting `i` modulo 64).
- **`integer.rrotate(n: integer, i: integer): integer`**  
  Rotates `n` to the right by `i` bits (interpreting `i` modulo 64).

**Bit Manipulation and Inspection**  
Functions to inspect, extract, or swap specific bits within an integer.

- **`integer.extract(n: integer, f: integer, w: integer?): integer`**  
  Extracts bits from `n` starting at index `f` (0-indexed) with a width of `w` (defaults to 1).
- **`integer.replace(n: integer, r: integer, f: integer, w: integer?): integer`**  
  Replaces bits of `n` at position `f` with a width of `w` (defaults to 1) using the least significant bits of `r`.
- **`integer.countrz(n: integer): integer`**  
  Returns the number of trailing (right-most) consecutive zero bits. Returns 64 if `n` is zero.
- **`integer.countlz(n: integer): integer`**  
  Returns the number of leading (left-most) consecutive zero bits. Returns 64 if `n` is zero.
- **`integer.bswap(n: integer): integer`**  
  Swaps the byte order of `n`.

**Range and Limit Operations**  
Helper functions to clamp values or find extremes.

- **`integer.min(a: integer, ...integer): integer`**  
  Returns the smallest of the integer arguments.
- **`integer.max(a: integer, ...integer): integer`**  
  Returns the largest of the integer arguments.
- **`integer.clamp(a: integer, min: integer, max: integer): integer`**  
  Clamps the value `a` to the range `[min, max]`. Errors if `min > max`.

**Constants**  
- **`integer.maxsigned: integer`**  
  Integer value representing 2^63-1 (9_223_372_036_854_775_807i)
- **`integer.minsigned: integer`**  
  Integer value representing -2^63 (-9_223_372_036_854_775_808i)

**Buffer library**  
Functions added to the buffer library to work with integers.

- **`buffer.readinteger(b: buffer, offset: number): integer`**  
Reads a 64-bit integer from the buffer at the specified byte offset.
- **`buffer.writeinteger(b: buffer, offset: number, value: integer): ()`**  
Writes a 64-bit integer into the buffer at the specified byte offset.

**Changes in existing functions**  
- **`tostring`**  
  converts an integer to a string representation in signed form with no ‘i’ suffix.
- **`rawequal`**  
  compares integers for equality.
- **`type`**  and **`typeof`**  
  return “integer” for an integer value.
- **`string.format`**  
  supports integer arguments.

<pre class="language-sluab"><code class="language-sluab">-- examples with integer

-- Defining 64-bit integer literals using the 'i' suffix
local a = 922337203685477580i    -- Signed 64-bit integer
local b = 0xFFFF_FFFF_FFFF_FFFFi -- -1i in hexadecimal representation
local mask = 0b0000_1111i        -- Binary format with digit separators

-- Parsing and converting safely
-- integer.create converts a 'number' to 'integer'. 
-- It returns nil if the conversion isn't exact (e.g., fractional, NaN, or out of range).
local num_val = 42.0
local from_num = integer.create(num_val) 

-- integer.fromstring parses strings (with optional bases between 2 and 36)
local parsed_int = integer.fromstring("123456789012345", 10)

-- Arithmetic operations (Since direct '+' or '*' operators are not supported)
-- We must ensure the arguments are strictly 'integer' types.
if from_num and parsed_int then
    -- Addition
    local sum = integer.add(from_num, parsed_int)
    
    -- Multiplication
    local product = integer.mul(sum, 2i)
    
    -- Truncated signed division
    local quotient = integer.div(product, 3i)
    
    -- Remainder of truncated division
    local remainder = integer.rem(product, 3i)

    print(string.format("Quotient: %d, Remainder: %d", quotient, remainder))
end

-- Unsigned division helpers (prefixed with 'u')
local large_val = 0xFFFFFFFFFFFFFFFFi -- Interpreted as unsigned max
local half_unsigned = integer.udiv(large_val, 2i)

-- Bitwise Operations
local bit_val = 1i
-- Left shift (Note: the shift amount must also be an 'integer' type)
local shifted = integer.lshift(bit_val, 4i) -- Represents 16i
local bitwise_and = integer.band(shifted, mask) -- 16i AND 15i -> 0i

-- Constants
local max_val = integer.maxsigned -- 2^63 - 1
local min_val = integer.minsigned -- -2^63</code></pre>

*Luau RFC: [64-bit Integer Type](https://rfcs.luau.org/type-long-integer.html)*

### class

*status: implemented, in testing, not released.*

The native **class** feature is a built-in language construct designed to define object-oriented class structures directly.

It introduces dedicated contextual keywords (such as class, along with visibility modifiers like public) to natively declare constructor behaviors, instance fields, and methods.

Comparing: Metatable-Based OOP vs. Native Classes

The Metatable Way (Traditional)
- Traditionally, Lua emulates object-oriented programming (OOP) using prototype-based patterns via standard tables and metatables. An instance is created by assigning a table a metatable whose fallback metamethod points to a prototype table containing the class's methods.
- While functional, this approach has several drawbacks:
  - Boilerplate Code: Every class requires repetitive boilerplate to hook up the metatable, configure the index fallback, and define custom instantiation behaviors.
  - No Built-in Encapsulation: Standard tables do not easily support private or protected fields without creating separate closures for every instance, which causes high memory overhead.
  - Fragile Type Annotations: Type-checking metatables in Lua is complex. To make classes type-safe in strict mode, developers must often write verbose type aliases, manually separate instance properties from methods, and manage complex intersection types.

The Native class Way (New)
- Instead of relying on runtime table manipulation, native classes allow us to declare the entire structure of an object within a single, cohesive block. Instance fields, accessibility modifiers, initialization parameters, and methods are defined formally. This shifts class definition from a dynamic, emulated runtime mechanism to a structured, compile-time construct.
- Key Advantages of Native Classes:
  - Standardized Syntax: By introducing dedicated keywords for class declarations, the feature establishes a uniform way to write object-oriented code. This reduces the variety of custom class implementations across different libraries and frameworks, making large codebases easier to read, maintain, and share.
  - Encapsulation and Access Control: The introduction of access modifiers (such as public and private designations) provides formal boundaries for class interfaces. This prevents external scripts from modifying or accessing internal class states, which was previously difficult to enforce cleanly using standard tables.
  - Performance and Cache Locality: Standard tables are dynamically sized, hashed structures, and resolving methods through metatables requires traversing index chains at runtime. Native classes allow the virtual machine to allocate instances with a fixed, predictable memory layout. This improves cache locality and enables the compiler to optimize property and method lookups.
  - Direct Type-System Integration: Metatable-based classes are difficult for Lua's gradual type checker to analyze. Native classes resolve this by allowing the type checker to easily recognize and validate properties, method signatures, and constructor requirements out of the box, without requiring manual and fragile type-mapping boilerplate.

<pre class="language-sluab"><code class="language-sluab">-- example of class
class Point
    public x
    public y

    function length(self)
        return math.sqrt(self.x * self.x + self.y * self.y)
    end

    function __add(self, other: Point)
        return Point { x = self.x + other.x, y = self.y + other.y }
    end

    function __tostring(self)
        return `Point \{ x = {self.x}, y = {self.y} \}`
    end

    function new(x, y)
        return Point { x = x, y = y }
    end
end

local p = Point.new(3, 4)
print(`my point: {p}  length = {p:length()}`)</code></pre>

Class definitions are a block construct, enclosed in **class** and **end**:
- They can only be written at the topmost scope.
- Defining two classes with the same name in the same module is forbidden.
- Within a class block, two declarations are allowed: Fields and methods.
  - Fields are introduced with the new **public** keyword. In the future **private** and **const** keywords will be added.
  - Methods are introduced with the function keyword. **public function** is also permitted.

Methods defined on class objects can be accessed either via **Class.method()** or **instance:method()** syntax.
- If a method’s first argument is named **self**, it should be invoked with the **instance:method()** call syntax. This is not strictly required, but the compiler and optimizers may deoptimize code that doesn’t.
- If a method accepts no arguments or if its first argument is not named self, it should be invoked via the **Class.method()** syntax. This is the same as “static methods” from other languages.

To create a new instance of a class, we invoke it as if it were a function. It accepts one argument: A table that describes the initial values of all its properties.
- If more customization is desired, static factory functions (frequently named new() or create()) are an easy, familiar way to accomplish this.

Classes can define the following metamethods. They all work just like they do on a metatable:
- __unm, __add, __sub, __mul, __div, __idiv, __mod, __pow
- __eq, __lt, __le
- __concat, __tostring
- __call, __iter
- __len

SLua might also define **__tojson**.

There are two new datatypes: **"class"** and **"object"**:
- The datatype **"class"** serves as a factory for instances of the class and as a namespace for any functions that are defined on the class.
  - They are always const and frozen.
  - To construct an instance of a class, we call the class as though it were a function. It accepts a single argument: a table that contains initial values for all the fields.
- The datatype **"object"** is the instance of the class, similar but not quite the same as a table.
  - **pairs**, **ipairs** , **getmetatable**, and **setmetatable** do not work on class instances. They also cannot be iterated over with the generic **for** loop. (unless the class implements **__iter**)
  - Reading or writing a nonexistent class property throws an error. This makes it easy to disambiguate between a nonexistent property and a property whose value is nil.
  - Comparisons between instances is the same as with tables: If **__eq** is not defined, object comparisons use reference equality. **__eq** is only invoked if both operands are the same type.

<pre class="language-sluab"><code class="language-sluab">-- new datatypes "class" and "object"
class Cls end
local inst = Cls {}

type(Cls) == "class"
typeof(Cls) == "class"

type(inst) == "object"
typeof(inst) == "object"</code></pre>

The **class** library  
A new library for classes.

- **`class.isinstance(o: object, C: class): boolean`**  
Returns true if the object o is an instance of the class C.
- **`class.classof(o: object): class`**  
Returns the class of the object o.

Inheritance and generic classes might be added in the future.

<pre class="language-sluab"><code class="language-sluab">-- example of a class
class Spaceship
    -- Properties
    public name
    public fuel
    public shieldsActive

    -- Methods
    function toggleShields(self)
        self.shieldsActive = not self.shieldsActive
        local status = if self.shieldsActive then "ON" else "OFF"
        print(`Shields for {self.name} are now {status}.`)
    end

    function travel(self, distance)
        local fuelNeeded = distance * 0.5
        if self.fuel >= fuelNeeded then
            self.fuel -= fuelNeeded
            print(`{self.name} traveled {distance} lightyears. Fuel remaining: {self.fuel}`)
        else
            print(`{self.name} lacks the fuel to travel {distance} lightyears!`)
        end
    end

    -- Constructor
    function new(name, fuel)
		return Spaceship { name = name, fuel = fuel, shieldsActive = false }
    end
end

-- Instantiation with the defined constructor
local myShip = Spaceship.new("Galactica", 100)

-- Calling methods on the instance
myShip:toggleShields()      -- Output: Shields for Galactica are now ON.
myShip:travel(40)           -- Output: Galactica traveled 40 lightyears. Fuel remaining: 80
myShip:travel(200)          -- Output: Galactica lacks the fuel to travel 200 lightyears!</code></pre>

*Luau RFC: [Classes](https://rfcs.luau.org/syntax-classes.html)*

### export

*status: ready for development, not implemented.*

The **export** keyword serves as a mechanism to expose definitions from a module script so they can be accessed by other scripts that import it via **require()**.

**export** support variables and functions (**export local**, **export const**, and **export function**). This eliminates the need to manually construct and return a table at the end of a module script.

We can export types, variables, and functions at the top level of our module. The compiler automatically packages these into an exported module structure, meaning no return statement is needed at the bottom of the script.

The **export** contextual keyword is allowed anywhere before variable and function declarations at the top level of a module, including **local**, **const** and **function** declarations.

<pre class="language-sluab"><code class="language-sluab">-- exporting in a module script

-- Exporting variables (using local or const)
export local version = "1.0.0"
export const PI = 3.14159

-- Exporting a function (implicitly treated as const)
export function areaOfCircle(radius)
    return PI * (radius ^ 2)
end</code></pre>

Advantages of **export** compared to **return**
- Boilerplate: we just prefix top-level variables/functions with export, no need to define a local table, bind methods to it, and manually return it.
- Reassignability: exported values are immutable, protecting them from accidental reassignment.
- Performance Optimizations: immutability unlocks cross-module inlining and constant folding.

*Luau RFC: [Export by Value](https://rfcs.luau.org/export-keyword.html)*

### math library constants

*status: released, we can use it in Luau.*

New constants added to the math library:

<pre class="language-slua"><code class="language-sluab">-- new constants
print(math.nan)	   -- > nan                      -- 0/0
print(math.e)      -- > 2.71828182845904523536	 -- math.exp(1)
print(math.phi)	   -- > 1.61803398874989484820	 -- the golden ratio
print(math.sqrt2)  -- > 1.41421356237309504880	 -- math.sqrt(2)
print(math.tau)	   -- > 6.28318530717958647692	 -- 2 * math.pi</code></pre>

*Luau RFC: [Math constants](https://rfcs.luau.org/math-constants.html)*
