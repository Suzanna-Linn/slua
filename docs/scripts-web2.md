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


