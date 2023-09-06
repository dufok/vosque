import { Paragraph, Button, YStack } from "tamagui";
import React, { useState } from "react";
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { sendTelegramMessage } from "./sendTelegramMessage";
import { trpc } from "app/utils/trpc";
import { Banknote } from '@tamagui/lucide-icons';
import { BinanceIcon } from "./GithubIcon";

export function BinanceButton({ discontedPrice, sku, description, cource, text, textError, createPayment}) {

  const binanceSecretKey = process.env.BINANCE_SECRET_KEY || "1";
  const binanceMerchantId = process.env.BINANCE_MERCHANT_ID;
  const unique_trade_no = uuidv4();
   // This is for Toast
  const [list, setList] = useState<any[]>([]);
  const showToast = (type) => {

    let toastProperties;
    switch (type) {
      case "success_all":
        toastProperties = {
          id: 1,
          title: "Спасибо за перевод !",
          description: "Ваши уроки в личном Кабинете !",
          backgroundColor: "#5cb85c",
          icon: Banknote,
        };
        break;

      case "error":
        toastProperties = {
          id: 1,
          title: "Ошибка !",
          description: "Попробуйте еще раз !",
          backgroundColor: "#d9534f",
          icon: Banknote,
        };
        break;
      
      default:
        setList([]);
        break
    }
    setList([...list, toastProperties]);
  };

  let qrUrl;
  let linkUrl;

  const handleTransferCompletedUsdtBinance = async () => {
    // Binance API call
    const binancePayload = {
      env: {
        terminalType: "WEB",
      },
      orderTags: {
        ifProfitSharing: true,
      },
      merchantTradeNo: unique_trade_no,
      orderAmount: discontedPrice,
      currency: "USDT",
      goods: {
        goodsType: "01",
        goodsCategory: "Z000",
        referenceGoodsId: sku,
        goodsName: description,
        goodsDetail: cource,
      },
      timestamp: Date.now(),
      sign: "",
    };

    const nonce = uuidv4(); // Generate a unique nonce for each request
    const body = JSON.stringify(binancePayload);
    const payload = `${binancePayload.timestamp}\n${nonce}\n${body}\n`;

    const signature = crypto
      .createHmac('sha512', binanceSecretKey)
      .update(payload)
      .digest('hex')
      .toUpperCase(); // Generate the signature

    binancePayload.sign = signature; // Add the signature to the payload
    
    fetch('/api/binance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'BinancePay-Timestamp': binancePayload.timestamp.toString()
      },
      body: JSON.stringify(binancePayload),
    })
    .then(response => response.json())  // convert to json
    .then(async (data) => {
      if (data.status === "SUCCESS") {
        qrUrl = data.data.qrcodeLink;
        linkUrl = data.data.universalUrl;
        sendTelegramMessage(text);
      } else {
        showToast("error");
        console.log('Error:', data)
        await createPayment.mutateAsync({ prepayId: data.data.prepayId, merchantTradeNo: binancePayload.merchantTradeNo, code: data.code });
        sendTelegramMessage(textError);
      }
      
      console.log('Success:', data) // print the data
    })
    .catch(error => console.log('Error:', error));
  };

  return (
    <>
     <Button w={140} bc="$backgroundFocus" aria-label="Close" onPress={async () => {
        await handleTransferCompletedUsdtBinance();
        }}> <BinanceIcon /> </Button>
      {qrUrl && <img src={qrUrl} alt="QR Code" />}
      {linkUrl && <a href={linkUrl}>Go to Payment</a>}
    </>
  );
} 