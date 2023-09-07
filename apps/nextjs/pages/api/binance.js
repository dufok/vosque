import fetch from 'node-fetch';
import crypto from 'crypto';

const createOrder = async (req, res) => {
  const binancePayload = req.body;
/*   console.log("Received headers:", req.headers);
  console.log("Received body:", binancePayload); */

  const body = JSON.stringify(binancePayload);
  const payload = `${req.headers['binancepay-timestamp']}\n${req.headers['binancepay-nonce']}\n${body}\n`;

  const signature = crypto
    .createHmac('sha512', process.env.BINANCE_SECRET_KEY)
    .update(payload)
    .digest('hex')
    .toUpperCase();

  try {
    const response = await fetch('https://bpay.binanceapi.com/binancepay/openapi/v2/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BPAY-APIKEY': process.env.BINANCE_API_KEY,
        'BinancePay-Timestamp': req.headers['binancepay-timestamp'],
        'BinancePay-Nonce': req.headers['binancepay-nonce'],
        'BinancePay-Certificate-SN': process.env.BINANCE_SECRET_KEY,
        'BinancePay-Signature': signature
      },
      body: body,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export default createOrder;
