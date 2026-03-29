---
layout: default
title: Rotations
slua_beta: true
---

### Rotations

**rotation()** or **quaternion()** create a rotation from its components:  
<code class="language-sluab">myRot = rotation(1, 1, 1, 0)</code> or <code class="language-sluab">myRot = quaternion(1, 1, 1, 0)</code>.

- It's not possible to assign a value to a component. We need to create a new rotation.
- We can get a component from the return value of a function, not only from a variable.
- Components are stored in 32 bits floats.
- Vectors can use uppercase components (X, Y, Z) but rotations can't. Let's use always lowercase components.

<pre class="language-sluab"><code class="language-sluab">-- rotations (SLua)

local myRot = rotation(1, 1, 1, 0)
local myRot2 = quaternion(2, 2, 2, 0)

myRot = rotation(myRot.x, myRot.y, myRot.z, -myRot.s)  -- we can't assign a value to a component

local rotS = ll.GetRot().s</code></pre>

**torotation()** or **toquaternion()** create a rotation from a string:  
<code class="language-sluab">myRot = torotation("<1, 1, 1, 0>")</code> or <code class="language-sluab">myRot = quaternion( torotation("<1, 1, 1, 0>"))</code>.

We have the datatypes rotation and quaternion, but internally only exists the type quaternion, rotation is just an alias:
<pre class="language-slua"><code class="language-slua">if typeof(myVar) == "quaternion" then  -- NOT "rotation", it would never happen!
	-- do rotations stuff
end</code></pre>
<code class="language-slua">typeof( ZERO_ROTATION ) -- > quaternion</code>. There is no constant ZERO_QUATERNION.

### The rotation (or quaternion) library

SLua has a library with functions for rotations. We can't use the :method notation, we have to call them on rotation (or quaternion):

**rotation.create( x, y, z, s )** : creates a new rotation.
- same as rotation( x, y, z, s )

**rotation.conjugate( rot )** : returns a rotation, the "inverse" or opposite of the rotation. If rot rotates 90° left, conjugate(rot) rotates 90° right.

<pre class="language-sluab"><code class="language-sluab">-- rotation.conjugate() written in SLua

local function conjugate(rot)
    return rotation(-rot.x, -rot.y, -rot.z, rot.s)
end</code></pre>

**rotation.dot( rot1, rot2 )** : returns a number, the dot product of the rotations. It measures how "similar" two rotations are.
-	If the result is 1 or -1, the rotations are identical.
-	If the result is 0, they are 180 degrees apart.

<pre class="language-sluab"><code class="language-sluab">-- rotation.dot() written in SLua

local function dot(a, b)
    return a.x * b.x + a.y * b.y + a.z * b.z + a.s * b.s
end</code></pre>

**rotation.magnitude( rot )** : returns a number, the magnitude of the rotation.

<pre class="language-sluab"><code class="language-sluab">-- rotation.magnitude() written in SLua

local function magnitude(rot)
    return math.sqrt(rot.x * rot.x + rot.y * rot.y + rot.z * rot.z + rot.s * rot.s)
end</code></pre>

**rotation.normalize( rot )** : returns a rotation, the normalized version (unit rotation) of the rotation.

<pre class="language-sluab"><code class="language-sluab">-- rotation.normalize() written in SLua

local function normalize(rot)
    local mag = math.sqrt(rot.x * rot.x + rot.y * rot.y + rot.z * rot.z + rot.s * rot.s)  -- magnitude
    if mag > 0.0000001 then
        if math.abs(1 - mag) > 0.000001 then
            local oomag = 1 / mag
            return rotation(rot.x * oomag, rot.y * oomag, rot.z * oomag, rot.s * oomag)
        else
            return rot
        end
    end
    return rotation(0, 0, 0 ,1)
end</code></pre>

**rotation.slerp( rot1, rot2, interpolation )** : returns a rotation, uses Spherical Linear Interpolation to calculate a smooth rotation between a start rotation and a target rotation based on a percent (interpolation between 0 and 1).

<pre class="language-sluab"><code class="language-sluab">-- rotation.slerp() written in SLua

local function slerp(a, b, u)
    local cos_t = a.x * b.x + a.y * b.y + a.z * b.z + a.s * b.s  -- dot product

    local bflip = false
    if cos_t < 0.0 then
        cos_t = -cos_t
        bflip = true
    end

    local alpha, beta
    if (1 - cos_t) < 0.00001 then
        beta = 1 - u
        alpha = u
    else
        local theta = math.acos(cos_t)
        local sin_t = math.sin(theta)
        beta = math.sin(theta - u * theta) / sin_t
        alpha = math.sin(u * theta) / sin_t
    end

    if bflip then
        beta = -beta
    end

    return rotation(
        beta * a.x + alpha * b.x,
        beta * a.y + alpha * b.y,
        beta * a.z + alpha * b.z,
        beta * a.s + alpha * b.s
    )
end</code></pre>

**rotation.tofwd( rot )** : returns a vector, the Forward vector (local X-axis) of the rotation.
- same as ll.Rot2Fwd( rot )

**rotation.toleft( rot )** : returns a vector, the Left vector (local Y-axis) of the rotation.
- same as ll.Rot2Left( rot )

**rotation.toup( rot )** : returns a vector, the Up vector (local Z-axis) of the rotation.
- same as ll.Rot2Up( rot )

**rotation.identity** : returns the identity rotation.
- same as ZERO_ROTATION

### Rotations in tables

*rotation* is a reference type. Its value is stored on the memory heap, and variables or table nodes store a reference to this memory location.

When we use a rotation as a key in a table its reference is stored in the table. When we access the table, SLua looks for the reference and not for its value.

