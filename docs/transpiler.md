## Transpiler

### Transpile a LSL script to SLua

<div id="transpiled-container" style="display: none; margin-top: 1em;">
<pre class="language-slua line-numbers"><code class="language-slua" id="transpiled-output"></code></pre>
</div>

<form id="transpiler-form" autocomplete="off">
  <label for="script">LSL script:</label><br />
  <textarea id="script" name="script" rows="20" required style="width: 100%; white-space: pre-wrap; word-break: break-word;"></textarea><br /><br />
  <button type="submit" id="submit-button" class="button">Transpile</button>
  <button type="button" id="clear-button" class="button">Clear</button>
</form>
<div id="response" style="margin-top: 1em;"></div>

### Report issues

If the transpiler didn’t work correctly, you can report the issue below. There are two common cases:
* Transpiler error: You receive an error message and no SLua script is returned.
* Script issue: You receive a SLua script, but it doesn't work properly when tested in Second Life.

Make sure your LSL script is still in the box above, it will be sent as a file attachment to help understand the issue. You can also add a comment describing what is wrong.

Your Second Life username is optional, but feel free to include it if you'd like a follow-up.

Thank you for helping improve the SLua transpiler!

<form id="issue-form">
  <label for="username">Your username in SecondLife (optional):</label><br />
  <input type="text" id="username" name="username" style="width: 100%; max-width: 400px;" /><br /><br />

  <label for="message">Issue (optional):</label><br />
  <textarea id="message" name="message" rows="8" style="width: 100%; max-width: 800px;"></textarea><br /><br />

  <button type="button" id="issue-button" class="button">Report issue</button>
</form>
<div id="response-issue" style="margin-top: 1em;"></div>


<script>
document.getElementById('transpiler-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const scriptText = document.getElementById('script').value.trim();
  const transpiledDiv = document.getElementById('transpiled-container')
  const responseDiv = document.getElementById('response');
  const outputCode = document.getElementById('transpiled-output');
  const button = document.getElementById('submit-button');

  transpiledDiv.style.display = 'none';
  button.disabled = true;
  responseDiv.innerText = 'Transpiling... please wait.';
  outputCode.textContent = '';

  const url = 'https://script.google.com/macros/s/AKfycbyOhWuS6bwvQC5LIbcoYEHpZ5iaYwqrHRA6tzXoS9eP74SdMV9VdzHwhed_toLCphE5/exec';
  const formData = new URLSearchParams();
  formData.append('Action', 'transpiler');
  formData.append('Script', scriptText);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  })
  .then(response => {
    responseDiv.innerText = 'returning 1';
    const res = response.text());
    responseDiv.innerText = 'returning 2';
    return res;
  })
  .then(text => {
    if (text.startsWith('|')) {
      responseDiv.innerText = text.slice(1).trim();
      button.disabled = false;
      outputCode.textContent = '';
    } else {
      responseDiv.innerText = 'The SLua script is ready.';
      button.disabled = false;
      outputCode.textContent = text.trim();
      transpiledDiv.style.display = 'block';
      Prism.highlightElement(outputCode);
    }
  })
  .catch(error => {
    responseDiv.innerText = error.message;
    button.disabled = false;
    outputCode.textContent = '';
  });
});

document.getElementById('clear-button').addEventListener('click', function() {
  document.getElementById('script').value = '';
  document.getElementById('response').innerText = '';
  document.getElementById('transpiled-output').textContent = '';
  document.getElementById('transpiled-container').style.display = 'none';
});

document.getElementById('issue-button').addEventListener('click', function(e) {
  const scriptText = document.getElementById('script').value.trim();
  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();
  const responseDiv = document.getElementById('response-issue');
  const button = document.getElementById('issue-button');
  
  if (!scriptText) {
    responseDiv.innerText = 'Please include the LSL script before reporting an issue.';
    return;
  }

  button.disabled = true;
  responseDiv.innerText = 'Reporting... please wait.';
  
  const url = 'https://script.google.com/macros/s/AKfycbzQ_rwXsMwF6LpVOWtclK0Mk8avcuyuCFffUtYc44x_F2EzYwUHuS9gfQq4XMumHVJ3/exec';
  const formData = new URLSearchParams();
  formData.append('Action', 'send mail');
  formData.append('Subject', 'Transpiler issue: ' + (username || '(No username)'));
  formData.append('Html', message || '(No message)');
  formData.append('Body', message || '(No message)');
  formData.append('Attachment', scriptText);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  })
  .then(() => {
    responseDiv.innerText = 'Thank you! Your issue report has been sent.';
    document.getElementById('issue-form').reset();
    button.disabled = false;
  })
  .catch(() => {
    responseDiv.innerText = 'Oops! Something went wrong. Please try again later.';
    button.disabled = false;
  });
});
</script>
