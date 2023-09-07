import crypto from 'crypto';
import prisma from '@my/db/index';
import { sendEmailMessage } from "@my/ui/src/components/sendEmailMessage";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Received a non-POST request');
    return res.status(405).end();
  }

  // Verify Binance's signature
  const binanceSignature = req.headers['binancepay-signature'];
  const payload = req.body; // Assuming the body is already parsed as JSON
  console.log('Received payload:', payload);

  const yourSignature = crypto
    .createHmac('sha512', process.env.BINANCE_SECRET_KEY)
    .update(JSON.stringify(payload))
    .digest('hex');

  if (yourSignature !== binanceSignature) {
    console.log('Signature verification failed');
    return res.status(401).json({ message: 'Invalid signature' });
  }

  // Check if this merchantTradeNo is already processed (Idempotency)
  const existingPayment = await prisma.payment.findUnique({
    where: { merchantTradeNo: payload.merchantTradeNo },
  });

  if (existingPayment) {
    console.log('Payment already processed:', existingPayment);
    return res.status(200).json({ message: 'Payment already processed' });
  }

  // Process the payment status from the request body.
  const paymentStatus = payload.status;
  if (paymentStatus === 'SUCCESS') {
    console.log('Payment status is SUCCESS');

    // Find the user associated with the merchantTradeNo
    const payment = await prisma.payment.findUnique({
        where: { merchantTradeNo: payload.merchantTradeNo },
    });

    if (!payment) {
        console.log('Payment not found for merchantTradeNo:', payload.merchantTradeNo);
        return res.status(404).json({ message: 'Payment not found' });
    }

    const userId = payment.userId;
        console.log('Found user ID:', userId);

    // Find the LessonPack using the sku_number
    const lessonPack = await prisma.lessonPack.findFirst({
        where: { sku_number: payload.referenceGoodsId },
    });

    if (!lessonPack) {
        console.log('LessonPack not found for SKU:', payload.referenceGoodsId);
        return res.status(404).json({ message: 'LessonPack not found' });
    }

    console.log('Found LessonPack:', lessonPack);

    // Connect the LessonPack to the User
    await prisma.user.update({
        where: { id: userId },
        data: { lessonPacks: { connect: { id: lessonPack.id } } },
    });

    console.log('Successfully connected LessonPack to user');

    // Send email to user
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    sendEmailMessage(user.email)

    // Update the payment status in the database
    await prisma.payment.update({
        where: { merchantTradeNo: payload.merchantTradeNo },
        data: { status: 'SUCCESS' },
    });

    console.log('Payment status updated to SUCCESS in the database');

  }

  // Respond to Binance.
  res.status(200).json({ message: 'Webhook processed successfully' });
}