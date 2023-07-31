import fetch from 'node-fetch';

const createOrder = async (req, res) => {
  const binancePayload = req.body;

  try {
    const response = await fetch('https://bpay.binanceapi.com/binancepay/openapi/v2/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BPAY-APIKEY': process.env.BINANCE_API_KEY,
      },
      body: JSON.stringify(binancePayload),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export default createOrder;