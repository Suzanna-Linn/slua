---
layout: default
title: Slua Beta
slua_beta: true
---

## Giving contents

<div class="script-box beginner">
<h4>Basic</h4>
<p>Listing the contents with its type description</p>
<pre class="language-sluab"><code class="language-sluab">-- list all the contents with type description

local TYPES = {
    [0] = "Texture",
    [1] = "Sound",
    [3] = "Landmark",
    [5] = "Clothing",
    [6] = "Object",
    [7] = "Notecard",
    [10] = "Script",
    [13] = "Bodypart",
    [20] = "Animation",
    [21] = "Gesture",
    [56] = "Setting",
    [57] = "Material",
}

local function listInventory()
    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        local itemType = ll.GetInventoryType(itemName)
        local itemTypeDescription = TYPES[itemType]
        ll.OwnerSay(`{itemName} ({itemTypeDescription})`)
    end
end

LLEvents:on("touch_start", function(events)
    listInventory()
end)

--[[

list of constants for the inventory types:

    INVENTORY_ALL
    INVENTORY_TEXTURE
    INVENTORY_SOUND
    INVENTORY_LANDMARK
    INVENTORY_CLOTHING
    INVENTORY_OBJECT
    INVENTORY_NOTECARD
    INVENTORY_SCRIPT
    INVENTORY_BODYPART
    INVENTORY_ANIMATION
    INVENTORY_GESTURE

constant returned by ll.GetInventoryType(name) when name does not exist in the contents:

    INVENTORY_NONE

]]</code></pre>
</div>

<div class="script-box beginner">
<h4>Color change</h4>
<p>Giving the contents (except the scripts)</p>
<pre class="language-sluab"><code class="language-sluab">-- give all the contents except the scripts to the toucher

local function giveInventory(receiver)
    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        local itemType = ll.GetInventoryType(itemName)
        if itemType ~= INVENTORY_SCRIPT then
            ll.GiveInventory(receiver,itemName);
        end
    end
end

LLEvents:on("touch_start", function(events)
    for _, ev in events do
        local toucher = ev:getKey()
        giveInventory(toucher)
    end
end)</code></pre>
</div>

<div class="script-box beginner">
<h4>Text change</h4>
<p>Giving the contents in a folder</p>
<pre class="language-sluab"><code class="language-sluab">-- give all the contents except scripts in a folder

local function giveInventoryFolder(receiver)
    local items = {}
    local folderName = ll.GetObjectDesc()

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        local itemType = ll.GetInventoryType(itemName)
        if itemType ~= INVENTORY_SCRIPT then
            table.insert(items, itemName)
        end
    end

    ll.GiveInventoryList(receiver, folderName, items)
end

LLEvents:on("touch_start", function(events)
    for _, ev in events do
        local toucher = ev:getKey()
        giveInventoryFolder(toucher)
    end
end)</code></pre>
</div>

<div class="script-box beginner">
<h4>Text alternance</h4>
<p>Removing from the contents</p>
<pre class="language-sluab"><code class="language-sluab">-- remove an item from the contents

local function itemExists(name)
    return ll.GetInventoryType(name) ~= INVENTORY_NONE
end

local function removeInventory(name)
    if itemExists(name) then
        ll.RemoveInventory(name)
        ll.OwnerSay("The item '" .. name .. "' has been removed")
    else
        ll.OwnerSay("The item '" .. name .. "' does not exist")
    end
end

LLEvents:on("touch_start", function(events)
    removeInventory("Unuseful item")
end)</code></pre>
</div>

<div class="script-box beginner">
<h4>Horizontal scrolling</h4>
<p>Listing the contents of one type</p>
<pre class="language-sluab"><code class="language-sluab">-- list contents of one type

local TYPES = {
    [0] = "Texture",
    [1] = "Sound",
    [3] = "Landmark",
    [5] = "Clothing",
    [6] = "Object",
    [7] = "Notecard",
    [10] = "Script",
    [13] = "Bodypart",
    [20] = "Animation",
    [21] = "Gesture",
    [56] = "Setting",
    [57] = "Material",
}

local TYPE_CODES = {
    texture = 0,
    sound = 1,
    landmark = 3,
    clothing = 5,
    object = 6,
    notecard = 7,
    script = 10,
    bodypart = 13,
    animation = 20,
    gesture = 21,
    setting = 56,
    material = 57,
}

local INVENTORY_CHANNEL = 5  -- channel to listen for the inventory type to list

