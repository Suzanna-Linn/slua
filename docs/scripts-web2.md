---
layout: default
title: Web server and MOAP
markup_content: true
---

## Web server and MOAP - Part II

### List of Sitters with auto-refresh

Similar code to the previous List of Visitors. The JavaScript requests the in-world script, to refresh the page if the list of sitters has changed.
Using sitters instead of visitors for easier testing.

<div class="script-box advanced">
<h4>List of Sitters, auto-refresh<span class="extra">HTML</span><span class="extra">CSS</span><span class="extra">JavaScript</span></h4>
{% capture slua %}-- List of Sitters, auto-refresh

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
  @SCRIPT@
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

local htmlSitters = [=[
  <h1>Table of Sitters</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="2">Total Sitters: @TOTAL_SITTERS@</td>
      </tr>
    </tfoot>
    <tbody>
      @TABLE@
    </tbody>
  </table>
]=]

local htmlSittersTable = [=[
      <tr>
        <td>@NAME@</td>
        <td>@USERNAME@</td>
      </tr>
]=]

local htmlSittersTitle = "Table of Sitters"

local htmlSittersScript = [=[
  <script type="text/javascript">
  let loadTime;
  let intervalId;

  async function checkChanges() {
    const elapsedTime =  Math.floor((performance.now() - loadTime) / 1000);
    try {
      const response = await fetch("sitterschange?time=" + elapsedTime);
      const data = await response.text();
      if (data === "1") {
        clearInterval(intervalId);
        window.location.reload();
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  window.onload = function() {
    loadTime = performance.now();
    intervalId = setInterval(checkChanges, 3000);
  };
  </script>
]=]

local changeTime = 0
local sitters = {}

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

local function getSitters()
    local newSitters = {}
    local visitors = ll.GetAgentList(AGENT_LIST_REGION, {})
    for _, visitor in visitors do
        if bit32.btest(ll.GetAgentInfo(visitor), AGENT_SITTING) then
            table.insert(newSitters, visitor)
        end
    end
    table.sort(newSitters)
    if ll.DumpList2String(sitters, ",") ~= ll.DumpList2String(newSitters, ",") then
        sitters = newSitters
        changeTime = ll.GetWallclock()
    end
end

local function tableSitters(html)
    local rows = {}
    getSitters()
    for _, sitter in sitters do
        local row = htmlSittersTable
        row = ll.ReplaceSubString(row, "@NAME@", ll.GetDisplayName(sitter), 0)
        row = ll.ReplaceSubString(row, "@USERNAME@", ll.GetUsername(sitter), 0)
        table.insert(rows, row)
    end
    html = ll.ReplaceSubString(html, "@TOTAL_SITTERS@", tostring(#sitters), 0)
    html = ll.ReplaceSubString(html, "@TABLE@", table.concat(rows) ,0)
    return html
end

local function initialize()
    ll.RequestURL()
    ll.SetTimerEvent(2)
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body .. "/sitters"
        ll.Say(0, url)
        show(url)
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local html = ""
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local query = ll.ToLower(ll.GetHTTPHeader(id, "x-query-string"))
        if path == "/sitters" then
            html = ll.ReplaceSubString(htmlHeader, "@STYLE@", htmlStyle, 0)
            html = ll.ReplaceSubString(html, "@TITLE@", htmlSittersTitle, 0)
            html = ll.ReplaceSubString(html, "@BODY@", tableSitters(htmlSitters), 0)
            html = ll.ReplaceSubString(html, "@SCRIPT@", htmlSittersScript, 0)
            ll.SetContentType(id, CONTENT_TYPE_XHTML)
        elseif path == "/sitterschange" then
            local seconds = tonumber(query:split("=")[2])
            local now = ll.GetWallclock()
            if now - seconds <= changeTime then
                html = "1"
            else
                html = "0"
            end
            ll.SetContentType(id, CONTENT_TYPE_TEXT)
         end
         ll.HTTPResponse(id, 200, html)
    end
end

function timer()
    getSitters()
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

### Chat Transcript

Stores the public chat in linkset data and shows it in a webpage that we can copy-paste in text or save in PDF with better coloring.

Useful to keep the transcript for any kind of meetings.

It doesn't use MOAP, it gives a link to the owner to open in a web browser.

There are two scripts, one for storing and the other for displaying.

<div class="script-box advanced">
<h4>Chat Transcript - Store<span class="extra">HTML</span><span class="extra">CSS</span><span class="extra">JavaScript</span></h4>
{% capture slua %}-- Chat Transcript - Store script 1/2 (by Suzanna Linn, 2025-09-27)

local ME = ""
local counter = 1000

local function storeMessage(name, id, message)
    local format = ""
    local time = ll.GetWallclock()
    local hour = string.format("%02d:%02d", time // 3600, time % 3600 // 60)
    if id == ME then
        format = "m"
        name = ll.GetDisplayName(ME)
    else
        if ll.GetAgentSize(id) ~= ZERO_VECTOR then
            format = "a"
            name = ll.GetDisplayName(id)
        else
            format = "o"
            if ll.GetOwnerKey(id) == ME then
                format = "x"
            end
        end
    end
    counter += 1
    ll.LinksetDataWrite(tostring(counter), lljson.encode({format, hour, name, message}))
end

local function initialize()
    counter = ll.LinksetDataCountKeys() + 1000
    ME = ll.GetOwner()
    ll.Listen(0, "", "", "")
end

function listen(channel, name, id, message)
    if channel == 0 then
        storeMessage(name, id, message)
    end
end

function on_rez(start_param)
    ll.ResetScript()
end

function changed(change)
    if bit32.btest(change, bit32.bor(CHANGED_OWNER, CHANGED_INVENTORY)) then
        ll.ResetScript()
    end
end

initialize(){% endcapture %}
<pre class="language-slua line-numbers"><code class="language-slua">{{ slua | escape }}</code></pre>
</div>
<div class="script-box advanced">
<h4>Chat Transcript - Display<span class="extra">HTML</span><span class="extra">CSS</span><span class="extra">JavaScript</span></h4>
{% capture slua %}-- Chat Transcript - Display script 2/2 (by Suzanna Linn, 2025-09-27)

local url = ""

local html = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>@TITLE@</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 20px;
      color: #2196F3;
    }
    .classname {
      font-style: italic;
    }    

    .line {
      margin-bottom: 10px;
      font-family: "Cascadia Code", "Cascadia Mono", monospace;
    }
    .line span {
      white-space: pre-wrap;
    }
    .hour {
      color: #808080; /* Gray */
    }
    .name-m {
      color: #FF8C00; /* Dark Orange */
    }
    .name-a {
      color: #9370DB; /* Medium Purple */
    }
    .name-o {
      color: #87CEEB; /* Light Blue (Sky Blue) */
      margin-right: 10px;
    }
    .name-x {
      color: #FF6347; /* Red (Tomato) */
    }
    .text-m {
      color: #00008B; /* Dark Blue */
    }
    .text-a {
      color: #8B4513; /* Saddle Brown */
    }
    .text-o {
      color: #228B22; /* Forest Green */
    }
    .text-x {
      color: #000000; /* Black */
    }

    .header-bar {
      position: sticky;
      top: 0;
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 10px 0;
      z-index: 1000;
    }
    .buttons {
      margin-bottom: 20px;
    }
    button {
      margin-right: 10px;
      padding: 8px 16px;
      font-size: 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease;
      background-color: #2196F3;
      color: white;
    }
    button:hover {
      opacity: 0.9;
    }
    @media print {
      .buttons {
      display: none;
      }
    }
  </style>
</head>

<body>
<div class="header-bar">
  <h1 class="classname">@TITLE@</h1>
  <div class="buttons">
    <button onclick="window.scrollTo(0, document.body.scrollHeight)">↓ Latest</button>
    <button onclick="window.scrollTo(0, 0)">↑ Top</button>
    <button onclick="copyPlainText()">Copy to clipbboard</button>
    <button onclick="scrollTopAndPrint()">Save to PDF</button>
  </div>
</div>
<div id="content"></div>

<script type="text/javascript">
//<![CDATA[
const container = document.getElementById("content");

async function loadData(nextMessage) {
  try {
    const response = await fetch('messages?numKey=' + nextMessage);
    const data = await response.text();
    const messages = JSON.parse(data);
    for (const message of messages) {
      if (message[0] == "") return;

      const typeStr = message[0];
      const hour = message[1];
      let name = message[2];
      let text = message[3];

      const nameColorClass = "name-" + typeStr;
      const textColorClass = "text-" + typeStr;
      if (text.startsWith("/me ")) {
        text = text.substring(3);
      } else {
        name += ": ";
      }

      const lineDiv = document.createElement("div");
      lineDiv.className = "line";

      const hourSpan = document.createElement("span");
      hourSpan.className = "hour";
      hourSpan.textContent = "[" + hour + "] ";

      const nameSpan = document.createElement("span");
      nameSpan.className = nameColorClass;
      nameSpan.textContent = name;

      const textSpan = document.createElement("span");
      textSpan.className = textColorClass;
      textSpan.textContent = text;

      lineDiv.appendChild(hourSpan);
      lineDiv.appendChild(nameSpan);
      lineDiv.appendChild(textSpan);

      container.appendChild(lineDiv);
    }
    if (messages.length > 0) {
       loadData(nextMessage + messages.length);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function copyPlainText() {
  const content = document.getElementById("content");
  const text = content.innerText || content.textContent;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const success = document.execCommand("copy");
    alert(success ? "Text copied to clipboard." : "Failed to copy text.");
  } catch (err) {
    alert("Fallback copy failed: " + err);
  }
  document.body.removeChild(textarea);
}

function scrollTopAndPrint() {
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.print();
  }, 200);
}

window.onload = function() {
  loadData(0);
};
//]]>
</script>
</body>
</html>
]=]

local function initialize()
    ll.RequestURL()
    html = ll.ReplaceSubString(html, "@TITLE@", ll.GetObjectDesc(), 0)
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        ll.OwnerSay(url .. "/chat")
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local query = ll.ToLower(ll.GetHTTPHeader(id, "x-query-string"))
        if path == "/chat" then
            ll.SetContentType(id, CONTENT_TYPE_XHTML)
            ll.HTTPResponse(id, 200, html)
        elseif path == "/messages" then
            local numKey = tonumber(query:split("=")[2])
            local totalKeys = ll.LinksetDataCountKeys()
            local data = {}
            local length = 0
            while numKey < totalKeys and length < 10000 do
                local lKey = ll.LinksetDataListKeys(numKey, 1)[1]
                local lValue = ll.LinksetDataRead(lKey)
                table.insert(data, lljson.decode(lValue))
                length += #lValue
                numKey += 1
            end
            if numKey == totalKeys then
                table.insert(data, {"", "", "", ""})
            end
            ll.SetContentType(id, CONTENT_TYPE_TEXT)
            ll.HTTPResponse(id, 200, lljson.encode(data))
        end
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

### Notecard Display

Displaying a formatted notecard that we can write in Markdown, in HTML, or in a mix of both. It has a notecard "style" with the CSS styles to use.

We have to serve XHTML pages for public view, but we can use JavaScript to insert HTML code in the XHTML page.

Useful to display in public a nicely formatted info that is easy to modify, even by non-scripters.

It's also useful as a HUD to send notecards that can be viewed in a beautiful and personalized way (each user can have their own favorite CSS styles), avoiding the ugly SL notecard look.

It uses the JavaScript library Markdown-it to convert markdown to HTML. There is also, commented, another library, Showdown, that does the same.

There are examples in-world, including a Markdown Demo with the different markdown options. See on top of the page how to get the examples.

<div class="script-box advanced">
<h4>Notecard Display<span class="extra">HTML</span><span class="extra">CSS</span><span class="extra">JavaScript</span></h4>
{% capture slua %}-- Notecard Display (by Suzanna Linn, 2025-09-27)

local html = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>@TITLE@</title>
  <style>
    @STYLES@
  </style>
  <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js"></script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/showdown/dist/showdown.min.js"></script> -->
</head>
<body>
@CONTENT@
</body>
</html>
]=]

local htmlNotecardList = [=[
  <h1>Available Notecards:</h1>
  @LIST@
]=]

local htmlNotecard = [=[
<form action="" method="post"><button type="submit" name="option" value="back">Back to Notecards List</button></form>
<hr/>
<div id="content"></div>

<script type="text/javascript">
//<![CDATA[
let contentBuffer = "";

async function loadNotecard(line) {
  try {
    const response = await fetch(`notecard?name=${encodeURIComponent("@NOTECARD@")}&line=${line}`);
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    const data = await response.text();

    contentBuffer  += data;
    if (data.length > 10000) {
      loadNotecard(line + data.split("\n").length - 1);
    } else {

      // markdown-it
      const md = window.markdownit({
        html: true,    // Enable HTML tags in source
        linkify: true,   // Autoconvert URL-like text to links
        typographer: true  // Enable smartquotes and other typographic replacements
      });
      const htmlString = md.render(contentBuffer);
      //

      /* showdown
      const converter = new showdown.Converter({ outputXHTML: true });
      const htmlString = converter.makeHtml(contentBuffer);
      */

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const container = document.getElementById("content");
      for (let node of doc.body.childNodes) {
        container.appendChild(node);
      }
    }
  } catch (err) {
    console.error("Error loading notecard:", err);
  }
}

window.onload = function() {
  loadNotecard(0);
};
//]]>
</script>
]=]

local FACE_MEDIA = 2
local NOTECARD_STYLES = "style"

local url = ""

local notecardName = ""
local notecardLine = 0
local notecardText = {}

local requestLineStylesId = NULL_KEY
local requestLineNotecardId = NULL_KEY
local requestId = NULL_KEY

local function show(url)
    ll.SetPrimMediaParams(FACE_MEDIA, {
        PRIM_MEDIA_CURRENT_URL, url,
        PRIM_MEDIA_HOME_URL, url,
        PRIM_MEDIA_AUTO_ZOOM, false,
        PRIM_MEDIA_FIRST_CLICK_INTERACT, true,
        PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_ANYONE,
        PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
        PRIM_MEDIA_AUTO_PLAY, true,
        PRIM_MEDIA_WIDTH_PIXELS, 2048,
        PRIM_MEDIA_HEIGHT_PIXELS, 1024
    })
end

local function readStyles()
    local data = ""
    repeat
        data = ll.GetNotecardLineSync(notecardName, notecardLine)
        if data ~= EOF then
            if data ~= NAK then
                table.insert(notecardText, data .. "\n")
                notecardLine += 1
            else
                requestLineStylesId = ll.GetNotecardLine(notecardName, notecardLine)
            end
        end
    until data == EOF or data == NAK
    if data == EOF then
        html = ll.ReplaceSubString(html, "@STYLES@", table.concat(notecardText), 0)
        show(url .. "/view")
    end
end

local function readNotecard()
    local data = ""
    local length = 0
    repeat
        data = ll.GetNotecardLineSync(notecardName, notecardLine)
        if data ~= EOF then
            if data ~= NAK then
                table.insert(notecardText, data .. "\n")
                length += #data
                notecardLine += 1
            else
                requestLineNotecardId = ll.GetNotecardLine(notecardName, notecardLine)
            end
        end
    until length > 10000 or data == EOF or data == NAK
    if data ~= NAK then
        ll.SetContentType(requestId, CONTENT_TYPE_TEXT)
        ll.HTTPResponse(requestId, 200, table.concat(notecardText))
    end
end

local function parseQuery(query)
    local params = {}
    for key, value in query:gmatch("([^&=]+)=?([^&]*)") do
        params[ll.UnescapeURL(key)] = ll.UnescapeURL((value:gsub("+"," ")))
    end
    return params
end

local function notecardsList()
    local list = {}
    for i = 0, ll.GetInventoryNumber(INVENTORY_NOTECARD) - 1 do
        local name = ll.GetInventoryName(INVENTORY_NOTECARD, i)
        if name ~= NOTECARD_STYLES then
            table.insert(list, `<form action="" method="post"><button type="submit" name="name" value="{name}">{name}</button></form>\n`)
        end
    end
    local htmlList = ll.ReplaceSubString(htmlNotecardList, "@LIST@", table.concat(list), 0)
    htmlList = ll.ReplaceSubString(html, "@CONTENT@", htmlList, 0)
    return htmlList
end

local function initialize()
    ll.ClearPrimMedia(FACE_MEDIA)
    if ll.GetInventoryNumber(INVENTORY_NOTECARD) > 1 then
        ll.RequestURL()
        html = ll.ReplaceSubString(html, "@TITLE@", ll.GetObjectDesc(), 0)
    else
        ll.OwnerSay("No notecard to show")
    end
end

function dataserver(queryid, data)
    if queryid == requestLineStylesId then
        readStyles()
    elseif queryid == requestLineNotecardId then
        readNotecard()
    end
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        notecardName = NOTECARD_STYLES
        notecardLine = 0
        notecardText = {}
        url = body
        readStyles()
        ll.OwnerSay(url .. "/view")
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local query = ll.ToLower(ll.GetHTTPHeader(id, "x-query-string"))
        if path == "/notecard" then
            requestId = id
            local params = parseQuery(query)
            notecardName = params.name
            notecardLine = tonumber(params.line)
            notecardText = {}
            readNotecard()
        else
            ll.SetContentType(id, CONTENT_TYPE_XHTML)
            ll.HTTPResponse(id, 200, notecardsList())
        end
    elseif method == "POST" then
        local params = parseQuery(body)
        if params.name then
            local htmlView = ll.ReplaceSubString(htmlNotecard, "@NOTECARD@", params.name, 0)
            htmlView = ll.ReplaceSubString(html, "@CONTENT@", htmlView, 0)
            ll.SetContentType(id, CONTENT_TYPE_XHTML)
            ll.HTTPResponse(id, 200, htmlView)
        elseif params.option == "back" then
            ll.SetContentType(id, CONTENT_TYPE_XHTML)
            ll.HTTPResponse(id, 200, notecardsList())
        end
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

initialize()
{% endcapture %}
<pre class="language-slua line-numbers"><code class="language-slua">{{ slua | escape }}</code></pre>
</div>

### Linkset Data Editor

A webpage to view and edit the linkset data. We can insert pairs of key-value, modify a value, or delete a key.

There are two scripts, because of memory limits, to copy in the object that we want to view/edit the linkset data. When the object rezzes the script gives to the owner an URL to open in the browser.

<div class="script-box advanced">
<h4>Linkset Data Editor, Initialization<span class="extra">HTML</span><span class="extra">CSS</span><span class="extra">JavaScript</span></h4>
{% capture slua %}-- Linkset Data Editor, Initialization script 1/2 (by Suzanna Linn, 2025-09-27)

local html = [=[
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Linkset data editor</title>
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

    #insert-btn-container {
      margin-bottom: 20px;
    }

    table {
      width: 90%;
      margin: 0 auto;
      border-collapse: collapse;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      word-wrap: break-word;
      word-break: break-all;
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

    td input[type="text"] {
      width: 95%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .action-btn {
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      margin-right: 5px;
      color: white;
    }

    #insert-btn {
       background-color: #007BFF; /* Primary Blue */
       padding: 10px 15px;
    }
    #sort-btn {
       background-color: #ffc107; /* Yellow */
       padding: 10px 15px;
    }
    #reload-btn { 
       background-color: #17a2b8; /* Teal */
       padding: 10px 15px;
    }

    .edit-btn { background-color: #28a745; } /* Green */
    .save-btn { background-color: #008CBA; } /* Blue */
    .delete-btn { background-color: #dc3545; } /* Red */
    .cancel-btn { background-color: #6c757d; } /* Gray */

    th.actions-header,
      td:last-child {
        width: 1%;
        white-space: nowrap;
      }

    .alert {
      position: fixed;
      top: 80px;
      right: 40px;
      background: #333;
      color: #fff;
      padding: 10px 15px;
      border-radius: 6px;
      opacity: 0.9;
    }

    #data tbody td:nth-child(1),
    #data tbody td:nth-child(2) {
      white-space: pre-wrap;
      word-break: break-word;
    }
  </style>
</head>
<body>
  <h1>@OBJECT@</h1>

  <div id="insert-btn-container">
    <button id="insert-btn" class="action-btn">Insert New Row</button>
    <button id="sort-btn" class="action-btn">Sort by Key</button>
    <button id="reload-btn" class="action-btn">Reload</button>
  </div>

  <table id="data">
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
        <th class="actions-header">Actions</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>

  <div id="alert" style="display:none;"></div>

<script type="text/javascript">
//<![CDATA[
const tbody = document.getElementById("data").querySelector("tbody");
const insertBtn = document.getElementById("insert-btn");
const sortBtn = document.getElementById("sort-btn");
const reloadBtn = document.getElementById("reload-btn");

async function loadData(nextRow) {
  try {
    const response = await fetch("data?numkey=" + nextRow);
    const data = await response.text();
    const rows = JSON.parse(data);
    for (const rowData of rows) {
      if (rowData[0] == "") return;
      createRow(rowData);
    }
    if (rows.length > 0) {
      loadData(nextRow + rows.length);
    }
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

function createRow(rowData, isNew = false) {
  const row = tbody.insertRow(isNew ? 0 : -1);
  const keyCell = row.insertCell(0);
  const valueCell = row.insertCell(1);
  const actionsCell = row.insertCell(2);

  if (isNew) {
    keyCell.contentEditable = true;
    valueCell.contentEditable = true;
    keyCell.focus();

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "action-btn save-btn";
    saveButton.onclick = () => saveNewRow(row);
    actionsCell.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "action-btn cancel-btn";
    cancelButton.onclick = () => row.remove();
    actionsCell.appendChild(cancelButton);
  } else {
    keyCell.textContent = rowData[0];
    valueCell.textContent = rowData[1];
    addDefaultActions(row);
  }
}

function addDefaultActions(row) {
  const actionsCell = row.cells[2];
  actionsCell.innerHTML = "";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "action-btn edit-btn";
  editButton.onclick = () => enableEditing(row);
  actionsCell.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "action-btn delete-btn";
  deleteButton.onclick = () => deleteRow(row, deleteButton);
  actionsCell.appendChild(deleteButton);
}

function insertNewRow() {
  if (tbody.rows[0] && tbody.rows[0].cells[0].querySelector("input")) {
    showAlert("Please save or cancel the current new row first.");
    return;
  }
  createRow(null, true);
}

async function saveNewRow(row) {
  const key = row.cells[0].innerText;
  const value = row.cells[1].innerText;

  if (!key) {
    showAlert("Key cannot be empty.");
    return;
  }

  const allRows = tbody.querySelectorAll("tr");
  for (const existingRow of allRows) {
    if (existingRow === row) {
      continue;
    }

    const existingKey = existingRow.cells[0].textContent;
    if (existingKey === key) {
      showAlert(`The key "${key}" already exists. Please use a unique key.`);
      return;
    }
  }

  row.cells[0].contentEditable = false;
  row.cells[1].contentEditable = false;
  addDefaultActions(row);

  try {
    const response = await fetch("insert", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ key, value }),
    });
    const data = await response.text();
    console.log("Successfully inserted:", data);
  } catch (error) {
    console.error("Error inserting:", error);
  }
}

function enableEditing(row) {
  const valueCell = row.cells[1];
  const actionsCell = row.cells[2];
  const originalValue = valueCell.innerText;

  valueCell.contentEditable = true;
  valueCell.focus();

  const range = document.createRange();
  range.selectNodeContents(valueCell);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  actionsCell.innerHTML = "";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "action-btn save-btn";
  saveButton.onclick = () => saveData(row);
  actionsCell.appendChild(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.className = "action-btn cancel-btn";
  cancelButton.onclick = () => {
    valueCell.textContent = originalValue;
    valueCell.contentEditable = false;
    valueCell.blur();
    window.getSelection().removeAllRanges();
    addDefaultActions(row);
  };
  actionsCell.appendChild(cancelButton);
}

async function saveData(row) {
  const key = row.cells[0].innerText;
  const value = row.cells[1].innerText;
  const valueCell = row.cells[1];

  valueCell.contentEditable = false;
  valueCell.blur();
  window.getSelection().removeAllRanges();
  
  addDefaultActions(row);

  try {
    const response = await fetch("update", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ key, value }),
    });
    const data = await response.text();
    console.log("Successfully updated:", data);
  } catch (error) {
    console.error("Error updating:", error);
  }
}

async function deleteRow(row, button) {
  const actionsCell = row.cells[2];
  const key = row.cells[0].innerText;

  const originalButtons = Array.from(actionsCell.childNodes);

  actionsCell.innerHTML = "";
  showAlert(`Delete row with key "${key}"?`);

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.className = "action-btn delete-btn";
  confirmButton.onclick = async () => {
    row.remove();
    try {
      const response = await fetch("delete", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ key, value: row.cells[1].innerText }),
      });
      const data = await response.text();
      console.log("Successfully deleted:", data);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  actionsCell.appendChild(confirmButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.className = "action-btn cancel-btn"; 
  cancelButton.onclick = () => {
    addDefaultActions(row);
  };
  actionsCell.appendChild(cancelButton);
}

function sortTable() {
  const rows = Array.from(tbody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const keyA = a.cells[0].textContent.toLowerCase();
    const keyB = b.cells[0].textContent.toLowerCase();
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  });
  rows.forEach(row => tbody.appendChild(row));
}

