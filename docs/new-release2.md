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



### Metamethod __call



### llprim library



#### llprim.ParamsSetter()

<pre class="language-sluab"><code class="language-sluab"></code></pre>

<pre class="language-sluab"><code class="language-sluab"></code></pre>

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

#### llprim.setLinkMedia()

<pre class="language-sluab"><code class="language-sluab"></code></pre>

#### llprim.setParticleSystem()

<pre class="language-sluab"><code class="language-sluab"></code></pre>
 
### Parameters as dictionaries

#### ll.SetPrimMediaParams() and ll.SetLinkMedia()

<pre class="language-sluab"><code class="language-sluab"></code></pre>

#### ll.ParticleSystem() and ll.LinkParticleSystem()

<pre class="language-sluab"><code class="language-sluab"></code></pre>

#### ll.HTTPRequest()

<pre class="language-sluab"><code class="language-sluab"></code></pre>




<pre class="language-sluab"><code class="language-sluab"></code></pre>
