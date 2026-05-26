---
layout: default
title: Upcoming Features
slua_beta: true
---

## Upcoming Luau Features in SLua



### const

The **const** keyword is designed for declaring local variables that cannot be reassigned after their initial value is set, providing a way to enforce read-only variables within a script.

It can be used in any context where a local variable declaration is valid, with **const** instead of **local**.

A key aspect of the const keyword is the distinction between binding immutability and value immutability:
- Binding Immutability: Once a variable is declared with the **const** keyword, the variable name is permanently bound to the initialized reference. The compiler will prevent any subsequent attempt to reassign that variable to a different value.
- Value Immutability: **const** does not make the underlying data structure deeply immutable.
  - For primitive types (such as numbers, booleans, and strings), the variable is effectively constant because the types themselves cannot be mutated.
  - For reference types (such as tables), the variable cannot be reassigned to point to a new table, but the internal elements or properties of the table can still be modified.

Constant bindings support standard  scoping and shadowing rules, meaning a constant can still be shadowed by a new declaration in a nested or subsequent scope.

The **const** keyword offers several practical benefits for codebase maintenance, safety, and development workflow:
- Accidental Reassignment Protection: Restricting reassignment helps eliminate accidentally overwriting of variables or functions.
- Clear Developer Intent: Using constant declarations makes code more self-documenting. It explicitly communicates which variables are intended to remain unchanged throughout their lifecycle.
- Early Bug Detection: Because reassignment is checked at the compiler level, tools like linters and script analyzers can detect invalid reassignments immediately.
- Optimization Potential: When the compiler has a guarantee that a local variable will not be reassigned, it can optimize bytecode generation more effectively.


### integer

The **integer** library in Luau introduces native support for the new 64-bit integer built-in type and provides a suite of dedicated functions to perform arithmetic, bitwise, and logical operations with them.

Historically, Lua represented all numeric values using 64-bit double-precision floating-point numbers, which limits lossless integer representation to 53 bits. The integer library addresses this limitation, offering full 64-bit precision for complex calculations, low-level data processing, and large-value tracking.

Why a Dedicated Library?

To preserve the simplicity of the language and avoid the performance overhead of dynamic operator resolution, the integer type does not support standard arithmetic operators (with the exception of basic equality checks).  
Using a library-driven design instead of operator overloading provides:
- Explicit Signedness Control: Because a 64-bit sequence can be interpreted as either signed or unsigned, the library features separate functions for signed and unsigned operations. This design prevents ambiguity and ensures developers explicitly declare their intended mathematical interpretation.
- Avoidance of Type Coercion: This approach helps maintain clear boundaries between the standard floating-point number type and the strict integer type, preventing accidental, performance-reducing coercions in math-heavy scripts.

Implementing the native integer library brings several benefits to developers working on performance-critical or low-level systems:
- Full 64-bit Precision: By supporting the full range of 64-bit integers, the library allows for precise calculations involving values larger than 2^53.
- Native Execution Performance: Utilizing a native value type rather than emulating 64-bit arithmetic through complex user-space alternatives improves execution speed. The underlying engine can translate these operations directly to native CPU instructions.
- Low-Level Buffer and Binary Integration: The library integrates directly with Lua’s buffer utilities, facilitating efficient binary data parsing, custom serialization, and native format handling.
- Rich Utility Set: It includes built-in functions designed for low-level diagnostics and manipulations, such as counting leading or trailing zeros, byte-swapping (for endianness conversion), and precise division behaviors.

A character `i` may be specified at the end of numeric literals to signify a 64-bit integer literal. 64-bit integer literals support separators, hexadecimal, and binary values:
<pre class="language-slua"><code class="language-slua">--creating integers
local a = 123i
local b = 1_000i
local c = 0xABABi
local d = 0b1000_1000i</code></pre>

Binary and hexadecimal literals can specify the full value including the sign bit:
<pre class="language-slua"><code class="language-slua">--creating integers
local e = 0xFFFF_FFFF_FFFF_FFFFi -- -1i
local f = 0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111i -- -1i</code></pre>

Integer values have a built-in equality comparison, but do not have any other operators or metamethods defined.
<pre class="language-slua"><code class="language-slua">--equality operators are the only operators available
local myInt = 42i
print(myInt == 100i)  -- > false
print(myInt ~= 100i)  -- > true</code></pre>

Negative integer literals are only allowed when unary - is applied to the literal directly:
<pre class="language-slua"><code class="language-slua">--negative integer literals
local g = -123i
local h = -0b1000i</code></pre>

Integers are never automatically converted to numbers or strings, and vice-versa. Passing an integer to a function expecting a number (or string) will result in a type error.

#### Conversion and Creation
Functions for converting other types to and from the `integer` type.

- **`integer.create(n: number): integer?`**  
  Converts a double-precision number to an `integer`. Returns `nil` if the number cannot be represented exactly (e.g., if it has a fractional part, is out of range, or is `NaN`).
- **`integer.fromstring(str: string, base: number?): integer?`**  
  Converts a string representation of an integer into an `integer` value. Accepts an optional base from 2 to 36.
- **`integer.tonumber(n: integer): number`**  
  Converts an `integer` to a double-precision number (precision loss can occur).

#### Signed Arithmetic
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

#### Unsigned Arithmetic
Mathematical operations that treat the inputs as unsigned integers.

- **`integer.udiv(a: integer, b: integer): integer`**  
  Performs unsigned division of `a` by `b`. Errors on division by zero.
- **`integer.urem(a: integer, b: integer): integer`**  
  Computes the remainder of the unsigned division of `a` by `b`. Errors on division by zero.