function reloadData() {
  tbody.innerHTML = "";
  loadData(0);
}

function showAlert(msg) {
  const alert = document.getElementById("alert");
  alert.textContent = msg;
  alert.className = "alert";
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
}

insertBtn.onclick = insertNewRow;
sortBtn.onclick = sortTable;
reloadBtn.onclick = reloadData;

window.onload = function() {
  loadData(0);
};
//]]>
</script>
</body>
</html>
]=]

local ASKING = 1
local SENDING = 2

local function initialize()
    html = ll.ReplaceSubString(html, "@OBJECT@", ll.GetObjectName(), 0)
end

function link_message(sender_num, num, str, id)
    if num == ASKING then
        ll.MessageLinked(LINK_THIS, SENDING, html, "")
    end
end

function on_rez(start_param)
    ll.ResetScript()
end

function changed(change)
    if bit32.btest(change, CHANGED_OWNER) then
        ll.ResetScript()
    end
end

initialize(){% endcapture %}
<pre class="language-slua line-numbers"><code class="language-slua">{{ slua | escape }}</code></pre>
</div>
<div class="script-box advanced">
<h4>Linkset Data Editor, Execution<span class="extra">HTML</span><span class="extra">CSS</span><span class="extra">JavaScript</span></h4>
{% capture slua %}-- Linkset Data Editor, Execution script 2/2 (by Suzanna Linn, 2025-09-27)

