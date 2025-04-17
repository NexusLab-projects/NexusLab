async function fetchServerStatus() {
   try {
      // Substitua 'SEU_IP' pelo IP do seu servidor e 'PORTA' pela porta (19132 para Bedrock/MCPE)
      const response = await fetch('https://api.mcstatus.io/v2/status/bedrock/play.havenmc.com.br:13031');
      const data = await response.json();
      
      return {
         version: data.version.name,
         players: {
            online: data.players.online,
            max: data.players.max
         },
         online: data.online
      };
   } catch (error) {
      console.error("Erro ao buscar status:", error);
      return {
         version: "0.15.10",
         players: {
            online: 0,
            max: 100
         },
         online: false
      };
   }
}

async function updateStatus() {
   const status = await fetchServerStatus();
   
   // Atualiza a versão
   document.getElementById('version').textContent = status.version;
   
   // Atualiza os jogadores
   document.getElementById('players').textContent =
      `${status.players.online}/${status.players.max}`;
   
   // Atualiza o status
   const statusElement = document.getElementById('server-status');
   if (status.online) {
      statusElement.textContent = "Online";
      statusElement.classList.remove('offline');
      statusElement.classList.add('online');
   } else {
      statusElement.textContent = "Offline";
      statusElement.classList.remove('online');
      statusElement.classList.add('offline');
   }
}

// Atualiza o status inicialmente
updateStatus();

// Atualiza o status a cada 10 segundos (reduzido de 5 para evitar rate limit)
setInterval(updateStatus, 10000);