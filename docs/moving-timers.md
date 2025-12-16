---
layout: default
title: Timers
slua_beta: true
---

## Timers

### Object LLTimers

We have a new object **LLTimers** to work with timers.

**LLTimers** is a more flexible and dynamic way to set the timers allowing us to use several timers and to set different functions for each interval.

These are the methods in the object:

- *handler* = **LLTimers:every**(*seconds*, *handler*) : adds a timer.
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
<pre class="language-sluab"><code class="language-sluab">local function someThing()
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

An example with the syntax of all the methods:
<pre class="language-sluab"><code class="language-sluab">-- example with all the methods

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

An example of use, 2 different options:
<pre class="language-sluab"><code class="language-sluab">-- example with minimal change

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
<pre class="language-sluab"><code class="language-sluab">-- example with two timers

local function myTimer1()
    -- do something every 1 second
end

local function myTimer60()
    -- do something every 60 seconds
end

LLTimers:every(1, myTimer1)
LLTimers:every(60, myTimer60)</code></pre>

LLTimers passes two parameters to the handler function:
- The expected trigger time. The actual trigger time could be a few milliseconds later, never before.
- The interval. It's nil with LLTimers:once().

We can compare the expected time to ll.GetTime(), which now has more precission, to know the delay. LLTimers and ll.GetTime() time is set to 0 when the script starts running:
<pre class="language-sluab"><code class="language-sluab">-- comparing actual and expected time
local function myTimer(expected, interval)
    print(ll.GetTime() - expected)  -- delay
end

LLTimers:every(1, myTimer)</code></pre>
We can use the interval, in case that we are using the same function with different intervals, to know which timer has called it.
