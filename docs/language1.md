---
layout: default
title: "The language: Lua compared to LSL"
---

## The language: Lua compared to LSL
Standard Lua and Luau have some differences. Most of the next code runs in both of them.
I'm using "Luau" at the end of the comment in the first line for Luau only code.
I'm using "Slua" for SLua only code.


### Types and variables

<table><tr><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- types and variables (Lua)

isOn = true
myCounter = 10
myValue = 3.75
myMessage = "Hello"

print( type( isOn ) )       -- boolean
print( type( myCounter ) )  -- number
print( type( myValue ) )    -- number
print( type( myMessage ) )  -- string

myMessage = myCounter
print( type( myMessage ) )  -- number

myMessage = tostring( myCounter )
print( type( myMessage ) )  -- string</code></pre>
</td><td>
<pre class="language-lsl"><code class="language-lsl">// types and variables (LSL)

integer isOn = TRUE;
integer myCounter = 10;
float myValue = 3.75;
string myMessage = "Hello";









myMessage = (string)myCounter;
//</code></pre>
</td></tr></table>

Comments use -- instead of //

The semicolon at the end of the lines is optional and very rarely used.

Variables are not declared with a type, they can take values of any type.

Their type depends on what value we assign to them. 

We can see it in lines 8-11. The function "type" returns the name of the type and "print" outputs it to the console. I have added the text printed as a comment.

These are the three basic types: "boolean" (true of false), "number" (which includes integers and floats) and "string".

There are no types key, vector or rotation. SLua adds them. A vector, for instance, is:

<table><tr><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- Type vector (SLua)
colorRed = vector(1, 0, 0)
</code></pre>
</td><td>
<pre class="language-lsl"><code class="language-lsl">// Type vector (LSL)
vector colorRed = <1, 0, 0>;
</code></pre>
</td></tr></table>

We can assign any value to any variable, like in line 13, assigning a number to a variable that had a string changes the variable type to number.

If we want to have it as a string we need to typecast it, as in line 16.

Variables that can have any type are very useful but sometimes but can lead to errors.

Luau adds capabilities of Type-checking and Linting, that SLua will also have:
- Type checking automatically infers types from the values assigned to variables or manually by adding type annotations. These annotations can define types, combinations of types, or subtypes. There are directives that allow to control the level of type checking in each script, ranging from none to stricter than LSL.
- Linting identifies possible issues like uninitialized or unused variables, duplicated functions, mismatched parameter counts, return values, and many more. There are also directives to enable or disable specific linting checks.

### Operators

<table><tr><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- operators (Lua)

-- +, -, *, % (modulus) are the same
print( 7 / 4 )   -- 1.75
print( 7 // 4 )  -- 1
print( 2 ^ 3 )   -- 8

-- ==, <, >, <=, >= are the same
print( "hello" ~= "bye" )  -- true    ( ~ is Alt+126 )

isOn = true
myCounter = 10
myMessage = "hello"

print( isOn and myCounter == 0 )  -- false
print( isOn or myCounter == 0 )   -- true
print( not isOn )                 -- false

print ( myMessage.." world" ) -- hello world
print( #myMessage )           -- 5

-- ++, -- doesn't exist
myCounter = myCounter + 1
</code></pre>
</td><td>
<pre class="language-lsl"><code class="language-lsl">// operators (LSL)

// +, -, *, % (modulus) are the same
llSay(0, (string)( 7.0 / 4.0 ) );       // 1.75
llSay(0, (string)( 7 / 4 ) );           // 1
llSay(0, (string)llPow( 2, 3 ) );   // 8

// ==, <, >, <=, >= are the same
llSay(0, (string)( "hello" != "bye" ) );  // 1

integer isOn = TRUE;
integer myCounter = 10;
string myMessage = "hello";

llSay(0, (string)( isOn && myCounter == 0 ) );   // 0
llSay(0, (string)( isOn || myCounter == 0 ) );   // 1
llSay(0, (string)( !isOn ) );                    // 0

llSay(0, myMessage + " world" );         // hello world
llSay(0, (string)llStringLength( myMessage ) );  // 5

// ++, //
myCounter++;
</code></pre>
</td></tr></table>

The / is the float division. There is the // that is the integer division.

There is an exponentiation operator, ^.

The unequality operator is ~= instead of !=.

&&, ||, ! are "and", "or", "not". The "and" and "or" operators only evaluate the second operand if necessary: operB is not evaluated if operA is false in "operA and operB" or if operA is true in "operA or operB".

The concatenation operator is .. instead of +. Because of the changing types of the variables, it needs to be clear what operation we want to do.

The # returns the length of a string.

The increment and decrement operators, ++ and --, doesn't exist.

The compound operators, += and so on, doesn't exist in standard Lua, but they exist in Luau, so LuaSL will also have them: +=, -=, *=, /=, //=, %=, ^=.
