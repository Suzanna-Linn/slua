(function () {
  const dayTheme = document.getElementById('theme-day');
  const nightTheme = document.getElementById('theme-night');
  const button = document.getElementById('theme-toggle');

  // Load preference from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'night') {
    dayTheme.disabled = true;
    nightTheme.disabled = false;
    button.textContent = 'Script theme to light';
  }

  button.addEventListener('click', function () {
    const isNight = !nightTheme.disabled;

    if (isNight) {
      // Switch to day
      dayTheme.disabled = false;
      nightTheme.disabled = true;
      localStorage.setItem('theme', 'day');
      button.textContent = 'Script theme to dark';
    } else {
      // Switch to night
      dayTheme.disabled = true;
      nightTheme.disabled = false;
      localStorage.setItem('theme', 'night');
      button.textContent = 'Script theme to light';
    }

    // Remove focus from button
    this.blur();
  });
})();
