---
layout: default
title: "The language: Lua compared to LSL"
---
## The language: Lua compared to LSL
Standard Lua and Luau have some differences. Most of the next code runs in both of them.
I'm using "Luau" at the end of the comment in the first line for Luau only code.
I'm using "Slua" for SLua only code.


### Types and variables

<table>
  <tr>
    <td>
      <pre class="language-slua line-numbers"><code class="language-slua">-- types and variables (Lua)                     .

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
    </td>
    <td>
      <pre class="language-lsl"><code class="language-lsl">// types and variables (LSL)                     .

integer isOn = TRUE;
integer myCounter = 10;
float myValue = 3.75;
string myMessage = "Hello";









myMessage = (string)myCounter;
//</code></pre>
    </td>
  </tr>
</table>

Comments use -- instead of //

The semicolon at the end of the lines is optional and very rarely used.

Variables are not declared with a type, they can take values of any type.

Their type depends on what value we assign to them. 

We can see it in lines 8-11. The function "type" returns the name of the type and "print" outputs it to the console. I have added the text printed as a comment.
