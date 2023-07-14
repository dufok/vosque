const nodeFetch = require('node-fetch');

export function sendTelegramMessage(text) {
  
  nodeFetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_API}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}&text=${text}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

