## The "New Script"

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
<pre class="language-slua line-numbers"><code class="language-slua">-- the "New Script" (SLua - LSL style)



function state_entry()
    ll.Say(0, "Hello, Avatar!")
end


function touch_start(total_number)
   ll.Say(0, "Touched.")
end



state_entry()</code></pre>
</td><td>
<pre class="language-slua line-numbers"><code class="language-slua">-- the "New Script" (SLua - Lua style)








function touch_start(total_number)
   ll.Say(0, "Touched.")
end



ll.Say(0, "Hello, Avatar!")</code></pre>
</td></tr></table>


SLua doesn't have states and there are no events <code class="language-lsl">state_entry</code> or <code class="language-lsl">state_exit</code>.

To keep the LSL structure, we can write a function with name <code class="language-slua">state_entry</code> (it's not an event, just a function) and call it from the top-level code (LSL-style script, line  16).

Or move the code in the LSL <code class="language-lsl">state_entry</code> to the top-level code (Lua-style script, line  16).
