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

  const parsedData = JSON.parse(payload.data);
  const merchantTradeNo = parsedData.merchantTradeNo;
  const productName = parsedData.productName;


  const yourSignature = crypto
    .createHmac('sha512', process.env.BINANCE_SECRET_KEY)
    .update(JSON.stringify(payload))
    .digest('hex')
    .toUpperCase();

  if (yourSignature !== binanceSignature) {
    console.log('Signature verification failed');
    return res.status(401).json({ message: 'Invalid signature' });
  }
  
  const paymentType = payload.bizType;

  // Payment is closed
  if (paymentType === 'PAY' && payload.bizStatus === 'PAY_CLOSED') {
    try {
        // delete payment from database
        await prisma.payment.delete({
            where: { merchantTradeNo: merchantTradeNo }
        });

    } catch (error) {
        console.error("Error deleting payment:", error);
        res.status(500).json({ returnCode: 'ERROR', returnMessage: 'Failed to close payment' });
    }
  } 

  // Payment is refunded

  if (paymentType === 'PAY' && payload.bizStatus === 'PAY_REFUND') {
    try {
      // update payment status in database
      await prisma.payment.update({
        where: { merchantTradeNo: merchantTradeNo },
        data: { status: 'REFUNDED' },
      });

    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(500).json({ returnCode: 'ERROR', returnMessage: 'Failed to update payment' });
    }
  }

  // Process the payment status from the request body.
  if (paymentType === 'PAY' && payload.bizStatus === 'PAY_SUCCESS') {
    console.log('Payment status is SUCCESS');

    // Find the user associated with the merchantTradeNo
    const payment = await prisma.payment.findUnique({
        where: { merchantTradeNo: merchantTradeNo },
    });

    if (!payment) {
        console.log('Payment not found for merchantTradeNo:', merchantTradeNo);
        return res.status(404).json({ message: 'Payment not found' });
    }

    const userId = payment.userId;
        console.log('Found user ID:', userId);

    // Find the LessonPack using the sku_number
    const lessonPack = await prisma.lessonPack.findFirst({
        where: { name: productName },
    });

    if (!lessonPack) {
        console.log('LessonPack not found for SKU:', productName);
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

    try {
        await sendEmailMessage(user.email);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ returnCode: 'ERROR', returnMessage: 'Failed to send email' });
    }

    // Update the payment status in the database
    await prisma.payment.update({
        where: { merchantTradeNo: merchantTradeNo },
        data: { status: 'SUCCESS' },
    });

    console.log('Payment status updated to SUCCESS in the database');

  }

  // Respond to Binance.
  res.status(200).json({ returnCode: 'SUCCESS', returnMessage: null });
}