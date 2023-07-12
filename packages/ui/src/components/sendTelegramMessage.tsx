const nodeFetch = require('node-fetch');

const TELEGRAM_API = process.env.TELEGRAM_API;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export function sendTelegramMessage(text) {
  nodeFetch(`${TELEGRAM_API}?chat_id=${TELEGRAM_CHAT_ID}&text=${text}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
}