---
layout: default
title: Slua Beta
slua_beta: true
---

## What is new in the SLua Beta version

The SLua pre-Beta with most of the new improvements is already in the SLua regions on the Beta Grid!

The SLua Beta is expected to arrive in November or December. It will first appear on the Beta Grid (at least in the current SLua regions) and in a handful of regions on the Main Grid.

I’ve gathered all the info I could find about the changes coming in this Beta. Not everything is set in stone yet, so this page may be evolving as more details become clear.

I’ve also put together some example code for SLua Beta. Keep in mind these examples can’t be tested yet and are based on assumptions. First line comments in the code are shown in red so you can easily spot that they’re not real code (at least, not yet!).

These changes are only in SLua. LSL is unchanged and stays working the same.

*(this page updated on Saturday, Nov 8th)*

### Getting it working (fast)

If you just want your code to run right now, follow these steps. These are the quickest fixes — explanations and better approaches follow below.

- Add this line at the start of the script:
  - <code class="language-sluab">ll = llcompat</code>

- Add "LLEvents." in front of all the event names:
  - <code class="language-sluab">function LLEvents.listen(channel, name, id, msg)</code>
    - instead of <code class="language-slua">function listen(channel, name, id, msg)</code>

- In the events touch_start, touch, touch_end, collision_start, collision, collision_end, sensor, damage, final_damage, if you are using its parameter, add as first line in the event:
   - <code class="language-slua">num_detected = #num_detected</code> (change "num_detected" with the event parameter name)

### Events, object LLEvents

We have a new object **LLEvents** to work with the events. The current way to write them that SLua Alpha uses will stop working and we will need to rewrite the scripts.

**LLEvents** is a more flexible and dynamic way to handle the events allowing us to add or remove event handling functions at any time and to have several functions reacting to the same event.

These are the methods in the object:

- *handler* = **LLEvents:on**(*name*, *handler*) : adds an event handler.
  - name : the name of the event.
  - handler : the function that runs when the event happens.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - We can add several functions to the same event, they will be called in the same order in which we add them.
    - If we add the same function again, it will be called twice (or as many times as we add it) when the event triggers.
    - All the functions are called when the event triggers, we can't stop the calling sequence once we have processed the event.
    - If we add a function to different events, there is no way to know which event has called it (unless the events have different number or types of parameters).
    - To remove the handler we will need the returned function if we have passed an anonymous function.

- *newHandler* = **LLEvents:once**(*name*, *handler*) : adds a one-time event handler.
  - name : the name of the event.
  - handler : the function that runs when the event happens.
  - returns a new function that we can use to remove the handler.
    - The function runs only once and is automatically removed from the event afterward.
    - Our function passed as handler is internally wrapped in another function and we get this new one as return.
    - To remove the handler we will always need the returned function.
 
- *found* = **LLEvents:off**(*name*, *handler*) : removes an event handler.
  - name : the name of the event.
  - handler : the function we want to stop handling the event.
  - returns true if the function has been found (and removed), false otherwise.
    - If we have added the same function twice or more with LLEvents:on(), only the last one added will be removed.
      - But not with LLEvents:once() that returns a different function each time.
 
- *eventsTable* = **LLEvents:eventNames**() : returns which events are active.
  - returns a table with all the event names that currently have functions handling them.
    - It's useful for debugging and to remove all the events, using it with LLEvents:listeners().

- *handlersTable* = **LLEvents:listeners**(*name*) : returns which handlers are attached to an event.
  - name : the name of the event.
  - returns a table with the functions currenty handling the event.
    -  It's useful for debugging and to remove all the functions handling an event.
   
When an event becomes inactive (after removing all the functions handling it) the pending events are removed from the event queue.  
To change an event handler:
- Add the new one and remove the current one to preserve the pending events in the queue and handle them with the newly added function.
- Remove the current one and add the new one to discard the pending events in the queue.

When the "listen" event becomes inactive all the listeners are removed.

When the "sensor" event becomes inactive, the sensor repeat (if present) is removed.

We have an alternative syntax (called convenient assignment syntax) to make the change easier:
<table><tr><td>
<pre class="language-sluab"><code class="language-sluab">-- SLua Beta
function LLEvents.listen(channel, name, id, msg)</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- SLua Alpha
function listen(channel, name, id, msg)</code></pre>
</td></tr></table>
We only need to add LLEvents. to our events.

