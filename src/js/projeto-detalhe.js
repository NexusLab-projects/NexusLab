document.addEventListener('DOMContentLoaded', function() {
   // Animação de entrada dos elementos
   const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .tech-item, .gallery-item, .testimonial-card');
      
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
   
   // Lightbox para a galeria
   const initGalleryLightbox = () => {
      const galleryItems = document.querySelectorAll('.gallery-item');
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
      
      galleryItems.forEach((item, index) => {
         item.addEventListener('click', () => {
            currentIndex = index;
            const imgSrc = item.querySelector('img').src;
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
         currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
         updateLightboxImage();
      });
      
      lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
         e.stopPropagation();
         currentIndex = (currentIndex + 1) % galleryItems.length;
         updateLightboxImage();
      });
      
      function updateLightboxImage() {
         const imgSrc = galleryItems[currentIndex].querySelector('img').src;
         lightbox.querySelector('img').src = imgSrc;
      }
      
      lightbox.addEventListener('click', (e) => {
         if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
         }
      });
   };
   
   // Inicializações
   animateOnScroll();
   initGalleryLightbox();
   
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
        
        .lightbox.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border-radius: 0.5rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            border: none;
            color: white;
            font-size: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .lightbox-prev {
            left: 20px;
        }
        
        .lightbox-next {
            right: 20px;
        }
        
        @media (max-width: 768px) {
            .lightbox-nav {
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
            }
        }
    `;
   document.head.appendChild(lightboxStyles);
});