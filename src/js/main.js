// Theme Toggle Functionality
function setupThemeToggle() {
   const themeToggle = document.getElementById('theme-toggle');
   const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
   
   // Check for saved theme preference or use system preference
   const currentTheme = localStorage.getItem('theme');
   if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-mode');
   }
   
   // Toggle theme on button click
   themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
   });
   
   // Listen for system theme changes
   prefersDarkScheme.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
         document.body.classList.toggle('dark-mode', e.matches);
      }
   });
}

// Mobile Navigation Enhancement
function enhanceMobileNavigation() {
   const navLinks = document.querySelectorAll('.nav-link');
   
   navLinks.forEach(link => {
      link.addEventListener('click', () => {
         // Add active state handling if needed
         navLinks.forEach(l => l.classList.remove('active'));
         link.classList.add('active');
      });
   });
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
            target.scrollIntoView({
               behavior: 'smooth',
               block: 'start'
            });
         }
      });
   });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
   setupThemeToggle();
   enhanceMobileNavigation();
   setupSmoothScrolling();
   
   // Add loaded class to body for transition effects
   document.body.classList.add('loaded');
});