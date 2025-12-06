---
layout: default
title: Giving contents
slua_beta: true
---

## Giving contents

<div class="script-box beginner">
<h4>List</h4>
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
<h4>Give</h4>
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
<h4>Give folder</h4>
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
<h4>Remove</h4>
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
<h4>List one type</h4>
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
<h4>List types totals</h4>
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
<h4>Find by type</h4>
<p>Finding items by type</p>
<pre class="language-sluab"><code class="language-sluab">-- find items by types (optional variadic multi-return function)

function findItemsByType(...)
    local types = if select("#", ...) == 0 then { INVENTORY_ALL } else { ... }
    local found = {}
    for _, type in types do
        for itemNumber = 1, ll.GetInventoryNumber(type) do
            local itemName = ll.GetInventoryName(type, itemNumber)
            table.insert(found, itemName)
        end
    end
    return found, #found
end

-- find notecards and textures
local items, total = findItemsByType(INVENTORY_NOTECARD, INVENTORY_TEXTURE)
print(`{total} items: {table.concat(items, ", ")}`)

-- find all
local items, total = findItemsByType()
print(`{total} items: {table.concat(items, ", ")}`)</code></pre>
</div>

<div class="script-box intermediate">
<h4>Give to visitors</h4>
<p>Giving contents to the visitors the first time that they come</p>
<p>Use this script in an object, like a welcome mat, at the door</p>
<pre class="language-sluab"><code class="language-sluab">-- give contents to visitors, to be used in a collider object

local THIS_SCRIPT = ll.GetScriptName()

local givenPeople = {}

local function giveInventory(receiver)
    local items = {}
    local folderName = ll.GetObjectDesc()

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        if itemName ~= THIS_SCRIPT then
            table.insert(items, itemName)
        end
    end

    ll.GiveInventoryList(receiver, folderName, items)
end

local function addGiven(personId)
    local index = table.find(givenPeople, personId)
    -- if the person is in the list, delete them to add again in the last position
    if index then
        table.remove(givenPeople, index)
    end
    table.insert(givenPeople, personId)  -- adding at the end of the list
    -- to avoid script memory issues we only keep the last 500 people
    if #givenPeople > 500 then
        table.remove(givenPeople, 1)
    end
end

LLEvents:on("touch_start", function(events)
    for _, ev in events do
        local toucher = ev:getKey()
        -- if they touch we always give, no matter if they are in the list of given people
        giveInventory(toucher)
        -- we add them to the list, to not give on collision
        addGiven(toucher)
    end
end)

LLEvents:on("collision_start", function(events)
    for _, ev in events do
        local toucher = ev:getKey()
        if not table.find(givenPeople, toucher) then
            -- we give if they are not in the list of given people
            giveInventory(toucher)
        end
        addGiven(toucher) 
    end
end)

LLEvents:on("on_rez", function(start_param)
    ll.ResetScript()
end)

LLEvents:on("changed", function(change)
    if bit32.btest(change, bit32.bor(CHANGED_OWNER, CHANGED_INVENTORY)) then
        ll.ResetScript()  -- to empty the list of given people when we change the contents
    end
end)

ll.VolumeDetect(true)  -- make the object a collision detector</code></pre>
</div>

<div class="script-box intermediate">
<h4>Give contents HUD</h4>
<p>Giving the contents placed in the object to the nearby people</p>
<p>Use this script in a HUD</p>
<pre class="language-sluab"><code class="language-sluab">-- HUD to give contents to nearby people

local GIVING_RANGE = 40  -- max distance to give

local ME = ll.GetOwner()
local THIS_SCRIPT = ll.GetScriptName()
local PERMS_COPY_TRANSFER = bit32.bor(PERM_COPY, PERM_TRANSFER)

local WHITE = vector(1, 1, 1)
local RED = vector(1, 0, 0)
local GREEN = vector(0, 0.5, 0)

local folderName = ""

local function getFolderName()
    -- folder name is the name of the first item
    local itemName = ll.GetInventoryName(INVENTORY_ALL, 1)

    if itemName == THIS_SCRIPT then
        -- if the first item happens to be this script use the second item
        itemName = ll.GetInventoryName(INVENTORY_ALL, 2)
    end

    return itemName
end

local function checkInventoryPerms()
    local hasPerms = true
    local text = ""

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        if itemName ~= THIS_SCRIPT then
            local itemOwnerPerms = ll.GetInventoryPermMask(itemName, MASK_OWNER)
            if bit32.band(itemOwnerPerms, PERMS_COPY_TRANSFER) ~= PERMS_COPY_TRANSFER then
                ll.OwnerSay(`{itemName} is not copy-transfer`)
                hasPerms = false
            end
            text ..= "\n" .. itemName
        end
    end

    ll.SetText(text, WHITE, 1)
    return hasPerms
