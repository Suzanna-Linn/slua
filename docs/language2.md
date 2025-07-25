---
layout: default
title: "The language: Lua beyond LSL"
---
## The language: Lua beyond LSL

Standard Lua and Luau have some differences. Most of the next code runs in both of them. I'm using "Luau" at the end of the comment in the first line for Luau only code.

Remember that this is a quick overview to see what is new. Each one of the next scripts will require one or two classes to explain its content properly.

### Tables as lists of lists

<pre class="language-slua line-numbers"><code class="language-slua">-- Tables as lists of lists (Lua)

fruitData = {
    { name = "Apple", quantity = 50, color = "Red", season = "Fall" },
    { name = "Banana", quantity = 30, color = "Yellow" },
    { name = "Cherry", quantity = 20, color = "Red" },
    { name = "Orange", quantity = 10, color = "Orange", organic = true }
}

for index, fruit in pairs(fruitData) do
    print("Fruit #" .. index)
    print("Name: " .. fruit["name"])
    print("Quantity: " .. fruit["quantity"])
    print("Color: " .. fruit["color"])
    if fruit["season"] then
        print("Season: " .. fruit["season"])
    end
    if fruit["organic"] then
        print("Organic: " .. tostring(fruit.organic))
    end
    print()
end</code></pre>

Here we have an array of tables, a "list of lists".

Each table in the array can have the same elements, or different, or different quantity of elements.

The "for" loops on the array. We get the value of each element using its key, between [ and ].

In line 15, or 18, if the key doesn't exist in the table, "nil" is returned. A "nil" in a condition is false.

### Functions, parameters and returns

<pre class="language-slua line-numbers"><code class="language-slua">-- Functions, parameters and returns (Lua)

function calculate(a, b)
    return  a + b, a * b
end

add, mul = calculate(10, 5)
print("Sum:", add)      -- Sum: 15
print("Product:", mul)  -- Product: 50


function calculate(a, b, ...)
    local addition = a + b
    local product = a * b

    for i = 1, select("#", ...) do
        local value = select(i, ...)
        addition = addition + value
        product = product * value
    end

    return addition, product
end

add, mul = calculate(10, 5, 2, 3)
print("Sum:", add)      -- Sum: 20
print("Product:", mul)  -- Product: 300
</code></pre>

Functions can return several values, lines 3-9, two in this case, in line 4. The result is assigned to "add" and "mul" in line 7.

Functions can also have an indeterminate number of parameters, like in lines 12-27. The ... represents any quantity of parameters.

So the function in line 12 has from 2 to any number of parameters. We will use 4 in total in this example (line 25).

We use the system function "select" to get the parameters.

In line 16, "select" with "#" returns the quantity of parameters.

In line 17 we get each parameter by its number of position in the ..., as usual in Lua starting with 1, not 0.

### Functions, anonymous functions

<pre class="language-slua line-numbers"><code class="language-slua">-- Functions, anonymous functions (Lua)

fruits = {"apple", "orange", "banana", "grape", "pear"}


table.sort(fruits, function(a, b)
    return a > b
end)

for i, fruit in ipairs(fruits) do
    print(fruit) -- pear / orange / grape / banana / apple
end


totalCalls = 0

table.sort(fruits, function(a, b)
    totalCalls = totalCalls + 1
    return #a < #b
end)

for i, fruit in ipairs(fruits) do
    print(fruit) -- pear / grape / apple / orange / banana
end

print(totalCalls)  -- 10
</code></pre>

We are sorting a table in two different ways, lines 6-12 and 15-26.

"table.sort" is a system function. Its first parameter is a table, the second parameter is a function that takes two values and returns "true" if the first value is to be placed before the second value in the sorted table.

A function in Lua is a type of data, like boolean, number, string or table.We can use functions as parameters, return functions, make a table of functions...

Functions don't need to have a name. As a parameter, we can use the name of a function, or the code of the function, like we are doing in lines 6-8. The function code goes from "function" to "end".

table.sort calls this function that we have sent to do the sorting.

In the second sort, lines 15-26, we are sorting by length of the fruit name, shorter fruits before.

And we have added a counter to see how many comparisons it needs.

### Sorting dictionary tables

