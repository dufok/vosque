import { 
  YStack,
  H3,
  XStack,
  Dialog,
  Adapt,
  Sheet,
  Button,
  Unspaced,
  Switch,
  Label,
  SizeTokens,
  Input,
  Separator,
  Paragraph
  } from 'tamagui';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { X } from '@tamagui/lucide-icons'
import React, { useState , useEffect } from "react";
import { useLink } from "solito/link";
import { trpc } from "app/utils/trpc";
import { useAuth } from "app/utils/clerk";
import { Banknote } from '@tamagui/lucide-icons';
import { ToastComp } from "@my/ui/src/components/ToastComp";
import { sendTelegramMessage } from "@my/ui/src/components/sendTelegramMessage";



export function ButtonPay(props: {
  name: string
  description: string
  course: string
  coupon: string
  pricerub: number
  priceusdt: number
  size: SizeTokens
}){

  const { isSignedIn } = useAuth();

  //this is for user check
  const userpageLinkProps = useLink({
    href: "/userpage",
  });

  // this is for toast message
  const [list, setList] = useState<any[]>([]);

  const showToast = (type) => {

    let toastProperties;

    switch (type) {
      case "success":
        toastProperties = {
          id: 1,
          title: "Мы проверяем перевод",
          description: "Три урока вам уже открыто !",
          backgroundColor: "#5cb85c",
          icon: Banknote,
        };
        break;
      
      default:
        setList([]);
        break
    }

    setList([...list, toastProperties]);

  };


  return (
    <Dialog modal>
      <ToastComp 
        toastList={list}
        position="bottom-center"
        autoDelete={true}
        autoDeleteTime={9000}
      />
      <Dialog.Trigger asChild>
       <Button
        backgroundColor="$backgroundPress"
        elevation="$0.5"
        br="$2"
        bw="$1"
        boc="$backgroundPress" h={80} w={270}>
        <Paragraph color="$background" ta="center" dangerouslySetInnerHTML={{ __html: props.name.replace(/\n/g, "<br />")}}/>
         </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" space>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay o={0}/>
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          style={{ opacity: 0.5}}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          <Dialog.Title>Тариф Online</Dialog.Title>
          <Dialog.Description maw={600}>
            <Paragraph fontFamily="$bodyBold" dangerouslySetInnerHTML={{ __html: props.description.replace(/\n/g, "<br />")}} />
          </Dialog.Description>
            <YStack ai="center" m="$4">
              {isSignedIn && (
                <MessageIfSignIn
                  pricerub={props.pricerub}
                  priceusdt={props.priceusdt}
                  course={props.course}
                  coupon={props.coupon}
                  size={props.size}
                  showToast={showToast}
                  description={props.description}
                  />
              )}
              {!isSignedIn && (
                <YStack ai="center" space="$2">
                  <Button {...userpageLinkProps} elevation="$0.5" br="$2" bw="$1" boc="$backgroundPress" >
                    <Paragraph ta="center" color="$backgroundPress">Регистрация</Paragraph>
                  </Button>
                </YStack>
              )}
              
            </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button pos="absolute" t="$3" r="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function MessageIfSignIn({course, coupon, pricerub, priceusdt, size, showToast, description}) {

  const id = `switch-${size.toString().slice(1)}`
  
  //this is for swithc currency
  const [currency, setCurrency] = useState("RUB");
  const price = currency === "RUB" ? pricerub : currency === "USDT" ? priceusdt : 0;
  
  const handleCerrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  //this for paying options
  const summaryCardBody = `Номер карты Тиньков. После перевода подтвердите, нажав ниже кнопку "Перевод Выполнен"`;
  const summaryUSDTBody = `Номер кошелька USDT (TRC20). После перевода подтвердите нажав ниже кнопку "Перевод Выполнен"`;
  const summaryCardHead = `5536 9140 3988 8122`;
  const summaryUSDTHead = `TVyFKcfTPAmEdF5iYX3XiveLQ6HaV1UQ38`;

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

  // This is for Lesson pack Mutation
  const { data: currentUser } = trpc.user.current.useQuery();
  const updateUserLessonPack = trpc.user.updateUserLessonPack.useMutation();
  // This is for Binance USDT payout
  const binanceApiKey = process.env.BINANCE_API_KEY;
  const binanceSecretKey = process.env.BINANCE_SECRET_KEY;
  const binanceMerchantId = process.env.BINANCE_MERCHANT_ID;
  const unique_trade_no = uuidv4();

  const course_start = "Стартовый пакет";

  const handleTransferCompletedRUB = async () => {
    if (!currentUser) {
      return;
    }
    await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: course_start });
    showToast("success");
    const text = `Пользователь: ${currentUser.email} оплатил курс: ${description}. Нужно проверить! ${currency}`;
    sendTelegramMessage(text);
  };

  const handleTransferCompletedUSDT = async () => {
    if (!currentUser) {
      return;
    }
    await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: course });
    showToast("success");
    const text = `Пользователь: ${currentUser.email} оплатил курс: ${description}. Нужно проверить! ${currency}`;
    sendTelegramMessage(text);

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
          goodsCategory: "D000",
          referenceGoodsId: "your_goods_id",
          goodsName: description,
          goodsDetail: course,
      },
    };

    binancePayload.timestamp = Date.now(); // Adding timestamp

    const queryString = Object.keys(binancePayload)
    .map((key) => `${key}=${encodeURIComponent(binancePayload[key])}`)
    .join('&');

    binancePayload.sign = crypto
      .createHmac('sha256', binanceSecretKey)
      .update(queryString)
      .digest('hex'); // Adding signature

    fetch('https://api.binance.com/bapi/pay/v1/pay/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BPAY-APIKEY': binanceApiKey,
      },
      body: JSON.stringify(binancePayload),
    })
    .then(response => response.json())  // convert to json
    .then(data => console.log('Success:', data))  // print the data
    .catch(error => console.log('Error:', error));
  };

  //this is for user check
  const userpageLinkProps = useLink({
    href: "/userpage",
  });

  useEffect(() => {
    setDiscountedPrice(price);
  }, [price]);

  return (
    <YStack p="$4" space="$4">
      <XStack ai="center" space="$4">
          <Switch
              bc="$backgroundFocus"
              id={id} size={size}
              name="currency"
              value="RUB"
              checked={ currency === "RUB"}
              onPress={ handleCerrencyChange }
              >
            <Switch.Thumb animation="quick" />
          </Switch>
          <Separator mih={30} vertical />
          <Label pl="$0" miw={100} jc="flex-start" size={size} htmlFor={id} >
            Перевод в рублях на карту РФ
          </Label>
      </XStack>
      <XStack ai="center" mt="$4" space="$4">
          <Switch
              bc="$backgroundFocus"
              id={id} size={size}
              name="currency"
              value="USDT"
              checked={ currency === "USDT" }
              onPress={handleCerrencyChange}
              ai="flex-start"
              >
            <Switch.Thumb animation="quick" />
          </Switch>
          <Separator mih={30} vertical />
          <Label pl="$0" miw={100} jc="flex-start" size={size} htmlFor={id}>
            Перевод в USDT на крипто кошелек
          </Label>
      </XStack>
      <Paragraph>{summaryHead}</Paragraph>
      <Paragraph>{summaryBody}</Paragraph>
      <XStack ai="center" space="$2" mt="$4">
        <Input f={1} size={size} placeholder={`Есть вписка ?`} id="coupon-input"/>
        <Button size={size} onPress={applyDiscount} >ПРИМЕНИТЬ</Button>
      </XStack>
      <YStack>
        <H3>Стоимость: {discontedPrice} {currency}</H3>
      </YStack>
    
      <YStack ai="flex-end" mt="$2">
        <Dialog.Close displayWhenAdapted asChild>
          { currency == "RUB" ? (
            <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                await handleTransferCompletedRUB();
                showToast("success");
            }}>Подтверждаю Перевод!</Button>
          ) : (
            <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                await handleTransferCompletedUSDT();
                showToast("success");
            }}>Перевод BINANCE</Button>
          )
          }
        </Dialog.Close>
      </YStack>
    </YStack>
  )
}