end

local function checkContents()
    local totalItems = ll.GetInventoryNumber(INVENTORY_ALL)
    if totalItems == 1 then
        ll.SetColor(WHITE, ALL_SIDES)
        ll.OwnerSay("Empty, drop items")
        folderName = ""
        ll.SetText("", ZERO_VECTOR, 0)
    else
        if totalItems == 2 then
            folderName = getFolderName()
        end
        if checkInventoryPerms() then
            ll.SetColor(GREEN, ALL_SIDES)
            ll.OwnerSay(`Ready, {totalItems - 1} items, drop more or touch to give`)
        else
            ll.SetColor(RED, ALL_SIDES)
            ll.OwnerSay("Error, check properties")
        end
    end
end

local function getInventory()
    local items = {}

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        if itemName ~= THIS_SCRIPT then
            table.insert(items, itemName)
        end
    end

    return items
end

local function removeInventory()
    for itemNumber = ll.GetInventoryNumber(INVENTORY_ALL), 1, -1 do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        if itemName ~= THIS_SCRIPT then
            ll.RemoveInventory(itemName)
        end
    end
end

local function giveInventory()
    local items = getInventory()
    local people = ll.GetAgentList(AGENT_LIST_PARCEL, {})
    local myPos = ll.GetPos()
    local peopleSent = 0

    ll.OwnerSay("Sending...")
    for _, personId in people do
        if personId ~= ME then
            local personPos = ll.GetObjectDetails(personId, {OBJECT_POS})[1]
            local personDistance = ll.VecDist(myPos, personPos)
            if personDistance < GIVING_RANGE then
                ll.GiveInventoryList(personId, folderName, items)
                peopleSent += 1
                ll.OwnerSay("Given to " .. ll.GetDisplayName(personId))
            end
        end
    end

    removeInventory()
    ll.OwnerSay(`{#items} items given to {peopleSent} people`)
    checkContents()
end

local function initialize()
    local objectName = ll.GetDisplayName(ME) .. "'s contents giver"
    ll.SetObjectName(objectName)
    if ll.GetObjectName() ~= objectName then
        -- name has unicode characters, changed to "?" in the object name
        ll.SetObjectName(ll.GetUsername(ME) .. "'s contents giver")
    end
    checkContents()
end

LLEvents:on("touch_start", function(events)
    if ll.GetColor(ALL_SIDES) == GREEN then
        giveInventory()
    else
        ll.OwnerSay("Not ready, drop items")
    end
end)

LLEvents:on("changed", function(change)
    if bit32.btest(change, CHANGED_INVENTORY) then
        checkContents()
    end
    if bit32.btest(change, CHANGED_OWNER) then
        ll.ResetScript()
    end
end)

LLEvents:on("on_rez", function(start_param)
    ll.ResetScript()
end)

initialize()</code></pre>
</div>

<div class="script-box intermediate">
<h4>Give a random item</h4>
<p>Giving a random item to the visitors only after some time</p>
<p>Useful to encourage visitors to come regularly to get all the items</p>
<pre class="language-sluab"><code class="language-sluab">-- random giver with wait time

local HOURS = 3  -- hours between gives, HOURS=0 one give daily (SL time)

local THIS_SCRIPT = ll.GetScriptName()

local setMidnightTimer

