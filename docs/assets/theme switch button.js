  (function() {
      const dayTheme = document.getElementById('theme-day');
      const nightTheme = document.getElementById('theme-night');
      const button = document.createElement('button');
      function applyTheme(theme) {
          if (theme === 'night') {
              dayTheme.disabled = true;
              nightTheme.disabled = false;
              button.textContent  = '🌞 Day mode';
          } else {
              dayTheme.disabled = false;
              nightTheme.disabled = true;
              button.textContent  = '🌙 Night mode';
          }
      }
      applyTheme(localStorage.getItem('slua-lsl-theme') || document.getElementById("theme").dataset.value || 'night');
      Prism.plugins.toolbar.registerButton('theme-switch', function(env) {
          button.addEventListener('click', function () {
              const newTheme = dayTheme.disabled ? 'day' : 'night'
              applyTheme(newTheme);
              localStorage.setItem('slua-lsl-theme', newTheme);
              button.blur(); 
          });
          button.className = 'toolbar-item';
          return button;
      });
  })();