An example with the syntax of all the methods:
<pre class="language-sluab"><code class="language-sluab">-- example with all the methods (SLua Beta)

-- a function to use for the example
local function myListenFunction(channel, name, id, msg)
    -- do something
end
-- start listening as usual
ll.Listen(1, "", "", "")

-- add an event handler
LLEvents:on("listen", myListenFunction)
-- remove the event handler
LLEvents:off("listen", myListenFunction)

-- add with anonymous function
local myListenHandler = LLEvents:on("listen",
    function(channel, name, id, msg)
        -- do something
    end
)
-- remove
LLEvents:off("listen", myListenHandler)

-- add once
local myListenHandler = LLEvents:once("listen", myListenFunction)
-- remove
LLEvents:off("listen", myListenHandler)

-- remove all the handlers of an event
for _, myListenHandler in LLEvents:listeners("listen") do
    LLEvents:off("listen", myListenHandler)
end

-- remove all the events
for _, eventName in LLEvents:eventNames() do
    for _, myHandler in LLEvents:listeners(eventName) do
        LLEvents:off(eventName, myHandler)
    end
end</code></pre>

An example of use, first in Alpha and 3 different options in Beta:
<pre class="language-slua"><code class="language-slua">-- example (SLua Alpha)

function listen(channel, name, id, msg)
    if channel == 1 then
        -- do something with 1
    else
        -- do something with 2
    end
end

ll.Listen(1, "", "", "")
ll.Listen(2, "", "", "")</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- example with minimal change (SLua Beta)

function LLEvents.listen(channel, name, id, msg)
    if channel == 1 then
        -- do something with 1
    else
        -- do something with 2
    end
end

ll.Listen(1, "", "", "")
ll.Listen(2, "", "", "")</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- example with one event handler (SLua Beta)

local function myListenFunction(channel, name, id, msg)
    if channel == 1 then
        -- do something with 1
    else
        -- do something with 2
    end
end

LLEvents:on("listen", myListenFunction)

ll.Listen(1, "", "", "")
ll.Listen(2, "", "", "")</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- example with two event handlers (SLua Beta)

local function myListenChannel1(channel, name, id, msg)
    if channel == 1 then
        -- do something with 1
    end
end

local function myListenChannel2(channel, name, id, msg)
    -- all the event handlers are called, we need to check the parameters in all the functions
    if channel == 2 then
        -- do something with 2
    end
end

LLEvents:on("listen", myListenChannel1)
LLEvents:on("listen", myListenChannel2)

ll.Listen(1, "", "", "")
ll.Listen(2, "", "", "")</code></pre>

### Timers, object LLTimers

We have a new object **LLTimers** to work with timers. The current way to set the timer with ll.SetTimerEvent() and the event timer() that SLua Alpha uses will stop working and we will need to rewrite the scripts.

**LLTimers** is a more flexible and dynamic way to set the timers allowing us to use several timers and to set different functions for each interval.

These are the methods in the object:

- *handler* = **LLTimers:every**(*seconds*, *handler*) or *handler* = **LLTimers:on**(*seconds*, *handler*) : adds a timer.
  - seconds : the interval.
  - handler : the function that runs when the time arrives.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - To remove the handler we will need the returned function if we have passed an anonymous function.

- *newHandler* = **LLTimers:once**(*seconds*, *handler*) : adds a one-time timer.
  - seconds : the interval.
  - handler : our function that runs when the time arrives.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - The timer runs only once and is automatically removed afterward.
    - To remove the handler we will need the returned function if we have passed an anonymous function.
      - This is different than LLEvents:once() that returns a new function.
 
- *found* = **LLTimers:off**(*handler*) : removes a timer.
  - handler : the function we want to stop the timer.
  - returns true if the timer has been removed, false otherwise.
    - If we have added the same function twice or more, only the last one added will be removed.
      - If we have added the same function with different intervals, we can't stop the timer with the first interval.
        - We should remove both timers and add the second one again, but its interval would start at 0.
       
There is no way to get all the functions in the timers. There is no equivalent to LLEvents:listeners().
     
