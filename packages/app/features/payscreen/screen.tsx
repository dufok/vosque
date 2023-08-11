import {
  Paragraph,
  YStack,
  XStack,
  Switch,
  Label,
  Separator,
  Button,
  H3,
  Input
} from "@my/ui";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { X } from '@tamagui/lucide-icons'
import { trpc } from "app/utils/trpc";
import { useLink } from "solito/link";
import { useAuth } from "app/utils/clerk";
import { Banknote } from '@tamagui/lucide-icons';
import { ToastComp } from "@my/ui/src/components/ToastComp";
import { sendTelegramMessage } from "@my/ui/src/components/sendTelegramMessage";

export function payScreenScreen() {

  const router = useRouter();
  const { name, description, sku, pricerub, priceusdt } = router.query;
  if (!name || !description || !sku  || !pricerub || !priceusdt) {
    return <div> No data in payscreen !</div>;
  }

  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signin");
    }
  }, [isSignedIn]);

  return (
    <YStack f={1} jc="center" ai="center" space>
      <PayContent
        name={name}
        pricerub={pricerub}
        priceusdt={priceusdt}
        sku={sku}
        description={description}
        />
    </YStack>
  );
} 

function PayContent({ name, description, sku, pricerub, priceusdt }) {

  const { data: lessonPack } = trpc.user.lessonPackBySku.useQuery({ sku_number: sku });
  const { data: currentUser } = trpc.user.current.useQuery();
  //if curentUser empty then error in TRPC console
  if (!currentUser) {
    return <div> No data in currentUser !</div>;
  }
  const updateUserLessonPack = trpc.user.updateUserLessonPack.useMutation();
  const createPayment = trpc.user.createPayment.useMutation();

  //this is for coupon input
  const coupon = process.env.NEXT_PUBLIC_SECRET_COUPON;
  const sale = process.env.NEXT_PUBLIC_SECRET_SALE;

  //this for paying options
  const summaryCardBody = `Номер карты Тиньков. После перевода подтвердите, нажав ниже кнопку "Подтверждаю Перевод"`;
  const summaryUSDTBody = `Номер кошелька USDT (TRC20). Вы можете перевести сами и после перевода подтвердите нажав кнопку "Подтверждаю Перевод". Либо воспользуйтесь опцией перевода через BINANCE`;
  const summaryCardHead = `5536 9140 3988 8122`;
  const summaryUSDTHead = `TVyFKcfTPAmEdF5iYX3XiveLQ6HaV1UQ38`;

  //this is for swithc currency
  const [currency, setCurrency] = useState("RUB");
  const price = currency === "RUB" ? pricerub : currency === "USDT" ? priceusdt : 0;

  const summaryBody = currency === "RUB" ? summaryCardBody : currency === "USDT" ? summaryUSDTBody : "";
  const summaryHead = currency === "RUB" ? summaryCardHead : currency === "USDT" ? summaryUSDTHead : "";

  //this is for coupon input
  const [discontedPrice, setDiscountedPrice] = useState(price)

  const applyDiscount = () => {
    const inputElement = document.getElementById("coupon-input");
    const inputValue = inputElement instanceof HTMLInputElement ? inputElement.value : null;
    if (inputValue === coupon) {
      setDiscountedPrice(price * 0.75);
    } else {
      setDiscountedPrice(price);
    } 
  };

  // This is for Binance USDT payout
  const binanceSecretKey = process.env.BINANCE_SECRET_KEY || "1";
  const binanceMerchantId = process.env.BINANCE_MERCHANT_ID;
  const unique_trade_no = uuidv4();

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
        goodsDetail: course,
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
        await createPayment.mutateAsync({ prepayId: data.data.prepayId, merchantTradeNo: binancePayload.merchantTradeNo, code: data.code });
        sendTelegramMessage(textError);
      }
      
      console.log('Success:', data) // print the data
    })
    .catch(error => console.log('Error:', error));
  };

  // Course name
  const [course, setCourse] = useState<string | undefined>();

  const course_start = "Стартовый пакет";
  

  // This is for Toast
  const [list, setList] = useState<any[]>([]);

  const showToast = (type) => {

    let toastProperties;

    switch (type) {
      case "success_part":
        toastProperties = {
          id: 1,
          title: "Мы проверяем перевод",
          description: "Спасибо! Вам сразу же откроются уроки, после того как перевод подтвердится.",
          backgroundColor: "#5cb85c",
          icon: Banknote,
        };
        break;
      
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

  // This is for Telegram message
  const text = `Пользователь: ${currentUser.email} оплатил курс: ${description}. Нужно проверить! ${currency}`;
  const textError = `Пользователь: ${currentUser.email} оплатил курс: ${description}. Нужно проверить! ${currency}. Но возникла ошибка!`;
   
  const handleTransferCompletedRUB = async () => {
    {/*await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: course_start });*/};
    showToast("success_part");
    sendTelegramMessage(text);
  };

  const handleTransferCompletedUsdtSelf = async () => {
    {/*await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: course_start });*/};
    showToast("success_part");
    sendTelegramMessage(text);
  };

  //Hooks

  useEffect(() => {
    setCourse(lessonPack?.name);
  }, [lessonPack]);

  useEffect(() => {
    setDiscountedPrice(price);
  }, [price]);

  return (
    <YStack
        borderRadius="$10"
        space
        px="$7"
        py="$6"
        w={350}
        shadowColor={"#00000020"}
        shadowRadius={26}
        shadowOffset={{ width: 0, height: 4 }}
        bg="$background"
      >
        <ToastComp 
          toastList={list}
          position="bottom-center"
          autoDelete={true}
          autoDeleteTime={9000}
        />
        <YStack space="$4">
          <YStack ai="center" w="100%" bg="$backgroundHover">
            <H3>{name}</H3>
            <Paragraph>{description}</Paragraph>
          </YStack>
          <Paragraph>{summaryHead}</Paragraph>
          <Paragraph>{summaryBody}</Paragraph>
          <XStack ai="center" space="$2" mt="$4">
            <Input f={1} size="$3" placeholder={`Есть вписка ?`} id="coupon-input"/>
            <Button onPress={applyDiscount} >ПРИМЕНИТЬ</Button>
          </XStack>
          <YStack>
            <H3>Стоимость: {discontedPrice} {currency}</H3>
          </YStack>
        
          <YStack ai="flex-end" mt="$2">
          
              { currency == "RUB" ? (
                  <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                      await handleTransferCompletedRUB();
                      showToast("success_part");
                  }}>Подтверждаю Перевод</Button>
              ) : (
                <>
                  <XStack space={50} fw="wrap">
                    <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                        await handleTransferCompletedUsdtBinance();
                    }}>Перевод BINANCE</Button>
                    <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                      await handleTransferCompletedUsdtSelf();
                      showToast("success_part");
                    }}>Подтверждаю Перевод</Button>
                  </XStack>
                  {qrUrl && <img src={qrUrl} alt="QR Code" />}
                  {linkUrl && <a href={linkUrl}>Go to Payment</a>}
                </>
              )
              }
          </YStack> 
        </YStack>
    </YStack>
  );
}
