---
layout: default
title: The language: Lua compared to LSL 
---
## The language: Lua compared to LSL
Standard Lua and Luau have some differences. Most of the next code runs in both of them.
I'm using "Luau" at the end of the comment in the first line for Luau only code.
I'm using "Slua" for SLua only code.


### Types and variables

| Value 1 | Value 2 |
|---------|---------|



{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- types and variables (Lua)

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
print( type( myMessage ) )  -- string
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// types and variables (LSL)

integer isOn = TRUE;
integer myCounter = 10;
float myValue = 3.75;
string myMessage = "Hello";









myMessage = (string)myCounter;
//
</syntaxhighlight>
|}
Comments use -- instead of //

The semicolon at the end of the lines is optional and very rarely used.

Variables are not declared with a type, they can take values of any type.

Their type depends on what value we assign to them. 

We can see it in lines 8-11. The function "type" returns the name of the type and "print" outputs it to the console. I have added the text printed as a comment.

These are the three basic types: "boolean" (true of false), "number" (which includes integers and floats) and "string".

There are no types key, vector or rotation. LuaSL will add them. A vector, for instance, could be like:
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- Type vector (LuaSL)
colorRed = vector(1, 0, 0)
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// Type vector (LSL)
vector colorRed = <1, 0, 0>;
</syntaxhighlight>
|}
We can assign any value to any variable, like in line 13, assigning a number to a variable that had a string changes the variable type to number.

If we want to have it as a string we need to typecast it, as in line 16.

Variables that can have any type are very useful but sometimes but can lead to errors.

Luau adds capabilities of Type-checking and Linting, that LuaSL will also have:

- Type checking automatically infers types from the values assigned to variables or manually by adding type annotations. These annotations can define types, combinations of types, or subtypes. There are directives that allow to control the level of type checking in each script, ranging from none to stricter than LSL.

- Linting identifies possible issues like uninitialized or unused variables, duplicated functions, mismatched parameter counts, return values, and many more. There are also directives to enable or disable specific linting checks.


###  Operators
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- operators (Lua)

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
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// operators (LSL)

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
</syntaxhighlight>
|}
The / is the float division. There is the // that is the integer division.

There is an exponentiation operator, ^.

The unequality operator is ~= instead of !=.

&&, ||, ! are "and", "or", "not". The "and" and "or" operators only evaluate the second operand if necessary: operB is not evaluated if operA is false in "operA and operB" or if operA is true in "operA or operB".

The concatenation operator is .. instead of +. Because of the changing types of the variables, it needs to be clear what operation we want to do.

The # returns the length of a string.

The increment and decrement operators, ++ and --, doesn't exist.

The compound operators, += and so on, doesn't exist in standard Lua, but they exist in Luau, so LuaSL will also have them: +=, -=, *=, /=, //=, %=, ^=.


###  If, while, for, repeat
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- If, while, for, repeat (Lua)

counter = 3


if counter == 1 then

elseif counter == 2 then

else

end


while counter > 0 do
    counter = counter - 1
end


for i = 0, 10, 2 do
    print( i )  -- 0, 2, 4, 6, 8, 10
end


repeat
    counter = counter +1
until counter == 5
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// If, while, for, repeat (LSL)
integer i;
integer counter = 3;


if (counter == 1) {

} else if (counter == 2) {

} else {

}


while (counter > 0) {
    counter--;
}


for ( i = 0; i < 11; i+=2 ) {
    llSay(0, (string)i );  // 0, 2, 4, 6, 8, 10
}


do
    counter++;
while (counter < 5);
</syntaxhighlight>
|}
There are the same blocks if, while and for. And a repeat..until instead of do...while ("repeat..until not" is the same as "do...while").

The { and } are not used here (they are used for tables as we will see later). Instead there are keywords: "then" or "do", and "end".

The "for" in lines 20-22 is one of the types of "for", we will see the other one later. Its three values are start, end and step.

We can't use an assignment in a condition. In Lua, assignments are statements, not expressions. In case that we write a  =  instead of a  ==  in a condition, we will get an error when compiling.


### Functions, ll functions
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- Functions (Lua)

function average( a, b )
    return ( a + b ) / 2
end

print( average( 15, 5 ) )  -- 10


function factorial( n )
    if n < 0 then
        return nil
    elseif n == 0 then
        return 1
    else
        return n * factorial( n - 1 )
    end
end

number = 5
result = factorial( number )

if result ~= nil then 
    print( "Factorial of "..number.." is "..result )  -- Factorial of 5 is 120
else
    print( number.." is not valid")
end</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// Functions (LSL)

float average( float a, float b ) {
    return ( a + b ) / 2;
}

llSay(0, (string)average( 15, 5 ) );  // 10


