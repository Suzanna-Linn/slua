---
layout: default
title: Web server and MOAP
markup_content: true
---

## Web server and MOAP - Part II

### List of Sitters with auto-refresh

Similar code to the previous List of Visitors. The JavaScript requests the in-world script, to refresh the page if the list of sitters has changed.

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


