export const sendTelegramMessage = async (text) => {
  
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    // Data is retrieved but not used. If you need to use the data, do it here.
  } catch (error) {
    console.error('Error when sending message:', error);
  }
}