These are the minimal changes to rewrite our scripts:
<table><tr><td>
<pre class="language-sluab"><code class="language-sluab">-- SLua Beta

local function someThing()
    -- stop the timer, in case that it was set,
    -- to be sure not to duplicate it
    LLTimers:off(timer)
    LLTimers:every(15, timer)
    -- some code here
    LLTimers:off(timer)
end

-- timer() is not an event, this is a user function
function timer()
  -- do something
end</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- SLua Alpha

local function someThing()



    ll.SetTimerEvent(15)
    -- some code here
    ll.SetTimerEvent(0)
end


function timer()
  -- do something
end</code></pre>
</td></tr></table>

An example with the syntax of all the methods:
<pre class="language-sluab"><code class="language-sluab">-- example with all the methods (SLua Beta)

-- a function to use for the example
local function myTimerFunction()
    -- do something
end

-- add a timer with 15 seconds
LLTimers:every(15, myTimerFunction)
-- remove the timer
LLTimers:off(myTimerFunction)

-- add with anonymous function
local myTimerHandler = LLTimers:every(15,
    function()
        -- do something
    end
)
-- remove
LLTimers:off(myTimerHandler)

-- add once
LLTimers:once(15, myTimerFunction)
-- remove
LLTimers:off(myTimerFunction)</code></pre>

An example of use, first in Alpha and 2 different options in Beta:
<pre class="language-slua"><code class="language-slua">-- example (SLua Alpha)

local ticks = 60

function timer()
    -- do something every 1 second
    ticks -= 1
    if ticks == 0 then
        -- do something every 60 seconds
        ticks = 60
    end
end

ll.SetTimerEvent(1)</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- example with minimal change (SLua Beta)

local ticks = 60

local function timer()
    -- do something every 1 second
    ticks -= 1
    if ticks == 0 then
        -- do something every 60 seconds
        ticks = 60
    end
end

LLTimers:every(1, timer)</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- example with two timers (SLua Beta)

local function myTimer1()
    -- do something every 1 second
end

local function myTimer60()
    -- do something every 60 seconds
end

LLTimers:every(1, myTimer1)
LLTimers:every(60, myTimer60)</code></pre>

LLTimers passes a parameter to the handler function with the expected trigger time. The actual trigger time could be a few milliseconds later, never before.

We can compare it to ll.GetTime(), which now has more precission, to know the delay. LLTimers and ll.GetTime() time is set to 0 when the script starts running:
<pre class="language-sluab"><code class="language-sluab">-- comparing actual and expected time (SLua Beta)

local function myTimer(expected)
    print(ll.GetTime() - expected)  -- delay
end

LLTimers:every(1, myTimer)</code></pre>

### Multi-events, table evts

We have a new way to work with the events, like touch_start, that can receive receive several events at once. The current way to write the multi-event events that SLua Alpha uses will stop working and we will need to rewrite the scripts.

Instead of the number of events (the parameter num_detected) the event handler receives an array table with the events.

Instead of functions like ll.DetectedKey() there are functions like GetKey() to use on each event in the table.

The multi-events are these ones:
- collision
- collision_end
- collision_start
- damage
- final_damage
- touch
- touch_end
- touch_start
- sensor

The ll.Detected* functions with their names as functions in the events table:

<table style="width:60%; border: none;">
  <tr style="vertical-align: top;">
    <td style="width:30%; padding-right: 10px;">
      <ul>
		<li>ll.AdjustDamage</li>
        <li>ll.DetectedDamage</li>
        <li>ll.DetectedGrab</li>
        <li>ll.DetectedGroup</li>
        <li>ll.DetectedKey</li>
        <li>ll.DetectedLinkNumber</li>
        <li>ll.DetectedName</li>
        <li>ll.DetectedOwner</li>
        <li>ll.DetectedPos</li>
        <li>ll.DetectedRezzer</li>
        <li>ll.DetectedRot</li>
        <li>ll.DetectedTouchBinormal</li>
        <li>ll.DetectedTouchFace</li>
        <li>ll.DetectedTouchNormal</li>
        <li>ll.DetectedTouchPos</li>
        <li>ll.DetectedTouchST</li>
        <li>ll.DetectedTouchUV</li>
        <li>ll.DetectedType</li>
        <li>ll.DetectedVel</li>
      </ul>
    </td>
    <td style="width:30%; padding-left: 10px;">
      <ul>
		<li>adjustDamage</li>
        <li>getDamage</li>
        <li>getGrab</li>
        <li>getGroup</li>
        <li>getKey</li>
        <li>getLinkNumber</li>
        <li>getName</li>
        <li>getOwner</li>
        <li>getPos</li>
        <li>getRezzer</li>
        <li>getRot</li>
        <li>getTouchBinormal</li>
        <li>getTouchFace</li>
        <li>getTouchNormal</li>
        <li>getTouchPos</li>
        <li>getTouchST</li>
        <li>getTouchUV</li>
        <li>getType</li>
        <li>getVel</li>
      </ul>
    </td>
  </tr>
