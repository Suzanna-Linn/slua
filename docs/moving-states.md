---
layout: default
title: States
slua_beta: true
---

## States

There aren't states in Slua.

The events <code class="language-lsl">state_entry()</code> and <code class="language-lsl">state_exit()</code> doesn't exist.

The script executes the code that is at the top level, out of the functions.

### The "New Script"

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// the "New Script" (LSL)

default
{
    state_entry()
    {
        llSay(0, "Hello, Avatar!");
    }

    touch_start(integer total_number)
    {
        llSay(0, "Touched.");
    }
}</code></pre>
</td><td>
<pre class="language-sluab"><code class="language-sluab">-- the "New Script" (SLua)


function LLEvents.touch_start(detected)
    ll.Say(0, "Touched.")
end


local function main()
    print("Hello, Avatar!")
end


main()</code></pre>
</td></tr></table>

To keep the LSL structure, we can write an initialization function instead of <code class="language-lsl">state_entry()</code>, for instance <code class="language-slua">main()</code> and call it from the top-level code.

### Simulating LSL states.

We can use one table for each "state" to store its event handlers:

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// states (LSL)



default {
    state_entry() {

    }

    touch_end(integer num_detected) {

    }

    state_exit() {

    }
}

state two {
    state_entry() {

    }

    state_exit() {
    
    }
}</code></pre>
</td><td>
<pre class="language-sluab"><code class="language-sluab">-- simulating states, "states" tables (SLua)

local default, two = {}, {}  -- tables for the "states" functions

function default.state_entry()

end

function default.touch_end(events)

end

function default.state_exit()

end




function two.state_entry()

end

function two.state_exit()

end
--</code></pre>
</td></tr></table>

And a function to change from one "state" to another using LLEvents to remove the handlers in a "state" table and add the handlers in the other:

<pre class="language-sluab"><code class="language-sluab">-- simulating states, function to change the "state" (SLua)

local _currentState = {}  -- store the current "state" table
local function state(newState)
    if newState ~= _currentState then  -- the state is changing
        if _currentState and _currentState.state_exit then  -- there is a current state with state_exit()
            _currentState.state_exit()
        end
        for _, eventName in LLEvents:eventNames() do  -- all the events
            for _, handler in LLEvents:listeners(eventName) do  -- all the handlers of the event
                LLEvents:off(eventName, handler)  -- removing handler
            end
        end
        for eventName, handler in newState do  -- all the functions in the "state" table
            if eventName ~= "state_entry" and eventName ~= "state_exit" then  -- except "entry" and "exit"
                LLEvents:on(eventName, handler)  -- adding handler
            end
        end
        _currentState = newState  -- "state" changed
        if _currentState.state_entry then  -- there is state_entry()
            _currentState.state_entry()
        end
    end
end</code></pre>

To change the state we use <code class="language-sluab">state(two)  -- SLua</code> instead of <code class="language-lsl">state two;  // LSL</code>

And after the "state" tables we add <code class="language-sluab">state(default)  -- SLua</code> to call state_entry() in the table "default".

### On state change

Aside of changing the events handlers when a state changes:
- All listens are released.
  - When all the handlers to the even "listen" are removed, LLEvents releseases all the listens.
- The event queue is cleared.
  - When all the handlers of an the even are removed, LLEvents remove the pending events from the event queue.
- Repeating sensors are released.
  - When all the handlers to the even "sensor" are removed, LLEvents releases the repeating sensor.
- The timer event clock is not cleared.
  - If the script uses the event "timer" and llcompat.SetTimerEvent() in the library llcompat:
    -  if the new state has a timer event, and the previous state has a timer set, the timer event in the new state will be triggered on the interval set in the previous state.
  - If the script uses LLTimers:
    - the timers will be triggered on the intervals set in the previous state.
    - the event "timer" used by LLTimers is protected and can't be removed by LLEvents:off(), we don't need to check for it in the function "state".
  - LLTimers and llcompat.SetTimerEvent() are incompatible, scripts can't use both.

### States example

The LSL wiki example for states:
<pre class="language-lsl"><code class="language-lsl">default
{
    state_entry()
    {
        llSay(0,
            "You either just saved the script after editing it"
            + "\nand/or the script (re)entered the default state.");

        // white and opaque text
        llSetText("Click to change states", <1.0, 1.0, 1.0>, (float)TRUE);
    }

    touch_end(integer num_detected)
    {
        // Note: NEVER do a state change from within a touch_start event -
        // - that can lead to the next touch_start on return to this state to be missed.
        // Here we do the state change safely, from within touch_end
        state two;
    }

    state_exit()
    {
        llSay(0, "The script leaves the default state.");
    }
}

state two
{
    state_entry()
    {
        llSay(0, "The script entered state 'two'");
        state default;
    }

    state_exit()
    {
        llSay(0, "The script leaves state 'two'");
    }
}</code></pre>

Becomes:
<pre class="language-sluab"><code class="language-sluab">-- simulating LSL states, LSL wiki example for states
    
local _currentState = {}
local function state(newState)
    if newState ~= _currentState then
        if _currentState and _currentState.state_exit then
            _currentState.state_exit()
        end
        for _, eventName in LLEvents:eventNames() do
            for _, handler in LLEvents:listeners(eventName) do
                LLEvents:off(eventName, handler)
            end
        end
        for eventName, handler in newState do
            if eventName ~= "state_entry" and eventName ~= "state_exit" then
                LLEvents:on(eventName, handler)
            end
        end
        _currentState = newState
        if _currentState.state_entry then
            _currentState.state_entry()
        end
    end
end

local default, two = {}, {}

function default.state_entry()
    ll.Say(0, "You either just saved the script after editing it" .. "\nand/or the script (re)entered the default state.")

    -- white and opaque text
    ll.SetText("Click to change states", vector(1.0, 1.0, 1.0), 1)
end

function default.touch_end(events)
    local num_detected = #events
    -- Note: NEVER do a state change from within a touch_start event -
    -- - that can lead to the next touch_start on return to this state to be missed.
    -- Here we do the state change safely, from within touch_end
    state(two)
end

function default.state_exit()
    ll.Say(0, "The script leaves the default state.")
end

function two.state_entry()
    ll.Say(0, "The script entered state 'two'")
    state(default)
end

function two.state_exit()
    ll.Say(0, "The script leaves state 'two'")
end

state(default)</code></pre>
