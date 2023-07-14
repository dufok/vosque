import fetch from 'node-fetch';

const sendMessage = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_API}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}&text=${text}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export default sendMessage;
