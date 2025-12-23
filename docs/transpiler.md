---
layout: default
title: Transpiler
slua_beta: true
---

## Transpiler

### Transpile a LSL script to SLua

This tool converts your LSL scripts into SLua. Paste your LSL script into the script box and click on "Transpile".
- it needs scripts that compile without error in LSL (it doesn't check syntax).
- it works with LSL scripts only, without preprocessor commands.

Its intention is to provide a script that can be compiled and executed in SLua, but it still will need improvements, especially about structuring the data into SLua tables.
- It's a work in progress, you can report issues and suggestions below.
- There are more details at the end of the page [What it does and what it does not](#what-it-does-and-what-it-does-not).

The scripts are processed internally and not stored or shared. I will only see the script if you click on "Report issue".

<div id="transpiled-container" style="display: none; margin-top: 1em;">
<pre class="language-sluab line-numbers"><code class="language-sluab" id="transpiled-output"></code></pre>
</div>

<form id="transpiler-form" autocomplete="off">
  <label for="script">LSL script:</label><br />
  <textarea id="script" name="script" rows="20" required style="width: 100%; white-space: pre-wrap; word-break: break-word;"></textarea><br /><br />
  <button type="submit" id="submit-button" class="button">Transpile</button>
  <button type="button" id="clear-button" class="button">Clear</button>
</form>
<div id="response" style="margin-top: 1em;"></div>

On the resulting SLua script, hover your mouse on its top right and click "copy" to copy the script to your clipboard.

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

### What it does and what it does not

What it does:
- changes syntax, keywords and operators
- defines all variables as local and initializes them with their default value (if they weren't in LSL)
- typecasts between number and boolean and between string and uuid
  - tries to identify which LSL integer variables are used as boolean
  - replaces TRUE/FALSE with true/false or 1/0
- generates a numeric loop for when the pattern is clear enough, otherwise, it generates a loop while
- replaces assignation to vector/rotation components with a new vector/rotation
- replaces assignations in expressions with inline functions
- replaces llGetListLength with the # length operator
- replaces multiline strings with [[ ]] strings
- changes "else if" to "elseif" when possible
- adds a line (before the first function) declaring the functions that are defined after they are used
- renames variables that are SLua keywords (by adding _t at the end)
- renames state_entry() in the default state to main() and calls it at the end
- simulates states with tables for the states events and a function state() to change states

What it does not (but could do, if I receive requests for it)
- add type annotations for type-checking and linting, useful when we have the Luau analyzer in SLua
- change LL math functions to the math library
- change LL string functions to the string library, but they don't work with Unicode
- change LL list functions to the table library when possible
- loop for
  - check for more cases that can be converted to a numeric for
  - in a numeric loop for:
    - check that the variables used in the for are not modified inside the loop
    - check that the index variable is not used after the loop
    - remove the declaration of the index variable
- use integers with bit32 functions to get signed numbers when they are in arithmetic operations
- change "jump" to "break" or "continue" when possible
- preserve the formatting of lists declarations, when they are written in several lines or tabbed

What it does not (and probably will not, since these are very uncommon situations)
- side effects in the right operand of "and" and "or"
  - LSL always evaluates the right operand, SLua only when necessary
- side effects in assignations and functions in an expression
  - LSL evaluates variables and functions from right to left, SLua from left to right

What it does not (and will not, since it would require redesigning the code)
- jump (except when it can be replaced with break or continue)
  - the command <code class="language-lsl">jump name_of_label;</code> is replaced with <code class="language-sluab">jump = "jump name_of_label"</code>
  - the label <code class="language-lsl">@name_of_label;</code> is replaced with <code class="language-sluab">jump = "@name_of_label"</code>

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
  responseDiv.innerText = 'Transpiling... please wait some seconds.';
  outputCode.textContent = '';

  const url = 'https://script.google.com/macros/s/AKfycbzWVwgYOTSqZW-uc_1ND_DVY7rQV3R33bykutdGJjBmp6nAI6ks5-bsyyhBOq_b-ipn/exec';
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
  .then(response => response.text())
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
  
  const url = 'https://script.google.com/macros/s/AKfycbzWVwgYOTSqZW-uc_1ND_DVY7rQV3R33bykutdGJjBmp6nAI6ks5-bsyyhBOq_b-ipn/exec';
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

