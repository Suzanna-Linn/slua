---
layout: default
title: Web server and MOAP
markup_content: true
---

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

{% capture slua %}-- using HTML in the URL

local DATA_URL = "data:text/html,"
local FACE_MEDIA = 2

local html = [=[<h1>Welcome to My Page!</h1><p>Hello, world! Isn't HTML amazing?</p><p>HTML stands for <strong>Hyper Text Markup Language</strong>.</p><p>Thanks for visiting! Have a <em>fantastic</em> day!</p>]=]

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

show(DATA_URL .. html){% endcapture %}

<pre class="language-slua line-numbers"><code class="language-slua">{{ slua | escape }}</code></pre>
</div>

### Displaying a notecard on MOAP

Uses an in-world URL and XHTML code to serve a page from the script.

URL's are assigned to the script and stop working when the script is reset or its object derezed or the region restarts.

We use XHTML because pages served as HTML are only visible to the owner of the object, to other people or opening the link in a web browser shows the HTML code.
<div class="script-box intermediate">
<h4>Notecard display</h4>
<p>Names between @...@ in the XHTML are to be replaced with generated XHTML code before serving the page</p>
{% capture slua %}-- Notecard display

local FACE_MEDIA = 2

local url = ""

local htmlNotecard = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>@NOTECARD_NAME@</title>
</head>
<body>
  <h1>@NOTECARD_NAME@</h1>
  @NOTECARD_LINES@
</body>
</html>
]=]

local htmlNotecardLines = [=[
  <p>@NOTECARD_LINE@</p>
]=]

local notecardName = ""
local notecardLine = 0
local requestLineId = NULL_KEY
local notecard = {}

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

local function sayUrl(url)
    ll.OwnerSay(url)
end

local function initialize()
    notecardName = ll.GetInventoryName(INVENTORY_NOTECARD, 0)
    if notecardName ~= "" then
        notecard = {}
        notecardLine = 0
        requestLineId = ll.GetNotecardLine(notecardName, notecardLine)
    else
        ll.OwnerSay("No notecards in the contents")
    end
end

function dataserver(request, data)
    if request == requestLineId then
        repeat
            if data ~= EOF then
                table.insert(notecard, ll.ReplaceSubString(htmlNotecardLines, "@NOTECARD_LINE@", data, 0))
                notecardLine += 1
                data = ll.GetNotecardLineSync(notecardName, notecardLine)
                if data == NAK then
                    requestLineId = ll.GetNotecardLine(notecardName, notecardLine)
                end
            end
        until data == EOF or data == NAK
        if data == EOF then
            ll.RequestURL()
        end
    end
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        sayUrl(url)
        show(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local html = ll.ReplaceSubString(htmlNotecard, "@NOTECARD_NAME@", notecardName, 0)
        html = ll.ReplaceSubString(html, "@NOTECARD_LINES@", table.concat(notecard), 0)
        ll.SetContentType(id, CONTENT_TYPE_XHTML)
        ll.HTTPResponse(id, 200, html)
    end
end

function on_rez(start_param)
    ll.ResetScript()
end

function changed(change)
    if bit32.btest(change, bit32.bor(CHANGED_REGION_START, CHANGED_OWNER, CHANGED_INVENTORY)) then
        ll.ResetScript()
    end
end

initialize(){% endcapture %}
<pre class="language-slua line-numbers"><code class="language-slua">{{ slua | escape }}</code></pre>
</div>
