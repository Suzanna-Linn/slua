## Events and States

### Events (future)

A new more powerful way to handle events is expected before the beta version.

There will be a LL library with functions to add and remove event handlers with callback functions.

There are comments about the possible format in this links:
https://github.com/secondlife/issues/pull/3
https://feedback.secondlife.com/slua-alpha/p/events-in-slua

### Events (currently)

Events are writen as global functions (without the <code class="language-slua">local</code> keyword).

They have the same names and parameters.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// events (LSL)

touch_start(integer num_detected)
{
    // do something
}

listen(integer channel, string name, key id, string message)
{
    // do something
}</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- events (SLua)

function touch_start(num_detected)
    -- do something
end


function listen(channel, name, id, message)
    // do something
end
--</code></pre>
</td></tr></table>

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
}

//</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- the "New Script" (SLua - LSL style)



function state_entry()
    ll.Say(0, "Hello, Avatar!")
end


function touch_start(total_number)
   ll.Say(0, "Touched.")
end



state_entry()</code></pre>
</td><td>
<pre class="language-slua"><code class="language-slua">-- the "New Script" (SLua - Lua style)








function touch_start(total_number)
   ll.Say(0, "Touched.")
end



ll.Say(0, "Hello, Avatar!")</code></pre>
</td></tr></table>


SLua doesn't have states and there are no events <code class="language-lsl">state_entry()</code> or <code class="language-lsl">state_exit()</code>.

To keep the LSL structure, we can write a function with name <code class="language-slua">state_entry()</code> (it's not an event, just a function) and call it from the top-level code (LSL-style script, last line).

Or move the code in the LSL <code class="language-lsl">state_entry()</code> to the top-level code (Lua-style script, last line).

### States

There aren't states in Slua.

The events <code class="language-lsl">state_entry()</code> and <code class="language-lsl">state_exit()</code> doesn't exist.

The script executes the code that is at the top level, out of the functions.

We can simulate states with functions with different names, one for each state, for each event. To change to another "state" we assign the function for this "state" to the name of the event.

<table><tr><td>
<pre class="language-lsl"><code class="language-lsl">// states (LSL)

default
{
    touch_end(integer num_detected)
    {
        llOwnerSay("Changing to state ready");
        state ready;
    }
}

state ready
{
    touch_end(integer num_detected)
    {
        llOwnerSay("Changing to state default");
        state default;
    }
}


//</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- states (SLua)


-- function for the event in the "state" default
function touch_end_default(num_detected)
    ll.OwnerSay("Changing to state ready")
    touch_end = touch_end_ready  -- we change the function that handles the event
end




-- function for the event in the "state" ready
function touch_end_ready(num_detected)
    ll.OwnerSay("Changing to state default")
    touch_end = touch_end_default  -- we change the function that handles the event
end


-- in Lua we can assign a function to a variable
-- touch_end becomes a function, the same than touch_end_default
touch_end = touch_end_default</code></pre>
</td></tr></table>
