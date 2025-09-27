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
<h4>URL with HTML<span class="extra">HTML</span></h4>
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
<h4>Notecard display<span class="extra">HTML</span></h4>
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

### Displaying random quotes in single or multi view

The pages are not rendered by the server. They are rendered by our local viewer (Firestorm, etc).

When the script sets an url with llSetPrimMediaParams(), the server stores this url, as part of the object, in the info of the face of the object.  
The server does nothing else with the url, only storing it. It doesn't use the url, it doesn't make the request, anything.  
It's our local viewer that requests the url and displays the answer.  

When the media object comes into our view, our local viewer receives all the info of the object, including the media url, from the server.  
Our local viewer opens its internal web browser, and embeds it in the face showing the media. The viewer requests the url and the viewer's web browser displays the media on the face of the object.  
Each face with media needs its own web browser instance.

In the script, when we use an in-world URL, its http_request is triggered once for each avatar looking at it. If nobody is looking http_request is not be triggered.

The next scripts request a new random quote from an external server at owner's touch. The first script shows the same quote to everyone, the second one shows a different quote to each viewer or internal/external browser using the link.

<div class="script-box intermediate">
<h4>Random quotes: single view<span class="extra">HTML</span></h4>
<p4>Requesting the quote on touch, serving the same one</p4>
<p4>It adds a time to the media URL that is not used, but we need to set a different URL to make it reload</p4>
{% capture slua %}-- Random quotes (single view)

local url = ""

local htmlQuote = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Quote of the Moment</title>
</head>
<body>
  <h1 style="color: green;">@QUOTE@</h1>
  <h1 style="color: green;">@AUTHOR@</h1>
</body>
</html>
]=]

local WEB_API = "https://zenquotes.io/api/random"
local FACE_MEDIA = 2

local httpRequestId = NULL_KEY
local html = ""
local requestCount = 0

local function show(url)
    ll.SetPrimMediaParams(FACE_MEDIA, {
        PRIM_MEDIA_CURRENT_URL, url,
        PRIM_MEDIA_HOME_URL, url,
        PRIM_MEDIA_AUTO_ZOOM, false,
        PRIM_MEDIA_FIRST_CLICK_INTERACT, true,
        PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_ANYONE,
        PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
        PRIM_MEDIA_AUTO_PLAY, true,
        PRIM_MEDIA_WIDTH_PIXELS, 1024,
        PRIM_MEDIA_HEIGHT_PIXELS, 256
    })
end

local function initialize()
    ll.ClearPrimMedia(FACE_MEDIA)
    requestCount = 0
    ll.RequestURL()
end

function touch_start(num_detected)
    if ll.DetectedKey(0) == ll.GetOwner() then
        if requestCount ~= 0 then
            ll.OwnerSay(`{requestCount} requests to the previous page`)
            requestCount = 0
        end
        httpRequestId = ll.HTTPRequest(WEB_API, {}, "")
    end
end

function http_response(request_id, status, metadata, body)
    if httpRequestId == request_id then
        local json = lljson.decode(body)
        html = ll.ReplaceSubString(htmlQuote, "@QUOTE@", json[1].q, 0)
        html = ll.ReplaceSubString(html, "@AUTHOR@", json[1].a, 0)
        show(`{url}/?time={os.time()}`)
    end
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        ll.OwnerSay(url)
        httpRequestId = ll.HTTPRequest(WEB_API, {}, "")
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        ll.SetContentType(id, CONTENT_TYPE_XHTML)
        ll.HTTPResponse(id, 200, html)
        requestCount += 1
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
<div class="script-box intermediate">
<h4>Random quotes: multi view<span class="extra">HTML</span></h4>
<p4>Requesting the quote on request, serving different ones</p4>
{% capture slua %}-- Random quotes (multi view)

local url = ""

local htmlQuote = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Quote of the Moment</title>
</head>
<body>
  <h1 style="color: blue;">@QUOTE@</h1>
  <h1 style="color: blue;">@AUTHOR@</h1>
</body>
</html>
]=]

local WEB_API = "https://zenquotes.io/api/random"
local FACE_MEDIA = 2

