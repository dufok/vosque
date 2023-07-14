export const sendTelegramMessage = async (text) => {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    try {
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    
  } catch (error) {
    console.log(error);
  }
}
