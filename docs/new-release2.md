---
layout: default
title: New Release
slua_beta: true
---

## What is new in the release 2026-07-16

There is a new SLua release in the SLua regions on the Beta Grid!

I’ve gathered all the info I could find about the changes coming in this release.

Scripts don't need changes neither to be recompiled to work with this release.

*(this page updated on Monday, July 20th)*

<style>
    table {
        width: max-content;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        font-size: 14px;
        margin: 20px 0;
    }

    th,
    td {
        border: 1px solid #cccccc;
        padding: 5px 10px;
        text-align: left;
        white-space: nowrap;
    }

    th {
        font-weight: bold;
        text-align: center;
    }

    .changed {
        background-color: #ffebeb;
        color: #d9383a;
        padding: 3px 8px;
        border-radius: 3px;
        font-weight: bold;
        font-size: 11px;
        display: inline-block;
    }
</style>

### LLTimers

The behavior of **LLTimers** has changed: it no longer attempts to catch up on missed ticks when the delay is under 2 seconds.

To prevent timing drift, **LLTimers** normally tries to preserve the scheduled cadence (calculated as previous schedule + interval). However, a timer event can be delayed if the script is executing other events, or if the script is paused and resumed (e.g., during teleports, region crossings, attachments/detachments, rez/derez events, or region restarts).

When a delay occurs:
- If the next scheduled run time is in the future (relative to the current time), the original cadence is preserved.
- If the next scheduled run time is already in the past, the timer does not fire repeatedly in quick succession to catch up. Instead, it resets its cadence relative to the current time (now + interval).

Next timer in the future, cadence preserved:
<pre class="language-sluab"><code class="language-sluab">-- pause (a teleport)
  
LLTimers:every(5, function(expected, interval)
    print(string.format("%18.15f%5.1f%20.15f", expected, interval, ll.GetTime()))
end)
--[[
    expected time     int       current time
   5.667029000003822  5.0   5.689430999977048
  10.667029000003822  5.0  10.689374000008684
  15.667029000003822  5.0  15.689446999982465
( a teleport here )
  20.667029000003822  5.0  22.911421999975573
( next timer in the future, cadence preserved)
  25.667029000003822  5.0  25.689406000019517
  30.667029000003822  5.0  30.689406000019517
]]</code></pre>

Next timer in the past, cadence reset, no catch-up:
<pre class="language-sluab"><code class="language-sluab">-- pause (a teleport)
  
LLTimers:every(1, function(expected, interval)
    print(string.format("%18.15f%5.1f%20.15f", expected, interval, ll.GetTime()))
end)
--[[
    expected time     int       current time
   2.911445999983698  1.0   2.933622999989893
   3.911445999983698  1.0   3.933587000006810
   4.911445999983698  1.0   4.933663000003435
( a teleport here )
   5.911445999983698  1.0   8.111338999995496
( next timer in the past, cadence reset)
   9.111338999995496  1.0   9.111368999991100
  10.111338999995496  1.0  10.133544999989681
]]</code></pre>

### Metamethod __call

The **__call** metamethod is never used as an iterator.

While Luau maintains this behavior to preserve backwards compatibility with legacy custom iterators, it is not necessary in SLua.

Previously, to use generalized iteration on a table that implemented a **__call** metamethod, we had to explicitly define an **__iter** metamethod (such as <code class="language-sluab">__iter = pairs</code>)

### llprim library

The new **llprim** library is designed to bridge the gap between LSL's flat, list-based parameter structures and Lua’s advamced data structures.

The **llprim** library introduces structured alternatives, such as a fluent builder interface and dictionary tables, which make script configurations cleaner, more readable, and easier to manipulate dynamically.

Currently it has:
- **llprim.ParamsSetter** : A builder class that wraps  **ll.SetLinkPrimitiveParamsFast()** (as well as **SetPrimitiveParams()** and **SetLinkPrimitiveParams()**), enabling method chaining.
- **llprim.setMedia()** : A dictionary-based wrapper for **ll.SetLinkMedia()** and **ll.SetPrimMediaParams()**
- **llprim.setParticleSystem()** : A dictionary-based wrapper for **ll.LinkParticleSystem()** and **ll.ParticleSystem()**

The **llprim** library doesn't add new functionality but allows us to work in a more Lua way.

#### llprim.ParamsSetter

Wrapper of **ll.SetLinkPrimitiveParamsFast()** (and also **SetPrimitiveParams()** and **SetLinkPrimitiveParams()**)

