---
layout: default
title: list params json
slua_beta: true
json : true
---

# Functions with lists/tables as parameter

<div id="filter-controls"></div>

<style>
  #filter-controls {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fcfcfc;
    box-sizing: border-box;
  }
  .filter-btn {
    background: linear-gradient(135deg, #f6e7ff, #e7f0ff);
    border: 1px solid #c7b7ff;
    color: #5b4b8a;
  
    padding: 6px 12px;
    border-radius: 8px;
  
    cursor: pointer;
    font-family: monospace;
    font-size: 0.85em;
  
    transition:
      background 0.25s,
      border-color 0.25s,
      color 0.25s,
      transform 0.15s,
      box-shadow 0.2s;
  }
  
  .filter-btn:hover {
    background: linear-gradient(135deg, #efd6ff, #d8eaff);
    border-color: #9c7dff;
    color: #45306f;
  
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(120, 100, 220, 0.18);
  }
  
  .filter-btn:active {
    transform: translateY(0);
  }
  
  .filter-btn.active {
    background: linear-gradient(135deg, #8b5cf6, #4f8cff);
    border-color: #6d3df0;
    color: white;
  
    box-shadow: 0 4px 12px rgba(79, 140, 255, 0.25);
  }
</style>

<pre><code class="language-json">
{
  "llCastRay": [
    {
      "constant": "RC_REJECT_TYPES",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "filter"
        }
      ],
      "default": "0",
      "description": "Mask used to ignore specific types of objects (and avatars)."
    },
    {
      "constant": "RC_DATA_FLAGS",
      "value": "2",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "default": "0",
      "description": "Described in the RC_DATA_FLAGS section."
    },
    {
      "constant": "RC_MAX_HITS",
      "value": "3",
      "parameters": [
        {
          "type": "integer",
          "name": "max_hits"
        }
      ],
      "default": "1",
      "description": "Maximum number of hits to return. Maximum value is 256. To avoid performance issues, keep it small."
    },
    {
      "constant": "RC_DETECT_PHANTOM",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "detect_phantom"
        }
      ],
      "default": "FALSE",
      "description": "Set to TRUE (or nonzero) to detect phantom AND volume detect objects. It is not possible to detect only phantom objects or only volume detect objects. If set to TRUE, phantom and volume detect objects will always be detected, even if RC_REJECT_NONPHYSICAL and RC_REJECT_PHYSICAL are set in RC_REJECT_TYPES."
    }
  ],
  "llCreateCharacter": [
    {
      "constant": "CHARACTER_DESIRED_SPEED",
      "value": "1",
      "default": "6",
      "description": "Speed of pursuit in meters per second.",
      "range": "0.2, 40.0"
    },
    {
      "constant": "CHARACTER_RADIUS",
      "value": "2",
      "default": "",
      "description": "Set collision capsule radius.",
      "range": "0.125, 5.0"
    },
    {
      "constant": "CHARACTER_LENGTH",
      "value": "3",
      "default": "",
      "description": "Set collision capsule length\nIf the value is less than twice the radius plus 0.1m, it will be set to twice the radius plus 0.1m.",
      "range": "(0.0, 10.0"
    },
    {
      "constant": "CHARACTER_ORIENTATION",
      "value": "4",
      "default": "VERTICAL",
      "description": "Set the character orientation.",
      "range": "VERTICAL, HORIZONTAL"
    },
    {
      "constant": "TRAVERSAL_TYPE",
      "value": "7",
      "default": "TRAVERSAL_TYPE_SLOW",
      "description": "Controls the speed at which characters moves on terrain that is less than 100% walkable will move faster (e.g., a cat crossing a street) or slower (e.g., a car driving in a swamp).\nTo use _FAST or _SLOW, you must specify a CHARACTER_TYPE.",
      "range": "TRAVERSAL_TYPE_FAST, TRAVERSAL_TYPE_SLOW, TRAVERSAL_TYPE_NONE"
    },
    {
      "constant": "CHARACTER_TYPE",
      "value": "6",
      "default": "CHARACTER_TYPE_NONE",
      "description": "Specifies which walkability coefficient will be used by this character.",
      "range": "CHARACTER_TYPE_A, CHARACTER_TYPE_B, CHARACTER_TYPE_C, CHARACTER_TYPE_D, CHARACTER_TYPE_NONE"
    },
    {
      "constant": "CHARACTER_AVOIDANCE_MODE",
      "value": "5",
      "default": "AVOID_CHARACTERS | AVOID_DYNAMIC_OBSTACLES",
      "description": "Allows you to specify that a character should not try to avoid other characters, should not try to avoid dynamic obstacles (relatively fast moving objects and avatars), or both. This is framed in the positive sense (`[[CHARACTER_AVOIDANCE_MODE](https://wiki.secondlife.com/wiki/CHARACTER_AVOIDANCE_MODE), [AVOID_CHARACTERS](https://wiki.secondlife.com/w/index.php?title=AVOID_CHARACTERS&action=edit&redlink=1)]` would create a character that avoided other characters but not agents or moving vehicles). Setting this parameter to AVOID_NONE causes the character to not avoid either category.",
      "range": "Combinable Flags:AVOID_CHARACTERS, AVOID_DYNAMIC_OBSTACLES, AVOID_NONE"
    },
    {
      "constant": "CHARACTER_MAX_ACCEL",
      "value": "8",
      "default": "20",
      "description": "The character's maximum acceleration rate.",
      "range": "0.5, 40.0"
    },
    {
      "constant": "CHARACTER_MAX_DECEL",
      "value": "9",
      "default": "30",
      "description": "The character's maximum deceleration rate.",
      "range": "0.5, 60.0"
    },
    {
      "constant": "CHARACTER_DESIRED_TURN_SPEED",
      "value": "12",
      "default": "6",
      "description": "The character's maximum speed while turning--note that this is only loosely enforced (i.e., a character may turn at higher speeds under certain conditions)",
      "range": "0.02, 40.0"
    },
    {
      "constant": "CHARACTER_MAX_TURN_RADIUS",
      "value": "10",
      "default": "1.25",
      "description": "The character's turn radius when traveling at CHARACTER_DESIRED_TURN_SPEED",
      "range": "0.1, 10.0"
    },
    {
      "constant": "CHARACTER_MAX_SPEED",
      "value": "13",
      "default": "20",
      "description": "The character's maximum speed. Affects speed when avoiding dynamic obstacles and when traversing low-walkability objects in TRAVERSAL_TYPE_FAST mode.",
      "range": "1, 40.0"
    },
    {
      "constant": "CHARACTER_ACCOUNT_FOR_SKIPPED_FRAMES",
      "value": "14",
      "default": "TRUE",
      "description": "TRUE matches pre-existing behavior. If set to FALSE, character will not attempt to catch up on lost time when pathfinding performance is low, potentially providing more reliable movement (albeit while potentially appearing to be more stuttery).",
      "range": "TRUE or FALSE"
    },
    {
      "constant": "CHARACTER_STAY_WITHIN_PARCEL",
      "value": "15",
      "default": "Depends*",
      "description": "FALSE matches traditional behavior. If set to TRUE, treat the parcel boundaries as one-way obstacles (will re-enter but can't leave on it's own).",
      "range": "TRUE or FALSE"
    }
  ],
  "llExecCharacterCmd": [
    {
      "constant": "CHARACTER_CMD_JUMP",
      "value": "0x1",
      "description": "Makes the character jump.The option list is required to start with a height parameter: [float height]<table><tbody><tr><td>• float</td><td>height</td><td>–</td><td>height to jump, between 0.1m and 2.0m</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "CHARACTER_CMD_SMOOTH_STOP",
      "value": "0x2",
      "description": "Stops any current pathfinding operation in a smooth like fashion."
    },
    {
      "constant": "CHARACTER_CMD_STOP",
      "value": "0x0",
      "description": "Stops any current pathfinding operation."
    }
  ],
  "llGetClosestNavPoint": [
    {
      "constant": "GCNP_RADIUS",
      "value": "0",
      "parameters": [
        {
          "type": "float",
          "name": "distance"
        }
      ],
      "default": "20.0",
      "description": "Limits how far out to search for a navigation point."
    },
    {
      "constant": "GCNP_STATIC",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "use_static_mesh"
        }
      ],
      "default": "FALSE",
      "description": "Specifies whether the test should use the static or dynamic nav mesh. In the static case, all dynamic obstacles are ignored."
    },
    {
      "constant": "CHARACTER_TYPE",
      "value": "6",
      "parameters": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "default": "CHARACTER_TYPE_NONE",
      "description": "Filters nav points by eliminating nav mesh faces which are 0% walkable for the specified character type. In the default CHARACTER_TYPE_NONE case, all nav mesh faces are included."
    }
  ],
  "llGetEnvironment": [
    {
      "constant": "SKY_TRACKS",
      "value": "15",
      "return": [
        {
          "type": "float",
          "name": "sky2"
        },
        {
          "type": "float",
          "name": "sky3"
        },
        {
          "type": "float",
          "name": "sky4"
        }
      ],
      "description": "Altitudes for sky transitions in the region."
    },
    {
      "constant": "SKY_AMBIENT",
      "value": "0",
      "return": [
        {
          "type": "vector",
          "name": "ambient_color"
        }
      ],
      "description": "The ambient color of the environment."
    },
    {
      "constant": "SKY_TEXTURE_DEFAULTS",
      "value": "1",
      "return": [
        {
          "type": "integer",
          "name": "bloom_is_default"
        },
        {
          "type": "integer",
          "name": "halo_is_default"
        },
        {
          "type": "integer",
          "name": "rainbow_is_default"
        }
      ],
      "description": "Checks if the textures are currently set to use the default. For default values, the returned integer is 1. If the texture uses something other than the default, the returned value is 0."
    },
    {
      "constant": "SKY_CLOUDS",
      "value": "2",
      "return": [
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "coverage"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "float",
          "name": "variance"
        },
        {
          "type": "vector",
          "name": "scroll"
        },
        {
          "type": "vector",
          "name": "density"
        },
        {
          "type": "vector",
          "name": "detail"
        },
        {
          "type": "integer",
          "name": "is_default"
        }
      ],
      "description": "Environmental cloud information.\ncolor: The color used for the clouds.\ncoverage: The coverage percentage.\nscale: The scaling applied to the cloud textures.\nvariance: A randomizing factor applied to the main cloud layer\nscroll: The scroll speed of the clouds.\nX is east/west\nY is north/south\nZ is unused\ndensity: The X/Y and D parameter used to generate cloud density\ndetail: The X/Y and D parameter used to generate cloud details.\nis_default: 1 if the clouds are using the default texture."
    },
    {
      "constant": "SKY_DOME",
      "value": "4",
      "return": [
        {
          "type": "float",
          "name": "offset"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "max_altitude"
        }
      ],
      "description": "Sky dome information.\noffset\nradius\nmaximum altitude"
    },
    {
      "constant": "SKY_GAMMA",
      "value": "5",
      "return": [
        {
          "type": "float",
          "name": "gamma"
        }
      ],
      "description": "The gamma value applied to the scene.\nIn viewer versions 7.0+, this value has been repurposed into the 'HDR Scale' value in the EEP editor. (Thus, this will return the value of the HDR Scale slider)."
    },
    {
      "constant": "SKY_GLOW",
      "value": "6",
      "return": [
        {
          "type": "float",
          "name": "glow_size"
        },
        {
          "type": "float",
          "name": "glow_focus"
        }
      ],
      "description": "Glow applied to the sun and moon.\nsize of glow effect\nfocus of glow effect"
    },
    {
      "constant": "SKY_MOON",
      "value": "9",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "float",
          "name": "brightness"
        },
        {
          "type": "integer",
          "name": "is_default_texture"
        },
        {
          "type": "vector",
          "name": "direction"
        },
        {
          "type": "vector",
          "name": "ambient_color"
        },
        {
          "type": "vector",
          "name": "diffuse_color"
        }
      ],
      "description": "Detailed moon information\nrot: The current rotation applied to the moon.\nscale: The current scale applied to the moon's texture\nbrightness: The moon's brightness\nis_default_texture: 1 if the moon texture is set to the default. 0 otherwise\ndirection: A unit vector pointing at the moon.\nambient_color: The ambient color of the moon\ndiffuse_color: The diffuse color applied to the moon."
    },
    {
      "constant": "SKY_STAR_BRIGHTNESS",
      "value": "13",
      "return": [
        {
          "type": "float",
          "name": "brightness"
        }
      ],
      "description": ""
    },
    {
      "constant": "SKY_SUN",
      "value": "14",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "vector",
          "name": "sun_color"
        },
        {
          "type": "integer",
          "name": "is_default_texture"
        },
        {
          "type": "vector",
          "name": "direction"
        },
        {
          "type": "vector",
          "name": "ambient_color"
        },
        {
          "type": "vector",
          "name": "diffuse_color"
        }
      ],
      "description": "Detailed sun information\nrot: The current rotation applied to the sun.\nscale: The current scale applied to the sun's texture\nsun_color:\nis_default_texture: 1 if the sun texture is set to the default. 0 otherwise\ndirection: A unit vector pointing at the sun.\nambient_color: The ambient color of the sun.\ndiffuse_color: The diffuse color applied to the sun."
    },
    {
      "constant": "SKY_PLANET",
      "value": "10",
      "return": [
        {
          "type": "float",
          "name": "planet_radius"
        },
        {
          "type": "float",
          "name": "sky_bottom_radius"
        },
        {
          "type": "float",
          "name": "sky_top_radius"
        }
      ],
      "description": "Planet information used in rendering the sky\nplanet_radius\nsky_bottom_radius\nsky_top_radius"
    },
    {
      "constant": "SKY_REFRACTION",
      "value": "11",
      "return": [
        {
          "type": "float",
          "name": "moisture_level"
        },
        {
          "type": "float",
          "name": "droplet_radius"
        },
        {
          "type": "float",
          "name": "ice_level"
        }
      ],
      "description": "Sky refraction parameters for rainbows and optical effects.\nmoisture_level\ndroplet_radius\nice_level"
    },
    {
      "constant": "SKY_LIGHT",
      "value": "8",
      "return": [
        {
          "type": "vector",
          "name": "light_direction"
        },
        {
          "type": "vector",
          "name": "fade_color"
        },
        {
          "type": "vector",
          "name": "total_ambient"
        }
      ],
      "description": "Miscellaneous lighting values\nlight_direction: A unit vector indicating the direction of the dominant light source.\nfade_color: A color vector representing the current color of the light emitted from the dominant light source (in sRGB space).\ntotal_ambient: A color vector representing the current ambient color in use in the scene (in sRGB space)."
    },
    {
      "constant": "SKY_REFLECTION_PROBE_AMBIANCE",
      "value": "24",
      "return": [
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Minimum ambiance value for all reflection probes.\nrange = [0.0, 10.0]\nCaveat: This parameter will be supported in the upcoming GLTF Materials project. Currently it will only work in supported testing areas with a supported test viewer."
    },
    {
      "constant": "WATER_BLUR_MULTIPLIER",
      "value": "100",
      "return": [
        {
          "type": "float",
          "name": "multiplier"
        }
      ],
      "description": "Multiplier applied to blur the scene when under water."
    },
    {
      "constant": "WATER_FOG",
      "value": "101",
      "return": [
        {
          "type": "vector"
        },
        {
          "type": "float",
          "name": "density"
        },
        {
          "type": "float",
          "name": "modulation"
        }
      ],
      "description": "Fog parameters applied when underwater\ncolor: The color of the underwater fog\ndensity: Density exponent applied to the fog\nmodulation:"
    },
    {
      "constant": "WATER_FRESNEL",
      "value": "102",
      "return": [
        {
          "type": "float",
          "name": "offset"
        },
        {
          "type": "float",
          "name": "scale"
        }
      ],
      "description": "Fresnel scattering applied to the surface of the water.\noffset\nscale"
    },
    {
      "constant": "WATER_TEXTURE_DEFAULTS",
      "value": "103",
      "return": [
        {
          "type": "integer",
          "name": "normal_is_default"
        },
        {
          "type": "integer",
          "name": "transparent_is_default"
        }
      ],
      "description": "Checks if the textures are currently set to use the default. For default values the returned integer is 1, if the texture uses something other than the default this value is 0."
    },
    {
      "constant": "WATER_NORMAL_SCALE",
      "value": "104",
      "return": [
        {
          "type": "vector",
          "name": "scale"
        }
      ],
      "description": "Scaling applied to the water normal map."
    },
    {
      "constant": "WATER_REFRACTION",
      "value": "105",
      "return": [
        {
          "type": "float",
          "name": "scale_above"
        },
        {
          "type": "float",
          "name": "scale_below"
        }
      ],
      "description": "Refraction factors when looking through the surface of the water.\nscale_above\nscale_below"
    },
    {
      "constant": "WATER_WAVE_DIRECTION",
      "value": "106",
      "return": [
        {
          "type": "vector",
          "name": "large_wave"
        },
        {
          "type": "vector",
          "name": "small_wave"
        }
      ],
      "description": "Vector for the directions of the waves Y represents north/south and X represents movement east/west.\nlarge_wave: Large wave speed and direction.\nsmall_wave: Small wave speed and direction."
    },
    {
      "constant": "ENVIRONMENT_DAYINFO",
      "value": "200",
      "return": [
        {
          "type": "integer",
          "name": "day_length"
        },
        {
          "type": "integer",
          "name": "day_offset"
        },
        {
          "type": "float",
          "name": "secs_since_midnight"
        }
      ],
      "description": "Current time and day information\nday_length: Number of seconds in the environments day cycle.\nday_offset: Number of seconds day cycle is offset from GMT.\nsecs_since_midnight: Number of seconds elapsed since the last day cycle midnight."
    }
  ],
  "llGetLinkMedia": [
    {
      "constant": "PRIM_MEDIA_ALT_IMAGE_ENABLE",
      "value": "0",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets the default image state (the image that the user sees before a piece of media is active) for the chosen face. The default image is specified by Second Life's server for that media type.\nNote: This flag is not currently implemented."
    },
    {
      "constant": "PRIM_MEDIA_CONTROLS",
      "value": "1",
      "return": [
        {
          "type": "integer",
          "name": "control"
        }
      ],
      "description": "Gets the style of controls. Can be either PRIM_MEDIA_CONTROLS_STANDARD or PRIM_MEDIA_CONTROLS_MINI."
    },
    {
      "constant": "PRIM_MEDIA_CURRENT_URL",
      "value": "2",
      "return": [
        {
          "type": "string",
          "name": "current_url"
        }
      ],
      "description": "Gets the current url displayed on the chosen face. Changing this URL causes navigation. 1024 characters Max"
    },
    {
      "constant": "PRIM_MEDIA_HOME_URL",
      "value": "3",
      "return": [
        {
          "type": "string",
          "name": "home_url"
        }
      ],
      "description": "Gets the home url for the chosen face. 1024 characters max"
    },
    {
      "constant": "PRIM_MEDIA_AUTO_LOOP",
      "value": "4",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether auto-looping is enabled."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_PLAY",
      "value": "5",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether the media auto-plays when a Resident can view it."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_SCALE",
      "value": "6",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether auto-scaling is enabled. Auto-scaling forces the media to the full size of the texture."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_ZOOM",
      "value": "7",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether clicking the media triggers auto-zoom and auto-focus on the media."
    },
    {
      "constant": "PRIM_MEDIA_FIRST_CLICK_INTERACT",
      "value": "8",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether the first click interaction is enabled.\nNote: This flag appears not to work."
    },
    {
      "constant": "PRIM_MEDIA_WIDTH_PIXELS",
      "value": "9",
      "return": [
        {
          "type": "integer",
          "name": "width"
        }
      ],
      "description": "Gets the width of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_HEIGHT_PIXELS",
      "value": "10",
      "return": [
        {
          "type": "integer",
          "name": "height"
        }
      ],
      "description": "Gets the height of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST_ENABLE",
      "value": "11",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether navigation is restricted to URLs in PRIM_MEDIA_WHITELIST."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST",
      "value": "12",
      "return": [
        {
          "type": "string",
          "name": "CSV"
        }
      ],
      "description": "Gets the whitelist as a string of escaped, comma-separated URLs. This string can hold up to 64 URLs or 1024 characters, whichever comes first."
    },
    {
      "constant": "PRIM_MEDIA_PERMS_INTERACT",
      "value": "13",
      "return": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Gets the permissions mask that control who can interact with the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    },
    {
      "constant": "PRIM_MEDIA_PERMS_CONTROL",
      "value": "14",
      "return": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Gets the permissions mask that control who can see the media control bar above the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    }
  ],
  "llGetLinkPrimitiveParams": [
    {
      "constant": "PRIM_NAME",
      "value": "27",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "name"
        }
      ],
      "description": "Name: llGetObjectName"
    },
    {
      "constant": "PRIM_DESC",
      "value": "28",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "description"
        }
      ],
      "description": "Description: llGetObjectDesc"
    },
    {
      "constant": "PRIM_TYPE",
      "value": "9",
      "parameters": "",
      "return": "integer flag ] + flag_parameters",
      "description": "Gets the prim shape. [Would you like to know more?] [Hide"
    },
    {
      "constant": "PRIM_SLICE",
      "value": "35",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "slice"
        }
      ],
      "description": "Gets the prim's slice (a shape attribute)."
    },
    {
      "constant": "PRIM_PHYSICS_SHAPE_TYPE",
      "value": "30",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "description": "Gets the prim's physics shape type."
    },
    {
      "constant": "PRIM_MATERIAL",
      "value": "2",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "material"
        }
      ],
      "description": "Gets the prim's material. The material determines the default collision sound, sprite, friction coefficient and restitution coefficient."
    },
    {
      "constant": "PRIM_PHYSICS",
      "value": "3",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Physics status llGetStatus"
    },
    {
      "constant": "PRIM_TEMP_ON_REZ",
      "value": "4",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Temporary attribute"
    },
    {
      "constant": "PRIM_PHANTOM",
      "value": "5",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Phantom status llGetStatus"
    },
    {
      "constant": "PRIM_POSITION",
      "value": "6",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Position, llGetPos"
    },
    {
      "constant": "PRIM_POS_LOCAL",
      "value": "33",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Local position, llGetLocalPos"
    },
    {
      "constant": "PRIM_ROTATION",
      "value": "8",
      "parameters": "",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Global rotation, llGetRot"
    },
    {
      "constant": "PRIM_ROT_LOCAL",
      "value": "29",
      "parameters": "",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Local rotation, llGetLocalRot"
    },
    {
      "constant": "PRIM_SIZE",
      "value": "7",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "size"
        }
      ],
      "description": "Size, llGetScale"
    },
    {
      "constant": "PRIM_TEXTURE",
      "value": "17",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        }
      ],
      "description": "<table><tbody><tr><td>Texture:</td><td>llGetTexture</td><td></td></tr><tr><td>Repeats:</td><td>llGetTextureScale</td><td></td></tr><tr><td>Offset:</td><td>llGetTextureOffset</td><td></td></tr><tr><td>Rotation:</td><td>llGetTextureRot</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_RENDER_MATERIAL",
      "value": "49",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "render_material"
        }
      ],
      "description": "<table><tbody><tr><td>Material:</td><td>llGetRenderMaterial</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_TEXT",
      "value": "26",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "text"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "Floating Text: NA"
    },
    {
      "constant": "PRIM_COLOR",
      "value": "18",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "<table><tbody><tr><td>Alpha:</td><td>llGetAlpha</td><td></td></tr><tr><td>Color:</td><td>llGetColor</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_BUMP_SHINY",
      "value": "19",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "integer",
          "name": "shiny"
        },
        {
          "type": "integer",
          "name": "bump"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_FLEXIBLE",
      "value": "21",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "integer",
          "name": "softness"
        },
        {
          "type": "float",
          "name": "gravity"
        },
        {
          "type": "float",
          "name": "friction"
        },
        {
          "type": "float",
          "name": "wind"
        },
        {
          "type": "float",
          "name": "tension"
        },
        {
          "type": "vector",
          "name": "force"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_TEXGEN",
      "value": "22",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "integer",
          "name": "mode"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_POINT_LIGHT",
      "value": "23",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "linear_color"
        },
        {
          "type": "float",
          "name": "intensity"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "falloff"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space."
    },
    {
      "constant": "PRIM_REFLECTION_PROBE",
      "value": "44",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "float",
          "name": "ambiance"
        },
        {
          "type": "float",
          "name": "clip_distance"
        },
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the prim's reflection probe parameters."
    },
    {
      "constant": "PRIM_GLOW",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "float",
          "name": "intensity"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_OMEGA",
      "value": "32",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "axis"
        },
        {
          "type": "float",
          "name": "spinrate"
        },
        {
          "type": "float",
          "name": "gain"
        }
      ],
      "description": "llTargetOmega"
    },
    {
      "constant": "PRIM_NORMAL",
      "value": "37",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SPECULAR",
      "value": "36",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": "string texture, vector repeats, vector offsets, float rotation_in_radians, vector color, integer glossiness integer environment",
      "description": ""
    },
    {
      "constant": "PRIM_ALPHA_MODE",
      "value": "38",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "integer",
          "name": "alpha_mode"
        },
        {
          "type": "integer",
          "name": "mask_cutoff"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_LINK_TARGET",
      "value": "34",
      "parameters": [
        {
          "type": "integer",
          "name": "link_target"
        }
      ],
      "return": "",
      "description": "Multiple llGetLinkPrimitiveParams calls."
    },
    {
      "constant": "PRIM_CAST_SHADOWS",
      "value": "24",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "DEPRECATED: Shadow casting for the primitive"
    },
    {
      "constant": "PRIM_ALLOW_UNSIT",
      "value": "39",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SCRIPTED_SIT_ONLY",
      "value": "40",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SIT_TARGET",
      "value": "41",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "offset"
        },
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Sit target, llSitTarget. The position can be ZERO_VECTOR."
    },
    {
      "constant": "PRIM_PROJECTOR",
      "value": "42",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "float",
          "name": "fov"
        },
        {
          "type": "float",
          "name": "focus"
        },
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Light projector settings, the texture may be NULL_KEY. (Write only, for now. See here)"
    },
    {
      "constant": "PRIM_CLICK_ACTION",
      "value": "43",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "action"
        }
      ],
      "description": "sets the default action to take when a user clicks on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th><th>Cursor</th></tr><tr><td>CLICK_ACTION_NONE</td><td>0</td><td>Performs the default action: when the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_TOUCH</td><td>0</td><td>When the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_SIT</td><td>1</td><td>When the prim is touched, the avatar sits upon it</td><td>[](https://wiki.secondlife.com/wiki/File:SitActionCursor.png)</td></tr><tr><td>CLICK_ACTION_BUY</td><td>2</td><td>When the prim is touched, the buy dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PAY</td><td>3</td><td>When the prim is touched, the pay dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_OPEN</td><td>4</td><td>When the prim is touched, the object inventory dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:OpenOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PLAY</td><td>5</td><td>Play or pause parcel media on touch</td><td>[](https://wiki.secondlife.com/wiki/File:Toolplay.png)</td></tr><tr><td>CLICK_ACTION_OPEN_MEDIA</td><td>6</td><td>Play parcel media on touch, no pause</td><td>[](https://wiki.secondlife.com/wiki/File:Toolmediaopen.png)</td></tr><tr><td>CLICK_ACTION_ZOOM</td><td>7</td><td>Zoom the avatar camera on this object (Viewer 2)</td><td>[](https://wiki.secondlife.com/wiki/File:Toolzoom.png)</td></tr><tr><td>CLICK_ACTION_DISABLED</td><td>8</td><td>No click action. No touches detected or passed.</td><td></td></tr><tr><td>CLICK_ACTION_IGNORE</td><td>9</td><td>Clicks go through the object to whatever is behind it. No touches detected.</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_BASE_COLOR",
      "value": "48",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        },
        {
          "type": "integer",
          "name": "gltf_alpha_mode"
        },
        {
          "type": "float",
          "name": "alpha_mask_cutoff"
        },
        {
          "type": "integer",
          "name": "double_sided"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>\n<table><tbody><tr><th>gltf_alpha_mode Flags</th><th>V</th><th colspan='3'>Description</th></tr><tr><td>PRIM_GLTF_ALPHA_MODE_OPAQUE</td><td>0</td><td colspan='3'>Ignore the alpha value and render the material as opaque.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_BLEND</td><td>1</td><td colspan='3'>Render the material with transparency determined by the alpha value. Blending is done in linear color space. As is the case for Blinn-Phong as well, this mode suffers from depth sorting and performance issues. Use alpha mask instead when possible.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_MASK</td><td>2</td><td colspan='3'>Render the material as fully opaque where the alpha value is greater than the alpha cutoff, and otherwise render the material as fully transparent.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_NORMAL",
      "value": "45",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_METALLIC_ROUGHNESS",
      "value": "47",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        },
        {
          "type": "float",
          "name": "metallic_factor"
        },
        {
          "type": "float",
          "name": "roughness_factor"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_EMISSIVE",
      "value": "46",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        },
        {
          "type": "vector",
          "name": "emissive_tint"
        }
      ],
      "description": "emissive_tint param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_SIT_FLAGS",
      "value": "50",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the sit flags currently set on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th></tr><tr><td>SIT_FLAG_SIT_TARGET</td><td>0x1</td><td>Read-only flag to indicate whether the link has a sit target. Use llSitTarget, llLinkSitTarget, or PRIM_SIT_TARGET to disable or enable this flag. Use llGetLinkSitFlags, or llGetLinkPrimitiveParams with PRIM_SIT_FLAGS to read this flag.</td></tr><tr><td>SIT_FLAG_ALLOW_UNSIT</td><td>0x2</td><td>Allow an avatar to manually unsit from a sit target. Only applies to agents who had been seated via an LSL script. See llSitOnLink.</td></tr><tr><td>SIT_FLAG_SCRIPTED_ONLY</td><td>0x4</td><td>Only allow scripted sits on this sit target.</td></tr><tr><td>SIT_FLAG_NO_COLLIDE</td><td>0x10</td><td>Disable the avatar's collision volume when they are seated on this sit target.</td></tr><tr><td>SIT_FLAG_NO_DAMAGE</td><td>0x20</td><td>Do not distribute damage to agents sitting on this sit target.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_DAMAGE",
      "value": "51",
      "parameters": "",
      "return": [
        {
          "type": "float",
          "name": "damage"
        },
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "Gets the damage and damage type delivered by a prim on collision."
    },
    {
      "constant": "PRIM_HEALTH",
      "value": "52",
      "parameters": "",
      "return": [
        {
          "type": "float",
          "name": "health"
        }
      ],
      "description": "Gets the health of a prim"
    }
  ],
  "llGetObjectDetails": [
    {
      "constant": "OBJECT_NAME",
      "value": "1",
      "return": [
        {
          "type": "string",
          "name": "name"
        }
      ],
      "description": "Gets the prim's name.If id is an avatar, the Legacy Name is returned.",
      "length when typecast to a string": "max. 63 characters",
      "alternatives": "llKey2Name\nllDetectedName",
      "local": "llGetObjectName"
    },
    {
      "constant": "OBJECT_DESC",
      "value": "2",
      "return": [
        {
          "type": "string",
          "name": "desc"
        }
      ],
      "description": "Gets the prim's description.If id is an avatar, an empty string is returned.",
      "length when typecast to a string": "max. 127 characters",
      "alternatives": "",
      "local": "llGetObjectDesc"
    },
    {
      "constant": "OBJECT_POS",
      "value": "3",
      "return": [
        {
          "type": "vector",
          "name": "pos"
        }
      ],
      "description": "Gets the prim's position in region coordinates.If id is an avatar outside the region (see above), this position is relative to the region the script is running in.",
      "length when typecast to a string": "max. 37 characters",
      "alternatives": "llDetectedPos",
      "local": "llGetPos"
    },
    {
      "constant": "OBJECT_ROT",
      "value": "4",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Gets the prim's rotation.",
      "length when typecast to a string": "max. 48 characters",
      "alternatives": "llDetectedRot",
      "local": "llGetRot"
    },
    {
      "constant": "OBJECT_VELOCITY",
      "value": "5",
      "return": [
        {
          "type": "vector",
          "name": "vel"
        }
      ],
      "description": "Gets the object's velocity.",
      "length when typecast to a string": "36 characters",
      "alternatives": "llDetectedVel",
      "local": "llGetVel"
    },
    {
      "constant": "OBJECT_OWNER",
      "value": "6",
      "return": [
        {
          "type": "key",
          "name": "owner"
        }
      ],
      "description": "Gets an object's owner key.If id is an avatar, that avatar's key is returned (which is the same as id).If id is group-owned, a NULL_KEY is returned.",
      "length when typecast to a string": "36 characters",
      "alternatives": "llDetectedOwner\nllGetOwnerKey",
      "local": "llGetOwner"
    },
    {
      "constant": "OBJECT_GROUP",
      "value": "7",
      "return": [
        {
          "type": "key",
          "name": "group"
        }
      ],
      "description": "Gets the prim's group key.If id is an avatar, a NULL_KEY is returned, which means a workaround is required to get an avatar's active group.[[1]](#footnote_1)",
      "length when typecast to a string": "36 characters",
      "alternatives": "Group",
      "local": ""
    },
    {
      "constant": "OBJECT_CREATOR",
      "value": "8",
      "return": [
        {
          "type": "key",
          "name": "creator"
        }
      ],
      "description": "Gets the prim's creator key.If id is an avatar, a NULL_KEY is returned.",
      "length when typecast to a string": "36 characters",
      "alternatives": "Creator",
      "local": "llGetCreator"
    },
    {
      "constant": "OBJECT_RUNNING_SCRIPT_COUNT",
      "value": "9",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the number of running scripts attached to the object or agent.",
      "length when typecast to a string": "max. 11 characters",
      "alternatives": "",
      "local": "llGetScriptState"
    },
    {
      "constant": "OBJECT_TOTAL_SCRIPT_COUNT",
      "value": "10",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the number of scripts, both running and stopped, attached to the object or agent.",
      "length when typecast to a string": "max. 11 characters",
      "alternatives": "",
      "local": "llGetInventoryNumber"
    },
    {
      "constant": "OBJECT_SCRIPT_MEMORY",
      "value": "11",
      "return": [
        {
          "type": "integer",
          "name": "bytes"
        }
      ],
      "description": "Gets the amount of script memory used by the object or agent, in bytes, or its upper limit. See page for more info.",
      "length when typecast to a string": "max. 11 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_SCRIPT_TIME",
      "value": "12",
      "return": [
        {
          "type": "float",
          "name": "seconds"
        }
      ],
      "description": "Gets the total amount of average script CPU time used by the object or agent, in seconds. See page for more info.",
      "length when typecast to a string": "max. 15 characters",
      "alternatives": "Top Scripts",
      "local": ""
    },
    {
      "constant": "OBJECT_PRIM_EQUIVALENCE",
      "value": "13",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the prim equivalence of the object.",
      "length when typecast to a string": "max. 11 characters",
      "alternatives": "Calculating land impact",
      "local": ""
    },
    {
      "constant": "OBJECT_SERVER_COST",
      "value": "14",
      "return": [
        {
          "type": "float",
          "name": "cost"
        }
      ],
      "description": "Gets the server cost of the object.",
      "length when typecast to a string": "max. 15 characters",
      "alternatives": "Server cost",
      "local": ""
    },
    {
      "constant": "OBJECT_STREAMING_COST",
      "value": "15",
      "return": [
        {
          "type": "float",
          "name": "cost"
        }
      ],
      "description": "Gets the streaming (download) cost of the object.",
      "length when typecast to a string": "max. 15 characters",
      "alternatives": "Streaming (download) cost",
      "local": ""
    },
    {
      "constant": "OBJECT_PHYSICS_COST",
      "value": "16",
      "return": [
        {
          "type": "float",
          "name": "cost"
        }
      ],
      "description": "Gets the physics cost of the object.",
      "length when typecast to a string": "max. 15 characters",
      "alternatives": "Physics cost",
      "local": ""
    },
    {
      "constant": "OBJECT_CHARACTER_TIME",
      "value": "17",
      "return": [
        {
          "type": "float",
          "name": "seconds"
        }
      ],
      "description": "Gets the average CPU time (in seconds) used by the object for navigation, if the object is a pathfinding character. Returns 0 for non-characters.",
      "length when typecast to a string": "max. 15 characters",
      "alternatives": "Pathfinding characters",
      "local": ""
    },
    {
      "constant": "OBJECT_ROOT",
      "value": "18",
      "return": [
        {
          "type": "key",
          "name": "root"
        }
      ],
      "description": "Gets the id of the root prim of the object requested.If id is an avatar, returns the id of the root prim of the linkset the avatar is sitting on and linked to (or the avatar's own id if the avatar is not sitting on an object within the region).",
      "length when typecast to a string": "36 characters",
      "alternatives": "",
      "local": "llGetLinkKey"
    },
    {
      "constant": "OBJECT_ATTACHED_POINT",
      "value": "19",
      "return": [
        {
          "type": "integer",
          "name": "attach_point"
        }
      ],
      "description": "Gets the attachment point to which the object is attached. It returns an integer matching one of the ATTACH_* constants.",
      "length when typecast to a string": "max. 11 characters",
      "alternatives": "",
      "local": "llGetAttached"
    },
    {
      "constant": "OBJECT_PATHFINDING_TYPE",
      "value": "20",
      "return": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "description": "Gets the pathfinding setting of the object in the region. It returns an integer matching one of the OPT_* constants.",
      "length when typecast to a string": "max. 11 characters",
      "alternatives": "Pathfinding types",
      "local": ""
    },
    {
      "constant": "OBJECT_PHYSICS",
      "value": "21",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets the integer boolean detailing if physics is enabled or disabled on the object.If id is an avatar or attachment, 0 is returned.",
      "length when typecast to a string": "1 character",
      "alternatives": "",
      "local": "llGetStatus PRIM_PHYSICS"
    },
    {
      "constant": "OBJECT_PHANTOM",
      "value": "22",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets the integer boolean detailing if phantom is enabled or disabled on the object.If id is an avatar or attachment, 0 is returned.",
      "length when typecast to a string": "1 character",
      "alternatives": "",
      "local": "llGetStatus PRIM_PHANTOM"
    },
    {
      "constant": "OBJECT_TEMP_ON_REZ",
      "value": "23",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets the integer boolean detailing if temporary is enabled or disabled on the object.",
      "length when typecast to a string": "1 character",
      "alternatives": "",
      "local": "PRIM_TEMP_ON_REZ"
    },
    {
      "constant": "OBJECT_RENDER_WEIGHT",
      "value": "24",
      "return": [
        {
          "type": "integer",
          "name": "weight"
        }
      ],
      "description": "Gets the avatar's render weight.If id is an object, 0 is returned. If id is an avatar whose render weight is unknown to the simulator, -1 is returned. The maximum render weight reported by the server is 500000[1].",
      "length when typecast to a string": "max. 6 characters",
      "alternatives": "Avatar_Rendering_Cost",
      "local": ""
    },
    {
      "constant": "OBJECT_HOVER_HEIGHT",
      "value": "25",
      "return": [
        {
          "type": "float",
          "name": "height"
        }
      ],
      "description": "Gets the hover height of the avatar.If id is not an avatar, 0.0 is returned. Normal values are in the range [-2.0, 2.0] with a default of 0.0. This value does not reflect the avatar shape's 'Hover' slider, only the dynamic viewer setting.",
      "length when typecast to a string": "max. 9 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_BODY_SHAPE_TYPE",
      "value": "26",
      "return": [
        {
          "type": "float",
          "name": "shape"
        }
      ],
      "description": "Gets a float which describes the sex setting of the avatar's currently worn shape.If id is not an avatar, -1.0 is returned.Normal operational values are in the range [0.0, 1.0].\n0.0 is standard female setting,\n1.0 is standard male setting.\nIntermediate values with visible differences are possible with manually crafted shapes.",
      "length when typecast to a string": "max. 9 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_LAST_OWNER_ID",
      "value": "27",
      "return": [
        {
          "type": "key",
          "name": "last_owner"
        }
      ],
      "description": "Gets the UUID of the object's previous owner, if known.\nFor group-owned objects, this is the avatar that deeded the object.\nReturns NULL_KEY for avatars, or objects that were never transferred.\nA rezzed object taken back to inventory, then re-rezzed, will return its current owner key.",
      "length when typecast to a string": "36 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_CLICK_ACTION",
      "value": "28",
      "return": [
        {
          "type": "integer",
          "name": "action"
        }
      ],
      "description": "Gets the click action of the prim. It returns an integer matching one of the CLICK_ACTION_* constants.",
      "length when typecast to a string": "max. 3 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_OMEGA",
      "value": "29",
      "return": [
        {
          "type": "vector",
          "name": "omega"
        }
      ],
      "description": "Gets the object's rotational velocity (radians per second).",
      "length when typecast to a string": "36 characters",
      "alternatives": "",
      "local": "llGetOmega"
    },
    {
      "constant": "OBJECT_PRIM_COUNT",
      "value": "30",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the object's prim count",
      "length when typecast to a string": "max. 3 characters",
      "alternatives": "llGetObjectPrimCount",
      "local": "llGetNumberOfPrims"
    },
    {
      "constant": "OBJECT_TOTAL_INVENTORY_COUNT",
      "value": "31",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the object's total number of inventory items.",
      "length when typecast to a string": "max. 10 characters",
      "alternatives": "",
      "local": "llGetInventoryNumber(INVENTORY_ALL)"
    },
    {
      "constant": "OBJECT_REZZER_KEY",
      "value": "32",
      "return": [
        {
          "type": "key",
          "name": "rezzer"
        }
      ],
      "description": "Gets the key of the object that rezzed this object be it an object or an avatar.",
      "length when typecast to a string": "36 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_GROUP_TAG",
      "value": "33",
      "return": [
        {
          "type": "string",
          "name": "text"
        }
      ],
      "description": "Gets the avatar's group tag text.If id is not an avatar, an empty string is returned.",
      "length when typecast to a string": "max. 20 bytes",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_TEMP_ATTACHED",
      "value": "34",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets the integer boolean detailing if the object is temporarily attached.",
      "length when typecast to a string": "1 character",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_ATTACHED_SLOTS_AVAILABLE",
      "value": "35",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the avatar's available attachment slot count.If id is not an avatar, 0 is returned.",
      "length when typecast to a string": "max. 2 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_CREATION_TIME",
      "value": "36",
      "return": [
        {
          "type": "string",
          "name": "timestamp"
        }
      ],
      "description": "Gets the object's creation time. This time is established with raw material rezzing through the build menu and with mesh uploads.This time is NOT established with inventory rezzes, scripted rezzes, object modifying, copying or transferring.If id is an avatar, an empty string is returned.",
      "length when typecast to a string": "max. 27 bytes",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_SELECT_COUNT",
      "value": "37",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the total number of agents selecting any links in the object.If id is an avatar, 0 is returned.",
      "length when typecast to a string": "max. 3 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_SIT_COUNT",
      "value": "38",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the total number of agents sitting on any links in the object.If id is an avatar, 0 is returned.",
      "length when typecast to a string": "max. 3 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_ANIMATED_COUNT",
      "value": "39",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the integer boolean detailing if the object's root is set to 'Animated Mesh' or gets the total number of 'Animated Mesh' attachments worn by an agent.",
      "length when typecast to a string": "max. 1 character",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_ANIMATED_SLOTS_AVAILABLE",
      "value": "40",
      "return": [
        {
          "type": "integer",
          "name": "count"
        }
      ],
      "description": "Gets the avatar's available 'Animated Mesh' attachment slot count.If id is not an avatar, 0 is returned.",
      "length when typecast to a string": "max. 2 characters",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_ACCOUNT_LEVEL",
      "value": "41",
      "return": [
        {
          "type": "integer",
          "name": "level"
        }
      ],
      "description": "Gets the account level of an avatar.If id is not an avatar, -1 is returned.\n0 is Basic account level.\n1 is Premium account level.\n5 is Plus account level.\n10 is Premium Plus account level.",
      "length when typecast to a string": "max. 1 character",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_MATERIAL",
      "value": "42",
      "return": [
        {
          "type": "integer",
          "name": "material"
        }
      ],
      "description": "Retrieves the physics material set on this object. It returns an integer matching one of the PRIM_MATERIAL_* constants.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_MATERIAL"
    },
    {
      "constant": "OBJECT_MASS",
      "value": "43",
      "return": [
        {
          "type": "float",
          "name": "mass"
        }
      ],
      "description": "Gets the mass (in Kilograms) of this object's linkset.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetMassMKS"
    },
    {
      "constant": "OBJECT_TEXT",
      "value": "44",
      "return": [
        {
          "type": "string",
          "name": "text"
        }
      ],
      "description": "Gets the floating text displayed above this object.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_TEXT"
    },
    {
      "constant": "OBJECT_REZ_TIME",
      "value": "45",
      "return": [
        {
          "type": "string",
          "name": "time"
        }
      ],
      "description": "Retrieves the time that this object was rezzed.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": ""
    },
    {
      "constant": "OBJECT_LINK_NUMBER",
      "value": "46",
      "return": [
        {
          "type": "integer",
          "name": "link_number"
        }
      ],
      "description": "Get this object's index in the linkset.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetLinkNumber"
    },
    {
      "constant": "OBJECT_SCALE",
      "value": "47",
      "return": [
        {
          "type": "vector",
          "name": "scale"
        }
      ],
      "description": "Get the size of this object.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetScale"
    },
    {
      "constant": "OBJECT_TEXT_COLOR",
      "value": "48",
      "return": [
        {
          "type": "vector",
          "name": "color"
        }
      ],
      "description": "Gets the color of the floating text displayed above this object.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_TEXT"
    },
    {
      "constant": "OBJECT_TEXT_ALPHA",
      "value": "49",
      "return": [
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "Gets the alpha value of the floating text displayed above this object.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_TEXT"
    },
    {
      "constant": "OBJECT_HEALTH",
      "value": "50",
      "return": [
        {
          "type": "float",
          "name": "health"
        }
      ],
      "description": "Retrieves the health of an avatar or prim.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_HEALTHllGetHealth"
    },
    {
      "constant": "OBJECT_DAMAGE",
      "value": "51",
      "return": [
        {
          "type": "float",
          "name": "damage"
        }
      ],
      "description": "Retrieves the amount of damage a prim inflicts on collision.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_DAMAGE"
    },
    {
      "constant": "OBJECT_DAMAGE_TYPE",
      "value": "52",
      "return": [
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "Retrieves the type of damage a prim inflicts on collision. It returns an integer that can match one of the DAMAGE_TYPE_* constants, be a custom damage type or be repurposed by a combat system.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetPrimitiveParamsPRIM_DAMAGE"
    },
    {
      "constant": "OBJECT_PERMS",
      "value": "53",
      "return": [
        {
          "type": "integer",
          "name": "base"
        },
        {
          "type": "integer",
          "name": "owner"
        },
        {
          "type": "integer",
          "name": "group"
        },
        {
          "type": "integer",
          "name": "everyone"
        },
        {
          "type": "integer",
          "name": "next_owner"
        }
      ],
      "description": "Retrieves the permissions for this object as 5 integers.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": "llGetObjectPermMask"
    },
    {
      "constant": "OBJECT_PERMS_COMBINED",
      "value": "54",
      "return": "",
      "description": "Retrieves the permissions for this object combined with all of its inventory items as 5 integers.",
      "length when typecast to a string": "",
      "alternatives": "",
      "local": ""
    }
  ],
  "llGetParcelDetails": [
    {
      "constant": "PARCEL_DETAILS_NAME",
      "value": "0",
      "return": [
        {
          "type": "string"
        }
      ],
      "meaning": "The name of the parcel.",
      "max length": "63 Characters"
    },
    {
      "constant": "PARCEL_DETAILS_DESC",
      "value": "1",
      "return": [
        {
          "type": "string"
        }
      ],
      "meaning": "The description of the parcel.",
      "max length": "127 Characters"
    },
    {
      "constant": "PARCEL_DETAILS_OWNER",
      "value": "2",
      "return": [
        {
          "type": "key"
        }
      ],
      "meaning": "The parcel owner's key.",
      "max length": "(36 Characters)"
    },
    {
      "constant": "PARCEL_DETAILS_GROUP",
      "value": "3",
      "return": [
        {
          "type": "key"
        }
      ],
      "meaning": "The parcel group's key.",
      "max length": "(36 Characters)"
    },
    {
      "constant": "PARCEL_DETAILS_AREA",
      "value": "4",
      "return": [
        {
          "type": "integer"
        }
      ],
      "meaning": "The parcel's area, in sqm.",
      "max length": "(5 Characters)"
    },
    {
      "constant": "PARCEL_DETAILS_ID",
      "value": "5",
      "return": [
        {
          "type": "key"
        }
      ],
      "meaning": "The parcel's key.",
      "max length": "(36 Characters)"
    },
    {
      "constant": "PARCEL_DETAILS_SEE_AVATARS",
      "value": "6",
      "return": "integer - boolean",
      "meaning": "The parcel's avatar visibility setting[[2]](#footnote_2)",
      "max length": "(1 character)"
    },
    {
      "constant": "PARCEL_DETAILS_PRIM_CAPACITY",
      "value": "7",
      "return": [
        {
          "type": "integer"
        }
      ],
      "meaning": "The total prim capacity on this and all same-owner parcels, sim-wide.\nSee llGetParcelMaxPrims for same-parcel-only and/or sim-wide reporting.",
      "max length": ""
    },
    {
      "constant": "PARCEL_DETAILS_PRIM_USED",
      "value": "8",
      "return": [
        {
          "type": "integer"
        }
      ],
      "meaning": "The total prim usage on this and all same-owner parcels, sim-wide.\nSee llGetParcelPrimCount to get prim count by parcel owner, group, temp, etc. for same-parcel-only and/or sim-wide reporting.",
      "max length": ""
    },
    {
      "constant": "PARCEL_DETAILS_LANDING_POINT",
      "value": "9",
      "return": [
        {
          "type": "vector"
        }
      ],
      "meaning": "Landing point set for this parcel, if any.",
      "max length": ""
    },
    {
      "constant": "PARCEL_DETAILS_LANDING_LOOKAT",
      "value": "10",
      "return": [
        {
          "type": "vector"
        }
      ],
      "meaning": "Look at vector set for the landing point on this parcel, if any.",
      "max length": ""
    },
    {
      "constant": "PARCEL_DETAILS_TP_ROUTING",
      "value": "11",
      "return": [
        {
          "type": "integer"
        }
      ],
      "meaning": "Teleport routing for this parcel.\n0 = TP_ROUTING_BLOCKED\n1 = TP_ROUTING_LANDINGP\n2 = TP_ROUTING_FREE\nNote that routing rules are only enforced if the landing point is set.",
      "max length": ""
    },
    {
      "constant": "PARCEL_DETAILS_FLAGS",
      "value": "12",
      "return": [
        {
          "type": "integer"
        }
      ],
      "meaning": "Parcel flags set for this parcel.\nSee llGetParcelFlags for a listing of the flags and their meaning.",
      "max length": ""
    },
    {
      "constant": "PARCEL_DETAILS_SCRIPT_DANGER",
      "value": "13",
      "return": "integer - boolean",
      "meaning": "Is the script in danger in the indicated parcel.\nSee llScriptDanger for a discussion of script danger.",
      "max length": ""
    }
  ],
  "llGetPrimitiveParams": [
    {
      "constant": "PRIM_NAME",
      "value": "27",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "name"
        }
      ],
      "description": "Name: llGetObjectName"
    },
    {
      "constant": "PRIM_DESC",
      "value": "28",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "description"
        }
      ],
      "description": "Description: llGetObjectDesc"
    },
    {
      "constant": "PRIM_TYPE",
      "value": "9",
      "parameters": "",
      "return": "integer flag ] + flag_parameters",
      "description": "Gets the prim shape. [Would you like to know more?] [Hide"
    },
    {
      "constant": "PRIM_SLICE",
      "value": "35",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "slice"
        }
      ],
      "description": "Gets the prim's slice (a shape attribute)."
    },
    {
      "constant": "PRIM_PHYSICS_SHAPE_TYPE",
      "value": "30",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "description": "Gets the prim's physics shape type."
    },
    {
      "constant": "PRIM_MATERIAL",
      "value": "2",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "material"
        }
      ],
      "description": "Gets the prim's material. The material determines the default collision sound, sprite, friction coefficient and restitution coefficient."
    },
    {
      "constant": "PRIM_PHYSICS",
      "value": "3",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Physics status llGetStatus"
    },
    {
      "constant": "PRIM_TEMP_ON_REZ",
      "value": "4",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Temporary attribute"
    },
    {
      "constant": "PRIM_PHANTOM",
      "value": "5",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Phantom status llGetStatus"
    },
    {
      "constant": "PRIM_POSITION",
      "value": "6",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Position, llGetPos"
    },
    {
      "constant": "PRIM_POS_LOCAL",
      "value": "33",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Local position, llGetLocalPos"
    },
    {
      "constant": "PRIM_ROTATION",
      "value": "8",
      "parameters": "",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Global rotation, llGetRot"
    },
    {
      "constant": "PRIM_ROT_LOCAL",
      "value": "29",
      "parameters": "",
      "return": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Local rotation, llGetLocalRot"
    },
    {
      "constant": "PRIM_SIZE",
      "value": "7",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "size"
        }
      ],
      "description": "Size, llGetScale"
    },
    {
      "constant": "PRIM_TEXTURE",
      "value": "17",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        }
      ],
      "description": "<table><tbody><tr><td>Texture:</td><td>llGetTexture</td><td></td></tr><tr><td>Repeats:</td><td>llGetTextureScale</td><td></td></tr><tr><td>Offset:</td><td>llGetTextureOffset</td><td></td></tr><tr><td>Rotation:</td><td>llGetTextureRot</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_RENDER_MATERIAL",
      "value": "49",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "render_material"
        }
      ],
      "description": "<table><tbody><tr><td>Material:</td><td>llGetRenderMaterial</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_TEXT",
      "value": "26",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "text"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "Floating Text: NA"
    },
    {
      "constant": "PRIM_COLOR",
      "value": "18",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "<table><tbody><tr><td>Alpha:</td><td>llGetAlpha</td><td></td></tr><tr><td>Color:</td><td>llGetColor</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_BUMP_SHINY",
      "value": "19",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "integer",
          "name": "shiny"
        },
        {
          "type": "integer",
          "name": "bump"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_FLEXIBLE",
      "value": "21",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "integer",
          "name": "softness"
        },
        {
          "type": "float",
          "name": "gravity"
        },
        {
          "type": "float",
          "name": "friction"
        },
        {
          "type": "float",
          "name": "wind"
        },
        {
          "type": "float",
          "name": "tension"
        },
        {
          "type": "vector",
          "name": "force"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_TEXGEN",
      "value": "22",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "integer",
          "name": "mode"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_POINT_LIGHT",
      "value": "23",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "linear_color"
        },
        {
          "type": "float",
          "name": "intensity"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "falloff"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space."
    },
    {
      "constant": "PRIM_REFLECTION_PROBE",
      "value": "44",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "float",
          "name": "ambiance"
        },
        {
          "type": "float",
          "name": "clip_distance"
        },
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the prim's reflection probe parameters."
    },
    {
      "constant": "PRIM_GLOW",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "float",
          "name": "intensity"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_OMEGA",
      "value": "32",
      "parameters": "",
      "return": [
        {
          "type": "vector",
          "name": "axis"
        },
        {
          "type": "float",
          "name": "spinrate"
        },
        {
          "type": "float",
          "name": "gain"
        }
      ],
      "description": "llTargetOmega"
    },
    {
      "constant": "PRIM_NORMAL",
      "value": "37",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SPECULAR",
      "value": "36",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": "string texture, vector repeats, vector offsets, float rotation_in_radians, vector color, integer glossiness integer environment",
      "description": ""
    },
    {
      "constant": "PRIM_ALPHA_MODE",
      "value": "38",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "integer",
          "name": "alpha_mode"
        },
        {
          "type": "integer",
          "name": "mask_cutoff"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_LINK_TARGET",
      "value": "34",
      "parameters": [
        {
          "type": "integer",
          "name": "link_target"
        }
      ],
      "return": "",
      "description": "Multiple llGetLinkPrimitiveParams calls."
    },
    {
      "constant": "PRIM_CAST_SHADOWS",
      "value": "24",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "DEPRECATED: Shadow casting for the primitive"
    },
    {
      "constant": "PRIM_ALLOW_UNSIT",
      "value": "39",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SCRIPTED_SIT_ONLY",
      "value": "40",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SIT_TARGET",
      "value": "41",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "offset"
        },
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Sit target, llSitTarget. The position can be ZERO_VECTOR."
    },
    {
      "constant": "PRIM_PROJECTOR",
      "value": "42",
      "parameters": "",
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "float",
          "name": "fov"
        },
        {
          "type": "float",
          "name": "focus"
        },
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Light projector settings, the texture may be NULL_KEY. (Write only, for now. See here)"
    },
    {
      "constant": "PRIM_CLICK_ACTION",
      "value": "43",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "action"
        }
      ],
      "description": "sets the default action to take when a user clicks on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th><th>Cursor</th></tr><tr><td>CLICK_ACTION_NONE</td><td>0</td><td>Performs the default action: when the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_TOUCH</td><td>0</td><td>When the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_SIT</td><td>1</td><td>When the prim is touched, the avatar sits upon it</td><td>[](https://wiki.secondlife.com/wiki/File:SitActionCursor.png)</td></tr><tr><td>CLICK_ACTION_BUY</td><td>2</td><td>When the prim is touched, the buy dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PAY</td><td>3</td><td>When the prim is touched, the pay dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_OPEN</td><td>4</td><td>When the prim is touched, the object inventory dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:OpenOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PLAY</td><td>5</td><td>Play or pause parcel media on touch</td><td>[](https://wiki.secondlife.com/wiki/File:Toolplay.png)</td></tr><tr><td>CLICK_ACTION_OPEN_MEDIA</td><td>6</td><td>Play parcel media on touch, no pause</td><td>[](https://wiki.secondlife.com/wiki/File:Toolmediaopen.png)</td></tr><tr><td>CLICK_ACTION_ZOOM</td><td>7</td><td>Zoom the avatar camera on this object (Viewer 2)</td><td>[](https://wiki.secondlife.com/wiki/File:Toolzoom.png)</td></tr><tr><td>CLICK_ACTION_DISABLED</td><td>8</td><td>No click action. No touches detected or passed.</td><td></td></tr><tr><td>CLICK_ACTION_IGNORE</td><td>9</td><td>Clicks go through the object to whatever is behind it. No touches detected.</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_BASE_COLOR",
      "value": "48",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        },
        {
          "type": "integer",
          "name": "gltf_alpha_mode"
        },
        {
          "type": "float",
          "name": "alpha_mask_cutoff"
        },
        {
          "type": "integer",
          "name": "double_sided"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>\n<table><tbody><tr><th>gltf_alpha_mode Flags</th><th>V</th><th colspan='3'>Description</th></tr><tr><td>PRIM_GLTF_ALPHA_MODE_OPAQUE</td><td>0</td><td colspan='3'>Ignore the alpha value and render the material as opaque.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_BLEND</td><td>1</td><td colspan='3'>Render the material with transparency determined by the alpha value. Blending is done in linear color space. As is the case for Blinn-Phong as well, this mode suffers from depth sorting and performance issues. Use alpha mask instead when possible.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_MASK</td><td>2</td><td colspan='3'>Render the material as fully opaque where the alpha value is greater than the alpha cutoff, and otherwise render the material as fully transparent.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_NORMAL",
      "value": "45",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_METALLIC_ROUGHNESS",
      "value": "47",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        },
        {
          "type": "float",
          "name": "metallic_factor"
        },
        {
          "type": "float",
          "name": "roughness_factor"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_EMISSIVE",
      "value": "46",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "return": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "vector",
          "name": "repeats"
        },
        {
          "type": "vector",
          "name": "offsets"
        },
        {
          "type": "float",
          "name": "rotation_in_radians"
        },
        {
          "type": "vector",
          "name": "emissive_tint"
        }
      ],
      "description": "emissive_tint param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_SIT_FLAGS",
      "value": "50",
      "parameters": "",
      "return": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the sit flags currently set on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th></tr><tr><td>SIT_FLAG_SIT_TARGET</td><td>0x1</td><td>Read-only flag to indicate whether the link has a sit target. Use llSitTarget, llLinkSitTarget, or PRIM_SIT_TARGET to disable or enable this flag. Use llGetLinkSitFlags, or llGetLinkPrimitiveParams with PRIM_SIT_FLAGS to read this flag.</td></tr><tr><td>SIT_FLAG_ALLOW_UNSIT</td><td>0x2</td><td>Allow an avatar to manually unsit from a sit target. Only applies to agents who had been seated via an LSL script. See llSitOnLink.</td></tr><tr><td>SIT_FLAG_SCRIPTED_ONLY</td><td>0x4</td><td>Only allow scripted sits on this sit target.</td></tr><tr><td>SIT_FLAG_NO_COLLIDE</td><td>0x10</td><td>Disable the avatar's collision volume when they are seated on this sit target.</td></tr><tr><td>SIT_FLAG_NO_DAMAGE</td><td>0x20</td><td>Do not distribute damage to agents sitting on this sit target.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_DAMAGE",
      "value": "51",
      "parameters": "",
      "return": [
        {
          "type": "float",
          "name": "damage"
        },
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "Gets the damage and damage type delivered by a prim on collision."
    },
    {
      "constant": "PRIM_HEALTH",
      "value": "52",
      "parameters": "",
      "return": [
        {
          "type": "float",
          "name": "health"
        }
      ],
      "description": "Gets the health of a prim"
    }
  ],
  "llGetPrimMediaParams": [
    {
      "constant": "PRIM_MEDIA_ALT_IMAGE_ENABLE",
      "value": "0",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets the default image state (the image that the user sees before a piece of media is active) for the chosen face. The default image is specified by Second Life's server for that media type.\nNote: This flag is not currently implemented."
    },
    {
      "constant": "PRIM_MEDIA_CONTROLS",
      "value": "1",
      "return": [
        {
          "type": "integer",
          "name": "control"
        }
      ],
      "description": "Gets the style of controls. Can be either PRIM_MEDIA_CONTROLS_STANDARD or PRIM_MEDIA_CONTROLS_MINI."
    },
    {
      "constant": "PRIM_MEDIA_CURRENT_URL",
      "value": "2",
      "return": [
        {
          "type": "string",
          "name": "current_url"
        }
      ],
      "description": "Gets the current url displayed on the chosen face. Changing this URL causes navigation. 1024 characters Max"
    },
    {
      "constant": "PRIM_MEDIA_HOME_URL",
      "value": "3",
      "return": [
        {
          "type": "string",
          "name": "home_url"
        }
      ],
      "description": "Gets the home url for the chosen face. 1024 characters max"
    },
    {
      "constant": "PRIM_MEDIA_AUTO_LOOP",
      "value": "4",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether auto-looping is enabled."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_PLAY",
      "value": "5",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether the media auto-plays when a Resident can view it."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_SCALE",
      "value": "6",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether auto-scaling is enabled. Auto-scaling forces the media to the full size of the texture."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_ZOOM",
      "value": "7",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether clicking the media triggers auto-zoom and auto-focus on the media."
    },
    {
      "constant": "PRIM_MEDIA_FIRST_CLICK_INTERACT",
      "value": "8",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether the first click interaction is enabled.\nNote: This flag appears not to work."
    },
    {
      "constant": "PRIM_MEDIA_WIDTH_PIXELS",
      "value": "9",
      "return": [
        {
          "type": "integer",
          "name": "width"
        }
      ],
      "description": "Gets the width of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_HEIGHT_PIXELS",
      "value": "10",
      "return": [
        {
          "type": "integer",
          "name": "height"
        }
      ],
      "description": "Gets the height of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST_ENABLE",
      "value": "11",
      "return": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Gets whether navigation is restricted to URLs in PRIM_MEDIA_WHITELIST."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST",
      "value": "12",
      "return": [
        {
          "type": "string",
          "name": "CSV"
        }
      ],
      "description": "Gets the whitelist as a string of escaped, comma-separated URLs. This string can hold up to 64 URLs or 1024 characters, whichever comes first."
    },
    {
      "constant": "PRIM_MEDIA_PERMS_INTERACT",
      "value": "13",
      "return": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Gets the permissions mask that control who can interact with the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    },
    {
      "constant": "PRIM_MEDIA_PERMS_CONTROL",
      "value": "14",
      "return": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Gets the permissions mask that control who can see the media control bar above the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    }
  ],
  "llGetStaticPath": [
    {
      "constant": "CHARACTER_DESIRED_SPEED",
      "value": "1",
      "default": "6",
      "description": "Speed of pursuit in meters per second.",
      "range": "0.2, 40.0"
    },
    {
      "constant": "CHARACTER_RADIUS",
      "value": "2",
      "default": "",
      "description": "Set collision capsule radius.",
      "range": "0.125, 5.0"
    },
    {
      "constant": "CHARACTER_LENGTH",
      "value": "3",
      "default": "",
      "description": "Set collision capsule length\nIf the value is less than twice the radius plus 0.1m, it will be set to twice the radius plus 0.1m.",
      "range": "(0.0, 10.0"
    },
    {
      "constant": "CHARACTER_ORIENTATION",
      "value": "4",
      "default": "VERTICAL",
      "description": "Set the character orientation.",
      "range": "VERTICAL, HORIZONTAL"
    },
    {
      "constant": "TRAVERSAL_TYPE",
      "value": "7",
      "default": "TRAVERSAL_TYPE_SLOW",
      "description": "Controls the speed at which characters moves on terrain that is less than 100% walkable will move faster (e.g., a cat crossing a street) or slower (e.g., a car driving in a swamp).\nTo use _FAST or _SLOW, you must specify a CHARACTER_TYPE.",
      "range": "TRAVERSAL_TYPE_FAST, TRAVERSAL_TYPE_SLOW, TRAVERSAL_TYPE_NONE"
    },
    {
      "constant": "CHARACTER_TYPE",
      "value": "6",
      "default": "CHARACTER_TYPE_NONE",
      "description": "Specifies which walkability coefficient will be used by this character.",
      "range": "CHARACTER_TYPE_A, CHARACTER_TYPE_B, CHARACTER_TYPE_C, CHARACTER_TYPE_D, CHARACTER_TYPE_NONE"
    },
    {
      "constant": "CHARACTER_AVOIDANCE_MODE",
      "value": "5",
      "default": "AVOID_CHARACTERS | AVOID_DYNAMIC_OBSTACLES",
      "description": "Allows you to specify that a character should not try to avoid other characters, should not try to avoid dynamic obstacles (relatively fast moving objects and avatars), or both. This is framed in the positive sense (`[[CHARACTER_AVOIDANCE_MODE](https://wiki.secondlife.com/wiki/CHARACTER_AVOIDANCE_MODE), [AVOID_CHARACTERS](https://wiki.secondlife.com/w/index.php?title=AVOID_CHARACTERS&action=edit&redlink=1)]` would create a character that avoided other characters but not agents or moving vehicles). Setting this parameter to AVOID_NONE causes the character to not avoid either category.",
      "range": "Combinable Flags:AVOID_CHARACTERS, AVOID_DYNAMIC_OBSTACLES, AVOID_NONE"
    },
    {
      "constant": "CHARACTER_MAX_ACCEL",
      "value": "8",
      "default": "20",
      "description": "The character's maximum acceleration rate.",
      "range": "0.5, 40.0"
    },
    {
      "constant": "CHARACTER_MAX_DECEL",
      "value": "9",
      "default": "30",
      "description": "The character's maximum deceleration rate.",
      "range": "0.5, 60.0"
    },
    {
      "constant": "CHARACTER_DESIRED_TURN_SPEED",
      "value": "12",
      "default": "6",
      "description": "The character's maximum speed while turning--note that this is only loosely enforced (i.e., a character may turn at higher speeds under certain conditions)",
      "range": "0.02, 40.0"
    },
    {
      "constant": "CHARACTER_MAX_TURN_RADIUS",
      "value": "10",
      "default": "1.25",
      "description": "The character's turn radius when traveling at CHARACTER_DESIRED_TURN_SPEED",
      "range": "0.1, 10.0"
    },
    {
      "constant": "CHARACTER_MAX_SPEED",
      "value": "13",
      "default": "20",
      "description": "The character's maximum speed. Affects speed when avoiding dynamic obstacles and when traversing low-walkability objects in TRAVERSAL_TYPE_FAST mode.",
      "range": "1, 40.0"
    },
    {
      "constant": "CHARACTER_ACCOUNT_FOR_SKIPPED_FRAMES",
      "value": "14",
      "default": "TRUE",
      "description": "TRUE matches pre-existing behavior. If set to FALSE, character will not attempt to catch up on lost time when pathfinding performance is low, potentially providing more reliable movement (albeit while potentially appearing to be more stuttery).",
      "range": "TRUE or FALSE"
    },
    {
      "constant": "CHARACTER_STAY_WITHIN_PARCEL",
      "value": "15",
      "default": "Depends*",
      "description": "FALSE matches traditional behavior. If set to TRUE, treat the parcel boundaries as one-way obstacles (will re-enter but can't leave on it's own).",
      "range": "TRUE or FALSE"
    }
  ],
  "llGetVisualParams": [
    {
      "constant": "33",
      "description": "",
      "param name": "height"
    },
    {
      "constant": "38",
      "description": "",
      "param name": "torso_length"
    },
    {
      "constant": "80",
      "description": "",
      "param name": "male"
    },
    {
      "constant": "198",
      "description": "",
      "param name": "heel_height"
    },
    {
      "constant": "503",
      "description": "",
      "param name": "platform_height"
    },
    {
      "constant": "616",
      "description": "",
      "param name": "shoe_height"
    },
    {
      "constant": "675",
      "description": "",
      "param name": "hand_size"
    },
    {
      "constant": "682",
      "description": "",
      "param name": "head_size"
    },
    {
      "constant": "692",
      "description": "",
      "param name": "leg_length"
    },
    {
      "constant": "693",
      "description": "",
      "param name": "arm_length"
    },
    {
      "constant": "756",
      "description": "",
      "param name": "neck_length"
    },
    {
      "constant": "814",
      "description": "",
      "param name": "waist_height"
    },
    {
      "constant": "842",
      "description": "",
      "param name": "hip_length"
    },
    {
      "constant": "11001",
      "description": "",
      "param name": "hover"
    }
  ],
  "llGiveAgentInventory": [
    {
      "value": "0",
      "parameters": [
        {
          "type": "string"
        }
      ],
      "description": "Sets a root path that will be used as the parent for folder. If the root path does not exist it will be created.\nIf it already exists in the target inventory it will be reused. Path folders are separated by a '|' character. The path\nmay have have up to 4 folders in it.\nNote that transfers to certain system folders (such as 'Trash') are disallowed.\nExamples:'Objects|Vehicles|My Motorcycle Company''Clothing|Shoes|Breedables''My Store|Home & Garden|'",
      "constants": "TRANSFER_DEST"
    },
    {
      "value": "1",
      "parameters": [
        {
          "type": "integer"
        }
      ],
      "description": "There are no flags defined at this time.",
      "constants": "TRANSFER_FLAGS"
    }
  ],
  "llHTTPRequest": [
    {
      "constant": "HTTP_METHOD",
      "value": "0",
      "parameters": [
        {
          "type": "string",
          "name": "method"
        }
      ],
      "default": "'GET'",
      "description": "'GET', 'POST', 'PUT' and 'DELETE'"
    },
    {
      "constant": "HTTP_MIMETYPE",
      "value": "1",
      "parameters": [
        {
          "type": "string",
          "name": "MIME_type"
        }
      ],
      "default": "'text/plain;charset=utf-8'",
      "description": "text/ MIME types should specify a charset. To emulate HTML forms use application/x-www-form-urlencoded. This allows you to set the body to a properly escaped (llEscapeURL) sequence of <name,value> pairs in the form var=value&var2=value2 and have them automatically parsed by web frameworks.\nMIME types must be specified in the format: type/subtype[;option=value*]\nSome valid examples are'text/html'\n'text/plain;charset=utf-8'\n'application/xhtml+xml'\n'application/json'\n'application/x-www-form-urlencoded'\n'application/rss+xml'\n'multipart/mixed; boundary='---1234567890---''"
    },
    {
      "constant": "HTTP_BODY_MAXLENGTH",
      "value": "2",
      "parameters": [
        {
          "type": "integer",
          "name": "length"
        }
      ],
      "default": "2048",
      "description": "Sets the maximum (UTF-8 encoded) byte length of the HTTP response body. The maximum that can be set depends upon which VM is used.\nMono Max: 16384\nLSO Max: 4096\n<table><tbody><tr><td>⚠️</td><td>Warning: Applies to the  Outgoing pipeline only (HTTP calls invoked by llHTTPRequest,and responses from http_response).</td></tr></tbody></table>\n<table><tbody><tr><td></td><td>Tip: When you only need to request a small amount of data from a remote source, consider using the Content-Range header instead.</td></tr></tbody></table>"
    },
    {
      "constant": "HTTP_VERIFY_CERT",
      "value": "3",
      "parameters": [
        {
          "type": "integer",
          "name": "verify"
        }
      ],
      "default": "TRUE",
      "description": "If TRUE, the server SSL certificate must be verifiable using one of the standard certificate authorities[[1]](#footnote_1) when making HTTPS requests. If FALSE, any server SSL certificate will be accepted."
    },
    {
      "constant": "HTTP_VERBOSE_THROTTLE",
      "value": "4",
      "parameters": [
        {
          "type": "integer",
          "name": "noisy"
        }
      ],
      "default": "TRUE",
      "description": "If TRUE, shout error messages to DEBUG_CHANNEL if the outgoing request rate exceeds the server limit. If FALSE, the error messages are suppressed (llHTTPRequest will still return NULL_KEY)."
    },
    {
      "constant": "HTTP_CUSTOM_HEADER",
      "value": "5",
      "parameters": [
        {
          "type": "string",
          "name": "name"
        },
        {
          "type": "string",
          "name": "value"
        }
      ],
      "default": "NA",
      "description": "Add an extra custom HTTP header to the request. The first string is the name of the parameter to change, e.g. 'Pragma', and the second string is the value, e.g. 'no-cache'. Multiple custom headers may be configured per request, as long as the combined custom header length is no greater than 4096 characters. Note that certain headers, such as the default headers, are blocked for security reasons."
    },
    {
      "constant": "HTTP_PRAGMA_NO_CACHE",
      "value": "6",
      "parameters": [
        {
          "type": "integer",
          "name": "send_header"
        }
      ],
      "default": "TRUE",
      "description": "Sends 'Pragma: no-cache' header (TRUE), or does not send a 'Pragma' header (FALSE)."
    },
    {
      "constant": "HTTP_USER_AGENT",
      "value": "7",
      "parameters": "string user agent value",
      "default": "(none)",
      "description": "The user agent value is appended to the one generated by LSL itself. It should follow the syntax from the HTTP standard like: 'My-Script-Name/1.0 (Mozilla compatible)'.\nNote: Spaces are not allowed in HTTP User Agent token values, so 'My Script Name/1.0' will produce a script error; change the spaces to hyphens ('-')"
    },
    {
      "constant": "HTTP_ACCEPT",
      "value": "8",
      "parameters": [
        {
          "type": "string",
          "name": "MIME_type"
        }
      ],
      "default": "'text/plain;charset=utf-8'",
      "description": "HTTP_ACCEPT parameters can be passed to limit the number of mime types that are sent in the Accept: header of the HTTP request. Specified mime types may include character set and q parameters. This parameter may be specified multiple times.\nThe specified mime type must be one already recognized by llHTTPRequest. These include any text/ mime type, or the following application mime types: “application/xhtml+xml”, “application/atom+xml”, “application/json”, “application/xml”, “application/llsd+xml”, “application/x-javascript”, “application/javascript”, “application/x-www-form-urlencoded”, or “application/rss+xml”.\nThe Content-Type header in the response is checked against the specified HTTP_ACCEPT parameters. If the value of the header is not in the list of acceptable mime types, llHTTPRequest will return 415 as a result code and the body will be 'Unsupported or unknown Content-Type.'"
    },
    {
      "constant": "HTTP_EXTENDED_ERROR",
      "value": "9",
      "parameters": [
        {
          "type": "integer",
          "name": "extended"
        }
      ],
      "default": "FALSE",
      "description": "If TRUE llHTTPRequest will always return a key. If there was an error making the HTTP request. Detailed error information will be returned through the http_response event using the provided key. Error information is delivered in a JSON block as described in RFC 7807. Details about extended return codes can be found below."
    }
  ],
  "llLinkParticleSystem": [
    {
      "constant": "PSYS_PART_FLAGS",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Various flags controlling the behavior of the particle system. The value may be specified as an integer in decimal or hex format, or by ORing together (using the | operator) one or more of the following flag constants:"
    },
    {
      "constant": "PSYS_SRC_PATTERN",
      "value": "9",
      "parameters": [
        {
          "type": "integer",
          "name": "pattern"
        }
      ],
      "description": "Specifies the general emission pattern."
    },
    {
      "constant": "PSYS_SRC_BURST_RADIUS",
      "value": "16",
      "parameters": [
        {
          "type": "float",
          "name": "radius"
        }
      ],
      "description": "Specifies the distance from the emitter where particles will be created. This rule is ignored when the PSYS_PART_FOLLOW_SRC_MASK flag is set. A test in http://forums-archive.secondlife.com/327/f5/226722/1.html indicates that the maximum value is 50.00"
    },
    {
      "constant": "PSYS_SRC_ANGLE_BEGIN",
      "value": "22",
      "parameters": [
        {
          "type": "float",
          "name": "angle_begin"
        }
      ],
      "description": "Specifies a half angle, in radians, of a circular or spherical 'dimple' or conic section (starting from the emitter facing) within which particles will NOT be emitted. Valid values are the same as for PSYS_SRC_ANGLE_END, though the effects are reversed accordingly. If the pattern is PSYS_SRC_PATTERN_ANGLE, the presentation is a 2D flat circular section. If PSYS_SRC_PATTERN_ANGLE_CONE or PSYS_SRC_PATTERN_ANGLE_CONE_EMPTY is used, the presentation is a 3D spherical section. Note that the value of this parameter and PSYS_SRC_ANGLE_END are internally re-ordered such that this parameter gets the smaller of the two values."
    },
    {
      "constant": "PSYS_SRC_ANGLE_END",
      "value": "23",
      "parameters": [
        {
          "type": "float",
          "name": "angle_end"
        }
      ],
      "description": "Specifies a half angle, in radians, of a circular or spherical 'dimple' or conic section (starting from the emitter facing) within which particles WILL be emitted. Valid values are 0.0, which will result in particles being emitted in a straight line in the direction of the emitter facing, to PI, which will result in particles being emitted in a full circular or spherical arc around the emitter, not including the 'dimple' or conic section defined by PSYS_SRC_ANGLE_BEGIN. If the pattern is PSYS_SRC_PATTERN_ANGLE, the presentation is a 2D flat circular section. If PSYS_SRC_PATTERN_ANGLE_CONE or PSYS_SRC_PATTERN_ANGLE_CONE_EMPTY is used, the presentation is a 3D spherical section. Note that the value of this parameter and PSYS_SRC_ANGLE_BEGIN are internally re-ordered such that this parameter gets the larger of the two values."
    },
    {
      "constant": "PSYS_SRC_INNERANGLE",
      "value": "10",
      "parameters": [
        {
          "type": "float",
          "name": "angle_inner"
        }
      ],
      "description": "DEPRECATED: Use PSYS_SRC_ANGLE_BEGIN instead. Works similar to its replacement rule, except the edge of the section is aligned with the emitter facing, rather than its center."
    },
    {
      "constant": "PSYS_SRC_OUTERANGLE",
      "value": "11",
      "parameters": [
        {
          "type": "float",
          "name": "angle_outer"
        }
      ],
      "description": "DEPRECATED: Use PSYS_SRC_ANGLE_END instead. Works similar to its replacement rule, except the edge of the section is aligned with the emitter facing, rather than the section's center."
    },
    {
      "constant": "PSYS_SRC_TARGET_KEY",
      "value": "20",
      "parameters": [
        {
          "type": "key",
          "name": "target"
        }
      ],
      "description": "Specifies the key of a target object, prim, or agent towards which the particles will change course and move (if PSYS_PART_TARGET_POS_MASK is specified) or will move in a straight line (if PSYS_PART_TARGET_LINEAR_MASK is specified). They will attempt to end up at the geometric center of the target at the end of their lifetime. Requires the PSYS_PART_TARGET_POS_MASK or PSYS_PART_TARGET_LINEAR_MASK flag be set. caveat 4"
    },
    {
      "constant": "PSYS_PART_START_COLOR",
      "value": "1",
      "parameters": [
        {
          "type": "vector",
          "name": "color_start"
        }
      ],
      "description": "A vector specifying the color of the particles upon emission."
    },
    {
      "constant": "PSYS_PART_END_COLOR",
      "value": "3",
      "parameters": [
        {
          "type": "vector",
          "name": "color_end"
        }
      ],
      "description": "A vector specifying the color the particles transition to during their lifetime. Only used if the PSYS_PART_INTERP_COLOR_MASK flag is set."
    },
    {
      "constant": "PSYS_PART_START_ALPHA",
      "value": "2",
      "parameters": [
        {
          "type": "float",
          "name": "alpha_start"
        }
      ],
      "description": "Specifies the alpha of the particles upon emission. Valid values are in the range 0.0 to 1.0. Lower values are more transparent; higher ones are more opaque."
    },
    {
      "constant": "PSYS_PART_END_ALPHA",
      "value": "4",
      "parameters": [
        {
          "type": "float",
          "name": "alpha_end"
        }
      ],
      "description": "Specifies the alpha the particles transition to during their lifetime. Only used if the PSYS_PART_INTERP_COLOR_MASK flag is set. Valid values are the same as PSYS_PART_START_ALPHA."
    },
    {
      "constant": "PSYS_PART_START_SCALE",
      "value": "5",
      "parameters": [
        {
          "type": "vector",
          "name": "scale_start"
        }
      ],
      "description": "Specifies the scale or size of the particles upon emission. Valid values for each direction are 0.03125 to 4.0, in meters. The actual particle size is always a multiple of 0.03125. Smaller changes don't have any effect. Since particles are essentially 2D sprites, the Z component of the vector is ignored and can be set to 0.0."
    },
    {
      "constant": "PSYS_PART_END_SCALE",
      "value": "6",
      "parameters": [
        {
          "type": "vector",
          "name": "scale_end"
        }
      ],
      "description": "Specifies the scale or size the particles transition to during their lifetime. Only used if the PSYS_PART_INTERP_SCALE_MASK flag is set. Valid values are the same as PSYS_PART_START_SCALE."
    },
    {
      "constant": "PSYS_SRC_TEXTURE",
      "value": "12",
      "parameters": [
        {
          "type": "string",
          "name": "texture"
        }
      ],
      "description": "Specifies the name of a texture in the emitter prim's inventory to use for each particle. Alternatively, you may specify an asset key UUID for a texture. If using llLinkParticleSystem and texture is not a UUID, texture must be in the emitter prim (not necessarily with the script)."
    },
    {
      "constant": "PSYS_PART_START_GLOW",
      "value": "26",
      "parameters": [
        {
          "type": "float",
          "name": "glow_start"
        }
      ],
      "description": "Specifies the glow of the particles upon emission. Valid values are in the range of 0.0 (no glow) to 1.0 (full glow)."
    },
    {
      "constant": "PSYS_PART_END_GLOW",
      "value": "27",
      "parameters": [
        {
          "type": "float",
          "name": "glow_end"
        }
      ],
      "description": "Specifies the glow that the particles transition to during their lifetime. Valid values are the same as PSYS_PART_START_GLOW."
    },
    {
      "constant": "PSYS_PART_BLEND_FUNC_SOURCE",
      "value": "24",
      "parameters": [
        {
          "type": "integer",
          "name": "bf_source"
        }
      ],
      "description": "Specifies how blending function uses the incoming particle's color and alpha information to produce the rendered result. Defaults to PSYS_PART_BF_SOURCE_ALPHA."
    },
    {
      "constant": "PSYS_PART_BLEND_FUNC_DEST",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "bf_dest"
        }
      ],
      "description": "Specifies how blending function uses the current framebuffer's color and alpha information to produce the rendered result. Defaults to PSYS_PART_BF_ONE_MINUS_SOURCE_ALPHA. To make particles blend with the background in a less opaque and more luminescent way use PSYS_PART_BF_ONE for dest and the default for source. Most other blending combinations will render the invisible/alpha portion of your particle texture, unless the invisible area of your texture is all black (or, in some cases, unless it is all white)."
    },
    {
      "constant": "PSYS_SRC_MAX_AGE",
      "value": "19",
      "parameters": [
        {
          "type": "float",
          "name": "duration_system"
        }
      ],
      "description": "Specifies the length of time, in seconds, that the emitter will operate upon coming into view range (if the particle system is already set) or upon execution of this function (if already in view range). Upon expiration, no more particles will be emitted, except as specified above. Zero will give the particle system an infinite duration. (caveat 1)"
    },
    {
      "constant": "PSYS_PART_MAX_AGE",
      "value": "7",
      "parameters": [
        {
          "type": "float",
          "name": "duration_particle"
        }
      ],
      "description": "Specifies the lifetime of each particle emitted, in seconds. Maximum is 30.0 seconds. During this time, the particle will appear, change appearance and move according to the parameters specified in the other sections, and then disappear."
    },
    {
      "constant": "PSYS_SRC_BURST_RATE",
      "value": "13",
      "parameters": [
        {
          "type": "float",
          "name": "burst_sleep"
        }
      ],
      "description": "Specifies the time interval, in seconds, between 'bursts' of particles being emitted. Specifying a value of 0.0 will cause the emission of particles as fast as the viewer can do so."
    },
    {
      "constant": "PSYS_SRC_BURST_PART_COUNT",
      "value": "15",
      "parameters": [
        {
          "type": "integer",
          "name": "burst_particle_count"
        }
      ],
      "description": "Specifies the number of particles emitted in each 'burst'."
    },
    {
      "constant": "PSYS_SRC_ACCEL",
      "value": "8",
      "parameters": [
        {
          "type": "vector",
          "name": "acceleration"
        }
      ],
      "description": "Specifies a directional acceleration vector applied to each particle as it is emitted, in meters per second squared. Valid values are 0.0 to 100.0 for each direction both positive and negative, as region coordinates."
    },
    {
      "constant": "PSYS_SRC_OMEGA",
      "value": "21",
      "parameters": [
        {
          "type": "vector",
          "name": "omega"
        }
      ],
      "description": "Sets how far to rotate the 'pattern' after each particle burst. (Burst frequency is set with PSYS_SRC_BURST_RATE.) Omega values are approximately 'radians per burst' around the prim's global (not local) X,Y,Z axes. For precise and predictable pattern rotation, rotate the prim instead of using PSYS_SRC_OMEGA. Omega has no visible effect on drop, explode and certain specific angle and angle cone patterns, depending on prim orientation. Pattern rotation can be used with prim orientation and llTargetOmega() but won't produce consistent results. (caveat 2 and caveat 3)"
    },
    {
      "constant": "PSYS_SRC_BURST_SPEED_MIN",
      "value": "17",
      "parameters": [
        {
          "type": "float",
          "name": "speed_min"
        }
      ],
      "description": "Specifies the minimum value of a random range of values which is selected for each particle in a burst as its initial speed upon emission, in meters per second. Note that the value of this parameter and PSYS_SRC_BURST_SPEED_MAX are internally re-ordered such that this parameter gets the smaller of the two values."
    },
    {
      "constant": "PSYS_SRC_BURST_SPEED_MAX",
      "value": "18",
      "parameters": [
        {
          "type": "float",
          "name": "speed_max"
        }
      ],
      "description": "Specifies the maximum value of a random range of values which is selected for each particle in a burst as its initial speed upon emission, in meters per second. Note that the value of this parameter and PSYS_SRC_BURST_SPEED_MIN are internally re-ordered such that this parameter gets the larger of the two values."
    }
  ],
  "llMapBeacon": [
    {
      "constant": "BEACON_MAP",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "open_map"
        },
        {
          "type": "integer",
          "name": "focus_map"
        }
      ],
      "description": "Requests viewer world map behavior. If the first parameter is TRUE the viewer should open the world map. If the second parameter is TRUE this function also requests that the map should receive focus.Note that setting both values to true mimics the behavior of llMapDestination.\nAlso, the focus_map parameter is only meaningful if open_map is TRUE"
    }
  ],
  "llNavigateTo": [
    {
      "constant": "FORCE_DIRECT_PATH",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "default": "FALSE",
      "description": "Makes character navigate in a straight line toward pos. May be set to TRUE or FALSE."
    }
  ],
  "llParcelMediaQuery": [
    {
      "constant": "PARCEL_MEDIA_COMMAND_TEXTURE",
      "value": "4",
      "return": [
        {
          "type": "key",
          "name": "uuid"
        }
      ],
      "description": "Used to get or set the parcel's media texture."
    },
    {
      "constant": "PARCEL_MEDIA_COMMAND_URL",
      "value": "5",
      "return": [
        {
          "type": "string",
          "name": "url"
        }
      ],
      "description": "Used to get or set the parcel's media url."
    },
    {
      "constant": "PARCEL_MEDIA_COMMAND_TYPE",
      "value": "10",
      "return": [
        {
          "type": "string",
          "name": "mime_type"
        }
      ],
      "description": "Used to get or set the parcel media MIME type (e.g. 'text/html'). (1.19.1 RC0 or later)"
    },
    {
      "constant": "PARCEL_MEDIA_COMMAND_SIZE",
      "value": "11",
      "return": [
        {
          "type": "integer",
          "name": "x"
        },
        {
          "type": "integer",
          "name": "y"
        }
      ],
      "description": "Used to get or set the parcel media pixel resolution. (1.19.1 RC0 or later)"
    },
    {
      "constant": "PARCEL_MEDIA_COMMAND_DESC",
      "value": "12",
      "return": [
        {
          "type": "string",
          "name": "desc"
        }
      ],
      "description": "Used to get or set the parcel media description. (1.19.1 RC0 or later)"
    },
    {
      "constant": "PARCEL_MEDIA_COMMAND_LOOP_SET",
      "value": "13",
      "return": [
        {
          "type": "float",
          "name": "loop"
        }
      ],
      "description": "Used to get or set the parcel's media loop duration. (1.19.1 RC0 or later)"
    }
  ],
  "llParticleSystem": [
    {
      "constant": "PSYS_PART_FLAGS",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Various flags controlling the behavior of the particle system. The value may be specified as an integer in decimal or hex format, or by ORing together (using the | operator) one or more of the following flag constants:"
    },
    {
      "constant": "PSYS_SRC_PATTERN",
      "value": "9",
      "parameters": [
        {
          "type": "integer",
          "name": "pattern"
        }
      ],
      "description": "Specifies the general emission pattern."
    },
    {
      "constant": "PSYS_SRC_BURST_RADIUS",
      "value": "16",
      "parameters": [
        {
          "type": "float",
          "name": "radius"
        }
      ],
      "description": "Specifies the distance from the emitter where particles will be created. This rule is ignored when the PSYS_PART_FOLLOW_SRC_MASK flag is set. A test in http://forums-archive.secondlife.com/327/f5/226722/1.html indicates that the maximum value is 50.00"
    },
    {
      "constant": "PSYS_SRC_ANGLE_BEGIN",
      "value": "22",
      "parameters": [
        {
          "type": "float",
          "name": "angle_begin"
        }
      ],
      "description": "Specifies a half angle, in radians, of a circular or spherical 'dimple' or conic section (starting from the emitter facing) within which particles will NOT be emitted. Valid values are the same as for PSYS_SRC_ANGLE_END, though the effects are reversed accordingly. If the pattern is PSYS_SRC_PATTERN_ANGLE, the presentation is a 2D flat circular section. If PSYS_SRC_PATTERN_ANGLE_CONE or PSYS_SRC_PATTERN_ANGLE_CONE_EMPTY is used, the presentation is a 3D spherical section. Note that the value of this parameter and PSYS_SRC_ANGLE_END are internally re-ordered such that this parameter gets the smaller of the two values."
    },
    {
      "constant": "PSYS_SRC_ANGLE_END",
      "value": "23",
      "parameters": [
        {
          "type": "float",
          "name": "angle_end"
        }
      ],
      "description": "Specifies a half angle, in radians, of a circular or spherical 'dimple' or conic section (starting from the emitter facing) within which particles WILL be emitted. Valid values are 0.0, which will result in particles being emitted in a straight line in the direction of the emitter facing, to PI, which will result in particles being emitted in a full circular or spherical arc around the emitter, not including the 'dimple' or conic section defined by PSYS_SRC_ANGLE_BEGIN. If the pattern is PSYS_SRC_PATTERN_ANGLE, the presentation is a 2D flat circular section. If PSYS_SRC_PATTERN_ANGLE_CONE or PSYS_SRC_PATTERN_ANGLE_CONE_EMPTY is used, the presentation is a 3D spherical section. Note that the value of this parameter and PSYS_SRC_ANGLE_BEGIN are internally re-ordered such that this parameter gets the larger of the two values."
    },
    {
      "constant": "PSYS_SRC_INNERANGLE",
      "value": "10",
      "parameters": [
        {
          "type": "float",
          "name": "angle_inner"
        }
      ],
      "description": "DEPRECATED: Use PSYS_SRC_ANGLE_BEGIN instead. Works similar to its replacement rule, except the edge of the section is aligned with the emitter facing, rather than its center."
    },
    {
      "constant": "PSYS_SRC_OUTERANGLE",
      "value": "11",
      "parameters": [
        {
          "type": "float",
          "name": "angle_outer"
        }
      ],
      "description": "DEPRECATED: Use PSYS_SRC_ANGLE_END instead. Works similar to its replacement rule, except the edge of the section is aligned with the emitter facing, rather than the section's center."
    },
    {
      "constant": "PSYS_SRC_TARGET_KEY",
      "value": "20",
      "parameters": [
        {
          "type": "key",
          "name": "target"
        }
      ],
      "description": "Specifies the key of a target object, prim, or agent towards which the particles will change course and move (if PSYS_PART_TARGET_POS_MASK is specified) or will move in a straight line (if PSYS_PART_TARGET_LINEAR_MASK is specified). They will attempt to end up at the geometric center of the target at the end of their lifetime. Requires the PSYS_PART_TARGET_POS_MASK or PSYS_PART_TARGET_LINEAR_MASK flag be set. caveat 4"
    },
    {
      "constant": "PSYS_PART_START_COLOR",
      "value": "1",
      "parameters": [
        {
          "type": "vector",
          "name": "color_start"
        }
      ],
      "description": "A vector specifying the color of the particles upon emission."
    },
    {
      "constant": "PSYS_PART_END_COLOR",
      "value": "3",
      "parameters": [
        {
          "type": "vector",
          "name": "color_end"
        }
      ],
      "description": "A vector specifying the color the particles transition to during their lifetime. Only used if the PSYS_PART_INTERP_COLOR_MASK flag is set."
    },
    {
      "constant": "PSYS_PART_START_ALPHA",
      "value": "2",
      "parameters": [
        {
          "type": "float",
          "name": "alpha_start"
        }
      ],
      "description": "Specifies the alpha of the particles upon emission. Valid values are in the range 0.0 to 1.0. Lower values are more transparent; higher ones are more opaque."
    },
    {
      "constant": "PSYS_PART_END_ALPHA",
      "value": "4",
      "parameters": [
        {
          "type": "float",
          "name": "alpha_end"
        }
      ],
      "description": "Specifies the alpha the particles transition to during their lifetime. Only used if the PSYS_PART_INTERP_COLOR_MASK flag is set. Valid values are the same as PSYS_PART_START_ALPHA."
    },
    {
      "constant": "PSYS_PART_START_SCALE",
      "value": "5",
      "parameters": [
        {
          "type": "vector",
          "name": "scale_start"
        }
      ],
      "description": "Specifies the scale or size of the particles upon emission. Valid values for each direction are 0.03125 to 4.0, in meters. The actual particle size is always a multiple of 0.03125. Smaller changes don't have any effect. Since particles are essentially 2D sprites, the Z component of the vector is ignored and can be set to 0.0."
    },
    {
      "constant": "PSYS_PART_END_SCALE",
      "value": "6",
      "parameters": [
        {
          "type": "vector",
          "name": "scale_end"
        }
      ],
      "description": "Specifies the scale or size the particles transition to during their lifetime. Only used if the PSYS_PART_INTERP_SCALE_MASK flag is set. Valid values are the same as PSYS_PART_START_SCALE."
    },
    {
      "constant": "PSYS_SRC_TEXTURE",
      "value": "12",
      "parameters": [
        {
          "type": "string",
          "name": "texture"
        }
      ],
      "description": "Specifies the name of a texture in the emitter prim's inventory to use for each particle. Alternatively, you may specify an asset key UUID for a texture. If using llLinkParticleSystem and texture is not a UUID, texture must be in the emitter prim (not necessarily with the script)."
    },
    {
      "constant": "PSYS_PART_START_GLOW",
      "value": "26",
      "parameters": [
        {
          "type": "float",
          "name": "glow_start"
        }
      ],
      "description": "Specifies the glow of the particles upon emission. Valid values are in the range of 0.0 (no glow) to 1.0 (full glow)."
    },
    {
      "constant": "PSYS_PART_END_GLOW",
      "value": "27",
      "parameters": [
        {
          "type": "float",
          "name": "glow_end"
        }
      ],
      "description": "Specifies the glow that the particles transition to during their lifetime. Valid values are the same as PSYS_PART_START_GLOW."
    },
    {
      "constant": "PSYS_PART_BLEND_FUNC_SOURCE",
      "value": "24",
      "parameters": [
        {
          "type": "integer",
          "name": "bf_source"
        }
      ],
      "description": "Specifies how blending function uses the incoming particle's color and alpha information to produce the rendered result. Defaults to PSYS_PART_BF_SOURCE_ALPHA."
    },
    {
      "constant": "PSYS_PART_BLEND_FUNC_DEST",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "bf_dest"
        }
      ],
      "description": "Specifies how blending function uses the current framebuffer's color and alpha information to produce the rendered result. Defaults to PSYS_PART_BF_ONE_MINUS_SOURCE_ALPHA. To make particles blend with the background in a less opaque and more luminescent way use PSYS_PART_BF_ONE for dest and the default for source. Most other blending combinations will render the invisible/alpha portion of your particle texture, unless the invisible area of your texture is all black (or, in some cases, unless it is all white)."
    },
    {
      "constant": "PSYS_SRC_MAX_AGE",
      "value": "19",
      "parameters": [
        {
          "type": "float",
          "name": "duration_system"
        }
      ],
      "description": "Specifies the length of time, in seconds, that the emitter will operate upon coming into view range (if the particle system is already set) or upon execution of this function (if already in view range). Upon expiration, no more particles will be emitted, except as specified above. Zero will give the particle system an infinite duration. (caveat 1)"
    },
    {
      "constant": "PSYS_PART_MAX_AGE",
      "value": "7",
      "parameters": [
        {
          "type": "float",
          "name": "duration_particle"
        }
      ],
      "description": "Specifies the lifetime of each particle emitted, in seconds. Maximum is 30.0 seconds. During this time, the particle will appear, change appearance and move according to the parameters specified in the other sections, and then disappear."
    },
    {
      "constant": "PSYS_SRC_BURST_RATE",
      "value": "13",
      "parameters": [
        {
          "type": "float",
          "name": "burst_sleep"
        }
      ],
      "description": "Specifies the time interval, in seconds, between 'bursts' of particles being emitted. Specifying a value of 0.0 will cause the emission of particles as fast as the viewer can do so."
    },
    {
      "constant": "PSYS_SRC_BURST_PART_COUNT",
      "value": "15",
      "parameters": [
        {
          "type": "integer",
          "name": "burst_particle_count"
        }
      ],
      "description": "Specifies the number of particles emitted in each 'burst'."
    },
    {
      "constant": "PSYS_SRC_ACCEL",
      "value": "8",
      "parameters": [
        {
          "type": "vector",
          "name": "acceleration"
        }
      ],
      "description": "Specifies a directional acceleration vector applied to each particle as it is emitted, in meters per second squared. Valid values are 0.0 to 100.0 for each direction both positive and negative, as region coordinates."
    },
    {
      "constant": "PSYS_SRC_OMEGA",
      "value": "21",
      "parameters": [
        {
          "type": "vector",
          "name": "omega"
        }
      ],
      "description": "Sets how far to rotate the 'pattern' after each particle burst. (Burst frequency is set with PSYS_SRC_BURST_RATE.) Omega values are approximately 'radians per burst' around the prim's global (not local) X,Y,Z axes. For precise and predictable pattern rotation, rotate the prim instead of using PSYS_SRC_OMEGA. Omega has no visible effect on drop, explode and certain specific angle and angle cone patterns, depending on prim orientation. Pattern rotation can be used with prim orientation and llTargetOmega() but won't produce consistent results. (caveat 2 and caveat 3)"
    },
    {
      "constant": "PSYS_SRC_BURST_SPEED_MIN",
      "value": "17",
      "parameters": [
        {
          "type": "float",
          "name": "speed_min"
        }
      ],
      "description": "Specifies the minimum value of a random range of values which is selected for each particle in a burst as its initial speed upon emission, in meters per second. Note that the value of this parameter and PSYS_SRC_BURST_SPEED_MAX are internally re-ordered such that this parameter gets the smaller of the two values."
    },
    {
      "constant": "PSYS_SRC_BURST_SPEED_MAX",
      "value": "18",
      "parameters": [
        {
          "type": "float",
          "name": "speed_max"
        }
      ],
      "description": "Specifies the maximum value of a random range of values which is selected for each particle in a burst as its initial speed upon emission, in meters per second. Note that the value of this parameter and PSYS_SRC_BURST_SPEED_MIN are internally re-ordered such that this parameter gets the larger of the two values."
    }
  ],
  "llPatrolPoints": [
    {
      "constant": "PATROL_PAUSE_AT_WAYPOINTS",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "default": "FALSE",
      "description": "Whether the character should pause briefly after reaching each patrol point."
    }
  ],
  "llPursue": [
    {
      "constant": "PURSUIT_OFFSET",
      "value": "1",
      "default": "ZERO_VECTOR",
      "description": "Go to a position offset from the target.",
      "usage": "LSL"
    },
    {
      "constant": "REQUIRE_LINE_OF_SIGHT",
      "value": "2",
      "default": "FALSE",
      "description": "Define whether the character needs a physical line-of-sight to give chase. When enabled, the character will not pick a new target position while there is a something solid between the character and the target object/agent.",
      "usage": "LSL"
    },
    {
      "constant": "PURSUIT_FUZZ_FACTOR",
      "value": "3",
      "default": "0.0",
      "description": "Selects a random destination near the PURSUIT_OFFSET. The valid fuzz factor range is from 0 to 1, where 1 is most random. This option requires a nonzero PURSUIT_OFFSET.",
      "usage": "LSL"
    },
    {
      "constant": "PURSUIT_INTERCEPT",
      "value": "4",
      "default": "FALSE",
      "description": "Define whether the character attempts to predict the target's future location.",
      "usage": "LSL"
    },
    {
      "constant": "PURSUIT_GOAL_TOLERANCE",
      "value": "5",
      "default": "Default is proportional to character size",
      "description": "Defines approximately how close the character must be to the current goal to consider itself to be at the desired position. The valid range is from 0.25 to 10m.",
      "usage": "LSL"
    }
  ],
  "llRezObjectWithParams": [
    {
      "constant": "REZ_PARAM",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "param"
        }
      ],
      "description": "Start parameter passed into the rezzed object's on_rez(integer) event."
    },
    {
      "constant": "REZ_FLAGS",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Flags applied to rezzed object when it is created in the world.\nFlags\n<table><tbody><tr><th>parameter</th><th>integer value</th><th>description</th></tr><tr><td>REZ_FLAG_TEMP</td><td>0x0001</td><td>Object is rezzed as temporary.</td></tr><tr><td>REZ_FLAG_PHYSICAL</td><td>0x0002</td><td>Object is rezzed as physical.</td></tr><tr><td>REZ_FLAG_PHANTOM</td><td>0x0004</td><td>Object is rezzed as phantom</td></tr><tr><td>REZ_FLAG_DIE_ON_COLLIDE</td><td>0x0008</td><td>The object will die after its first collision.</td></tr><tr><td>REZ_FLAG_DIE_ON_NOENTRY</td><td>0x0010</td><td>Object will die if it attempts to enter a parcel that it can't.</td></tr><tr><td>REZ_FLAG_NO_COLLIDE_OWNER</td><td>0x0020</td><td>Object will not trigger a collision event if colliding with its owner.†</td></tr><tr><td>REZ_FLAG_NO_COLLIDE_FAMILY</td><td>0x0040</td><td>Object will not trigger collision events when colliding with other object rezzed by the same rezzer.†</td></tr><tr><td>REZ_FLAG_BLOCK_GRAB_OBJECT</td><td>0x0080</td><td>Grabbing is disabled for this object.</td></tr></tbody></table>\n† Disabling collisions only disables collision events and damage. The object will still cause a physics collision and may push the objects."
    },
    {
      "constant": "REZ_POS",
      "value": "2",
      "parameters": [
        {
          "type": "vector",
          "name": "pos"
        },
        {
          "type": "integer",
          "name": "relative"
        },
        {
          "type": "integer",
          "name": "at_root"
        }
      ],
      "description": "Position to rez the new object in the world. If relative is FALSE the position is in region coordinates. If relative is TRUE, the position will be relative to the rezzing object.\nIf at_root is FALSE, the center of the object will be at the position specified by pos(llRezObject). Set at_root to TRUE to set the position of the root prim(llRezAtRoot)."
    },
    {
      "constant": "REZ_ROT",
      "value": "3",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "integer",
          "name": "relative"
        }
      ],
      "description": "The initial rotation to apply to the object. If relative is TRUE, the rotation is relative to the rezzing object, otherwise it is absolute."
    },
    {
      "constant": "REZ_VEL",
      "value": "4",
      "parameters": [
        {
          "type": "vector",
          "name": "velocity"
        },
        {
          "type": "integer",
          "name": "local"
        },
        {
          "type": "integer",
          "name": "inherit"
        }
      ],
      "description": "The initial velocity to apply to the object. If local is TRUE the velocity is in the local object coordinate frame, otherwise it is in world coordinates.\nIf inherit is TRUE the object also inherits it's rezzer's velocity."
    },
    {
      "constant": "REZ_ACCEL",
      "value": "5",
      "parameters": [
        {
          "type": "vector",
          "name": "force"
        },
        {
          "type": "integer",
          "name": "local"
        }
      ],
      "description": "A constant force to apply to the object. If local is TRUE, the force vector is in local coordinates."
    },
    {
      "constant": "REZ_OMEGA",
      "value": "7",
      "parameters": [
        {
          "type": "vector",
          "name": "axis"
        },
        {
          "type": "integer",
          "name": "local"
        },
        {
          "type": "float",
          "name": "spin"
        },
        {
          "type": "float",
          "name": "gain"
        }
      ],
      "description": "Spin the object around the specified axis. If local is TRUE that axis is in local coordinates, otherwise they are global."
    },
    {
      "constant": "REZ_DAMAGE",
      "value": "8",
      "parameters": [
        {
          "type": "float",
          "name": "damage"
        }
      ],
      "description": "The amount of damage applied to an agent upon collision with this object."
    },
    {
      "constant": "REZ_SOUND",
      "value": "9",
      "parameters": [
        {
          "type": "string",
          "name": "sound"
        },
        {
          "type": "float",
          "name": "volume"
        },
        {
          "type": "integer",
          "name": "loop"
        }
      ],
      "description": "A sound to attach to this object. It will be played at the specified volume.\nIf loop is TRUE the sound will loop continuously for the life of the object.\nThe sound parameter may be either a sound file in the rezzer's inventory or the UUID of a sound asset."
    },
    {
      "constant": "REZ_SOUND_COLLIDE",
      "value": "10",
      "parameters": [
        {
          "type": "string",
          "name": "sound"
        },
        {
          "type": "float",
          "name": "volume"
        }
      ],
      "description": "A sound to play upon collision with another object, the ground or an avatar.\nThe sound parameter may be either a sound file in the rezzer's inventory or the UUID of a sound asset."
    },
    {
      "constant": "REZ_LOCK_AXES",
      "value": "11",
      "parameters": [
        {
          "type": "vector",
          "name": "locks"
        }
      ],
      "description": "Prevent the object from spinning on certain axes. Setting the vector's coordinate to non-zero will prevent the object from spinning on that axis.\nFor instance LSL\n`} lang='lsl' />\n\n will allow the object to only rotate around its Z-axis."
    },
    {
      "constant": "REZ_DAMAGE_TYPE",
      "value": "12",
      "parameters": [
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "The damage type to apply when this prim collides with another object. Can match one of the DAMAGE_TYPE_* constants, be a custom damage type or repurpose the damage field."
    },
    {
      "constant": "REZ_PARAM_STRING",
      "value": "13",
      "parameters": [
        {
          "type": "string",
          "name": "start_param"
        }
      ],
      "description": "Pass an initialization string to the root prim of the newly rezzed object that may be read with llGetStartString from within the rezzed object.\nMaximum string length is 1024 bytes."
    }
  ],
  "llSetAgentEnvironment": [
    {
      "constant": "SKY_CLOUDS",
      "value": "2",
      "parameters": [
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "coverage"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "float",
          "name": "variance"
        },
        {
          "type": "vector",
          "name": "scroll"
        },
        {
          "type": "vector",
          "name": "density"
        },
        {
          "type": "vector",
          "name": "detail"
        }
      ],
      "description": "Environmental cloud information:\ncolor: The color used for the clouds.range = [<0,0,0>, <1,1,1>]\ncoverage: The coverage percentage.range = [0, 1]\nscale: The scaling applied to the cloud textures.range = (0 - 3]\nvariance: A randomizing factor applied to the main cloud layer.range = [0, 1]\nscroll: The scroll speed of the clouds. X is east/west, Y is north/south, and Z is unused.range = [<-50,-50>, <50,50>]\ndensity: The X/Y and D parameter used to generate cloud density.range = [<0,0,0>, <1,1,3>]\ndetail: The X/Y and D parameter used to generate cloud details.range = [<0,0,0>, <1,1,1>"
    },
    {
      "constant": "SKY_CLOUD_TEXTURE",
      "value": "19",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of item in inventory or UUID for texture to be used for the clouds."
    },
    {
      "constant": "SKY_DOME",
      "value": "4",
      "parameters": [
        {
          "type": "float",
          "name": "offset"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "max_altitude"
        }
      ],
      "description": "Sky dome information.\noffset: offset applied to the sky dome.range = [0,1]\nradius: radius of the sky dome.range = [1000,2000]\nmax_altitude: altitude of the sky dome.range = [0,10000"
    },
    {
      "constant": "SKY_GAMMA",
      "value": "5",
      "parameters": [
        {
          "type": "float",
          "name": "gamma"
        }
      ],
      "description": "The gamma value applied to the scene.range = [0,20"
    },
    {
      "constant": "SKY_GLOW",
      "value": "6",
      "parameters": [
        {
          "type": "float",
          "name": "glow_size"
        },
        {
          "type": "float",
          "name": "glow_focus"
        }
      ],
      "description": "Glow applied to the sun and moon.\nglow_size: size of glow effect.range = [0.2, 40]\nglow_focus: focus of glow effect.Range [-10, 10"
    },
    {
      "constant": "SKY_MOON",
      "value": "9",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "float",
          "name": "brightness"
        }
      ],
      "description": "Detailed moon information:\nrot: The current rotation applied to the moon.Normalized rotation.\nscale: The current scale applied to the moon's texture.range = [0.25, 20]\nbrightness: The moon's brightness.range = [0,1"
    },
    {
      "constant": "SKY_MOON_TEXTURE",
      "value": "20",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of texture in inventory or UUID for texture to be used for the moon."
    },
    {
      "constant": "SKY_STAR_BRIGHTNESS",
      "value": "13",
      "parameters": [
        {
          "type": "float",
          "name": "brightness"
        }
      ],
      "description": "Brightness value applied to stars.range = [0,500"
    },
    {
      "constant": "SKY_SUN",
      "value": "14",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "vector",
          "name": "sun_color"
        }
      ],
      "description": "Detailed sun information:\nrot: The current rotation applied to the sun.Normalized rotation.\nscale: The current scale applied to the sun's texture.range = [0.25, 20]\nsun_color: The sun's color.range = [<0,0,0>, <1,1,1>"
    },
    {
      "constant": "SKY_SUN_TEXTURE",
      "value": "21",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of texture in inventory or UUID for texture to be used for the sun."
    },
    {
      "constant": "SKY_PLANET",
      "value": "10",
      "parameters": [
        {
          "type": "float",
          "name": "planet_radius"
        },
        {
          "type": "float",
          "name": "sky_bottom_radius"
        },
        {
          "type": "float",
          "name": "sky_top_radius"
        }
      ],
      "description": "Planet information used in rendering the sky.\nplanet_radius: range = [1000, 32768]\nsky_bottom_radius: range = [1000, 32768]\nsky_top_radius: range = [1000, 32768"
    },
    {
      "constant": "SKY_REFRACTION",
      "value": "11",
      "parameters": [
        {
          "type": "float",
          "name": "moisture_level"
        },
        {
          "type": "float",
          "name": "droplet_radius"
        },
        {
          "type": "float",
          "name": "ice_level"
        }
      ],
      "description": "Sky refraction parameters for rainbows and optical effects.\nmoisture_level: range = [0, 1]\ndroplet_radius: range = [5, 1000]\nice_level: range = [0, 1"
    },
    {
      "constant": "WATER_BLUR_MULTIPLIER",
      "value": "100",
      "parameters": [
        {
          "type": "float",
          "name": "multiplier"
        }
      ],
      "description": "Multiplier applied to blur the scene when under water.\nrange = [-0.5, 0.5"
    },
    {
      "constant": "WATER_FOG",
      "value": "101",
      "parameters": "vector color, float density, fload modulation",
      "description": "Fog parameters applied when underwater:\ncolor: The color of the underwater fog.range = [<0,0,0>, <1,1,1>]\ndensity: Density exponent applied to the fog.range = [-10, 10]\nmodulation:range = [0, 20"
    },
    {
      "constant": "WATER_FRESNEL",
      "value": "102",
      "parameters": [
        {
          "type": "float",
          "name": "offset"
        },
        {
          "type": "float",
          "name": "scale"
        }
      ],
      "description": "Fresnel scattering applied to the surface of the water.\noffset: range = [0,1]\nscale: range = [0,1"
    },
    {
      "constant": "WATER_NORMAL_TEXTURE",
      "value": "107",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of texture in inventory or UUID of texture to be used for the water normal."
    },
    {
      "constant": "WATER_NORMAL_SCALE",
      "value": "104",
      "parameters": [
        {
          "type": "vector",
          "name": "scale"
        }
      ],
      "description": "Scaling applied to the water normal map.\nrange = [<0,0,0>, <10,10,10>"
    },
    {
      "constant": "WATER_REFRACTION",
      "value": "105",
      "parameters": [
        {
          "type": "float",
          "name": "scale_above"
        },
        {
          "type": "float",
          "name": "scale_below"
        }
      ],
      "description": "Refraction factors when looking through the surface of the water.\nscale_above: range = [0, 3]\nscale_below: range = [0, 3"
    },
    {
      "constant": "WATER_WAVE_DIRECTION",
      "value": "106",
      "parameters": [
        {
          "type": "vector",
          "name": "large_wave"
        },
        {
          "type": "vector",
          "name": "small_wave"
        }
      ],
      "description": "Vector for the directions of the waves Y represents north/south and X represents movement east/west.\nlarge_wave: Large wave speed and direction.range = [<-20, -20>, <20, 20>]\nsmall_wave: Small wave speed and direction.range = [<-20, -20>, <20, 20>"
    },
    {
      "constant": "SKY_AMBIENT",
      "value": "0",
      "parameters": [
        {
          "type": "vector",
          "name": "color"
        }
      ],
      "description": "Ambient color used in the scene."
    },
    {
      "constant": "SKY_BLUE",
      "value": "22",
      "parameters": [
        {
          "type": "vector",
          "name": "blue_density"
        },
        {
          "type": "vector",
          "name": "blue_horizon"
        }
      ],
      "description": "Change the colors used to calculate blue density and blue horizon in the environment."
    },
    {
      "constant": "SKY_HAZE",
      "value": "23",
      "parameters": [
        {
          "type": "float",
          "name": "density"
        },
        {
          "type": "float",
          "name": "horizon"
        },
        {
          "type": "float",
          "name": "density_multiplier"
        },
        {
          "type": "float",
          "name": "distance_multiplier"
        }
      ],
      "description": "Values used to calculate the impact of blue_density and blue_horizon on the scene lighting."
    },
    {
      "constant": "SKY_REFLECTION_PROBE_AMBIANCE",
      "value": "24",
      "parameters": [
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Minimum ambiance value for all reflection probes.\nrange = [0.0, 10.0]\nCaveat: This feature will be supported in the upcoming GLTF Materials project. Currently it will only work in supported testing areas with a supported test viewer."
    }
  ],
  "llSetCameraParams": [
    {
      "constant": "CAMERA_ACTIVE",
      "value": "12",
      "parameters": [
        {
          "type": "integer",
          "name": "isActive"
        }
      ],
      "default": "FALSE",
      "description": "Turns on or off scripted control of the camera.",
      "range": "TRUE or FALSE"
    },
    {
      "constant": "CAMERA_BEHINDNESS_ANGLE",
      "value": "8",
      "parameters": [
        {
          "type": "float",
          "name": "degrees"
        }
      ],
      "default": "10.0",
      "description": "Sets the angle in degrees within which the camera is not constrained by changes in target rotation.",
      "range": "0 to 180"
    },
    {
      "constant": "CAMERA_BEHINDNESS_LAG",
      "value": "9",
      "parameters": [
        {
          "type": "float",
          "name": "seconds"
        }
      ],
      "default": "0.0",
      "description": "Sets how strongly the camera is forced to stay behind the target if outside of behindness angle.",
      "range": "0 to 3"
    },
    {
      "constant": "CAMERA_DISTANCE",
      "value": "7",
      "parameters": [
        {
          "type": "float",
          "name": "meters"
        }
      ],
      "default": "3.0",
      "description": "Sets how far away the camera wants to be from its target.",
      "range": "0.5 to 50"
    },
    {
      "constant": "CAMERA_FOCUS",
      "value": "17",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "default": "n/a",
      "description": "Sets camera focus (target position) in region coordinates.",
      "range": "n/a"
    },
    {
      "constant": "CAMERA_FOCUS_LAG",
      "value": "6",
      "parameters": [
        {
          "type": "float",
          "name": "seconds"
        }
      ],
      "default": "0.1",
      "description": "How much the camera lags as it tries to aim towards the target.",
      "range": "0 to 3"
    },
    {
      "constant": "CAMERA_FOCUS_LOCKED",
      "value": "22",
      "parameters": [
        {
          "type": "integer",
          "name": "isLocked"
        }
      ],
      "default": "FALSE",
      "description": "Locks the camera focus so it will not move.",
      "range": "TRUE or FALSE"
    },
    {
      "constant": "CAMERA_FOCUS_OFFSET",
      "value": "1",
      "parameters": [
        {
          "type": "vector",
          "name": "meters"
        }
      ],
      "default": "<0.0,0.0,0.0>",
      "description": "Adjusts the camera focus position relative to the target.",
      "range": "<-10,-10,-10> to <10,10,10>"
    },
    {
      "constant": "CAMERA_FOCUS_THRESHOLD",
      "value": "11",
      "parameters": [
        {
          "type": "float",
          "name": "meters"
        }
      ],
      "default": "1.0",
      "description": "Sets the radius of a sphere around the camera's target position within which its focus is not affected by target motion.",
      "range": "0 to 4"
    },
    {
      "constant": "CAMERA_PITCH",
      "value": "0",
      "parameters": [
        {
          "type": "float",
          "name": "degrees"
        }
      ],
      "default": "0.0",
      "description": "Adjusts the angular amount that the camera aims straight ahead vs. straight down, maintaining the same distance; analogous to 'incidence'.'",
      "range": "-45 to 80"
    },
    {
      "constant": "CAMERA_POSITION",
      "value": "13",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "default": "n/a",
      "description": "Sets camera position in region coordinates.",
      "range": "n/a"
    },
    {
      "constant": "CAMERA_POSITION_LAG",
      "value": "5",
      "parameters": [
        {
          "type": "float",
          "name": "seconds"
        }
      ],
      "default": "0.1",
      "description": "How much the camera lags as it tries to move towards its 'ideal' position.",
      "range": "0 to 3"
    },
    {
      "constant": "CAMERA_POSITION_LOCKED",
      "value": "21",
      "parameters": [
        {
          "type": "integer",
          "name": "isLocked"
        }
      ],
      "default": "FALSE",
      "description": "Locks the camera position so it will not move.",
      "range": "TRUE or FALSE"
    },
    {
      "constant": "CAMERA_POSITION_THRESHOLD",
      "value": "10",
      "parameters": [
        {
          "type": "float",
          "name": "meters"
        }
      ],
      "default": "1.0",
      "description": "Sets the radius of a sphere around the camera's ideal position within which it is not affected by target motion.",
      "range": "0 to 4"
    }
  ],
  "llSetEnvironment": [
    {
      "constant": "SKY_CLOUDS",
      "value": "2",
      "parameters": [
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "coverage"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "float",
          "name": "variance"
        },
        {
          "type": "vector",
          "name": "scroll"
        },
        {
          "type": "vector",
          "name": "density"
        },
        {
          "type": "vector",
          "name": "detail"
        }
      ],
      "description": "Environmental cloud information:\ncolor: The color used for the clouds.range = [<0,0,0>, <1,1,1>]\ncoverage: The coverage percentage.range = [0, 1]\nscale: The scaling applied to the cloud textures.range = (0 - 3]\nvariance: A randomizing factor applied to the main cloud layer.range = [0, 1]\nscroll: The scroll speed of the clouds. X is east/west, Y is north/south, and Z is unused.range = [<-50,-50>, <50,50>]\ndensity: The X/Y and D parameter used to generate cloud density.range = [<0,0,0>, <1,1,3>]\ndetail: The X/Y and D parameter used to generate cloud details.range = [<0,0,0>, <1,1,1>"
    },
    {
      "constant": "SKY_CLOUD_TEXTURE",
      "value": "19",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of item in inventory or UUID for texture to be used for the clouds."
    },
    {
      "constant": "SKY_DOME",
      "value": "4",
      "parameters": [
        {
          "type": "float",
          "name": "offset"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "max_altitude"
        }
      ],
      "description": "Sky dome information.\noffset: offset applied to the sky dome.range = [0,1]\nradius: radius of the sky dome.range = [1000,2000]\nmax_altitude: altitude of the sky dome.range = [0,10000"
    },
    {
      "constant": "SKY_GAMMA",
      "value": "5",
      "parameters": [
        {
          "type": "float",
          "name": "gamma"
        }
      ],
      "description": "The gamma value applied to the scene.range = [0,20"
    },
    {
      "constant": "SKY_GLOW",
      "value": "6",
      "parameters": [
        {
          "type": "float",
          "name": "glow_size"
        },
        {
          "type": "float",
          "name": "glow_focus"
        }
      ],
      "description": "Glow applied to the sun and moon.\nglow_size: size of glow effect.range = [0.2, 40]\nglow_focus: focus of glow effect.Range [-10, 10"
    },
    {
      "constant": "SKY_MOON",
      "value": "9",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "float",
          "name": "brightness"
        }
      ],
      "description": "Detailed moon information:\nrot: The current rotation applied to the moon.Normalized rotation.\nscale: The current scale applied to the moon's texture.range = [0.25, 20]\nbrightness: The moon's brightness.range = [0,1"
    },
    {
      "constant": "SKY_MOON_TEXTURE",
      "value": "20",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of texture in inventory or UUID for texture to be used for the moon."
    },
    {
      "constant": "SKY_STAR_BRIGHTNESS",
      "value": "13",
      "parameters": [
        {
          "type": "float",
          "name": "brightness"
        }
      ],
      "description": "Brightness value applied to stars.range = [0,500"
    },
    {
      "constant": "SKY_SUN",
      "value": "14",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        },
        {
          "type": "float",
          "name": "scale"
        },
        {
          "type": "vector",
          "name": "sun_color"
        }
      ],
      "description": "Detailed sun information:\nrot: The current rotation applied to the sun.Normalized rotation.\nscale: The current scale applied to the sun's texture.range = [0.25, 20]\nsun_color: The sun's color.range = [<0,0,0>, <1,1,1>"
    },
    {
      "constant": "SKY_SUN_TEXTURE",
      "value": "21",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of texture in inventory or UUID for texture to be used for the sun."
    },
    {
      "constant": "SKY_PLANET",
      "value": "10",
      "parameters": [
        {
          "type": "float",
          "name": "planet_radius"
        },
        {
          "type": "float",
          "name": "sky_bottom_radius"
        },
        {
          "type": "float",
          "name": "sky_top_radius"
        }
      ],
      "description": "Planet information used in rendering the sky.\nplanet_radius: range = [1000, 32768]\nsky_bottom_radius: range = [1000, 32768]\nsky_top_radius: range = [1000, 32768"
    },
    {
      "constant": "SKY_REFRACTION",
      "value": "11",
      "parameters": [
        {
          "type": "float",
          "name": "moisture_level"
        },
        {
          "type": "float",
          "name": "droplet_radius"
        },
        {
          "type": "float",
          "name": "ice_level"
        }
      ],
      "description": "Sky refraction parameters for rainbows and optical effects.\nmoisture_level: range = [0, 1]\ndroplet_radius: range = [5, 1000]\nice_level: range = [0, 1"
    },
    {
      "constant": "WATER_BLUR_MULTIPLIER",
      "value": "100",
      "parameters": [
        {
          "type": "float",
          "name": "multiplier"
        }
      ],
      "description": "Multiplier applied to blur the scene when under water.\nrange = [-0.5, 0.5"
    },
    {
      "constant": "WATER_FOG",
      "value": "101",
      "parameters": "vector color, float density, fload modulation",
      "description": "Fog parameters applied when underwater:\ncolor: The color of the underwater fog.range = [<0,0,0>, <1,1,1>]\ndensity: Density exponent applied to the fog.range = [-10, 10]\nmodulation:range = [0, 20"
    },
    {
      "constant": "WATER_FRESNEL",
      "value": "102",
      "parameters": [
        {
          "type": "float",
          "name": "offset"
        },
        {
          "type": "float",
          "name": "scale"
        }
      ],
      "description": "Fresnel scattering applied to the surface of the water.\noffset: range = [0,1]\nscale: range = [0,1"
    },
    {
      "constant": "WATER_NORMAL_TEXTURE",
      "value": "107",
      "parameters": [
        {
          "type": "string",
          "name": "texture_ident"
        }
      ],
      "description": "Name of texture in inventory or UUID of texture to be used for the water normal."
    },
    {
      "constant": "WATER_NORMAL_SCALE",
      "value": "104",
      "parameters": [
        {
          "type": "vector",
          "name": "scale"
        }
      ],
      "description": "Scaling applied to the water normal map.\nrange = [<0,0,0>, <10,10,10>"
    },
    {
      "constant": "WATER_REFRACTION",
      "value": "105",
      "parameters": [
        {
          "type": "float",
          "name": "scale_above"
        },
        {
          "type": "float",
          "name": "scale_below"
        }
      ],
      "description": "Refraction factors when looking through the surface of the water.\nscale_above: range = [0, 3]\nscale_below: range = [0, 3"
    },
    {
      "constant": "WATER_WAVE_DIRECTION",
      "value": "106",
      "parameters": [
        {
          "type": "vector",
          "name": "large_wave"
        },
        {
          "type": "vector",
          "name": "small_wave"
        }
      ],
      "description": "Vector for the directions of the waves Y represents north/south and X represents movement east/west.\nlarge_wave: Large wave speed and direction.range = [<-20, -20>, <20, 20>]\nsmall_wave: Small wave speed and direction.range = [<-20, -20>, <20, 20>"
    },
    {
      "constant": "SKY_AMBIENT",
      "value": "0",
      "parameters": [
        {
          "type": "vector",
          "name": "color"
        }
      ],
      "description": "Ambient color used in the scene."
    },
    {
      "constant": "SKY_BLUE",
      "value": "22",
      "parameters": [
        {
          "type": "vector",
          "name": "blue_density"
        },
        {
          "type": "vector",
          "name": "blue_horizon"
        }
      ],
      "description": "Change the colors used to calculate blue density and blue horizon in the environment."
    },
    {
      "constant": "SKY_HAZE",
      "value": "23",
      "parameters": [
        {
          "type": "float",
          "name": "density"
        },
        {
          "type": "float",
          "name": "horizon"
        },
        {
          "type": "float",
          "name": "density_multiplier"
        },
        {
          "type": "float",
          "name": "distance_multiplier"
        }
      ],
      "description": "Values used to calculate the impact of blue_density and blue_horizon on the scene lighting."
    },
    {
      "constant": "SKY_REFLECTION_PROBE_AMBIANCE",
      "value": "24",
      "parameters": [
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Minimum ambiance value for all reflection probes.\nrange = [0.0, 10.0]\nCaveat: This feature will be supported in the upcoming GLTF Materials project. Currently it will only work in supported testing areas with a supported test viewer."
    }
  ],
  "llSetGroundTexture": [
    {
      "constant": "TERRAIN_DETAIL_1",
      "value": "0",
      "description": "Sets the texture to use for the current terrain detail layer. texture_id must be the UUID of a texture or material, or the name of a texture or material in the object's inventory.\nPassing NULL_KEY or an empty string will set the terrain texture to the default.",
      "format": "TERRAIN_DETAIL_#, texture_id"
    },
    {
      "constant": "TERRAIN_DETAIL_2",
      "value": "1",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_DETAIL_3",
      "value": "2",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_DETAIL_4",
      "value": "3",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_HEIGHT_RANGE_SW",
      "value": "4",
      "description": "Sets the height range for terrain for texture blending in the region. low is the maximum height for texture 1 and high is the minimum height for texture 4, textures 2 and 3 will mix in between these values.",
      "format": "TERRAIN_HEIGHT_RANGE_XX, float low, float high"
    },
    {
      "constant": "TERRAIN_HEIGHT_RANGE_SE",
      "value": "5",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_HEIGHT_RANGE_NW",
      "value": "6",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_HEIGHT_RANGE_NE",
      "value": "7",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_SCALE_1",
      "value": "8",
      "description": "Sets the UV scale used for each layer's terrain texture in repeats per meter.The Z value of the vector is ignored.\nOnly works for PBR textures.",
      "format": "TERRAIN_PBR_SCALE_#, vector uv_scale"
    },
    {
      "constant": "TERRAIN_PBR_SCALE_2",
      "value": "9",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_SCALE_3",
      "value": "10",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_SCALE_4",
      "value": "11",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_ROTATION_1",
      "value": "12",
      "description": "Sets the rotation of the PBR texture for each layer, in radians.Only works for PBR textures.",
      "format": "TERRAIN_PBR_ROTATION_#, float rotation"
    },
    {
      "constant": "TERRAIN_PBR_ROTATION_2",
      "value": "13",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_ROTATION_3",
      "value": "14",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_ROTATION_4",
      "value": "15",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_OFFSET_1",
      "value": "16",
      "description": "Sets the UV offset for drawing each terrain layer.The Z value of the vector is ignored.\nOnly works for PBR textures.",
      "format": "TERRAIN_PBR_OFFSET_#, vector uv_offset"
    },
    {
      "constant": "TERRAIN_PBR_OFFSET_2",
      "value": "17",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_OFFSET_3",
      "value": "18",
      "description": "",
      "format": ""
    },
    {
      "constant": "TERRAIN_PBR_OFFSET_4",
      "value": "19",
      "description": "",
      "format": ""
    }
  ],
  "llSetKeyframedMotion": [
    {
      "constant": "KFM_COMMAND",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "command"
        }
      ],
      "description": "Sets the command"
    },
    {
      "constant": "KFM_MODE",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "mode"
        }
      ],
      "description": "Sets the playback modeDefaults to KFM_FORWARD"
    },
    {
      "constant": "KFM_DATA",
      "value": "2",
      "parameters": [
        {
          "type": "integer",
          "name": "fields"
        }
      ],
      "description": "Sets what data the keyframes containDefaults to (KFM_ROTATION | KFM_TRANSLATION)"
    }
  ],
  "llSetLinkGLTFOverrides": [
    {
      "constant": "OVERRIDE_GLTF_BASE_COLOR_FACTOR",
      "value": "1",
      "description": "Set the tinting color used for the base color. Color is specified in linear RGB. Use llsRGB2Linear to convert colors from Blinn-Phong to PBR.",
      "type": "vector"
    },
    {
      "constant": "OVERRIDE_GLTF_BASE_ALPHA",
      "value": "2",
      "description": "Sets the alpha for the face(s). Only impacts the rendering when the alpha mode is set to PRIM_GLTF_ALPHA_MODE_BLEND.",
      "type": "float"
    },
    {
      "constant": "OVERRIDE_GLTF_BASE_ALPHA_MODE",
      "value": "3",
      "description": "Set the alpha mode on the face(s). Must be one of the valid blend modes\n<table><tbody><tr><th>GLTF Alpha Mode</th><th>value</th><th>description</th></tr><tr><td>PRIM_GLTF_ALPHA_MODE_OPAQUE</td><td>0</td><td>Ignore the alpha value and render the material as opaque.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_BLEND</td><td>1</td><td>Render the material with transparency determined by the alpha value. Blending is done in linear color space. As is the case for Blinn-Phong as well, this mode suffers from depth sorting and performance issues. Use alpha mask instead when possible.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_MASK</td><td>2</td><td>Render the material as fully opaque where the alpha value is greater than the alpha cutoff, and otherwise render the material as fully transparent.</td></tr></tbody></table>",
      "type": "integer"
    },
    {
      "constant": "OVERRIDE_GLTF_BASE_ALPHA_MASK",
      "value": "4",
      "description": "Sets the alpha cutoff level on the face(s) when alpha mode is set to mask.",
      "type": "float"
    },
    {
      "constant": "OVERRIDE_GLTF_BASE_DOUBLE_SIDED",
      "value": "5",
      "description": "If set to TRUE then the texture on the face(s) will be rendered as double sided.",
      "type": "integer"
    },
    {
      "constant": "OVERRIDE_GLTF_METALLIC_FACTOR",
      "value": "6",
      "description": "Adjusts the metallic factor on the specified face(s). Value should be between 0 and 1.",
      "type": "float"
    },
    {
      "constant": "OVERRIDE_GLTF_ROUGHNESS_FACTOR",
      "value": "7",
      "description": "Adjust the roughness factor on the specified face(s). Value should be between 0 and 1.",
      "type": "float"
    },
    {
      "constant": "OVERRIDE_GLTF_EMISSIVE_FACTOR",
      "value": "8",
      "description": "Set the tint used for the emissive texture on the face(s). Note that this is specified in linear RGB.",
      "type": "vector"
    }
  ],
  "llSetLinkMedia": [
    {
      "constant": "PRIM_MEDIA_ALT_IMAGE_ENABLE",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets the default image state (the image that the user sees before a piece of media is active) for the chosen face. The default image is specified by Second Life's server for that media type.\nNote: This flag is not currently implemented."
    },
    {
      "constant": "PRIM_MEDIA_CONTROLS",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "control"
        }
      ],
      "description": "Sets the style of controls. Can be either PRIM_MEDIA_CONTROLS_STANDARD or PRIM_MEDIA_CONTROLS_MINI."
    },
    {
      "constant": "PRIM_MEDIA_CURRENT_URL",
      "value": "2",
      "parameters": [
        {
          "type": "string",
          "name": "current_url"
        }
      ],
      "description": "Sets the current url displayed on the chosen face. Changing this URL causes navigation. 1024 characters Max"
    },
    {
      "constant": "PRIM_MEDIA_HOME_URL",
      "value": "3",
      "parameters": [
        {
          "type": "string",
          "name": "home_url"
        }
      ],
      "description": "Sets the home url for the chosen face. 1024 characters max"
    },
    {
      "constant": "PRIM_MEDIA_AUTO_LOOP",
      "value": "4",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether auto-looping is enabled."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_PLAY",
      "value": "5",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether the media auto-plays when a Resident can view it."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_SCALE",
      "value": "6",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether auto-scaling is enabled. Auto-scaling forces the media to the full size of the texture."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_ZOOM",
      "value": "7",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether clicking the media triggers auto-zoom and auto-focus on the media."
    },
    {
      "constant": "PRIM_MEDIA_FIRST_CLICK_INTERACT",
      "value": "8",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether the first click interaction is enabled.\nNote: This flag appears not to work."
    },
    {
      "constant": "PRIM_MEDIA_WIDTH_PIXELS",
      "value": "9",
      "parameters": [
        {
          "type": "integer",
          "name": "width"
        }
      ],
      "description": "Sets the width of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_HEIGHT_PIXELS",
      "value": "10",
      "parameters": [
        {
          "type": "integer",
          "name": "height"
        }
      ],
      "description": "Sets the height of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST_ENABLE",
      "value": "11",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether navigation is restricted to URLs in PRIM_MEDIA_WHITELIST."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST",
      "value": "12",
      "parameters": [
        {
          "type": "string",
          "name": "CSV"
        }
      ],
      "description": "Sets the whitelist as a string of escaped, comma-separated URLs. This string can hold up to 64 URLs or 1024 characters, whichever comes first."
    },
    {
      "constant": "PRIM_MEDIA_PERMS_INTERACT",
      "value": "13",
      "parameters": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Sets the permissions mask that control who can interact with the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    },
    {
      "constant": "PRIM_MEDIA_PERMS_CONTROL",
      "value": "14",
      "parameters": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Sets the permissions mask that control who can see the media control bar above the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    }
  ],
  "llSetLinkPrimitiveParams": [
    {
      "constant": "PRIM_NAME",
      "value": "27",
      "parameters": [
        {
          "type": "string",
          "name": "name"
        }
      ],
      "description": "Name: llSetObjectName"
    },
    {
      "constant": "PRIM_DESC",
      "value": "28",
      "parameters": [
        {
          "type": "string",
          "name": "description"
        }
      ],
      "description": "Description: llSetObjectDesc"
    },
    {
      "constant": "PRIM_TYPE",
      "value": "9",
      "parameters": "integer flag ] + flag_parameters",
      "description": "Sets the prim shape. [Would you like to know more?] [Hide"
    },
    {
      "constant": "PRIM_SLICE",
      "value": "35",
      "parameters": [
        {
          "type": "vector",
          "name": "slice"
        }
      ],
      "description": "Sets the prim's slice (a shape attribute)."
    },
    {
      "constant": "PRIM_PHYSICS_SHAPE_TYPE",
      "value": "30",
      "parameters": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "description": "Sets the prim's physics shape type."
    },
    {
      "constant": "PRIM_MATERIAL",
      "value": "2",
      "parameters": [
        {
          "type": "integer",
          "name": "material"
        }
      ],
      "description": "Sets the prim's material. The material determines the default collision sound, sprite, friction coefficient and restitution coefficient."
    },
    {
      "constant": "PRIM_PHYSICS",
      "value": "3",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Physics status llSetStatus"
    },
    {
      "constant": "PRIM_TEMP_ON_REZ",
      "value": "4",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Temporary attribute"
    },
    {
      "constant": "PRIM_PHANTOM",
      "value": "5",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Phantom status llSetStatus"
    },
    {
      "constant": "PRIM_POSITION",
      "value": "6",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Position, llSetPos"
    },
    {
      "constant": "PRIM_POS_LOCAL",
      "value": "33",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Local position, llSetPos"
    },
    {
      "constant": "PRIM_ROTATION",
      "value": "8",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Global rotation, llSetRot (broken for child prims)"
    },
    {
      "constant": "PRIM_ROT_LOCAL",
      "value": "29",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Local rotation, llSetLocalRot"
    },
    {
      "constant": "PRIM_SIZE",
      "value": "7",
      "parameters": [
        {
          "type": "vector",
          "name": "size"
        }
      ],
      "description": "Size, llSetScale"
    },
    {
      "constant": "PRIM_TEXTURE",
      "value": "17",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Texture:</td><td></td><td>llSetTexture</td></tr><tr><td>Repeats:</td><td></td><td>llScaleTexture</td></tr><tr><td>Offset:</td><td></td><td>llOffsetTexture</td></tr><tr><td>Rotation:</td><td></td><td>llRotateTexture</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_RENDER_MATERIAL",
      "value": "49",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Material:</td><td></td><td>llSetRenderMaterial</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_TEXT",
      "value": "26",
      "parameters": [
        {
          "type": "string",
          "name": "text"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "Floating Text: llSetText"
    },
    {
      "constant": "PRIM_COLOR",
      "value": "18",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Alpha:</td><td></td><td>llSetAlpha</td></tr><tr><td>Color:</td><td></td><td>llSetColor</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_BUMP_SHINY",
      "value": "19",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_FLEXIBLE",
      "value": "21",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "integer",
          "name": "softness"
        },
        {
          "type": "float",
          "name": "gravity"
        },
        {
          "type": "float",
          "name": "friction"
        },
        {
          "type": "float",
          "name": "wind"
        },
        {
          "type": "float",
          "name": "tension"
        },
        {
          "type": "vector",
          "name": "force"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_TEXGEN",
      "value": "22",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_POINT_LIGHT",
      "value": "23",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "linear_color"
        },
        {
          "type": "float",
          "name": "intensity"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "falloff"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space."
    },
    {
      "constant": "PRIM_REFLECTION_PROBE",
      "value": "44",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "float",
          "name": "ambiance"
        },
        {
          "type": "float",
          "name": "clip_distance"
        },
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Sets the prim's reflection probe parameters."
    },
    {
      "constant": "PRIM_GLOW",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_OMEGA",
      "value": "32",
      "parameters": [
        {
          "type": "vector",
          "name": "axis"
        },
        {
          "type": "float",
          "name": "spinrate"
        },
        {
          "type": "float",
          "name": "gain"
        }
      ],
      "description": "llTargetOmega"
    },
    {
      "constant": "PRIM_NORMAL",
      "value": "37",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SPECULAR",
      "value": "36",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_ALPHA_MODE",
      "value": "38",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_LINK_TARGET",
      "value": "34",
      "parameters": [
        {
          "type": "integer",
          "name": "link_target"
        }
      ],
      "description": "Multiple llSetLinkPrimitiveParams calls."
    },
    {
      "constant": "PRIM_CAST_SHADOWS",
      "value": "24",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "DEPRECATED: Shadow casting for the primitive"
    },
    {
      "constant": "PRIM_ALLOW_UNSIT",
      "value": "39",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SCRIPTED_SIT_ONLY",
      "value": "40",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SIT_TARGET",
      "value": "41",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "offset"
        },
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Sit target, llSitTarget. The position can be ZERO_VECTOR."
    },
    {
      "constant": "PRIM_PROJECTOR",
      "value": "42",
      "parameters": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "float",
          "name": "fov"
        },
        {
          "type": "float",
          "name": "focus"
        },
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Light projector settings, the texture may be NULL_KEY. (Write only, for now. See here)"
    },
    {
      "constant": "PRIM_CLICK_ACTION",
      "value": "43",
      "parameters": [
        {
          "type": "integer",
          "name": "action"
        }
      ],
      "description": "sets the default action to take when a user clicks on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th><th>Cursor</th></tr><tr><td>CLICK_ACTION_NONE</td><td>0</td><td>Performs the default action: when the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_TOUCH</td><td>0</td><td>When the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_SIT</td><td>1</td><td>When the prim is touched, the avatar sits upon it</td><td>[](https://wiki.secondlife.com/wiki/File:SitActionCursor.png)</td></tr><tr><td>CLICK_ACTION_BUY</td><td>2</td><td>When the prim is touched, the buy dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PAY</td><td>3</td><td>When the prim is touched, the pay dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_OPEN</td><td>4</td><td>When the prim is touched, the object inventory dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:OpenOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PLAY</td><td>5</td><td>Play or pause parcel media on touch</td><td>[](https://wiki.secondlife.com/wiki/File:Toolplay.png)</td></tr><tr><td>CLICK_ACTION_OPEN_MEDIA</td><td>6</td><td>Play parcel media on touch, no pause</td><td>[](https://wiki.secondlife.com/wiki/File:Toolmediaopen.png)</td></tr><tr><td>CLICK_ACTION_ZOOM</td><td>7</td><td>Zoom the avatar camera on this object (Viewer 2)</td><td>[](https://wiki.secondlife.com/wiki/File:Toolzoom.png)</td></tr><tr><td>CLICK_ACTION_DISABLED</td><td>8</td><td>No click action. No touches detected or passed.</td><td></td></tr><tr><td>CLICK_ACTION_IGNORE</td><td>9</td><td>Clicks go through the object to whatever is behind it. No touches detected.</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_BASE_COLOR",
      "value": "48",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>\n<table><tbody><tr><th>gltf_alpha_mode Flags</th><th>V</th><th colspan='3'>Description</th></tr><tr><td>PRIM_GLTF_ALPHA_MODE_OPAQUE</td><td>0</td><td colspan='3'>Ignore the alpha value and render the material as opaque.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_BLEND</td><td>1</td><td colspan='3'>Render the material with transparency determined by the alpha value. Blending is done in linear color space. As is the case for Blinn-Phong as well, this mode suffers from depth sorting and performance issues. Use alpha mask instead when possible.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_MASK</td><td>2</td><td colspan='3'>Render the material as fully opaque where the alpha value is greater than the alpha cutoff, and otherwise render the material as fully transparent.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_NORMAL",
      "value": "45",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_METALLIC_ROUGHNESS",
      "value": "47",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_EMISSIVE",
      "value": "46",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "emissive_tint param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_SIT_FLAGS",
      "value": "50",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the sit flags currently set on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th></tr><tr><td>SIT_FLAG_SIT_TARGET</td><td>0x1</td><td>Read-only flag to indicate whether the link has a sit target. Use llSitTarget, llLinkSitTarget, or PRIM_SIT_TARGET to disable or enable this flag. Use llGetLinkSitFlags, or llGetLinkPrimitiveParams with PRIM_SIT_FLAGS to read this flag.</td></tr><tr><td>SIT_FLAG_ALLOW_UNSIT</td><td>0x2</td><td>Allow an avatar to manually unsit from a sit target. Only applies to agents who had been seated via an LSL script. See llSitOnLink.</td></tr><tr><td>SIT_FLAG_SCRIPTED_ONLY</td><td>0x4</td><td>Only allow scripted sits on this sit target.</td></tr><tr><td>SIT_FLAG_NO_COLLIDE</td><td>0x10</td><td>Disable the avatar's collision volume when they are seated on this sit target.</td></tr><tr><td>SIT_FLAG_NO_DAMAGE</td><td>0x20</td><td>Do not distribute damage to agents sitting on this sit target.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_DAMAGE",
      "value": "51",
      "parameters": [
        {
          "type": "float",
          "name": "damage"
        },
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "Gets the damage and damage type delivered by a prim on collision."
    },
    {
      "constant": "PRIM_HEALTH",
      "value": "52",
      "parameters": [
        {
          "type": "float",
          "name": "health"
        }
      ],
      "description": "Gets the health of a prim"
    }
  ],
  "llSetLinkPrimitiveParamsFast": [
    {
      "constant": "PRIM_NAME",
      "value": "27",
      "parameters": [
        {
          "type": "string",
          "name": "name"
        }
      ],
      "description": "Name: llSetObjectName"
    },
    {
      "constant": "PRIM_DESC",
      "value": "28",
      "parameters": [
        {
          "type": "string",
          "name": "description"
        }
      ],
      "description": "Description: llSetObjectDesc"
    },
    {
      "constant": "PRIM_TYPE",
      "value": "9",
      "parameters": "integer flag ] + flag_parameters",
      "description": "Sets the prim shape. [Would you like to know more?] [Hide"
    },
    {
      "constant": "PRIM_SLICE",
      "value": "35",
      "parameters": [
        {
          "type": "vector",
          "name": "slice"
        }
      ],
      "description": "Sets the prim's slice (a shape attribute)."
    },
    {
      "constant": "PRIM_PHYSICS_SHAPE_TYPE",
      "value": "30",
      "parameters": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "description": "Sets the prim's physics shape type."
    },
    {
      "constant": "PRIM_MATERIAL",
      "value": "2",
      "parameters": [
        {
          "type": "integer",
          "name": "material"
        }
      ],
      "description": "Sets the prim's material. The material determines the default collision sound, sprite, friction coefficient and restitution coefficient."
    },
    {
      "constant": "PRIM_PHYSICS",
      "value": "3",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Physics status llSetStatus"
    },
    {
      "constant": "PRIM_TEMP_ON_REZ",
      "value": "4",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Temporary attribute"
    },
    {
      "constant": "PRIM_PHANTOM",
      "value": "5",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Phantom status llSetStatus"
    },
    {
      "constant": "PRIM_POSITION",
      "value": "6",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Position, llSetPos"
    },
    {
      "constant": "PRIM_POS_LOCAL",
      "value": "33",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Local position, llSetPos"
    },
    {
      "constant": "PRIM_ROTATION",
      "value": "8",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Global rotation, llSetRot (broken for child prims)"
    },
    {
      "constant": "PRIM_ROT_LOCAL",
      "value": "29",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Local rotation, llSetLocalRot"
    },
    {
      "constant": "PRIM_SIZE",
      "value": "7",
      "parameters": [
        {
          "type": "vector",
          "name": "size"
        }
      ],
      "description": "Size, llSetScale"
    },
    {
      "constant": "PRIM_TEXTURE",
      "value": "17",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Texture:</td><td></td><td>llSetTexture</td></tr><tr><td>Repeats:</td><td></td><td>llScaleTexture</td></tr><tr><td>Offset:</td><td></td><td>llOffsetTexture</td></tr><tr><td>Rotation:</td><td></td><td>llRotateTexture</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_RENDER_MATERIAL",
      "value": "49",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Material:</td><td></td><td>llSetRenderMaterial</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_TEXT",
      "value": "26",
      "parameters": [
        {
          "type": "string",
          "name": "text"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "Floating Text: llSetText"
    },
    {
      "constant": "PRIM_COLOR",
      "value": "18",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Alpha:</td><td></td><td>llSetAlpha</td></tr><tr><td>Color:</td><td></td><td>llSetColor</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_BUMP_SHINY",
      "value": "19",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_FLEXIBLE",
      "value": "21",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "integer",
          "name": "softness"
        },
        {
          "type": "float",
          "name": "gravity"
        },
        {
          "type": "float",
          "name": "friction"
        },
        {
          "type": "float",
          "name": "wind"
        },
        {
          "type": "float",
          "name": "tension"
        },
        {
          "type": "vector",
          "name": "force"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_TEXGEN",
      "value": "22",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_POINT_LIGHT",
      "value": "23",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "linear_color"
        },
        {
          "type": "float",
          "name": "intensity"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "falloff"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space."
    },
    {
      "constant": "PRIM_REFLECTION_PROBE",
      "value": "44",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "float",
          "name": "ambiance"
        },
        {
          "type": "float",
          "name": "clip_distance"
        },
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Sets the prim's reflection probe parameters."
    },
    {
      "constant": "PRIM_GLOW",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_OMEGA",
      "value": "32",
      "parameters": [
        {
          "type": "vector",
          "name": "axis"
        },
        {
          "type": "float",
          "name": "spinrate"
        },
        {
          "type": "float",
          "name": "gain"
        }
      ],
      "description": "llTargetOmega"
    },
    {
      "constant": "PRIM_NORMAL",
      "value": "37",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SPECULAR",
      "value": "36",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_ALPHA_MODE",
      "value": "38",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_LINK_TARGET",
      "value": "34",
      "parameters": [
        {
          "type": "integer",
          "name": "link_target"
        }
      ],
      "description": "Multiple llSetLinkPrimitiveParams calls."
    },
    {
      "constant": "PRIM_CAST_SHADOWS",
      "value": "24",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "DEPRECATED: Shadow casting for the primitive"
    },
    {
      "constant": "PRIM_ALLOW_UNSIT",
      "value": "39",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SCRIPTED_SIT_ONLY",
      "value": "40",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SIT_TARGET",
      "value": "41",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "offset"
        },
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Sit target, llSitTarget. The position can be ZERO_VECTOR."
    },
    {
      "constant": "PRIM_PROJECTOR",
      "value": "42",
      "parameters": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "float",
          "name": "fov"
        },
        {
          "type": "float",
          "name": "focus"
        },
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Light projector settings, the texture may be NULL_KEY. (Write only, for now. See here)"
    },
    {
      "constant": "PRIM_CLICK_ACTION",
      "value": "43",
      "parameters": [
        {
          "type": "integer",
          "name": "action"
        }
      ],
      "description": "sets the default action to take when a user clicks on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th><th>Cursor</th></tr><tr><td>CLICK_ACTION_NONE</td><td>0</td><td>Performs the default action: when the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_TOUCH</td><td>0</td><td>When the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_SIT</td><td>1</td><td>When the prim is touched, the avatar sits upon it</td><td>[](https://wiki.secondlife.com/wiki/File:SitActionCursor.png)</td></tr><tr><td>CLICK_ACTION_BUY</td><td>2</td><td>When the prim is touched, the buy dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PAY</td><td>3</td><td>When the prim is touched, the pay dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_OPEN</td><td>4</td><td>When the prim is touched, the object inventory dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:OpenOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PLAY</td><td>5</td><td>Play or pause parcel media on touch</td><td>[](https://wiki.secondlife.com/wiki/File:Toolplay.png)</td></tr><tr><td>CLICK_ACTION_OPEN_MEDIA</td><td>6</td><td>Play parcel media on touch, no pause</td><td>[](https://wiki.secondlife.com/wiki/File:Toolmediaopen.png)</td></tr><tr><td>CLICK_ACTION_ZOOM</td><td>7</td><td>Zoom the avatar camera on this object (Viewer 2)</td><td>[](https://wiki.secondlife.com/wiki/File:Toolzoom.png)</td></tr><tr><td>CLICK_ACTION_DISABLED</td><td>8</td><td>No click action. No touches detected or passed.</td><td></td></tr><tr><td>CLICK_ACTION_IGNORE</td><td>9</td><td>Clicks go through the object to whatever is behind it. No touches detected.</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_BASE_COLOR",
      "value": "48",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>\n<table><tbody><tr><th>gltf_alpha_mode Flags</th><th>V</th><th colspan='3'>Description</th></tr><tr><td>PRIM_GLTF_ALPHA_MODE_OPAQUE</td><td>0</td><td colspan='3'>Ignore the alpha value and render the material as opaque.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_BLEND</td><td>1</td><td colspan='3'>Render the material with transparency determined by the alpha value. Blending is done in linear color space. As is the case for Blinn-Phong as well, this mode suffers from depth sorting and performance issues. Use alpha mask instead when possible.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_MASK</td><td>2</td><td colspan='3'>Render the material as fully opaque where the alpha value is greater than the alpha cutoff, and otherwise render the material as fully transparent.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_NORMAL",
      "value": "45",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_METALLIC_ROUGHNESS",
      "value": "47",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_EMISSIVE",
      "value": "46",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "emissive_tint param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_SIT_FLAGS",
      "value": "50",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the sit flags currently set on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th></tr><tr><td>SIT_FLAG_SIT_TARGET</td><td>0x1</td><td>Read-only flag to indicate whether the link has a sit target. Use llSitTarget, llLinkSitTarget, or PRIM_SIT_TARGET to disable or enable this flag. Use llGetLinkSitFlags, or llGetLinkPrimitiveParams with PRIM_SIT_FLAGS to read this flag.</td></tr><tr><td>SIT_FLAG_ALLOW_UNSIT</td><td>0x2</td><td>Allow an avatar to manually unsit from a sit target. Only applies to agents who had been seated via an LSL script. See llSitOnLink.</td></tr><tr><td>SIT_FLAG_SCRIPTED_ONLY</td><td>0x4</td><td>Only allow scripted sits on this sit target.</td></tr><tr><td>SIT_FLAG_NO_COLLIDE</td><td>0x10</td><td>Disable the avatar's collision volume when they are seated on this sit target.</td></tr><tr><td>SIT_FLAG_NO_DAMAGE</td><td>0x20</td><td>Do not distribute damage to agents sitting on this sit target.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_DAMAGE",
      "value": "51",
      "parameters": [
        {
          "type": "float",
          "name": "damage"
        },
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "Gets the damage and damage type delivered by a prim on collision."
    },
    {
      "constant": "PRIM_HEALTH",
      "value": "52",
      "parameters": [
        {
          "type": "float",
          "name": "health"
        }
      ],
      "description": "Gets the health of a prim"
    }
  ],
  "llSetParcelForSale": [
    {
      "constant": "PARCEL_SALE_AGENT",
      "value": "2",
      "description": "The agent id authorized to purchase the parcel. If none set, any agent may purchase."
    },
    {
      "constant": "PARCEL_SALE_OBJECTS",
      "value": "3",
      "description": "If TRUE, objects on the parcel are included in the sale."
    },
    {
      "constant": "PARCEL_SALE_PRICE",
      "value": "1",
      "description": "The price of the parcel. If no authorized agent is set, must be greater than 0."
    }
  ],
  "llSetPayPrice": [
    {
      "constant": "PAY_HIDE",
      "value": "-1",
      "description": "Hides this quick pay button.",
      "value_1": "0"
    },
    {
      "constant": "PAY_DEFAULT",
      "value": "-2",
      "description": "Use the default value for this quick pay button.",
      "value_1": ""
    }
  ],
  "llSetPrimitiveParams": [
    {
      "constant": "PRIM_NAME",
      "value": "27",
      "parameters": [
        {
          "type": "string",
          "name": "name"
        }
      ],
      "description": "Name: llSetObjectName"
    },
    {
      "constant": "PRIM_DESC",
      "value": "28",
      "parameters": [
        {
          "type": "string",
          "name": "description"
        }
      ],
      "description": "Description: llSetObjectDesc"
    },
    {
      "constant": "PRIM_TYPE",
      "value": "9",
      "parameters": "integer flag ] + flag_parameters",
      "description": "Sets the prim shape. [Would you like to know more?] [Hide"
    },
    {
      "constant": "PRIM_SLICE",
      "value": "35",
      "parameters": [
        {
          "type": "vector",
          "name": "slice"
        }
      ],
      "description": "Sets the prim's slice (a shape attribute)."
    },
    {
      "constant": "PRIM_PHYSICS_SHAPE_TYPE",
      "value": "30",
      "parameters": [
        {
          "type": "integer",
          "name": "type"
        }
      ],
      "description": "Sets the prim's physics shape type."
    },
    {
      "constant": "PRIM_MATERIAL",
      "value": "2",
      "parameters": [
        {
          "type": "integer",
          "name": "material"
        }
      ],
      "description": "Sets the prim's material. The material determines the default collision sound, sprite, friction coefficient and restitution coefficient."
    },
    {
      "constant": "PRIM_PHYSICS",
      "value": "3",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Physics status llSetStatus"
    },
    {
      "constant": "PRIM_TEMP_ON_REZ",
      "value": "4",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Temporary attribute"
    },
    {
      "constant": "PRIM_PHANTOM",
      "value": "5",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Phantom status llSetStatus"
    },
    {
      "constant": "PRIM_POSITION",
      "value": "6",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Position, llSetPos"
    },
    {
      "constant": "PRIM_POS_LOCAL",
      "value": "33",
      "parameters": [
        {
          "type": "vector",
          "name": "position"
        }
      ],
      "description": "Local position, llSetPos"
    },
    {
      "constant": "PRIM_ROTATION",
      "value": "8",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Global rotation, llSetRot (broken for child prims)"
    },
    {
      "constant": "PRIM_ROT_LOCAL",
      "value": "29",
      "parameters": [
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Local rotation, llSetLocalRot"
    },
    {
      "constant": "PRIM_SIZE",
      "value": "7",
      "parameters": [
        {
          "type": "vector",
          "name": "size"
        }
      ],
      "description": "Size, llSetScale"
    },
    {
      "constant": "PRIM_TEXTURE",
      "value": "17",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Texture:</td><td></td><td>llSetTexture</td></tr><tr><td>Repeats:</td><td></td><td>llScaleTexture</td></tr><tr><td>Offset:</td><td></td><td>llOffsetTexture</td></tr><tr><td>Rotation:</td><td></td><td>llRotateTexture</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_RENDER_MATERIAL",
      "value": "49",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Material:</td><td></td><td>llSetRenderMaterial</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_TEXT",
      "value": "26",
      "parameters": [
        {
          "type": "string",
          "name": "text"
        },
        {
          "type": "vector",
          "name": "color"
        },
        {
          "type": "float",
          "name": "alpha"
        }
      ],
      "description": "Floating Text: llSetText"
    },
    {
      "constant": "PRIM_COLOR",
      "value": "18",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "<table><tbody><tr><td>Alpha:</td><td></td><td>llSetAlpha</td></tr><tr><td>Color:</td><td></td><td>llSetColor</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_BUMP_SHINY",
      "value": "19",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_FLEXIBLE",
      "value": "21",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "integer",
          "name": "softness"
        },
        {
          "type": "float",
          "name": "gravity"
        },
        {
          "type": "float",
          "name": "friction"
        },
        {
          "type": "float",
          "name": "wind"
        },
        {
          "type": "float",
          "name": "tension"
        },
        {
          "type": "vector",
          "name": "force"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_TEXGEN",
      "value": "22",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_POINT_LIGHT",
      "value": "23",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "linear_color"
        },
        {
          "type": "float",
          "name": "intensity"
        },
        {
          "type": "float",
          "name": "radius"
        },
        {
          "type": "float",
          "name": "falloff"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space."
    },
    {
      "constant": "PRIM_REFLECTION_PROBE",
      "value": "44",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "float",
          "name": "ambiance"
        },
        {
          "type": "float",
          "name": "clip_distance"
        },
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Sets the prim's reflection probe parameters."
    },
    {
      "constant": "PRIM_GLOW",
      "value": "25",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_OMEGA",
      "value": "32",
      "parameters": [
        {
          "type": "vector",
          "name": "axis"
        },
        {
          "type": "float",
          "name": "spinrate"
        },
        {
          "type": "float",
          "name": "gain"
        }
      ],
      "description": "llTargetOmega"
    },
    {
      "constant": "PRIM_NORMAL",
      "value": "37",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SPECULAR",
      "value": "36",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_ALPHA_MODE",
      "value": "38",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_LINK_TARGET",
      "value": "34",
      "parameters": [
        {
          "type": "integer",
          "name": "link_target"
        }
      ],
      "description": "Multiple llSetLinkPrimitiveParams calls."
    },
    {
      "constant": "PRIM_CAST_SHADOWS",
      "value": "24",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "DEPRECATED: Shadow casting for the primitive"
    },
    {
      "constant": "PRIM_ALLOW_UNSIT",
      "value": "39",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SCRIPTED_SIT_ONLY",
      "value": "40",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": ""
    },
    {
      "constant": "PRIM_SIT_TARGET",
      "value": "41",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        },
        {
          "type": "vector",
          "name": "offset"
        },
        {
          "type": "rotation",
          "name": "rot"
        }
      ],
      "description": "Sit target, llSitTarget. The position can be ZERO_VECTOR."
    },
    {
      "constant": "PRIM_PROJECTOR",
      "value": "42",
      "parameters": [
        {
          "type": "string",
          "name": "texture"
        },
        {
          "type": "float",
          "name": "fov"
        },
        {
          "type": "float",
          "name": "focus"
        },
        {
          "type": "float",
          "name": "ambiance"
        }
      ],
      "description": "Light projector settings, the texture may be NULL_KEY. (Write only, for now. See here)"
    },
    {
      "constant": "PRIM_CLICK_ACTION",
      "value": "43",
      "parameters": [
        {
          "type": "integer",
          "name": "action"
        }
      ],
      "description": "sets the default action to take when a user clicks on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th><th>Cursor</th></tr><tr><td>CLICK_ACTION_NONE</td><td>0</td><td>Performs the default action: when the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_TOUCH</td><td>0</td><td>When the prim is touched, touch events are triggered</td><td></td></tr><tr><td>CLICK_ACTION_SIT</td><td>1</td><td>When the prim is touched, the avatar sits upon it</td><td>[](https://wiki.secondlife.com/wiki/File:SitActionCursor.png)</td></tr><tr><td>CLICK_ACTION_BUY</td><td>2</td><td>When the prim is touched, the buy dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PAY</td><td>3</td><td>When the prim is touched, the pay dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:SaleOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_OPEN</td><td>4</td><td>When the prim is touched, the object inventory dialog is opened</td><td>[](https://wiki.secondlife.com/wiki/File:OpenOneclickCursor.png)</td></tr><tr><td>CLICK_ACTION_PLAY</td><td>5</td><td>Play or pause parcel media on touch</td><td>[](https://wiki.secondlife.com/wiki/File:Toolplay.png)</td></tr><tr><td>CLICK_ACTION_OPEN_MEDIA</td><td>6</td><td>Play parcel media on touch, no pause</td><td>[](https://wiki.secondlife.com/wiki/File:Toolmediaopen.png)</td></tr><tr><td>CLICK_ACTION_ZOOM</td><td>7</td><td>Zoom the avatar camera on this object (Viewer 2)</td><td>[](https://wiki.secondlife.com/wiki/File:Toolzoom.png)</td></tr><tr><td>CLICK_ACTION_DISABLED</td><td>8</td><td>No click action. No touches detected or passed.</td><td></td></tr><tr><td>CLICK_ACTION_IGNORE</td><td>9</td><td>Clicks go through the object to whatever is behind it. No touches detected.</td><td></td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_BASE_COLOR",
      "value": "48",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "linear_color param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>\n<table><tbody><tr><th>gltf_alpha_mode Flags</th><th>V</th><th colspan='3'>Description</th></tr><tr><td>PRIM_GLTF_ALPHA_MODE_OPAQUE</td><td>0</td><td colspan='3'>Ignore the alpha value and render the material as opaque.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_BLEND</td><td>1</td><td colspan='3'>Render the material with transparency determined by the alpha value. Blending is done in linear color space. As is the case for Blinn-Phong as well, this mode suffers from depth sorting and performance issues. Use alpha mask instead when possible.</td></tr><tr><td>PRIM_GLTF_ALPHA_MODE_MASK</td><td>2</td><td colspan='3'>Render the material as fully opaque where the alpha value is greater than the alpha cutoff, and otherwise render the material as fully transparent.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_NORMAL",
      "value": "45",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_METALLIC_ROUGHNESS",
      "value": "47",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "This parameter's arguments are GLTF overrides.\n<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_GLTF_EMISSIVE",
      "value": "46",
      "parameters": [
        {
          "type": "integer",
          "name": "face"
        }
      ],
      "description": "emissive_tint param accepts color in Linear space - use llsRGB2Linear to convert regular LSL color into Linear space.\nThis parameter's arguments are GLTF overrides.<table><tbody><tr><td>⚠️</td><td>Warning: Setting an argument to the empty string ('') will clear the respective override. GLTF texture transforms are always overrides, so setting them to the empty string ('') will clear them. See this example for a workaround. The SL team is open to feedback on LSL improvements for GLTF.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_SIT_FLAGS",
      "value": "50",
      "parameters": [
        {
          "type": "integer",
          "name": "flags"
        }
      ],
      "description": "Gets the sit flags currently set on this prim.<table><tbody><tr><th>Flag</th><th></th><th>Description</th></tr><tr><td>SIT_FLAG_SIT_TARGET</td><td>0x1</td><td>Read-only flag to indicate whether the link has a sit target. Use llSitTarget, llLinkSitTarget, or PRIM_SIT_TARGET to disable or enable this flag. Use llGetLinkSitFlags, or llGetLinkPrimitiveParams with PRIM_SIT_FLAGS to read this flag.</td></tr><tr><td>SIT_FLAG_ALLOW_UNSIT</td><td>0x2</td><td>Allow an avatar to manually unsit from a sit target. Only applies to agents who had been seated via an LSL script. See llSitOnLink.</td></tr><tr><td>SIT_FLAG_SCRIPTED_ONLY</td><td>0x4</td><td>Only allow scripted sits on this sit target.</td></tr><tr><td>SIT_FLAG_NO_COLLIDE</td><td>0x10</td><td>Disable the avatar's collision volume when they are seated on this sit target.</td></tr><tr><td>SIT_FLAG_NO_DAMAGE</td><td>0x20</td><td>Do not distribute damage to agents sitting on this sit target.</td></tr></tbody></table>"
    },
    {
      "constant": "PRIM_DAMAGE",
      "value": "51",
      "parameters": [
        {
          "type": "float",
          "name": "damage"
        },
        {
          "type": "integer",
          "name": "damage_type"
        }
      ],
      "description": "Gets the damage and damage type delivered by a prim on collision."
    },
    {
      "constant": "PRIM_HEALTH",
      "value": "52",
      "parameters": [
        {
          "type": "float",
          "name": "health"
        }
      ],
      "description": "Gets the health of a prim"
    }
  ],
  "llSetPrimMediaParams": [
    {
      "constant": "PRIM_MEDIA_ALT_IMAGE_ENABLE",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets the default image state (the image that the user sees before a piece of media is active) for the chosen face. The default image is specified by Second Life's server for that media type.\nNote: This flag is not currently implemented."
    },
    {
      "constant": "PRIM_MEDIA_CONTROLS",
      "value": "1",
      "parameters": [
        {
          "type": "integer",
          "name": "control"
        }
      ],
      "description": "Sets the style of controls. Can be either PRIM_MEDIA_CONTROLS_STANDARD or PRIM_MEDIA_CONTROLS_MINI."
    },
    {
      "constant": "PRIM_MEDIA_CURRENT_URL",
      "value": "2",
      "parameters": [
        {
          "type": "string",
          "name": "current_url"
        }
      ],
      "description": "Sets the current url displayed on the chosen face. Changing this URL causes navigation. 1024 characters Max"
    },
    {
      "constant": "PRIM_MEDIA_HOME_URL",
      "value": "3",
      "parameters": [
        {
          "type": "string",
          "name": "home_url"
        }
      ],
      "description": "Sets the home url for the chosen face. 1024 characters max"
    },
    {
      "constant": "PRIM_MEDIA_AUTO_LOOP",
      "value": "4",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether auto-looping is enabled."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_PLAY",
      "value": "5",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether the media auto-plays when a Resident can view it."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_SCALE",
      "value": "6",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether auto-scaling is enabled. Auto-scaling forces the media to the full size of the texture."
    },
    {
      "constant": "PRIM_MEDIA_AUTO_ZOOM",
      "value": "7",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether clicking the media triggers auto-zoom and auto-focus on the media."
    },
    {
      "constant": "PRIM_MEDIA_FIRST_CLICK_INTERACT",
      "value": "8",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether the first click interaction is enabled.\nNote: This flag appears not to work."
    },
    {
      "constant": "PRIM_MEDIA_WIDTH_PIXELS",
      "value": "9",
      "parameters": [
        {
          "type": "integer",
          "name": "width"
        }
      ],
      "description": "Sets the width of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_HEIGHT_PIXELS",
      "value": "10",
      "parameters": [
        {
          "type": "integer",
          "name": "height"
        }
      ],
      "description": "Sets the height of the media in pixels."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST_ENABLE",
      "value": "11",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "description": "Sets whether navigation is restricted to URLs in PRIM_MEDIA_WHITELIST."
    },
    {
      "constant": "PRIM_MEDIA_WHITELIST",
      "value": "12",
      "parameters": [
        {
          "type": "string",
          "name": "CSV"
        }
      ],
      "description": "Sets the whitelist as a string of escaped, comma-separated URLs. This string can hold up to 64 URLs or 1024 characters, whichever comes first."
    },
    {
      "constant": "PRIM_MEDIA_PERMS_INTERACT",
      "value": "13",
      "parameters": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Sets the permissions mask that control who can interact with the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    },
    {
      "constant": "PRIM_MEDIA_PERMS_CONTROL",
      "value": "14",
      "parameters": [
        {
          "type": "integer",
          "name": "perms"
        }
      ],
      "description": "Sets the permissions mask that control who can see the media control bar above the object:\nPRIM_MEDIA_PERM_NONE\nPRIM_MEDIA_PERM_OWNER\nPRIM_MEDIA_PERM_GROUP\nPRIM_MEDIA_PERM_ANYONE"
    }
  ],
  "llUpdateCharacter": [
    {
      "constant": "CHARACTER_DESIRED_SPEED",
      "value": "1",
      "default": "6",
      "description": "Speed of pursuit in meters per second.",
      "range": "0.2, 40.0"
    },
    {
      "constant": "CHARACTER_RADIUS",
      "value": "2",
      "default": "",
      "description": "Set collision capsule radius.",
      "range": "0.125, 5.0"
    },
    {
      "constant": "CHARACTER_LENGTH",
      "value": "3",
      "default": "",
      "description": "Set collision capsule length\nIf the value is less than twice the radius plus 0.1m, it will be set to twice the radius plus 0.1m.",
      "range": "(0.0, 10.0"
    },
    {
      "constant": "CHARACTER_ORIENTATION",
      "value": "4",
      "default": "VERTICAL",
      "description": "Set the character orientation.",
      "range": "VERTICAL, HORIZONTAL"
    },
    {
      "constant": "TRAVERSAL_TYPE",
      "value": "7",
      "default": "TRAVERSAL_TYPE_SLOW",
      "description": "Controls the speed at which characters moves on terrain that is less than 100% walkable will move faster (e.g., a cat crossing a street) or slower (e.g., a car driving in a swamp).\nTo use _FAST or _SLOW, you must specify a CHARACTER_TYPE.",
      "range": "TRAVERSAL_TYPE_FAST, TRAVERSAL_TYPE_SLOW, TRAVERSAL_TYPE_NONE"
    },
    {
      "constant": "CHARACTER_TYPE",
      "value": "6",
      "default": "CHARACTER_TYPE_NONE",
      "description": "Specifies which walkability coefficient will be used by this character.",
      "range": "CHARACTER_TYPE_A, CHARACTER_TYPE_B, CHARACTER_TYPE_C, CHARACTER_TYPE_D, CHARACTER_TYPE_NONE"
    },
    {
      "constant": "CHARACTER_AVOIDANCE_MODE",
      "value": "5",
      "default": "AVOID_CHARACTERS | AVOID_DYNAMIC_OBSTACLES",
      "description": "Allows you to specify that a character should not try to avoid other characters, should not try to avoid dynamic obstacles (relatively fast moving objects and avatars), or both. This is framed in the positive sense (`[[CHARACTER_AVOIDANCE_MODE](https://wiki.secondlife.com/wiki/CHARACTER_AVOIDANCE_MODE), [AVOID_CHARACTERS](https://wiki.secondlife.com/w/index.php?title=AVOID_CHARACTERS&action=edit&redlink=1)]` would create a character that avoided other characters but not agents or moving vehicles). Setting this parameter to AVOID_NONE causes the character to not avoid either category.",
      "range": "Combinable Flags:AVOID_CHARACTERS, AVOID_DYNAMIC_OBSTACLES, AVOID_NONE"
    },
    {
      "constant": "CHARACTER_MAX_ACCEL",
      "value": "8",
      "default": "20",
      "description": "The character's maximum acceleration rate.",
      "range": "0.5, 40.0"
    },
    {
      "constant": "CHARACTER_MAX_DECEL",
      "value": "9",
      "default": "30",
      "description": "The character's maximum deceleration rate.",
      "range": "0.5, 60.0"
    },
    {
      "constant": "CHARACTER_DESIRED_TURN_SPEED",
      "value": "12",
      "default": "6",
      "description": "The character's maximum speed while turning--note that this is only loosely enforced (i.e., a character may turn at higher speeds under certain conditions)",
      "range": "0.02, 40.0"
    },
    {
      "constant": "CHARACTER_MAX_TURN_RADIUS",
      "value": "10",
      "default": "1.25",
      "description": "The character's turn radius when traveling at CHARACTER_DESIRED_TURN_SPEED",
      "range": "0.1, 10.0"
    },
    {
      "constant": "CHARACTER_MAX_SPEED",
      "value": "13",
      "default": "20",
      "description": "The character's maximum speed. Affects speed when avoiding dynamic obstacles and when traversing low-walkability objects in TRAVERSAL_TYPE_FAST mode.",
      "range": "1, 40.0"
    },
    {
      "constant": "CHARACTER_ACCOUNT_FOR_SKIPPED_FRAMES",
      "value": "14",
      "default": "TRUE",
      "description": "TRUE matches pre-existing behavior. If set to FALSE, character will not attempt to catch up on lost time when pathfinding performance is low, potentially providing more reliable movement (albeit while potentially appearing to be more stuttery).",
      "range": "TRUE or FALSE"
    },
    {
      "constant": "CHARACTER_STAY_WITHIN_PARCEL",
      "value": "15",
      "default": "Depends*",
      "description": "FALSE matches traditional behavior. If set to TRUE, treat the parcel boundaries as one-way obstacles (will re-enter but can't leave on it's own).",
      "range": "TRUE or FALSE"
    }
  ],
  "llWanderWithin": [
    {
      "constant": "WANDER_PAUSE_AT_WAYPOINTS",
      "value": "0",
      "parameters": [
        {
          "type": "integer",
          "name": "boolean"
        }
      ],
      "default": "FALSE",
      "description": "Whether the character should pause after reaching each wander waypoint."
    }
  ]
}
</code></pre>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const codeElement = document.querySelector('pre code.language-json');
    if (!codeElement) return;

    const rawJsonText = codeElement.textContent.trim();
    let parsedJson;
    
    try {
        parsedJson = JSON.parse(rawJsonText);
    } catch (e) {
        console.error("Failed to parse JSON for filtering:", e);
        return;
    }

    const buttonContainer = document.getElementById('filter-controls');
    
    function updateDisplay(key, activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');

        let displayText = "";
        if (key === 'all') {
            displayText = JSON.stringify(parsedJson, null, 2);
        } else {
            const isolatedObj = {};
            isolatedObj[key] = parsedJson[key];
            displayText = JSON.stringify(isolatedObj, null, 2);
        }

        codeElement.textContent = displayText;
        if (window.Prism) {
            Prism.highlightElement(codeElement);
        }
    }

    const showAllBtn = document.createElement('button');
    showAllBtn.textContent = "Show All";
    showAllBtn.className = "filter-btn active";
    showAllBtn.addEventListener('click', () => updateDisplay('all', showAllBtn));
    buttonContainer.appendChild(showAllBtn);

    Object.keys(parsedJson).forEach(key => {
        const btn = document.createElement('button');
        btn.textContent = key;
        btn.className = "filter-btn";
        btn.addEventListener('click', () => updateDisplay(key, btn));
        buttonContainer.appendChild(btn);
    });
});
</script>
