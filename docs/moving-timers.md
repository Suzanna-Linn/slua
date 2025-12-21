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
- The interval. It's nil with LLTimers:once(). The actual interval could be a few milliseconds longer or shorter.

We can compare the expected time to ll.GetTime(), which now has more precission, to know the delay. LLTimers and ll.GetTime() time is set to 0 when the script starts running:
<pre class="language-sluab"><code class="language-sluab">-- comparing actual and expected time
local function myTimer(expected, interval)
    print(ll.GetTime() - expected)  -- delay
end

LLTimers:every(1, myTimer)</code></pre>
We can use the interval, in case that we are using the same function with different intervals, to know which timer has called it.

### Time related removed functions

These functions doesn't exist in SLua:
- ll.SetTimerEvent()
- ll.ResetTime()
- ll.GetAndResetTime()

We can still use them in the llcompat library, but the 3 time-related functions are not compatible with the LLTimers object.

We can't use the old timer functions and LLTimers together because they would interfere one another and would fail.

The old timer event, to be used with llcompat.SetTimerEvent(), is:

<pre class="language-sluab"><code class="language-sluab">-- using the old event timer
function LLEvents.timer()
    -- do timer things
end

llcompat.SetTimerEvent(1)</code></pre>

ll.GetTime() returns the time since the script started running (after reset or save).

Instead of resetting it with ll.ResetTime() we need to use a variable to store the start time:
<pre class="language-sluab"><code class="language-sluab">-- example of hold-touch without resetting the time
local isHoldTouch = false
local timeTouch = 0

LLEvents:on("touch_start", function(events)
    timeTouch = ll.GetTime()
    isHoldTouch = false
end)

LLEvents:on("touch", function(events)
    if ll.GetTime() - timeTouch > 1 and not isHoldTouch then
        isHoldTouch = true
        -- do hold-touch things
    end
end)

LLEvents:on("touch_end", function(events)
    if not isHoldTouch then
        -- do touch things
    end
end)</code></pre>

### Timer internals

We can know how many timers are set with <code class="language-sluab">tostring(LLTimers)</code>:
<pre class="language-sluab"><code class="language-sluab">-- number of timers

LLTimers:every(60, function() print("minute") end)
LLTimers:every(3600, function() print("hour") end)
LLTimers:every(86400, function() print("day") end)

print(LLTimers)  -- > LLTimers{timers=3}

local timersSet = tonumber(tostring(LLTimers):match("timers=(%d+)"))
print(timersSet)  -- > 3</code></pre>

Internally there is only one timer. LLTimers uses this timer and the event "timer":
<pre class="language-sluab"><code class="language-sluab">LLTimers:every(15, function() print("15 seconds tick") end)

local events = LLEvents:eventNames()
local timerHandle = LLEvents:listeners("timer")

