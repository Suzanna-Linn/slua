---
layout: default
title: Home
---
## Welcome to Suzanna's SLua guide!

Hi, I'm Suzanna, a teacher of scripting in SecondLife, and a programmer in real life.

## Introducing Lua: The New Scripting Language for SL.

Lua for SL (SLua) has arrived to the Beta grid. I'm adding a new section "Moving from LSL to SLua" explaining how to rewrite our LSL scripts in SLua.

In these pages, I am compiling information about Lua and SLua (the version of Lua for SL) to give you an overview of their features and functionalities.
* The sections **The language: Lua compared to LSL** and **The language: Lua beyond LSL** are based on the standard Lua language. I wrote them before Lua arrived to the beta grid.
* I'm currently writing the section **Moving from LSL to SLua** based on the SL version of Lua: SLua. This section will be growing in the next days and weeks.

If LSL is your main scripting language and you want to expand your programming skills beyond SL, learning Lua is a great next step. Lua introduces powerful features and modern programming concepts that will broaden your knowledge and make it easier to transition to modern, in-demand languages like C#, Python, and JavaScript.

## Contact me

If you have any questions, suggestions, or feedback about SLua scripting, feel free to reach out! Just fill in the form below:

<form id="contact-form">
  <label for="username">Your username in SecondLife:</label><br />
  <input type="text" id="username" name="username" required style="width: 100%; max-width: 400px;" /><br /><br />

  <label for="message">Your message:</label><br />
  <textarea id="message" name="message" rows="8" required style="width: 100%; max-width: 800px;"></textarea><br /><br />

  <button type="submit" class="button">Send</button>
</form>

<div id="response" style="margin-top: 1em;"></div>

<script>
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const url = 'https://script.google.com/macros/s/AKfycbzWVwgYOTSqZW-uc_1ND_DVY7rQV3R33bykutdGJjBmp6nAI6ks5-bsyyhBOq_b-ipn/exec';

  const formData = new URLSearchParams();
  formData.append('Action', 'send mail');
  formData.append('Subject', 'SLua webpage: ' + document.getElementById('username').value.trim());
  formData.append('Html', document.getElementById('message').value.trim());
  formData.append('Body', document.getElementById('message').value.trim());

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  })
  .then(() => {
    document.getElementById('response').innerText = 'Thank you! Your message has been sent.';
    document.getElementById('contact-form').reset();
  })
  .catch(() => {
    document.getElementById('response').innerText = 'Oops! Something went wrong. Please try again later.';
  });
});
</script>