**llprim.ParamsSetter** is a builder class that simplifies the construction of primitive parameter lists. Instead of manually assembling a flat table of **PRIM_** constants, we instantiate a helper object and chain descriptive methods together. 

Each method call appends its corresponding rule to an internal table and returns the helper object itself (**self**), enabling a fluent interface. The accumulated changes are deferred and then sent to the simulator atomically in a single native call when we invoke the **:apply()** method.

**Basic Usage and Immediate Application**

For simple modifications, we can instantiate the builder, chain the desired property changes, and apply them immediately. Each method has the same parameters as the constants:
<pre class="language-sluab"><code class="language-sluab">-- Simple use, apply params immediately
llprim.ParamsSetter.new()
  :targetLink(LINK_ROOT)
  :color(ALL_SIDES, vector(0,0,1), 1)
  :text("first", vector.one, 1)
  :apply()</code></pre>

**Deferred and Batch Construction**

Because the builder accumulates rules in an underlying table before execution, we do not have to apply changes immediately. We can define a builder, populate it dynamically inside loops or conditional blocks, and trigger the update atomically when ready. This is highly efficient, as it reduces the overhead of making multiple, separate LSL-style parameter calls:
<pre class="language-sluab"><code class="language-sluab">-- But we can also collect rules to build upon and apply later
-- Here we arrange the child links in a line above the root
local rules = llprim.ParamsSetter.new()

for i=2,ll.GetNumberOfPrims() do
  -- The method calls really just append an SPP rule then return **self**
  rules
    :targetLink(i)
    :pos(ll.GetPos() + vector(0,0,1 * i))
end

-- And we apply the changes atomically as one `ll.SetLinkPrimitiveParamsFast()` under the hood.
rules:apply()</code></pre>

**Manipulating the Rule Set**

Under the hood, a **ParamsSetter** instance is a standard Lua table array. This allows us to use library functions like **table.extend()** to merge rules from other sources, or to append raw LSL constants manually:
<pre class="language-sluab"><code class="language-sluab">-- We can use `table.extend()` to mash rules onto it from other lists or builders
table.extend(rules, {PRIM_PHYSICS, false})</code></pre>

**Cloning Configurations**

Since the builder is a table, we can duplicate an existing set of rules using **table.clone()**. This allows us to define a base template configuration and modify it for different target links or sides without rebuilding the entire parameter set from scratch:
<pre class="language-sluab"><code class="language-sluab">-- Cloning is fine too
local rules2 = table.clone(rules)
rules2
  :targetLink(LINK_THIS)
  :text("We can tack rules onto the clone", vector.one, 1.0)
  :apply()</code></pre>

**Coercing Tables into Builders**
If we have an existing raw parameter list, we do not need to rewrite it to use the fluent interface. By setting its metatable to **llprim.ParamsSetter**, we upgrade the table into a builder, gaining access to all of its chaining methods and the **:apply()** function.
<pre class="language-sluab"><code class="language-sluab">-- The source table can come from anywhere, we can just give it the metatable to turn it into a builder.
local someOtherTable: {any} = {PRIM_POSITION, ll.GetPos() + vector.one}

setmetatable(someOtherTable, llprim.ParamsSetter)

someOtherTable
  :text("And now it's a ParamsSetter", vector.one, 1)
  :apply()</code></pre>

**Method Name Mapping**

