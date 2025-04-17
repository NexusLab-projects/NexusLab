// Adicione isso ao final do arquivo main.js
if (window.location.pathname.includes('obrigado.html')) {
   let count = 5;
   const counter = document.createElement('p');
   counter.className = 'counter';
   counter.innerHTML = `Redirecionando em <span>${count}</span> segundos...`;
   document.querySelector('.confirmation-text').after(counter);
   
   const interval = setInterval(() => {
      count--;
      counter.querySelector('span').textContent = count;
      if (count <= 0) {
         clearInterval(interval);
         window.location.href = '../index.html';
      }
   }, 1000);
}