integer factorial( integer n ) {
    if (n < 0) {
        return -1;
    } else if (n == 0) {
        return 1;
    } else {
        return n * factorial( n - 1 );
    }
}

integer number = 5;
integer result = factorial( number );

if (result != -1) {
    llSay(0, "Factorial of " + (string)number + " is " + (string)result );  // Factorial of 5 is 120
} else {
    llSay(0, (string)number + " is not valid" );
}
</syntaxhighlight>
|}
The functions use the keyword "function" and, of course, no types for the parameters or the return value.

Here we have two example functions, lines 2-7 and lines 10-27.

In line 12 we return "nil" instead of "-1". The value "nil" means that the variable has no value, it's empty. We use it again in line 23.

In line 24 we don't need to typecast the number to a string. It's done automatically.
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- LL functions (LuaSL)

ll.Say(0, “hi!”)
ll.SetPos(ll.GetPos() + vector(0, 0, 1))
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// LL functions (LSL)

llSay(0, “hi!”);
llSetPos(llGetPos() + <0, 0, 1>);
</syntaxhighlight>
|}
This is how LL functions will look in LuaSL. We will have all the LL functions (including LinksetData, Experiences, all) with the same parameters and constants and the difference will be calling them with a "." between "ll" and the name of the function.


### Tables as lists
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- tables as lists (Lua)

fruits = { "Apple", "Banana", "Cherry", "Orange" }

for index, fruit in ipairs( fruits ) do
    print( "Fruit "..index..": "..fruit )
    -- Fruit 1: Apple
    -- Fruit 2: Banana
    -- Fruit 3: Cherry
    -- Fruit 4: Orange
end

print ( #fruits )  -- 4

fruits[3] = "Melon"
print( fruits[3] )  -- Melon

table.insert( fruits, "Lemon" )
-- Apple, Banana, Melon, Orange, Lemon

table.insert( fruits, 2, "Pear" )
-- Apple, Pear, Banana, Melon, Orange, Lemon

table.remove( fruits )
-- Apple, Pear, Banana, Melon, Orange

table.remove( fruits, 2 )
-- Apple, Banana, Melon, Orange
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// tables as lists (LSL)
integer i;
list fruits = [ "Apple", "Banana", "Cherry", "Orange" ];

for ( i = 0; i < llGetListLength( fruits ); i++ ) {
    llSay(0, "Fruit " + (string)i + ": " + llList2String( fruits, i ) );
    // Fruit 1: Apple
    // Fruit 2: Banana
    // Fruit 3: Cherry
    // Fruit 4: Orange
}

llSay(0, (string)llGetListLength( fruits ) );  // 4

fruits = llListReplaceList( fruits, ["Melon"] ,2 ,2) ;
llSay( 0, llList2String( fruits, 2 ) );

fruits += "Lemon";
// Apple, Banana, Melon, Orange, Lemon

fruits = llListInsertList( fruits, ["Pear"], 1 );
// Apple, Pear, Banana, Melon, Orange, Lemon

fruits = llDeleteSubList( fruits, -1, -1 );
// Apple, Pear, Banana, Melon, Orange

fruits = llDeleteSubList( fruits, 1, 1 );
// Apple, Banana, Melon, Orange
</syntaxhighlight>
|}
The tables are the most important data structure in Lua.

Here we have an example of a table used as an array, in the same way as LSL lists.

{ and } are used instead of [ and ] to initialize it.

In line 5 there is the other type of "for", the "for...in".

"ipairs" is a system function that iterates on all the values of an array table. It returns two values, stored in "index" and "fruits". We will see in a while that functions can return several values.

The arrays start from 1, not 0, as we can see in the results in lines 7-10. Also the first character in a string has the position 1 instead of 0. All the Lua fuctions that work on array tables or string assume that they start at 1.

The operator #, that we have seen previously returning the length of a string, also returns the number of elements in an array table.

We read and write values in the array using [ and ] with the index.

There are functions to insert and remove from the end or at any index. Unlike LSL these functions don't return a value but work on the same table passed as parameter.
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- tables as lists (Luau)

print( table.find( fruits, "Orange" ) )  -- 4
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// tables as lists (LSL)

llSay( 0, llListFindList( fruits, ["Orange"] ) )  // 3
</syntaxhighlight>
|}
Lua doesn't have a function to find an element in the array table, but Luau has and also LuaSL will.


### Tables as (key, value) pairs (like the linkset data)
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- Tables as (key, value) pairs (Lua)

fruitQuantity = {
    Apple = 50,
    Banana = 30,
    Cherry = 20,
    Orange = 15
}

for fruit, quantity in pairs(fruitQuantity) do
    print(fruit..": ".. quantity)
    -- Cherry: 20
    -- Orange: 15
    -- Banana: 30
    -- Apple: 50
