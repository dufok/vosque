import { Paragraph, Button, YStack, Popover,
  PopoverProps, Adapt} from "tamagui";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { sendTelegramMessage } from "./sendTelegramMessage";
import { Banknote } from '@tamagui/lucide-icons';
import { BinanceIcon } from "./GithubIcon";

export function BinanceButton({ discontedPrice, sku, description, cource, text, textError, createPayment}) {

  const unique_trade_no = uuidv4().replace(/-/g, '').substring(0, 32);
  const [qrUrl, setQrUrl] = useState(null);
  const [linkUrl, setLinkUrl] = useState(null);


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


  const handleTransferCompletedUsdtBinance = async () => {
    // if qrUrl or linkUrl is not null, then we have already created a payment
    if (qrUrl || linkUrl) {
      return;
    }

    // Binance API call
    const binancePayload = {
      env: {
        terminalType: "WEB",
      },
      orderTags: {
        /* ifProfitSharing: true, */
      },
      merchantTradeNo: unique_trade_no,
      orderAmount: discontedPrice,
      currency: "USDT",
      goods: {
        goodsType: "02",
        goodsCategory: "Z000",
        referenceGoodsId: sku,
        goodsName: cource,
        goodsDetail: description,
      },
      timestamp: Date.now(),
    };

    const nonce = uuidv4().replace(/-/g, '').substring(0, 32); // Generate a unique nonce for each request
    
    fetch('/api/binance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'BinancePay-Timestamp': binancePayload.timestamp.toString(),
        'BinancePay-Nonce': nonce
      },
      body: JSON.stringify(binancePayload),
    })
    .then(response => response.json())  // convert to json
    .then(async (data) => {
      if (data.status === "SUCCESS") {
        setQrUrl(data.data.qrcodeLink);
        setLinkUrl(data.data.universalUrl);
        console.log(data.data.qrcodeLink);
        console.log(data.data.universalUrl);
        await createPayment.mutateAsync({ prepayId: data.data?.prepayId, merchantTradeNo: binancePayload.merchantTradeNo, code: data.code });
        /* sendTelegramMessage(text); */
      } else {
        showToast("error");
        await createPayment.mutateAsync({
          status: data.status,
          prepayId: data.errorMessage,
          merchantTradeNo: unique_trade_no,
          code: data.code
        });
        sendTelegramMessage(textError);
      }
      
      console.log(data) // print the data
    })
    .catch(error => console.log('Error:', error));
  };

  return (
    <>
    <Popover size="$5" allowFlip>
      <Popover.Trigger asChild>
        <Button w={140} bc="$backgroundFocus" aria-label="Close" onPress={async () => {
            await handleTransferCompletedUsdtBinance();
            }}> <BinanceIcon /> </Button>
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <YStack ai="center">
              <Adapt.Contents />
            </YStack>
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            o={0}
          />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        <YStack space="$3" maw={250} w="100%">
          <YStack ai="center">
            {qrUrl && <img src={qrUrl} width={200} height={200} alt="QR Code" />}
            {linkUrl && <a href={linkUrl}>
              <Paragraph>🍄 продолжить на BINANCE 🍄</Paragraph>
            </a>}
            <Paragraph fontFamily="$bodyBold" size="$3" fontWeight={"700"} opacity={0.6} mt={5}>
              после оплаты уроки появятся у вас в личном кабинете
            </Paragraph>
          </YStack>
        </YStack>

        <Popover.Close asChild>
          
        </Popover.Close>
      </Popover.Content>
    </Popover>
    </>
  );
} 