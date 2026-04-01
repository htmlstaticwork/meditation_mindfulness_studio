/**
 * Main application scripts for Meditation & Mindfulness Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Implementation ---
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateThemeIcon(storedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeIcon(targetTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.setAttribute('data-lucide', 'sun');
    } else {
        icon.setAttribute('data-lucide', 'moon');
    }
    // Re-initialize lucide icons if loaded
    if(window.lucide) {
      lucide.createIcons();
    }
  }

  // --- Mobile Menu Implementation ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      
      // Toggle icon
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      
      if(window.lucide) {
        lucide.createIcons();
      }
    });
  }

  // --- Sticky Header Optimization ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Initial check
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    }
  }

  // --- Dashboard Sidebar Mobile Toggle ---
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // --- RTL Toggle Implementation ---
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const initRTL = () => {
    const storedRTL = localStorage.getItem('rtl') === 'true';
    if (storedRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  };

  const toggleRTL = () => {
    const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const nextRTL = !currentRTL;
    
    if (nextRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }
    
    localStorage.setItem('rtl', nextRTL);
    
    // Refresh icons to ensure flipping logic applies
    if (window.lucide) {
      lucide.createIcons();
    }
  };

  initRTL();
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', toggleRTL);
  });

  // Initialize all Lucide icons
  if(window.lucide) {
    lucide.createIcons();
  }
});