end


fruitQuantity[ "Lemon" ] = 2
-- Apple, Banana, Melon, Orange, Lemon

print( fruitQuantity[ "Lemon" ] )  -- 2

fruitQuantity[ "Lemon" ] = nil
-- Apple, Banana, Melon, Orange


fruitQuantity.Pear = 1
-- Apple, Banana, Melon, Orange, Pear

print( fruitQuantity.Pear )  -- 1

fruitQuantity.Pear = nil
-- Apple, Banana, Melon, Orange
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// Tables as (key, value) pairs (like the linkset data) (LSL)
integer i;

llLinksetDataWrite( "Apple", "50" );
llLinksetDataWrite( "Banana", "30" );
llLinksetDataWrite( "Cherry", "20" );
llLinksetDataWrite( "Orange", "15" );
list fruitQuantity = llLinksetDataListKeys( 0, 0 );

for ( i=0; i < llGetListLength( fruitQuantity ); i++ ) {
    llSay(0, llList2String( fruitQuantity, i ) + ": " + llLinksetDataRead( llList2String( fruitQuantity, i ) ) );
    // Apple: 50
    // Banana: 30
    // Cherry: 20
    // Orange: 15
}


llLinksetDataWrite( "Lemon", "2" );
// Apple, Banana, Melon, Orange, Lemon

llSay( 0, llLinksetDataRead( "Lemon" ) );  // 2

llLinksetDataDelete( "Lemon" );
// Apple, Banana, Melon, Orange








//
</syntaxhighlight>
|}
Tables can also be used as dictionaries (pairs of key-value). In the example we are comparing it to the linkset data, which is a different thing, but has the same data structure.

In lines 3-8 we are filling the table with pairs of keys and values.

In the "for", line 10, we use "pairs" instead of "ipairs". "ipairs" is optimized for array tables and only works with them.

We see that the fruits are printed in a random order. This happens because tables are implemented as hash tables. It is more efficient, but it results in an undefined order when iterating over the elements. We will see later how to sort them.

We read and write values in the array using [ and ] with the key. We delete a key-value by assigning the key to nil.

And alternative way is with tablename.key, lines 28-34.



### Tables of functions instead of if...elseif chain
{| {{KBtable}}
|
<syntaxhighlight lang="lua" line copy>
-- Tables of functions instead of if...elseif chain (Lua)

-- some random functions
function sayInfo()
    print("info");
end
function giveObject()
    print("object");
end
function giveLink()
    print("link");
end
function sayAgentProfileLink()
    print("agent");
end
function sayGroupProfileLink()
    print("group");
end

-- main function
function action(option)
    local tableOptions = {
        info = sayInfo,
        give = giveObject,
        link = giftLink,
        agent = sayAgentProfileLink,
        group = sayGroupProfileLink
    }

    if tableOptions[option] then
        tableOptions[option]();
    else
        print("the option "..option.." doesn't exist");
    end
end

action("info");   -- info
action("agent");  -- agent
action("wrong");  -- the action wrong doesn't exist
</syntaxhighlight>
|
<syntaxhighlight lang="lsl2" line>
// Tables of functions instead of if...else if chain (LSL)

// some random functions
sayInfo() {
    llSay(0,"info");
}
giveObject() {
    llSay(0,"object");
}
giveLink() {
    llSay(0,"link");
}
sayAgentProfileLink() {
    llSay(0,"agent");
}
sayGroupProfileLink() {
    llSay(0,"group");
}

// main function
action(string option) {
    if (option=="info") {
        sayInfo();
    } else if (option=="give") {
        giveObject();
    } else if (option=="link") {
        giveLink();
    } else if (option=="agent") {
        sayAgentProfileLink();
    } else if (option=="group") {
        sayGroupProfileLink();
    } else {
        llSay(0,"the option "+option+" doesn't exist");
    }
}

action("info");   // info
action("agent");  // agent
action("wrong");  // the action wrong doesn't exist
</syntaxhighlight>
|}
Tables can contain functions. In this example we are replacing a long sequence of if...else if with a table of functions.

In lines 22-28 we create the table, with the name of the option as the key, and the function (without parentheses) as the value.

"local", in line 22, means that the table is a local variable of the function, without "local" it would be a global variable.

In line 30 we check if the option exists and we call the function, adding the parentheses.

Of course, the if... elseif chain also works in Lua, but using a table is more efficient and the code is more clear.


### Events and states

We are not looking at events or states, because we don't know yet how they are implemented in LuaSL.

Luau has events, but not states. This is not a problem because Luau events are very flexible and can be used in a "states-like" way.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgzMjQyMTM4NiwxNjIxOTUzMDAxLDE4Mz
cxMDcwNTNdfQ==
-->