The methods available on **ParamsSetter** are derived from the standard **PRIM_** constants, with the prefix removed and in lowercase. Several have been shortened or updated to be more intuitive. Unused or deprecated constants have been excluded:
<table>
  <thead>
    <tr>
      <th>Constant Name</th>
      <th>Method Name</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PRIM_NAME</td>
      <td>name</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_DESC</td>
      <td>description</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_TYPE</td>
      <td>type</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_SLICE</td>
      <td>slice</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_PHYSICS_SHAPE_TYPE</td>
      <td>physics_shape_type</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MATERIAL</td>
      <td>physicsMaterial</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_PHYSICS</td>
      <td>physical</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_TEMP_ON_REZ</td>
      <td>temporary</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_PHANTOM</td>
      <td>phantom</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_POSITION</td>
      <td>pos</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_POS_LOCAL</td>
      <td>pos_local</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_ROTATION</td>
      <td>rot</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_ROT_LOCAL</td>
      <td>rot_local</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_SIZE</td>
      <td>size</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_TEXTURE</td>
      <td>texture</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_RENDER_MATERIAL</td>
      <td>render_material</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_TEXT</td>
      <td>text</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_COLOR</td>
      <td>color</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_BUMP_SHINY</td>
      <td>shinyBump</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_POINT_LIGHT</td>
      <td>point_light</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_REFLECTION_PROBE</td>
      <td>reflection_probe</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_FULLBRIGHT</td>
      <td>fullbright</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_FLEXIBLE</td>
      <td>flexible</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_TEXGEN</td>
      <td>texgen</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_GLOW</td>
      <td>glow</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_OMEGA</td>
      <td>omega</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_NORMAL</td>
      <td>normal</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_SPECULAR</td>
      <td>specular</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_ALPHA_MODE</td>
      <td>alpha_mode</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_LINK_TARGET</td>
      <td>targetLink</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_CAST_SHADOWS</td>
      <td>-</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Deprecated</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_LEGACY</td>
      <td>-</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Deprecated</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_ALLOW_UNSIT</td>
      <td>allow_unsit</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_SCRIPTED_SIT_ONLY</td>
      <td>scripted_sit_only</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_SIT_TARGET</td>
      <td>sit_target</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_PROJECTOR</td>
      <td>projector</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_CLICK_ACTION</td>
      <td>click_action</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_GLTF_BASE_COLOR</td>
      <td>gltf_base_color</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_GLTF_NORMAL</td>
      <td>gltf_normal</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_GLTF_EMISSIVE</td>
      <td>gltf_emissive</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_SIT_FLAGS</td>
      <td>sit_flags</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_DAMAGE</td>
      <td>damage</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_HEALTH</td>
      <td>health</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_COLLISION_SOUND</td>
      <td>collision_sound</td>
      <td style="text-align: center;"></td>
    </tr>
  </tbody>
</table>

#### llprim.setMedia()

Wrapper of **ll.SetLinkMedia()** and **ll.SetPrimMediaParams()**

The **llprim.setMedia()** function wraps the configuration of face media (Shared Media). Instead of passing a flat array of alternating **PRIM_MEDIA_** constants and values, this wrapper allows us to define the configuration using a structured Lua dictionary (a table with key-value pairs).

The function accepts three parameters:
- The target face number.
- A configuration dictionary table containing the media settings.
- An optional link target, which defaults to **LINK_THIS** if omitted.

This wrapper handles the necessary translation from dictionary keys to LSL media constants under the hood.

Be aware that any unrecognized keys in the dictionary are silently ignored during execution. Because the runtime does not throw a script error for invalid keys, typographical errors can be difficult to detect. Always double-check your spelling against the reference table:
<pre class="language-sluab"><code class="language-sluab">local link = nil

llprim.setMedia(0, {
    current_url          = "https://example.com/",
    home_url             = "https://example.com/",
    auto_play            = true,
    auto_loop            = false,
    controls             = PRIM_MEDIA_CONTROLS_STANDARD,
    width_pixels         = 1024,
    height_pixels        = 768,
    whitelist_enable     = true,
    whitelist            = { "example.com", "*.example.com" },
    perms_interact       = PRIM_MEDIA_PERM_ANYONE,
    perms_control        = PRIM_MEDIA_PERM_OWNER,
}, link)

-- Note, the first parameter is the face.  The last parameter is the link number.  If link number is omitted 
-- it defaults to LINK_THIS</code></pre>

**Key Name Mapping**

The configuration keys map directly to the native **PRIM_MEDIA_** constants, with the prefix removed and in lowercase. Several have been shortened or updated to be more intuitive:
<table>
  <thead>
    <tr>
      <th>Constant Name</th>
      <th>Key Name</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PRIM_MEDIA_ALT_IMAGE_ENABLE</td>
      <td>alt_image_enable</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_CONTROLS</td>
      <td>controls</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_CURRENT_URL</td>
      <td>current_url</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_HOME_URL</td>
      <td>home_url</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_AUTO_LOOP</td>
      <td>auto_loop</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_AUTO_PLAY</td>
      <td>auto_play</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_AUTO_SCALE</td>
      <td>auto_scale</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_AUTO_ZOOM</td>
      <td>auto_zoom</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_FIRST_CLICK_INTERACT</td>
      <td>first_click_interact</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_WIDTH_PIXELS</td>
      <td>width</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_HEIGHT_PIXELS</td>
      <td>height</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_WHITELIST_ENABLE</td>
      <td>whitelist_enable</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_WHITELIST</td>
      <td>whitelist</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_PERMS_INTERACT</td>
      <td>perms_interact</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PRIM_MEDIA_PERMS_CONTROL</td>
      <td>perms_control</td>
      <td style="text-align: center;"></td>
    </tr>
  </tbody>