<pre class="language-slua line-numbers"><code class="language-slua">-- Sorting dictionary tables

fruitQuantity = {
    Apple = 50,
    Banana = 30,
    Cherry = 20,
    Orange = 15,
    Lemon = 20,
    Pear = 30,
    Melon = 15
}

function sortFruits()
    local arrayFruits = {}

    for name, quantity in pairs( fruitQuantity ) do
        table.insert( arrayFruits, {name = name, quantity = quantity} )
        -- tablename.key acces used above, tablename["key"] would be:
        -- table.insert( arrayFruits, { ["name"] = name, ["quantity"] = quantity} )
    end

    table.sort( arrayFruits, function(a, b)
        if a.quantity ~= b.quantity then
            return a.quantity > b.quantity
        else
            return a.name < b.name
        end
    end )

    return arrayFruits
end

for _, fruit in ipairs( sortFruits() ) do
    print( fruit.name..": "..fruit.quantity )
    -- Apple: 50
    -- Banana: 30
    -- Pear: 30
    -- Cherry: 20
    -- Lemon: 20
    -- Melon: 15
    -- Orange: 15
end
</code></pre>

We have seen before that the keys in a dictionary table are not sorted.

In this example we are using another table, an array table, to sort the fruits by quantity and name.

We create the new array table of tables with name and quantity in lines 14-20.

We sort the table in lines 22-28, by quantity and name.

The _ in the for in line 33 is a variable name. It stores the index of the array returned by ipairs, that we don't use. Using _ is a convention to denote an unused variable.

### Closures

<pre class="language-slua line-numbers"><code class="language-slua">-- Closures (Lua)

function createCounter()
    local count = 0
    return function()
        count = count + 1
        return count
    end
end

counter1 = createCounter()
counter2 = createCounter()

print( counter1() ) -- 1
print( counter1() ) -- 2
print( counter2() ) -- 1
print( counter1() ) -- 3
print( counter2() ) -- 2
</code></pre>

We have a function that makes a counter, lines 11-12. Each time that it's called, lines 14-18, the counter is increased.

Let's look at lines 3-9.

In line 4, the keyword "local" defines "count" as a local variable, otherwise it would be global.

In line 5, we don't return a value, but a function that increases "count" and returns it, lines 5-8.

The variables counter1 and counter2 contain functions,that are executed each time that we use them with ().

But the variable "count" is local. The function createCounter finished its execution when it returned the function that increases "count"... 

So what variable "count" are counter1 and counter2 increasing and how is the value preserved between calls?

This is what is called a closure, or external local variable, or upvalue.

The returned function, by using "count", encloses the variable with itself. Each function that is returned has its own "count".

From the point of view of the function is like a global variable, and its value is preserved between function calls.

For the rest of the script is like a local variable of the function, so not accessible.

Lua has three scopes of variables: globals, locals and closures, which are somewhere in the middle of the other two.

### For and iterators

<pre class="language-slua line-numbers"><code class="language-slua">-- For and iterators (Lua)

local function fibonacciIterator(limit)
    local a, b = 0, 1
    local count = 0
    print("I'm called")  -- "I'm called" is only printed once

    return function()
        if count >= limit then
            return nil
        end
        local nextNumber = a
        a, b = b, a + b 
        count = count + 1
        return nextNumber
    end
end

for number in fibonacciIterator(10) do
    print(number)  -- 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
end
</code></pre>

We have seen the "for...in" with ipairs and pairs. Now we will use our own iterator.

An iterator is a function that is called by the "for...in" in each loop and returns a value. The "for" goes on until this function returns "nil".

In this example we iterate on fibonacci numbers. The parameter "limit" is how many numbers we want.

The function fibonacciIterator is called only once, when the "for" starts. What is called in each loop is the function returned by fibonacciIterator.

The iterator is the anonymous function in lines 8-16. It has 3 closures: a, b and count.

In line 13, the values on the right side of the  =  are all obtained before starting to assign them to the variables on the left.

For instance:   a, b = b, a   is a way to swap the values without using an intermediate variable.

### Metatables and metamethods

<pre class="language-slua line-numbers"><code class="language-slua">-- Metatables and metamethods (Lua)

