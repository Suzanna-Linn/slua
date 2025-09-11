(function () {
  const dayTheme = document.getElementById('theme-day');
  const nightTheme = document.getElementById('theme-night');
  const button = document.getElementById('theme-toggle');
  const buttonText = document.getElementById('theme-text-toggle');
  const content = document.querySelector('.content');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'day') {
    nightTheme.disabled = true;
    dayTheme.disabled = false;
    button.textContent = 'Dark script theme';
  }
  const savedThemeText = localStorage.getItem('theme-text');
  if (savedThemeText === 'night') {
    content.classList.toggle('dark-theme')
    button.textContent = 'Light text theme';
  }

  button.addEventListener('click', function () {
    const isNight = !nightTheme.disabled;
    if (isNight) {
      dayTheme.disabled = false;
      nightTheme.disabled = true;
      localStorage.setItem('theme', 'day');
      button.textContent = 'Dark script theme';
    } else {
      dayTheme.disabled = true;
      nightTheme.disabled = false;
      localStorage.setItem('theme', 'night');
      button.textContent = 'Light script theme';
    }
    this.blur();
  });

  buttonText.addEventListener('click', function () {
    content.classList.toggle('dark-theme');
    const isNight = content.classList.contains('dark-theme');
    if (isNight) {
      localStorage.setItem('theme-text', 'night');
      button.textContent = 'Light text theme';
    } else {
      localStorage.setItem('theme-text', 'day');
      button.textContent = 'Dark text theme';
    }
    this.blur();
  });
  
})();
