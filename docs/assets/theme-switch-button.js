(function () {
  const dayTheme = document.getElementById('theme-day');
  const nightTheme = document.getElementById('theme-night');
  const button = document.getElementById('theme-toggle');

  // Load preference from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'day') {
    nightTheme.disabled = true;
    dayTheme.disabled = false;
    button.textContent = 'Dark script theme';
  }

  button.addEventListener('click', function () {
    const isNight = !nightTheme.disabled;

    if (isNight) {
      // Switch to day
      dayTheme.disabled = false;
      nightTheme.disabled = true;
      localStorage.setItem('theme', 'day');
      button.textContent = 'Dark script theme';
    } else {
      // Switch to night
      dayTheme.disabled = true;
      nightTheme.disabled = false;
      localStorage.setItem('theme', 'night');
      button.textContent = 'Light script theme';
    }

    // Remove focus from button
    this.blur();
  });
})();