function createReadOnlyTable(data)
    local mt = {
        __index = data,
        __newindex = function(t, key, value)
            print("Not allowed to set key "..key.." to "..value)
        end
    }
    return setmetatable({}, mt)
end

readOnlyFruits = createReadOnlyTable( {"apple", "banana", "cherry", "pear"} )

readOnlyFruits[2] = "orange"  -- Not allowed to set key 2 to orange
readOnlyFruits[5] = "grape"   -- Not allowed to set key 5 to grape

print( readOnlyFruits[2] )  -- banana
print( readOnlyFruits[5] )  -- nil
</code></pre>

We are going to see how to make a read only table using a metatable.

A metatable is a table that is linked to another table and has keys to control how the table works.

The main use of metatables are with classes and objects, but let's start with this less useful example.

The function createReadOnlyTable, lines 3-11, takes values for an array table and returns a table that can't be modified.

"mt", line 4, is the metatable. Its possible keys are predefined in Lua and start with __.

We are using   __index, line 5, to assign the table where to access the data when we read it. In this case the table "data" in the parameters.

And   __newindex, line 6, that has a function that executes when we write a new key to the table. In this a case a function that returns an error message.

In line 10, with the system function setmetatable, we assign the metatable to an empty table and return it.

After line 13, readOnlyFruits is a table, that has a metatable, that doesn't allow any new key and has a table, from which it obtains the values.

### Objects

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects (Lua)

Vector = {}
Vector.__index = Vector

function Vector:new(x, y, z)
    local instance = setmetatable({}, Vector)
    instance.x = x or 0
    instance.y = y or 0
    instance.z = z or 0
    return instance
end

