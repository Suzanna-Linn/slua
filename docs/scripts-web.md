## Web server and MOAP

### Media viewer

Displays an external webpage using Media-on-a-prim.

Say the link to the webpage in public chat, starting with "http".

<div class="script-box beginner">
<h4>Media viewer</h4>
<pre class="language-slua line-numbers"><code class="language-slua">-- Media viewer

local FACE_MEDIA = 2

local function show(url)
    ll.SetPrimMediaParams(FACE_MEDIA, {
        PRIM_MEDIA_CURRENT_URL, url,
        PRIM_MEDIA_HOME_URL, url,
        PRIM_MEDIA_AUTO_ZOOM, false,
        PRIM_MEDIA_FIRST_CLICK_INTERACT, true,
        PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_ANYONE,
        PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
        PRIM_MEDIA_AUTO_PLAY, true
    })
end

local function initialize()
    ll.Listen(0, "", "", "")
end

function listen(channel, name, id, message)
    if channel == 0 then
        if message:sub(1,7) == "http://" or message:sub(1,8) == "https://" then
            show(message)
        end
    end
end

initialize()</code></pre>
</div>

### URL with HTML

We can set HTML code to the media face, adding "data:text/html," in front of the html code when we set the url. No headers, only the html that would go inside the <body>.

The maximum length of this "url" is 1024 characters.

<div class="script-box beginner">
<h4>URL with HTML</h4>
<p>The html string would usually be between quotes, I'm using [=[ to identify it as html for the syntax highlghter</p>
```
<pre class="language-slua line-numbers"><code class="language-slua">-- using HTML in the URL

local DATA_URL = "data:text/html,"
local FACE_MEDIA = 2

local html = [=[
<h1>Welcome to My Page!</h1><p>Hello, world! Isn't HTML amazing?</p><p>HTML stands for <strong>Hyper Text Markup Language</strong>.</p><p>Thanks for visiting! Have a <em>fantastic</em> day!</p>
]=]

local function show(url)
    ll.SetPrimMediaParams(FACE_MEDIA, {
        PRIM_MEDIA_CURRENT_URL, url,
        PRIM_MEDIA_HOME_URL, url,
        PRIM_MEDIA_AUTO_ZOOM, false,
        PRIM_MEDIA_FIRST_CLICK_INTERACT, true,
        PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_ANYONE,
        PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
        PRIM_MEDIA_AUTO_PLAY, true,
        PRIM_MEDIA_WIDTH_PIXELS, 512,
        PRIM_MEDIA_HEIGHT_PIXELS, 256
    })
end

show(DATA_URL .. html)
</code></pre>
```
</div>

