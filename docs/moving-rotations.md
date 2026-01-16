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
end
</code></pre>

**rotation.tofwd( rot )** : returns a vector, the Forward vector (local X-axis) of the rotation.
- same as ll.Rot2Fwd( rot )

**rotation.toleft( rot )** : returns a vector, the Left vector (local Y-axis) of the rotation.
- same as ll.Rot2Left( rot )

**rotation.toup( rot )** : returns a vector, the Up vector (local Z-axis) of the rotation.
- same as ll.Rot2Up( rot )

**rotation.identity** : returns the identity rotation.
- same as ZERO_ROTATION