</table>

#### llprim.setParticleSystem()

Wrapper of **ll.LinkParticleSystem()** and **ll.ParticleSystem()**

The **llprim.setParticleSystem** function simplifies the creation and modification of particle effects. Instead of building the complex, flat list structure required by native particle functions, we pass a single dictionary of properties.

The function takes two parameters:
- A configuration dictionary table containing the particle rules.
- An optional link target, which defaults to **LINK_THIS** if omitted.

This wrapper handles the necessary translation from dictionary keys to LSL particle system constants under the hood.

Be aware that any unrecognized keys in the dictionary are silently ignored during execution. Because the runtime does not throw a script error for invalid keys, typographical errors can be difficult to detect. Always double-check your spelling against the reference table:
<pre class="language-sluab"><code class="language-sluab">llprim.setParticleSystem({
    pattern       = PSYS_SRC_PATTERN_ANGLE_CONE,
    texture       = "da8e96f5-4ada-4f37-bd2c-cf3e68c49a42",
    color_begin   = vector(1, 0.6, 0.1),
    color_end     = vector(1, 0.1, 0),
    alpha_begin   = 1.0,
    alpha_end     = 0.0,
    scale_begin   = vector(0.1, 0.1, 0),
    scale_end     = vector(0.4, 0.4, 0),
    glow_begin    = 0.5,
    glow_end      = 0.0,
    accel         = vector(0, 0, 0.5),
    burst_speed_min = 0.5,
    burst_speed_max = 1.5,
    burst_rate    = 0.05,
    burst_count   = 5,
    burst_radius  = 0.1,
    src_max_age   = 0,     -- 0 = continuous
    part_max_age  = 3.0,
    color_interp  = true,
    scale_interp  = true,
    emissive      = true,
    wind          = false,
}, link)

-- note link is an optional parameter.  If missing it defaults to LINK_THIS</code></pre>

**Key Name Mapping**

The configuration keys map directly to the native **PSYS_** constants, with the prefix removed and in lowercase. Several have been shortened or updated to be more intuitive:
<table>
  <thead>
    <tr>
      <th>Constant Name</th>
      <th>Key Name</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PSYS_PART_FLAGS</td>
      <td>part_flags</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_PATTERN</td>
      <td>src_pattern</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_BURST_RADIUS</td>
      <td>src_burst_radius</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_ANGLE_BEGIN</td>
      <td>src_angle_begin</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_ANGLE_END</td>
      <td>src_angle_end</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_INNERANGLE</td>
      <td>angle_inner</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_SRC_OUTERANGLE</td>
      <td>angle_outer</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_SRC_TARGET_KEY</td>
      <td>src_target_key</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_PART_START_COLOR</td>
      <td>color_begin</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_END_COLOR</td>
      <td>color_end</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_START_ALPHA</td>
      <td>alpha_begin</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_END_ALPHA</td>
      <td>alpha_end</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_START_SCALE</td>
      <td>scale_begin</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_END_SCALE</td>
      <td>scale_end</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_SRC_TEXTURE</td>
      <td>src_texture</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_PART_START_GLOW</td>
      <td>glow_begin</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_END_GLOW</td>
      <td>glow_end</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>PSYS_PART_BLEND_FUNC_SOURCE</td>
      <td>part_blend_func_source</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_PART_BLEND_FUNC_DEST</td>
      <td>part_blend_func_dest</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_MAX_AGE</td>
      <td>src_max_age</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_PART_MAX_AGE</td>
      <td>part_max_age</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_BURST_RATE</td>
      <td>src_burst_rate</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_BURST_PART_COUNT</td>
      <td>src_burst_part_count</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_ACCEL</td>
      <td>src_accel</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_OMEGA</td>
      <td>src_omega</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_BURST_SPEED_MIN</td>
      <td>src_burst_speed_min</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>PSYS_SRC_BURST_SPEED_MAX</td>
      <td>src_burst_speed_max</td>
      <td style="text-align: center;"></td>
    </tr>
  </tbody>
</table>

### Parameters as dictionaries

To complement the helper functions in the **llprim** library, several native **LL** functions have been enhanced to natively accept dictionaries as parameters. This allows us to write clean, structured key-value tables directly inside standard LSL function calls, eliminating the need to construct or flatten arrays.

#### ll.SetPrimMediaParams() and ll.SetLinkMedia()

