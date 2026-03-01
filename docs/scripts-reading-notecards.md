---
layout: default
title: Reading notecards
slua_beta: true
---
## Reading notecards

Notecards used in the examples:
- <a href="texts/lorem-ipsum.txt">Lorem Ipsum</a>
- <a href="texts/fluffernutter.txt">Fluffernutter</a>
- <a href="texts/config.txt">config</a>
- <a href="texts/poems.txt">poems</a>

### Reading

Reading a notecard with **ll.GetNotecardLineSync()**

<div class="script-box beginner">
<h4>Reading a notecard</h4>
<pre class="language-sluab line-numbers"><code class="language-sluab">local notecardName = ""
local notecardLine = 1
local requestLineId = NULL_KEY
local notecard = {}

local function listNotecard()
    for _, line in notecard do
        ll.OwnerSay(line)
    end
end

LLEvents:on("touch_start", function(events)
    notecardName = ll.GetInventoryName(INVENTORY_NOTECARD, 1)
    if notecardName ~= "" then
        notecard = {}
        notecardLine = 1
        requestLineId = ll.GetNotecardLine(notecardName, notecardLine)
    end
end)

LLEvents:on("dataserver", function(request, data)
    if request == requestLineId then
        while data ~= EOF do
            if data == NAK then
                requestLineId = ll.GetNotecardLine(notecardName, notecardLine)
                return
            else
                table.insert(notecard, data)
                notecardLine += 1
                data = ll.GetNotecardLineSync(notecardName, notecardLine)
            end
        end
        listNotecard()
    end
end)</code></pre>
</div>

### Finding text

Finding text in a notecard with **ll.FindNotecardTextSync()**

<div class="script-box intermediate">
<h4>Finding text in a notecard</h4>
<pre class="language-sluab line-numbers"><code class="language-sluab">local notecardName = "Lorem Ipsum"

local FIND_TEXT_STRIDE = 3
local FIND_TEXT_ROW = 0
local FIND_TEXT_COLUMN = 1
local FIND_TEXT_LENGTH = 2

local function findText(text)
    local found = {}
    repeat
        found = ll.FindNotecardTextSync(notecardName, text, 0, 0, {})
        if found[1] == NAK then
            ll.GetNumberOfNotecardLines(notecardName)
            ll.Sleep(0.5)
        end
    until found[1] ~= NAK
    for i = 1, #found, FIND_TEXT_STRIDE do
        ll.OwnerSay(`Line: {found[i + FIND_TEXT_ROW]}     Column: {found[i + FIND_TEXT_COLUMN]}     Length: {found[i + FIND_TEXT_LENGTH]}`)
    end
end

LLEvents:on("touch_start", function(events)
    if ll.GetInventoryType(notecardName) then
        findText("or")
    end
end)</code></pre>
</div>

### Finding and counting text

Finding and counting text in a notecard with **ll.FindNotecardTextSync()** and **ll.FindNotecardTextCount()**

<div class="script-box intermediate">
<h4>Finding and counting text in a notecard</h4>
<pre class="language-sluab line-numbers"><code class="language-sluab">local notecardName = "Fluffernutter"
local text = "Fluffernutter"
local count = 0
local requestCountId = NULL_KEY

local FIND_TEXT_STRIDE = 3
local FIND_TEXT_ROW = 0
local FIND_TEXT_COLUMN = 1
local FIND_TEXT_LENGTH = 2

