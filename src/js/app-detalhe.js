document.addEventListener('DOMContentLoaded', function() {
         // Animação de entrada dos elementos
         const animateOnScroll = () => {
            const elements = document.querySelectorAll('.feature-card, .tech-item, .screenshot, .testimonial-card');
            
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
         
         // Lightbox para screenshots
         const initScreenshotsLightbox = () => {
            const screenshots = document.querySelectorAll('.screenshot');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-nav lightbox-prev">&lt;</button>
                <button class="lightbox-nav lightbox-next">&gt;</button>
            </div>
        `;
            document.body.appendChild(lightbox);
            
            let currentIndex = 0;
            
            screenshots.forEach((screenshot, index) => {
               screenshot.addEventListener('click', () => {
                  currentIndex = index;
                  const imgSrc = screenshot.querySelector('img').src;
                  lightbox.querySelector('img').src = imgSrc;
                  lightbox.classList.add('active');
                  document.body.style.overflow = 'hidden';
               });
            });
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
               lightbox.classList.remove('active');
               document.body.style.overflow = '';
            });
            
            lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
               e.stopPropagation();
               currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
               updateLightboxImage();
            });
            
            lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
               e.stopPropagation();
               currentIndex = (currentIndex + 1) % screenshots.length;
               updateLightboxImage();
            });
            
            function updateLightboxImage() {
               const imgSrc = screenshots[currentIndex].querySelector('img').src;
               lightbox.querySelector('img').src = imgSrc;
            }
            
            lightbox.addEventListener('click', (e) => {
               if (e.target === lightbox) {
                  lightbox.classList.remove('active');
                  document.body.style.overflow = '';
               }
            });
         };
         
         // Carrossel de screenshots
         const initScreenshotsCarousel = () => {
            const carousel = document.querySelector('.screenshots-carousel');
            let isDown = false;
            let startX;
            let scrollLeft;
            
            carousel.addEventListener('mousedown', (e) => {
               isDown = true;
               startX = e.pageX - carousel.offsetLeft;
               scrollLeft = carousel.scrollLeft;
               carousel.style.cursor = 'grabbing';
               carousel.style.scrollBehavior = 'auto';
            });
            
            carousel.addEventListener('mouseleave', () => {
               isDown = false;
               carousel.style.cursor = 'grab';
               carousel.style.scrollBehavior = 'smooth';
            });
            
            carousel.addEventListener('mouseup', () => {
               isDown = false;
               carousel.style.cursor = 'grab';
               carousel.style.scrollBehavior = 'smooth';
            });
            
            carousel.addEventListener('mousemove', (e) => {
               if (!isDown) return;
               e.preventDefault();
               const x = e.pageX - carousel.offsetLeft;
               const walk = (x - startX) * 2;
               carousel.scrollLeft = scrollLeft - walk;
            });
            
            // Touch events for mobile
            carousel.addEventListener('touchstart', (e) => {
               isDown = true;
               startX = e.touches[0].pageX - carousel.offsetLeft;
               scrollLeft = carousel.scrollLeft;
               carousel.style.scrollBehavior = 'auto';
            });
            
            carousel.addEventListener('touchend', () => {
               isDown = false;
               carousel.style.scrollBehavior = 'smooth';
            });
            
            carousel.addEventListener('touchmove', (e) => {
               if (!isDown) return;
               const x = e.touches[0].pageX - carousel.offsetLeft;
               const walk = (x - startX) * 2;
               carousel.scrollLeft = scrollLeft - walk;
            });
         };
         
         // Inicializações
         animateOnScroll();
         initScreenshotsLightbox();
         initScreenshotsCarousel();
         
         // Adiciona estilos dinâmicos para o lightbox
         const lightboxStyles = document.createElement('style');
         lightboxStyles.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }