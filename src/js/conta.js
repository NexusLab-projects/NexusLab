// Set the launch date (adjust as needed)
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 272); // 30 days from now

function updateCountdown() {
   const now = new Date();
   const diff = launchDate - now;
   
   // Calculate days, hours, minutes, seconds
   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((diff % (1000 * 60)) / 1000);
   
   // Update the DOM
   document.getElementById('days').textContent = days.toString().padStart(2, '0');
   document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
   document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
   document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
   
   // If launch date passed
   if (diff < 0) {
      clearInterval(countdownInterval);
      document.querySelector('.coming-soon-title').textContent = 'Estamos no ar!';
      document.querySelector('.coming-soon-message').textContent = 'Obrigado por sua paciência. Aproveite nossa nova plataforma!';
      document.querySelector('.countdown-container').style.display = 'none';
   }
}

// Initial call
updateCountdown();

// Update every second
const countdownInterval = setInterval(updateCountdown, 1000);