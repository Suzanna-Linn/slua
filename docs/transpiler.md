## Transpiler

<div id="transpiled-container" style="display: none; margin-top: 1em;">
<pre class="language-slua line-numbers"><code class="language-slua" id="transpiled-output"></code></pre>
</div>

<form id="transpiler-form" autocomplete="off">
  <label for="script">LSL script:</label><br />
  <textarea id="script" name="script" rows="20" required style="width: 100%; white-space: pre-wrap; word-break: break-word;"></textarea><br /><br />
  <button type="submit" class="button">Send</button>
  <button type="button" id="clear-button" class="button">Clear</button>
</form>

<div id="response" style="margin-top: 1em;"></div>

<script>
document.getElementById('transpiler-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const scriptText = document.getElementById('script').value.trim();
  const transpiledDiv = document.getElementById('transpiled-container')
  const responseDiv = document.getElementById('response');
  const outputCode = document.getElementById('transpiled-output');

  transpiledDiv.style.display = 'none';
  responseDiv.innerText = 'Transpiling... please wait.';
  outputCode.textContent = '';

  const url = 'https://script.google.com/macros/s/AKfycbzQ_rwXsMwF6LpVOWtclK0Mk8avcuyuCFffUtYc44x_F2EzYwUHuS9gfQq4XMumHVJ3/exec';

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
      outputCode.textContent = '';
    } else {
      responseDiv.innerText = 'The SLua script is ready.';
      outputCode.textContent = text.trim();
      transpiledDiv.style.display = 'block';
      Prism.highlightElement(outputCode);
    }
  })
  .catch(error => {
    responseDiv.innerText = error.message;
    outputCode.textContent = '';
  });
});

document.getElementById('clear-button').addEventListener('click', function() {
  document.getElementById('script').value = '';
  document.getElementById('response').innerText = '';
  document.getElementById('transpiled-output').textContent = '';
  document.getElementById('transpiled-container').style.display = 'none';
});
</script>
