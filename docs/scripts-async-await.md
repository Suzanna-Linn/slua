## Async / Await

A basic implementation of async/await functionality using coroutines to make the asynchronous requests look "synchronous".

<div class="script-box beginner">
<h4>A dataserver request</h4>
<p>an example of use, add the async/await code that is at the end of page</p>
<pre class="language-slua line-numbers"><code class="language-slua">-- start async/await section

-- === copy the Async / Await code here ===

-- end async/await section


local function getName(username)
    local id = await(ll.RequestUserKey(username))
    local displayName = if uuid(id).istruthy then await(ll.RequestDisplayName(id)) else "not found"
    ll.OwnerSay(displayName)
end

function dataserver(queryid, data)
   awaiting(queryid, data)  -- async/await
end

async(getName, "suzannalinn")</code></pre>
</div>
<div class="script-box intermediate">
<h4>dataserver and http requests</h4>
<p>an example of use, add the async/await code that is at the end of page</p>
<pre class="language-slua line-numbers"><code class="language-slua">-- start async/await section

-- === copy the Async / Await code here ===

-- end async/await section


local function getInfo(userId)
    local bornDate = await(ll.RequestAgentData(userId, DATA_BORN))
    local rating = await(ll.RequestSimulatorData(ll.GetRegionName(), DATA_SIM_RATING))
    ll.OwnerSay(`you are born in {bornDate} and this is a {rating} region`)
end

local function getQuote()
    local quote = await(ll.HTTPRequest("https://zenquotes.io/api/random",{},""))
    local json = lljson.decode(quote)
    ll.OwnerSay(`\n{json[1].q}\n{json[1].a}\n `)
end

function touch_start(numDetected)
    async(getInfo, ll.DetectedKey(0))
    async(getQuote)
end


function dataserver(queryid, data)
   awaiting(queryid, data)  -- async/await
end

function http_response(request_id, status, metadata, body)
   awaiting(request_id, body)  -- async/await
end</code></pre>
</div>
<div class="script-box advanced">
<h4>async/await code</h4>
<pre class="language-slua line-numbers"><code class="language-slua">-- Async / Await (by Suzanna Linn, 2025-09-11)

-- start async/await section

local _awaiting = {}

local function async(func, ...)
    coroutine.resume(coroutine.create(func),...)
end

local function awaiting(queryid, ...)
    if _awaiting[queryid] then
        coroutine.resume(_awaiting[queryid], ...)
        _awaiting[queryid] = nil
        return false
    else
        return true
    end
end

local function await(queryid)
    _awaiting[queryid] = coroutine.running()
    return coroutine.yield()
end

-- end async/await section


-- === PLACE YOUR CODE HERE ===


function dataserver(queryid, data)
   if awaiting(queryid, data) then  -- async/await
        -- other requests
   end
end

function http_response(request_id, status, metadata, body)
   if awaiting(request_id, body) then  -- async/await
        -- other requests
   end
end</code></pre>
</div>
