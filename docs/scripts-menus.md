---
layout: default
title: Menus
slua_beta: true
---

## Menus

**A menu generator using a table with its definition. With submenus, multi-page and multi-user.**

I suggest to take a copy of the objects and use them to follow the examples.

The objects with these scripts are available at [Scripting Study Group Area](https://maps.secondlife.com/secondlife/Builders%20Brewery%20Sandbox/65/93/495):

<img src="images/giver menu.png" alt="Menus">

You are welcome to the Study Groups all Thursdays, Fridays and Saturdays from 11AM to 1PM SLT with your questions, practices, and projects to chat about this and anything else scripting related.

### Examples of definitions

**Example 1: a yes/no menu:**

<pre class="language-sluab"><code class="language-sluab">-- the definition of the menu is an array table
local mainMenu = {
    -- in the first index there are the parameters of the menu
    -- name of the menu: "choose yes or no"
    -- close = true adds a "close" option to the menu
    { "choose yes or no", close = true },
    -- in the next indexes there are the options
    -- name of the option: "Yes"
    -- function to execute when the user chooses the option: yesno
    { "Yes", yesno },
    -- the function is called with the name of the option: yesno(name)
    -- several options can have the same function
    { "No", yesno },
}</code></pre>

**Example 2: a movement menu:**

<pre class="language-sluab"><code class="language-sluab">local mainMenu = {
    { "Object control", close = true },
    -- menu = {} defines a submenu that opens when the user chooses "move"
    { "move", menu = {
        -- it has the same format than the main menu
        -- name of the submenu: "Movements"
        -- by default a "back" option is added
        { "Movements" },
        -- options of the submenu
        -- the name of the option can be a table of names
        -- in this case all have the same action: setPosition(name)
        { { "North", "West", "Up", "South", "East", "Down" }, setPosition },
        { { "faster", "slower" }, setSpeed },
        -- this submenu has 8 options
    }},
    { { "bigger", "smaller" }, setSize },
    -- another submenu
    { "color", menu = {
        -- ret = true goes back to the previous menu after choosing an option
        -- otherwise it would stay in the same menu
        { "Color", ret = true },
        -- a table COLOR_NAMES with the names of the options
        -- the menu uses several pages if necessary
        { COLOR_NAMES, setColor },
    }},
}
</code></pre>

**Example 3: an information menu**

<pre class="language-sluab"><code class="language-sluab">
local mainMenu = {
    { "Information", close = true },
    { "Height", sayHeight },
    { "Complexity", sayComplexity },
    { "Language", sayLanguage },
    { "Attachments", menu = {
        -- say = true says the options of the menu to the user in chat
        -- useful when the option names are too long to show in the buttons
        { "Attachments", back = true, say = true },
        -- a function peopleButtons() that returns the names of the options
        -- option can be a name, a table of names, or a function that returns names
        -- the menu fits the names in the options if they are too long
        { peopleButtons, sayAttachments },
    }},
}
</code></pre>

**Example 4: a photoalbum menu:**

<pre class="language-sluab"><code class="language-sluab">-- the table "context"
--     it's a table to store internal values used in menu
--     it's passed to all the functions called by the menu that use and can modify the table
--     initially it contains the id of the user of the menu in the key userId
--         context.userId = id of the user
--
local mainMenu = {
    -- init = a function executed only once at the start
    -- entry = a function executed each time that the menu is shown
    --    if it returns false the menu is not shown
    --        if it returns a second value a menu with this value and the option "ok" is shown
    -- timeout = seconds until the menu timeouts
    --    when used in the main menu becomes the default timeout for the submenus
    --    back_default = becomes the default "back" option for the submenus
    --    ret_default = becomes the default "ret" option for the submenus
    { "Manage albums and options", init = initMain, entry = entryMain, close = true, timeout = 60, back_default = true, ret_default = false },
    -- entry = a function executed before calling the action function
    --    if it returns false the action is not executed
    --        if it returns a second value a menu with this value and the option "ok" is shown
    -- textbox = a textbox with the value of "textbox" as message is shown
    --    the action function is called with the value returned by the text box as the parameter "name"
    --    the textbox is not shown if the entry function returns false
    { "New album", newAlbum, entry = entryNewAlbum, textbox = "Name of the new album" },
    { "Edit album", menu = {
        -- values between [ and ] are keys in the table context
        -- they are replaced in the option name before showing the menu
        { "Editing the album [selectedAlbumName]" },
        { "Name", editAlbumName, textbox = "Name of the new album" },
        { "Text color", menu = {
            { "Editing the text color of the album [selectedAlbumName]", ret = true },
            { getColors, editAlbumTextColor },
        }},
        { "Back color", menu = {
            { "Editing the back color of the album [selectedAlbumName]", ret = true },
            { getColors, editAlbumBackColor },
        }},
        { "Position", menu = {
            { "Editing the position of the album [selectedAlbumName]", ret = true },
            { ALBUM_POSITIONS, editAlbumPosition },
        }},
    }},
    { "Delete album", menu = {
        { "Deleting the album [selectedAlbumName]", entry = entryDeleteAlbum, ret = true },
        { "Yes", deleteAlbum },
        { "No", deleteAlbum },
    }},
    { "Select album", menu = {
        { "Selecting an album", ret = true },
        { getAlbums, selectAlbum },
    }},
    { "Move picture", movePicture },
    { "Display seconds", menu = {
        { "Choosing display seconds", ret = true },
        { DISPLAY_SECONDS, setDisplaySeconds },
    }},
    { "Set publi [setPublicTo]", setPublicTouch },
    { "Set say [setSayNameTo]", setSayPictureName },
}
</code></pre>

### Documentation

**Default configurable values:**

<pre class="language-sluab"><code class="language-sluab">local menu = {
	CLOSE = true,
	BACK = true,
	RETURN = false,
	TIMEOUT = 60,
	CLOSE_TEXT = "CLOSE",
	BACK_TEXT = "^ BACK ^",
	LEFT_TEXT = "<<<",
	RIGHT_TEXT = ">>>",
}</code></pre>

- **CLOSE** : the main menu adds a "close" option.
- **BACK** : the submenus add a "back" option.
- **RETURN** : the main menu closes and the submenus go to the parent menu after chosing and option.
- **TIMEOUT** : second for the menu to time out.
- **CLOSE_TEXT** : text shown in the "close" option.
- **BACK_TEXT** : text shown in the "back" option.
- **LEFT_TEXT** : text shown in the previous page option in a multipage menu.
- **RIGHT_TEXT** : text shown in the next page option in a multipage menu.


**The table context:**

- It's a table used to share information among the different functions used in the menu.
- Initially it has the key   userId   with the id of the user of the menu.
- All functions called by the menu receive this table as parameter.
  - The action function receives it as its second parameter.
- All functions can use this table and edit it.


**Parameters for the main menu, as key values in the first table in the menu:**

- **message** : the text to display in the menu.
  - can be a string or a function returning a string.
  - the string can contain context keys between [ and ].
  - " message = " can be omitted is the message is in the first position in the table.

- **close** : if true a "close" option is added to the menu.

- **ret** : if true the menu closes after chosing an option.

- **say** : if true the full names of the options are said to the user in their chat.

- **timeout** : seconds to timeout the menu, replaces menu.TIMEOUT as default.

- **back_default** : replaces menu.BACK as default.

- **ret_default** : replaces menu.RETURN as default.

- **init** : function to execute once at the start of the menu.

- **entry** : function to execute when the menu is displayed.
  - if it returns false the menu is not displayed.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.

- **exit** : function to execute when the menu is closing.
  - if it returns false the menu is not closed and it is displayed again.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.


**Parameters for the submenus, as key values in the first table in the submenu:**

- **message** : the text to display in the menu.
  - can be a string or a function returning a string.
  - the string can contain context keys between [ and ].
  - " message = " can be omitted is the message is in the first position in the table.

- **back** : if true a "back" option is added to the menu.

- **ret** : if true the menu goes back to the previous menu after chosing an option.

- **say** : if true the full names of the options are said to the user in their chat.

- **timeout** : seconds to timeout the menu.

- **entry** : function to execute when the menu is displayed.
  - if it returns false the menu is not displayed.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.

- **exit** : function to execute when the menu is going back to the previous menu.
  - if it returns false the menu is not closed and it is displayed again.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.


**Parameters for each option in a menu, as key values in the other tables in the submenu:**

- **option** : the text to display in the menu button.
  - can be a string or a function returning a string.
  - can group several options that use the same action function:
    - can be an array table of strings or a function returning an array table of strings.
  - each string can contain context keys between [ and ].
  - " option = " can be omitted is the option is in the first position in the table.

- **action** : a function to call when the option is chosen.
  - it is called with the name of the option and the context table: actionFunction(optionName, context)
  - it can return:
    - false : to stay in the same menu and to display it again.
    - menu.MENU_CLOSE : to close all the menus.
    - nil (or no return value) : to use the "ret" parameter (to stay in the menu or not)
    - true (or a truthy value) : to go back to the previous menu or closes the main menu
  - " action = " can be omitted is the action is in the second position in the table.
    - only if "option = " has also been omitted and is in the first position in the table.

- **textbox** : the message for a textbox
  - a textbox is displayed before the action function is called.
  - the action function receives the text from the textbox in the parameter name.
  - the message can be a string or a function returning a string.
  - the string can contain context keys between [ and ].
  - with textbox = true the name of the option is used as message.

- **menu** : a table with the definition of a submenu
  - if "action" is defined "menu" is not used.

- **entry** : function to execute before the action function is called.
  - if it returns false the action is not executed and the same menu is displayed again.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.

- **exit** : function to execute after the action function is called.
  - if it returns false the same menu is displayed again
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.
   
**Menus are started with:**  
<code class="language-sluab">menu.open(tableMenu, userId)</code>

### Example 1: a yes/no menu

<div class="script-box beginner">
<h4>Yes/no</h4>
<p></p>
<pre class="language-sluab"><code class="language-sluab">-- start menu section

-- ===== COPY THE MENUS CODE HERE =====

-- end menu section

local function yesno(option, context)
    local userId = context.userId
    if option == "Yes" then
        ll.RegionSayTo(userId, 0, "You agree")
    elseif option == "No" then
        ll.RegionSayTo(userId, 0, "You disagree")
    end
end

local mainMenu = {
    { "choose yes or no", close = true },
    { "Yes", yesno },
    { "No", yesno },
}

LLEvents:on("touch_start", function(events)
    menu.open(mainMenu, events[1]:getKey())
end)</code></pre>
</div>

### Example 2: a movement menu

<div class="script-box beginner">
<h4>Movement</h4>
<p></p>
<pre class="language-sluab"><code class="language-sluab">-- start menu section

-- ===== COPY THE MENUS CODE HERE =====

-- end menu section

local COLORS = { BLACK = vector(0.067, 0.067, 0.067),  WHITE = vector(1.000, 1.000, 1.000),
    NAVY = vector(0.000, 0.122, 0.247),   BLUE = vector(0.000, 0.455, 0.851),   AQUA = vector(0.498, 0.859, 1.000),
    TEAL = vector(0.224, 0.800, 0.800),   OLIVE = vector(0.239, 0.600, 0.439),  GREEN = vector(0.180, 0.800, 0.251),
    LIME = vector(0.004, 1.000, 0.439),   YELLOW = vector(1.000, 0.863, 0.000), ORANGE = vector(1.000, 0.522, 0.106),
    RED = vector(1.000, 0.255, 0.212),    MAROON = vector(0.522, 0.078, 0.294), FUCHSIA = vector(0.941, 0.071, 0.745), 
    PURPLE = vector(0.694, 0.051, 0.788), SILVER = vector(0.867, 0.867, 0.867), GRAY = vector(0.667, 0.667, 0.667),
}

local COLOR_NAMES = {}
for color in COLORS do
    table.insert(COLOR_NAMES, color)
end

local MOVEMENTS = {
    North = vector(0, 1, 0),
    South = vector(0, -1, 0),
    East = vector(1, 0, 0),
    West = vector(-1, 0, 0),
    Up = vector(0, 0, 1),
    Down = vector(0, 0, -1),
}

local speed = 1

local function setPosition(option)
    ll.SetPos(ll.GetPos() + MOVEMENTS[option] * vector(speed, speed, speed))
end

local function setSpeed(option)
    speed *= if option == "faster" then 1.5 else 0.75
end

local function setSize(option)
    ll.SetScale(ll.GetScale() * if option == "bigger" then vector(1.5, 1.5, 1.5) else vector(0.75, 0.75, 0.75))
end

local function setColor(option)
    ll.SetColor(COLORS[option], ALL_SIDES)
end

local mainMenu = {
    { "Object control", close = true },
    { "move", menu = {
        { "Movements" },
        { { "North", "West", "Up", "South", "East", "Down" }, setPosition },
        { { "faster", "slower" }, setSpeed },
    }},
    { { "bigger", "smaller" }, setSize },
    { "color", menu = {
        { "Color", ret = true },
        { COLOR_NAMES, setColor },
    }},
}

LLEvents:on("touch_start", function(events)
    menu.open(mainMenu, events[1]:getKey())
end)</code></pre>
</div>

### Example 3: an information menu

<div class="script-box intermediate">
<h4>Information</h4>
<p></p>
<pre class="language-sluab"><code class="language-sluab">-- start menu section

-- ===== COPY THE MENUS CODE HERE =====

-- end menu section

local ATTACH_POINTS = { "Not attached",
                        "Chest",         "Skull",         "L Shoulder",   "R Shoulder",  "L Hand",
                        "R Hand",        "L Foot",        "R Foot",       "Spine",       "Pelvis",
                        "Mouth",         "Chin",          "L Ear",        "R Ear",       "L Eye",
                        "R Eye",         "Nose",          "R Upper Arm",  "R Lower Arm", "L Upper Arm",
                        "L Lower Arm",   "R Hip",         "R Upper Leg",  "R Lower Leg", "L Hip",
                        "L Upper Leg",   "L Lower Leg",   "Stomach",      "L Pectoral",  "R Pectoral",
                        "HUD Center 2",  "HUD Top R",     "HUD Top",      "HUD Top L",   "HUD Center",
                        "HUD Bottom L",  "HUD Bottom",    "HUD Bottom R", "Neck",        "Avatar Center",
                        "L Ring Finger", "R Ring Finger", "Tail Base",    "Tail Tip",    "L Wing",
                        "R Wing",        "Jaw",           "Alt L Ear",    "Alt R Ear",   "Alt L Eye",
                        "Alt R Eye",     "Tongue",        "Groin",        "L Hind Foot", "R Hind Foot" }

local LANGUAGES = { en = "English",   da = "Danish",     de = "German",    es = "Spanish",
                    fr = "French",    it = "Italian",    hu = "Hungarian", nl = "Dutch",
                    pl = "Polish",    pt = "Portuguese", ru = "Russian",   tr = "Turkish",
                    uk = "Ukrainian", zh = "Chinese",    ja = "Japanese",  ko = "Korean" }

local myPos = ll.GetPos()
local myName = ll.GetObjectName()

local function peopleButtons()
    local peopleButtons = {}
    local people = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, personId in people do
        local personName = `{ll.GetDisplayName(personId)} ({ll.GetUsername(personId)})`
        table.insert(peopleButtons, personName)
    end
    table.sort(peopleButtons)
    return peopleButtons
end

local function findPerson(optionName)
    local foundId = NULL_KEY
    local people = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, personId in people do
        local personName = `{ll.GetDisplayName(personId)} ({ll.GetUsername(personId)})`
        if optionName:sub(1, 23) == personName:sub(1, 23) then
            foundId = personId
            break
        end
    end
    return foundId
end

local function sayHeight(_, context)
    local userId = context.userId
    local heights = {}
    local people = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, personId in people do
        local size = ll.GetAgentSize(personId);
        if size ~= ZERO_VECTOR then
            table.insert(heights, { height = math.round(size.z * 100) / 100, personId = personId })
        end
    end
    table.sort(heights, function(a, b) return a.height <= b.height end)
    ll.RegionSayTo(userId, 0, "Heights:")
    ll.SetObjectName(":")
    for _, height in heights do
        ll.RegionSayTo(userId, 0, `    {(tostring(height.height)):sub(1, 4)}     secondlife:///app/agent/{height.personId}/about`)
    end
    ll.SetObjectName(myName)
end

local function sayComplexity(_, context)
    local userId = context.userId
    local complexities = {}
    local people = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, personId in people do
        local complexity = ll.GetObjectDetails(personId, {OBJECT_RENDER_WEIGHT})[1]
        if complexity > 0 then
            table.insert(complexities, { complexity = complexity, personId = personId })
        end
    end
    table.sort(complexities, function(a, b) return a.complexity <= b.complexity end)
    ll.RegionSayTo(userId, 0, "Complexities:")
    ll.SetObjectName(":")
    for _, complexity in complexities do
        ll.RegionSayTo(userId, 0, `    {complexity.complexity}     secondlife:///app/agent/{complexity.personId}/about`)
    end
    ll.SetObjectName(myName)
end

local function sayLanguage(_, context)
    local userId = context.userId
    local languages = {}
    local people = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, personId in people do
        local language = ll.GetAgentLanguage(personId):sub(1,2)
        if language ~= "" then
            table.insert(languages, { language = language, personId = personId })
        end
    end
    table.sort(languages, function(a, b) return a.language < b.language end)
    local lastLanguage = ""
    ll.RegionSayTo(userId, 0, "Languages:")
    ll.SetObjectName(":")
    for _, language in languages do
        if language.language ~= lastLanguage then
            local languageName = LANGUAGES[language.language] or language.language
            ll.RegionSayTo(userId, 0, " ")
            ll.RegionSayTo(userId, 0, `---------- {languageName} ----------`)
            lastLanguage = language.language
        end
        ll.RegionSayTo(userId, 0, `secondlife:///app/agent/{language.personId}/about`)
    end
    ll.SetObjectName(myName)
end

local function sayAttachments(optionName, context)
    local userId = context.userId
    local personId = findPerson(optionName)
    if personId.istruthy then
        local attachments = ll.GetAttachedList(personId)
        local messages = {}
        for _, attachmentId in attachments do
            local attachmentDetails = ll.GetObjectDetails(attachmentId, {OBJECT_NAME, OBJECT_DESC, OBJECT_CREATOR, OBJECT_ATTACHED_POINT})
            local name, desc, creator, attachedPoint = unpack(attachmentDetails)
            local message = `{name} ({desc}) secondlife:///app/agent/{creator}/about ({ATTACH_POINTS[attachedPoint]})`
            table.insert(messages, message)
        end
        table.sort(messages)
        ll.RegionSayTo(userId, 0, "Attachments of secondlife:///app/agent/" .. tostring(personId) .. "/about:")
        ll.SetObjectName(":")
        for _, message in messages do
            ll.RegionSayTo(userId, 0, message)
        end
        ll.SetObjectName(myName)
    else
        ll.RegionSayTo(userId, 0, menuText .. " is gone.")
    end
end

local mainMenu = {
    { "Information", close = true },
    { "Height", sayHeight },
    { "Complexity", sayComplexity },
    { "Language", sayLanguage },
    { "Attachments", menu = {
        { "Attachments", back = true, say = true },
        { peopleButtons, sayAttachments },
    }},
}

LLEvents:on("touch_start", function(events)
    menu.open(mainMenu, events[1]:getKey())
end)</code></pre>
</div>

### Example 4: a photoalbum menu

<div class="script-box advanced">
<h4>Photoalbum</h4>
<p></p>
<pre class="language-sluab"><code class="language-sluab">-- start menu section

-- ===== COPY THE MENUS CODE HERE =====

-- end menu section

local COLORS = { BLACK = vector(0.067, 0.067, 0.067),  WHITE = vector(1.000, 1.000, 1.000),
    NAVY = vector(0.000, 0.122, 0.247),   BLUE = vector(0.000, 0.455, 0.851),   AQUA = vector(0.498, 0.859, 1.000),
    TEAL = vector(0.224, 0.800, 0.800),   OLIVE = vector(0.239, 0.600, 0.439),  GREEN = vector(0.180, 0.800, 0.251),
    LIME = vector(0.004, 1.000, 0.439),   YELLOW = vector(1.000, 0.863, 0.000), ORANGE = vector(1.000, 0.522, 0.106),
    RED = vector(1.000, 0.255, 0.212),    MAROON = vector(0.522, 0.078, 0.294), FUCHSIA = vector(0.941, 0.071, 0.745), 
    PURPLE = vector(0.694, 0.051, 0.788), SILVER = vector(0.867, 0.867, 0.867), GRAY = vector(0.667, 0.667, 0.667) }

local ALBUM_POSITIONS = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" }
-- local ALBUM_POSITIONS = { "top", "near top", "half top", "far top", "mid top", "mid bottom", "far bottom", "half bottom", "near bottom", "bottom" }

local DISPLAY_SECONDS = { "3", "4", "5", "6", "7", "8", "10", "12", "15", "20", "30", "60" }

local DEFAULT_TEXTCOLOR = COLORS.BLUE
local DEFAULT_BACKCOLOR = COLORS.WHITE
local ME = NULL_KEY

local LINK_PICTURE = 1
local LINK_CONTROL_BAR = 2
local LINK_TEXT = { 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 }
local LINK_BACK = { 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 }
local FACE_PICTURE = 4
local FACE_CONTROL_BAR = 4
local FACE_BACK = 4

local CONTROL_BAR_UUID = "a4eed443-9a1c-ebee-2969-7cd9390d6ff3"
local CONTROL_BAR_OPTIONS = {}

local alphabet = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n\n\n\n\n"
local TEXTURE = "b2e7394f-5e54-aa12-6e1c-ef327b6bed9e"

local albums = { { name = "pictures", textColor = DEFAULT_TEXTCOLOR, backColor = DEFAULT_BACKCOLOR, ref = "|1000|" } }
local pictures = {}

local params = {
    albumRef = 1000,
    selectedAlbum = 1,
    selectedPicture = 0,
    publicTouch = true,
    sayPictureName = false,
    autoMove = false,
    displaySeconds = 5,
}

local function setText(text, color, linkNumber)

    local function getOffset(pos)
        local row = pos // 10
        local col = pos % 10
        return vector(-0.45 + (0.1 * col), 0.45 - (0.1 * row), 0.0)
    end

    for faceText = 0, ll.StringLength(text) - 1 do
        local letter = ll.GetSubString(text, faceText + 1, faceText + 1)
        local index = ll.SubStringIndex(alphabet, letter) - 1
        local offset = getOffset(index)
        ll.SetLinkPrimitiveParamsFast(linkNumber, {PRIM_TEXTURE, faceText, TEXTURE, vector(0.08, 0.08, 0), vector(offset.x, offset.y, 0), 0, PRIM_COLOR, faceText, color, 1})
    end
end

--
-- PHOTO ALBUMS (functions called from menu functions and others)
--

local timerMove

local function writeAlbums(album)

    local function writeAlbum(album)
        local name = (albums[album] or "").name or "    "
        while ll.StringLength(name) < 8 do
            name ..= " "
            if ll.StringLength(name) < 8 then
                name = " " .. name
            end
        end
        setText(name, if albums[album] then albums[album].textColor else DEFAULT_TEXTCOLOR, LINK_TEXT[album])
        ll.SetLinkPrimitiveParamsFast(LINK_BACK[album], {PRIM_COLOR, FACE_BACK, if albums[album] then albums[album].backColor else DEFAULT_BACKCOLOR, 1})
    end

    if album then
        writeAlbum(album)
    else
        for i = 1, 10 do
            writeAlbum(i)
        end
    end
end

local function autoMoving(autoMoving)
    params.autoMove = autoMoving
    if autoMoving then
        LLTimers:every(params.displaySeconds, timerMove)
        ll.SetLinkPrimitiveParamsFast(LINK_CONTROL_BAR, {PRIM_TEXTURE, FACE_CONTROL_BAR, CONTROL_BAR_UUID, vector(1, 0.5, 0), vector(0, 0.25, 0), 0})
    else
        LLTimers:off(timerMove)
        ll.SetLinkPrimitiveParamsFast(LINK_CONTROL_BAR, {PRIM_TEXTURE, FACE_CONTROL_BAR, CONTROL_BAR_UUID, vector(1, 0.5, 0), vector(0, -0.25, 0), 0})
    end
end

local function save()
    ll.LinksetDataWrite("|PARAMS|", lljson.encode(params))
    ll.LinksetDataWrite("|ALBUMS|", lljson.encode(albums))
end

local function getPictures(album)
    local ref = if albums[album] then albums[album].ref else "||"
    local albumPictures = {}
    local pics = ll.LinksetDataFindKeys(`^{ref}`, 1, 0)
    for _, pic in pics do
        table.insert(albumPictures, pic:split("|")[3])
    end
    return albumPictures
end

local function getAlbums()
    local albumNames = {}
    for i = 1, #albums do
        table.insert(albumNames, albums[i].name)
    end
    return albumNames
end

local function getColors()
    local colors = {}
    for color in COLORS do
        table.insert(colors, color)
    end
    return colors
end

local function changeMoving()
    autoMoving(not params.autoMove)
end

local function showPicture()
    local pictureName = pictures[params.selectedPicture]
    if pictureName then
        ll.SetLinkPrimitiveParamsFast(LINK_PICTURE, {PRIM_TEXTURE, FACE_PICTURE, pictureName, vector(1, 1, 0), vector(0, 0, 0), 0})
        if params.sayPictureName then
            ll.Whisper(0, pictureName)
        end
    end
end

local function showAlbum(album)
    pictures = getPictures(album)
    params.selectedPicture = 1
    showPicture()
end

--
-- PHOTO ALBUMS (functions called from menu)
--

local function newAlbum(name, context)
    name = ll.GetSubString(name, 1, 8)
    params.albumRef += 1
    local ref = "|" .. tostring(params.albumRef) .. "|"
    table.insert(albums, { name = name, textColor = DEFAULT_TEXTCOLOR, backColor = DEFAULT_BACKCOLOR, ref = ref })
    params.selectedAlbum = #albums
    context.selectedAlbumName = name
    ll.OwnerSay("The album " .. name .. " has been added")
    writeAlbums(params.selectedAlbum)
end

local function editAlbumName(name)
    local album = params.selectedAlbum
    name = ll.GetSubString(name, 1, 8)
    albums[album].name = name
    writeAlbums(album)
end

local function editAlbumTextColor(textColor)
    local album = params.selectedAlbum
    albums[album].textColor = COLORS[textColor]
    writeAlbums(album)
end

local function editAlbumBackColor(backColor)
    local album = params.selectedAlbum
    albums[album].backColor = COLORS[backColor]
    writeAlbums(album)
end

local function editAlbumPosition(position)
    local album = params.selectedAlbum
    local newPosition = table.find(ALBUM_POSITIONS, position)
    if newPosition ~= album then
        local albumInfo = albums[album]
        table.remove(albums, album)
        if newPosition <= #albums then
            table.insert(albums, newPosition, albumInfo)
        else
            table.insert(albums, albumInfo)
            newPosition = #albums
        end
        params.selectedAlbum = newPosition
        writeAlbums()
    end
end

local function deleteAlbum()
    local album = params.selectedAlbum
    local name = albums[album].name
    table.remove(albums, album)
    params.selectedAlbum = if #albums > 0 then 1 else 0
    ll.OwnerSay("The album " .. name .. " has been deleted")
    writeAlbums()
end

local function selectAlbum(albumName, context)
    params.selectedAlbum = table.find(getAlbums(), albumName)
    context.selectedAlbumName = albumName
end

local function movePicture()
    local album = params.selectedAlbum
    local pictureName = pictures[params.selectedPicture]
    local pic = ll.LinksetDataFindKeys(`|{pictureName}$`, 1, 1)[1]
    ll.LinksetDataDelete(pic)
    ll.LinksetDataWrite(albums[album].ref .. pictureName, " ")
    ll.OwnerSay("The picture " .. pictureName .. " has been moved to the album " .. albums[album].name)
    showAlbum(album)
end

local function setDisplaySeconds(seconds)
    params.displaySeconds = seconds
    autoMoving(params.autoMove)
end

local function setPublicTouch()
    params.publicTouch = not params.publicTouch
end

local function setSayPictureName()
    params.sayPictureName = not params.sayPictureName
end

--
-- PHOTO ALBUMS (functions called from control bar)
--

local function firstPicture()
    params.selectedPicture = 1
    showPicture()
end

local function previousPicture()
    params.selectedPicture -= 1
    if params.selectedPicture < 1 then
        params.selectedPicture = #pictures
    end
    showPicture()
end

local function nextPicture()
    params.selectedPicture += 1
    if params.selectedPicture > #pictures then
        params.selectedPicture = 1
    end
    showPicture()
end

local function lastPicture()
    params.selectedPicture = #pictures
    showPicture()
end

--
-- PHOTO ALBUMS (called by init)
--

local function load()
    local data = ll.LinksetDataRead("|PARAMS|")
    if data ~= "" then
        params = lljson.decode(data)
    end
    data = ll.LinksetDataRead("|ALBUMS|")
    if data ~= "" then
        albums = lljson.decode(data)
        for i = 1, #albums do
            albums[i].textColor = tovector(albums[i].textColor)
            albums[i].backColor = tovector(albums[i].backColor)
        end
        params.selectedAlbum = 1
    end
    save()
end

--
-- PHOTO ALBUMS (called by changed)
--

local function checkInventory()
    local album = params.selectedAlbum
    for i = 1, ll.GetInventoryNumber(INVENTORY_TEXTURE) do
        local pictureName = ll.GetInventoryName(INVENTORY_TEXTURE, i)
        if #ll.LinksetDataFindKeys(`|{pictureName}$`, 1, 1) == 0 then
            table.insert(pictures, pictureName)
            ll.LinksetDataWrite(albums[album].ref .. pictureName, " ")
            ll.OwnerSay("Picture " .. pictureName .. " added to album " .. albums[album].name)
            showAlbum(album)
        end
    end
    save()
end

--
-- PHOTO ALBUMS (menu entry/exit checks)
--

local function initMain(context)
    context.selectedAlbumName = albums[params.selectedAlbum].name
end

local function entryMain(context)
    context.setPublicTo = if params.publicTouch then "OFF" else "ON"
    context.setSayNameTo = if params.sayPictureName then "OFF" else "ON"
end

local function entryNewAlbum()
    if #albums == 10 then
        return false, "There are already 10 albums. It's not possible to add more"
    end
end

local function entryDeleteAlbum()
    if #albums < 2 then
        return false, "There is only one album. It's not possible to delete it"
    end
    if #getPictures(params.selectedAlbum) > 0 then
        return false, "The album has pictures. It's not possible to delete it"
    end
end

function timerMove()
    nextPicture()
end

local mainMenu = {
    { "Manage albums and options", init = initMain, entry = entryMain, close = true, timeout = 60, back_default = true, ret_default = false },
    { "New album", newAlbum, entry = entryNewAlbum, textbox = "Name of the new album" },
    { "Edit album", menu = {
        { "Editing the album [selectedAlbumName]" },
        { "Name", editAlbumName, textbox = "Name of the new album" },
        { "Text color", menu = {
            { "Editing the text color of the album [selectedAlbumName]", ret = true },
            { getColors, editAlbumTextColor },
        }},
        { "Back color", menu = {
            { "Editing the back color of the album [selectedAlbumName]", ret = true },
            { getColors, editAlbumBackColor },
        }},
        { "Position", menu = {
            { "Editing the position of the album [selectedAlbumName]", ret = true },
            { ALBUM_POSITIONS, editAlbumPosition },
        }},
    }},
    { "Delete album", menu = {
        { "Deleting the album [selectedAlbumName]", entry = entryDeleteAlbum, ret = true },
        { "Yes", deleteAlbum },
        { "No", deleteAlbum },
    }},
    { "Select album", menu = {
        { "Selecting an album", ret = true },
        { getAlbums, selectAlbum },
    }},
    { "Move picture", movePicture },
    { "Display seconds", menu = {
        { "Choosing display seconds", ret = true },
        { DISPLAY_SECONDS, setDisplaySeconds },
    }},
    { "Set publi [setPublicTo]", setPublicTouch },
    { "Set say [setSayNameTo]", setSayPictureName },
}

local function init()
    ME = ll.GetOwner()
    CONTROL_BAR_OPTIONS = { firstPicture, previousPicture, changeMoving, nextPicture, lastPicture }
    load()
    checkInventory()
    writeAlbums()
    showAlbum(params.selectedAlbum)
end

LLEvents:on("touch_start", function(events)
    local ev = events[1]
    local toucher = ev:getKey()
    local touchIndex = ev:getTouchST()
    local x = touchIndex.x
    local linkNumber = ev:getLinkNumber()
    if linkNumber == LINK_PICTURE then
        if toucher == ME then
            menu.open(mainMenu, ME)  -- open new menu
        end
    else
        if params.publicTouch or toucher == ME then
            if linkNumber == LINK_CONTROL_BAR then
                local optionBar = x // 0.2 + 1
                CONTROL_BAR_OPTIONS[optionBar]()
            else
                local index = table.find(LINK_TEXT, linkNumber)
                if index then
                    showAlbum(index)
                end
            end
        end
    end
end)

LLEvents:on("on_rez", function(start_param)
    ll.ResetScript()
end)

LLEvents:on("changed", function(change)
    if bit32.btest(change, CHANGED_INVENTORY) then
        checkInventory()
    end
    if bit32.btest(change, CHANGED_OWNER) then
        ll.ResetScript()
    end
end)

init()</code></pre>
</div>

### Menus code

<div class="script-box expert">
<h4>Menus</h4>
<p></p>
<pre class="language-sluab"><code class="language-sluab">-- Menus (by Suzanna Linn, 2025-12-09)
	
-- menu section, user configurable part

local menu = {
	CLOSE = true,
	BACK = true,
	RETURN = false,
	TIMEOUT = 60,
	CLOSE_TEXT = "CLOSE",
	BACK_TEXT = "^ BACK ^",
	LEFT_TEXT = "<<<",
	RIGHT_TEXT = ">>>",
}

-- menu section

menu.MENU_CLOSE = 0

math.randomseed(tonumber("0x" .. tostring(ll.GetKey()):sub(-8)))
menu._channel = -math.random(10000, 1999999999)

menu._users = {}

function menu._err(ok, message, ...)
	if not ok then
		error(message)
	end
	return message, ...
end

function menu._open(meTab, userId)
	local meDefParams = {}
	local meContext = { userId = userId }

	local function getDefParams()
		local params = meTab[1]
		meDefParams = {
			timeout = params.timeout or menu.TIMEOUT,
			back = if params.back_default ~= nil then params.back_default else menu.BACK,
			ret = if params.ret_default ~= nil then params.ret_default else menu.RETURN,
			close = menu.CLOSE,
		}
		if typeof(params.init) == "function" then
			params.init(meContext)
		end
	end

	local function showMenu(meTab, meLevel)
		local meParams = {}
		local meOptions = {}
		local meActions = {}
		local mePage = 1
		local meMultiPage = false
		local options = {}
		local id = ".,:;_~/*-+!?"

		local function getVars(msg)
			if typeof(msg) == "function" then
				msg = msg(meContext)
			end
			msg = tostring(msg):gsub("%[(.-)%]", function(key) return tostring(meContext[key] or "") end)
			return msg
		end

		local function orderButtons()
			local order = {}
			local len = #options

			local function duplicates()
				local dups = {}
				local idChar = 1
				for i = 1, len do
					options[i] = options[i]:sub(1,23)
				end
				for i = len, 1, -1 do
					if options[i] ~= " " then
						local found = table.find(options, options[i])
						if found < i then
							dups[found] = true
							dups[i] = true
						end
					end
				end
				for i in dups do
					options[i] = (options[i] .. string.rep(" ", 23)):sub(1,23) .. id:sub(idChar, idChar)
					idChar += 1
				end
			end

			duplicates()

			for _, i in { 2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9 } do
				if len > i then
					table.insert(order, options[len - i])
				end
			end
			return order
		end

		local function pageMenu()
			local numOptions = #meOptions
			local numBack = if meParams.back then 1 else 0
			local backText = if numBack == 1 then (if meLevel == 1 then menu.CLOSE_TEXT else menu.BACK_TEXT) else " "

			local function format(len)
				local opc = len % 3
				if opc > 0 then
					for i = 1, 3 - opc do
						table.insert(options, " ")
					end
				end
			end

			options = {}
			if numOptions + numBack > 12 then
				meMultiPage = true
				if mePage == 1 then
					table.move(meOptions, 1, 9, 1, options)
					table.move({ " ", backText, menu.RIGHT_TEXT }, 1 ,3, 10, options)
				else
					if numOptions > (mePage * 9) then
						table.move(meOptions, mePage * 9 - 8, mePage * 9, 1, options)
						table.move({ menu.LEFT_TEXT, backText, menu.RIGHT_TEXT }, 1 ,3, 10, options)
					else
						table.move(meOptions, mePage * 9 - 8, #meOptions, 1, options)
						format(#options)
						table.move({ menu.LEFT_TEXT, backText, " " }, 1 ,3, #options + 1, options)
					end
				end
			else
				table.move(meOptions, 1, numOptions, 1, options)
				format(numOptions + numBack)
				if meParams.back then
					table.insert(options, backText)
				end
			end
		end

		local function getParams()
			local params = meTab[1]
			meParams = {
				message = getVars(params.message or params[1] or " "),
				entry = params.entry,
				exit = params.exit,
				back = if meLevel == 1 then if params.close ~= nil then params.close else meDefParams.close
									else if params.back ~= nil then params.back else meDefParams.back,
				ret = if params.ret ~= nil then params.ret else meDefParams.ret,
				timeout = params.timeout or meDefParams.timeout,
				say = params.say or false,
			}
		end

		local function getOptions()
			meOptions = {}
			meActions = {}

			local function addOption(name, option)
				table.insert(meOptions, getVars(name))
				table.insert(meActions, option)
			end

			for i = 2, #meTab do
				local option = meTab[i]
				local names = option.option or option[1] or " "
				if typeof(names) == "function" then
					names = names(meContext)
				end
				if typeof(names) == "table" then
					for _, name in names do
						name = tostring(name)
						if name ~= "" then
							addOption(name, option)
						end  
					end
				else
					names = tostring(names)
					if names ~= "" then
						addOption(names, option)
					end
				end
			end
		end

		local function sayOptions()
			local text = ""
			for i = 1, #meOptions do
				if i % 3 == 1 then text ..= "\nline " .. tostring(i // 3 + 1) .. ":" end
				text ..= "\n    " .. meOptions[i]
			end
			ll.RegionSayTo(userId, 0, text .. "\n ")
		end


		local function checkFunction(checkFunc)
			local ok, message = true, ""
			if typeof(checkFunc) == "function" then
				ok, message = checkFunc(meContext)
				if ok == nil then ok = true end
				if not ok and message then
					message = tostring(message)
					if message ~= "" then
						ll.Dialog(userId, message, {}, menu._channel)
						coroutine.yield(meParams.timeout)
					end
				end
			end
			return ok
		end

		local function getActions(textOption)
			local indexOption = table.find(options, textOption)
			local numOptions = #options
			if textOption == " " then
				return false
			end
			if meMultiPage then
				if indexOption == numOptions - 1 then
					return true
				elseif indexOption == numOptions - 2 then
					mePage -= 1
					return false
				elseif indexOption == numOptions then
					mePage += 1
					return false
				end
			elseif meParams.back and indexOption == numOptions then
				return true
			end
			local index = (mePage - 1) * 9 + indexOption
			local name = meOptions[index]
			local actions = meActions[index]
			local action = actions.action or actions[2] or nil
			local ret
			if action then
				if checkFunction(actions.entry) then
					if actions.textbox then
						local message = tostring(if actions.textbox ~= true then getVars(actions.textbox) else name)
						ll.TextBox(userId, message, menu._channel)
						name = coroutine.yield(meParams.timeout)
					end
					ret = action(name, meContext)
					if not checkFunction(actions.exit) then
						ret = false
					end
				else
					ret = false
				end
				if ret == nil then ret = meParams.ret end
			elseif actions.menu then
				ret = showMenu(actions.menu, meLevel + 1)
			end
			return ret
		end

		getParams()

		local ret
		repeat
			if checkFunction(meParams.entry) then
				getOptions()
				pageMenu()
				if meParams.say then
					sayOptions()
				end
				ll.Dialog(userId, meParams.message, orderButtons(), menu._channel)
				ret = getActions(coroutine.yield(meParams.timeout))
				if ret and ret ~= menu.MENU_CLOSE then
					ret = checkFunction(meParams.exit)
				end
			else
				ret = true
			end
		until ret
		return if ret == menu.MENU_CLOSE then ret else false
	end

	getDefParams()
	showMenu(meTab, 1)
end

function menu._close(userId)
	coroutine.close(menu._users[userId].coro)
	ll.ListenRemove(menu._users[userId].listener)
	menu._users[userId] = nil
end

function menu._timeout(userId, time)
    if menu._users[userId].timeout then
        LLTimers:off(menu._users[userId].timeout)
    end
    if time then
        return LLTimers:once(time, (function()
            return function()
                menu._close(userId)
            end
        end)())
    end
end

function menu._select(userId, message)
    if menu._users[userId] then
        local coro = menu._users[userId].coro
        menu._users[userId].timeout = menu._timeout(userId, menu._err(coroutine.resume(coro, message)))
        if coroutine.status(coro) == "dead" then
            menu._close(userId)
        end
    end
end

LLEvents:on("listen", function(channel, name, id, message)
    if channel == menu._channel then
        menu._select(id, message)
    end
end)

function menu.open(meTab, userId)
    if menu._users[userId] then
        menu._close(userId)
    end
    local coro = coroutine.create(menu._open)
    menu._users[userId] = { 
        coro = coro,
        listener = ll.Listen(menu._channel, "", userId, ""),
    }
    menu._users[userId].timeout = menu._timeout(userId, menu._err(coroutine.resume(coro, meTab, userId)))
    if coroutine.status(coro) == "dead" then
        menu._close(userId)
    end
end

-- end of menu section</code></pre>
</div>