</table>

An example to see how it works:
<pre class="language-slua"><code class="language-slua">-- example (SLua Alpha)
function touch_start(num_detected)
    for i = 0, num_detected -1 do
        local toucher = ll.DetectedKey(i)
        -- do something
    end
end</code></pre>

The ll.Detected* functions still work. To rewrite the script with the minimal changes we need to add:
- <code class="language-sluab">ll = llcompat</code> at the start of the script, **llcompat** is explained in the next section.
- <code class="language-sluab">num_detected = #evts</code> at the start of each event.

<pre class="language-sluab"><code class="language-sluab">-- example with minimal change (SLua Beta)
ll = llcompat

function LLEvents.touch_start(evts)
    local num_detected = #evts
    for i = 0, num_detected -1 do
        local toucher = ll.DetectedKey(i)
        -- do something
    end
end</code></pre>

2 different options with the new multi-events:
<pre class="language-sluab"><code class="language-sluab">-- example with the table evts and the alternative events syntax (SLua Beta)
function LLEvents.touch_start(evts)
    for _, evt in evts do
        local toucher = evt:getKey()
        -- do something
    end
end</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- example with the table evts (SLua Beta)
local function myTouches(evts)
    for _, evt in evts do
        local toucher = evt:getKey()
        -- do something
    end
end

LLEvents:on("touch_start", myTouches)</code></pre>

### Constants TRUE and FALSE don't exist

The LSL constants TRUE and FALSE that still existed in SLua Alpha are now undefined.
- In SLua Alpha FALSE is evaluated as truthy (because is 0).
- In SLua Beta TRUE is evaluated as falsy (because is nil).

Don't use them!

### SLua type uuid

The function uuid() returns nil for not valid uuids.

LL functions with parameters of type uuid can receive uuid or string.

LL functions returning textures return:
- type string when the name of the texture is returned.
- type uuid when the uuid of the texture is returned.

Linked messages have a string instead of an uuid in their fourth parameter.
- the function ll.MessageLinked( link, num, str, str2 )
- the event link_message( sender_num, num, str, str2 )
- linked messages with LSL scripts are internally typecasted.

Uuid's can be converted to and from 16-characters string storing the uuid in numeric form:
- property .bytes that returns the uuid as a 16-characters string.
- the function uuid() can take a buffer of 16 or more bytes and get the uuid from the first 16 bytes.
- it's useful to store uuid's in linkset data or in a buffer using 16 bytes instead of 36.
<pre class="language-sluab line-numbers"><code class="language-sluab">-- uuid's to string16 (Slua Beta)

local me = ll.GetOwner()