print(table.concat(events, ", "))  -- > timer
print(#timerHandle)  -- > 1</code></pre>

Its handler is protected, LLEvents:listeners() returns a handler that isn´t the actual one.  
We can't stop it:
<pre class="language-sluab"><code class="language-sluab">LLTimers:every(15, function() print("15 seconds tick") end)

-- trying to stop the event "timer"
LLEvents:off("timer", LLEvents:listeners("timer")[1])

local events = LLEvents:eventNames()
local timerHandle = LLEvents:listeners("timer")

-- but it's still there
print(table.concat(events, ", "))  -- > timer
print(#timerHandle)  -- > 1</code></pre>

### Timer delays and catch-ups

LLTimers is called once on each time frame to process the timers (if the script is not busy doing something else).
A time frame is about 1/45th of second or 0.022 seconds.

The timers will be trigered a few milliseconds later than scheduled, depending on when the LLTimers is called. They will never be triggered before the scheduled time.

The next timer tick is scheduled from the current schedule and not from the current time. Intervals between timer ticks could be a few milliseconds longer or shorter:
<pre class="language-sluab"><code class="language-sluab">-- normal timer

local lastTick = 0
LLTimers:every(1, function(expected, interval)
    currentTime = ll.GetTime()
    print(string.format("%18.15f%20.15f%20.15f", expected, currentTime, currentTime - lastTick))
    lastTick = currentTime
end)
--[[
    expected time       current time        interval
 2.001613999978872   2.022656999994069   0.999803999991855
 3.001613999978872   3.022907999984454   1.000250999990385
 4.001613999978872   4.022590999986278   0.999683000001824
 5.001613999978872   5.022719000000507   1.000128000014229
 6.001613999978872   6.022799999976996   1.000080999976490
]]</code></pre>

Timers can be triggered only once in each time frame. Timers set to less than 0.02 seconds will not be faster:
<pre class="language-sluab"><code class="language-sluab">-- short timer

local lastTick = 0
LLTimers:every(0.01, function(expected, interval)
    currentTime = ll.GetTime()
    print(string.format("%18.15f%20.15f", currentTime, currentTime - lastTick))
    lastTick = currentTime
end)
--[[
    current time       interval
 0.022603000019444   0.022603000019444
 0.045783000008669   0.023179999989225
 0.067921000008937   0.022138000000268
 0.089831000019331   0.021910000010394
 0.112087999994401   0.022256999975070
]]</code></pre>

When the event "timer" is delayed because the script is executing other events or the script is paused and resumed because of teleport, regions crossing, detach/attach, derez/rez, region restart, etc:
- if the delay is below 2 seconds, LLTimers tries to catch up, triggering one event in each time frame.
- if the delay is more than 2 seconds (or exactly 2 seconds), LLTimers reschedules the next tick adding the interval to the current time.

We can discard the fast ticks if we don't want them:
<pre class="language-sluab"><code class="language-sluab">-- discarding catch-up ticks

local lastTick = 0

LLTimers:every(2, function(expected, interval)
    local currentTime = ll.GetTime()
    if (currentTime - lastTick  > interval - 0.05) then
        -- do timer things
        lastTick = currentTime
    end
end)</code></pre>

A short pause, LLTimers catches up:
<pre class="language-sluab"><code class="language-sluab">-- short pause
  
LLTimers:every(0.5, function(expected, interval)
    print(string.format("%18.15f%5.1f%20.15f", expected, interval, ll.GetTime()))
end)
--[[
    expected time     int       current time
 3.744617999996990    0.5    3.755671999999322
 4.244617999996990    0.5    4.266828999971040
 4.744617999996990    0.5    4.755670999991707
( a teleport here )
 5.244617999996990    0.5    7.031092999939574
( less than 2 seconds behind, catching up )
 5.744617999996990    0.5    7.053188999940176
 6.244617999996990    0.5    7.075179999941611
 6.744617999996990    0.5    7.097259999936796
 7.244617999996990    0.5    7.253033999935724
 7.744617999996990    0.5    7.764567999940482
]]</code></pre>

A long pause, LLTimers reschedules:
<pre class="language-sluab"><code class="language-sluab">-- long pause
LLTimers:every(1, function(expected, interval)
    print(string.format("%18.15f%3d%20.15f", expected, interval, ll.GetTime()))
end)
--[[
    expected time   i      current time
 1.000510999991093  1   1.022607999999309
 2.000510999991093  1   2.022523999999976
 3.000510999991093  1   3.022410999983549
( object detached and attached)
 4.000510999991093  1   9.911324999993667
( more than 2 seconds behind, next tick recalculated from the current time)
10.911324999993667  1  10.911449000006542
11.911324999993667  1  11.934320000000298
]]</code></pre>

Short timers are also rescheduled when they fall behind more than 2 seconds:
<pre class="language-sluab"><code class="language-sluab">-- short timer
LLTimers:every(0.01, function(expected, interval)
    print(string.format("%18.15f%6.2f%20.15f", expected, interval, ll.GetTime()))
end)
--[[
 (after about 160 ticks)
    expected time   int       current time
 4.919829999994219  0.01   6.912322999996832
 4.929829999994219  0.01   6.934133000002475
(not yet 2 seconds behind, it compares the next tick with the current time: 6.934 - 4.939  < 2 )
 4.939829999994219  0.01   6.956741000001784
( more than 2 seconds behind: 6.956 - 4.949 > 2, next tick recalculated from the current time)
 6.966741000001784  0.01   6.978368999989470
 6.976741000001784  0.01   7.000942999991821
 6.986741000001784  0.01   7.022836999996798
]]</code></pre>

Timers with an interval of 0 are useful in LLTimers:once() to allow other events to be executed placing the timed function after them.  
They are scheduled to the current time for its next tick, ensuring that they can be triggered in the next time frame
<pre class="language-sluab"><code class="language-sluab">-- zero timer
LLTimers:every(0, function(expected, interval)
    print(string.format("%18.15f%3d%20.15f", expected, interval, ll.GetTime()))
end)
--[[
    expected time   i      current time
 0.002203000010923  0   0.022972000006121
 0.022972000006121  0   0.045318999997107
 0.045318999997107  0   0.067628999997396
 0.067628999997396  0   0.089823999995133
 0.089823999995133  0   0.112355999997817
]]</code></pre>