local function listInventory()
    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        local itemType = ll.GetInventoryType(itemName)
        local itemTypeDescription = TYPES[itemType]
        ll.OwnerSay(`{itemName} ({itemTypeDescription})`)
    end
end

local function listInventoryByType(type)
    type = type:lower()
    local typeCode = if type == "all" then INVENTORY_ALL else TYPE_CODES[type]

    if typeCode then
        for itemNumber = 1, ll.GetInventoryNumber(typeCode) do
            local itemName = ll.GetInventoryName(typeCode, itemNumber)
            local itemType = ll.GetInventoryType(itemName)
            local itemTypeDescription = TYPES[itemType]
            ll.OwnerSay(`{itemName} ({itemTypeDescription})`)
        end
    else
        ll.OwnerSay(`The type name {type} doesn't exist`)
    end
end

LLEvents:on("touch_start", function(events)
    listInventory()
end)

LLEvents:on("listen", function(channel, name, id, message)
    if channel == INVENTORY_CHANNEL then
        listInventoryByType(message)
    end
end)

ll.Listen(INVENTORY_CHANNEL, "", ll.GetOwner(), "")</code></pre>
</div>

<div class="script-box beginner">
<h4>Vertical scrolling</h4>
<p>Listing the total of contents of each type</p>
<pre class="language-sluab"><code class="language-sluab">-- list total contents by type (with hold-touch)

local TYPES = {
    [0] = "Texture",
    [1] = "Sound",
    [3] = "Landmark",
    [5] = "Clothing",
    [6] = "Object",
    [7] = "Notecard",
    [10] = "Script",
    [13] = "Bodypart",
    [20] = "Animation",
    [21] = "Gesture",
    [56] = "Setting",
    [57] = "Material",
}

-- to use touch and hold-touch
local isHoldTouch = false
local timeTouch = 0

local function listInventory()
    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        local itemType = ll.GetInventoryType(itemName)
        local itemTypeDescription = TYPES[itemType]
        ll.OwnerSay(`{itemName} ({itemTypeDescription})`)
    end
end

local function listInventoryTotals()
    local totals = {}

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        local itemType = ll.GetInventoryType(itemName)
        totals[itemType] = (totals[itemType] or 0) + 1
    end

    for itemType, total in totals do
        ll.OwnerSay(`{total} {TYPES[itemType]}`)
    end
end

LLEvents:on("touch_start", function(events)
    timeTouch = ll.GetTime()
    isHoldTouch = false
end)

LLEvents:on("touch", function(events)
    -- hold-touch to list the totals
    if ll.GetTime() - timeTouch > 1 and not isHoldTouch then
        isHoldTouch = true
        listInventoryTotals()
    end
end)

LLEvents:on("touch_end", function(events)
    -- touch to list the details
    if not isHoldTouch then
        listInventory()
    end
end)</code></pre>
</div>

<div class="script-box intermediate">
<h4>Bicolor</h4>
<p>A floating text that scrolls using two colors for alternating lines:</p>
<img src="images/bicolor.jpg" alt="Bicolor">
<p>Floating texts have only one color, and prims only one floating text.</p>
<p>We need two identical prims rezzed in the same position. Each prim shows half of the lines in one color.</p>
<p>The script must be in both prims. It identifies what text and color to display using the prim description. The descriptions must be "floating 1" and "floating 2", as defined in the table primDecs in the script.</p>
<pre class="language-sluab"><code class="language-sluab">-- floating text with vertical scroll in two colors (by Suzanna Linn, 2025-08-28)

local COLOR = {
    NAVY =   vector(0.000, 0.122, 0.247),  BLUE =    vector(0.000, 0.455, 0.851),
    AQUA =   vector(0.498, 0.859, 1.000),  TEAL =    vector(0.224, 0.800, 0.800),
    OLIVE =  vector(0.239, 0.600, 0.439),  GREEN =   vector(0.180, 0.800, 0.251), 
    LIME =   vector(0.004, 1.000, 0.439),  YELLOW =  vector(1.000, 0.863, 0.000),
    ORANGE = vector(1.000, 0.522, 0.106),  RED =     vector(1.000, 0.255, 0.212),
    MAROON = vector(0.522, 0.078, 0.294),  FUCHSIA = vector(0.941, 0.071, 0.745),
    PURPLE = vector(0.694, 0.051, 0.788),  WHITE =   vector(1.000, 1.000, 1.000),
    SILVER = vector(0.867, 0.867, 0.867),  GRAY =    vector(0.667, 0.667, 0.667),
    BLACK =  vector(0.067, 0.067, 0.067)
}

