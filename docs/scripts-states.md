## States

Simulating LSL states

<div class="script-box intermediate">
<h4>States, with the LSL default "new script"</h4>
<pre class="language-lsl line-numbers"><code class="language-lsl">default
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
<pre class="language-sluab line-numbers"><code class="language-sluab">-- simulating LSL states

local currentState

local function state(fnState)
    if fnState ~= currentState then
        if currentState and currentState.state_exit then
            currentState.state_exit()
        end
        for _, eventName in LLEvents:eventNames() do
            for _, handler in LLEvents:listeners(eventName) do
                LLEvents:off(eventName, handler)
            end
        end
        for ev, fn in fnState do
            if ev ~= "state_entry" and ev ~= "state_exit" then
                LLEvents:on(ev,fn)
            end
        end
        currentState = fnState
        if currentState.state_entry then
            currentState.state_entry()
        end
    end
end

local default = {}

function default.state_entry()
    ll.Say(0, "Hello, Avatar!");
end

function default.touch_start(events)
    ll.Say(0, "Touched.");
end

state(default)</code></pre>
</div>


<div class="script-box intermediate">
<h4>States, with the LSL wiki example for states</h4>
<pre class="language-lsl line-numbers">default
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
}
<code class="language-lsl"></code></pre>
<pre class="language-sluab line-numbers"><code class="language-sluab">local currentState

local function state(fnState)
    if fnState ~= currentState then
        if currentState and currentState.state_exit then
            currentState.state_exit()
        end
        for _, eventName in LLEvents:eventNames() do
            for _, handler in LLEvents:listeners(eventName) do
                LLEvents:off(eventName, handler)
            end
        end
        for ev, fn in fnState do
            if ev ~= "state_entry" and ev ~= "state_exit" then
                LLEvents:on(ev,fn)
            end
        end
        currentState = fnState
        if currentState.state_entry then
            currentState.state_entry()
        end
    end
end

local default, two = {}, {}

function default.state_entry()
    ll.Say(0,
        "You either just saved the script after editing it"
        .. "\nand/or the script (re)entered the default state.")

    -- white and opaque text
    ll.SetText("Click to change states", vector(1.0, 1.0, 1.0), 1)
end

function default.touch_end(num_detected)
    -- Note: NEVER do a state change from within a touch_start event -
    -- that can lead to the next touch_start on return to this state to be missed.
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
    ll.Say(0, "The script leaves state 'two'");
end

state(default)</code></pre>
</div>



<div class="script-box advanced">
<h4>States, using a closure to avoid the script-wide variable</h4>
<pre class="language-sluab line-numbers"><code class="language-sluab"></code></pre>
</div>
