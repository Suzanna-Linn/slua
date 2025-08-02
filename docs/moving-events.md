## Events and States

### Events

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
