---
layout: default
title: Slua Beta
slua_beta: true
---

## What is new in the SLua Beta version

The SLua Beta is expected to arrive in November or December! It will first appear on the Beta Grid (at least in the current SLua regions) and in a handful of regions on the Main Grid.

I’ve gathered all the info I could find about the changes coming in this Beta. Not everything is set in stone yet, so this page may be evolving as more details become clear.

I’ve also put together some example code for SLua Beta. Keep in mind these examples can’t be tested yet and are based on assumptions. First line comments in the code are shown in red so you can easily spot that they’re not real code (at least, not yet!).

### Events, library llevents

We have a new library **llevents** to work with the events. The current way to write them will stop working and we will need to rewrite it.

**llevents** is a more flexible and dynamic way to handle the events it allows us to:add or remove event handling functions at any time and to have several functions reacting to the same event.

These are the functions in the library:

- *handler* = **llevents.on**(*name*, *handler*) : adds an event handler.
  - name : the name of the event.
  - handler : the function that runs when the event happens.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - We can add several functions to the same event, they will be called in the same order in which we add them.
    - If we add the same function again, it will be called twice (or as many times as we add it) when the event triggers.
    - All the functions are called when the event triggers, we can't stop the calling sequence when we have processed the event.
    - To remove the handler we will need the returned function if we have passed an anonymous function.

- *newHandler* = **llevents.once**(*name*, *handler*) : adds a one-time event handler.
  - name : the name of the event.
  - handler : the function that runs when the event happens.
  - returns a new function that we can use to remove the handler.
    - The function runs only once and is automatically removed from the event afterward.
    - Our function passed as handler is internally wrapped in another function and we get this new one as return.
    - To remove the handler we will always need the returned function.
 
- *found* = **llevents.off**(*name*, *handler*) : removes an event handler.
  - name : the name of the event.
  - handler : the function we want to stop handling the event.
  - returns true if the function was removed, false otherwise.
    - If we have added the same function twice or more with llevents.on(), only the last one added will be removed.
      - But not with llevents.once() that returns a different function each time.
 
- *eventsTable* = **llevents.eventNames**() : returns which events are active.
  - returns a table with all the event names that currently have functions handling them.
    - It's useful for debugging and to remove all the events used with llevents.listeners().

- *handlersTable* = **llevents.listeners**(*name*) : returns which handlers are attached to an event.
  - name : the name of the event.
  - returns a table with the functions currenty handling the event.
    -  It's useful for debugging and to remove all the functions handling an event.
   
When an event becomes inactive (after removing all the functions handling it) the pending events are removed from the event queue.  
To change an event handler:
- Add the new one and remove the current one to preserve the pending events in the queue and handle them with the newly added function.
- Remove the current one and add the new one to discard the pending events in the queue.

We have an alternative syntax (called convenient assignment syntax) to make the change easier:
<table><tr><td>
<pre class="language-sluab"><code class="language-sluab">-- SLua Beta
function llevents.listen(channel, name, id, msg)</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- SLua Alpha
function listen(channel, name, id, msg)</code></pre>
</td></tr></table>
We only need to add llevents. to our events.

An example with the syntax of all the functions:
<pre class="language-sluab"><code class="language-sluab">-- example with all the functions (SLua Beta)

-- a function to use for the example
local myListenFunction(channel, name, id, msg)
    -- do something
end
-- start listening as usual
ll.Listen(1, "", "", "")

-- add an event handler
llevents.on("listen", myListenFunction)
-- remove the event handler
llevents.off("listen", myListenFunction)

-- add with anonymous function
local myListenHandler = llevents.on("listen",
    function(channel, name, id, msg)
        -- do something
    end
)
-- remove
llevents.off("listen", myListenHandler)

-- add once
local myListenHandler = llevents.once("listen", myListenFunction)
-- remove
llevents.off("listen", myListenHandler)

-- remove all the handlers of an event
for _, myListenHandler in llevents.listeners("listen") do
    llevents.off("listen", myListenHandler)
end

-- remove all the events
for _, eventName in llevents.eventNames() do
    for _, myHandler in llevents.listeners(eventName) do
        llevents.off(eventName, myHandler)
    end
end</code></pre>

An example of use, one in Alpha and 3 different options in Beta:
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

local function llevents.listen(channel, name, id, msg)
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

llevents.on("listen", myListenFunction)

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

llevents.on("listen", myListenChannel1)
llevents.on("listen", myListenChannel2)

ll.Listen(1, "", "", "")
ll.Listen(2, "", "", "")</code></pre>

### Timers, library lltimers

We have a new library **lltimers** to work with timers. The current way to set the timer with ll.SetTimerEvent() and the event timer() will stop working and we will need to rewrite it.

**lltimers** is a more flexible and dynamic way to set the timers it allows us to use several timers and to set different functions for each one.

These are the functions in the library:

- *handler* = **lltimers.on**(*seconds*, *handler*) : adds a timer.
  - seconds : the interval.
  - handler : the function that runs when the time arrives.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - To remove the handler we will need the returned function if we have passed an anonymous function.

- *newHandler* = **lltimers.once**(*seconds*, *handler*) : adds a one-time timer.
  - seconds : the interval.
  - handler : our function that runs when the time arrives.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - The timer runs only once and is automatically removed afterward.
    - To remove the handler we will need the returned function if we have passed an anonymous function.
      - This is different than llevents.once() that returns another function.
 
- *found* = **lltimers.off**(*handler*) : removes a timer.
  - handler : the function we want to stop the timer.
  - returns true if the timer was removed, false otherwise.
    - If we have added the same function twice or more, only the last one added will be removed.
      - If we have added it with different intervals, we can't stop the timer with the first interval.
        - We should remove both timers and add the second one again, but its interval would start at 0.
       
There is no way to get all the functions in the timers. There is no equivalent to llevents.listeners().
     
These are the minimal to rewrite our scripts:
<table><tr><td>
<pre class="language-sluab"><code class="language-sluab">-- SLua Beta

-- timer() is not an event, this is a user function
local function timer()
  -- do something
end

-- stop the timer, in case that it was set,
-- to be sure not to duplicate it
lltimers.off(timer)
lltimers.on(15, timer)
-- some code here
lltimers.off(timer)


--</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- SLua Alpha









ll.SetTimerEvent(15)
-- some code here
ll.SetTimerEvent(0)

function timer()
  -- do something
end</code></pre>
</td></tr></table>




### Multi-events, table evts

<pre class="language-slua"><code class="language-slua">-- example (SLua Alpha)
function touch_start(num_detected)
    for i = 0, num_detected -1 do
        local toucher = ll.GetDetectedKey(0)
        -- do something
    end
end</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- example with minimal change (SLua Beta)
ll = llcompat

function llevents.touch_start(evts)
    num_detected = #evts
    for i = 0, num_detected -1 do
        local toucher = ll.GetDetectedKey(0)
        -- do something
    end
end</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- example with the table evts and the alternative events syntax (SLua Beta)
function llevents.touch_start(evts)
    for _, evt in evts do
        local toucher = evt:GetKey()
        -- do something
    end
end</code></pre>

<pre class="language-sluab"><code class="language-sluab">-- example with the table evts (SLua Beta)
local function myTouches(evts)
    for _, evt in evts do
        local toucher = evt:GetKey()
        -- do something
    end
end

llevents.on("touch_start", myTouches)</code></pre>


### LL functions compatibility, library llcompat


### 1-based LL functions


### boolean LL functions


### Script memory


### Others


### SLua editor


