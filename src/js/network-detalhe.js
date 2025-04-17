document.addEventListener('DOMContentLoaded', function() {
   // Animação de entrada dos elementos
   const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .server-card, .step, .testimonial-card');
      
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
   
   // Contador animado para as estatísticas
   const animateStats = () => {
      const statItems = document.querySelectorAll('.stat-item');
      const stats = [
         { target: 50, duration: 2000 }, // Servidores
         { target: 10000, duration: 2000 }, // Jogadores
         { target: 99.9, duration: 2000 } // Uptime
      ];
      
      statItems.forEach((item, index) => {
         const statNumber = item.querySelector('.stat-number');
         const target = stats[index].target;
         const duration = stats[index].duration;
         const start = 0;
         const increment = target / (duration / 16);
         let current = start;
         
         const updateStat = () => {
            current += increment;
            if (current < target) {
               if (index === 2) { // Para porcentagem
                  statNumber.textContent = current.toFixed(1) + '%';
               } else {
                  statNumber.textContent = Math.floor(current) + (index === 1 ? '+' : '+');
               }
               requestAnimationFrame(updateStat);
            } else {
               if (index === 2) {
                  statNumber.textContent = target.toFixed(1) + '%';
               } else {
                  statNumber.textContent = target + (index === 1 ? '+' : '+');
               }
            }
         };
         
         updateStat();
      });
   };
   
   // Inicializações
   animateOnScroll();
   animateStats();
   
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