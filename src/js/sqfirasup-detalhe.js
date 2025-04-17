document.addEventListener('DOMContentLoaded', function() {
   // Animação de entrada dos elementos
   const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .skill-card, .quest-card, .class-card, .step, .testimonial-card');
      
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateY(0)';
            }
         });
      }, {
         threshold: 0.1,
         rootMargin: '0px 0px -50px 0px'
      });
      
      elements.forEach((el, index) => {
         el.style.opacity = '0';
         el.style.transform = 'translateY(20px)';
         el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
         observer.observe(el);
      });
   };
   
   // Sistema de tabs
   const initTabs = () => {
      const tabBtns = document.querySelectorAll('.tab-btn');
      const tabPanes = document.querySelectorAll('.tab-pane');
      
      tabBtns.forEach(btn => {
         btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
         });
      });
   };
   
   // Animação da barra de progresso
   const animateProgressBar = () => {
      const progressBar = document.querySelector('.level-progress');
      const targetWidth = progressBar.getAttribute('data-level');
      
      setTimeout(() => {
         progressBar.style.width = targetWidth + '%';
      }, 500);
   };
   
   // Inicializações
   animateOnScroll();
   initTabs();
   animateProgressBar();
   
   // Suaviza o scroll para links internos
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
            window.scrollTo({
               top: target.offsetTop - 100,
               behavior: 'smooth'
            });
         }
      });
   });
});