function Vector.__add(v1, v2)
    return Vector:new(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
end

function Vector.__sub(v1, v2)
    return Vector:new(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
end

function Vector.__mul(v1, v2)
    if type(v2) == "number" then
        return Vector:new(v1.x * v2, v1.y * v2, v1.z * v2)
    else
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    end
end

function Vector:__tostring()
    return "<"..self.x..", "..self.y..", "..self.z..">"
end

v1 = Vector:new(1, 2, 3)
v2 = Vector:new(4, 5, 6)

print("v1:", v1)  -- v1: <1, 2, 3>
print("v2:", v2)  -- v2: <4, 5, 6>
print("v1 + v2:", v1 + v2)  -- v1 + v2: <5, 7, 9>
print("v1 - v2:", v1 - v2)  -- v1 - v2: <-3, -3, -3>
print("v1 scaled by 2:", v1 * 2)  -- v1 scaled by 2: <2, 4, 6>
print("Dot product of v1 and v2:", v1 * v2)  --  Dot product of v1 and v2: 32
</code></pre>

Time for the objects. Both sides of the slide are the same script.

We are creating an object "vector", lines 3-32. We will not need to do it, SLua has vectors, it's only an example.

There is not an "object" type in Lua. Objects are created using metatables.

The class is a metatable that stores the functions (methods). The instance is a table that stores the values (properties) and has the class as metatable.

In our example, Vector is the class, v1 and v2 are the instances.

We start defining Vector as a table, line 3, with  __index assigned to itself.

It means that when the instance doesn't find a key in its table (which will happen with the functions of the class), it will look for it in the Vector table (which has the functions).

The function "new", lines 6-12, is the constructor. We could use any name for it, but "new" is the usual one.

It returns a new table, with Vector as metatable, and the initial values.

In lines 14-28 we are defining operators for the class, using   __add,   __sub and   __mul. There are more predefined keys for other operators.

It's not possible to overload operators, so with   __mul we check the type of the parameter in line 23 to calculate Vector*number (returning a vector) or Vector*Vector (returning a number).

In lines 30-32 we define   __tostring that is called when a conversion to string is needed, like in the "print" function.

### Objects and encapsulation

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects and encapsulation

PartyBalloon = {}
PartyBalloon.__index = PartyBalloon

function PartyBalloon:new(color, size)
    local instance = setmetatable({}, PartyBalloon)
    instance._color = color or "Red"
    instance._size = size or "Medium"
    instance._isInflated = false
    return instance
end

function PartyBalloon:getColor()
    return self._color
end
function PartyBalloon:setColor(newColor)
    self._color = newColor
    print("Balloon color changed to: "..self._color)
end

function PartyBalloon:getSize()
    return self._size
end
function PartyBalloon:setSize(newSize)
    self._size = newSize
    print("Balloon size changed to: "..self._size)
end

function PartyBalloon:displayInfo()
    print("Color: "..self._color..", Size: "..self._size..", Inflated: "..tostring(self._isInflated))
end

function PartyBalloon:inflate()
    if not self._isInflated then
        self._isInflated = true
        print("The "..self._color.." balloon has been inflated!")
    else
        print("The "..self._color.." balloon is already inflated!")
    end
end
function PartyBalloon:deflate()
    if self._isInflated then
        self._isInflated = false
        print("The "..self._color.." balloon has been deflated.")
    else
        print("The "..self._color.." balloon is already deflated!")
    end
end

myBalloon = PartyBalloon:new("Green", "Large")

myBalloon:displayInfo()      -- Color: Red, Size: Large, Inflated: false
myBalloon:setColor("Blue")   -- Balloon color changed to: Blue
myBalloon:setSize("Medium")  -- Balloon size changed to: Medium
myBalloon:inflate()          -- The Blue balloon has been inflated!
myBalloon:displayInfo()      -- Color: Blue, Size: Medium, Inflated: true

-- print(myBalloon._color)  -- This works but shouldn't be done
</code></pre>

In this example we are using functions as setters and getters, lines 14-28, to provide encapsulation of the properties.

The variables are still accessible, line in the commented line 59.

By convention, we use names starting with an underscore for them. It's only a convention, to the compiler it doesn't matter.

Lua is not designed for big projects, with several programmers involved, so there is no as much need of private variables as in other languages.

Starting their names with _ helps to remind us that we shouldn't access them.

It's possible, but not efficient, to be truly private. The way is using the private variables and functions as closures and copying the public functions to the instance of the class, or to the subclass in case of inheritance.

### Objects and inheritance

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects and Inheritance (Lua)

Shape = {}
Shape.__index = Shape
function Shape:new(x, y)
    local instance = setmetatable({}, self)
    instance.x = x or 0
    instance.y = y or 0
    return instance
end
function Shape:getPosition()
    return self.x, self.y
end

Circle = setmetatable({}, { __index = Shape })
Circle.__index = Circle
function Circle:new(x, y, radius)
    local instance = Shape.new(self, x, y)
    setmetatable(instance, self)
    instance.radius = radius or 1
    return instance
end
function Circle:getRadius()
    return self.radius
end
function Circle:getArea()
    return math.pi * self.radius^2
end

Rectangle = setmetatable({}, { __index = Shape })
Rectangle.__index = Rectangle
function Rectangle:new(x, y, width, height)
    local instance = Shape.new(self, x, y)
    setmetatable(instance, self)
    instance.width = width or 1
    instance.height = height or 1
    return instance
end
function Rectangle:getWidth()
    return self.width
end
function Rectangle:getHeight()
    return self.height
end
function Rectangle:getArea()
    return self.width * self.height
end

myCircle = Circle:new(10, 20, 5)
print(myCircle:getPosition())  -- 10 20
print(myCircle:getRadius())    -- 5
print(myCircle:getArea())      -- 78.539816339745

myRectangle = Rectangle:new(15, 25, 4, 6)
print(myRectangle:getPosition())  -- 15 25
print( myRectangle:getWidth())    -- 4
print(myRectangle:getHeight())    -- 6
print(myRectangle:getArea())      -- 24
</code></pre>

Let's go to inherit objects.

Here we have a class "Shape" with a position (x,y). And two classes, "Circle" and "Rectangle", with area and some other properties, that inherit from it.

myCircle has Circle as metatable, and Circle has Shape as metatable.

When we call a function in myCircle, Lua looks for it in the table myCircle, then in the table Circle, and if it is not there, in the table Shape.

It looks slow, but it's optimized at compile time, and is very fast.

### Objects and inheritance with functions override

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects and inheritance with functions override

Character = {}
Character.__index = Character

function Character:new(name, health, attack)
    local instance = setmetatable({}, Character)
    instance.name = name
    instance.health = health
    instance.attack = attack
    return instance
end

function Character:displayInfo()
    print("Name: "..self.name)
    print("Health: "..self.health)
    print("Attack: "..self.attack)
end

function Character:attackTarget(target)
    print(self.name.." attacks "..target.name.." for "..self.attack.." damage!")
    target.health = target.health - self.attack
    if target.health <= 0 then
        print(target.name.." has been defeated!")
    else
        print(target.name.." has "..target.health.." health remaining.")
    end
end

Warrior = setmetatable({}, { __index = Character })
Warrior.__index = Warrior

function Warrior:new(name, health, attack, defense)
    local instance = Character:new(name, health, attack)
    setmetatable(instance, Warrior)
    instance.defense = defense
    return instance
end

function Warrior:displayInfo()
    Character.displayInfo(self)
    print("Defense: "..self.defense)
end

function Warrior:attackTarget(target)
    Character.attackTarget(self, target)
    print(self.name.." (Warrior) uses shield for defense!")
    self.health = self.health + self.defense
end

Mage = setmetatable({}, { __index = Character })
Mage.__index = Mage

function Mage:new(name, health, attack, mana)
    local instance = Character:new(name, health, attack)
    setmetatable(instance, Mage)
    instance.mana = mana
    return instance
end

function Mage:displayInfo()
    Character.displayInfo(self)
    print("Mana: "..self.mana)
end

function Mage:attackTarget(target)
    if self.mana >= 10 then
        print(self.name.." (Mage) casts a fireball at "..target.name.."!")
        target.health = target.health - (self.attack * 2)
        self.mana = self.mana - 10
    else
        print(self.name.." does not have enough mana to cast a spell!")
        return
    end
    Character.attackTarget(self, target)
end

warrior = Warrior:new("Thor", 100, 20, 5)
mage = Mage:new("Gandalf", 80, 15, 30)

warrior:displayInfo()
-- Name: Thor
-- Health: 100
-- Attack: 20
-- Defense: 5

mage:displayInfo()
-- Name: Gandalf
-- Health: 80
-- Attack: 15
-- Mana: 30

warrior:attackTarget(mage)
-- Thor attacks Gandalf for 20 damage!
-- Gandalf has 60 health remaining.
-- Thor (Warrior) uses shield for defense!

mage:attackTarget(warrior)
-- Gandalf (Mage) casts a fireball at Thor!
-- Gandalf attacks Thor for 15 damage!
-- Thor has 55 health remaining.
</code></pre>

Here we have functions in the base class, lines 14-28, with processes that are common to all the subclasses.

The subclass has the same functions. They call the function in the base class to do the common process and add their own process.

### Objects and abstract classes

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects and abstract classes

AbstractInstrument = {}

function AbstractInstrument.new()
  error("Can't instantiate abstract class Instrument")
end

function AbstractInstrument:play()
  error("Abstract method 'play' not implemented")
end

function AbstractInstrument:tune()
  error("Abstract method 'tune' not implemented")
end

Guitar = {}
Guitar.__index = Guitar

setmetatable(Guitar, { __index = AbstractInstrument })

function Guitar.new(numStrings)
  local instance = setmetatable({}, Guitar)
  instance.numStrings = numStrings
  return instance
end

function Guitar:play()
  print("Playing guitar with "..self.numStrings.." strings")
end

function Guitar:tune()
  print("Tuning guitar...")
end

myGuitar = Guitar.new(6)

myGuitar:play()
myGuitar:tune()
</code></pre>

There aren't abstract classes in Lua, but we can simulate them.

We have the class AbstractInstrument that we want to be abstract.

Its contructor and functions all raise an error if they are called, using the system function "error" which parameter is the error message.

### Objects and multiple inheritance

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects and multiple inheritance (Lua)

Color = {}
Color.__index = Color

function Color:new(r, g, b)
    local instance = setmetatable({}, self)
    instance.r = r or 0
    instance.g = g or 0
    instance.b = b or 0
    return instance
end

function Color:setColor(r, g, b)
    self.r = r
    self.g = g
    self.b = b
end

function Color:getColor()
    return self.r, self.g, self.b
end

function Color:getColorFormat()
    return "R:"..self.r.." G:"..self.g.." B:"..self.b
end
</code></pre>

Multiple inheritance is also possible.

It's recommended to design our structure of classes in a way that we don't need multiple inheritance, but if we need it, we can use it.

We have added a new class Color.

<pre class="language-slua line-numbers"><code class="language-slua">-- Objects and multiple inheritance (Lua)

ColoredCircle = {}
ColoredCircle.__index = function(tbl, key)
    return tbl.Circle[key] or tbl.Color[key]
end

function ColoredCircle:new(x, y, radius, r, g, b)
    local instance = {
        Circle = Circle:new(x, y, radius),
        Color = Color:new(r, g, b)
    }
    setmetatable(instance, self)
    return instance
end

myColoredCircle = ColoredCircle:new(25,25,10, 255, 128, 64)

print(myColoredCircle:getPosition())     -- 25	25
print(myColoredCircle:getRadius())       -- 10
print(myColoredCircle:getArea())         -- 314.15926535898
print(myColoredCircle:getColorFormat())  -- R:255 G:128 B:64
</code></pre>

We have the class ColoredCircle, that inherits from Circle and Color.

This script should have the classes Color and Circle (and Shape) in the same script to work. I'm not copying them to avoid repeating.

Now the   __index, lines 4-6, doesn't have a table, but a function. This function returns the called function from Circle if it is there (or in Shape) or from Color.

This use of   __index with a function is why multiple inheritance is not recommended. This function can't be optimized by the compiler and the process is slower than single inheritance.

### Error handling

<pre class="language-slua line-numbers"><code class="language-slua">-- Error handling (Lua)

function calculateSquareRoot(number)
    return math.sqrt(number)
end

function safeSquareRoot(input)
    local success, result = pcall(calculateSquareRoot, tonumber(input))

    if success then
        print("The square root is:", result)
    else
        print("Error occurred:", result) 
    end
end

safeSquareRoot(25)       -- The square root is:	5.0
safeSquareRoot("hello")  -- Error occurred: main.lua:2: bad argument #1 to 'sqrt' (number expected, got nil)
safeSquareRoot(100)      -- The square root is:	10.0
</code></pre>

We can catch errors, to avoid run-time errors, so our script can go on running.

In this example we are trying to calculate the square root of "hello", which will throw an error, since it can't be converted to a number.

The system function to intercept errors is "pcall", in line 8.

The first parameter of "pcall" is the name of the function that we are calling and the next parameters are the parameters of our function.

The first parameter returned is true (success) or false (error).

In case of success, the next parameters are the parameters returned by our function.

In case of error, the second parameter is the description of the error.

### Libraries

System functions are grouped in libraries, and called as LibraryName.FunctionName, except the functions in the basic library that doesn't need a library name.

We have seen several basic functions, like: print, type, tostring, pairs, select, setmetatable,... Other libraries are:

- table: tables manipulation

- math: mathematical operations

- string: string manipulation
    
- os: date and time functions

- bit32: bitwise operations on integers. Standard Lua has bitwise operators, but not Luau. So probably we will use this library instead of operators.

Standard Lua has more libraries and can use externally developed ones. Luau, for security reasons, is restricted to its own libraries.

SLua adds the ll library with all the ll functions, like: ll.Say, ll.GetPos,..

Libraries are accessed through tables. They are implemented as tables with functions and constants.
We can list the contents of a library:

<pre class="language-slua line-numbers"><code class="language-slua">-- Contents of a library (Lua)
for name, entry in pairs(math) do
    print(type(entry),"    ",name)
end
</code></pre>

### Modules and packages

A module is a type of script that is not executed on its own, but will be included in another script.

Modules return a table that will be used in the main script. This table can be anything: values and functions, an object, several objects...

Standard Lua also has packages, which have several modules compiled together, but Luau has modules only.

### Debugging

It seems that we will not have debugging in the first SLua version, but it will be added later.

Luau has the possibility to add a debugger to set stop points, watch variables, step on code and inspect variables

### Co-routines

They will be also added later, not in the first version.

It allows that a function can pause itself while waiting for something to happen, and another function can resume it when that happens.

It will be useful for functions that use asynchronous calls or timers, and other advanced interactions.
