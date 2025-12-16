---
layout: default
title: Events
slua_beta: true
---

## Events

### Object LLEvents

We have a new object **LLEvents** to work with the events.

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

We have an alternative syntax (called convenient assignment syntax):
<pre class="language-sluab"><code class="language-sluab">function LLEvents.listen(channel, name, id, msg)</code></pre>
We only need to add LLEvents. to our events.

An example with the syntax of all the methods:
<pre class="language-sluab"><code class="language-sluab">-- example with all the methods

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

An example of use, 3 different options:
<pre class="language-sluab"><code class="language-sluab">-- example with minimal change

function LLEvents.listen(channel, name, id, msg)
    if channel == 1 then
        -- do something with 1
    else
        -- do something with 2
    end
end

ll.Listen(1, "", "", "")
ll.Listen(2, "", "", "")</code></pre>
<pre class="language-sluab"><code class="language-sluab">-- example with one event handler

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
<pre class="language-sluab"><code class="language-sluab">-- example with two event handlers

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

### Multi-events

We have a new way to work with the events, like touch_start, that can receive receive several events at once.

Instead of the number of events (the parameter num_detected) the event handler receives an array table with the events.

Instead of functions like ll.DetectedKey() there are functions like GetKey() to use on each event in the table.

The multi-events are these ones:
- collision
- collision_end
- collision_start
- final_damage
- on_damage
- sensor
- touch
- touch_end
- touch_start

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

The ll.Detected* functions still work. To rewrite the script with the minimal changes we need to add:
- <code class="language-sluab">ll = llcompat</code> at the start of the script, **llcompat** is explained in the next section.
- <code class="language-sluab">num_detected = #events</code> at the start of each event.

<pre class="language-sluab"><code class="language-sluab">-- example with minimal change
ll = llcompat

function LLEvents.touch_start(events)
    local num_detected = #events
    for i = 0, num_detected -1 do
        local toucher = ll.DetectedKey(i)
        -- do something
    end
end</code></pre>

2 different options with the new multi-events:
<pre class="language-sluab"><code class="language-sluab">-- example with the table events and the alternative events syntax
function LLEvents.touch_start(events)
    for _, evt in events do
        local toucher = evt:getKey()
        -- do something
    end
end</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- example with the table events
local function myTouches(events)
    for _, evt in events do
        local toucher = evt:getKey()
        -- do something
    end
end

LLEvents:on("touch_start", myTouches)</code></pre>