local meStr16 = me.bytes
print(#meStr16)  -- > 16

local meBack = uuid(buffer.fromstring(meStr16))
print(me == meBack)  -- > true</code></pre>
</td></tr></table>

### SLua type integer

The type integer doesn't exist any more.

It was necessary at the beginnings of SLua to work with some LL functions. Now all the LL functions work with the type number and the type integer had become mostly unuseful.

The few remaining uses of integer were:
- Typecasting in LSL-style
  - <code class="language-sluab">integer("123abc") -- > 123</code> or <code class="language-sluab">integer("aaa") -- > 0</code>
    - tonumber() returns nil in both cases.
	- we can use <code class="language-sluab">string.match(myStr, "^%s*([-+]?%d+)" ) or 0</code>
  - <code class="language-sluab">integer(myBool) -- > 1 or 0</code>
	- we can use <code class="language-sluab">if myBool then 1 else 0</code>
- the bit32 library functions returned type integer when all the parameters had type integer.
  - to get signed results (like -1 instead of 4294967295) we can use:
    -  <code class="language-sluab">myRes = bit32.bnot(myNum) if myRes >= 2^31 then myRes -= 2^32 end</code>
- ll.List2Integer() returned type integer.
  - it returns type number.
- ll.DumpList2String() and ll.List2CSV() printed type number always with six decimals and type integer without decimals.
  - all numbers are printed with six decimals.

### Compatibility, library llcompat

Some LL functions change they behaviour. These changes are explained in the next three sections.

We have the library **llcompat** with the LL functions unchanged. To use them as in SLua Alpha (and LSL) we need to add, at the start of the script:
- <code class="language-sluab">ll = llcompat</code>

### Removed functions

These functions doesn't exist in SLua Beta:
<br>
<table border="1" style="width:50%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetTimerEvent</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ResetTime</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.GetAndResetTime</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetMemoryLimit</td>
  </tr>
</table>

We can still use them in the llcompat library, but the 3 time-related functions are not compatible with the LLTimers object. We can't use the old timer functions and LLTimers together because LLTimers would fail.

The old timer event, to be used with llcompat.SetTimerEvent(), is:
<pre class="language-sluab line-numbers"><code class="language-sluab">-- using the old event timer (SLua Beta)
function LLEvents.timer()
    -- do something
end

llcompat.SetTimerEvent(1)</code></pre>

### 1-based LL functions

The LL functions that have some kind of 0-based index are now 1-based.
- Negative indexes don't change, the last element is still -1.

These are the functions and the parameters that change. The "*" added to the parameter name means that it can use negative values, we can't just add 1 to rewrite our scripts if we are using negative values:  
<br>
<table border="1" style="width:100%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.AdjustDamage(number, new_damage)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DeleteSubList(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DeleteSubString(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedDamage(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedGrab(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedGroup(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedKey(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedLinknumber(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedName(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedOwner(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedPos(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedRezzer(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedRot(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchBinormal(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchFace(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchNormal(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchPos(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchST(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchUV(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedType(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedVel(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetInventoryName(type, number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetListEntryType(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetNotecardLine(name, line)</td>
    <td style="width:50%; padding-left: 10px;">line</td>
  </tr>
    <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetNotecardLineSync(name, line)</td>
    <td style="width:50%; padding-left: 10px;">line</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetSubString(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.InsertString(dst, pos, src)</td>
    <td style="width:50%; padding-left: 10px;">pos</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.KeysKeyValue(first, count)</td>
    <td style="width:50%; padding-left: 10px;">first</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.LinksetDataFindKeys(pattern, start, count)</td>
    <td style="width:50%; padding-left: 10px;">start</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.LinksetDataListKeys(start, count)</td>
    <td style="width:50%; padding-left: 10px;">start</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Float(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Integer(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Key(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2List(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2ListSlice(src, start, end, stride, slice_index)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*, slice_index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2ListStrided(src, start, end, stride)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Rot(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2String(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Vector(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListFindList(src, test)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListFindListNext(src, test, instance)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;, instance*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListFindStrided((src, test, start, end, stride)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;, start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListInsertList(dest, src, start)</td>
    <td style="width:50%; padding-left: 10px;">start*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListReplaceList(dest, src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListSortStrided(src, stride, stride_index, ascending)</td>
    <td style="width:50%; padding-left: 10px;">stride_index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.Ord(val, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.SubStringIndex(source, pattern)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;</td>
  </tr>
</table>

### LL functions return nil when not found

The LL functions that returned -1 meaning "not found" now return nil.

These are the functions that change:  
<br>
<table border="1" style="width:50%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ListFindList</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ListFindListNext</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ListFindStrided</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SubStringIndex</td>
  </tr>
</table>

### boolean LL functions

The LL functions that return a boolean value now return type boolean instead of type number.

Functions like ll.GetPrimitiveParams() and ll.GetObjectDetails() that return boolean values inside lists also return type boolean instead of type number.

LL functions with integer parameters that are a boolean value can receive boolean or number (this already worked in SLua Alpha).

These are the functions that change:  
<br>
<table border="1" style="width:50%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.AgentInExperience</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.DerezObject</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.DetectedGroup</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.EdgeOfWorld</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.GetScriptState</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.GetStatus</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.IsFriend</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.IsLinkGLTFMaterial</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ManageEstateAccess</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.OverMyLand</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SameGroup</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ScaleByFactor</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ScriptDanger</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetMemoryLimit</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetRegionPos</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.VerifyRSA</td>
  </tr>
</table>

### Others

- Script memory : SLua scripts will have 128k of memory.
  - LSL scripts compiled to VM Luau will also have 128k.
  - LSL Mono will stay with 64k.
  - Linkset Data will stay with 128k.
- Default "new script" : There will be a different script, without using state_entry() and with ll.OwnerSay() instead of ll.Say().

### SLua editor

There will be an official SLua extension for the Visual Studio Code editor. It could be ready at a different moment than SLua Beta.

The SLua extension is based on open source VSC extensions:
- [Luau-LSP](https://github.com/JohnnyMorganz/luau-lsp) : a Luau extension that uses the [Luau/Roblox code](https://github.com/luau-lang/luau)
  - It uses the Luau Analyzer for type checking and linting.
    - Type checking automatically infers types from the values assigned to variables or manually by adding type annotations. These annotations can define types, combinations of types, or subtypes. There are directives that allow to control the level of type checking in each script, ranging from none to strict.
    - Linting identifies possible issues like uninitialized or unused variables, duplicated functions, mismatched parameter counts, return values, and many more. There are also directives to enable or disable specific linting checks.
- [Selene](https://github.com/Kampfkarren/selene) : a Lua and Luau extension.
  - Linting focusing on style rules that can be configured to adapt to each scripter style.
    - It helps enforce a consistent and readable coding style.
 
The SLua extension will have a preprocessor.
- Probably with the usual commands: #define, #undef, #ifdef, #ifndef, #else, #endif, #if, #elif
  - The syntax is not known yet, probably not starting with # that is a SLua operator)
- An include/require function.
  - Files are imported at compile time by the preprocessor.
  - It imports files accessible from VSC.
  - It's not known if it can import inworld scripts. If it was the case, the scripts should be in the inventory and full perm, and the viewer should be opened to import them.
  - It can't import no-modify scripts. There is no way to distribute libraries without the source code.
- With the viewer opened, scripts can be executed from VSC and the error, debug channel and OwnerSay messages are shown in VSC.
  - But no debugging option at all.

An example of include/require:
<pre class="language-sluab"><code class="language-sluab">-- a library of functions ready to import (SLua Beta with VSC extension)

-- all variables should be local to avoid name conflicts when imported
local greetings = {}

function greetings.hi(id)
    print("Hello " .. ll.GetDisplayName(id) .. "!")
end

function greetings.bye(id)
    print("See you " .. ll.GetDisplayName(id) .. "!")
end

-- libraries have to return something, often a table with functions
return greetings</code></pre>
  <pre class="language-sluab"><code class="language-sluab">-- a script using include/require (SLua Beta with VSC extension)

local greet = require("greetings.slua")  -- the syntax is unknown

greet.hi(ll.GetOwner())
-- some more code
greet.bye(ll.GetOwner())</code></pre>
  <pre class="language-sluab"><code class="language-sluab">-- the same script after preprocessing and ready to compile (SLua Beta with VSC extension)

-- the imported code is wrapped in an anonymous function to avoid name conflicts
-- the anonymous function is executed assigning the return to the variable

local greet = (function()
    local greetings = {}

    function greetings.hi(id)
        print("Hello " .. ll.GetDisplayName(id) .. "!")
    end

    function greetings.bye(id)
        print("See you " .. ll.GetDisplayName(id) .. "!")
    end

    return greetings
end)()

greet.hi(ll.GetOwner())
-- some more code
greet.bye(ll.GetOwner())
</code></pre>

There will also be an official LSL extension for VSC, appearing at the same time or later than the SLua extension.

The inworld editor will be improved later (in an unknown later).