local requests = {}
local requestCount = 0

local function show(url)
    ll.SetPrimMediaParams(FACE_MEDIA, {
        PRIM_MEDIA_CURRENT_URL, url,
        PRIM_MEDIA_HOME_URL, url,
        PRIM_MEDIA_AUTO_ZOOM, false,
        PRIM_MEDIA_FIRST_CLICK_INTERACT, true,
        PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_ANYONE,
        PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
        PRIM_MEDIA_AUTO_PLAY, true,
        PRIM_MEDIA_WIDTH_PIXELS, 1024,
        PRIM_MEDIA_HEIGHT_PIXELS, 256
    })
end

local function initialize()
    ll.ClearPrimMedia(FACE_MEDIA)
    requests = {}
    requestCount = 0
    ll.RequestURL()
end

function touch_start(num_detected)
    if ll.DetectedKey(0) == ll.GetOwner() then
        requests = {}
        if requestCount ~= 0 then
            ll.OwnerSay(`{requestCount} requests to the previous page`)
            requestCount = 0
        end
        show(`{url}/?time={os.time()}`)
    end
end

function http_response(request_id, status, metadata, body)
    if requests[request_id] then
        local id = requests[request_id]
        local json = lljson.decode(body)
        local html = ll.ReplaceSubString(htmlQuote, "@QUOTE@", json[1].q, 0)
        html = ll.ReplaceSubString(html, "@AUTHOR@", json[1].a, 0)
        ll.SetContentType(id, CONTENT_TYPE_XHTML)
        ll.HTTPResponse(id, 200, html)
        requests[request_id] = nil
    end
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        ll.OwnerSay(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        requests[ll.HTTPRequest(WEB_API, {}, "")] = id
        requestCount += 1
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

### List of Visitors

Four scripts showing a list of the visitors in the region with progressive improvements:
- HTML only, no styling (looks ugly).
- HTML and CSS styling.
- Multipage single view (index, visitors and language) using links. When a page is changed, it changes in all the viewers.
- Multipage multi view using buttons. Viewers have independent navigation, each one can be in a different page.

<div class="script-box intermediate">
<h4>List of visitors, single page, no styling<span class="extra">HTML</span></h4>
{% capture slua %}-- List of visitors, single page, no styling

local FACE_MEDIA = 2

local url = ""

local htmlVisitorsList = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Table of Visitors</title>
</head>
<body>
  <h1>Table of Visitors</h1>
  <table border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Visitors: @TOTAL_VISITORS@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
</body>
</html>
]=]

local htmlVisitorsListTable = [=[
      <tr>
        <td>@NAME@</td>
        <td>@USERNAME@</td>
      </tr>
]=]

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

local function tableVisitors(html)
    local rows = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        local row = htmlVisitorsListTable
        row = ll.ReplaceSubString(row, "@NAME@", ll.GetDisplayName(visitor), 0)
        row = ll.ReplaceSubString(row, "@USERNAME@", ll.GetUsername(visitor), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_VISITORS@", tostring(#visitors), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows), 0)
    return html
end

local function initialize()
    ll.RequestURL()
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        sayUrl(url)
        show(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local html = tableVisitors(htmlVisitorsList)
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
<div class="script-box intermediate">
<h4>List of visitors, single page, CSS styling<span class="extra">HTML</span><span class="extra">CSS</span></h4>
{% capture slua %}-- List of visitors, single page, CSS styling

local FACE_MEDIA = 2

local url = ""

local htmlVisitorsList = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Table of Visitors</title>
  <style type="text/css">
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }

    table {
      width: 80%;
      margin: 0 auto;
      border-collapse: collapse;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #4CAF50;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    tfoot td {
      font-weight: bold;
      background-color: #f9f9f9;
    }

    tfoot td:first-child {
      text-align: right;
    }

  </style>
</head>
<body>
  <h1>Table of Visitors</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Visitors: @TOTAL_VISITORS@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
</body>
</html>
]=]

local htmlVisitorsListTable = [=[
      <tr>
        <td>@NAME@</td>
        <td>@USERNAME@</td>
      </tr>
]=]

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