local colors = { COLOR.WHITE, COLOR.AQUA }

local MESSAGE_LINES = 6  -- lines displayed in the floating text, must be a multiple of the number of prims

local primDescs = {"floating 1", "floating 2"}  -- prims descriptions

local primDesc = ll.GetObjectDesc()
local primIndex = table.find(primDescs, primDesc)
-- position of this prim in the list of prims,
-- to know with which line and color to start

local text = {
    " ",
    "The Programmer’s Plight",
    "by ChatGPT",
    " ",
    "I sit before my screen so bright,",
    "Prepared to code into the night.",
    "With coffee brewed and mind set free,",
    "I’ll write the best code there can be!",
    "The first line’s typed, my spirits soar—",
    "But syntax errors? Ten or more!",
    "A missing semicolon here,",
    "A bracket gone, a loop unclear.",
    "The logic flows, or so I think,",
    "Until it stops—my mind’s on the brink.",
    "I debug, squint, refactor twice,",
    "Yet still, the code won’t play nice.",
    "Oh, variables that hide and flee,",
    "Why can’t you just show up for me?",
    "I search and search through lines galore,",
    "And then—my laptop hits the floor.",
    "I restart fresh, with patience thin,",
    "And swear this time that I’ll win.",
    "A dozen tabs open at once,",
    "Google knows I’m now a dunce.",
    "Then suddenly! The screen displays,",
    "A program running, earning praise!",
    "Victory dance, a cheer I shout—",
    "Until it crashes… I’m logged out.",
    "Oh, coding’s tough but full of charm,",
    "With bugs that chase and cause alarm.",
    "But I’ll return, it’s love and pain—",
    "Tomorrow night, I’ll code again."
}

local textPos = 1
local alpha = 1.0

local function displayText()
    local textShown = {}
    for i = textPos, textPos + MESSAGE_LINES - 1 do
        table.insert(textShown, text[ if i > #text then i - #text else i ])
    end
    for i = 1, MESSAGE_LINES do
        if (i - 1) % #primDescs + 1 ~= primIndex then
            textShown[i] = " "
        end
    end
    local color = colors[ ((textPos - 1) + (primIndex - 1)) % #primDescs + 1 ]
    ll.SetText(table.concat(textShown, "\n"), color, alpha)
    textPos += 1
    if textPos == #text then
        textPos = 1
    end
end

if primIndex then
    if #text < MESSAGE_LINES then
        MESSAGE_LINES = #text
    end
    displayText()
    LLTimers:every(5, displayText)
else
    ll.OwnerSay(primDesc .. " is not in the table")
end</code></pre>
</div>

<div class="script-box intermediate">
<h4>Multicolor</h4>
<p>A floating text with seven colors for the rainbow:</p>
<img src="images/rainbow.jpg" alt="Rainbow">
<p>It works like the previous example. Here there are seven identical prims in the same position, with descriptions from "floating 1" to "floating 7". Each prim shows a letter in a different color.</p>
<pre class="language-sluab"><code class="language-sluab">-- floating text in rainbow colors (by Suzanna Linn, 2025-08-28)

local letters = {
    ["floating 1"] = { color = vector(1.0, 0.0, 0.0),     text = "R                  "  },  -- red
    ["floating 2"] = { color = vector(1.0, 0.498, 0.0),   text = "   A               "  },  -- orange
    ["floating 3"] = { color = vector(1.0, 1.0, 0.0),     text = "      I             " },  -- yellow
    ["floating 4"] = { color = vector(0.0, 1.0, 0.0),     text = "        N          "  },  -- green
    ["floating 5"] = { color = vector(0.0, 0.0, 1.0),     text = "           B       "  },  -- blue
    ["floating 6"] = { color = vector(0.294, 0.0, 0.510), text = "              O   "   },  -- indigo
    ["floating 7"] = { color = vector(0.561, 0.0, 1.0),   text = "                 W"   }   -- violet
}

local alpha = 1.0

local primDesc = ll.GetObjectDesc()

if letters[primDesc] then
    local color = letters[primDesc].color
    local text = letters[primDesc].text
    ll.SetText(text, color, alpha)
else
    ll.OwnerSay(primDesc .. " is not in the table")
end</code></pre>
</div>
