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

- handler = **llevents.on**(name, handler) : adds an event handler.
  - name : the name of the event.
  - handler : the function that runs when the event happens.
  - returns the same function that we have passed in, so we can use it later to remove it.
    - We can add several functions to the same event, they will be called in the same order in which we add them.
    - If we add the same function again, it will be called twice (or as many times as we add it) when the event triggers.
    - All the functions are called, we can't stop the calling sequence when we have processed the event.
    - To remove the handler we will need the returned function if we have passed an anonymous function.

- newHandler = **llevents.once**(name, handler) : adds a one-time event handler.
  -  name : the name of the event.
  -  handler : our function to handle the event.
  -  returns a new function that we can use to remove the handler.
    - The function runs only once and is automatically removed from the event afterward.
    - Our function passed as handler is internally wrapped in another function and we get this new one as return.
    - To remove the handler we will always need the returned function.
 
- found = **llevents.off**(name, handler) : removes an event handler.
  -  name : the name of the event.
  -  handler : the function we want to stop handling the event.
  -  returns true if the function was removed, false otherwise.
    - If we have added the same function twice or more, only the last one added will be removed.
 
- eventsTable = **llevents.eventNames**() : returns which events are active.
  -  returns a table with all the event names that currently have functions handling them.

- handlersTable = **llevents.listeners**(name) : returns which handlers are attached to an event.
  -  name : the name of the event.
  -  returns a table with the functions currenty handling the event.





### Timers, library lltimers


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