local function tableVisitors(html)
    local rows = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        local row = htmlVisitorsListTable
        row = ll.ReplaceSubString(row, "@NAME@", ll.GetDisplayName(visitor), 0)
        row = ll.ReplaceSubString(row, "@USERNAME@", ll.GetUsername(visitor), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_VISITORS@", tostring(#visitors), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows), 0)
    return html
end

local function initialize()
    ll.RequestURL()
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        ll.OwnerSay(url)
        show(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local html = tableVisitors(htmlVisitorsList)
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
<div class="script-box intermediate">
<h4>List of visitors, multipage, single view, CSS styling<span class="extra">HTML</span><span class="extra">CSS</span></h4>
<p>Links send GET requests and change the media URL</p>
{% capture slua %}-- List of visitors, multipage, single view, CSS styling

local FACE_MEDIA = 2

local url = ""

local htmlHeader = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>@TITLE@</title>
  @STYLE@
</head>
<body>
  @BODY@
</body>
</html>
]=]

local htmlStyle = [=[
  <style type="text/css">
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }
    table {
      width: 80%;
      margin: 0 auto;
      border-collapse: collapse;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #4CAF50;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
    tfoot td {
      font-weight: bold;
      background-color: #f9f9f9;
    }
    tfoot td:first-child {
      text-align: right;
    }
  </style>
]=]

local htmlLinks = [=[
  <h1>Links Page</h1>
  <ul>
    <li><a href="visitors" title="Go to the visitors list">Visitors</a></li>
    <li><a href="languages" title="Go to the languages list">Languages</a></li>
  </ul>
]=]

local htmlLinksTitle = "Links Page"

local htmlVisitors = [=[
  <h1>Table of Visitors</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Visitors: @TOTAL_VISITORS@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
  <a href="links" title="Go back to the links page">Back</a>
]=]

local htmlVisitorsTable = [=[
      <tr>
        <td>@NAME@</td>
        <td>@USERNAME@</td>
      </tr>
]=]

local htmlVisitorsTitle = "Table of Visitors"

local htmlLanguages = [=[
  <h1>Table of Languages</h1>
  <table>
    <thead>
      <tr>
        <th>Language</th>
        <th>Visitors</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Languages: @TOTAL_LANGUAGES@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
  <a href="links" title="Go back to the links page">Back</a>
]=]

local htmlLanguagesTable = [=[
      <tr>
        <td>@LANGUAGE@</td>
        <td>@VISITORS@</td>
      </tr>
]=]

local htmlLanguagesTitle = "Table of Languages"

local function show(url)
    ll.SetPrimMediaParams(FACE_MEDIA, {
        PRIM_MEDIA_CURRENT_URL, url,
        PRIM_MEDIA_HOME_URL, url,
        PRIM_MEDIA_AUTO_ZOOM, false,
        PRIM_MEDIA_FIRST_CLICK_INTERACT, true,
        PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_OWNER,
        PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
        PRIM_MEDIA_AUTO_PLAY, true
    })
end

