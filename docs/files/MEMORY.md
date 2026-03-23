
local TIMER_SECONDS = 2
local TEXTURE_FACE = 2

local textures = {}
local texturePrims = {}
local touchedTexture = ""
local touchedPrims = {}
local score = {}
local isTouchActive = false
local isMatch = false

local function getTextures()
    textures = {}
    for i = 1, 12 do
        table.insert(textures, ll.GetInventoryName(INVENTORY_TEXTURE, i))
    end
    textures = ll.ListRandomize(textures, 1)
end

local function showTexture(link, texture)
    ll.SetLinkPrimitiveParamsFast(link, {PRIM_TEXTURE, TEXTURE_FACE, texture, vector(1, 1, 1), vector(0, 0, 0), 0})
end

local function hideTexture(link)
    ll.SetLinkPrimitiveParamsFast(link, {PRIM_TEXTURE, TEXTURE_FACE, TEXTURE_BLANK, vector(1, 1, 1), vector(0, 0, 0), 0})
end

local function isTextureShown(link)
    return uuid(ll.GetLinkPrimitiveParams(link, {PRIM_TEXTURE, TEXTURE_FACE})[1]) ~= TEXTURE_BLANK
end

local function selectTextures()
    local randomTextures = {}
    local rnd = 0
    table.move(textures, 1, 6, 1, randomTextures)
    table.move(textures, 1, 6, 7, randomTextures)
    texturePrims = {}
    for i = 1, 12 do
        hideTexture(i + 1)
        rnd = math.random(13 - i)
        table.insert(texturePrims, randomTextures[rnd])
        table.remove(randomTextures, rnd)
    end
end

local function listScore()
    local sorting = {}
    local text = "Score table:"
    for userId, points in score do
        table.insert(sorting, { userId = userId, points = points })
    end
    table.sort(sorting, function(a, b)
        return a.points > b.points
    end)
    for _, score in sorting do
        text ..= "\n" .. score.points .. "    " .. ll.GetDisplayName(score.userId)
    end
    ll.Say(0, text .. "\n\n")
end

local function timer()
    if not isMatch then
        for i = 1, #touchedPrims do
            hideTexture(touchedPrims[i])
        end
    end
    touchedTexture = ""
    touchedPrims = {}
    isTouchActive = true
end

local function match(toucherId, matched)
    local name = ""
    isTouchActive = false
    isMatch = matched
    if matched then
        name = ll.GetDisplayName(toucherId)
        ll.Say(0, name .. " has got a match!")
        score[toucherId] = (score[toucherId] or 0) + 1
        listScore()
    else
        ll.Say(0, "pictures don't match")
    end
    LLTimers:once(TIMER_SECONDS, timer)
end

local function touchPrim(toucherId, link)
    local texture = ""
    if link > 1 then
        if not isTextureShown(link) then
            texture = texturePrims[link - 1]
            showTexture(link, texture)
            table.insert(touchedPrims, link)
            if touchedTexture == "" then
                touchedTexture = texture
            else
                if texture == touchedTexture then
                    if #touchedPrims == 2 then
                        match(toucherId, true)
                    end
                else
                    match(toucherId, false)
                end
            end
        end
    else
        listScore()
    end
end

local function initialize()
    getTextures()
    selectTextures()
    isTouchActive = true
end

function LLEvents.touch_start(events)
    if isTouchActive then
        local ev = events[1]
        touchPrim(ev:getKey(), ev:LinkNumber())
    end
end

function LLEvents.on_rez(start_param)
    ll.ResetScript()
end

initialize()