#### Signed Comparisons
Relational operators using signed comparison.

- **`integer.lt(a: integer, b: integer): boolean`**  
  Performs a signed less-than (`<`) comparison.
- **`integer.le(a: integer, b: integer): boolean`**  
  Performs a signed less-than-or-equal (`<=`) comparison.
- **`integer.gt(a: integer, b: integer): boolean`**  
  Performs a signed greater-than (`>`) comparison.
- **`integer.ge(a: integer, b: integer): boolean`**  
  Performs a signed greater-than-or-equal (`>=`) comparison.

#### Unsigned Comparisons
Relational operators treating the inputs as unsigned integers.

- **`integer.ult(a: integer, b: integer): boolean`**  
  Performs an unsigned less-than (`<`) comparison.
- **`integer.ule(a: integer, b: integer): boolean`**  
  Performs an unsigned less-than-or-equal (`<=`) comparison.
- **`integer.ugt(a: integer, b: integer): boolean`**  
  Performs an unsigned greater-than (`>`) comparison.
- **`integer.uge(a: integer, b: integer): boolean`**  
  Performs an unsigned greater-than-or-equal (`>=`) comparison.

#### Bitwise Logical Operations
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

#### Bitwise Shifts and Rotations
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

#### Bit Manipulation and Inspection
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

#### Range and Limit Operations
Helper functions to clamp values or find extremes.

- **`integer.min(a: integer, ...integer): integer`**  
  Returns the smallest of the integer arguments.
- **`integer.max(a: integer, ...integer): integer`**  
  Returns the largest of the integer arguments.
- **`integer.clamp(a: integer, min: integer, max: integer): integer`**  
  Clamps the value `a` to the range `[min, max]`. Errors if `min > max`.

#### Constants
- **`integer.maxsigned: integer`** 
  Integer value representing 2^63-1 (9_223_372_036_854_775_807i)
- **`integer.minsigned: integer`** 
  Integer value representing -2^63 (-9_223_372_036_854_775_808i)

#### Buffer library
Functions added to the buffer library to work with integers.

- **`buffer.readinteger(b: buffer, offset: number): integer`** 
Reads a 64-bit integer from the buffer at the specified byte offset.
- **`buffer.writeinteger(b: buffer, offset: number, value: integer): ()`** 
Writes a 64-bit integer into the buffer at the specified byte offset.

#### Changes in existing functions
- **`tostring`** 
  converts an integer to a string representation in signed form with no ‘i’ suffix.
- **`rawequal`** 
  compares integers for equality.
- **`type`**  and **`typeof`** 
  return “integer” for an integer value.
- **`string.format`** 
  supports integer arguments.

### class

The native class feature in Luau is a built-in language construct designed to define object-oriented class structures directly. It introduces dedicated contextual keywords (such as class, along with visibility modifiers like public) to natively declare constructor behaviors, instance fields, and methods.
Comparison: Metatable-Based OOP vs. Native Classes
The Metatable Way (Traditional)
Traditionally, Luau emulates object-oriented programming (OOP) using prototype-based patterns via standard tables and metatables. An instance is created by assigning a table a metatable whose fallback metamethod points to a prototype table containing the class's methods.
While functional, this approach has several drawbacks:
Fragile Type Annotations: Type-checking metatables in Luau is historically complex. To make classes type-safe in strict mode, developers must often write verbose type aliases, manually separate instance properties from methods, and manage complex intersection types.
No Built-in Encapsulation: Standard tables do not easily support private or protected fields without creating separate closures for every instance, which causes high memory overhead.
Boilerplate Code: Every class requires repetitive boilerplate to hook up the metatable, configure the index fallback, and define custom instantiation behaviors.
The Native class Way
Instead of relying on runtime table manipulation, native classes allow you to declare the entire structure of an object within a single, cohesive block. Instance fields, accessibility modifiers, initialization parameters, and methods are defined formally. This shifts class definition from a dynamic, emulated runtime mechanism to a structured, compile-time construct.
Key Advantages of Native Classes
Direct Type-System Integration: Metatable-based classes are notoriously difficult for Luau's gradual type checker to analyze. Native classes resolve this by allowing the type checker to easily recognize and validate properties, method signatures, and constructor requirements out of the box, without requiring manual and fragile type-mapping boilerplate.
Performance and Cache Locality: Standard tables are dynamically sized, hashed structures, and resolving methods through metatables requires traversing index chains at runtime. Native classes allow the virtual machine to allocate instances with a fixed, predictable memory layout. This improves cache locality and enables the compiler to optimize property and method lookups.
Encapsulation and Access Control: The introduction of access modifiers (such as public and private designations) provides formal boundaries for class interfaces. This prevents external scripts from modifying or accessing internal class states, which was previously difficult to enforce cleanly using standard tables.
Standardized Syntax: By introducing dedicated keywords for class declarations, the feature establishes a uniform way to write object-oriented code. This reduces the variety of custom class implementations across different libraries and frameworks, making large codebases easier to read, maintain, and share.


### export



## math library constants

New constants added to the math library:

<pre class="language-slua"><code class="language-slua">-- new constants
print(math.nan)	   -- > nan                      -- 0/0
print(math.e)		   -- > 2.71828182845904523536	 -- math.exp(1)
print(math.phi)	   -- > 1.61803398874989484820	 -- the golden ratio
print(math.sqrt2)	 -- > 1.41421356237309504880	 -- math.sqrt(2)
print(math.tau)	   -- > 6.28318530717958647692	 -- 2 * math.pi</code></pre>
