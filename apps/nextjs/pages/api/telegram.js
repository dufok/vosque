import fetch from 'node-fetch';

export const sendMessage = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        text: text
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.description || 'Telegram API error');
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
