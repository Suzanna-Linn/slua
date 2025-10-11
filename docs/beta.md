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
llx = xllcompat

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