local function sendGift(toucher)
    local items = {}

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        if itemName ~= THIS_SCRIPT then
            table.insert(items, itemName)
        end
    end

    local randomItem = math.random(1, #items)
    local wait = if HOURS == 0 then "tomorrow (SL time)" else "in " .. tostring(HOURS) .. " hours"
    ll.RegionSayTo(toucher, 0, "Your gift is on the way, you can get a gift again " .. wait)
    ll.GiveInventory(toucher, items[randomItem])
end

local function newDay()
    if HOURS ~= 0 then
        local keys = ll.LinksetDataListKeys(1, 0)
        for _, key in keys do
            local lastGift = tonumber(ll.LinksetDataRead(key))
            if 86400 - lastGift < HOURS * 3600 then
                ll.LinksetDataWrite(key, tostring(lastGift - 86400))
            else
                ll.LinksetDataDelete(key)
            end
        end
    else
        ll.LinksetDataReset()
    end
    setMidnightTimer()
end

local function giftReady(toucher)
    local ok = true
    local time = ll.GetWallclock()
    if time < (tonumber(ll.LinksetDataRead(" ")) or 0) then
        newDay()
    end
    local lastGift = tonumber(ll.LinksetDataRead(tostring(toucher)))
    if lastGift then
        if HOURS == 0 then
            ok = false
            ll.RegionSayTo(toucher, 0, "Your next gift will be ready tomorrow (in SL time)")
        elseif (time - lastGift) / 3600 < HOURS then
            ok = false
            local timeWait = HOURS - ((time - lastGift) / 3600)
            local hours = math.floor(timeWait)
            local minutes = math.ceil((timeWait - hours) * 60)
            ll.RegionSayTo(toucher, 0, "Your next gift will be ready in " .. string.format("%d:%02d", hours, minutes) .. " hours")
        end
    end
    if ok then
        ll.LinksetDataWrite(tostring(toucher), tostring(time))
    end
    setMidnightTimer()
    return ok
end

function setMidnightTimer()
    local time = ll.GetWallclock()
    ll.LinksetDataWrite(" ", tostring(time))
    LLTimers:off(newDay)
    LLTimers:once(86400 - time + 1, newDay)
end

LLEvents:on("touch_start", function(events)
    for _, ev in events do
        local toucher = ev:getKey()
        if giftReady(toucher) then
            sendGift(toucher)
        end
    end
end)

math.randomseed(os.time)
setMidnightTimer()</code></pre>
</div>

<div class="script-box intermediate">
<h4>Unpacker</h4>
<p>Unpacking items into a folder, with options for contact and information</p>
<p>The script is configured for this image:</p>
<img src="images/unpacker-suzanna.jpg" alt="Unpacker image" width="256">
<br>
<a href="images/unpacker.jpg" download>Download here an unnamed image to use adding your name</a>
<pre class="language-sluab"><code class="language-sluab">-- unpacker (by Suzanna Linn, 2025-12-05)


-- replace this section with your data

local OPTIONS = { "INFO", "CONTACT", "UNPACK" }

-- circles on top must come before circles underneath
local CIRCLES = { vector(0.253, 0.780, 0.146), vector(0.747, 0.780, 0.146), vector(0.485, 0.485, 0.342) }

local TEXTURE_UNPACK = uuid("c4125f85-ad79-c446-8dd0-85c2a733529a")  -- your texture for the unpacker HUD
local NOTECARD_INFO = "Hi, I'm Suzanna, nice to meet you :)"         -- name of your notecard with info (in the object contents)
local CONTACT_UUID = uuid("0f16c0e1-384e-4b5f-b7ce-886dda3bce41")    -- your uuid

-- end of replace section



local function findOption(touchPos)
    local option

    for index, circle in CIRCLES do
        local radius = circle.z
        circle = vector(circle.x, circle.y, 0)
        if ll.VecDist(circle, touchPos) <= radius then
            option = OPTIONS[index]
            break
        end
    end

    return option
end

local function unpackContents(toucher)
    local items = {}
    local folderName = (ll.GetObjectName():split(" ("))[1]

    for itemNumber = 1, ll.GetInventoryNumber(INVENTORY_ALL) do
        local itemName = ll.GetInventoryName(INVENTORY_ALL, itemNumber)
        if itemName ~= ll.GetScriptName() and itemName ~= NOTECARD_INFO then
            table.insert(items, itemName)
        end
    end

    if #items > 0 then
        ll.RegionSayTo(toucher, 0, "Unpacking to your folder " .. folderName .. "...")
        ll.GiveInventoryList(toucher, folderName, items)
    else
        ll.RegionSayTo(toucher, 0, "Sorry, there aren't items to unpack")
    end

    ll.RequestPermissions(toucher, PERMISSION_ATTACH)
end

local function unpackOrInfo(toucher, touchPos)
    local option = findOption(touchPos)
    if option == "UNPACK" then
        unpackContents(toucher)
    elseif option == "INFO" then
        ll.GiveInventory(toucher, NOTECARD_INFO)
    elseif option == "CONTACT" then
        ll.RegionSayTo(toucher, 0, "secondlife:///app/agent/" .. tostring(CONTACT_UUID) .. "/about")
    end
end

LLEvents:on("touch_start", function(events)
    for _, ev in events do
        local toucher = ev:getKey()
        local touchPos = ev:getTouchST()
        touchPos = vector(touchPos.x, 1 - touchPos.y, touchPos.z)
        unpackOrInfo(toucher, touchPos)
    end
end)

LLEvents:on("run_time_permissions", function(perm)
    if bit32.btest(perm, PERMISSION_ATTACH) then
        ll.DetachFromAvatar()
    end
end)

ll.SetTexture(TEXTURE_UNPACK, ALL_SIDES)</code></pre>
</div>
