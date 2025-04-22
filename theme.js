// theme.js - Enhanced Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
  // 1. Get DOM elements
  const themeToggle = document.querySelector('.theme-toggle');
  const sunIcon = themeToggle?.querySelector('.fa-sun');
  const moonIcon = themeToggle?.querySelector('.fa-moon');
  
  // 2. Initialize theme from localStorage or prefer-color-scheme
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
  
  // 3. Apply the theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // 4. Set initial icon state
  if (themeToggle) {
    if (savedTheme === 'dark') {
      sunIcon?.classList.add('active');
      moonIcon?.classList.remove('active');
    } else {
      moonIcon?.classList.add('active');
      sunIcon?.classList.remove('active');
    }
  }

  // 5. Add click handler if toggle exists
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update theme
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icons
      if (newTheme === 'dark') {
        sunIcon?.classList.add('active');
        moonIcon?.classList.remove('active');
      } else {
        moonIcon?.classList.add('active');
        sunIcon?.classList.remove('active');
      }
      
      // Dispatch custom event (optional for other scripts)
      document.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
      }));
    });
  }

  // 6. Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
});