local function findText()
    local totalFound = {}
    for i = 0, count - 1, 64 do
        repeat
            local found = ll.FindNotecardTextSync(notecardName, text, i, 64, {})
            if found[1] == NAK then
                ll.GetNumberOfNotecardLines(notecardName)
                ll.Sleep(0.5)
            else
                totalFound = table.move(found, 1, #found, #totalFound +1, totalFound)
            end
        until found[1] ~= NAK
    end
    for i = 1, #totalFound, FIND_TEXT_STRIDE do
        ll.OwnerSay(`Line: {totalFound[i + FIND_TEXT_ROW]}     Column: {totalFound[i + FIND_TEXT_COLUMN]}     Length: {totalFound[i + FIND_TEXT_LENGTH]}`)
    end
end

LLEvents:on("touch_start", function(events)
    if ll.GetInventoryType(notecardName) then
        requestCountId = ll.FindNotecardTextCount(notecardName, text, {})
    end
end)

LLEvents:on("dataserver", function(request, data)
    if request == requestCountId then
        count = tonumber(data)
        findText()
    end
end)
</code></pre>
</div>

### Notecard object

##### `coutl` (Coroutine Utilities)

The `coutl` library uses coroutines to allow us to write code that looks sequential and synchronous. When an asynchronous request is made, `coutl` yields (pauses) the function, automatically waits for the correct event, and resumes the function once the data arrives.

##### Functions

##### `coutl.start(func, ...)`
Starts a new coroutine. This must be used to wrap any function that will utilize `coutl`'s waiting/yielding features.
*   **Parameters:**
    *   `func` *(function)*: The function to execute as a coroutine.
    *   `...` *(vararg)*: Any arguments to pass to the function.
*   **Behavior:** It creates the coroutine, registers a global `dataserver` event handler (if not already active), and immediately begins execution.

##### `coutl.stop(co, func, ...)`
Safely terminates a coroutine and cleans up associated event handlers.
*   **Parameters:**
    *   `co` *(thread)*: The coroutine to stop.
    *   `func` *(function, optional)*: A callback function to execute after the coroutine closes.
    *   `...` *(vararg)*: Arguments to pass to the callback function.
*   **Behavior:** Removes the coroutine from the active tracking list. If no more coroutines are active, it turns off the global dataserver listener. The optional callback is queued via `LLTimers` to run in the main thread on the next tick.

##### `coutl.dataserver(id, seconds)`
Yields the current coroutine until a specific dataserver request is fulfilled.
*   **Parameters:**
    *   `id` *(uuid)*: The dataserver request ID.
    *   `seconds` *(number, optional)*: A timeout limit. If the data isn't received within this time, the coroutine resumes with `nil`. Defaults to `0` (no timeout).
*   **Returns:** Returns the data provided by the `dataserver` event.
*   **Note:** *Must be called from within a coroutine.*

##### `coutl.listen(chan)`
Yields the current coroutine until a chat message is received on a specific channel.
*   **Parameters:**
    *   `chan` *(number)*: The chat channel to listen on.
*   **Returns:** The `message` *(string)* received on the channel.
*   **Behavior:** Temporarily opens an `ll.Listen` on the channel, waits for a message, resumes the coroutine, and immediately cleans up the listener so it doesn't stay open permanently.
*   **Note:** *Must be called from within a coroutine.*

##### `coutl.wait(seconds)`
A non-blocking sleep function. Yields the current coroutine for a specific amount of time.
*   **Parameters:**
    *   `seconds` *(number)*: The amount of time to wait, in seconds.
*   **Behavior:** Acts similarly to `ll.Sleep()`, but unlike sleep, it does *not* freeze the entire script; it only pauses the specific coroutine.
*   **Note:** *Must be called from within a coroutine.*

##### `Notecard`

The `Notecard` object provides an Object-Oriented Interface for reading and searching Second Life notecards. It utilizes the synchronous reading functions, but falls back to asynchronous reading via the `coutl` library if the notecard is not currently cached by the simulator (when the sync function returns `NAK`).

##### Constructor

##### `Notecard:new(name, func)` / `Notecard(name, func)`
Creates a new Notecard instance and immediately starts a coroutine to process it. The instance is not returned, but passed to the function.
*   **Parameters:**
    *   `name` *(string)*: The name of the notecard in the prim's inventory.
    *   `func` *(function)*: The function to execute. The newly created Notecard instance will be passed as the first argument to this function.

##### Methods

##### `Notecard:name(name)`
Gets or sets the target notecard.
*   **Parameters:**
    *   `name` *(string, optional)*: If provided, sets the current notecard to this name and resets the read-line index to `1`.
*   **Returns:** The name of the currently targeted notecard.
*   **Throws:** An error if the specified notecard does not exist in the inventory.

##### `Notecard:line(lineNum, trim)`
Reads a specific line from the notecard.
*   **Parameters:**
    *   `lineNum` *(number)*: The line number to read.
    *   `trim` *(boolean, optional)*: If `true`, trims leading and trailing whitespace from the string.
*   **Returns:** 
    1. The string content of the line, or `nil` if the end of the notcard (EOF) is reached.
    2. The line number that was read.

##### `Notecard:firstLine(trim)`
Reads the first line of the notecard (Line 1).
*   **Parameters:** `trim` *(boolean, optional)*.
*   **Returns:** The line string (or `nil`), and the line number.

##### `Notecard:nextLine(trim)`
Reads the next sequential line of the notecard, based on the last line read.
*   **Parameters:** `trim` *(boolean, optional)*.
*   **Returns:** The line string (or `nil`), and the line number.

##### `Notecard:read(trim)`
Reads the entire notecard.
*   **Parameters:** `trim` *(boolean, optional)*.
*   **Returns:** An array indexed table containing all the lines of the notecard.

##### `Notecard:countLines()`
Requests the total number of lines in the notecard.
*   **Returns:** The total line count *(number)*. 

##### `Notecard:countText(text)`
Counts how many times a specific string of text appears in the notecard.
*   **Parameters:** `text` *(string)*: The text to search for.
*   **Returns:** The number of occurrences *(number)*.

##### `Notecard:findText(text)`
Finds the exact locations of a specific text string within the notecard.
*   **Parameters:** `text` *(string)*: The text to search for.
*   **Returns:** An array table of dictionary tables. Each dictionary contains:
    *   `line`: The line number where the text was found.
    *   `column`: The character index where the text starts.
    *   `length`: The length of the found text.

##### `Notecard:process(func, ...)`
Queues a function to run in the main thread when the current thread is paused.
*   **Parameters:**
    *   `func` *(function)*: The function to run.
    *   `...` *(vararg)*: Arguments to pass to the function.

##### `Notecard:done(func, ...)`
Signals that notecard processing is complete. Stops the current coroutine.
*   **Parameters:**
    *   `func` *(function, optional)*: A callback function to run in the main thread after stopping.
    *   `...` *(vararg)*: Arguments to pass to the callback.

##### `Notecard:notecardNames()`
Retrieves a list of all notecards currently inside the prim's inventory.
*   **Returns:** An array table containing the names of all notecards.

<div class="script-box advanced">
<h4>Notecard object</h4>
<pre class="language-sluab line-numbers"><code class="language-sluab">-- Notecard object (by Suzanna Linn, 2026-02-28)
  
-- utilities for coroutines

local coutl = {
    _co = {},
    _handler = nil,
    _awaiting = {},
    _err = function(ok, message)
        if not ok then
            local func, line = debug.info(3,"nl")
            message = `\nerror in coroutine called {if func ~= "" then "in function ".. func else ""} at line {line}:\n{message}\n`
            error(message, 3)
        end
    end
}

function coutl.start(func, ...)
    local function handler(request, data)
        local awaiting = coutl._awaiting[request]
        if awaiting then
            if awaiting.timer then
                LLTimers:off(awaiting.timer)
            end
            coutl._awaiting[request] = nil
            coutl._err(coroutine.resume(awaiting.co, data))
        end
    end
    if not coutl._handler then
        coutl._handler = LLEvents:on("dataserver", handler)
    end
    local co = coroutine.create(func)
    table.insert(coutl._co, co)
    coutl._err(coroutine.resume(co, ...))
end

function coutl.stop(co, func, ...)
    table.remove(coutl._co, table.find(coutl._co, co))
    if #coutl._co == 0 then
        LLEvents:off("dataserver", coutl._handler)
        coutl._handler = nil
    end
    if func then
        local params = {...}
        LLTimers:once(0, function()
            coroutine.close(co)
            func(unpack(params))
        end)
    else
        LLTimers:once(0, function()
            coroutine.close(co)
        end)
    end
end

function coutl.dataserver(id, seconds)
    seconds = tonumber(seconds) or 0
    local co = coroutine.running()
    local awaiting = { co = co }
    if seconds > 0 then
        awaiting.timer = LLTimers:once(seconds, function()
            coutl._awaiting[id] = nil
            coutl._err(coroutine.resume(co, nil))
        end)
    end
    coutl._awaiting[id] = awaiting
    return coroutine.yield()
end

function coutl.listen(chan)
    local co = coroutine.running()
    local li = ll.Listen(chan, "", "", "")
    local function handler(channel, name, id, message)
        if channel == chan then
            ll.ListenRemove(li)
            LLEvents:off("listen", handler)
            coutl._err(coroutine.resume(co, message))
        end
    end
    LLEvents:on("listen", handler)
    return coroutine.yield()
end

function coutl.wait(seconds)
    local co = coroutine.running()
    LLTimers:once(seconds, function()
        coutl._err(coroutine.resume(co))
    end)
    return coroutine.yield()
end

-- object Notecard

local Notecard = {}
Notecard.__index = Notecard

setmetatable(Notecard, {
    __call = function(t, ...)
        return Notecard:new(...)
    end,
    __iter = pairs,
})

function Notecard:name(name)
    if name then
        if ll.GetInventoryType(name) == INVENTORY_NONE then
            error(`Notecard {name} not found`)
        else
            self._name = name
            self._line = 1
        end
    end
    return self._name
end

function Notecard:new(name, func)
    local instance = setmetatable( {}, Notecard )
    Notecard.name(instance, name)
    coutl.start(func, instance)
end

function Notecard:line(lineNum, trim)
    self._line = lineNum
    local line = ll.GetNotecardLineSync(self._name, lineNum)
    if line == NAK then
        line = coutl.dataserver(ll.GetNotecardLine(self._name, lineNum))
    end
    return if line ~= EOF then
               if trim then ll.StringTrim(line, STRING_TRIM) else line
           else nil,
           lineNum
end

function Notecard:firstLine(trim)
    return self:line(1, trim)
end

function Notecard:nextLine(trim)
    return self:line(self._line + 1, trim)
end

function Notecard:read(trim)
    local lines = {}
    local line = self:firstLine(trim)
    while line do
        table.insert(lines, line)
        line = self:nextLine(trim)
    end
    return lines
end

function Notecard:countLines()
    return coutl.dataserver(ll.GetNumberOfNotecardLines(self._name))
end

function Notecard:countText(text)
    return coutl.dataserver(ll.FindNotecardTextCount(self._name, text, {}))
end

function Notecard:findText(text)
    local texts = {}
    for i = 0, self:countText(text) - 1, 64 do
        local txts = {}
        repeat
            txts = ll.FindNotecardTextSync(self._name, text, i, 64, {})
            if txts[1] == NAK then
                coutl.dataserver(ll.GetNumberOfNotecardLines(self._name))
            end
        until txts[1] ~= NAK
        texts = table.move(txts, 1, #txts, #texts + 1, texts)
    end
    local tabTexts = {}
    for i = 1, #texts, 3 do
        table.insert(tabTexts, { line = texts[i], column = texts[i + 1], length = texts[i + 2] })
    end
    return tabTexts
end

function Notecard:process(func, ...)
    local params = {...}
    LLTimers:once(0, function()
        func(unpack(params))
    end)
end

function Notecard:done(func, ...)
    coutl.stop(coroutine.running(), func, ...)
end

function Notecard:notecardNames()
    local notecards = {}
    for i = 1, ll.GetInventoryNumber(INVENTORY_NOTECARD) do
        table.insert(notecards, ll.GetInventoryName(INVENTORY_NOTECARD, i))
    end
    return notecards
end
</code></pre>
</div>

##### Examples of use of the Notecard object:

##### reading a notecard

<pre class="language-sluab"><code class="language-sluab">local function sayNotecard(lines)
    print(table.concat(lines, "\n"))
end

Notecard("Lorem Ipsum", function(notecard)
    local lines = notecard:read()
    notecard:done(sayNotecard, lines)
end)</code></pre>

##### reading a notecard line by line

<pre class="language-sluab"><code class="language-sluab">Notecard("Lorem Ipsum", function(notecard)
    local line, num = notecard:firstLine()
    while line do
        print(num, line)
        line, num = notecard:nextLine()
    end
end</code></pre>

##### finding a text

<pre class="language-sluab"><code class="language-sluab">Notecard("Fluffernutter", function(notecard)
    for _, found in notecard:findText("Fluffernutter") do
        print(found.line, found.column, found.length)
    end
end)</code></pre>

##### reading notecard section headers

<pre class="language-sluab"><code class="language-sluab">Notecard("config", function(notecard)
    for _, found in notecard:findText("[[][^\n]+[]]") do
        print((notecard:line(found.line)))
    end
end)</code></pre>

##### reading the last line

<pre class="language-sluab"><code class="language-sluab">Notecard("config", function(notecard)
    print(notecard:line(notecard:countLines()))
end)</code></pre>

##### reading a notecard section

<pre class="language-sluab"><code class="language-sluab">local function sayStaffId(staff)
    for _, id in staff do
        print(id)
    end
end

Notecard("config", function(notecard)
    local staff = {}
    local staffSection = notecard:findText("(?i)[[]staff[]]")[1]
    if staffSection then
        local user = notecard:line(staffSection.line + 1, true)
        while user and user ~= "" do
            local key = coutl.dataserver(ll.RequestUserKey(user), 2)
            if key then
                local userId = touuid(key)
                if userId.istruthy then
                    table.insert(staff, userId)
                else
                    print(`user {user} doesn't exist`)
                end
            else
                print(`request for {user} timed out`)
            end
            user = notecard:nextLine(true)
        end
    end
    notecard:done(sayStaffId, staff)
end)</code></pre>

##### counting characters and "u"

<pre class="language-sluab"><code class="language-sluab">local totals = {}

local function sayTotals()
    local chars, u = 0, 0
    for name, data in totals do
        print(name, data.chars, data.u)
        chars += data.chars
        u += data.u
    end
    print("totals", chars, u)
end

local function countChars(name, lines, u)
    local chars = 0
    for _, line in lines do chars += #line end
    totals[name] = { chars = chars, u = u }
end

Notecard("config", function(notecard)
    totals = {}
    for _, name in notecard:notecardNames() do
        notecard:name(name)
        notecard:process(countChars, name, notecard:read(), notecard:countText("(?i)u"))
    end
    notecard:done(sayTotals)
end)</code></pre>

##### a poem reader

<pre class="language-sluab"><code class="language-sluab">Notecard("poems", function(notecard)
    local CHANNEL = 1

    local titles = notecard:findText("---")
    for _, title in titles do
        title.title = notecard:line(title.line):sub(4)
    end
    
    function sayPoems()
        for i, title in titles do
            print(i,title.title)
        end
        print("\n", "Say the number of the poem on channel " .. CHANNEL .. " to read the poem or anything else to say this list", "\n\n")
    end
    
    function readPoem(poem)
        local poemTitle = titles[poem].title
        print("\n", poemTitle, "\n\n")
        coutl.wait(#poemTitle * 0.1)
        local poemLine = notecard:line(titles[poem].line + 1)
        while poemLine and poemLine ~= "***" do
            print(if poemLine == "" then " " else poemLine)
            coutl.wait(#poemLine * 0.1)
            poemLine = notecard:nextLine()
        end
        print("\n", "Say the number of the poem on channel " .. CHANNEL .. " to read the poem or anything else to say the list of poems", "\n\n")
    end
    
    sayPoems()
    while true do
        local poem = tonumber(coutl.listen(CHANNEL))
        if poem and titles[poem] then
            readPoem(poem)
        else
            sayPoems()
        end
    end
end)</code></pre>
