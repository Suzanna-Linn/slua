---
layout: default
title: new tooltips for functions and events
slua_beta: true
json : true
---

# New tooltips for functions and events

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LSL Function Search</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 20px auto;
            background-color: #f4f4f9;
        }

        #searchInput {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ccc;
            border-radius: 8px;
            margin-bottom: 20px;
            box-sizing: border-box;
        }

        .no-results {
            color: #888;
            font-style: italic;
        }
    </style>
</head>

<body>

    <h1>LSL Function Dictionary</h1>

    <input type="text" id="searchInput" placeholder="Search for functions and events...">

    <pre><code class="language-json"><div id="jsonOutput"></div></code></pre>

    <script>
        const lslData = {
{
  "llAbs": {
    "tooltip": "Returns the absolute (positive) version of Value.",
    "description": "Returns an integer that is the positive version of val.",
    "arguments": {
      "Value": {
        "tooltip": "An integer value.",
        "newname": "val",
        "description": "Any integer value",
        "newtooltip": "Any integer value."
      }
    },
    "newtooltip": "Returns an integer representing the absolute (positive) value of val."
  },
  "llAcos": {
    "tooltip": "Returns the arc-cosine of Value, in radians.",
    "description": "Returns a float that is the arccosine in radians of val",
    "arguments": {
      "Value": {
        "tooltip": "A floating-point value.",
        "newname": "val",
        "description": "must fall in the range [-1.0, 1.0]",
        "newtooltip": "A floating-point value falling in the range [-1.0, 1.0]."
      }
    },
    "newtooltip": "Returns a float representing the arc-cosine of val in radians."
  },
  "llAddToLandBanList": {
    "tooltip": "Add avatar ID to the parcel ban list for the specified number of Hours.\nA value of 0 for Hours will add the agent indefinitely.\\nThe smallest value that Hours will accept is 0.01; anything smaller will be seen as 0.\\nWhen values that small are used, it seems the function bans in approximately 30 second increments (Probably 36 second increments, as 0.01 of an hour is 36 seconds).\\nResidents teleporting to a parcel where they are banned will be redirected to a neighbouring parcel.",
    "description": "Add avatar to the parcel ban list for the specified number of hours.\n\n\n A value of 0 for hours will add the agent indefinitely. The smallest value that hours will accept is 0.01; anything smaller will be seen as 0.\n\n\n Residents teleporting to a parcel where they are banned will be redirected to a neighboring parcel.",
    "arguments": {
      "ID": {
        "tooltip": "Agent UUID to add to ban-list.",
        "newname": "avatar",
        "description": "avatar UUID",
        "newtooltip": "The UUID of the avatar to add to the ban list."
      },
      "Hours": {
        "tooltip": "Period, in hours, to ban the avatar for.",
        "newname": "hours",
        "newtooltip": "The duration, in hours, to ban the avatar for (0 for indefinite)."
      }
    },
    "newtooltip": "Adds the avatar to the parcel ban list for the specified number of hours. A value of 0 hours adds the avatar indefinitely. Banned users teleporting to the parcel are redirected to a neighboring parcel; the minimum accepted duration is 0.01 hours (approximately 36 seconds)."
  },
  "llAddToLandPassList": {
    "tooltip": "Add avatar ID to the land pass list, for a duration of Hours.",
    "description": "Add avatar to the land pass list for hours, or indefinitely if hours is zero.",
    "arguments": {
      "ID": {
        "tooltip": "Agent UUID to add to pass-list.",
        "newname": "avatar",
        "description": "avatar UUID",
        "newtooltip": "The UUID of the avatar to add to the pass list."
      },
      "Hours": {
        "tooltip": "Period, in hours, to allow the avatar for.",
        "newname": "hours",
        "description": "range [0.0, 144.0]",
        "newtooltip": "The duration, in hours, to allow the avatar for (range [0.0, 144.0], 0 for indefinite)."
      }
    },
    "newtooltip": "Adds the avatar to the land pass list for the specified number of hours (or indefinitely if hours is 0)."
  },
  "llAdjustDamage": {
    "tooltip": "Changes the amount of damage to be delivered by this damage event.",
    "description": "The llAdjustDamage modifies the amount of damage that will be applied by the current on_damage event after it has completed processing.",
    "arguments": {
      "Number": {
        "tooltip": "Damage event index to modify.",
        "newname": "number",
        "description": "The index of the damage event to be modified.",
        "newtooltip": "The index of the damage event to modify."
      },
      "Damage": {
        "tooltip": "New damage amount to apply on this event.",
        "newname": "new_damage",
        "description": "A new damage value to be applied or distributed after on_damage processing.",
        "newtooltip": "The new damage value to be applied or distributed after on_damage processing."
      }
    },
    "newtooltip": "Modifies the amount of damage applied by the current on_damage event after it completes processing, specified by the damage event index number."
  },
  "llAdjustSoundVolume": {
    "tooltip": "Adjusts the volume (0.0 - 1.0) of the currently playing attached sound.\nThis function has no effect on sounds started with llTriggerSound.",
    "arguments": {
      "Volume": {
        "tooltip": "The volume to set.",
        "newname": "volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      }
    },
    "newtooltip": "Adjusts the volume of the currently playing attached sound (has no effect on sounds started with llTriggerSound)."
  },
  "llAgentInExperience": {
    "tooltip": "Returns TRUE if the agent is in the Experience and the Experience can run in the current location.\\n",
    "description": "Determines whether or not the specified agent is in the script's experience.\n\n\n Returns a boolean (an integer) that is TRUE if the agent is in the experience and the experience can run in the current region.",
    "arguments": {
      "AgentID": {
        "tooltip": "",
        "newname": "agent",
        "description": "avatar UUID that is in the same region&#32;to query.",
        "newtooltip": "The UUID of the avatar in the same region to query."
      }
    },
    "newtooltip": "Returns TRUE if the specified agent is in the experience and the experience can run in the current region/location; returns FALSE otherwise."
  },
  "llAllowInventoryDrop": {
    "tooltip": "If Flag == TRUE, users without object modify permissions can still drop inventory items into the object.",
    "description": "Allows for all users without modify permissions to add inventory items to a prim.",
    "arguments": {
      "Flag": {
        "tooltip": "Boolean, If TRUE allows anyone to drop inventory on prim, FALSE revokes.",
        "newname": "add",
        "description": "boolean, If TRUE it allows anyone, even if they don't have modify rights to a prim, regardless of whether they are the owner or not, to drop items into that prim, If FALSE&#32;(default) inventory dropping can still be done, but it is restricted only to people with modify permissions to that prim",
        "newtooltip": "Boolean. If TRUE, allows anyone to drop inventory items into the prim (even without modify rights). If FALSE, restricts inventory dropping to those with modify permissions."
      }
    },
    "newtooltip": "If add is TRUE, allows users without object modify permissions to drop inventory items into the prim. If FALSE, restricts inventory dropping to users with modify permissions."
  },
  "llAngleBetween": {
    "tooltip": "Returns the angle, in radians, between rotations Rot1 and Rot2.",
    "description": "Returns a float that is the angle in radians between rotation a and rotation b.",
    "arguments": {
      "Rot1": {
        "tooltip": "First rotation.",
        "newname": "a",
        "description": "start rotation",
        "newtooltip": "The starting rotation."
      },
      "Rot2": {
        "tooltip": "Second rotation.",
        "newname": "b",
        "description": "end rotation",
        "newtooltip": "The ending rotation."
      }
    },
    "newtooltip": "Returns a float representing the angle in radians between rotations a and b."
  },
  "llApplyImpulse": {
    "tooltip": "Applies impulse to the object.\nIf Local == TRUE, apply the Force in local coordinates; otherwise, apply the Force in global coordinates.\\nThis function only works on physical objects.",
    "description": "Applies impulse to object",
    "arguments": {
      "Force": {
        "tooltip": "Amount of impulse force to apply.",
        "newname": "momentum",
        "newtooltip": "The linear impulse vector to apply."
      },
      "Local": {
        "tooltip": "Boolean, if TRUE, force is treated as a local directional vector instead of region directional vector.",
        "newname": "local",
        "description": "boolean, if TRUE momentum is treated as a local directional vector, if FALSE momentum is treated as a region directional vector",
        "newtooltip": "Boolean. If TRUE, momentum is treated as a local directional vector; if FALSE, it is treated as a global region vector."
      }
    },
    "newtooltip": "Applies a linear impulse (momentum) to a physical object. If local is TRUE, the impulse is applied in local coordinates; otherwise, it is applied in global region coordinates."
  },
  "llApplyRotationalImpulse": {
    "tooltip": "Applies rotational impulse to the object.\nIf Local == TRUE, apply the Force in local coordinates; otherwise, apply the Force in global coordinates.\\nThis function only works on physical objects.",
    "description": "Applies rotational impulse to object.",
    "arguments": {
      "Force": {
        "tooltip": "Amount of impulse force to apply.",
        "newname": "force",
        "newtooltip": "The rotational impulse vector to apply."
      },
      "Local": {
        "tooltip": "Boolean, if TRUE, uses local axis, if FALSE, uses region axis.",
        "newname": "local",
        "description": "boolean, if TRUE force is treated as a local directional vector, if FALSE force is treated as a region directional vector",
        "newtooltip": "Boolean. If TRUE, the force is treated as a local directional vector; if FALSE, it is treated as a global region vector."
      }
    },
    "newtooltip": "Applies a rotational impulse (force) to a physical object. If local is TRUE, the rotational impulse is applied in local coordinates; otherwise, it is applied in global region coordinates."
  },
  "llAsin": {
    "tooltip": "Returns the arc-sine, in radians, of Value.",
    "description": "Returns a float that is the arcsine in radians of val",
    "arguments": {
      "Value": {
        "tooltip": "A floating-point value.",
        "newname": "val",
        "description": "must fall in the range [-1.0, 1.0]",
        "newtooltip": "A floating-point value falling in the range [-1.0, 1.0]."
      }
    },
    "newtooltip": "Returns a float representing the arc-sine of val in radians."
  },
  "llAtan2": {
    "tooltip": "Returns the arc-tangent2 of y, x.",
    "description": "Returns a float that is the [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;arctangent2 of y, x.",
    "arguments": {
      "y": {
        "tooltip": "A floating-point value.",
        "newname": "y",
        "newtooltip": "A floating-point value representing the y coordinate."
      },
      "x": {
        "tooltip": "A floating-point value.",
        "newname": "x",
        "newtooltip": "A floating-point value representing the x coordinate."
      }
    },
    "newtooltip": "Returns a float representing the arctangent2 of y and x."
  },
  "llAttachToAvatar": {
    "tooltip": "Attach to avatar at point AttachmentPoint.\nRequires the PERMISSION_ATTACH runtime permission.",
    "description": "Attaches the object to the avatar who has granted permission to the script. The object is taken into the users inventory and attached to attach_point.",
    "arguments": {
      "AttachmentPoint": {
        "tooltip": "",
        "newname": "attach_point",
        "description": "ATTACH_* constant or valid value (see the tables below)",
        "newtooltip": "The ATTACH_* constant or integer value representing the target attachment point."
      }
    },
    "newtooltip": "Attaches the object to the avatar who has granted the PERMISSION_ATTACH permission. Takes the object into the user's inventory and attaches it at attach_point."
  },
  "llAttachToAvatarTemp": {
    "tooltip": "Follows the same convention as llAttachToAvatar, with the exception that the object will not create new inventory for the user, and will disappear on detach or disconnect.\\nRequires the PERMISSION_ATTACH runtime permission.",
    "description": "Follows the same convention as llAttachToAvatar, with the exception that the object will not create new inventory for the user, and will disappear on detach or disconnect. Also, this function can be used on avatars other than the owner (if granted permission) in which case the ownership is changed to the new wearer.",
    "arguments": {
      "AttachPoint": {
        "tooltip": "Valid attachment point or ATTACH_* constant.",
        "newname": "attach_point",
        "description": "ATTACH_* constant or valid value (see the tables below)",
        "newtooltip": "The ATTACH_* constant or integer value representing the target attachment point."
      }
    },
    "newtooltip": "Attaches the object temporarily to an avatar who has granted the PERMISSION_ATTACH permission. No permanent inventory is created, and the object disappears on detach or disconnect. Can be used on non-owners (changing ownership to the wearer)."
  },
  "llAvatarOnLinkSitTarget": {
    "tooltip": "If an avatar is sitting on the link's sit target, return the avatar's key, NULL_KEY otherwise.\\nReturns a key that is the UUID of the user seated on the specified link's prim.",
    "description": "Returns a key that is the UUID of the user seated on the prim.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag.'",
        "newname": "link",
        "description": "Link number (1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The index of the prim in the linkset (1 for root, >1 for children), or a LINK_* flag."
      }
    },
    "newtooltip": "Returns the UUID of the avatar seated on the specified link's sit target, or NULL_KEY if no avatar is sitting there."
  },
  "llAvatarOnSitTarget": {
    "tooltip": "If an avatar is seated on the sit target, returns the avatar's key, otherwise NULL_KEY.\\nThis only will detect avatars sitting on sit targets defined with llSitTarget.",
    "description": "Returns a key that is the UUID of the user seated on the prim.\n\n\n If the prim lacks a sit target or there is no avatar sitting on the prim, then NULL_KEY is returned.",
    "arguments": {},
    "newtooltip": "Returns the UUID of the avatar seated on the prim's sit target (defined via llSitTarget), or NULL_KEY if no avatar is sitting there or the prim lacks a sit target."
  },
  "llAxes2Rot": {
    "tooltip": "Returns the rotation represented by coordinate axes Forward, Left, and Up.",
    "description": "Returns a rotation that is defined by the 3 coordinate axes",
    "arguments": {
      "Forward": {
        "tooltip": "Forward/Back part of rotation.",
        "newname": "fwd",
        "newtooltip": "The forward/back directional vector of the rotation."
      },
      "Left": {
        "tooltip": "Left/Right part of rotation.",
        "newname": "left",
        "newtooltip": "The left/right directional vector of the rotation."
      },
      "Up": {
        "tooltip": "Up/Down part of rotation.",
        "newname": "up",
        "newtooltip": "The up/down directional vector of the rotation."
      }
    },
    "newtooltip": "Returns the rotation defined by the coordinate axes fwd, left, and up."
  },
  "llAxisAngle2Rot": {
    "tooltip": "Returns the rotation that is a generated Angle about Axis.",
    "description": "Returns a rotation that is a generated angle about axis",
    "arguments": {
      "Axis": {
        "tooltip": "Axis.",
        "newname": "axis",
        "newtooltip": "The axis vector around which the rotation is generated."
      },
      "Angle": {
        "tooltip": "Angle in radians.",
        "newname": "angle",
        "description": "expressed in radians.",
        "newtooltip": "The angle of rotation, expressed in radians."
      }
    },
    "newtooltip": "Returns the rotation representing a generated angle (in radians) about the specified axis."
  },
  "llBase64ToInteger": {
    "tooltip": "Returns an integer that is the Text, Base64 decoded as a big endian integer.\nReturns zero if Text is longer then 8 characters. If Text contains fewer then 6 characters, the return value is unpredictable.",
    "description": "Returns an integer that is str Base64 decoded as a big endian integer.",
    "arguments": {
      "Text": {
        "tooltip": "",
        "newname": "str",
        "description": "Base64 string",
        "newtooltip": "The Base64-encoded string to decode."
      }
    },
    "newtooltip": "Returns an integer representing the Base64-decoded big-endian value of str. Returns zero if str is longer than 8 characters; the return value is unpredictable if str contains fewer than 6 characters."
  },
  "llBase64ToString": {
    "tooltip": "Converts a Base64 string to a conventional string.\nIf the conversion creates any unprintable characters, they are converted to question marks.",
    "description": "Returns a string that is the Base64 str decoded into a conventional string, interpreting the Base64-encoded bytes as UTF-8 character sequence.",
    "arguments": {
      "Text": {
        "tooltip": "",
        "newname": "str",
        "description": "Base64 string",
        "newtooltip": "The Base64-encoded string to decode."
      }
    },
    "newtooltip": "Decodes the Base64-encoded string str into a conventional string, interpreting the bytes as a UTF-8 character sequence. Unprintable characters are converted to question marks."
  },
  "llBreakAllLinks": {
    "tooltip": "De-links all prims in the link set.\nRequires the PERMISSION_CHANGE_LINKS runtime permission.",
    "description": "Delinks all prims in the link set.\n\n\n To run this function the script must request the PERMISSION_CHANGE_LINKS permission with llRequestPermissions&#32;and it must be granted by the owner.",
    "arguments": {},
    "newtooltip": "Delinks all prims in the linkset. Requires the PERMISSION_CHANGE_LINKS runtime permission, which must be requested and granted by the owner."
  },
  "llBreakLink": {
    "tooltip": "De-links the prim with the given link number.\nRequires the PERMISSION_CHANGE_LINKS runtime permission.",
    "description": "Delinks the prim with the given link number in a linked object set",
    "arguments": {
      "LinkNumber": {
        "tooltip": "",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) &#32;",
        "newtooltip": "The link number (0: unlinked, 1: root prim, >1: child prims and seated avatars) to delink."
      }
    },
    "newtooltip": "Delinks the prim specified by the link number link. Requires the PERMISSION_CHANGE_LINKS runtime permission."
  },
  "llCastRay": {
    "tooltip": "'Casts a ray into the physics world from ''start'' to ''end'' and returns data according to details in Options.\\nReports collision data for intersections with objects.\\nReturn value: [UUID_1, {link_number_1}, hit_position_1, {hit_normal_1}, UUID_2, {link_number_2}, hit_position_2, {hit_normal_2}, ... , status_code] where {} indicates optional data.'",
    "description": "Cast a line from start to end and report collision data for intersections with objects.\n\n\n Returns a list of strided values on a successful hit, with an additional integer status_code at the end.\n\n\n Each stride consists of two mandatory values {key uuid, vector position} and optionally {integer link_number, vector normal}. (See RC_DATA_FLAGS for details.)\n\n\n A negative status_code is an error code, otherwise it is the number of hits (and strides) returned.",
    "arguments": {
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "starting location",
        "newtooltip": "The starting location vector of the ray."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "ending location",
        "newtooltip": "The ending location vector of the ray."
      },
      "Options": {
        "tooltip": "",
        "newname": "options",
        "description": "can consists of any number of option flags and their parameters.",
        "newtooltip": "A list of option flags and their parameters to configure the raycast."
      }
    },
    "newtooltip": "Casts a ray into the physics world from start to end and reports collision data for intersections with objects based on options. Returns a list of strided values [UUID_1, {link_number_1}, hit_position_1, {hit_normal_1}, ..., status_code]. A negative status_code indicates an error; otherwise, it represents the number of hits."
  },
  "llCeil": {
    "tooltip": "Returns smallest integer value >= Value.",
    "description": "Returns an integer that is the integer value of val rounded towards positive infinity '(return >= **val**)'.",
    "arguments": {
      "Value": {
        "tooltip": "",
        "newname": "val",
        "description": "Any valid float value",
        "newtooltip": "The float value to round."
      }
    },
    "newtooltip": "Returns the smallest integer value greater than or equal to val (rounded toward positive infinity)."
  },
  "llChar": {
    "tooltip": "Returns a single character string that is the representation of the unicode value.",
    "description": "Construct a single character string from the supplied Unicode value.\n\n\n Returns a string",
    "arguments": {
      "value": {
        "tooltip": "Unicode value to convert into a string.",
        "newname": "val",
        "description": "Unicode value for character.",
        "newtooltip": "The Unicode value to convert into a character string."
      }
    },
    "newtooltip": "Constructs and returns a single-character string representing the supplied Unicode value val."
  },
  "llClearCameraParams": {
    "tooltip": "Resets all camera parameters to default values and turns off scripted camera control.\\nRequires the PERMISSION_CONTROL_CAMERA runtime permission (automatically granted to attached or sat on objects).",
    "description": "Resets all camera parameters to default values and turns off scripted camera control.\n\n\n To run this function the script must request the PERMISSION_CONTROL_CAMERA permission with llRequestPermissions.",
    "arguments": {},
    "newtooltip": "Resets all camera parameters to default values and turns off scripted camera control. Requires the PERMISSION_CONTROL_CAMERA runtime permission (automatically granted for attached or sat-on objects)."
  },
  "llClearExperience": {
    "tooltip": "",
    "arguments": {
      "AgentID": {
        "tooltip": "",
        "newname": ""
      },
      "ExperienceID": {
        "tooltip": "",
        "newname": ""
      }
    },
    "newtooltip": ""
  },
  "llClearExperiencePermissions": {
    "tooltip": "",
    "arguments": {
      "AgentID": {
        "tooltip": "",
        "newname": ""
      }
    },
    "newtooltip": ""
  },
  "llClearLinkMedia": {
    "tooltip": "Clears (deletes) the media and all parameters from the given Face on the linked prim.\\nReturns an integer that is a STATUS_* flag, which details the success/failure of the operation.",
    "description": "Clears (deletes) the media and all params from the given face on the linked prim(s).\n\n\n Returns a status (an integer) that is a STATUS_* flag which details the success/failure of the operation.",
    "arguments": {
      "Link": {
        "tooltip": "",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag representing the target prim."
      },
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number",
        "newtooltip": "The face number to clear."
      }
    },
    "newtooltip": "Deletes the media and clears all parameters from the given face on the linked prim. Returns an integer STATUS_* flag detailing the success or failure of the operation."
  },
  "llClearPrimMedia": {
    "tooltip": "Clears (deletes) the media and all parameters from the given Face.\nReturns an integer that is a STATUS_* flag which details the success/failure of the operation.",
    "description": "Clears (deletes) the media and all params from the given face.\n\n\n Returns a status (an integer) that is a STATUS_* flag which details the success/failure of the operation.",
    "arguments": {
      "Face": {
        "tooltip": "Number of side to clear.",
        "newname": "face",
        "description": "face number",
        "newtooltip": "The face number (side) to clear."
      }
    },
    "newtooltip": "Deletes the media and clears all parameters from the specified face. Returns an integer STATUS_* flag detailing the success or failure of the operation."
  },
  "llCloseRemoteDataChannel": {
    "tooltip": "This function is deprecated.",
    "description": "Closes XML-RPC channel.",
    "arguments": {
      "ChannelID": {
        "tooltip": "",
        "newname": "channel",
        "newtooltip": "The XML-RPC channel ID to close."
      }
    },
    "newtooltip": "Deprecated. Closes the specified XML-RPC channel."
  },
  "llCloud": {
    "tooltip": "Returns the cloud density at the object's position + Offset.",
    "description": "Returns a float that is the cloud density at the prim position + offset",
    "arguments": {
      "Offset": {
        "tooltip": "",
        "newname": "offset",
        "description": "offset relative to the prim's position and expressed in local coordinates",
        "newtooltip": "The offset relative to the prim's position, expressed in local coordinates."
      }
    },
    "newtooltip": "Returns a float representing the cloud density at the prim's position offset by the vector offset."
  },
  "llCollisionFilter": {
    "tooltip": "Specify an empty string or NULL_KEY for Accept, to not filter on the corresponding parameter.",
    "description": "Sets the collision filter, exclusively or inclusively.",
    "arguments": {
      "ObjectName": {
        "tooltip": "",
        "newname": "name",
        "description": "filter for specific object name or avatar legacy name",
        "newtooltip": "The specific object name or avatar legacy name to filter for."
      },
      "ObjectID": {
        "tooltip": "",
        "newname": "id",
        "description": "filter by&#32;group,&#32;avatar or object UUID",
        "newtooltip": "The group, avatar, or object UUID to filter by."
      },
      "Accept": {
        "tooltip": "If TRUE, only accept collisions with ObjectName name AND ObjectID (either is optional), otherwise with objects not ObjectName AND ObjectID.",
        "newname": "accept",
        "description": "TRUE only process collisions that match, FALSE instead excludes matches",
        "newtooltip": "Boolean. If TRUE, only collisions matching the name and id filters are processed; if FALSE, matching collisions are excluded."
      }
    },
    "newtooltip": "Sets the collision filter, either exclusively or inclusively. If accept is TRUE, only collisions matching name and id are processed; if FALSE, matches are excluded. Pass an empty string or NULL_KEY to name or id to skip filtering on that parameter."
  },
  "llCollisionSound": {
    "tooltip": "Suppress default collision sounds, replace default impact sounds with ImpactSound.\\nThe ImpactSound must be in the object inventory.\\nSupply an empty string to suppress collision sounds.",
    "description": "Suppress default collision sounds, replace default impact sounds with impact_sound at the volume impact_volume",
    "arguments": {
      "ImpactSound": {
        "tooltip": "",
        "newname": "impact_sound",
        "description": "a sound in the inventory of the prim this script is in, a UUID&#32;of a sound&#32;or an empty string",
        "newtooltip": "The UUID of a sound, the name of a sound in the prim's inventory, or an empty string to suppress sounds."
      },
      "ImpactVolume": {
        "tooltip": "",
        "newname": "impact_volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **impact_volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      }
    },
    "newtooltip": "Suppresses default collision sounds and replaces default impact sounds with impact_sound at the volume level specified by impact_volume. Supply an empty string to only suppress collision sounds."
  },
  "llCollisionSprite": {
    "tooltip": "Suppress default collision sprites, replace default impact sprite with ImpactSprite; found in the object inventory (empty string to just suppress).",
    "description": "Suppress default collision sprites, replace default impact sprite with impact_sprite",
    "arguments": {
      "ImpactSprite": {
        "tooltip": "",
        "newname": "impact_sprite",
        "description": "a texture in the inventory of the prim this script is in, a UUID&#32;of a texture&#32;or an empty string",
        "newtooltip": "The UUID of a texture, the name of a texture in the prim's inventory, or an empty string to suppress sprites."
      }
    },
    "newtooltip": "Suppresses default collision sprites and replaces them with impact_sprite (which must be in the prim's inventory). Supply an empty string to only suppress collision sprites."
  },
  "llComputeHash": {
    "tooltip": "Returns hex-encoded Hash string of Message using digest Algorithm.",
    "description": "Returns a string hex-encoded hash digest of message using cryptographic algorithm",
    "arguments": {
      "Message": {
        "tooltip": "The message to be hashed.",
        "newname": "message",
        "newtooltip": "The message string to be hashed."
      },
      "Algorithm": {
        "tooltip": "The digest algorithm: md5, sha1, sha224, sha256, sha384, sha512.",
        "newname": "algorithm",
        "newtooltip": "The cryptographic digest algorithm to use (e.g., md5, sha1, sha224, sha256, sha384, or sha512)."
      }
    },
    "newtooltip": "Returns a hex-encoded hash digest string of message using the specified cryptographic algorithm."
  },
  "llCos": {
    "tooltip": "Returns the cosine of Theta (Theta in radians).",
    "description": "Returns a float that is the cosine of theta.",
    "arguments": {
      "Theta": {
        "tooltip": "",
        "newname": "theta",
        "description": "angle expressed in radians",
        "newtooltip": "The angle expressed in radians."
      }
    },
    "newtooltip": "Returns a float representing the cosine of theta."
  },
  "llCreateCharacter": {
    "tooltip": "Convert link-set to AI/Physics character.\nCreates a path-finding entity, known as a \"character\", from the object containing the script. Required to activate use of path-finding functions.\\nOptions is a list of key/value pairs.",
    "description": "Creates a pathfinding entity, known as a \"character\", from the object containing the script. Required to activate use of pathfinding functions.",
    "arguments": {
      "Options": {
        "tooltip": "",
        "newname": "options",
        "description": "Character configuration options.",
        "newtooltip": "A list of key-value pairs specifying the character's configuration options."
      }
    },
    "newtooltip": "Converts the linkset containing the script into a pathfinding character entity (required to use pathfinding functions) using the specified options."
  },
  "llCreateKeyValue": {
    "tooltip": "Starts an asychronous transaction to create a key-value pair. Will fail with XP_ERROR_STORAGE_EXCEPTION if the key already exists. The dataserver callback will be executed with the key returned from this call and a string describing the result. The result is a two element commma-delimited list. The first item is an integer specifying if the transaction succeeded (1) or not (0). In the failure case, the second item will be an integer corresponding to one of the XP_ERROR_... constants. In the success case the second item will be the value passed to the function.\\n",
    "description": "Start an asynchronous transaction to create a key-value pair associated with the script's Experience using the given key (k) and value (v).\n\n\n Returns a handle (a key) that can be used to identify the corresponding dataserver event to determine if this command succeeded or failed.",
    "arguments": {
      "Key": {
        "tooltip": "",
        "newname": "k",
        "description": "The key for the key-value pair",
        "newtooltip": "The unique key name for the key-value pair."
      },
      "Value": {
        "tooltip": "",
        "newname": "v",
        "description": "The value for the key-value pair. Maximum 2047 characters, or 4095 if using Mono.",
        "newtooltip": "The value for the key-value pair (maximum 2047 characters, or 4095 characters if using Mono)."
      }
    },
    "newtooltip": "Starts an asynchronous transaction to create a key-value pair (k and v) associated with the script's experience. Returns a key query handle for the dataserver event. Fails with XP_ERROR_STORAGE_EXCEPTION if the key already exists."
  },
  "llCreateLink": {
    "tooltip": "Attempt to link the object the script is in, to target.\nRequires the PERMISSION_CHANGE_LINKS runtime permission.",
    "description": "Attempt to link the script's object with target.",
    "arguments": {
      "TargetPrim": {
        "tooltip": "Object UUID that is in the same region.",
        "newname": "target",
        "description": "prim UUID that is in the same region",
        "newtooltip": "The UUID of the target prim/object in the same region."
      },
      "Parent": {
        "tooltip": "If FALSE, then TargetPrim becomes the root. If TRUE, then the script's object becomes the root.",
        "newname": "parent",
        "description": "If FALSE, then target becomes the root. If TRUE, then the script's object becomes the root.",
        "newtooltip": "Boolean. If TRUE, the script's object becomes the root prim; if FALSE, target becomes the root."
      }
    },
    "newtooltip": "Attempts to link the object containing the script with target. Requires the PERMISSION_CHANGE_LINKS runtime permission."
  },
  "llCSV2List": {
    "tooltip": "Create a list from a string of comma separated values specified in Text.",
    "description": "This function takes a string of values separated by commas, and turns it into a list.\n\n\n Returns a list made by parsing src, a string of comma separated values.",
    "arguments": {
      "Text": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The string of comma-separated values to parse."
      }
    },
    "newtooltip": "Parses the comma-separated string src and returns it as a list."
  },
  "llDamage": {
    "tooltip": "Generates a damage event on the targeted agent or task.",
    "description": "This function delivers damage to tasks and agent in the same region.",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/target\" target=\"_blank\">target</a>": {
        "tooltip": "Agent or task to receive damage.",
        "newname": "target",
        "description": "The key for the task or avatar that will receive damage.",
        "newtooltip": "The key of the target avatar or task to receive damage."
      },
      "damage": {
        "tooltip": "Damage amount to inflict on this target.",
        "newname": "damage",
        "description": "The amount of damage to deliver to the targeted task or avatar. Unlike collideable damage such as llSetDamage or REZ_DAMAGE, this can be above 100.",
        "newtooltip": "The amount of damage to inflict (can exceed 100, unlike collision-based damage)."
      },
      "type": {
        "tooltip": "Damage type to inflict on this target.",
        "newname": "damage_type",
        "description": "The type of damage to deliver to the targeted task or avatar.",
        "newtooltip": "The type of damage to deliver to the target (can correspond to a DAMAGE_TYPE_* constant)."
      }
    },
    "newtooltip": "Generates a damage event delivering the specified amount of damage and damage_type to the targeted avatar or task in the same region."
  },
  "llDataSizeKeyValue": {
    "tooltip": "Starts an asychronous transaction the request the used and total amount of data allocated for the Experience. The dataserver callback will be executed with the key returned from this call and a string describing the result. The result is commma-delimited list. The first item is an integer specifying if the transaction succeeded (1) or not (0). In the failure case, the second item will be an integer corresponding to one of the XP_ERROR_... constants. In the success case the second item will be the the amount in use and the third item will be the total available.\\n",
    "description": "Start an asynchronous transaction to request the used and total amount of data allocated for the Experience.\n\n\n Returns a handle (a key) that can be used to identify the corresponding dataserver event to determine if this command succeeded or failed and the results.",
    "arguments": {},
    "newtooltip": "Starts an asynchronous transaction to request the used and total data storage allocated for the experience. Returns a key query handle for the dataserver event."
  },
  "llDeleteCharacter": {
    "tooltip": "Convert link-set from AI/Physics character to Physics object.\nConvert the current link-set back to a standard object, removing all path-finding properties.",
    "description": "Convert the object back to a standard object, removing all pathfinding properties.",
    "arguments": {},
    "newtooltip": "Converts the linkset back to a standard physical object, removing all pathfinding properties."
  },
  "llDeleteKeyValue": {
    "tooltip": "Starts an asychronous transaction to delete a key-value pair. The dataserver callback will be executed with the key returned from this call and a string describing the result. The result is a two element commma-delimited list. The first item is an integer specifying if the transaction succeeded (1) or not (0). In the failure case, the second item will be an integer corresponding to one of the XP_ERROR_... constants. In the success case the second item will be the value associated with the key.\\n",
    "description": "Start an asynchronous transaction to delete a key-value pair associated with the script's Experience with the given key (k).\n\n\n Returns a handle (a key) that can be used to identify the corresponding dataserver event to determine if this command succeeded or failed and the results.",
    "arguments": {
      "Key": {
        "tooltip": "",
        "newname": "k",
        "description": "The key for the key-value pairThe key for the key-value pair",
        "newtooltip": "The key of the key-value pair to delete."
      }
    },
    "newtooltip": "Starts an asynchronous transaction to delete the key-value pair associated with key k in the experience. Returns a key query handle for the dataserver event."
  },
  "llDeleteSubList": {
    "tooltip": "Removes the slice from start to end and returns the remainder of the list.\\nRemove a slice from the list and return the remainder, start and end are inclusive.\\nUsing negative numbers for start and/or end causes the index to count backwards from the length of the list, so 0, -1 would delete the entire list.\\nIf Start is larger than End the list deleted is the exclusion of the entries; so 6, 4 would delete the entire list except for the 5th list entry.",
    "description": "Returns a list that is a copy of src but with the slice from start to end removed.",
    "arguments": {
      "Source": {
        "tooltip": "",
        "newname": "src",
        "description": "source",
        "newtooltip": "The source list to copy and modify."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The starting index of the slice to remove (inclusive)."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The ending index of the slice to remove (inclusive)."
      }
    },
    "newtooltip": "Returns a copy of the list src with the slice from start to end (inclusive) removed. Negative indices count backward from the end of the list. If start is greater than end, the deletion excludes the specified range."
  },
  "llDeleteSubString": {
    "tooltip": "Removes the indicated sub-string and returns the result.\nStart and End are inclusive.\\nUsing negative numbers for Start and/or End causes the index to count backwards from the length of the string, so 0, -1 would delete the entire string.\\nIf Start is larger than End, the sub-string is the exclusion of the entries; so 6, 4 would delete the entire string except for the 5th character.",
    "description": "Returns a string that is the result of removing characters from src from start to end.",
    "arguments": {
      "Source": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source string to modify."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The starting index of the substring to remove (inclusive)."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The ending index of the substring to remove (inclusive)."
      }
    },
    "newtooltip": "Returns a copy of the string src with the characters from start to end (inclusive) removed. Negative indices count backward from the end of the string. If start is greater than end, the deletion excludes the specified range."
  },
  "llDerezObject": {
    "tooltip": "Derezzes an object previously rezzed by a script in this region. Returns TRUE on success or FALSE if the object could not be derezzed.",
    "description": "Derezzes an object previously rezzed from within the object containing the script.\n\n\n Returns a boolean (an integer) which is TRUE for success or FALSE for failure.",
    "arguments": {
      "ID": {
        "tooltip": "The ID of an object in the region.",
        "newname": "id",
        "description": "The ID of an object in the region.",
        "newtooltip": "The UUID of the object in the region to derez."
      },
      "flags": {
        "tooltip": "Flags for derez behavior.",
        "newname": "flag",
        "description": "Deletion options.",
        "newtooltip": "Derez behavior flags matching DEREZ_* constants."
      }
    },
    "newtooltip": "Derezzes (deletes or returns) a targeted object in the region previously rezzed by a script in this linkset, returning TRUE on success or FALSE on failure."
  },
  "llDetachFromAvatar": {
    "tooltip": "Remove the object containing the script from the avatar.\nRequires the PERMISSION_ATTACH runtime permission (automatically granted to attached objects).",
    "description": "Detach object from avatar.\n\n\n To run this function the script must request the PERMISSION_ATTACH permission with llRequestPermissions&#32;and it must be granted by the owner.\n\n\n The detached object is no longer present in the sim. There is no lsl equivilent of the \"Drop\" command that moves an attachment onto the ground. Use llRezObject if you need similar behavior",
    "arguments": {},
    "newtooltip": "Detaches the object containing the script from the avatar. Requires the PERMISSION_ATTACH runtime permission (automatically granted to attached objects). Note that the detached object is completely removed from the region and not dropped on the ground."
  },
  "llDetectedDamage": {
    "tooltip": "Returns a list containing the current damage for the event, the damage type and the original damage delivered.",
    "description": "Returns a list containing pending damage information.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns a list containing pending damage information for the event specified by number, including the current damage, the damage type, and the original damage delivered."
  },
  "llDetectedGrab": {
    "tooltip": "Returns the grab offset of a user touching the object.\nReturns <0.0, 0.0, 0.0> if Number is not a valid object.",
    "description": "Returns a vector that is the grab offset of the user touching the object; only works in the touch event.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns a vector representing the grab offset of the user touching the object. Only works in touch events and returns <0.0, 0.0, 0.0> if number is not a valid index."
  },
  "llDetectedGroup": {
    "tooltip": "Returns TRUE if detected object or agent Number has the same user group active as this object.\\nIt will return FALSE if the object or agent is in the group, but the group is not active.",
    "description": "Returns a boolean (an integer) that is TRUE if the detected object or agent has the same active group as the prim containing the script. Otherwise FALSE is returned.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns TRUE if the detected object or avatar specified by number has the same active group as the prim containing the script. Returns FALSE if the group is not active or if they are not in the group."
  },
  "llDetectedKey": {
    "tooltip": "Returns the key of detected object or avatar number.\nReturns NULL_KEY if Number is not a valid index.",
    "description": "Returns a key that is the UUID of the detected object or avatar number.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the key (UUID) of the detected object or avatar specified by number, or NULL_KEY if number is not a valid index."
  },
  "llDetectedLinkNumber": {
    "tooltip": "Returns the link position of the triggered event for touches and collisions only.\\n0 for a non-linked object, 1 for the root of a linked object, 2 for the first child, etc.",
    "description": "Returns the link_number (an integer) of the triggered event. If not supported by the event, returns zero.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the link number (integer) of the triggered event (touches and collisions only) specified by number. Returns 0 for non-linked objects, 1 for the root prim, and 2+ for child prims. Returns 0 if not supported by the event."
  },
  "llDetectedName": {
    "tooltip": "Returns the name of detected object or avatar number.\nReturns the name of detected object number.\\nReturns empty string if Number is not a valid index.",
    "description": "Returns a string that is the name of the detected item.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "item",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns a string representing the name of the detected object or avatar specified by item. Returns an empty string if item is not a valid index."
  },
  "llDetectedOwner": {
    "tooltip": "Returns the key of detected object's owner.\nReturns invalid key if Number is not a valid index.",
    "description": "Returns the key (UUID) of the owner of the object.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the key (UUID) of the owner of the detected object specified by number. Returns an invalid key if number is not a valid index."
  },
  "llDetectedPos": {
    "tooltip": "Returns the position of detected object or avatar number.\nReturns <0.0, 0.0, 0.0> if Number is not a valid index.",
    "description": "Returns a vector that is the position (in region coordinates) of detected object number.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the vector position (in region coordinates) of the detected object or avatar specified by number, or <0.0, 0.0, 0.0> if number is not a valid index."
  },
  "llDetectedRezzer": {
    "tooltip": "Returns the key for the rezzer of the detected object.",
    "description": "Returns a key that is the UUID of the object or avatar that rezzed the detected object number.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the key (UUID) of the object or avatar that rezzed the detected object specified by number."
  },
  "llDetectedRot": {
    "tooltip": "Returns the rotation of detected object or avatar number.\nReturns <0.0, 0.0, 0.0, 1.0> if Number is not a valid offset.",
    "description": "Returns the rotation of detected object number.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the rotation of the detected object or avatar specified by number, or <0.0, 0.0, 0.0, 1.0> if number is not a valid offset index."
  },
  "llDetectedTouchBinormal": {
    "tooltip": "Returns the surface bi-normal for a triggered touch event.\nReturns a vector that is the surface bi-normal (tangent to the surface) where the touch event was triggered.",
    "description": "Returns a vector that is the surface binormal (tangent to the surface, pointing along the positive T (V) direction of tangent space) where the touch event was triggered. Along with llDetectedTouchNormal, this information can be used to find the tangent space at the touch location.",
    "arguments": {
      "Index": {
        "tooltip": "Index of detection information",
        "newname": "index",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the surface binormal vector (tangent to the surface, pointing along the positive T (V) direction of tangent space) at the touched location specified by index. Can be used with llDetectedTouchNormal to determine the tangent space."
  },
  "llDetectedTouchFace": {
    "tooltip": "Returns the index of the face where the avatar clicked in a triggered touch event.",
    "description": "Returns an integer that is the index of the face the avatar clicked on.",
    "arguments": {
      "Index": {
        "tooltip": "Index of detection information",
        "newname": "index",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the integer index of the face clicked by the avatar in the touch event specified by index."
  },
  "llDetectedTouchNormal": {
    "tooltip": "Returns the surface normal for a triggered touch event.\nReturns a vector that is the surface normal (perpendicular to the surface) where the touch event was triggered.",
    "description": "Returns a vector that is the surface normal (perpendicular to the surface) where the touch event was triggered. Along with llDetectedTouchBinormal, this information can be used to find the tangent space at the touch location.",
    "arguments": {
      "Index": {
        "tooltip": "Index of detection information",
        "newname": "index",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the surface normal vector (perpendicular to the surface) at the touched location specified by index. Can be used with llDetectedTouchBinormal to determine the tangent space."
  },
  "llDetectedTouchPos": {
    "tooltip": "Returns the position, in region coordinates, where the object was touched in a triggered touch event.\\nUnless it is a HUD, in which case it returns the position relative to the attach point.",
    "description": "Returns the vector position where the object was touched in region coordinates, unless it is attached to the HUD, in which case it returns the position in screen space coordinates.",
    "arguments": {
      "Index": {
        "tooltip": "Index of detected information",
        "newname": "index",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the vector position where the object was touched (specified by index) in region coordinates, or in screen-space coordinates if the object is attached as a HUD."
  },
  "llDetectedTouchST": {
    "tooltip": "Returns a vector that is the surface coordinates where the prim was touched.\nThe X and Y vector positions contain the horizontal (S) and vertical (T) face coordinates respectively.\\nEach component is in the interval [0.0, 1.0].\\nTOUCH_INVALID_TEXCOORD is returned if the surface coordinates cannot be determined (e.g. when the viewer does not support this function).",
    "description": "Returns a vector that is the surface coordinates for where the prim was touched. The x & y vector positions contain the horizontal (s) & vertical (t) face coordinates respectively ('<**s**, **t**, 0.0>'). Each component is usually in the interval [0.0, 1.0] with the origin in the bottom left corner.[[1]](#footnote_1) With some mesh objects, values of less than 0.0 and higher than 1.0 have been observed.\n\n\n TOUCH_INVALID_TEXCOORD is returned when the surface coordinates cannot be determined. See Caveats for further details.",
    "arguments": {
      "Index": {
        "tooltip": "Index of detection information",
        "newname": "index",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the surface coordinates (<s, t, 0.0>) where the prim was touched, specified by index. X and Y contain the horizontal (s) and vertical (t) face coordinates, typically in the interval [0.0, 1.0]. Returns TOUCH_INVALID_TEXCOORD if coordinates cannot be determined."
  },
  "llDetectedTouchUV": {
    "tooltip": "Returns a vector that is the texture coordinates for where the prim was touched.\\nThe X and Y vector positions contain the U and V face coordinates respectively.\\nTOUCH_INVALID_TEXCOORD is returned if the touch UV coordinates cannot be determined (e.g. when the viewer does not support this function).",
    "description": "Returns a vector that is the texture coordinates for where the prim was touched. The x & y vector positions contain the horizontal (u) & vertical (v) texture coordinates respectively ('<**u**, **v**, 0.0>'). Like llDetectedTouchST, the interval of each component will be [0.0, 1.0] unless the texture repeats are set to a non-default value. Increasing or decreasing the texture repeats of the face will change this interval accordingly. Additionally, unlike with llDetectedTouchST, changing a texture's rotation will change the results of this function.\n\n\n TOUCH_INVALID_TEXCOORD is returned when the touch UV coordinates cannot be determined. See Caveats for further details.",
    "arguments": {
      "Index": {
        "tooltip": "Index of detection information",
        "newname": "index",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the texture coordinates (<u, v, 0.0>) where the prim was touched, specified by index. X and Y contain the horizontal (u) and vertical (v) texture coordinates, typically in the interval [0.0, 1.0] (affected by repeats and rotation). Returns TOUCH_INVALID_TEXCOORD if coordinates cannot be determined."
  },
  "llDetectedType": {
    "tooltip": "Returns the type (AGENT, ACTIVE, PASSIVE, SCRIPTED) of detected object.\\ nReturns 0 if number is not a valid index.\\\\nNote that number is a bit-field, so comparisons need to be a bitwise checked. e.g.:\\\\ninteger iType = llDetectedType(0);\\\\ n{\\\\n\\t// ...do stuff with the agent\\\\n}",
    "description": "Returns a bit field (an integer) that is the types of the detected object or avatar.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns an integer bitfield representing the types (AGENT, ACTIVE, PASSIVE, or SCRIPTED) of the detected object or avatar specified by number. Returns 0 if number is not a valid index."
  },
  "llDetectedVel": {
    "tooltip": "Returns the velocity of the detected object Number.\nReturns<0.0, 0.0, 0.0> if Number is not a valid offset.",
    "description": "Returns the vector velocity of detected object or avatar number.",
    "arguments": {
      "Number": {
        "tooltip": "",
        "newname": "number",
        "description": "Index of detection information",
        "newtooltip": "The index of the detection information."
      }
    },
    "newtooltip": "Returns the vector velocity of the detected object or avatar specified by number, or <0.0, 0.0, 0.0> if number is not a valid offset index."
  },
  "llDialog": {
    "tooltip": "Shows a dialog box on the avatar's screen with the message.\\n Up to 12 strings in the list form buttons.\\\\n\\n If a button is clicked, the name is chatted on Channel.\\\\nOpens a \\\"notify box\\\" in the given avatars screen displaying the message.\\\\n\\n Up to twelve buttons can be specified in a list of strings. When the user clicks a button, the name of the button is said on the specified channel.\\\\n\\n Channels work just like llSay(), so channel 0 can be heard by everyone.\\\\n\\n The chat originates at the object's position, not the avatar's position, even though it is said as the avatar (uses avatar's UUID and Name etc.).\\\\n\\n Examples:\\\\n\\n llDialog(who, \\\"Are you a boy or a girl?\\\", [ \\\"Boy\\\", \\\"Girl\\\" ], -4913);\\\\n\\n llDialog(who, \\\"This shows only an OK button.\\\" , [], -192);\\\\n\\n llDialog(who, \\\"This chats so you can 'hear' it.\\\", [\\\"Hooray\\\"], 0);",
    "description": "Shows a dialog box in the lower right corner of the avatar's screen (upper right in Viewer 1.x) with a message and choice buttons, as well as an ignore button. This has many uses ranging from simple message delivery to complex menu systems.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      },
      "Text": {
        "tooltip": "",
        "newname": "message",
        "description": "message to be displayed in the dialog box",
        "newtooltip": "The text message to display in the dialog box."
      },
      "Buttons": {
        "tooltip": "",
        "newname": "buttons",
        "description": "button labels",
        "newtooltip": "A list of up to 12 strings representing button labels."
      },
      "Channel": {
        "tooltip": "",
        "newname": "channel",
        "description": "output chat channel, any integer value",
        "newtooltip": "The output chat channel (any integer value) where button clicks are chatted."
      }
    },
    "newtooltip": "Shows a dialog box on the screen of the avatar specified by avatar, displaying message along with up to 12 choice buttons. Clicking a button chats its label on channel."
  },
  "llDie": {
    "tooltip": "Delete the object which holds the script.",
    "description": "Deletes the object. The object does not go to the owner's Inventory 🗑 Trash.\n\n\n If called in any prim in the link set the result will be the deletion of the entire object.\n\n\n To remove a single prim from an object, use llBreakLink first.",
    "arguments": {},
    "newtooltip": "Deletes the entire object containing the script (the object does not go to inventory). Use llBreakLink first to delete only a single prim."
  },
  "llDumpList2String": {
    "tooltip": "Returns the list as a single string, using Separator between the entries.\nWrite the list out as a single string, using Separator between values.",
    "description": "Returns a string that is the list src converted to a string with separator between the entries.",
    "arguments": {
      "Source": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source list to convert."
      },
      "Separator": {
        "tooltip": "",
        "newname": "separator",
        "newtooltip": "The separator string to place between list entries."
      }
    },
    "newtooltip": "Returns a string that is the list src converted to a single string, with separator placed between each entry."
  },
  "llEdgeOfWorld": {
    "tooltip": "Checks to see whether the border hit by Direction from Position is the edge of the world (has no neighboring region).\\nReturns TRUE if the line along Direction from Position hits the edge of the world in the current simulator, returns FALSE if that edge crosses into another simulator.",
    "description": "Checks to see whether the border hit by dir from pos is the edge of the world (has no neighboring simulator).\n\n\n Returns a boolean (an integer) value. FALSE indicating there is a simulator in the direction indicated.",
    "arguments": {
      "Position": {
        "tooltip": "",
        "newname": "pos",
        "description": "position in region coordinates",
        "newtooltip": "The position vector in region coordinates."
      },
      "Direction": {
        "tooltip": "",
        "newname": "dir",
        "description": "direction",
        "newtooltip": "The direction vector."
      }
    },
    "newtooltip": "Checks if the border reached along the vector dir from the vector pos is the edge of the world (i.e., has no neighboring simulator). Returns TRUE if it hits the edge of the world, or FALSE if there is a neighboring simulator."
  },
  "llEjectFromLand": {
    "tooltip": "Ejects AvatarID from land that you own.\nEjects AvatarID from land that the object owner (group or resident) owns.",
    "description": "Ejects avatar from the parcel.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Ejects the specified avatar from land/parcels owned by the object's owner (group or resident)."
  },
  "llEmail": {
    "tooltip": "Sends email to Address with Subject and Message.\nSends an email to Address with Subject and Message.",
    "description": "Sends an email to address with subject and message.",
    "arguments": {
      "Address": {
        "tooltip": "",
        "newname": "address",
        "newtooltip": "The destination email address."
      },
      "Subject": {
        "tooltip": "",
        "newname": "subject",
        "newtooltip": "The subject of the email."
      },
      "Text": {
        "tooltip": "",
        "newname": "message",
        "newtooltip": "The message body of the email."
      }
    },
    "newtooltip": "Sends an email to address with subject and message."
  },
  "llEscapeURL": {
    "tooltip": "Returns an escaped/encoded version of url, replacing spaces with %20 etc.\\\\nReturns the string that is the URL-escaped version of URL (replacing spaces with %20, etc.).\\\\n\\n This function returns the UTF-8 encoded escape codes for selected characters.",
    "description": "Returns a string that is the escaped/encoded version of url, replacing spaces with '\"%20\"' etc. The function will escape any character not in [a-zA-Z0-9] to '\"%xx\"' where '\"xx\"' is the [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;hexadecimal value of the character in [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;UTF-8 [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;byte form.",
    "arguments": {
      "URL": {
        "tooltip": "",
        "newname": "url",
        "description": "A (preferably valid and unescaped URL) string.",
        "newtooltip": "The unescaped URL string to escape."
      }
    },
    "newtooltip": "Returns a string representing the escaped/encoded version of url, replacing spaces with '%20' and non-alphanumeric characters with their '%xx' hexadecimal UTF-8 equivalent."
  },
  "llEuler2Rot": {
    "tooltip": "Returns the rotation representation of the Euler angles.\nReturns the rotation represented by the Euler Angle.",
    "description": "Returns a rotation representation of the [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;Euler Angles v.",
    "arguments": {
      "Vector": {
        "tooltip": "",
        "newname": "v",
        "description": "Angle",
        "newtooltip": "The vector of Euler angles to convert."
      }
    },
    "newtooltip": "Returns the rotation representation of the Euler angles vector v."
  },
  "llEvade": {
    "tooltip": "Evade a specified target.\nCharacters will (roughly) try to hide from their pursuers if there is a good hiding spot along their fleeing path. Hiding means no direct line of sight from the head of the character (centre of the top of its physics bounding box) to the head of its pursuer and no direct path between the two on the navigation-mesh.",
    "description": "Characters will (roughly) try to hide from their pursuers if there is a good hiding spot along their fleeing path. Hiding means no direct line of sight from the head of the character (center of the top of its physics bounding box) to the head of its pursuer and no direct path between the two on the navmesh.",
    "arguments": {
      "TargetID": {
        "tooltip": "Agent or object to evade.",
        "newname": "target",
        "description": "group,&#32;avatar or object UUID&#32;to evade",
        "newtooltip": "The UUID of the group, avatar, or object to evade."
      },
      "Options": {
        "tooltip": "No options yet.",
        "newname": "options",
        "description": "No options currently available",
        "newtooltip": "No options currently available (should be empty list)."
      }
    },
    "newtooltip": "Directs a pathfinding character to evade target, attempting to hide from its pursuer if a hiding spot is available (i.e., no line of sight from the character's head to the pursuer's head, and no direct path on the navmesh)."
  },
  "llExecCharacterCmd": {
    "tooltip": "Execute a character command.\nSend a command to the path system.\nCurrently only supports stopping the current path-finding operation or causing the character to jump.",
    "description": "Send a command to the pathing system.",
    "arguments": {
      "Command": {
        "tooltip": "Command to send.",
        "newname": "command",
        "description": "Command to be sent.",
        "newtooltip": "The pathfinding command to execute."
      },
      "Options": {
        "tooltip": "Height for CHARACTER_CMD_JUMP.",
        "newname": "options",
        "description": "'CHARACTER_CMD_*'",
        "newtooltip": "A list of options for the command (e.g., jump height for CHARACTER_CMD_JUMP)."
      }
    },
    "newtooltip": "Sends a command (specified by command) to the pathing system with options. Currently only supports stopping pathfinding or making the character jump."
  },
  "llFabs": {
    "tooltip": "Returns the positive version of Value.\nReturns the absolute value of Value.",
    "description": "Returns a float that is the positive version of val.",
    "arguments": {
      "Value": {
        "tooltip": "",
        "newname": "val",
        "description": "Any valid float value",
        "newtooltip": "The float value to convert."
      }
    },
    "newtooltip": "Returns a float representing the absolute (positive) value of val."
  },
  "llFindNotecardTextCount": {
    "tooltip": "Searches the text of a cached notecard for lines containing the given pattern and returns the \\n number of matches found through a dataserver event.\\n",
    "arguments": {
      "NotecardName": {
        "tooltip": "",
        "newname": ""
      },
      "Pattern": {
        "tooltip": "Regex pattern to find in the notecard text.",
        "newname": ""
      },
      "Options": {
        "tooltip": "A list of options to control the search. Included for future expansion, should be []",
        "newname": ""
      }
    },
    "newtooltip": "Searches the text of a cached notecard for lines containing the given pattern and returns the number of matches found through a dataserver event."
  },
  "llFindNotecardTextSync": {
    "tooltip": "Searches the text of a cached notecard for lines containing the given pattern. \\n Returns a list of line numbers and column where a match is found. If the notecard is not in\\n the cache it returns a list containing a single entry of NAK. If no matches are found an\\n empty list is returned.",
    "description": "Returns a list of lines and columns where the search pattern is found in the notecard.\n\n\n Returns the list containing a list of integers containing the locations of the found text.",
    "arguments": {
      "NotecardName": {
        "tooltip": "",
        "newname": "name",
        "description": "a notecard in the inventory of the prim this script is in&#32;or a UUID&#32;of a notecard",
        "newtooltip": "The name of a notecard in the prim's inventory, or a UUID."
      },
      "Pattern": {
        "tooltip": "Regex pattern to find in the notecard text.",
        "newname": "pattern",
        "description": "The regex pattern to search for",
        "newtooltip": "The regular expression pattern to search for."
      },
      "StartMatch": {
        "tooltip": "Index of the first match to return.",
        "newname": "start",
        "description": "The number of match results to skip before returning matches. 0 will begin at the first match.",
        "newtooltip": "The number of match results to skip before returning (0 to start at the first match)."
      },
      "Count": {
        "tooltip": "The maximum number of matches to return. If 0 this function will return the first 64 matches found.",
        "newname": "count",
        "description": "The maximum number of search results to return",
        "newtooltip": "The maximum number of matches to return (if 0, returns the first 64 matches)."
      },
      "Options": {
        "tooltip": "A list of options to control the search. Included for future expansion, should be []",
        "newname": "options",
        "description": "A list of options to pass into the search. (unused at this time, should be [])",
        "newtooltip": "A list of options for future expansion (unused, should be [])."
      }
    },
    "newtooltip": "Synchronously searches a cached notecard name for lines containing pattern, returning a list of line and column numbers. Returns a list containing 'NAK' if the notecard is not cached, or an empty list if no matches are found."
  },
  "llFleeFrom": {
    "tooltip": "Flee from a point.\nDirects a character (llCreateCharacter) to keep away from a defined position in the region or adjacent regions.",
    "description": "Directs a character to keep a specific distance from a specific position in the region or adjacent regions.",
    "arguments": {
      "Source": {
        "tooltip": "Global coordinate from which to flee.",
        "newname": "position",
        "description": "position in region coordinates&#32;from which to flee.",
        "newtooltip": "The position vector in region coordinates from which to flee."
      },
      "Distance": {
        "tooltip": "Distance in meters to flee from the source.",
        "newname": "distance",
        "description": "Distance in meters to flee from position.",
        "newtooltip": "The distance in meters to keep from the position."
      },
      "Options": {
        "tooltip": "No options available at this time.",
        "newname": "options",
        "description": "No options available at this time.",
        "newtooltip": "No options currently available (should be empty list)."
      }
    },
    "newtooltip": "Directs a pathfinding character to keep the specified distance from the target position vector (within the region or adjacent regions)."
  },
  "llFloor": {
    "tooltip": "Returns largest integer value <= Value.",
    "description": "Returns an integer that is the integer value of val rounded towards negative infinity '(return <= **val**)'.",
    "arguments": {
      "Value": {
        "tooltip": "",
        "newname": "val",
        "description": "Any valid float value",
        "newtooltip": "The float value to round."
      }
    },
    "newtooltip": "Returns the largest integer value less than or equal to val (rounded toward negative infinity)."
  },
  "llForceMouselook": {
    "tooltip": "If Enable is TRUE any avatar that sits on this object is forced into mouse-look mode.\\nAfter calling this function with Enable set to TRUE, any agent sitting down on the prim will be forced into mouse-look.\\nJust like llSitTarget, this changes a permanent property of the prim (not the object) and needs to be reset by calling this function with Enable set to FALSE in order to disable it.",
    "description": "Sets if a sitting avatar should be forced into mouselook when they sit on this prim.",
    "arguments": {
      "Enable": {
        "tooltip": "Boolean, if TRUE when an avatar sits on the prim, the avatar will be forced into mouse-look mode.\\nFALSE is the default setting and will undo a previously set TRUE or do nothing.",
        "newname": "mouselook",
        "description": "boolean, if TRUE when an avatar sits on the prim, the avatar will be forced into mouselook mode, if FALSE&#32;(default) the avatar will keep their current camera mode.",
        "newtooltip": "Boolean. If TRUE, forces a sitting avatar into mouselook; if FALSE, allows them to keep their current camera mode."
      }
    },
    "newtooltip": "Sets whether any avatar sitting on this prim is forced into mouselook mode. Setting mouselook to TRUE forces the mode; FALSE (default) allows the avatar to keep their current camera mode."
  },
  "llFrand": {
    "tooltip": "Returns a pseudo random number in the range [0, Magnitude] or [Magnitude, 0].\\nReturns a pseudo-random number between [0, Magnitude].",
    "description": "Returns a float that is pseudo random in the range [0.0, mag) or (mag, 0.0].[[1]](#footnote_1)\n\n\n This means that the returned value can be any value in the range 0.0 to mag including 0.0, but not including the value of mag itself. The sign of mag matches the return.",
    "arguments": {
      "Magnitude": {
        "tooltip": "",
        "newname": "mag",
        "description": "Any valid float value",
        "newtooltip": "The float magnitude of the random range."
      }
    },
    "newtooltip": "Returns a pseudo-random float in the range [0.0, mag) or (mag, 0.0] depending on the sign of mag. The value is inclusive of 0.0 but exclusive of mag."
  },
  "llGenerateKey": {
    "tooltip": "Generates a key (SHA-1 hash) using UUID generation to create a unique key.\\nAs the UUID produced is versioned, it should never return a value of NULL_KEY.\\nThe specific UUID version is an implementation detail that has changed in the past and may change again in the future. Do not depend upon the UUID that is returned to be version 5 SHA-1 hash.",
    "description": "Generates a key using Version 5 (SHA-1 hash) UUID generation to create a unique key.\n\n\n Returns the key generated.",
    "arguments": {},
    "newtooltip": "Generates and returns a unique versioned UUID key (utilizing SHA-1 hashing). Due to being versioned, it will not return NULL_KEY; however, the exact UUID version is an implementation detail that should not be relied upon."
  },
  "llGetAccel": {
    "tooltip": "Returns the acceleration of the object relative to the region's axes.\nGets the acceleration of the object.",
    "description": "Returns a vector that is the acceleration of the object in the region frame of reference.",
    "arguments": {},
    "newtooltip": "Returns a vector representing the acceleration of the object in the region's frame of reference."
  },
  "llGetAgentInfo": {
    "tooltip": "Returns an integer bit-field containing the agent information about id.\\\\n\\n Returns AGENT_FLYING, AGENT_ATTACHMENTS, AGENT_SCRIPTED, AGENT_SITTING, AGENT_ON_OBJECT, AGENT_MOUSELOOK, AGENT_AWAY, AGENT_BUSY, AGENT_TYPING, AGENT_CROUCHING, AGENT_ALWAYS_RUN, AGENT_WALKING, AGENT_IN_AIR and/or AGENT_FLOATING_VIA_SCRIPTED_ATTACHMENT.\\\\ nReturns information about the given agent ID as a bit-field of agent info constants.",
    "description": "Returns a bit field (an integer) containing the agent information about id.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "id",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Returns an integer bitfield containing status information about the agent specified by id (such as AGENT_FLYING, AGENT_ATTACHMENTS, AGENT_SITTING, etc.)."
  },
  "llGetAgentLanguage": {
    "tooltip": "Returns the language code of the preferred interface language of the avatar.\\nReturns a string that is the language code of the preferred interface language of the resident.",
    "description": "Returns a string that is the language code of the preferred interface language of the user avatar.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Returns a string representing the language code of the preferred interface language set by the avatar."
  },
  "llGetAgentList": {
    "tooltip": "Requests a list of agents currently in the region, limited by the scope parameter.\\nReturns a list [key UUID-0, key UUID-1, ..., key UUID-n] or [string error_msg] - returns avatar keys for all agents in the region limited to the area(s) specified by scope",
    "description": "Requests a list of agents currently in the region, limited by the scope parameter.\n\n\n Returns a list '[[key](https://wiki.secondlife.com/wiki/Key) id0, [key](https://wiki.secondlife.com/wiki/Key) id1, ..., [key](https://wiki.secondlife.com/wiki/Key) idn]' or '[[string](https://wiki.secondlife.com/wiki/String) error_msg]' - returns avatar keys for all agents in the region limited to the area(s) specified by scope\n\n\n • integer\n\n\n scope\n\n\n –",
    "arguments": {
      "Scope": {
        "tooltip": "The scope (region, parcel, parcel same owner) to return agents for.",
        "newname": ""
      },
      "Options": {
        "tooltip": "List of options to apply. Current unused.",
        "newname": ""
      }
    },
    "newtooltip": "Requests a list of avatar UUID keys for agents currently in the region, limited by scope. Returns a list of keys or a list containing an error message string."
  },
  "llGetAgentSize": {
    "tooltip": "If the avatar is in the same region, returns the size of the bounding box of the requested avatar by id, otherwise returns ZERO_VECTOR.\\nIf the agent is in the same region as the object, returns the size of the avatar.",
    "description": "Returns a vector that is an estimated size of the requested avatar.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Returns a vector representing the estimated bounding box size of the specified avatar, or ZERO_VECTOR if they are not in the same region."
  },
  "llGetAlpha": {
    "tooltip": "Returns the alpha value of Face.\nReturns the 'alpha' of the given face. If face is ALL_SIDES the value returned is the mean average of all faces.",
    "description": "Returns a float that is the Blinn-Phong alpha of face.",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns a float representing the Blinn-Phong alpha (transparency) of face. If face is ALL_SIDES, returns the mean average of all faces."
  },
  "llGetAndResetTime": {
    "tooltip": "Returns the script time in seconds and then resets the script timer to zero.\\nGets the time in seconds since starting and resets the time to zero.",
    "description": "Returns a float that is script time in seconds and then resets the script time to zero.",
    "arguments": {},
    "newtooltip": "Returns the elapsed script time in seconds as a float, then resets the script timer to zero."
  },
  "llGetAnimation": {
    "tooltip": "Returns the name of the currently playing locomotion animation for the avatar id.\\nReturns the currently playing animation for the specified avatar ID.",
    "description": "Returns a string that is the name of the currently playing locomotion animation for avatar id. See the table below.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "id",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Returns a string representing the name of the currently playing locomotion animation for the avatar specified by id."
  },
  "llGetAnimationList": {
    "tooltip": "Returns a list of keys of playing animations for an avatar.\nReturns a list of keys of all playing animations for the specified avatar ID.",
    "description": "Returns a list of keys of playing animations for avatar.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Returns a list of keys (UUIDs) representing all active animations currently playing on the specified avatar."
  },
  "llGetAnimationOverride": {
    "tooltip": "Returns a string that is the name of the animation that is used for the specified animation state.\\nRequires the PERMISSION_OVERRIDE_ANIMATIONS or PERMISSION_TRIGGER_ANIMATION runtime permission (automatically granted to attached objects).",
    "description": "Returns a string that is the name of the animation that is being used for the specified animation state (anim_state).",
    "arguments": {
      "AnimationState": {
        "tooltip": "",
        "newname": "anim_state",
        "description": "animation state",
        "newtooltip": "The animation state string to query."
      }
    },
    "newtooltip": "Returns a string representing the name of the animation currently overriding the specified anim_state. Requires the PERMISSION_OVERRIDE_ANIMATIONS or PERMISSION_TRIGGER_ANIMATION runtime permission."
  },
  "llGetAttached": {
    "tooltip": "Returns the object's attachment point, or 0 if not attached.",
    "description": "Returns the attach_point (an integer) the object is attached to or zero if it is either not attached or is pending detachment.",
    "arguments": {},
    "newtooltip": "Returns the integer attachment point (an ATTACH_* constant) that the object is attached to, or 0 if it is unattached or pending detachment."
  },
  "llGetAttachedList": {
    "tooltip": "Returns a list of keys of all visible (not HUD) attachments on the avatar identified by the ID argument, or a list containing 1 string on error.",
    "description": "Returns a list of object keys corresponding to public attachments worn by an avatar in the order they were attached.",
    "arguments": {
      "ID": {
        "tooltip": "Avatar to get attachments",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      }
    },
    "newtooltip": "Returns a list of object keys (UUIDs) corresponding to public, visible (non-HUD) attachments worn by the specified avatar, in the order they were attached. Returns a list with an error message string on failure."
  },
  "llGetAttachedListFiltered": {
    "tooltip": "Retrieves a list of attachments on an avatar, or a list containing 1 string on error.",
    "description": "Returns a list of object keys corresponding to public attachments worn by an avatar in the order they were attached.",
    "arguments": {
      "AgentID": {
        "tooltip": "An agent in the region.",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      },
      "Options": {
        "tooltip": "A list of option for inventory transfer.",
        "newname": "options",
        "newtooltip": "A list of options to filter the returned attachments."
      }
    },
    "newtooltip": "Retrieves a list of attachment object keys worn by avatar in the order they were attached, filtered by options. Returns a list containing an error message string on failure."
  },
  "llGetBoundingBox": {
    "tooltip": "Returns the bounding box around the object (including any linked prims) relative to its root prim, as a list in the format [ (vector) min_corner, (vector) max_corner ].",
    "description": "Returns a list that is the bounding box of object relative to its root prim, in local coordinates.\n\n\n Format: '[ (vector) min_corner, (vector) max_corner ]'",
    "arguments": {
      "ID": {
        "tooltip": "",
        "newname": "object",
        "description": "avatar or prim UUID that is in the same region",
        "newtooltip": "The UUID of the avatar or prim in the same region."
      }
    },
    "newtooltip": "Returns the bounding box of object (including any linked prims) relative to its root prim in local coordinates, formatted as [ (vector) min_corner, (vector) max_corner ]."
  },
  "llGetCameraAspect": {
    "tooltip": "'Returns the current camera aspect ratio (width / height) of the agent who has granted the scripted object PERMISSION_TRACK_CAMERA permissions. If no permissions have been granted: it returns zero.'",
    "description": "Returns a float value for the current camera's aspect ratio (e.g. width/height) of the agent for which the task has permissions.\n\n\n To run this function the script must request the PERMISSION_TRACK_CAMERA permission with llRequestPermissions.",
    "arguments": {},
    "newtooltip": "Returns a float representing the camera's current aspect ratio (width/height) of the agent who granted PERMISSION_TRACK_CAMERA. Returns 0.0 if permissions are not granted."
  },
  "llGetCameraFOV": {
    "tooltip": "'Returns the current camera field of view of the agent who has granted the scripted object PERMISSION_TRACK_CAMERA permissions. If no permissions have been granted: it returns zero.'",
    "description": "Returns a float value for the current camera's field of view (FOV), in radians, of the agent for which the task has permissions.\n\n\n To run this function the script must request the PERMISSION_TRACK_CAMERA permission with llRequestPermissions.",
    "arguments": {},
    "newtooltip": "Returns a float representing the camera's current field of view (FOV) in radians of the agent who granted PERMISSION_TRACK_CAMERA. Returns 0.0 if permissions are not granted."
  },
  "llGetCameraPos": {
    "tooltip": "Returns the current camera position for the agent the task has permissions for.\\nReturns the position of the camera, of the user that granted the script PERMISSION_TRACK_CAMERA. If no user has granted the permission, it returns ZERO_VECTOR.",
    "description": "Returns a vector that is the current camera position for the agent the task has permissions for.\n\n\n To run this function the script must request the PERMISSION_TRACK_CAMERA permission with llRequestPermissions.",
    "arguments": {},
    "newtooltip": "Returns a vector representing the camera's current position in region coordinates of the agent who granted PERMISSION_TRACK_CAMERA. Returns ZERO_VECTOR if permissions are not granted."
  },
  "llGetCameraRot": {
    "tooltip": "Returns the current camera orientation for the agent the task has permissions for. If no user has granted the PERMISSION_TRACK_CAMERA permission, returns ZERO_ROTATION.",
    "description": "Returns a rotation that is the current camera orientation for the agent the task has permissions for.\n\n\n To run this function the script must request the PERMISSION_TRACK_CAMERA permission with llRequestPermissions.",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the camera's current orientation of the agent who granted PERMISSION_TRACK_CAMERA. Returns ZERO_ROTATION if permissions are not granted."
  },
  "llGetCenterOfMass": {
    "tooltip": "Returns the prim's centre of mass (unless called from the root prim, where it returns the object's centre of mass).",
    "description": "Returns the vector position of the object's center of mass in region coordinates.\n\n\n If called from a child prim, the child's center of mass is returned instead (but still in region coordinates).",
    "arguments": {},
    "newtooltip": "Returns the vector position (in region coordinates) of the center of mass. Returns the individual child prim's center of mass if called from a child, or the entire linkset's center of mass if called from the root."
  },
  "llGetClosestNavPoint": {
    "tooltip": "Get the closest navigable point to the point provided.\nThe function accepts a point in region-local space (like all the other path-finding methods) and returns either an empty list or a list containing a single vector which is the closest point on the navigation-mesh to the point provided.",
    "description": "Used to get a point on the navmesh that is the closest point to point.\n\n\n Returns a list containing a single vector which is the closest point on the navmesh to the point provided or an empty list.",
    "arguments": {
      "Point": {
        "tooltip": "A point in region-local space.",
        "newname": "point",
        "description": "A point in region-local space",
        "newtooltip": "The position vector in region-local coordinates."
      },
      "Options": {
        "tooltip": "No options at this time.",
        "newname": "options",
        "description": "GCNP_* and other flags with their parameters. See options table",
        "newtooltip": "A list of GCNP_* flags and parameters to configure the search limits."
      }
    },
    "newtooltip": "Returns a list containing the closest vector position on the navigation mesh (navmesh) to the specified point (expressed in region-local space), or an empty list if none is found. Configured using options."
  },
  "llGetColor": {
    "tooltip": "Returns the color on Face.\nReturns the color of Face as a vector of red, green, and blue values between 0 and 1. If face is ALL_SIDES the color returned is the mean average of each channel.",
    "description": "Returns a vector that is the Blinn-Phong color on face.",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns the Blinn-Phong RGB color vector of face (values between 0.0 and 1.0). If face is ALL_SIDES, returns the mean average of all faces."
  },
  "llGetCreator": {
    "tooltip": "Returns a key for the creator of the prim.\nReturns the key of the object's original creator. Similar to llGetOwner.",
    "description": "Returns a key for the creator of the prim.",
    "arguments": {},
    "newtooltip": "Returns the key (UUID) of the prim's original creator."
  },
  "llGetDate": {
    "tooltip": "Returns the current date in the UTC time zone in the format YYYY-MM-DD.\nReturns the current UTC date as YYYY-MM-DD. Equivilant to os.date(\"%Y-%m-%d\") in lua.",
    "description": "Returns a string that is the current date in the UTC time zone in the format \"YYYY-MM-DD\".\n\n\n If you wish to know the time as well use: llGetTimestamp which uses the format \"YYYY-MM-DDThh:mm:ss.ff..fZ\"",
    "arguments": {},
    "newtooltip": "Returns a string representing the current date in the UTC time zone in the format 'YYYY-MM-DD'."
  },
  "llGetDayLength": {
    "tooltip": "Returns the number of seconds in a day on this parcel.",
    "description": "Return the number of seconds in the day cycle applied to the current parcel. llGetDayLength returns the number of seconds for the current parcel, llGetRegionDayLength is the number of seconds in the day cycle applied to the entire region.\n\n\n Returns an integer",
    "arguments": {},
    "newtooltip": "Returns an integer representing the number of seconds in the environmental day cycle applied to the current parcel."
  },
  "llGetDayOffset": {
    "tooltip": "Returns the number of seconds in a day is offset from midnight in this parcel.",
    "description": "Return the number of seconds added to the current time before calculating the current environmental time for the parcel. llGetDayOffset returns the value for the current parcel, llGetRegionDayOffset produces the same value for the entire region.\n\n\n Returns an integer",
    "arguments": {},
    "newtooltip": "Returns an integer representing the offset duration (in seconds) added to calculate the current environmental time on this parcel."
  },
  "llGetDisplayName": {
    "tooltip": "Returns the display name of an avatar, if the avatar is connected to the current region, or if the name has been cached. Otherwise, returns an empty string. Use llRequestDisplayName if the avatar may be absent from the region.",
    "description": "Returns a string that is the non-unique display name of the avatar specified by id.",
    "arguments": {
      "AvatarID": {
        "tooltip": "Avatar UUID that is in the same region, or is otherwise known to the region.",
        "newname": "id",
        "description": "avatar UUID that is in the same region or is otherwise known to the region",
        "newtooltip": "The UUID of the avatar in the same region or otherwise known to the region."
      }
    },
    "newtooltip": "Returns the display name string of the avatar specified by id if they are in the region or cached; returns an empty string otherwise (use llRequestDisplayName if the avatar is absent)."
  },
  "llGetEnergy": {
    "tooltip": "Returns how much energy is in the object as a percentage of maximum.",
    "description": "Returns a float that is how much energy is in the object as a percentage of maximum",
    "arguments": {},
    "newtooltip": "Returns a float representing the remaining physics energy of the object as a percentage (0.0 to 1.0) of its maximum capacity."
  },
  "llGetEnv": {
    "tooltip": "Returns a string with the requested data about the region.",
    "description": "Returns a string with the requested data about the region.",
    "arguments": {
      "DataRequest": {
        "tooltip": "The type of data to request. Any other string will cause an empty string to be returned.",
        "newname": "name",
        "description": "The name of the data to request",
        "newtooltip": "The name of the regional data to request (unrecognized strings return an empty string)."
      }
    },
    "newtooltip": "Returns a string containing the requested regional data specified by name."
  },
  "llGetEnvironment": {
    "tooltip": "Returns a string with the requested data about the region.",
    "description": "Returns a list containing the current environment values for the parcel or region as a list of attributes. Takes a list of attributes to retrieve in params and returns them in the order requested.",
    "arguments": {
      "Position": {
        "tooltip": "Location within the region.",
        "newname": "pos",
        "description": "A position in region coordinates. X and Y are in region coordinates and determine the parcel. If X and Y are both -1, the environment for the region is inspected. Z is the altitude in the region and determines which sky track is accessed.",
        "newtooltip": "The position vector in region coordinates (X/Y determine the parcel, or region if X/Y are -1; Z determines the sky track altitude)."
      },
      "EnvParams": {
        "tooltip": "List of environment settings requested for the specified parcel location.",
        "newname": "params",
        "description": "A list of parameters to retrieve from the current environment.",
        "newtooltip": "A list of environmental attributes to retrieve."
      }
    },
    "newtooltip": "Returns a list containing the current environment parameters for the parcel or region at pos, retrieved in the order specified by params."
  },
  "llGetExperienceDetails": {
    "tooltip": "Returns a list with the following Experience properties: [Experience Name, Owner ID, Group ID, Experience ID, State, State Message]. State is an integer corresponding to one of the constants XP_ERROR_... and State Message is the string returned by llGetExperienceErrorMessage for that integer.\\n",
    "description": "Returns a list of details about the experience. This list has 6 components: '[string experience_name, key owner_id, key experience_id, integer state, string state_message, key group_id]'",
    "arguments": {
      "ExperienceID": {
        "tooltip": "May be NULL_KEY to retrieve the details for the script's Experience",
        "newname": "experience_id",
        "description": "The ID of the experience to query.",
        "newtooltip": "The UUID of the experience to query (can be NULL_KEY to retrieve details for the script's own experience)."
      }
    },
    "newtooltip": "Returns a list of details for the specified experience_id, formatted as [string experience_name, key owner_id, key experience_id, integer state, string state_message, key group_id]."
  },
  "llGetExperienceErrorMessage": {
    "tooltip": "Returns a string describing the error code passed or the string corresponding with XP_ERROR_UNKNOWN_ERROR if the value is not a valid Experience error code.\\n",
    "description": "Returns a text description of a particular Experience LSL error constant.\n\n\n Returns a string describing the error code passed or the string corresponding to error. Returns XP_ERROR_UNKNOWN_ERROR if the error is not a valid error code.",
    "arguments": {
      "Error": {
        "tooltip": "An Experience error code to translate.",
        "newname": "error",
        "description": "The error code constant to translate.",
        "newtooltip": "The XP_ERROR_* error code constant to translate."
      }
    },
    "newtooltip": "Returns a text description of the specified experience error code, or a description of XP_ERROR_UNKNOWN_ERROR if the error is invalid."
  },
  "llGetExperienceList": {
    "tooltip": "",
    "arguments": {
      "AgentID": {
        "tooltip": "",
        "newname": ""
      }
    },
    "newtooltip": ""
  },
  "llGetForce": {
    "tooltip": "Returns the force (if the script is physical).\nReturns the current force if the script is physical.",
    "description": "Returns a vector that is the force (if the script is physical)",
    "arguments": {},
    "newtooltip": "Returns a vector representing the constant force currently applied to the object (if the object is physical)."
  },
  "llGetFreeMemory": {
    "tooltip": "Returns the number of free bytes of memory the script can use.\nReturns the available free space for the current script. This is inaccurate with LSO.",
    "description": "Returns the integer of the number of free bytes of memory the script can use.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the number of free bytes of memory currently available to the script."
  },
  "llGetFreeURLs": {
    "tooltip": "Returns the number of available URLs for the current script.\nReturns an integer that is the number of available URLs.",
    "description": "Returns an integer that is the number of available URLs. If attached, return the URLs remaining for the owner. Otherwise, return the available URLs for the region.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the number of available HTTP URLs (remaining for the owner if the object is attached, or for the region if unattached)."
  },
  "llGetGeometricCenter": {
    "tooltip": "Returns the vector that is the geometric center of the object relative to the root prim.",
    "description": "Returns the vector that is the geometric center of the object relative to the root prim.",
    "arguments": {},
    "newtooltip": "Returns a vector representing the geometric center of the object relative to its root prim."
  },
  "llGetGMTclock": {
    "tooltip": "Returns the time in seconds since midnight GMT.\nGets the time in seconds since midnight in GMT/UTC.",
    "description": "Returns a float that is the time in seconds since midnight GMT. Value appears to be truncated to the second.\n\n\n For SL time, which is the same as California time, use llGetWallclock",
    "arguments": {},
    "newtooltip": "Returns a float representing the time in seconds since midnight GMT (truncated to whole seconds)."
  },
  "llGetHealth": {
    "tooltip": "Returns the current health of an avatar or object in the region.",
    "description": "Returns the current health of an avatar or object in the region.\n\n\n Returns a float",
    "arguments": {
      "ID": {
        "tooltip": "The ID of an agent or object in the region.",
        "newname": "id",
        "description": "The ID of an agent or object in the region.",
        "newtooltip": "The UUID of the agent or object to query."
      }
    },
    "newtooltip": "Returns a float representing the current health of the avatar or object specified by id."
  },
  "llGetHTTPHeader": {
    "tooltip": "Returns the value for header for request_id.\nReturns a string that is the value of the Header for HTTPRequestID.",
    "description": "Returns a string that is the value for header for request_id.",
    "arguments": {
      "HTTPRequestID": {
        "tooltip": "A valid HTTP request key",
        "newname": "request_id",
        "description": "A valid HTTP request key.",
        "newtooltip": "The unique key of the HTTP request."
      },
      "Header": {
        "tooltip": "Header value name",
        "newname": "header",
        "description": "Lower case header value name.",
        "newtooltip": "The lowercase name of the HTTP header to retrieve."
      }
    },
    "newtooltip": "Returns a string representing the value of the specified header associated with the HTTP request_id."
  },
  "llGetInventoryAcquireTime": {
    "tooltip": "Returns the time at which the item was placed into this prim's inventory as a timestamp.",
    "description": "Returns a string with the timestamp that the item was added to the prim's inventory.\n\n\n The time is in the UTC time zone in the format \"YYYY-MM-DDThh:mm:ssZ\"\n\n\n Appears to be accurate to seconds.",
    "arguments": {
      "InventoryItem": {
        "tooltip": "Name of item in prim inventory.",
        "newname": "item",
        "description": "an item in the inventory of the prim this script is in",
        "newtooltip": "The name of the item in the prim's inventory."
      }
    },
    "newtooltip": "Returns a string containing the UTC timestamp (YYYY-MM-DDThh:mm:ssZ) representing when the inventory item was placed inside the prim."
  },
  "llGetInventoryCreator": {
    "tooltip": "Returns a key for the creator of the inventory item.\nThis function returns the UUID of the creator of item. If item is not found in inventory, the object says \"No item named 'name'\".",
    "description": "Returns a key of the creator of the inventory item.",
    "arguments": {
      "InventoryItem": {
        "tooltip": "",
        "newname": "item",
        "description": "an item in the inventory of the prim this script is in",
        "newtooltip": "The name of the item in the prim's inventory."
      }
    },
    "newtooltip": "Returns the key (UUID) of the creator of the specified inventory item."
  },
  "llGetInventoryDesc": {
    "tooltip": "Returns the item description of the item in inventory. If item is not found in inventory, the object says \"No item named 'name'\" to the debug channel and returns an empty string.",
    "description": "Returns a string with the description of the inventory item.",
    "arguments": {
      "InventoryItem": {
        "tooltip": "",
        "newname": "item",
        "description": "an item in the inventory of the prim this script is in",
        "newtooltip": "The name of the item in the prim's inventory."
      }
    },
    "newtooltip": "Returns a string containing the description of the specified inventory item."
  },
  "llGetInventoryKey": {
    "tooltip": "Returns the key that is the UUID of the inventory named.\nReturns the key of the inventory named.",
    "description": "Returns a key that is the UUID of the inventory name",
    "arguments": {
      "InventoryItem": {
        "tooltip": "",
        "newname": "name",
        "newtooltip": "The name of the item in the prim's inventory."
      }
    },
    "newtooltip": "Returns the key (UUID) of the specified inventory name."
  },
  "llGetInventoryName": {
    "tooltip": "Returns the name of the inventory item of a given type, specified by index number.\\nUse the inventory constants INVENTORY_* to specify the type.",
    "description": "Returns a string that is the name of the inventory item number of type. Returns an empty string if no item of the specified type is found in the prim's inventory (or there are less than or equal to number items of the type).",
    "arguments": {
      "InventoryType": {
        "tooltip": "Inventory item type",
        "newname": "type",
        "description": "INVENTORY_* flag",
        "newtooltip": "The INVENTORY_* type constant of the item."
      },
      "Index": {
        "tooltip": "Index number of inventory item.",
        "newname": "number",
        "description": "Beginning from 0",
        "newtooltip": "The index number of the item of that type, starting from 0."
      }
    },
    "newtooltip": "Returns the name of the inventory item of the specified type (INVENTORY_*) at the index number."
  },
  "llGetInventoryNumber": {
    "tooltip": "Returns the quantity of items of a given type (INVENTORY_* flag) in the prim's inventory.\\nUse the inventory constants INVENTORY_* to specify the type.",
    "description": "Returns an integer that is the number of items of a given type in the prims inventory.",
    "arguments": {
      "InventoryType": {
        "tooltip": "Inventory item type",
        "newname": "type",
        "description": "INVENTORY_* flag",
        "newtooltip": "The INVENTORY_* type constant to count."
      }
    },
    "newtooltip": "Returns an integer representing the quantity of items of the specified type (INVENTORY_*) in the prim's inventory."
  },
  "llGetInventoryPermMask": {
    "tooltip": "Returns the requested permission mask for the inventory item.\nReturns the requested permission mask for the inventory item defined by InventoryItem. If item is not in the object's inventory, llGetInventoryPermMask returns FALSE and causes the object to say \"No item named '<item>'\", where \"<item>\" is item.",
    "description": "Returns a bit field (an integer) of the requested permission category for the inventory item",
    "arguments": {
      "InventoryItem": {
        "tooltip": "Inventory item name.",
        "newname": "item",
        "description": "an item in the inventory of the prim this script is in",
        "newtooltip": "The name of the item in the prim's inventory."
      },
      "BitMask": {
        "tooltip": "MASK_BASE, MASK_OWNER, MASK_GROUP, MASK_EVERYONE or MASK_NEXT",
        "newname": "category",
        "description": "MASK_* flag",
        "newtooltip": "The MASK_* category flag (e.g., MASK_BASE, MASK_OWNER, MASK_GROUP, MASK_EVERYONE, or MASK_NEXT)."
      }
    },
    "newtooltip": "Returns an integer bitfield representing the permission category mask of the specified inventory item."
  },
  "llGetInventoryType": {
    "tooltip": "Returns the type of the named inventory item.\nLike all inventory functions, llGetInventoryType is case-sensitive.",
    "description": "Returns an integer that is the type of the inventory item name",
    "arguments": {
      "InventoryItem": {
        "tooltip": "",
        "newname": "name",
        "description": "name of an inventory item",
        "newtooltip": "The name of the inventory item."
      }
    },
    "newtooltip": "Returns an integer representing the INVENTORY_* type of the named inventory item."
  },
  "llGetKey": {
    "tooltip": "Returns the key of the prim the script is attached to.\nGet the key for the object which has this script.",
    "description": "Returns the key of the prim the script is in.",
    "arguments": {},
    "newtooltip": "Returns the key (UUID) of the prim containing the script."
  },
  "llGetLandOwnerAt": {
    "tooltip": "Returns the key of the land owner, returns NULL_KEY if public.\nReturns the key of the land owner at Position, or NULL_KEY if public.",
    "description": "Returns a key that is the land owner at pos.",
    "arguments": {
      "Position": {
        "tooltip": "",
        "newname": "pos",
        "description": "region coordinate",
        "newtooltip": "The position vector in region coordinates."
      }
    },
    "newtooltip": "Returns the key (UUID) of the land owner at the vector pos, or NULL_KEY if the land is public."
  },
  "llGetLinkKey": {
    "tooltip": "Returns the key of the linked prim LinkNumber.\nReturns the key of LinkNumber in the link set.",
    "description": "Returns the key of the linked prim link",
    "arguments": {
      "LinkNumber": {
        "tooltip": "",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      }
    },
    "newtooltip": "Returns the key (UUID) of the linked prim or avatar specified by link."
  },
  "llGetLinkMedia": {
    "tooltip": "Get the media parameters for a particular face on linked prim, given the desired list of parameter names. Returns a list of values in the order requested.\\tReturns an empty list if no media exists on the face.",
    "description": "Get the media params for a particular face on a linked prim, given the desired list of named params.\n\n\n Returns a parameter list (a list) of values in the order requested.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      },
      "Face": {
        "tooltip": "The prim's side number",
        "newname": "face",
        "description": "face number",
        "newtooltip": "The face number (side) of the prim."
      },
      "Parameters": {
        "tooltip": "A list of PRIM_MEDIA_* property constants to return values of.",
        "newname": "params",
        "description": "a set of names (in no particular order)",
        "newtooltip": "A list of PRIM_MEDIA_* property constants to retrieve values for."
      }
    },
    "newtooltip": "Returns a list containing the media parameters of the specified face on the linked prim link, retrieved in the order requested by params."
  },
  "llGetLinkName": {
    "tooltip": "Returns the name of LinkNumber in a link set.\nReturns the name of LinkNumber the link set.",
    "description": "Returns a string that is the name of link in link set",
    "arguments": {
      "LinkNumber": {
        "tooltip": "",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      }
    },
    "newtooltip": "Returns a string containing the name of the linked prim specified by link."
  },
  "llGetLinkNumber": {
    "tooltip": "Returns the link number of the prim containing the script (0 means not linked, 1 the prim is the root, 2 the prim is the first child, etc.).\\nReturns the link number of the prim containing the script. 0 means no link, 1 the root, 2 for first child, etc.",
    "description": "Returns an integer that is the link number of the prim containing the script.\n\n\n '0' means the prim is not linked, '1' the prim is the root, '2' the prim is the first child, etc. Links are numbered in the reverse order in which they were linked -- if you select a box, a sphere and a cylinder in that order, then link them, the cylinder is 1, the sphere is 2 and the box is 3. The last selected prim has the lowest link number.",
    "arguments": {},
    "newtooltip": "Returns the integer link number of the prim containing the script (0 for unlinked, 1 for the root, and 2+ for children)."
  },
  "llGetLinkNumberOfSides": {
    "tooltip": "Returns the number of sides of the specified linked prim.\nReturns an integer that is the number of faces (or sides) of the prim link.",
    "description": "Returns an integer that is the number of faces (or sides) of the prim link.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag.'",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      }
    },
    "newtooltip": "Returns an integer representing the number of sides (faces) of the linked prim specified by link."
  },
  "llGetLinkPrimitiveParams": {
    "tooltip": "Returns the list of primitive attributes requested in the Parameters list for LinkNumber.\\nPRIM_* flags can be broken into three categories, face flags, prim flags, and object flags.\\n* Supplying a prim or object flag will return that flag's attributes.\\n* Face flags require the user to also supply a face index parameter.",
    "description": "Identical to llGetPrimitiveParams except that it acts on the prim specified by the link number given.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag.'",
        "newname": "link",
        "description": "Link number (0: unlinked, 1: root prim, >1: child prims and seated avatars) or a LINK_* flag to get the parameters of",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag to retrieve parameters from."
      },
      "Parameters": {
        "tooltip": "PRIM_* flags.",
        "newname": "params",
        "description": "PRIM_* flags",
        "newtooltip": "A list of PRIM_* flags specifying the attributes to retrieve."
      }
    },
    "newtooltip": "Returns a list of primitive parameters requested in params for the linked prim specified by link (equivalent to llGetPrimitiveParams)."
  },
  "llGetLinkSitFlags": {
    "tooltip": "Returns the sit flags set on the specified prim in a linkset.",
    "description": "Returns the current flags on the link's sittarget.\n\n\n Returns an integer",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag.'",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;The link ID",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      }
    },
    "newtooltip": "Returns an integer representing the active sit flags currently set on the linked prim specified by link."
  },
  "llGetListEntryType": {
    "tooltip": "Returns the type of the index entry in the list (TYPE_INTEGER, TYPE_FLOAT, TYPE_STRING, TYPE_KEY, TYPE_VECTOR, TYPE_ROTATION, or TYPE_INVALID if index is off list).\\nReturns the type of the variable at Index in ListVariable.",
    "description": "Returns the type (an integer) of the entry at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns an integer representing the variable type (TYPE_*) of the list entry at index in the list src."
  },
  "llGetListLength": {
    "tooltip": "Returns the number of elements in the list.\nReturns the number of elements in ListVariable.",
    "description": "Returns an integer that is the number of elements in the list src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The list to measure."
      }
    },
    "newtooltip": "Returns an integer representing the total number of elements in the list src."
  },
  "llGetLocalPos": {
    "tooltip": "Returns the position relative to the root.\nReturns the local position of a child object relative to the root.",
    "description": "Returns a vector that is the position relative (local) to the root.\n\n\n If called from the root prim it returns the position in the region unless it is attached to which it returns the position relative to the attach point.",
    "arguments": {},
    "newtooltip": "Returns a position vector relative to the root prim. If called from the root prim, it returns the global region position (or the position relative to the attachment point if attached)."
  },
  "llGetLocalRot": {
    "tooltip": "Returns the rotation local to the root.\nReturns the local rotation of a child object relative to the root.",
    "description": "Returns the rotation of the prim relative to the root.\n\n\n If called from the root prim, it returns the objects rotation.",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the local orientation of a child prim relative to the root prim, or the object's overall rotation if called from the root."
  },
  "llGetMass": {
    "tooltip": "Returns the mass of object that the script is attached to.\nReturns the scripted object's mass. When called from a script in a link-set, the parent will return the sum of the link-set weights, while a child will return just its own mass. When called from a script inside an attachment, this function will return the mass of the avatar it's attached to, not its own.",
    "description": "Returns a float that is the mass of object (in lindograms) that script is attached to.",
    "arguments": {},
    "newtooltip": "Returns a float representing the mass of the object (in lindograms). Returns the total linkset mass if called from the root, or the individual prim's mass if called from a child prim. Returns the wearer's mass if inside an attachment."
  },
  "llGetMassMKS": {
    "tooltip": "Acts as llGetMass(), except that the units of the value returned are Kg.",
    "description": "Returns a float that is the mass (in Kilograms) of object that script is attached to. Functionally identical to llGetMass except for the unit used in the return value.\n\n\n MKS as used in the name of this function is likely a reference to the MKS system of units (Meter, Kilogram, Second), which form the base of SI units (with some minor differences).",
    "arguments": {},
    "newtooltip": "Returns a float representing the mass of the object in kilograms. Functionally identical to llGetMass except for using MKS (metric) units."
  },
  "llGetMaxScaleFactor": {
    "tooltip": "Returns the largest multiplicative uniform scale factor that can be successfully applied (via llScaleByFactor()) to the object without violating prim size or linkability rules.",
    "description": "Returns a float that is the largest scaling factor that can be used with llScaleByFactor to resize the object. This maximum is determined by the Linkability Rules and prim scale limits.",
    "arguments": {},
    "newtooltip": "Returns a float representing the maximum scale factor that can be applied to the object via llScaleByFactor without violating size or linkability limits."
  },
  "llGetMemoryLimit": {
    "tooltip": "Get the maximum memory a script can use, in bytes.",
    "description": "Get the maximum memory a script can use.\n\n\n Returns the integer amount of memory the script can use in bytes.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the maximum memory limit (in bytes) that the script is allowed to allocate."
  },
  "llGetMinScaleFactor": {
    "tooltip": "Returns the smallest multiplicative uniform scale factor that can be successfully applied (via llScaleByFactor()) to the object without violating prim size or linkability rules.",
    "description": "Returns a float that is the smallest scaling factor that can be used with llScaleByFactor to resize the object. This minimum is determined by the prim scale limits.",
    "arguments": {},
    "newtooltip": "Returns a float representing the minimum scale factor that can be applied to the object via llScaleByFactor without violating size limits."
  },
  "llGetMoonDirection": {
    "tooltip": "Returns a normalized vector of the direction of the moon in the parcel.\nReturns the moon's direction on the simulator in the parcel.",
    "description": "Returns a normalized vector to the current moon position at the location of object containing the script. llGetMoonDirection is the vector to the parcel's moon, llGetRegionMoonDirection is the vector to region's moon. If there is no custom environment set for the current parcel llGetMoonDirection returns the direction to the region's moon. These functions are altitude aware.\n\n\n Returns a vector",
    "arguments": {},
    "newtooltip": "Returns a normalized vector representing the current direction of the parcel's moon, taking altitude into account. Falls back to the region's moon direction if no custom parcel environment is set."
  },
  "llGetMoonRotation": {
    "tooltip": "Returns the rotation applied to the moon in the parcel.",
    "description": "Return the rotation applied to the moon for the parcel at the location of the object containing the script. These function are altitude aware and so will pick up the moon for their current track. llGetRegionMoonRotation returns the rotation applied at the region level, llGetMoonRotation does the same for the parcel. If there is no custom environment applied to parcel llGetMoonRotation returns the same value as llGetRegionMoonRotation.\n\n\n Returns a rotation",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the orientation applied to the moon on the current parcel and altitude track. Falls back to the region's moon rotation if no custom parcel environment is set."
  },
  "llGetNextEmail": {
    "tooltip": "Fetch the next queued email with that matches the given address and/or subject, via the email event.\\nIf the parameters are blank, they are not used for filtering.",
    "description": "Get the next queued email that comes from address, with specified subject.",
    "arguments": {
      "Address": {
        "tooltip": "",
        "newname": "address",
        "description": "Sender's mail address",
        "newtooltip": "The sender email address filter."
      },
      "Subject": {
        "tooltip": "",
        "newname": "subject",
        "description": "Mail subject",
        "newtooltip": "The email subject filter."
      }
    },
    "newtooltip": "Requests the next queued email matching the specified sender address and subject filters via the email event."
  },
  "llGetNotecardLine": {
    "tooltip": "Returns LineNumber from NotecardName via the dataserver event. The line index starts at zero in LSL, one in Lua.\\nIf the requested line is passed the end of the note-card the dataserver event will return the constant EOF string.\\nThe key returned by this function is a unique identifier which will be supplied to the dataserver event in the requested parameter.",
    "description": "Requests the line line of the notecard name from the dataserver.\n\n\n Returns the handle (a key) for a dataserver event response.",
    "arguments": {
      "NotecardName": {
        "tooltip": "",
        "newname": "name",
        "description": "a notecard in the inventory of the prim this script is in&#32;or a UUID&#32;of a notecard",
        "newtooltip": "The name of the notecard in the prim's inventory, or a UUID."
      },
      "LineNumber": {
        "tooltip": "",
        "newname": "line",
        "description": "Line number in a notecard (the index starts at zero).",
        "newtooltip": "The zero-based line number to request."
      }
    },
    "newtooltip": "Asynchronously requests the line index line of the notecard name from the dataserver. Returns a key query handle for the dataserver event, which will return 'EOF' when reaching past the end of the notecard."
  },
  "llGetNotecardLineSync": {
    "tooltip": "Returns LineNumber from NotecardName. The line index starts at zero in LSL, one in Lua.\\nIf the requested line is past the end of the note-card the return value will be set to the constant EOF string.\\nIf the note-card is not cached on the simulator the return value is the NAK string.",
    "description": "Gets the line of the notecard name from the region's notecard cache immediately without raising a dataserver event.\n\n\n Returns the string containing the text of the requested line from the notecard.",
    "arguments": {
      "NotecardName": {
        "tooltip": "",
        "newname": "name",
        "description": "a notecard in the inventory of the prim this script is in&#32;or a UUID&#32;of a notecard",
        "newtooltip": "The name of the notecard in the prim's inventory, or a UUID."
      },
      "LineNumber": {
        "tooltip": "",
        "newname": "line",
        "description": "Line number in a notecard (the index starts at zero).",
        "newtooltip": "The zero-based line number to request."
      }
    },
    "newtooltip": "Synchronously reads the line index line of the notecard name from the region's cache, immediately returning its text without raising a dataserver event. Returns 'NAK' if not cached or 'EOF' if out of bounds."
  },
  "llGetNumberOfNotecardLines": {
    "tooltip": "Returns the number of lines contained within a notecard via the dataserver event.\\nThe key returned by this function is a query ID for identifying the dataserver reply.",
    "description": "Requests the number of lines in notecard name via the dataserver event (cast dataserver value to integer)\n\n\n Returns the handle (a key) for a dataserver event response.",
    "arguments": {
      "NotecardName": {
        "tooltip": "",
        "newname": "name",
        "description": "a notecard in the inventory of the prim this script is in&#32;or a UUID&#32;of a notecard",
        "newtooltip": "The name of the notecard in the prim's inventory, or a UUID."
      }
    },
    "newtooltip": "Asynchronously requests the total line count of the notecard name. Returns a key query handle for the dataserver event."
  },
  "llGetNumberOfPrims": {
    "tooltip": "Returns the number of prims in a link set the script is attached to.\nReturns the number of prims in (and avatars seated on) the object the script is in.",
    "description": "Returns an integer that is the number of prims in a link set the script is attached to.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the total number of prims and seated avatars in the linkset containing the script."
  },
  "llGetNumberOfSides": {
    "tooltip": "Returns the number of faces (or sides) of the prim.\nReturns the number of sides of the prim which has the script.",
    "description": "Returns an integer that is the number of faces (or sides) of the prim.\n\n\n See Face for more information about faces and the conditions that control the number of faces a prim will have.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the total number of sides (faces) of the prim containing the script."
  },
  "llGetObjectAnimationNames": {
    "tooltip": "Returns a list of names of playing animations for an object.\nReturns a list of names of all playing animations for the current object.",
    "description": "Returns a list of names of animations playing in the current object",
    "arguments": {},
    "newtooltip": "Returns a list of strings representing the names of all active animations currently playing on the object."
  },
  "llGetObjectDesc": {
    "tooltip": "Returns the description of the prim the script is attached to.\nReturns the description of the scripted object/prim. You can set the description using llSetObjectDesc.",
    "description": "Returns a string containing the description of the prim the script is attached to.\n\n\n To get the object's description (not the current prim's), use PRIM_DESC or OBJECT_DESC.",
    "arguments": {},
    "newtooltip": "Returns a string containing the description of the specific prim containing the script."
  },
  "llGetObjectDetails": {
    "tooltip": "Returns a list of object details specified in the Parameters list for the object or avatar in the region with key ID.\\nParameters are specified by the OBJECT_* constants.",
    "description": "Returns a list of the details for id, specifically those requested in params.",
    "arguments": {
      "ID": {
        "tooltip": "Prim or avatar UUID that is in the same region.",
        "newname": "id",
        "description": "avatar or prim UUID that is in the same region&#32;or adjacent regions*",
        "newtooltip": "The UUID of the avatar or prim (in the same or adjacent regions) to query."
      },
      "Parameters": {
        "tooltip": "List of OBJECT_* flags.",
        "newname": "params",
        "description": "OBJECT_* flags",
        "newtooltip": "A list of OBJECT_* flags specifying the attributes to retrieve."
      }
    },
    "newtooltip": "Returns a list containing the requested parameters of the specified avatar or object id, retrieved in the order requested by params."
  },
  "llGetObjectLinkKey": {
    "tooltip": "Returns the key of the linked prim link_no in a linkset.\nReturns the key of link_no in the link set specified by id.",
    "description": "Returns the key of the linked prim link",
    "arguments": {
      "id": {
        "tooltip": "UUID of prim",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The UUID of the target prim or linkset."
      },
      "link_no": {
        "tooltip": "Link number to retrieve",
        "newname": "",
        "newtooltip": "The link number (index) of the prim within the linkset to retrieve."
      }
    },
    "newtooltip": "Returns the key (UUID) of the child prim link_no within the target linkset specified by link."
  },
  "llGetObjectMass": {
    "tooltip": "Returns the mass of the avatar or object in the region.\nGets the mass of the object or avatar corresponding to ID.",
    "description": "Returns a float that is the mass of id",
    "arguments": {
      "ID": {
        "tooltip": "",
        "newname": "id",
        "description": "avatar or object UUID that is in the same region",
        "newtooltip": "The UUID of the avatar or object to query."
      }
    },
    "newtooltip": "Returns a float representing the mass of the avatar or object specified by id."
  },
  "llGetObjectName": {
    "tooltip": "Returns the name of the prim which the script is attached to.\nReturns the name of the prim (not object) which contains the script.",
    "description": "Returns a string that is the name of the prim the script is attached to.",
    "arguments": {},
    "newtooltip": "Returns a string containing the name of the specific prim containing the script."
  },
  "llGetObjectPermMask": {
    "tooltip": "Returns the permission mask of the requested category for the object.",
    "description": "Returns a bit field (an integer) of the requested permission category for the object containing this script.",
    "arguments": {
      "Category": {
        "tooltip": "Category is one of MASK_BASE, MASK_OWNER, MASK_GROUP, MASK_EVERYONE, or MASK_NEXT",
        "newname": "category",
        "description": "MASK_* flag",
        "newtooltip": "The MASK_* category flag (e.g., MASK_BASE, MASK_OWNER, MASK_GROUP, MASK_EVERYONE, or MASK_NEXT)."
      }
    },
    "newtooltip": "Returns an integer bitfield representing the permission mask of the specified category for the object containing the script."
  },
  "llGetObjectPrimCount": {
    "tooltip": "Returns the total number of prims for an object in the region.\nReturns the prim count for any object id in the same region.",
    "description": "Returns an integer that is the total number of prims in the object that contains prim.",
    "arguments": {
      "ObjectID": {
        "tooltip": "",
        "newname": "prim",
        "description": "prim UUID that is in the same region",
        "newtooltip": "The UUID of the prim in the same region."
      }
    },
    "newtooltip": "Returns an integer representing the total number of prims in the object containing the specified prim."
  },
  "llGetOmega": {
    "tooltip": "Returns the rotation velocity in radians per second.\nReturns a vector that is the rotation velocity of the object in radians per second.",
    "description": "Returns a vector that is the rotation velocity of the object in radians per second.",
    "arguments": {},
    "newtooltip": "Returns a vector representing the physical rotation (angular velocity) of the object in radians per second."
  },
  "llGetOwner": {
    "tooltip": "Returns the object owner's UUID.\nReturns the key for the owner of the object.",
    "description": "Returns a key that is the object owner's UUID.",
    "arguments": {},
    "newtooltip": "Returns the key (UUID) of the object's current owner."
  },
  "llGetOwnerKey": {
    "tooltip": "Returns the owner of ObjectID.\nReturns the key for the owner of object ObjectID.",
    "description": "Returns a key that is the owner of prim id",
    "arguments": {
      "ObjectID": {
        "tooltip": "",
        "newname": "id",
        "description": "prim UUID that is in the same region",
        "newtooltip": "The UUID of the prim in the same region."
      }
    },
    "newtooltip": "Returns the key (UUID) of the owner of the prim specified by id."
  },
  "llGetParcelDetails": {
    "tooltip": "'Returns a list of parcel details specified in the ParcelDetails list for the parcel at Position.\\nParameters is one or more of: PARCEL_DETAILS_NAME, _DESC, _OWNER, _GROUP, _AREA, _ID, _SEE_AVATARS.\\nReturns a list that is the parcel details specified in ParcelDetails (in the same order) for the parcel at Position.'",
    "description": "Returns a list that is the parcel details specified in params (in the same order) for the parcel at pos.",
    "arguments": {
      "Position": {
        "tooltip": "Location within the region.",
        "newname": "pos",
        "description": "only x and y are important and to be given in region coordinates",
        "newtooltip": "The position vector in region coordinates (only the X and Y components are used)."
      },
      "ParcelDetails": {
        "tooltip": "List of details requested for the specified parcel location.",
        "newname": "params",
        "description": "a list of PARCEL_DETAILS_* flags.",
        "newtooltip": "A list of PARCEL_DETAILS_* flags specifying the attributes to retrieve."
      }
    },
    "newtooltip": "Returns a list containing the requested parcel details specified by params (retrieved in the same order) for the parcel at the vector pos."
  },
  "llGetParcelFlags": {
    "tooltip": "Returns a mask of the parcel flags (PARCEL_FLAG_*) for the parcel that includes the point Position.\\nReturns a bit-field specifying the parcel flags (PARCEL_FLAG_*) for the parcel at Position.",
    "description": "Returns a bit field (an integer) of parcel flags (PARCEL_FLAG_*) for the parcel that includes the point pos.",
    "arguments": {
      "Position": {
        "tooltip": "",
        "newname": "pos",
        "description": "position in region coordinates&#32;(z component is ignored)",
        "newtooltip": "The position vector in region coordinates (the Z component is ignored)."
      }
    },
    "newtooltip": "Returns an integer bitfield of parcel flags (PARCEL_FLAG_*) for the parcel at the position pos."
  },
  "llGetParcelMaxPrims": {
    "tooltip": "Returns the maximum number of prims allowed on the parcel at Position for a given scope.\\nThe scope may be set to an individual parcel or the combined resources of all parcels with the same ownership in the region.",
    "description": "Returns an integer that is the maximum combined land impact allowed for objects on the parcel at pos.",
    "arguments": {
      "Position": {
        "tooltip": "Region coordinates (z is ignored) of parcel.",
        "newname": "pos",
        "description": "position in region coordinates&#32;(z component is ignored)",
        "newtooltip": "The position vector in region coordinates (the Z component is ignored)."
      },
      "SimWide": {
        "tooltip": "Boolean. If FALSE then the return is the maximum prims supported by the parcel. If TRUE then it is the combined number of prims on all parcels in the region owned by the specified parcel's owner.",
        "newname": "sim_wide",
        "description": "TRUE treats all parcels owned by this parcel owner in the sim in a single maximum, FALSE determines the max for the specified parcel",
        "newtooltip": "Boolean. If TRUE, returns the combined land impact limit for all parcels owned by the parcel owner in the region; if FALSE, returns only the limit for the specified parcel."
      }
    },
    "newtooltip": "Returns an integer representing the maximum combined land impact (prim limit) allowed for objects on the parcel at pos, determined either for the single parcel or sim-wide based on sim_wide."
  },
  "llGetParcelMusicURL": {
    "tooltip": "Gets the streaming audio URL for the parcel object is on.\nThe object owner, avatar or group, must also be the land owner.",
    "description": "Returns a string containing the parcel streaming audio URL.\n\n\n The object owner must also be the land owner. If the land is deeded to a group the object will need to be deeded to the same group for this function to work.",
    "arguments": {},
    "newtooltip": "Returns a string containing the parcel's streaming music (audio) URL. The object owner must also be the land owner (or share the same group deeding)."
  },
  "llGetParcelPrimCount": {
    "tooltip": "'Returns the number of prims on the parcel at Position of the given category.\nCategories: PARCEL_COUNT_TOTAL, _OWNER, _GROUP, _OTHER, _SELECTED, _TEMP.\\nReturns the number of prims used on the parcel at Position which are in Category.\\nIf SimWide is TRUE, it returns the total number of objects for all parcels with matching ownership in the category specified.\\nIf SimWide is FALSE, it returns the number of objects on this specific parcel in the category specified'",
    "description": "Returns an integer that is the total land impact of objects on the parcel at pos of the given category",
    "arguments": {
      "Position": {
        "tooltip": "Region coordinates of parcel to query.",
        "newname": "pos",
        "description": "position in region coordinates&#32;(z component is ignored)",
        "newtooltip": "The position vector in region coordinates (the Z component is ignored)."
      },
      "Category": {
        "tooltip": "A PARCEL_COUNT_* flag.",
        "newname": "category",
        "description": "a PARCEL_COUNT_* flag",
        "newtooltip": "The PARCEL_COUNT_* category flag."
      },
      "SimWide": {
        "tooltip": "Boolean. If FALSE then the return is the maximum prims supported by the parcel. If TRUE then it is the combined number of prims on all parcels in the region owned by the specified parcel's owner.",
        "newname": "sim_wide",
        "description": "boolean, TRUE[[1]](#footnote_1) searches parcels in the region with the same owner as the targeted parcel, FALSE searches only the targeted parcel",
        "newtooltip": "Boolean. If TRUE, searches all parcels in the region owned by the targeted parcel's owner; if FALSE, searches only the specified parcel."
      }
    },
    "newtooltip": "Returns an integer representing the total land impact of objects on the parcel at pos in the specified category. If sim_wide is TRUE, returns combined usage for all regional parcels owned by the parcel owner; if FALSE, returns usage for only the specified parcel."
  },
  "llGetParcelPrimOwners": {
    "tooltip": "Returns a list of up to 100 residents who own objects on the parcel at Position, with per-owner land impact totals.\\nRequires owner-like permissions for the parcel, and for the script owner to be present in the region.\\nThe list is formatted as [ key agentKey1, integer agentLI1, key agentKey2, integer agentLI2, ... ], sorted by agent key.\\nThe integers are the combined land impacts of the objects owned by the corresponding agents.",
    "description": "Returns a list of all residents and groups who own objects on the parcel at pos and with individual land impact used.\n\n\n The list is formatted as '[ [key](https://wiki.secondlife.com/wiki/Key) ownerKey1, [integer](https://wiki.secondlife.com/wiki/Integer) agentImpact1, [key](https://wiki.secondlife.com/wiki/Key) ownerKey2, [integer](https://wiki.secondlife.com/wiki/Integer) agentImpact2, ... ]', and sorted by agent/group key with a maximum of 100 strides.",
    "arguments": {
      "Position": {
        "tooltip": "",
        "newname": "pos",
        "description": "position in region coordinates",
        "newtooltip": "The position vector in region coordinates."
      }
    },
    "newtooltip": "Returns a list of up to 100 strides (formatted as [key owner, integer land_impact]) representing owners of objects on the parcel at pos, sorted by owner key. Requires owner-like permissions for the parcel and the script owner's presence in the region."
  },
  "llGetPermissions": {
    "tooltip": "Returns an integer bitmask of the permissions that have been granted to the script. Individual permissions can be determined using a bit-wise \"and\" operation against the PERMISSION_* constants",
    "description": "Returns an integer bitfield with the script permissions granted",
    "arguments": {},
    "newtooltip": "Returns an integer bitfield representing the permissions (PERMISSION_*) currently granted to the script."
  },
  "llGetPermissionsKey": {
    "tooltip": "Returns the key of the avatar that last granted or declined permissions to the script.\\nReturns NULL_KEY if permissions were never granted or declined.",
    "description": "Returns the avatar (a key) of the avatar that last granted or declined permissions to the script.\n\n\n Returns NULL_KEY if permissions were neither granted nor declined (e.g., the permissions dialog was cancelled or otherwise ignored).",
    "arguments": {},
    "newtooltip": "Returns the key (UUID) of the avatar that last granted or declined permissions to the script, or NULL_KEY if the permissions request was ignored or cancelled."
  },
  "llGetPhysicsMaterial": {
    "tooltip": "Returns a list of the form [float gravity_multiplier, float restitution, float friction, float density].",
    "description": "Used to get the physical characteristics of an object.\n\n\n Returns a list in the form '[ [float](https://wiki.secondlife.com/wiki/Float) **gravity_multiplier**, [float](https://wiki.secondlife.com/wiki/Float) **restitution**, [float](https://wiki.secondlife.com/wiki/Float) **friction**, [float](https://wiki.secondlife.com/wiki/Float) **density** ]'",
    "arguments": {},
    "newtooltip": "Returns a list of the format [float gravity_multiplier, float restitution, float friction, float density] detailing the physical characteristics of the object."
  },
  "llGetPos": {
    "tooltip": "Returns the position of the task in region coordinates.\nReturns the vector position of the task in region coordinates.",
    "description": "Returns the vector position of the task in region coordinates",
    "arguments": {},
    "newtooltip": "Returns a vector representing the current position of the object in region coordinates."
  },
  "llGetPrimitiveParams": {
    "tooltip": "Returns the primitive parameters specified in the parameters list.\nReturns primitive parameters specified in the Parameters list.",
    "description": "Returns attribute values (a list) for the attributes requested in the params list.",
    "arguments": {
      "Parameters": {
        "tooltip": "PRIM_* flags and face parameters",
        "newname": "params",
        "description": "PRIM_* flags",
        "newtooltip": "A list of PRIM_* flags specifying the attributes to retrieve."
      }
    },
    "newtooltip": "Returns a list of primitive attribute values matching the requested params list."
  },
  "llGetPrimMediaParams": {
    "tooltip": "Returns the media parameters for a particular face on an object, given the desired list of parameter names, in the order requested. Returns an empty list if no media exists on the face.",
    "description": "Get the media params for a particular face on an object, given the desired list of names.\n\n\n Returns a parameter list (a list) of values in the order requested.",
    "arguments": {
      "Face": {
        "tooltip": "face number",
        "newname": "face",
        "description": "face number",
        "newtooltip": "The face number (side) of the prim."
      },
      "Parameters": {
        "tooltip": "A list of PRIM_MEDIA_* property constants to return values of.",
        "newname": "params",
        "description": "a set of name (in no particular order)",
        "newtooltip": "A list of PRIM_MEDIA_* property constants to retrieve values for."
      }
    },
    "newtooltip": "Returns a list containing the media parameters of the specified face, retrieved in the order requested by params. Returns an empty list if no media exists on the face."
  },
  "llGetRegionAgentCount": {
    "tooltip": "Returns the number of avatars in the region.\nReturns an integer that is the number of avatars in the region.",
    "description": "Returns an integer that is the number of avatars in the region.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the current number of avatars in the region."
  },
  "llGetRegionCorner": {
    "tooltip": "Returns a vector, in meters, that is the global location of the south-west corner of the region which the object is in.\\nReturns the Region-Corner of the simulator containing the task. The region-corner is a vector (values in meters) representing distance from the first region.",
    "description": "Returns a vector in meters that is the global location of the south-west corner of the region the object is in. The z component is 0.0\n\n\n Divide the returned value by 256 to get the region offset.",
    "arguments": {},
    "newtooltip": "Returns a vector (in meters) representing the global grid coordinates of the south-west corner of the current region (Z component is always 0.0)."
  },
  "llGetRegionDayLength": {
    "tooltip": "Returns the number of seconds in a day in this region.",
    "description": "Return the number of seconds in the day cycle applied to the current region. llGetDayLength returns the number of seconds for the current parcel, llGetRegionDayLength is the number of seconds in the day cycle applied to the entire region.\n\n\n Returns an integer",
    "arguments": {},
    "newtooltip": "Returns an integer representing the total number of seconds in the region-wide day cycle."
  },
  "llGetRegionDayOffset": {
    "tooltip": "Returns the number of seconds in a day is offset from midnight in this parcel.",
    "description": "Return the number of seconds added to the current time before calculating the current environmental time for the region. llGetDayOffset returns the value for the current parcel, llGetRegionDayOffset produces the same value for the entire region.\n\n\n Returns an integer",
    "arguments": {},
    "newtooltip": "Returns an integer representing the offset duration (in seconds) added to calculate the current environmental time for the region."
  },
  "llGetRegionFlags": {
    "tooltip": "Returns the region flags (REGION_FLAG_*) for the region the object is in.\\nReturns a bit-field specifying the region flags (REGION_FLAG_*) for the region the object is in.",
    "description": "Returns an integer that is the region flags (REGION_FLAG_*) for the region the object is in.\n\n\n Only a small number of flags are actually used; the rest (shown below in strike-through) are always zero. In particular, it is not possible to detect the status of \"Allow Land Resell\", \"Allow Land Join/Divide\", or \"Block Land Show in Search\"; nor, obviously, it is possible for a script to detect that \"Disable Scripts\" has been set.",
    "arguments": {},
    "newtooltip": "Returns an integer bitfield representing the region flags (REGION_FLAG_*) currently enabled for the region containing the object."
  },
  "llGetRegionFPS": {
    "tooltip": "Returns the mean region frames per second.",
    "description": "Returns a float that is the mean region frames per second.",
    "arguments": {},
    "newtooltip": "Returns a float representing the average region simulator frames per second (FPS)."
  },
  "llGetRegionMoonDirection": {
    "tooltip": "Returns a normalized vector of the direction of the moon in the region.\nReturns the moon's direction on the simulator.",
    "description": "Returns a normalized vector to the current moon position at the location of object containing the script. llGetMoonDirection is the vector to the parcel's moon, llGetRegionMoonDirection is the vector to region's moon. If there is no custom environment set for the current parcel llGetMoonDirection returns the direction to the region's moon. These functions are altitude aware.\n\n\n Returns a vector",
    "arguments": {},
    "newtooltip": "Returns a normalized vector representing the current direction of the region's moon, taking altitude into account."
  },
  "llGetRegionMoonRotation": {
    "tooltip": "Returns the rotation applied to the moon in the region.",
    "description": "Return the rotation applied to the moon for the region at the location of the object containing the script. These function are altitude aware and so will pick up the moon for their current track. llGetRegionMoonRotation returns the rotation applied at the region level, llGetMoonRotation does the same for the parcel. If there is no custom environment applied to parcel llGetMoonRotation returns the same value as llGetRegionMoonRotation.\n\n\n Returns a rotation",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the orientation applied to the moon at the region level, taking altitude track into account."
  },
  "llGetRegionName": {
    "tooltip": "Returns the current region name.",
    "description": "Returns a string that is the current region name",
    "arguments": {},
    "newtooltip": "Returns a string containing the name of the current region."
  },
  "llGetRegionSunDirection": {
    "tooltip": "Returns a normalized vector of the direction of the sun in the region.\nReturns the sun's direction on the simulator.",
    "description": "Returns a normalized vector to the current sun position at the location of object containing the script. llGetSunDirection is the vector to the parcel's sun, llGetRegionSunDirection is the vector to region's sun. If there is no custom environment set for the current parcel llGetSunDirection returns the direction to the region's sun. These functions are altitude aware.\n\n\n Returns a vector",
    "arguments": {},
    "newtooltip": "Returns a normalized vector representing the current direction of the region's sun, taking altitude into account."
  },
  "llGetRegionSunRotation": {
    "tooltip": "Returns the rotation applied to the sun in the region.",
    "description": "Return the rotation applied to the sun for the region at the location of the object containing the script. These functions are altitude aware and so will pick up the sun for their current track. llGetRegionSunRotation returns the rotation applied at the region level, llGetSunRotation does the same for the parcel. If there is no custom environment applied to parcel llGetSunRotation returns the same value as llGetRegionSunRotation.\n\n\n Returns a rotation",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the orientation applied to the sun at the region level, taking altitude track into account."
  },
  "llGetRegionTimeDilation": {
    "tooltip": "Returns the current time dilation as a float between 0.0 (full dilation) and 1.0 (no dilation).\\nReturns the current time dilation as a float between 0.0 and 1.0.",
    "description": "Returns a float that is the current time dilation, the value range is [0.0, 1.0], 0.0 (full dilation) and 1.0 (no dilation).[[1]](#footnote_1)\n\n\n It is used as the ratio between the change of script time to that of real world time.",
    "arguments": {},
    "newtooltip": "Returns a float representing the current physics time dilation of the region, ranging from 0.0 (full dilation / slow) to 1.0 (no dilation / real-world speed)."
  },
  "llGetRegionTimeOfDay": {
    "tooltip": "Returns the time in seconds since environmental midnight for the entire region.",
    "description": "Returns a float that is the time in seconds with subsecond precision since Second Life midnight (per the region-scoped day cycle settings) or region up-time (time since when the region was brought online/rebooted); whichever is smaller. If the region is configured so the sun stays in a constant position, then the returned value is the region up-time.\n\n\n By default (without custom environment settings), Second Life day cycles are 4 hours long (3 hours of light, 1 hour of dark). The sunrise and sunset time varies slowly.",
    "arguments": {},
    "newtooltip": "Returns a float with subsecond precision representing the elapsed seconds since region environmental midnight or region uptime (whichever is smaller). If the region's sun position is fixed, returns region uptime."
  },
  "llGetRenderMaterial": {
    "tooltip": "Returns a string that is the render material on face (the inventory name if it is a material in the prim's inventory, otherwise the key).\\nReturns the render material of a face, if it is found in object inventory, its key otherwise.",
    "description": "Returns a string that is the Material on face",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns a string representing the render material on face (returns the inventory name if it is in the prim's inventory, or its key UUID otherwise)."
  },
  "llGetRootPosition": {
    "tooltip": "Returns the position (in region coordinates) of the root prim of the object which the script is attached to.\\nThis is used to allow a child prim to determine where the root is.",
    "description": "Returns a vector that is the region position of the root object of the object script is attached to",
    "arguments": {},
    "newtooltip": "Returns a vector representing the position (in region coordinates) of the root prim of the linkset containing the script."
  },
  "llGetRootRotation": {
    "tooltip": "Returns the rotation (relative to the region) of the root prim of the object which the script is attached to.\\nGets the global rotation of the root object of the object script is attached to.",
    "description": "Returns a rotation that is the region rotation of the root prim of the object.",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the orientation (relative to the region) of the root prim of the linkset containing the script."
  },
  "llGetRot": {
    "tooltip": "Returns the rotation relative to the region's axes.\nReturns the rotation.",
    "description": "Returns a rotation that is the prim's rotation relative to the region's axes.",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the prim's orientation relative to the region's axes."
  },
  "llGetScale": {
    "tooltip": "Returns the scale of the prim.\nReturns a vector that is the scale (dimensions) of the prim.",
    "description": "Returns a vector that is the scale of the prim.",
    "arguments": {},
    "newtooltip": "Returns a vector representing the physical scale (dimensions in meters) of the prim containing the script."
  },
  "llGetScriptName": {
    "tooltip": "Returns the name of the script that this function is used in.\nReturns the name of this script.",
    "description": "Returns a string that is the name of the script that called this function.",
    "arguments": {},
    "newtooltip": "Returns a string containing the name of the script calling this function."
  },
  "llGetScriptState": {
    "tooltip": "Returns TRUE if the script named is running.\nReturns TRUE if ScriptName is running.",
    "description": "Returns a boolean (an integer) that is TRUE if the script is running.",
    "arguments": {
      "ScriptName": {
        "tooltip": "",
        "newname": "script",
        "description": "a script in the inventory of the prim this script is in",
        "newtooltip": "The name of the script in the prim's inventory."
      }
    },
    "newtooltip": "Returns a boolean integer indicating whether the specified script in the prim's inventory is running (returns TRUE if running, FALSE otherwise)."
  },
  "llGetSimStats": {
    "tooltip": "Returns a float that is the requested statistic.",
    "description": "Returns a float that is the requested statistic.",
    "arguments": {
      "StatType": {
        "tooltip": "Statistic type.",
        "newname": "stat_type",
        "description": "SIM_STAT_* flag",
        "newtooltip": "The SIM_STAT_* flag of the statistic to retrieve."
      }
    },
    "newtooltip": "Returns a float containing the value of the requested region statistic specified by stat_type."
  },
  "llGetSimulatorHostname": {
    "tooltip": "Returns the host-name of the machine which the script is running on.\nFor example, \"sim225.agni.lindenlab.com\".",
    "description": "Returns a string that is the hostname of the machine the script is running on (same as string in viewer Help dialog)",
    "arguments": {},
    "newtooltip": "Returns a string containing the hostname of the server machine running the script (e.g., 'sim225.agni.lindenlab.com')."
  },
  "llGetSPMaxMemory": {
    "tooltip": "Returns the maximum used memory for the current script. Only valid after using PROFILE_SCRIPT_MEMORY. Non-mono scripts always use 16k.\\nReturns the integer of the most bytes used while llScriptProfiler was last active.",
    "description": "Returns the integer of the most bytes used while LlScriptProfiler was last active.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the maximum memory (in bytes) used by the script while the memory profiler was last active (only valid after using PROFILE_SCRIPT_MEMORY)."
  },
  "llGetStartParameter": {
    "tooltip": "Returns an integer that is the script rez parameter.\nIf the object was rezzed by an agent, this function returns 0.",
    "description": "Returns an integer that is the script start/rez parameter.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the start/rez parameter passed to the object on creation (returns 0 if rezzed by an agent)."
  },
  "llGetStartString": {
    "tooltip": "Returns a string that is the value passed to llRezObjectWithParams with REZ_PARAM_STRING.\\nIf the object was rezzed by an agent, this function returns an empty string.",
    "description": "Returns a string that was passed to the object's root prim on rez with llRezObjectWithParams.",
    "arguments": {},
    "newtooltip": "Returns the initialization string passed to the object's root prim on rez with llRezObjectWithParams (via REZ_PARAM_STRING; returns an empty string if rezzed by an agent)."
  },
  "llGetStaticPath": {
    "tooltip": "",
    "description": "Returns a list of position vectors indicating pathfinding waypoints between positions at start and end, for a character of a given radius. The waypoints this function returns are for the 'static' nav mesh, meaning that objects set to \"movable obstacle\" or \"movable phantom\" are ignored.\n\n\n This function can be used from attachments and other non-character objects. It can also be used in any region, even if dynamic pathfinding is disabled.",
    "arguments": {
      "Start": {
        "tooltip": "Starting position.",
        "newname": "start",
        "description": "Starting position",
        "newtooltip": "The starting position vector."
      },
      "End": {
        "tooltip": "Ending position.",
        "newname": "end",
        "description": "End position",
        "newtooltip": "The target end position vector."
      },
      "Radius": {
        "tooltip": "Radius of the character that the path is for, between 0.125m and 5.0m.",
        "newname": "radius",
        "description": "Radius of the character that we're creating a path for, between 0.125m and 5.0m",
        "newtooltip": "The radius of the character path, between 0.125m and 5.0m."
      },
      "Parameters": {
        "tooltip": "Currently only accepts the parameter CHARACTER_TYPE; the options are identical to those used for llCreateCharacter. The default value is CHARACTER_TYPE_NONE.",
        "newname": "params",
        "description": "Only takes the parameter CHARACTER_TYPE; the options are identical to those used for llCreateCharacter. The default value is CHARACTER_TYPE_NONE",
        "newtooltip": "A list specifying the CHARACTER_TYPE parameter (defaults to CHARACTER_TYPE_NONE)."
      }
    },
    "newtooltip": "Returns a list of position vectors representing pathfinding waypoints between start and end on the static navmesh for a character of the specified radius. Ignores movable obstacles and can be used in any region regardless of dynamic pathfinding status."
  },
  "llGetStatus": {
    "tooltip": "Returns boolean value of the specified status (e.g. STATUS_PHANTOM) of the object the script is attached to.",
    "description": "Returns a boolean (an integer) equal to the status of the object.",
    "arguments": {
      "StatusFlag": {
        "tooltip": "A STATUS_* flag",
        "newname": "status",
        "description": "A single STATUS_* flag",
        "newtooltip": "The single STATUS_* flag to check."
      }
    },
    "newtooltip": "Returns a boolean integer indicating whether the specified status flag status is enabled for the object."
  },
  "llGetSubString": {
    "tooltip": "Returns a sub-string from String, in a range specified by the Start and End indices (inclusive).\\nUsing negative numbers for Start and/or End causes the index to count backwards from the length of the string, so 0, -1 would capture the entire string.\\nIf Start is greater than End, the sub string is the exclusion of the entries.",
    "description": "Returns a string that is the substring of src from start to end, leaving the original string intact.",
    "arguments": {
      "String": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source string to slice."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The zero-based start index (inclusive)."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The zero-based end index (inclusive)."
      }
    },
    "newtooltip": "Returns a copy of the substring from src within the inclusive range specified by the start and end indices. Negative indices count backward from the end. If start is greater than end, the substring is the excluded range."
  },
  "llGetSunDirection": {
    "tooltip": "Returns a normalized vector of the direction of the sun in the parcel.\nReturns the sun's direction on the simulator in the parcel.",
    "description": "Returns a normalized vector to the current sun position at the location of object containing the script. llGetSunDirection is the vector to the parcel's sun, llGetRegionSunDirection is the vector to region's sun. If there is no custom environment set for the current parcel llGetSunDirection returns the direction to the region's sun. These functions are altitude aware.\n\n\n Returns a vector",
    "arguments": {},
    "newtooltip": "Returns a normalized vector representing the current direction of the parcel's sun, taking altitude into account. Falls back to the region's sun direction if no custom parcel environment is set."
  },
  "llGetSunRotation": {
    "tooltip": "Returns the rotation applied to the sun in the parcel.",
    "description": "Return the rotation applied to the sun for the parcel at the location of the object containing the script. These function are altitude aware and so will pick up the sun for their current track. llGetRegionSunRotation returns the rotation applied at the region level, llGetSunRotation does the same for the parcel. If there is no custom environment applied to parcel llGetSunRotation returns the same value as llGetRegionSunRotation.\n\n\n Returns a rotation",
    "arguments": {},
    "newtooltip": "Returns a rotation representing the orientation applied to the sun on the current parcel and altitude track. Falls back to the region's sun rotation if no custom parcel environment is set."
  },
  "llGetTexture": {
    "tooltip": "Returns a string that is the texture on face (the inventory name if it is a texture in the prim's inventory, otherwise the key).\\nReturns the texture of a face, if it is found in object inventory, its key otherwise.",
    "description": "Returns a string that is the Blinn-Phong diffuse texture on face",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns a string representing the Blinn-Phong diffuse texture on face (returns the inventory name if it is a texture in the prim's inventory, or its key UUID otherwise)."
  },
  "llGetTextureOffset": {
    "tooltip": "Returns the texture offset of face in the x and y components of a vector.",
    "description": "Returns a vector that is the texture offset of face in the x (\"U\", horizontal) and y (\"V\", vertical) components. The z component is unused.",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns a vector containing the texture offsets of face in the X (horizontal U) and Y (vertical V) components (Z is unused)."
  },
  "llGetTextureRot": {
    "tooltip": "Returns the texture rotation of side.",
    "description": "Returns a float that is the texture rotation, expressed as an angle, on face",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns a float representing the texture rotation angle (in radians) on face."
  },
  "llGetTextureScale": {
    "tooltip": "Returns the texture scale of side in the x and y components of a vector.\nReturns the texture scale of a side in the x and y components of a vector.",
    "description": "Returns a vector that is the texture scale on face (only the x and y components are used).",
    "arguments": {
      "Face": {
        "tooltip": "",
        "newname": "face",
        "description": "face number or ALL_SIDES",
        "newtooltip": "The face number or ALL_SIDES."
      }
    },
    "newtooltip": "Returns a vector containing the texture scales of face in the X and Y components (Z is unused)."
  },
  "llGetTime": {
    "tooltip": "Returns the time in seconds since the last region reset, script reset, or call to either llResetTime or llGetAndResetTime. Has a resolution of 0.022s (1 server frame), and is 6-11x faster to look up than lua's os.clock",
    "description": "Returns a float that is script time in seconds with subsecond precision since the script started, was last reset, or call to either llResetTime or llGetAndResetTime.",
    "arguments": {},
    "newtooltip": "Returns a float representing the elapsed script time in seconds with subsecond precision (since the script started, was reset, or since the last call to llResetTime or llGetAndResetTime)."
  },
  "llGetTimeOfDay": {
    "tooltip": "Returns the time in seconds since environmental midnight on the parcel.",
    "description": "Returns a float that is the time in seconds with subsecond precision since Second Life midnight (per the parcel-scoped day cycle settings) or region up-time (time since when the region was brought online/rebooted); whichever is smaller. If the parcel is configured so the sun stays in a constant position, then the returned value is the region up-time.\n\n\n By default (without custom environment settings), Second Life day cycles are 4 hours long (3 hours of light, 1 hour of dark). The sunrise and sunset time varies slowly.",
    "arguments": {},
    "newtooltip": "Returns a float with subsecond precision representing the elapsed seconds since parcel environmental midnight or region uptime (whichever is smaller). If the parcel's sun position is fixed, returns region uptime."
  },
  "llGetTimestamp": {
    "tooltip": "'Returns a time-stamp (UTC time zone) in the format: YYYY-MM-DDThh:mm:ss.ff..fZ. Almost equivilant to os.date(\"%Y-%m-%dT%XZ\") in lua, except for the milliseconds'",
    "description": "Returns a string that is the current date and time in the UTC time zone in the [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;ISO 8601 format '\"YYYY-MM-DDThh:mm:ss.ff..fZ\"'\n\n\n Appears to be accurate to milliseconds.",
    "arguments": {},
    "newtooltip": "Returns a string containing the current date and time in the UTC time zone formatted as an ISO 8601 timestamp ('YYYY-MM-DDThh:mm:ss.ff..fZ')."
  },
  "llGetTorque": {
    "tooltip": "Returns the torque (if the script is physical).\nReturns a vector that is the torque (if the script is physical).",
    "description": "Returns a vector that is the torque (if the script is physical)",
    "arguments": {},
    "newtooltip": "Returns a vector representing the physical torque force currently acting on the object (if the object is physical)."
  },
  "llGetUnixTime": {
    "tooltip": "Returns the number of seconds elapsed since 00:00 hours, Jan 1, 1970 UTC from the system clock.",
    "description": "Returns an integer that is the number of seconds elapsed since 00:00 hours, Jan 1, 1970 [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;UTC from the system clock (Unix time).",
    "arguments": {},
    "newtooltip": "Returns an integer representing the current Unix timestamp (the number of seconds elapsed since 00:00:00 Jan 1, 1970 UTC)."
  },
  "llGetUsedMemory": {
    "tooltip": "Returns the current used memory for the current script. Non-mono scripts always use 16K.\\nReturns the integer of the number of bytes of memory currently in use by the script. Non-mono scripts always use 16K.",
    "description": "Returns the integer of the number of bytes of memory currently in use by the script.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the total number of bytes of memory currently used by the script (non-Mono scripts always return 16,384 bytes)."
  },
  "llGetUsername": {
    "tooltip": "Returns the username of an avatar, if the avatar is connected to the current region, or if the name has been cached. Otherwise, returns an empty string. Use llRequestUsername if the avatar may be absent from the region.",
    "description": "Returns a string that is the unique username of the avatar specified by id.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "id",
        "description": "avatar UUID that is in the same region or is otherwise known to the region",
        "newtooltip": "The UUID of the avatar in the same region or otherwise known to the region."
      }
    },
    "newtooltip": "Returns a string representing the unique username of the avatar specified by id if they are connected to the region or cached; returns an empty string otherwise (use llRequestUsername if the avatar is absent)."
  },
  "llGetVel": {
    "tooltip": "Returns the velocity of the object.\nReturns a vector that is the velocity of the object.",
    "description": "Returns a vector that is the velocity of the object.\n\n\n Speed is the magnitude of the velocity. Speed is measured in meter per second.\n\n\n Velocity reported is relative to the global coordinate frame (the object rotation has no affect on this functions output).\n\n\n For physic objects , velocity is the velocity of its center of mass llGetCenterOfMass . ( When the object has some torque and has not force , position of the object moves ( it turns ) , but its center of mass is unchanged , so the velocity is null )",
    "arguments": {},
    "newtooltip": "Returns a vector representing the velocity of the object (in meters per second) relative to the global region coordinates. For physical objects, returns the velocity of its center of mass."
  },
  "llGetVisualParams": {
    "tooltip": "Returns a list of the current value for each requested visual parameter.",
    "description": "Returns a list of the details for agentid requested in params.",
    "arguments": {
      "ID": {
        "tooltip": "Avatar UUID in the same region.",
        "newname": "agentid",
        "description": "Avatar ID in the same region.",
        "newtooltip": "The UUID of the avatar in the same region."
      },
      "Parameters": {
        "tooltip": "List of visual parameter IDs.",
        "newname": "params",
        "description": "List of visual param ids or names.",
        "newtooltip": "A list of visual parameter IDs or names to retrieve values for."
      }
    },
    "newtooltip": "Returns a list containing the values of the visual parameters requested in params for the agent specified by agentid."
  },
  "llGetWallclock": {
    "tooltip": "Returns the time in seconds since midnight California Pacific time (PST/PDT).\nReturns the time in seconds since simulator's time-zone midnight (Pacific Time).",
    "description": "Returns a float that is the time in seconds since midnight Pacific time (PST/PDT), truncated to whole seconds. That is the same as the time of day in SLT expressed as seconds.\n\n\n For GMT use llGetGMTclock",
    "arguments": {},
    "newtooltip": "Returns a float representing the time in seconds since midnight Pacific Time (PST/PDT), which is equivalent to Second Life Time (SLT) truncated to whole seconds."
  },
  "llGiveAgentInventory": {
    "tooltip": "Give InventoryItems to the specified agent as a new folder of items, as permitted by the permissions system. The target must be an agent.",
    "description": "Gives inventory items to agent, creating a new folder to put them in.\n\n\n Returns an integer",
    "arguments": {
      "AgentID": {
        "tooltip": "An agent in the region.",
        "newname": "agent",
        "description": "agent to receive inventory offer.",
        "newtooltip": "The UUID of the receiving agent in the region."
      },
      "FolderName": {
        "tooltip": "Folder name to give to the agent.",
        "newname": "folder",
        "description": "destination folder name to use.",
        "newtooltip": "The name of the destination folder to be created in the agent's inventory."
      },
      "InventoryItems": {
        "tooltip": "Inventory items to give to the agent.",
        "newname": "inventory",
        "description": "list of inventory items to give to the agent",
        "newtooltip": "A list of inventory items to transfer."
      },
      "Options": {
        "tooltip": "A list of option for inventory transfer.",
        "newname": "options",
        "description": "list of options for inventory transfer.",
        "newtooltip": "A list of options to configure the inventory transfer."
      }
    },
    "newtooltip": "Gives the specified inventory items to the agent as a new folder named folder, as permitted by the permissions system. Customizes the transfer using options."
  },
  "llGiveInventory": {
    "tooltip": "Give InventoryItem to destination represented by TargetID, as permitted by the permissions system.\\nTargetID may be any agent or an object in the same region.",
    "description": "Give inventory to destination.",
    "arguments": {
      "TargetID": {
        "tooltip": "",
        "newname": "destination",
        "description": "avatar or prim UUID",
        "newtooltip": "The UUID of the destination avatar or prim."
      },
      "InventoryItem": {
        "tooltip": "",
        "newname": "inventory",
        "description": "an item in the inventory of the prim this script is in",
        "newtooltip": "The name of the item in the prim's inventory."
      }
    },
    "newtooltip": "Gives the specified inventory item to the destination, as permitted by the permissions system. The destination can be any agent, or an object located in the same region."
  },
  "llGiveInventoryList": {
    "tooltip": "Give InventoryItems to destination (represented by TargetID) as a new folder of items, as permitted by the permissions system.\\nTargetID may be any agent or an object in the same region. If TargetID is an object, the items are passed directly to the object inventory (no folder is created).",
    "description": "Gives inventory items to target, creating a new folder to put them in.",
    "arguments": {
      "TargetID": {
        "tooltip": "",
        "newname": "target",
        "description": "avatar or prim UUID that is in the same region",
        "newtooltip": "The UUID of the target avatar or prim in the same region."
      },
      "FolderName": {
        "tooltip": "",
        "newname": "folder",
        "description": "folder name to use",
        "newtooltip": "The name of the destination folder to be created (ignored if the target is an object)."
      },
      "InventoryItems": {
        "tooltip": "",
        "newname": "inventory",
        "description": "a list of items in the inventory of the prim this script is in",
        "newtooltip": "A list of names representing items in the prim's inventory."
      }
    },
    "newtooltip": "Gives the list of inventory items to target as a new folder named folder. If target is an object, the items are passed directly into its inventory and no folder is created. The target must be an agent or an object in the same region."
  },
  "llGiveMoney": {
    "tooltip": "Transfers Amount of L$ from script owner to AvatarID.\nThis call will silently fail if PERMISSION_DEBIT has not been granted.",
    "description": "Transfer amount of L$ money from script owner to destination avatar.\n\n\n Returns an integer that is always zero. In contrast llTransferLindenDollars returns a key that can be used to match the function call to the resulting transaction_result event and the transaction history.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "destination",
        "description": "avatar UUID",
        "newtooltip": "The UUID of the destination avatar."
      },
      "Amount": {
        "tooltip": "",
        "newname": "amount",
        "description": "number of L$, must be greater than zero, (amount > 0)",
        "newtooltip": "The number of L$ to transfer (must be greater than 0)."
      }
    },
    "newtooltip": "Transfers the specified amount of L$ from the script owner to the destination avatar. Silently fails if the PERMISSION_DEBIT permission has not been granted. Returns 0 (use llTransferLindenDollars to match transactions to transaction_result events)."
  },
  "llGodLikeRezObject": {
    "tooltip": "Rez directly off of a UUID if owner has god-bit set.",
    "description": "Rez directly off of UUID if owner has god-bit set.",
    "arguments": {
      "InventoryItemID": {
        "tooltip": "",
        "newname": "inventory",
        "newtooltip": "The asset UUID of the object to rez."
      },
      "Position": {
        "tooltip": "",
        "newname": "pos",
        "description": "position in region coordinates",
        "newtooltip": "The position vector in region coordinates where the object will be rezzed."
      }
    },
    "newtooltip": "Rezzes an object directly from a UUID specified by inventory at the position pos, provided the owner has the god-bit set."
  },
  "llGround": {
    "tooltip": "Returns the ground height at the object position + offset.\nReturns the ground height at the object's position + Offset.",
    "description": "Returns a float that is the ground height directly below the prim position + offset",
    "arguments": {
      "Offset": {
        "tooltip": "",
        "newname": "offset",
        "description": "offset relative to the prim's position and expressed in local coordinates",
        "newtooltip": "The offset relative to the prim's position, expressed in local coordinates."
      }
    },
    "newtooltip": "Returns a float representing the ground height directly below the prim's position offset by the vector offset."
  },
  "llGroundContour": {
    "tooltip": "Returns the ground contour direction below the object position + Offset.\nReturns the ground contour at the object's position + Offset.",
    "description": "Returns a vector that is the ground contour direction below the prim position + offset. The contour is the direction of a contour line at that point, that is the direction in which there is no change in elevation.",
    "arguments": {
      "Offset": {
        "tooltip": "",
        "newname": "offset",
        "description": "offset relative to the prim's position and expressed in local coordinates",
        "newtooltip": "The offset relative to the prim's position, expressed in local coordinates."
      }
    },
    "newtooltip": "Returns a vector representing the ground contour direction (the direction with no change in elevation) directly below the prim's position offset by the vector offset."
  },
  "llGroundNormal": {
    "tooltip": "Returns the ground normal below the object position + offset.\nReturns the ground contour at the object's position + Offset.",
    "description": "Returns a vector that is the ground [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;normal) from the current position + offset.",
    "arguments": {
      "Offset": {
        "tooltip": "",
        "newname": "offset",
        "description": "offset relative to the prim's position and expressed in local coordinates",
        "newtooltip": "The offset relative to the prim's position, expressed in local coordinates."
      }
    },
    "newtooltip": "Returns a vector representing the ground surface normal vector directly below the current position offset by the vector offset."
  },
  "llGroundRepel": {
    "tooltip": "Critically damps to height if within height * 0.5 of level (either above ground level or above the higher of land and water if water == TRUE).\\\\nCritically damps to fHeight if within fHeight * 0.5 of ground or water level.\\\\n\\n The height is above ground level if iWater is FALSE or above the higher of land and water if iWater is TRUE.\\\\n\\n Do not use with vehicles. Only works in physics-enabled objects.",
    "description": "Critically damps to height if within '**height** * 0.5' of ground or water level (which ever is higher).",
    "arguments": {
      "Height": {
        "tooltip": "Distance above the ground.",
        "newname": "height",
        "description": "Distance above the ground",
        "newtooltip": "The target distance in meters above the ground or water."
      },
      "Water": {
        "tooltip": "Boolean, if TRUE then hover above water too.",
        "newname": "water",
        "description": "boolean, if TRUE then hover above water too.",
        "newtooltip": "Boolean. If TRUE, damp relative to the higher of land and water; if FALSE, damp relative to land only."
      },
      "Tau": {
        "tooltip": "Seconds to critically damp in.",
        "newname": "tau",
        "description": "seconds to critically damp in",
        "newtooltip": "The timescale in seconds to critically damp the movement."
      }
    },
    "newtooltip": "Critically damps the object's vertical motion to height (using critical damping timescale tau) if it is within height * 0.5 of the terrain (or water level if water is TRUE). Only works on physics-enabled objects; do not use with vehicles."
  },
  "llGroundSlope": {
    "tooltip": "Returns the ground slope below the object position + Offset.\nReturns the ground slope at the object position + Offset.",
    "description": "Returns a vector that is the ground slope below the object position + offset",
    "arguments": {
      "Offset": {
        "tooltip": "",
        "newname": "offset",
        "description": "offset relative to the prim's position and expressed in local coordinates",
        "newtooltip": "The offset relative to the prim's position, expressed in local coordinates."
      }
    },
    "newtooltip": "Returns a vector representing the ground slope directly below the prim's position offset by the vector offset."
  },
  "llHash": {
    "tooltip": "Calculates the 32bit hash value for the provided string.",
    "description": "Returns a 32bit hash for the provided string. Returns 0 if the input string is empty.\n\n\n Returns an integer",
    "arguments": {
      "value": {
        "tooltip": "",
        "newname": "val",
        "description": "String to hash.",
        "newtooltip": "The string to hash."
      }
    },
    "newtooltip": "Returns an integer representing the 32-bit hash value of the string val (returns 0 if the string is empty)."
  },
  "llHMAC": {
    "tooltip": "Returns the base64-encoded hashed message authentication code (HMAC), of Message using PEM-formatted Key and digest Algorithm (md5, sha1, sha224, sha256, sha384, sha512).",
    "description": "Returns a string that is the [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;Base64-encoded [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;HMAC hash of msg when using hash algorithm algorithm and secret key private_key.",
    "arguments": {
      "Key": {
        "tooltip": "The PEM-formatted key for the hash digest.",
        "newname": "private_key",
        "newtooltip": "The PEM-formatted secret key to use for the HMAC hash."
      },
      "Message": {
        "tooltip": "The message to be hashed.",
        "newname": "msg",
        "newtooltip": "The message string to be hashed."
      },
      "Algorithm": {
        "tooltip": "The digest algorithm: md5, sha1, sha224, sha256, sha384, sha512.",
        "newname": "algorithm",
        "newtooltip": "The cryptographic digest algorithm to use."
      }
    },
    "newtooltip": "Returns a Base64-encoded HMAC hash of msg using the secret key private_key and the specified digest algorithm (md5, sha1, sha224, sha256, sha384, or sha512)."
  },
  "llHTTPRequest": {
    "tooltip": "Sends an HTTP request to the specified URL with the Body of the request and Parameters.\\nReturns a key that is a handle identifying the HTTP request made.",
    "description": "Sends an HTTP request to the specified URL with the body of the request and parameters. When the response is received, a http_response event is raised.\n\n\n Returns a handle (a key) identifying the HTTP request made.",
    "arguments": {
      "URL": {
        "tooltip": "A valid HTTP/HTTPS URL.",
        "newname": "url",
        "description": "A valid HTTP/HTTPS URL.",
        "newtooltip": "The destination HTTP or HTTPS URL."
      },
      "Parameters": {
        "tooltip": "Configuration parameters, specified as HTTP_* flag-value pairs.",
        "newname": "parameters",
        "description": "configuration parameters, specified as HTTP_* flag-value pairs\n[ parameter1, value1, parameter2, value2, . . . parameterN, valueN]",
        "newtooltip": "A list of HTTP_* configuration flags and value pairs."
      },
      "Body": {
        "tooltip": "Contents of the request.",
        "newname": "body",
        "description": "Contents of the request.",
        "newtooltip": "The string contents of the request body."
      }
    },
    "newtooltip": "Sends an HTTP request to the specified url containing body and configured via parameters. Raises an http_response event and returns a key query handle identifying the request."
  },
  "llHTTPResponse": {
    "tooltip": "Responds to an incoming HTTP request which was triggerd by an http_request event within the script. HTTPRequestID specifies the request to respond to (this ID is supplied in the http_request event handler). Status and Body specify the status code and message to respond with.",
    "description": "Responds to request_id with status and body.",
    "arguments": {
      "HTTPRequestID": {
        "tooltip": "A valid HTTP request key.",
        "newname": "request_id",
        "description": "A valid HTTP request key.",
        "newtooltip": "The unique key identifying the incoming HTTP request."
      },
      "Status": {
        "tooltip": "HTTP Status (200, 400, 404, etc.).",
        "newname": "status",
        "description": "[](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;HTTP Status (200, 400, 404, etc)",
        "newtooltip": "The integer HTTP status code (such as 200, 400, or 404) to respond with."
      },
      "Body": {
        "tooltip": "Contents of the response.",
        "newname": "body",
        "description": "Contents of the response.",
        "newtooltip": "The string contents of the response body."
      }
    },
    "newtooltip": "Responds to the incoming HTTP request identified by request_id with the HTTP status code status and the payload body."
  },
  "llInsertString": {
    "tooltip": "Inserts SourceVariable into TargetVariable at Position, and returns the result.\\nInserts SourceVariable into TargetVariable at Position and returns the result. Note this does not alter TargetVariable.",
    "description": "Returns the string dst with src inserted starting at pos.",
    "arguments": {
      "TargetVariable": {
        "tooltip": "",
        "newname": "dst",
        "description": "destination of insertion",
        "newtooltip": "The target destination string."
      },
      "Position": {
        "tooltip": "",
        "newname": "pos",
        "description": "position index for insert, first is 0",
        "newtooltip": "The zero-based position index where insertion starts."
      },
      "SourceVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "source string to be inserted",
        "newtooltip": "The source string to insert."
      }
    },
    "newtooltip": "Returns a new string representing dst with src inserted starting at the zero-based index pos. Note that this operation does not modify dst itself."
  },
  "llInstantMessage": {
    "tooltip": "IMs Text to the user identified.\nSend Text to the user as an instant message.",
    "description": "Sends an Instant Message specified in the string message to the user specified by user.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "user",
        "description": "avatar UUID",
        "newtooltip": "The UUID of the destination user."
      },
      "Text": {
        "tooltip": "",
        "newname": "message",
        "description": "message to be transmitted",
        "newtooltip": "The text message string to send."
      }
    },
    "newtooltip": "Sends an instant message containing message to the user identified by their key."
  },
  "llIntegerToBase64": {
    "tooltip": "Returns a string that is a Base64 big endian encode of Value.\nEncodes the Value as an 8-character Base64 string.",
    "description": "Returns a string that is a Base64 big endian encode of number",
    "arguments": {
      "Value": {
        "tooltip": "",
        "newname": "number",
        "newtooltip": "The integer number to encode."
      }
    },
    "newtooltip": "Returns an 8-character Base64 string representing the big-endian encoded value of number."
  },
  "llIsFriend": {
    "tooltip": "Returns TRUE if avatar ID is a friend of the script owner.",
    "description": "Returns a boolean (an integer) that is TRUE if agent_id and the owner of the prim the script is in are friends, otherwise FALSE.",
    "arguments": {
      "agent_id": {
        "tooltip": "Agent ID of another agent in the region.",
        "newname": "agent_id",
        "newtooltip": "The UUID of the agent to check."
      }
    },
    "newtooltip": "Returns TRUE if agent_id and the owner of the script are friends, and FALSE otherwise."
  },
  "llIsLinkGLTFMaterial": {
    "tooltip": "Checks the face for a PBR render material.",
    "description": "Returns a boolean (an integer) that is TRUE if the material is PBR and FALSE if it is Blinn-Phong diffuse texture on face",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/link\" target=\"_blank\">link</a>": {
        "tooltip": "Link number to check.",
        "newname": "link",
        "description": "Link to inspect for PBR, may be LINK_THIS or LINK_ROOT",
        "newtooltip": "The link number (or LINK_* flag) of the prim to inspect."
      },
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/face\" target=\"_blank\">face</a>": {
        "tooltip": "Side to check for a PBR material. Use ALL_SIDES to check for all.",
        "newname": "face",
        "description": "Face to examine for PBR, or ALL_SIDES",
        "newtooltip": "The face number (or ALL_SIDES) of the prim to inspect."
      }
    },
    "newtooltip": "Checks the specified face on the linked prim link. Returns TRUE if the face material is a PBR render material, or FALSE if it uses Blinn-Phong diffuse textures."
  },
  "llJson2List": {
    "tooltip": "Converts the top level of the JSON string to a list.",
    "description": "This function takes a string representing JSON, and returns a list of the top level.\n\n\n Returns a list made by parsing src, a string representing json.",
    "arguments": {
      "JSON": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The JSON string to parse."
      }
    },
    "newtooltip": "Parses the JSON string src and returns a list representing its top-level elements."
  },
  "llJsonGetValue": {
    "tooltip": "Gets the value indicated by Specifiers from the JSON string.",
    "description": "Gets the value indicated by specifiers from the json string.\n\n\n Returns a string made by parsing json, a string representing json and traversing as specified by specifiers.",
    "arguments": {
      "JSON": {
        "tooltip": "",
        "newname": "json",
        "newtooltip": "The JSON string to query."
      },
      "Specifiers": {
        "tooltip": "",
        "newname": "specifiers",
        "newtooltip": "A list of key names or array indices specifying the path to the desired value."
      }
    },
    "newtooltip": "Parses the JSON string json and returns the value found by traversing the specified path of specifiers as a string."
  },
  "llJsonSetValue": {
    "tooltip": "Returns a new JSON string that is the JSON given with the Value indicated by Specifiers set to Value.",
    "description": "Returns, if successful, a new JSON text string which is json with the value indicated by the specifiers list set to value.\n\n\n If unsuccessful (usually because of specifying an out of bounds array index) it returns JSON_INVALID.\n\n\n An \"out of bounds array index\" is defined to be any Integer specifiers greater than the length of an existing array at that level within the Json text or greater than 0 (zero) at a level an array doesn't exist.\n\n\n A special specifiers, JSON_APPEND, is accepted which appends the value to the end of the array at the specifiers level. Care should be taken- if that level is not an array, the existing Value there will be overwritten and replaced with an array containing value at it's first (0) index.\n\n\n Contrary to lists and strings, negative indexing of Json arrays is not supported.\n\n\n If an existing \"Key\" is specifiers at that level, its Value will be overwritten by value unless value is the magic value JSON_DELETE. If a value does not exist at specifiers, a new Key:Value pair will be formed within the Json object.\n\n\n To delete an existing value at specifiers, use JSON_DELETE as the value. Note it will not prune empty objects or arrays at higher levels.\n\n\n If value is JSON_TRUE, JSON_FALSE or JSON_NULL, the Value set will be the bare words 'true', 'false' or 'null', respectively, at the specifiers location within json.\n\n\n Returns a string",
    "arguments": {
      "JSON": {
        "tooltip": "",
        "newname": "json",
        "description": "source JSON data",
        "newtooltip": "The source JSON string to modify."
      },
      "Specifiers": {
        "tooltip": "",
        "newname": "specifiers",
        "description": "location of the of the value to be added, updated or deleted.",
        "newtooltip": "A list of key names or array indices specifying the path to add, update, or delete."
      },
      "Value": {
        "tooltip": "",
        "newname": "value",
        "description": "new value or JSON_DELETE flag.",
        "newtooltip": "The new value to set, or the JSON_DELETE constant to delete the targeted element."
      }
    },
    "newtooltip": "Returns a new JSON string representing json with the target located at specifiers set to value. Supports JSON_APPEND to append elements. Writing JSON_DELETE deletes the target. Overwriting array bounds or setting non-array levels with array indices returns JSON_INVALID."
  },
  "llJsonValueType": {
    "tooltip": "Returns the type constant (JSON_*) for the value in JSON indicated by Specifiers.",
    "description": "Gets the JSON type for the value in json at the location specifiers.\n\n\n Returns the string specifying the type of the value at specifiers in json.",
    "arguments": {
      "JSON": {
        "tooltip": "",
        "newname": "json",
        "description": "A string serialization of a json object.",
        "newtooltip": "The JSON string containing the value to query."
      },
      "Specifiers": {
        "tooltip": "",
        "newname": "specifiers",
        "description": "A path to a value in the json parameter.",
        "newtooltip": "A list of key names or array indices specifying the path to the value."
      }
    },
    "newtooltip": "Parses the JSON string json and returns the JSON type constant (JSON_*) representing the value found at specifiers."
  },
  "llKey2Name": {
    "tooltip": "Returns the name of the prim or avatar specified by ID. The ID must be a valid rezzed prim or avatar key in the current simulator, otherwise an empty string is returned.\\nFor avatars, the returned name is the legacy name",
    "description": "Returns a string that is the legacy name of the prim or avatar specified by id.",
    "arguments": {
      "ID": {
        "tooltip": "Avatar or rezzed prim UUID.",
        "newname": "id",
        "description": "avatar or prim UUID that is in the same region",
        "newtooltip": "The UUID of the target avatar or prim in the same region."
      }
    },
    "newtooltip": "Returns a string containing the name of the prim or avatar specified by id. The target must be a valid, rezzed entity in the current region, otherwise an empty string is returned. Avatars return their legacy name."
  },
  "llKeyCountKeyValue": {
    "tooltip": "Starts an asychronous transaction the request the number of keys in the data store. The dataserver callback will be executed with the key returned from this call and a string describing the result. The result is commma-delimited list. The first item is an integer specifying if the transaction succeeded (1) or not (0). In the failure case, the second item will be an integer corresponding to one of the XP_ERROR_... constants. In the success case the second item will the the number of keys in the system.\\n",
    "description": "Start an asynchronous transaction to request the number of keys with the script's Experience.\n\n\n Returns a handle (a key) that can be used to identify the corresponding dataserver event to determine if this command succeeded or failed and the results.",
    "arguments": {},
    "newtooltip": "Starts an asynchronous transaction requesting the total count of keys in the experience data store. Returns a key query handle for the dataserver event."
  },
  "llKeysKeyValue": {
    "tooltip": "Starts an asychronous transaction the request a number of keys from the data store. The dataserver callback will be executed with the key returned from this call and a string describing the result. The result is commma-delimited list. The first item is an integer specifying if the transaction succeeded (1) or not (0). In the failure case, the second item will be an integer corresponding to one of the XP_ERROR_... constants. The error XP_ERROR_KEY_NOT_FOUND is returned if First is greater than or equal to the number of keys in the data store. In the success case the subsequent items will be the keys requested. The number of keys returned may be less than requested if the return value is too large or if there is not enough keys remaining. The order keys are returned is not guaranteed but is stable between subsequent calls as long as no keys are added or removed. Because the keys are returned in a comma-delimited list it is not recommended to use commas in key names if this function is used.\\n",
    "description": "Start an asynchronous transaction to request a number of keys from the script's Experience.\n\n\n Returns a handle (a key) that can be used to identify the corresponding dataserver event to determine if this command succeeded or failed.",
    "arguments": {
      "First": {
        "tooltip": "Index of the first key to return.",
        "newname": "first",
        "description": "Zero-based index of the first key to retrieve",
        "newtooltip": "The zero-based start index of the keys to retrieve."
      },
      "Count": {
        "tooltip": "The number of keys to return.",
        "newname": "count",
        "description": "Number of keys to retriever",
        "newtooltip": "The number of keys to retrieve."
      }
    },
    "newtooltip": "Starts an asynchronous transaction to retrieve count keys from the experience data store starting at the zero-based index first. Returns a key query handle for the dataserver event. Fails with XP_ERROR_KEY_NOT_FOUND if out of bounds."
  },
  "llLinear2sRGB": {
    "tooltip": "Converts a color from the linear colorspace to sRGB.",
    "description": "Returns a vector Transforms a color specified in linear RGB colorspace into the sRGB colorspace.",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/color\" target=\"_blank\">color</a>": {
        "tooltip": "A color in the linear colorspace.",
        "newname": "color",
        "description": "Color in the linear color space.",
        "newtooltip": "The RGB color vector in linear space to convert."
      }
    },
    "newtooltip": "Returns a vector representing the conversion of color from the linear RGB colorspace into the sRGB colorspace."
  },
  "llLinkAdjustSoundVolume": {
    "tooltip": "Adjusts the volume (0.0 - 1.0) of the currently playing sound attached to the link.\\nThis function has no effect on sounds started with llTriggerSound.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": "volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      },
      "Volume": {
        "tooltip": "The volume to set.",
        "newname": ""
      }
    },
    "newtooltip": "Adjusts the volume of the currently playing sound attached to the linked prim link (has no effect on sounds started with llTriggerSound)."
  },
  "llLinkParticleSystem": {
    "tooltip": "Creates a particle system in prim LinkNumber based on Rules. An empty list removes a particle system from object.\\nList format is [ rule-1, data-1, rule-2, data-2 ... rule-n, data-n ].\\nThis is identical to llParticleSystem except that it applies to a specified linked prim and not just the prim the script is in.",
    "description": "Defines a particle system for the containing prim based on a list of rules.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": "rules",
        "description": "Particle system rules list in the format [ rule1, data1, rule2, data2 . . . rulen, datan ]",
        "newtooltip": "A list of particle system rules and data pairs [rule1, data1, ...]."
      },
      "Rules": {
        "tooltip": "Particle system rules list in the format [ rule1, data1, rule2, data2 . . . ruleN, dataN ]",
        "newname": ""
      }
    },
    "newtooltip": "Creates or updates a particle system on the linked prim link based on the list of rules. An empty list removes the particle system."
  },
  "llLinkPlaySound": {
    "tooltip": "Plays Sound, once or looping, at Volume (0.0 - 1.0). The sound may be attached to the link or triggered at its location.\\nOnly one sound may be attached to an object at a time, and attaching a new sound or calling llStopSound will stop the previously attached sound.",
    "description": "Plays attached sound once at volume",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      },
      "Sound": {
        "tooltip": "",
        "newname": "sound",
        "description": "a sound in the inventory of the prim this script is in&#32;or a UUID&#32;of a sound",
        "newtooltip": "The name of a sound in the prim's inventory, or a UUID."
      },
      "Volume": {
        "tooltip": "",
        "newname": "volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      },
      "Flags": {
        "tooltip": "",
        "newname": "flags",
        "description": "Bit flags used to control how the sound is played.",
        "newtooltip": "Bitwise flags (combination of SOUND_*) controlling the sound playback."
      }
    },
    "newtooltip": "Plays the specified sound on the linked prim link (once or looping) at volume. Only one sound can be attached to a prim at a time; new attachments or calling llStopSound stops previous playback. Controlled by flags."
  },
  "llLinksetDataAvailable": {
    "tooltip": "Returns the number of bytes remaining in the linkset's datastore.",
    "description": "The llLinksetDataAvailable returns the number of bytes available in the linkset's datastore.\n\n\n Returns an integer number of bytes available in the linkset store.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the number of bytes available/remaining in the linkset's datastore."
  },
  "llLinksetDataCountFound": {
    "tooltip": "Returns the number of keys matching the regular expression passed in the search parameter.",
    "description": "The llLinksetDataCountFound function returns the number of keys in the linkset datastore that match the pattern supplied in the pattern.\n\n\n Returns an integer Count of the keys in the datastore that match the supplied pattern.",
    "arguments": {
      "search": {
        "tooltip": "A regex search string to match against keys in the datastore.",
        "newname": "pattern",
        "description": "A regular expression describing which keys to return.",
        "newtooltip": "A regular expression (regex) search string used to match keys."
      }
    },
    "newtooltip": "Returns the total count of keys in the linkset datastore that match the regular expression pattern."
  },
  "llLinksetDataCountKeys": {
    "tooltip": "Returns the number of keys in the linkset's datastore.",
    "description": "The llLinksetDataCountKeys returns the number of unique keys that have been stored in the linkset's datastore.\n\n\n Returns an integer number of keys used in the linkset store.",
    "arguments": {},
    "newtooltip": "Returns an integer representing the total number of unique keys stored in the linkset's datastore."
  },
  "llLinksetDataDelete": {
    "tooltip": "Deletes a name:value pair from the linkset's datastore.",
    "description": "Removes an unprotected name:value pair from the linkset's datastore. If the pair was created\n\n\n Returns an integer success or failure code.",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/name\" target=\"_blank\">name</a>": {
        "tooltip": "Key to delete from the linkset's datastore.",
        "newname": "name",
        "description": "The key of the linkset name:value pair to be deleted.",
        "newtooltip": "The key name of the key-value pair to delete."
      }
    },
    "newtooltip": "Deletes the unprotected key-value pair specified by name from the linkset's datastore."
  },
  "llLinksetDataDeleteFound": {
    "tooltip": "'Deletes all key value pairs in the linkset data where the key matches the regular expression in search. Returns a list consisting of [ #deleted, #not deleted ].'",
    "description": "The llLinksetDataDeleteFound function finds and attempts to delete all keys in the data store that match pattern. This function will delete protected key-value pairs only if the matching pass phrase is passed in the pass parameter. The function returns a list, the first entry in the list is the number of keys deleted, the second entry in the list is the number of keys that could not be deleted due to a non-matching pass phrase.\nIf this function successfully deletes any keys from the datastore it will trigger a linkset_data event with the type of LINKSET_DATA_MULTIDELETE, the key name will consist of a comma separated list of the key names removed from the datastore.\n\n\n Returns a list of the number of keys deleted or skipped.",
    "arguments": {
      "search": {
        "tooltip": "A regex search string to match against keys in the datastore.",
        "newname": "pattern",
        "description": "A regular expression describing which keys to delete.",
        "newtooltip": "A regular expression (regex) specifying which keys to delete."
      },
      "pass": {
        "tooltip": "The pass phrase used to protect key value pairs in the linkset data",
        "newname": "pass",
        "description": "Optional pass phrase to delete protected keys.",
        "newtooltip": "The optional passphrase required to delete matching protected keys."
      }
    },
    "newtooltip": "Deletes all keys in the datastore matching the regular expression pattern. Returns a list [num_deleted, num_failed_protected]. Decrypts and deletes protected keys if matching pass is provided."
  },
  "llLinksetDataDeleteProtected": {
    "tooltip": "Deletes a name:value pair from the linkset's datastore.",
    "description": "Removes an unprotected name:value pair from the linkset's datastore. If the pair was created\n\n\n Returns an integer success or failure code.",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/name\" target=\"_blank\">name</a>": {
        "tooltip": "Key to delete from the linkset's datastore.",
        "newname": "name",
        "description": "The key of the linkset name:value pair to be deleted.",
        "newtooltip": "The key name of the protected key-value pair to delete."
      },
      "pass": {
        "tooltip": "Pass phrase to access protected data.",
        "newname": "",
        "newtooltip": "The passphrase required to delete the protected key."
      }
    },
    "newtooltip": "Deletes the protected key-value pair specified by name from the linkset's datastore using the passphrase pass."
  },
  "llLinksetDataFindKeys": {
    "tooltip": "Returns a list of keys from the linkset's data store matching the search parameter.",
    "description": "The llLinksetDataFindKeys function returns a list of up to count keys from the datastore that match pattern, starting at the one indicated by start. If count is less than 1, then all keys between start and the end which match pattern are returned. If count minus start exceeds the number of matching keys, the returned list will be shorter than count, down to a zero-length list if start equals or exceeds the number of matching keys. The list is ordered alphabetically.\n\n\n Returns a list of the keys in the datastore.",
    "arguments": {
      "search": {
        "tooltip": "A regex search string to match against keys in the datastore.",
        "newname": "pattern",
        "description": "A regular expression describing which keys to return.",
        "newtooltip": "A regular expression (regex) describing which keys to search for."
      },
      "start": {
        "tooltip": "Index of the first entry to return.",
        "newname": "start",
        "description": "The first key to return.",
        "newtooltip": "The zero-based start index of the matching keys to return."
      },
      "count": {
        "tooltip": "Number of entries to return. Less than 1 for all keys.",
        "newname": "count",
        "description": "The number of keys to return.",
        "newtooltip": "The maximum number of keys to return (or less than 1 to retrieve all matching keys)."
      }
    },
    "newtooltip": "Returns an alphabetically sorted list of up to count keys from the datastore that match the regular expression pattern, starting at index start (returns all matching keys if count < 1)."
  },
  "llLinksetDataListKeys": {
    "tooltip": "Returns a list of all keys in the linkset datastore.",
    "description": "The llLinksetDataListKeys function returns a list of up to count keys in the datastore, starting at the one indicated by start. If count is less than 1, then all keys between start and the end are returned. If count minus start exceeds the total number of keys, the returned list will be shorter than count, down to a zero-length list if start equals or exceeds the total number of keys.\n\n\n Returns a list of the keys in the datastore, ordered alphabetically.",
    "arguments": {
      "start": {
        "tooltip": "First entry to return. 0 for start of list.",
        "newname": "start",
        "description": "The first key to return.",
        "newtooltip": "The zero-based start index of the keys to return."
      },
      "count": {
        "tooltip": "Number of entries to return. Less than 1 for all keys.",
        "newname": "count",
        "description": "The number of keys to return.",
        "newtooltip": "The maximum number of keys to return (or less than 1 to retrieve all keys)."
      }
    },
    "newtooltip": "Returns an alphabetically sorted list of up to count keys from the datastore, starting at index start (returns all keys if count < 1)."
  },
  "llLinksetDataRead": {
    "tooltip": "Returns the value stored for a key in the linkset.",
    "description": "Reads an unprotected name:value pair from the linkset's datastore.\n\n\n Returns a string value corresponding to name",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/name\" target=\"_blank\">name</a>": {
        "tooltip": "Key to retrieve from the linkset's datastore.",
        "newname": "name",
        "description": "The key of the linkset name:value pair to be read.",
        "newtooltip": "The key of the key-value pair to read."
      }
    },
    "newtooltip": "Reads and returns the string value corresponding to key name from the linkset's datastore."
  },
  "llLinksetDataReadProtected": {
    "tooltip": "Returns the value stored for a key in the linkset.",
    "description": "Reads an unprotected name:value pair from the linkset's datastore.\n\n\n Returns a string value corresponding to name",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/name\" target=\"_blank\">name</a>": {
        "tooltip": "Key to retrieve from the linkset's datastore.",
        "newname": "name",
        "description": "The key of the linkset name:value pair to be read.",
        "newtooltip": "The key of the protected key-value pair to read."
      },
      "pass": {
        "tooltip": "Pass phrase to access protected data.",
        "newname": "",
        "newtooltip": "The passphrase required to read the protected key."
      }
    },
    "newtooltip": "Reads and returns the string value of the protected key name from the linkset's datastore using the passphrase pass."
  },
  "llLinksetDataReset": {
    "tooltip": "Resets the linkset's data store, erasing all key-value pairs.",
    "description": "The llLinksetDataReset function erases all name:value pairs stored in the linkset's datastore. When this function is called the linkset_data event is triggered in all scripts running in the linkset with an action of LINKSETDATA_RESET.",
    "arguments": {},
    "newtooltip": "Erases all key-value pairs stored in the linkset's datastore, triggering a linkset_data event (with LINKSETDATA_RESET) in all scripts in the linkset."
  },
  "llLinksetDataWrite": {
    "tooltip": "Sets a name:value pair in the linkset's datastore",
    "description": "Creates or updates an unprotected name:value pair from the linkset's datastore.\n\n\n Returns an integer success or failure code.",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/name\" target=\"_blank\">name</a>": {
        "tooltip": "key for the name:value pair.",
        "newname": "name",
        "description": "The key of the name:value pair in the datastore to be updated or created.",
        "newtooltip": "The key name of the key-value pair."
      },
      "value": {
        "tooltip": "value to store in the linkset's datastore.",
        "newname": "value",
        "description": "The value of the name:value pair.",
        "newtooltip": "The string value to write to the datastore."
      }
    },
    "newtooltip": "Creates or updates an unprotected key-value pair (name and value) in the linkset's datastore. Returns an integer success or failure code."
  },
  "llLinksetDataWriteProtected": {
    "tooltip": "Sets a name:value pair in the linkset's datastore",
    "description": "Creates or updates an unprotected name:value pair from the linkset's datastore.\n\n\n Returns an integer success or failure code.",
    "arguments": {
      "<a href=\"https://wiki.secondlife.com/wiki/Category:LSL_Parameters/name\" target=\"_blank\">name</a>": {
        "tooltip": "key for the name:value pair.",
        "newname": "name",
        "description": "The key of the name:value pair in the datastore to be updated or created.",
        "newtooltip": "The key name of the protected key-value pair."
      },
      "value": {
        "tooltip": "value to store in the linkset's datastore.",
        "newname": "value",
        "description": "The value of the name:value pair.",
        "newtooltip": "The string value to write to the datastore."
      },
      "pass": {
        "tooltip": "Pass phrase to access protected data.",
        "newname": "",
        "newtooltip": "The passphrase used to protect or update the key."
      }
    },
    "newtooltip": "Creates or updates a protected key-value pair (name and value) in the linkset's datastore using the passphrase pass. Returns an integer success or failure code."
  },
  "llLinkSetSoundQueueing": {
    "tooltip": "Limits radius for audibility of scripted sounds (both attached and triggered) to distance Radius around the link.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": "queue",
        "description": "boolean, sound queuing: TRUE enables, FALSE&#32;(default) disables",
        "newtooltip": "Boolean. If TRUE, sound queuing is enabled; if FALSE, it is disabled."
      },
      "QueueEnable": {
        "tooltip": "'Boolean, sound queuing for the linked prim: TRUE enables, FALSE disables (default).'",
        "newname": ""
      }
    },
    "newtooltip": "Enables or disables sound queuing on the linked prim link. When set to TRUE, sounds will queue and play in sequence."
  },
  "llLinkSetSoundRadius": {
    "tooltip": "Limits radius for audibility of scripted sounds (both attached and triggered) to distance Radius around the link.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": ""
      },
      "radius": {
        "tooltip": "Maximum distance that sounds can be heard.",
        "newname": "",
        "newtooltip": "The maximum distance in meters at which the sounds can be heard."
      }
    },
    "newtooltip": "Limits the audibility radius of attached and triggered scripted sounds to distance radius (in meters) around the linked prim link."
  },
  "llLinkSitTarget": {
    "tooltip": "Set the sit location for the linked prim(s). If Offset == <0,0,0> clear it.\\nSet the sit location for the linked prim(s). The sit location is relative to the prim's position and rotation.",
    "description": "Set the sit location for the linked prim(s). The sit location is relative to the prim's position and rotation.",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag of the prim.'",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      },
      "Offset": {
        "tooltip": "Position for the sit target, relative to the prim's position.",
        "newname": "offset",
        "description": "Additional position for the sit target in local prim coordinates.",
        "newtooltip": "The offset position vector in local prim coordinates."
      },
      "Rotation": {
        "tooltip": "Rotation (relative to the prim's rotation) for the avatar.",
        "newname": "rot",
        "description": "Additional rotation for the sit target relative to the prim rotation.",
        "newtooltip": "The rotation relative to the prim's rotation."
      }
    },
    "newtooltip": "Sets the sit target position (offset) and orientation (rot) for the linked prim link, relative to the prim's own position and rotation. Clear by setting offset to <0.0, 0.0, 0.0>."
  },
  "llLinkStopSound": {
    "tooltip": "Stops playback of the currently attached sound on a link.",
    "description": "Function: llLinkStopSound( integer link );",
    "arguments": {
      "LinkNumber": {
        "tooltip": "'Link number (0: unlinked, 1: root prim, >1: child prims) or a LINK_* flag'",
        "newname": "link",
        "description": "Link number (0: unlinked,&#32;1: root prim, >1: child prims&#32;and seated avatars) or a 'LINK_*' flag&#32;",
        "newtooltip": "The link number (1 for root, >1 for children) or a LINK_* flag."
      }
    },
    "newtooltip": "Stops the playback of any currently playing attached sound on the linked prim link."
  },
  "llList2CSV": {
    "tooltip": "Creates a string of comma separated values from the list.\nCreate a string of comma separated values from the specified list.",
    "description": "Returns a string of comma separated values taken in order from src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source list to convert."
      }
    },
    "newtooltip": "Returns a string of comma-separated values taken in order from the list src."
  },
  "llList2Float": {
    "tooltip": "Copies the float at Index in the list.\nReturns the value at Index in the specified list. If Index describes a location not in the list, or the value cannot be type-cast to a float, then zero is returned.",
    "description": "Returns a float that is at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns the float value at index in the list src. Returns 0.0 if the index is out of bounds or if the value cannot be type-cast."
  },
  "llList2Integer": {
    "tooltip": "Copies the integer at Index in the list.\nReturns the value at Index in the specified list. If Index describes a location not in the list, or the value cannot be type-cast to an integer, then zero is returned.",
    "description": "Returns an integer that is at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns the integer value at index in the list src. Returns 0 if the index is out of bounds or if the value cannot be type-cast."
  },
  "llList2Json": {
    "tooltip": "Converts either a strided list of key:value pairs to a JSON_OBJECT, or a list of values to a JSON_ARRAY.",
    "description": "This function takes a list and returns a JSON string of that list as either a json object or json array.\n\n\n Returns a string that is either values serialized as a JSON type, or if an error was encountered JSON_INVALID.",
    "arguments": {
      "JsonType": {
        "tooltip": "Type is JSON_ARRAY or JSON_OBJECT.",
        "newname": "type",
        "newtooltip": "The JSON target type (JSON_ARRAY or JSON_OBJECT)."
      },
      "Values": {
        "tooltip": "List of values to convert.",
        "newname": "values",
        "newtooltip": "The list of values to serialize."
      }
    },
    "newtooltip": "Converts the list values into a JSON string of the specified type (either a JSON_ARRAY or a JSON_OBJECT). Returns JSON_INVALID if an error is encountered."
  },
  "llList2Key": {
    "tooltip": "Copies the key at Index in the list.\nReturns the value at Index in the specified list. If Index describes a location not in the list, or the value cannot be type-cast to a key, then null string is returned.",
    "description": "Returns a key that is at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns the key (UUID) value at index in the list src. Returns a null string/key if the index is out of bounds or if the value cannot be type-cast."
  },
  "llList2List": {
    "tooltip": "Returns a subset of entries from ListVariable, in a range specified by the Start and End indicies (inclusive).\\nUsing negative numbers for Start and/or End causes the index to count backwards from the length of the string, so 0, -1 would capture the entire string.\\nIf Start is greater than End, the sub string is the exclusion of the entries.",
    "description": "Returns a list that is a slice of src from start to end.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source list to slice."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The zero-based start index (inclusive)."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The zero-based end index (inclusive)."
      }
    },
    "newtooltip": "Returns a new list containing the subset of entries from src within the inclusive range specified by the start and end indices. Negative indices count backward from the end."
  },
  "llList2ListSlice": {
    "tooltip": "Returns a subset of entries from ListVariable, in a range specified by Start and End indices (inclusive) return the slice_index element of each stride.\\n Using negative numbers for Start and/or End causes the index to count backwards from the length of the list. (e.g. 0, -1 captures entire list)\\nIf slice_index is less than 0, it is counted backwards from the end of the stride.\\n Stride must be a positive integer > 0 or an empy list is returned. If slice_index falls outside range of stride, an empty list is returned. slice_index is zero-based. (e.g. A stride of 2 has valid indices 0,1)",
    "description": "Returns a list of the slice_index'th element of every stride in strided list whose index is a multiple of stride in the range start to end.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source strided list."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The zero-based start index (inclusive)."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The zero-based end index (inclusive)."
      },
      "Stride": {
        "tooltip": "",
        "newname": "stride",
        "description": "number of entries per stride, if less than 1 it is assumed to be 1",
        "newtooltip": "The number of entries per stride (defaults to 1 if less than 1)."
      },
      "slice_index": {
        "tooltip": "",
        "newname": "slice_index",
        "newtooltip": "The zero-based element index within each stride to extract (negatives count backward from the end of the stride)."
      }
    },
    "newtooltip": "Returns a list containing the slice_index'th element of every stride within the inclusive range from start to end in the strided list src. Stride must be a positive integer."
  },
  "llList2ListStrided": {
    "tooltip": "Copies the strided slice of the list from Start to End.\nReturns a copy of the strided slice of the specified list from Start to End.",
    "description": "Returns a list of all the entries in the strided list whose index is a multiple of stride in the range start to end.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source strided list."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The zero-based start index (inclusive)."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The zero-based end index (inclusive)."
      },
      "Stride": {
        "tooltip": "",
        "newname": "stride",
        "description": "number of entries per stride, if less than 1 it is assumed to be 1",
        "newtooltip": "The number of entries per stride (defaults to 1 if less than 1)."
      }
    },
    "newtooltip": "Returns a new list containing the first element of every stride in the strided list src within the inclusive range from start to end."
  },
  "llList2Rot": {
    "tooltip": "Copies the rotation at Index in the list.\nReturns the value at Index in the specified list. If Index describes a location not in the list, or the value cannot be type-cast to rotation, thenZERO_ROTATION is returned.",
    "description": "Returns a rotation that is at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns the rotation value at index in the list src. Returns ZERO_ROTATION if the index is out of bounds or if the value cannot be type-cast."
  },
  "llList2String": {
    "tooltip": "Copies the string at Index in the list.\nReturns the value at Index in the specified list as a string. If Index describes a location not in the list then null string is returned.",
    "description": "Returns a string that is at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns the string value at index in the list src. Returns an empty string if the index is out of bounds."
  },
  "llList2Vector": {
    "tooltip": "Copies the vector at Index in the list.\nReturns the value at Index in the specified list. If Index describes a location not in the list, or the value cannot be type-cast to a vector, then ZERO_VECTOR is returned.",
    "description": "Returns a vector that is at index in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "List containing the element of interest.",
        "newtooltip": "The source list containing the element of interest."
      },
      "Index": {
        "tooltip": "",
        "newname": "index",
        "description": "Index of the element of interest.",
        "newtooltip": "The zero-based index of the entry."
      }
    },
    "newtooltip": "Returns the vector value at index in the list src. Returns ZERO_VECTOR if the index is out of bounds or if the value cannot be type-cast."
  },
  "llListen": {
    "tooltip": "Creates a listen callback for Text on Channel from SpeakersName and SpeakersID (SpeakersName, SpeakersID, and/or Text can be empty) and returns an identifier that can be used to deactivate or remove the listen.\\nNon-empty values for SpeakersName, SpeakersID, and Text will filter the results accordingly, while empty strings and NULL_KEY will not filter the results, for string and key parameters respectively.\\nPUBLIC_CHANNEL is the public chat channel that all avatars see as chat text. DEBUG_CHANNEL is the script debug channel, and is also visible to nearby avatars. All other channels are are not sent to avatars, but may be used to communicate with scripts.",
    "description": "Sets a handle for msg on channel from name and id.\n\n\n Returns a handle (an integer) that can be used to deactivate or remove the listen.",
    "arguments": {
      "Channel": {
        "tooltip": "",
        "newname": "channel",
        "description": "input chat channel, any integer value&#32;(-2147483648 through 2147483647)",
        "newtooltip": "The input chat channel to listen on (any integer from -2147483648 to 2147483647)."
      },
      "SpeakersName": {
        "tooltip": "",
        "newname": "name",
        "description": "filter for specific prim name or avatar legacy name",
        "newtooltip": "The specific prim name or avatar legacy name to filter by (or empty string for no filter)."
      },
      "SpeakersID": {
        "tooltip": "",
        "newname": "id",
        "description": "filter for specific&#32;avatar or prim UUID",
        "newtooltip": "The specific avatar or prim UUID to filter by (or NULL_KEY for no filter)."
      },
      "Text": {
        "tooltip": "",
        "newname": "msg",
        "description": "filter for specific message",
        "newtooltip": "The specific chat message string to filter by (or empty string for no filter)."
      }
    },
    "newtooltip": "Creates a listener on channel from name and id for msg. Returns an integer listener handle used to control or remove the listener. Empty strings or NULL_KEY filters do not filter on those parameters."
  },
  "llListenControl": {
    "tooltip": "Makes a listen event callback active or inactive. Pass in the value returned from llListen to the iChannelHandle parameter to specify which listener you are controlling.\\nUse boolean values to specify Active",
    "description": "Makes listen event callback handle active or inactive",
    "arguments": {
      "ChannelHandle": {
        "tooltip": "",
        "newname": "handle",
        "description": "handle to control listen event",
        "newtooltip": "The integer listener handle returned by llListen."
      },
      "Active": {
        "tooltip": "",
        "newname": "active",
        "description": "TRUE&#32;(default) activates, FALSE deactivates",
        "newtooltip": "Boolean. If TRUE, activates the listener; if FALSE, deactivates it."
      }
    },
    "newtooltip": "Enables or disables the listener specified by the integer handle. If active is TRUE, the listener is activated; if FALSE, it is deactivated."
  },
  "llListenRemove": {
    "tooltip": "Removes a listen event callback. Pass in the value returned from llListen to the iChannelHandle parameter to specify which listener to remove.",
    "description": "Removes listen event callback handle",
    "arguments": {
      "ChannelHandle": {
        "tooltip": "",
        "newname": "handle",
        "description": "handle to control listen event",
        "newtooltip": "The integer listener handle returned by llListen to remove."
      }
    },
    "newtooltip": "Completely removes the listener specified by the integer handle."
  },
  "llListFindList": {
    "tooltip": "Returns the first index where Find appears in ListVariable. Returns -1 if not found.",
    "description": "Returns the integer index of the first instance of test in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "what to search in (haystack)",
        "newtooltip": "The list to search within."
      },
      "Find": {
        "tooltip": "",
        "newname": "test",
        "description": "what to search for (needle)",
        "newtooltip": "The list elements to search for."
      }
    },
    "newtooltip": "Returns the integer index of the first instance of list test within the list src (returns -1 if not found)."
  },
  "llListFindListNext": {
    "tooltip": "Returns the nth index where Find appears in ListVariable. Returns -1 if not found.",
    "description": "Returns the integer index of the nth instance of test in src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "what to search in (haystack)",
        "newtooltip": "The list to search within."
      },
      "Find": {
        "tooltip": "",
        "newname": "test",
        "description": "what to search for (needles)",
        "newtooltip": "The list elements to search for."
      },
      "Instance": {
        "tooltip": "Index of the match to return.",
        "newname": "instance",
        "description": "which instance (needle) to return",
        "newtooltip": "The zero-based occurrence index of the match to find."
      }
    },
    "newtooltip": "Returns the integer index of the specified instance of list test within the list src (returns -1 if not found)."
  },
  "llListFindStrided": {
    "tooltip": "Returns the first index (where Start <= index <= End) where Find appears in ListVariable. Steps through ListVariable by Stride. Returns -1 if not found.",
    "description": "Returns the integer index of the first instance of test in src matching conditions.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "what to search in (haystack)",
        "newtooltip": "The list to search within."
      },
      "Find": {
        "tooltip": "",
        "newname": "test",
        "description": "what to search for (needle)",
        "newtooltip": "The list elements to search for."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "Start of range to search",
        "newtooltip": "The zero-based start index of the range to search."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "End of range to search",
        "newtooltip": "The zero-based end index of the range to search."
      },
      "Stride": {
        "tooltip": "",
        "newname": "stride",
        "description": "Number of entries per stride within src",
        "newtooltip": "The number of entries per stride in the list."
      }
    },
    "newtooltip": "Returns the integer index of the first instance of list test in the strided list src within the range from start to end (stepping through by stride). Returns -1 if not found."
  },
  "llListInsertList": {
    "tooltip": "Returns a list that contains all the elements from Target but with the elements from ListVariable inserted at Position start.\\nReturns a new list, created by inserting ListVariable into the Target list at Position. Note this does not alter the Target.",
    "description": "Returns a list that contains all the elements from dest but with the elements from src inserted at position start.",
    "arguments": {
      "Target": {
        "tooltip": "",
        "newname": "dest",
        "newtooltip": "The target destination list."
      },
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "newtooltip": "The source list to insert."
      },
      "Position": {
        "tooltip": "",
        "newname": "start",
        "newtooltip": "The zero-based index where insertion begins."
      }
    },
    "newtooltip": "Returns a new list containing all elements of dest with the elements of src inserted starting at index start. Does not modify dest itself."
  },
  "llListRandomize": {
    "tooltip": "Returns a version of the input ListVariable which has been randomized by blocks of size Stride.\\nIf the remainder from the length of the list, divided by the stride is non-zero, this function does not randomize the list.",
    "description": "Returns a list which is a randomized permutation of src.",
    "arguments": {
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "A list you want to randomize.",
        "newtooltip": "The source list to randomize."
      },
      "Stride": {
        "tooltip": "",
        "newname": "stride",
        "description": "number of entries per stride, if less than 1 it is assumed to be 1",
        "newtooltip": "The size of each randomized block (defaults to 1 if less than 1)."
      }
    },
    "newtooltip": "Returns a randomized copy of the list src by blocks of size stride. If the list length is not perfectly divisible by stride, no randomization occurs."
  },
  "llListReplaceList": {
    "tooltip": "Returns a list that is Target with Start through End removed and ListVariable inserted at Start.\\nReturns a list replacing the slice of the Target list from Start to End with the specified ListVariable. Start and End are inclusive, so 0, 1 would replace the first two entries and 0, 0 would replace only the first list entry.",
    "description": "Returns a list that is a copy of dest with start through end removed and src inserted at start.",
    "arguments": {
      "Target": {
        "tooltip": "",
        "newname": "dest",
        "description": "destination",
        "newtooltip": "The target destination list."
      },
      "ListVariable": {
        "tooltip": "",
        "newname": "src",
        "description": "source",
        "newtooltip": "The source list to insert."
      },
      "Start": {
        "tooltip": "",
        "newname": "start",
        "description": "start index",
        "newtooltip": "The zero-based start index (inclusive) of the replaced range."
      },
      "End": {
        "tooltip": "",
        "newname": "end",
        "description": "end index",
        "newtooltip": "The zero-based end index (inclusive) of the replaced range."
      }
    },
    "newtooltip": "Returns a copy of the list dest with the inclusive range from start to end removed, and the elements of src inserted in its place at start."
  },
  "llListSort": {
    "tooltip": "Returns the specified list, sorted into blocks of stride in ascending order (if Ascending is TRUE, otherwise descending). Note that sort only works if the first entry of each block is the same datatype.",
    "description": "Returns a list that is src sorted by stride.",
    "arguments": {
      "ListVariable": {
        "tooltip": "List to sort.",
        "newname": "src",
        "description": "List to be sorted.",
        "newtooltip": "The list to be sorted."
      },
      "Stride": {
        "tooltip": "Stride length.",
        "newname": "stride",
        "description": "number of entries per stride, if less than 1 it is assumed to be 1",
        "newtooltip": "The number of entries per block/stride (defaults to 1 if less than 1)."
      },
      "Ascending": {
        "tooltip": "Boolean. TRUE = result in ascending order, FALSE = result in descending order.",
        "newname": "ascending",
        "description": "if TRUE then the sort order is ascending, otherwise the order is descending.",
        "newtooltip": "Boolean. If TRUE, sorts in ascending order; if FALSE, sorts in descending order."
      }
    },
    "newtooltip": "Returns a copy of the list src, sorted into blocks of stride in ascending order (if ascending is TRUE) or descending order (if FALSE). Only works if the first entry of each block shares the same datatype."
  },
  "llListSortStrided": {
    "tooltip": "Returns the specified list, sorted by the specified element into blocks of stride in ascending order (if Ascending is TRUE, otherwise descending). Note that sort only works if the first entry of each block is the same datatype.",
    "description": "llListSortStrided is llListSort with the added parameter of stride_index, adding the flexibility to sort by any item in the stride. These routines use the same underlying code and have the same computational complexity.\n\n\n Returns a list that is src sorted by the stride_index item in every stride.",
    "arguments": {
      "ListVariable": {
        "tooltip": "List to sort.",
        "newname": "src",
        "description": "List to be sorted.",
        "newtooltip": "The list to be sorted."
      },
      "Stride": {
        "tooltip": "Stride length.",
        "newname": "stride",
        "description": "number of entries per stride, if less than 1 it is assumed to be 1",
        "newtooltip": "The number of entries per block/stride (defaults to 1 if less than 1)."
      },
      "Sortkey": {
        "tooltip": "The zero based element within the stride to use as the sort key",
        "newname": "stride_index",
        "description": "The index within the stride to sort by. stride_index is 0-indexed. The first element is 0, second 1, etc. An index of 0 is functionally identical to using llListSort. Negative indexes count from the end of the stride, e.g. -1 means the last element in the stride.",
        "newtooltip": "The zero-based index of the element within each stride to use as the sort key (negatives count backward from the end of the stride)."
      },
      "Ascending": {
        "tooltip": "Boolean. TRUE = result in ascending order, FALSE = result in descending order.",
        "newname": "ascending",
        "description": "if TRUE then the sort order is ascending, otherwise the order is descending.",
        "newtooltip": "Boolean. If TRUE, sorts in ascending order; if FALSE, sorts in descending order."
      }
    },
    "newtooltip": "Returns a copy of the list src sorted into blocks of stride by the element at stride_index in each block. Sorted in ascending order (if ascending is TRUE) or descending order (if FALSE)."
  },
  "llListStatistics": {
    "tooltip": "Performs a statistical aggregate function, specified by a LIST_STAT_* constant, on ListVariables.\\nThis function allows a script to perform a statistical operation as defined by operation on a list composed of integers and floats.",
    "description": "Returns a float that is the result of performing statistical aggregate function operation on src.",
    "arguments": {
      "Operation": {
        "tooltip": "One of LIST_STAT_* values",
        "newname": "operation",
        "description": "a LIST_STAT_* flag",
        "newtooltip": "The LIST_STAT_* constant of the statistical operation to perform."
      },
      "ListVariable": {
        "tooltip": "Variable to analyze.",
        "newname": "src",
        "newtooltip": "The list of floats and integers to analyze."
      }
    },
    "newtooltip": "Returns a float representing the result of performing the statistical aggregate function operation (a LIST_STAT_* constant) on the numeric list src."
  },
  "llLoadURL": {
    "tooltip": "Shows dialog to avatar AvatarID offering to load web page at URL. If user clicks yes, launches their web browser.\\\\nllLoadURL displays a dialogue box to the user, offering to load the specified web page using the default web browser.",
    "description": "Shows dialog to avatar offering to load web page at url with message.\n\n\n If user clicks yes, launches the page in their web browser, starting the browser if required.",
    "arguments": {
      "AvatarID": {
        "tooltip": "",
        "newname": "avatar",
        "description": "avatar UUID that is in the same region",
        "newtooltip": "The UUID of the avatar in the same region."
      },
      "Text": {
        "tooltip": "",
        "newname": "message",
        "description": "message to be displayed in the dialog box",
        "newtooltip": "The text message to display in the dialog box."
      },
      "URL": {
        "tooltip": "",
        "newname": "url",
        "newtooltip": "The web URL to open."
      }
    },
    "newtooltip": "Shows a dialog box displaying message to the avatar avatar offering to open the specified url. Clicking yes launches the URL in their default web browser."
  },
  "llLog": {
    "tooltip": "Returns the natural logarithm of Value. Returns zero if Value <= 0.\nReturns the base e (natural) logarithm of the specified Value.",
    "description": "Returns a float that is the [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;natural logarithm of val.\n\n\n If val <= 0 return 0.0 instead.",
    "arguments": {
      "Value": {
        "tooltip": "",
        "newname": "val",
        "newtooltip": "The float value to evaluate."
      }
    },
    "newtooltip": "Returns a float representing the natural (base e) logarithm of the positive value val (returns 0.0 if val <= 0)."
  },
  "llLog10": {
    "tooltip": "Returns the base 10 logarithm of Value. Returns zero if Value <= 0.\nReturns the base 10 (common) logarithm of the specified Value.",
    "description": "Returns a float that is the base 10 [](https://wiki.secondlife.com/wiki/File:Wikipedia-16px.png)&#8201;logarithm of val.\n\n\n If val <= 0 return zero instead.",
    "arguments": {
      "Value": {
        "tooltip": "",
        "newname": "val",
        "newtooltip": "The float value to evaluate."
      }
    },
    "newtooltip": "Returns a float representing the base-10 (common) logarithm of the positive value val (returns 0.0 if val <= 0)."
  },
  "llLookAt": {
    "tooltip": "Cause object name to point its forward axis towards Target, at a force controlled by Strength and Damping.\\nGood Strength values are around half the mass of the object and good Damping values are less than 1/10th of the Strength.\\nAsymmetrical shapes require smaller Damping. A Strength of 0.0 cancels the look at.",
    "description": "Cause object to point its up axis (positive z) towards target, while keeping its forward axis (positive x) below the horizon.\n\n\n Continues to track target until llStopLookAt is called.",
    "arguments": {
      "Target": {
        "tooltip": "",
        "newname": "target",
        "description": "position in region coordinates",
        "newtooltip": "The target position vector in region coordinates to look at."
      },
      "Strength": {
        "tooltip": "",
        "newname": "strength",
        "newtooltip": "The force of rotation (0.0 cancels the tracking; values around half the object's mass are typical)."
      },
      "Damping": {
        "tooltip": "",
        "newname": "damping",
        "description": "seconds to critically damp in",
        "newtooltip": "The timescale in seconds to critically damp the orientation."
      }
    },
    "newtooltip": "Causes the object to orient its positive Z-axis (up axis) toward the target vector, keeping its positive X-axis (forward axis) below the horizon. Tracks target until llStopLookAt is called or strength is set to 0.0."
  },
  "llLoopSound": {
    "tooltip": "Plays specified Sound, looping indefinitely, at Volume (0.0 - 1.0).\nOnly one sound may be attached to an object at a time.\\nA second call to llLoopSound with the same key will not restart the sound, but the new volume will be used. This allows control over the volume of already playing sounds.\\nSetting the volume to 0 is not the same as calling llStopSound; a sound with 0 volume will continue to loop.\\nTo restart the sound from the beginning, call llStopSound before calling llLoopSound again.",
    "description": "Plays attached sound looping indefinitely at volume",
    "arguments": {
      "Sound": {
        "tooltip": "",
        "newname": "sound",
        "description": "a sound in the inventory of the prim this script is in&#32;or a UUID&#32;of a sound",
        "newtooltip": "The name of a sound in the prim's inventory, or a UUID."
      },
      "Volume": {
        "tooltip": "",
        "newname": "volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      }
    },
    "newtooltip": "Plays the attached sound looping indefinitely at the specified volume. Only one sound can be attached to a prim at a time; new loops adjust the volume of the currently playing sound without restarting it."
  },
  "llLoopSoundMaster": {
    "tooltip": "Plays attached Sound, looping at volume (0.0 - 1.0), and declares it a sync master.\\nBehaviour is identical to llLoopSound, with the addition of marking the source as a \"Sync Master\", causing \"Slave\" sounds to sync to it. If there are multiple masters within a viewers interest area, the most audible one (a function of both distance and volume) will win out as the master.\\nThe use of multiple masters within a small area is unlikely to produce the desired effect.",
    "description": "Plays attached sound looping at volume, declares it a sync master.",
    "arguments": {
      "Sound": {
        "tooltip": "",
        "newname": "sound",
        "description": "a sound in the inventory of the prim this script is in&#32;or a UUID&#32;of a sound",
        "newtooltip": "The name of a sound in the prim's inventory, or a UUID."
      },
      "Volume": {
        "tooltip": "",
        "newname": "volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      }
    },
    "newtooltip": "Plays the attached sound looping indefinitely at the specified volume and declares it a Sync Master, forcing slave sounds to synchronize with it."
  },
  "llLoopSoundSlave": {
    "tooltip": "Plays attached sound looping at volume (0.0 - 1.0), synced to most audible sync master.\\nBehaviour is identical to llLoopSound, unless there is a \"Sync Master\" present.\\nIf a Sync Master is already playing the Slave sound will begin playing from the same point the master is in its loop synchronizing the loop points of both sounds.\\nIf a Sync Master is started when the Slave is already playing, the Slave will skip to the correct position to sync with the Master.",
    "description": "Plays attached sound looping at volume, synced to most audible sync master declared by llLoopSoundMaster.",
    "arguments": {
      "Sound": {
        "tooltip": "",
        "newname": "sound",
        "description": "a sound in the inventory of the prim this script is in&#32;or a UUID&#32;of a sound",
        "newtooltip": "The name of a sound in the prim's inventory, or a UUID."
      },
      "Volume": {
        "tooltip": "",
        "newname": "volume",
        "description": "between 0.0 (silent) and 1.0 (loud) ('0.0 <&#61; **volume** <&#61; 1.0')",
        "newtooltip": "The volume level to set, between 0.0 (silent) and 1.0 (loud)."
      }
    },
    "newtooltip": "Plays the attached sound looping indefinitely at the specified volume, synchronized to the most audible active Sync Master in ra
        };

        const searchInput = document.getElementById('searchInput');
        const jsonOutput = document.getElementById('jsonOutput');

        function renderJSON(query = "") {
            const lowerCaseQuery = query.toLowerCase();
            const filteredData = {};

            for (const funcName in lslData) {
                if (funcName.toLowerCase().includes(lowerCaseQuery)) {
                    filteredData[funcName] = lslData[funcName];
                }
            }

            const jsonString = JSON.stringify(filteredData, null, 2);
            jsonOutput.textContent = jsonString;
            if (window.Prism) {
                Prism.highlightElement(jsonOutput);
            }
        }

        searchInput.addEventListener('input', (event) => {
            renderJSON(event.target.value);
        });

        renderJSON();
    </script>

</body>
</html>