local function tableVisitors(html)
    local rows = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        local row = htmlVisitorsTable
        row = ll.ReplaceSubString(row, "@NAME@", ll.GetDisplayName(visitor), 0)
        row = ll.ReplaceSubString(row, "@USERNAME@", ll.GetUsername(visitor), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_VISITORS@", tostring(#visitors), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows), 0)
    return html
end

local LANGUAGES = {
    en = "English",   da = "Danish",  de = "German",   es = "Spanish",    fr = "French",  it = "Italian",
    hu = "Hungarian", nl = "Dutch",   pl = "Polish",   pt = "Portuguese", ru = "Russian", tr = "Turkish",
    uk = "Ukrainian", zh = "Chinese", ja = "Japanese", ko = "Korean",     [""] = "unknown"
}

local function tableLanguages(html)
    local languages = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        local language = ll.GetAgentLanguage(visitor)
        languages[language] = (languages[language] or 0) + 1
    end
    local lang = {}
    for code, count in languages do
        table.insert(lang, {code = code, count = count})
    end
    table.sort(lang, function(a, b)
        return if a.count ~= b.count then
            a.count > b.count
        else
            a.code < b.code
    end)
    local rows = {}
    for _, language in lang do
        local languageName = LANGUAGES[language.code] or language.code
        local row = htmlLanguagesTable
        row = ll.ReplaceSubString(row, "@LANGUAGE@", languageName, 0)
        row = ll.ReplaceSubString(row, "@VISITORS@", tostring(language.count), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_LANGUAGES@", tostring(#lang - if languages[""] then 1 else 0), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows), 0)
    return html
end

local function initialize()
    ll.RequestURL()
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body .. "/links"
        ll.OwnerSay(url)
        show(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local query = ll.ToLower(ll.GetHTTPHeader(id, "x-query-string"))
        local html = ll.ReplaceSubString(htmlHeader, "@STYLE@", htmlStyle, 0)
        if path == "/links" then
            html = ll.ReplaceSubString(html, "@TITLE@", htmlLinksTitle, 0)
            html = ll.ReplaceSubString(html, "@BODY@", htmlLinks, 0)
        elseif path == "/visitors" then
            html = ll.ReplaceSubString(html, "@TITLE@", htmlVisitorsTitle, 0)
            html = ll.ReplaceSubString(html, "@BODY@", tableVisitors(htmlVisitors), 0)
        elseif path == "/languages" then
            html = ll.ReplaceSubString(html, "@TITLE@", htmlLanguagesTitle, 0)
            html = ll.ReplaceSubString(html, "@BODY@", tableLanguages(htmlLanguages), 0)
        end
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
<div class="script-box intermediate">
<h4>List of visitors, multipage, multi view, CSS styling<span class="extra">HTML</span><span class="extra">CSS</span></h4>
<p>Buttons in forms with method="POST" and action="" show the page returned to the request and don't change the media URL</p>
{% capture slua %}-- List of visitors, multipage, multi view, CSS styling

local FACE_MEDIA = 2

local url = ""

local htmlHeader = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>@TITLE@</title>
  @STYLE@
</head>
<body>
  @BODY@
</body>
</html>
]=]

local htmlStyle = [=[
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      color: #ffffff;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
    }

    h1 {
      font-size: 2.5em;
      text-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      margin-bottom: 1em;
    }

    form {
      display: inline-block;
      margin: 0.5em;
    }

    table {
      margin: 0 auto;
      border-collapse: collapse;
      width: 80%;
      margin-bottom: 2em;
      background: #f9f9f9;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    th, td {
      padding: 0.25em;
      text-align: left;
      font-size: 1.75em;
      border: 1px solid #ddd;
    }

    th {
      background: linear-gradient(135deg, #ff7e5f, #feb47b);
      color: #ffffff;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    td {
      background: #ffffff;
      color: #333;
      transition: background-color 0.3s ease;
    }

    td:nth-child(even) {
      background: #f4f7fb;
    }

    tr:nth-child(odd) td {
      background: #fefefe;
    }

    tr:hover td {
      background: linear-gradient(135deg, #ff7e5f, #feb47b);
      color: #fff;
    }

    tfoot {
      background: #2a5298;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }

    tfoot td {
      padding: 0.5em;
      font-size: 1.75em;
    }

    button {
      background: linear-gradient(135deg, #ff7e5f, #feb47b);
      border: none;
      padding: 1em 2em;
      font-size: 1.75em;
      font-weight: bold;
      color: #fff;
      border-radius: 50px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    button:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }

    button:active {
      transform: translateY(0);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }

    button[title]::after {
      content: attr(title);
      display: block;
      font-size: 1em;
      color: #d4d4d4;
      margin-top: 0.5em;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h1, table, form {
      animation: fadeIn 1s ease forwards;
    }
  </style>
]=]

local htmlLinks = [=[
  <h1>Links Page</h1>
  <form action="" method="POST">
    <button type="submit" name="button" value="visitors" title="Go to the visitors list">Visitors</button>
  </form>
  <form action="" method="POST">
    <button type="submit" name="button" value="languages" title="Go to the languages list">Languages</button>
  </form>
]=]

local htmlLinksTitle = "Links Page"

local htmlVisitors = [=[
  <h1>Table of Visitors</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Visitors: @TOTAL_VISITORS@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
  <form action="" method="POST">
    <button type="submit" name="button" value="links" title="Go back to the links page">Back</button>
  </form>
]=]

local htmlVisitorsTable = [=[
      <tr>
        <td>@NAME@</td>
        <td>@USERNAME@</td>
      </tr>
]=]

local htmlVisitorsTitle = "Table of Visitors"

local htmlLanguages = [=[
  <h1>Table of Languages</h1>
  <table>
    <thead>
      <tr>
        <th>Language</th>
        <th>Visitors</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Languages: @TOTAL_LANGUAGES@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
  <form action="" method="POST">
    <button type="submit" name="button" value="links" title="Go back to the links page">Back</button>
  </form>
]=]

local htmlLanguagesTable = [=[
      <tr>
        <td>@LANGUAGE@</td>
        <td>@VISITORS@</td>
      </tr>
]=]

local htmlLanguagesTitle = "Table of Languages"

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

local function parseQuery(query)
    local params = {}
    for key, value in query:gmatch("([^&=]+)=?([^&]*)") do
        params[ll.UnescapeURL(key)] = ll.UnescapeURL((value:gsub("+"," ")))
    end
    return params
end

local function tableVisitors(html)
    local rows = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        local row = htmlVisitorsTable
        row = ll.ReplaceSubString(row, "@NAME@", ll.GetDisplayName(visitor), 0)
        row = ll.ReplaceSubString(row, "@USERNAME@", ll.GetUsername(visitor), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_VISITORS@", tostring(#visitors), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows), 0)
    return html
end

local LANGUAGES = {
    en = "English",   da = "Danish",  de = "German",   es = "Spanish",    fr = "French",  it = "Italian",
    hu = "Hungarian", nl = "Dutch",   pl = "Polish",   pt = "Portuguese", ru = "Russian", tr = "Turkish",
    uk = "Ukrainian", zh = "Chinese", ja = "Japanese", ko = "Korean",     [""] = "unknown"
}

local function tableLanguages(html)
    local languages = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        local language = ll.GetAgentLanguage(visitor)
        languages[language] = (languages[language] or 0) + 1
    end
    local lang = {}
    for code, count in languages do
        table.insert(lang, {code = code, count = count})
    end
    table.sort(lang, function(a, b)
        return if a.count ~= b.count then
            a.count > b.count
        else
            a.code < b.code
    end)
    local rows = {}
    for _, language in lang do
        local languageName = LANGUAGES[language.code] or language.code
        local row = htmlLanguagesTable
        row = ll.ReplaceSubString(row, "@LANGUAGE@", languageName, 0)
        row = ll.ReplaceSubString(row, "@VISITORS@", tostring(language.count), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_LANGUAGES@", tostring(#lang - if languages[""] then 1 else 0), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows), 0)
    return html
end

local function responsePage(id, page)
    local html = ll.ReplaceSubString(htmlHeader, "@STYLE@", htmlStyle, 0)
    if page == "links" then
        html = ll.ReplaceSubString(html, "@TITLE@", htmlLinksTitle, 0)
        html = ll.ReplaceSubString(html, "@BODY@", htmlLinks, 0)
    elseif page == "visitors" then
        html = ll.ReplaceSubString(html, "@TITLE@", htmlVisitorsTitle, 0)
        html = ll.ReplaceSubString(html, "@BODY@", tableVisitors(htmlVisitors), 0)
    elseif page == "languages" then
        html = ll.ReplaceSubString(html, "@TITLE@", htmlLanguagesTitle, 0)
        html = ll.ReplaceSubString(html, "@BODY@", tableLanguages(htmlLanguages), 0)
    end
    ll.SetContentType(id, CONTENT_TYPE_XHTML)
    ll.HTTPResponse(id, 200, html)
end

local function initialize()
    ll.RequestURL()
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body .. "/links"
        ll.OwnerSay(url)
        show(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local query = ll.ToLower(ll.GetHTTPHeader(id, "x-query-string"))
        responsePage(id, path:sub(2))
    elseif method == "POST" then
        responsePage(id, parseQuery(body).button)
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