The  media functions **ll.SetPrimMediaParams()** and **ll.SetLinkMedia()** accept a dictionary as their configuration parameter. This dictionary uses the exact same keys as the **llprim.setMedia()** wrapper:
<pre class="language-sluab"><code class="language-sluab">ll.SetLinkMedia(0, 0, {
    current_url          = "https://example.com/",
    home_url             = "https://example.com/",
    auto_play            = true,
    auto_loop            = false,
    controls             = PRIM_MEDIA_CONTROLS_STANDARD,
    width                = 1024,
    height               = 768,
    whitelist_enable     = true,
    whitelist            = { "example.com", "*.example.com" },
    perms_interact       = PRIM_MEDIA_PERM_ANYONE,
    perms_control        = PRIM_MEDIA_PERM_OWNER,
})</code></pre>

The keys used in the dictionary table are the same as **llprim.setMedia()**.

#### ll.ParticleSystem() and ll.LinkParticleSystem()

**ll.ParticleSystem()** and **ll.LinkParticleSystem()**  accept a structured dictionary instead of a flat list. The keys and rules are identical to those defined for **llprim.setParticleSystem()**:
<pre class="language-sluab"><code class="language-sluab">ll.LinkParticleSystem(0, {
    pattern       = PSYS_SRC_PATTERN_ANGLE_CONE,
    texture       = "da8e96f5-4ada-4f37-bd2c-cf3e68c49a42",
    color_begin   = vector(1, 0.6, 0.1),
    color_end     = vector(1, 0.1, 0),
    alpha_begin   = 1.0,
    alpha_end     = 0.0,
    scale_begin   = vector(0.1, 0.1, 0),
    scale_end     = vector(0.4, 0.4, 0),
    glow_begin    = 0.5,
    glow_end      = 0.0,
    accel         = vector(0, 0, 0.5),
    burst_speed_min = 0.5,
    burst_speed_max = 1.5,
    burst_rate    = 0.05,
    burst_count   = 5,
    burst_radius  = 0.1,
    src_max_age   = 0,     -- 0 = continuous
    part_max_age  = 3.0,
    color_interp  = true,
    scale_interp  = true,
    emissive      = true,
    wind          = false,
})</code></pre>

The keys used in the dictionary table are the same as **llprim.setParticleSystem()**.

#### ll.HTTPRequest()

Constructing metadata, headers, and options for HTTP requests in LSL can be cumbersome due to the alternating parameter list format. In SLua, **ll.HTTPRequest()** accepts a structured dictionary for its options parameter. 

This dictionary allows us to configure HTTP methods, custom headers, content types, and validation settings in an organized, readable block.

CSV strings and key-value map strings can be written as Lua arrays and dictionaries.

Be aware that any unrecognized keys in the dictionary are silently ignored during execution. Because the runtime does not throw a script error for invalid keys, typographical errors can be difficult to detect. Always double-check your spelling against the reference table:
<pre class="language-sluab"><code class="language-sluab">local request_id =ll.HTTPRequest(
    "https://api.example.com/data",
    {
        method          = "POST",
        mimetype        = "application/json",
        verify_cert     = true,
        extended_error  = true,
        custom_header   = {
            ["X-Api-Key"]        = "my-secret-key",
            ["X-Request-Source"] = "second-life",
        },
        accept          = { "application/json", "text/plain" },
    },
    '{"hello": "world"}'
)

print(request_id)</code></pre>

There is no new library function to wrap **ll.HTTPRequest()**.

**Key Name Mapping**

The configuration keys map directly to the native **HTTP_** constants, with the prefix removed and in lowercase. Several have been shortened or updated to be more intuitive:
<table>
  <thead>
    <tr>
      <th>Constant Name</th>
      <th>Key Name</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTTP_METHOD</td>
      <td>method</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_MIMETYPE</td>
      <td>mimetype</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_BODY_MAXLENGTH</td>
      <td>max_body_length</td>
      <td style="text-align: center; vertical-align: middle;">
        <span class="changed">Changed</span>
      </td>
    </tr>
    <tr>
      <td>HTTP_VERIFY_CERT</td>
      <td>verify_cert</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_VERBOSE_THROTTLE</td>
      <td>verbose_throttle</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_CUSTOM_HEADER</td>
      <td>custom_header</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_PRAGMA_NO_CACHE</td>
      <td>pragma_no_cache</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_USER_AGENT</td>
      <td>user_agent</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_ACCEPT</td>
      <td>accept</td>
      <td style="text-align: center;"></td>
    </tr>
    <tr>
      <td>HTTP_EXTENDED_ERROR</td>
      <td>extended_error</td>
      <td style="text-align: center;"></td>
    </tr>
  </tbody>
</table>
