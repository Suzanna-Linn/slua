---
layout: default
title: Vectors
slua_beta: true
---

### Vectors

**vector()** creates a vector from its components: <code class="language-sluab">myVec = vector(50, 50, 20)</code>.

- It's not possible to assign a value to a component. We need to create a new vector.
- We can get a component from the return value of a function, not only from a variable.
- Components are stored in 32 bits floats.

<pre class="language-sluab"><code class="language-sluab">-- vectors

local myVec = vector(50, 50, 0)

myVec = vector(myVec.x, myVec.y, 20)  -- we can't assign a value to a component

local posZ = ll.GetPos().z</code></pre>

**tovector()** creates a vector from a string: <code class="language-slua">myVec = tovector("<50, 50, 20>")</code>

### The vector library

The SLua vector internally uses a Luau vector and its library. We can't use the :method notation, we have to call them on vector:

**vector.create( x, y, z )** : creates a new vector.
- same as vector( x, y, z )

**vector.magnitude( vec )** : returns a number, the magnitude of the vector.
- same as ll.VecMag( vec ).
  - **vector.magnitude( vec1 - vec2 )** : returns a number, the distance between the vectors.
    - same as ll.VecDist( vec1, vec2 )

**vector.normalize( vec )** : returns a vector, the normalized version (unit vector) of the vector.
- same as ll.VecNorm( vec ).

**vector.dot( vec1, vec2 )** : returns a number, the dot product of the vectors.
- same as vec1 * vec2 in LSL (but not in SLua).

**vector.cross( vec1, vec2 )** : returns a vector, the cross product of the vectors.
- same as vec1 % vec2 in LSL and SLua.

**vector.angle( vec1, vec2, axis )** : returns a number, the angle between the vectors in radians. The axis, if specified, is used to determine the sign of the angle.

<pre class="language-sluab"><code class="language-sluab">-- vector.angle() written in SLua
local function angle(a, b, axis)
    local cross = vector.cross(a, b)
    local sinA = vector.magnitude(cross)
    local cosA = vector.dot(a, b)
    local angle = math.atan2(sinA, cosA)
    if axis then
        if vector.dot(cross, axis) < 0 then
            angle = -angle
        end
    end
    return angle
end</code></pre>

### Vector operators

**vec1 * vec2**

In LSL is the dot product, in SLua multiplies the components:
- <code class="language-slua">print( vector( 3, 4, 5) * vector ( 10, 10, 10 ) )  -- > < 30, 40, 50 ></code>

In LSL this:
- <code class="language-lsl">float dotProduct = myVec1 * myVec2;  // LSL</code>  
is this in SLua:
- <code class="language-sluab">local dotProduct = vector.dot(myVec1, myVec2)  -- SLua</code>

SLua has added the division, that divides the components, and doesn't exist in LSL:
- <code class="language-sluab">print( vector( 12, 6, 3) / vector ( 3, 2, 1 ) )  -- > < 4, 3, 3 ></code>