local url = ""

local ASKING = 1
local SENDING = 2

local requestId

local function initialize()
    ll.RequestURL()
end

function link_message(sender_num, num, str, id)
    if num == SENDING then
        ll.SetContentType(requestId, CONTENT_TYPE_XHTML)
        ll.HTTPResponse(requestId, 200, str)
    end
end

function http_request(id, method, body)
    if method == URL_REQUEST_GRANTED then
        url = body
        ll.OwnerSay(url .. "/edit")
    elseif method == URL_REQUEST_DENIED then
        ll.OwnerSay("Unable to get URL!")
    elseif method == "GET" then
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local query = ll.ToLower(ll.GetHTTPHeader(id, "x-query-string"))
        if path == "/edit" then
            requestId = id
            ll.MessageLinked(LINK_THIS, ASKING, "", "")
        elseif path == "/data" then
            local numKey = tonumber(query:split("=")[2])
            local totalKeys = ll.LinksetDataCountKeys()
            local data = {}
            local length = 0
            while numKey < totalKeys and length < 20000 do
                local lKey = ll.LinksetDataListKeys(numKey, 1)[1]
                local lValue = ll.LinksetDataRead(lKey)
                table.insert(data, {lKey, lValue})
                length += #lKey + #lValue
                numKey += 1
            end
            if numKey == totalKeys then
                table.insert(data, {"", ""})
            end
            ll.SetContentType(id, CONTENT_TYPE_TEXT)
            ll.HTTPResponse(id, 200, lljson.encode(data))
        end
    elseif method == "POST" then
        local path = ll.ToLower(ll.GetHTTPHeader(id, "x-path-info"))
        local data = lljson.decode(body)
        local lKey = data.key
        local lValue = data.value
        if path == "/insert" then
            ll.LinksetDataWrite(lKey, lValue)
        elseif path == "/update" then
            ll.LinksetDataWrite(lKey, lValue)
        elseif path == "/delete" then
            ll.LinksetDataDelete(lKey)
        end
        ll.SetContentType(id, CONTENT_TYPE_TEXT)
        ll.HTTPResponse(id, 200, "Ok")
    end
end

function on_rez(start_param)
    ll.ResetScript()
end

function changed(change)
    if bit32.btest(change, bit32.bor(CHANGED_REGION_START, CHANGED_OWNER)) then
        ll.ResetScript()
    end
end

initialize(){% endcapture %}
<pre class="language-slua line-numbers"><code class="language-slua">{{ slua | escape }}</code></pre>
</div>