<pre class="language-sluab"><code class="language-sluab">-- rotations as table keys
local t = {}

-- storing a rotation
t[rotation(1, 0, 0, 0)] = true
print(t[rotation(1, 0, 0, 0)])  -- > nil
for k, v in t do
    print(k, v)
end
-- > <1, 0, 0, 0>    true

-- removing the rotation by its value
-- but rotation() creates a new rotation with a new reference
-- the new reference is not in the table and setting to nil does nothing
t[rotation(1, 0, 0, 0)] = nil
for k, v in t do
    print(k, v)
end
-- > <1, 0, 0, 0>    true

-- updating the rotation by its value
-- but again, it's a different reference
-- instead of updating, a new key is created with a rotation of the same value
t[rotation(1, 0, 0, 0)] = true
print(t[rotation(1, 0, 0, 0)])  -- > nil
for k, v in t do
    print(k, v)
end
-- > <1, 0, 0, 0>    true
-- > <1, 0, 0, 0>    true</code></pre>

We can solve this by storing the rotations as strings:
<pre class="language-sluab"><code class="language-sluab">-- rotations (as strings) as table keys
local t = {}

-- storing the rotation as string
t[tostring(rotation(1, 0, 0, 0))] = true
print(t[tostring(rotation(1, 0, 0, 0))])  -- > true
for k, v in t do
    print(torotation(k), v)
end
-- > <1, 0, 0, 0>    true

-- removing the rotation
t[tostring(rotation(1, 0, 0, 0))] = nil
for k, v in t do
    print(torotation(k), v)
end
-- >

-- storing again
t[tostring(rotation(1, 0, 0, 0))] = true
-- updating the rotation
t[tostring(rotation(1, 0, 0, 0))] = true
print(t[tostring(rotation(1, 0, 0, 0))])  -- > true
for k, v in t do
    print(torotation(k), v)
end
-- > <1, 0, 0, 0>    true</code></pre>

*string* is also a reference type.

Why does it work with *string* and not with *rotation*?

This works because *string* uses string interning (explained here [string interning](moving-strings#string-interning)). All strings with the same value use the same reference.

Another solution is to use a metatable:
<pre class="language-sluab"><code class="language-sluab">-- rotations (with a metatable) as table keys
local rotation_mt = {
    __index = function(t, key)  -- not found in the table when reading
        for k, v in t do
            if k == key then
                return v  -- return the value if the key is in the table
            end
        end
        return nil -- otherwise return nil
    end,
    __newindex = function(t, key, val)  -- not found in the table when writing
        for k, v in t do
            if k == key then
                t[k] = val  -- update the value if the key is in the table
                return
            end
        end
        rawset(t, key, val)  -- otherwise create a new key
    end
}

local t = setmetatable({}, rotation_mt)

-- storing a rotation
t[rotation(1, 0, 0, 0)] = true
print(t[rotation(1, 0, 0, 0)])  -- > true  -- value from __index
for k, v in t do
    print(k, v)
end
-- > <1, 0, 0, 0>    true

-- removing the rotation
t[rotation(1, 0, 0, 0)] = nil  -- removed in __newindex
for k, v in t do
    print(k, v)
end
-- >

-- storing again
t[rotation(1, 0, 0, 0)] = true
-- updating the rotation
t[rotation(1, 0, 0, 0)] = true  -- updated in __newindex
print(t[rotation(1, 0, 0, 0)])  -- > true  -- value from __index
for k, v in t do
    print(k, v)
end
-- > <1, 0, 0, 0>    true</code></pre>

The operator == compares the references in reference types.

Why does it work with <code class="language-sluab">k == key</code> in the metatable but not when accessing the table with a rotation?

This works because a *rotation* is created with a metatable, with the metamethods: *__eq*, *__add*, *__sub*, *__mul*, *__div*, *__unm*, *__tostring*.

The operator == calls the *__eq* metamethod. Accessing a table only looks for the reference and doesn't use *__eq*.

Data types, like tables, can have metatables.
<pre class="language-sluab"><code class="language-sluab">-- just an example, don't do this!!!
local r1 = rotation(1, 0, 0, 0)
local r2 = rotation(1, 0, 0, 0)
local r3 = rotation(0, 1, 0, 0)

print(getmetatable(r1).__eq(r1, r2))  -- > true
print(getmetatable(r1).__eq(r2, r3))  -- > false</code></pre>

A rotation uses 16 bytes in memory and another 16 bytes for its reference stored in a table or a variable.

Each call to *rotation()* creates a new reference, which consumes additional memory:
<pre class="language-sluab"><code class="language-sluab">local t = {}
local m = ll.GetUsedMemory()

for i = 1, 16 do
    table.insert(t, (select(math.random(3), rotation(0.707, 0, 0, 0.707), rotation(0, 0.707, 0, 0.707), rotation(0, 0, 0.707, 0.707))))
end

print(ll.GetUsedMemory() - m)  -- > 512 (16*16 indexes + 16*16 rotations)</code></pre>

Storing rotations that are used several times in variables saves memory:
<pre class="language-sluab"><code class="language-sluab">local t = {}
local m = ll.GetUsedMemory()

local X90 = rotation(0.707, 0, 0, 0.707)
local Y90 = rotation(0, 0.707, 0, 0.707)
local Z90 = rotation(0, 0, 0.707, 0.707)

for i = 1, 16 do
    table.insert(t, (select(math.random(3), X90, Y90, Z90)))
end

print(ll.GetUsedMemory() - m)  -- > 304  (16*16 indexes + 16*3 rotations)</code></pre>
