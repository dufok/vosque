import {
  Paragraph,
  YStack,
  XStack,
  Button,
  Input,
  H3,
  H4,
  XGroup
} from "tamagui";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";

import { trpc } from "app/utils/trpc";
import { useAuth } from "app/utils/clerk";
import { Ticket, Banknote } from '@tamagui/lucide-icons';
import { ToastComp } from "./ToastComp";
import { sendTelegramMessage } from "./sendTelegramMessage";
import { SpinnerOver } from "./SpinnerOver";
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { BinanceButton } from "./BinanceButton";


export function PayContent({ name, description, sku, pricerub, priceusdt, coupon }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const createPayment = trpc.user.createPayment.useMutation();
  const { data: lessonPack, isLoading: isUserPacksLoading } = trpc.user.lessonPackBySku.useQuery({ sku_number: sku });
  const { data: currentUser} = trpc.user.current.useQuery();
  //this for paying options
  const summaryCardBody = isSignedIn 
    ? `1. Осуществите перевод по указанным реквизитам. </br> 2. После осуществления перевода нажмите на кнопку «подтвердить перевод». </br> 3. После этого дождитесь уведомления на почту о получении перевода и открытии доступа к урокам.`
    : `1. Чтобы осуществить перевод, сначала нужно зарегистрироваться. </br> 2. После осуществления перевода нажать на кнопку «подтвердить перевод». </br> 3. После дождаться уведомления на почту о получении перевода и открытии доступа к урокам.`;
  
  const summaryUSDTBody = isSignedIn
    ? `Номер кошелька USDT (TRC20). </br> 1. Осуществите перевод по указанным реквизитам. </br> 2. После осуществления перевода нажмите на кнопку «подтвердить перевод». </br> 3. После этого дождитесь уведомления на почту о получении перевода и открытии доступа к урокам.`
    : `1. Чтобы осуществить перевод, сначала нужно зарегистрироваться. </br> 2. После осуществления перевода нажать на кнопку «подтвердить перевод». </br> 3. После дождаться уведомления на почту о получении перевода и открытии доступа к урокам.`;
  
  const summaryCardHead = `5536 9140 3988 8122`;
  const summaryUSDTHead = `TVyFKcfTPAmEdF5iYX3XiveLQ6HaV1UQ38`;
  // Spinner for loading
  const [showSpinner, setShowSpinner] = useState(false);
  //this is for swithc currency
  const [currency, setCurrency] = useState("RUB");
  const [price, setPrice] = useState(pricerub);
  // Course name
  const cource = lessonPack?.name;
  //
  const isLoadingOverall = isUserPacksLoading;
  const handleToRUB = async () => {
      setCurrency("RUB")
      setPrice(pricerub)
  };
  const handleToUSDT = async () => {
    setCurrency("USDT")
    setPrice(priceusdt)
  };
  const summaryBody = currency === "RUB" ? summaryCardBody : currency === "USDT" ? summaryUSDTBody : "";
  const summaryHead = currency === "RUB" ? summaryCardHead : currency === "USDT" ? summaryUSDTHead : "";
  // This is for price 
  const [discontedPrice, setDiscountedPrice] = useState(price);
  // This is clean name from html tags
  const cleanName = name.replace(/<br\s*\/?>/gi, '');
  // This is for sheet
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (coupon !== "undefined") {
      setOpen(true)
    }
  }, [coupon]);
  const handleOpen = () => {
    setOpen(true)
  }
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

  //if curentUser empty then error in TRPC console
  const text = `Пользователь: ${currentUser?.email} оплатил курс: ${description}. Нужно проверить! ${discontedPrice} ${currency}`;
  const textError = `Пользователь: ${currentUser?.email} оплатил курс: ${description}. Нужно проверить! ${discontedPrice} ${currency}. Но возникла ошибка!`;
  
  // Transfer Completed
  const handleTransferCompletedRUB = async () => {
    {/*await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: course_start });*/};

    setShowSpinner(true);
    showToast("success_part");
    sendTelegramMessage(text);
    setTimeout(() => {
      setShowSpinner(false);
      router.push('/');
    }, 5000);
    
  };

  const handleTransferCompletedUsdtSelf = async () => {
    {/*await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: course_start });*/};
    // Show the spinner

    setShowSpinner(true);
    showToast("success_part");
    sendTelegramMessage(text);
    setTimeout(() => {
      setShowSpinner(false);
      router.push('/');
    }, 5000);
    
  };

  return (
    <>
    { (isLoadingOverall || showSpinner) && <SpinnerOver /> }
    <ToastComp 
    toastList={list}
    position="bottom-center"
    autoDelete={true}
    autoDeleteTime={9000}
    />
    <YStack
        borderRadius="$10"
        space
        w={350}
        shadowColor={"#00000020"}
        shadowRadius={26}
        shadowOffset={{ width: 0, height: 4 }}
        bg="$background"
        animation="bouncy"
        enterStyle={{
          scale: 1.5,
          y: -10,
          opacity: 0,
        }}
      >
        <YStack space="$4">
          <YStack
            ai="center"
            borderTopLeftRadius="$10"
            borderTopRightRadius="$10"
            bg="$backgroundLight"
            width="100%"
            pb="$3"
            px="$6"
            pt="$6"
            >
            <H3 mb={10} >{cleanName}</H3>
            <Paragraph mb={5}>{description}</Paragraph>
            <XStack jc="flex-end" w="100%" ai="center">
              <div onClick={handleOpen}>
                <Paragraph size="$3" fontWeight={"700"} opacity={0.8} mr={5}>
                  Купон
                </Paragraph>
              </div>
              <Ticket opacity={0.8} size={15} />
            </XStack>
            <SheetCoupon open={open} onOpenChange={setOpen} price={price} discontedPrice={discontedPrice} setDiscountedPrice={setDiscountedPrice} coupon={coupon}/>
          </YStack>
          <XGroup jc="center">
            <XGroup.Item>
              <Button w={157} onPress={handleToUSDT}><H4>USDT</H4></Button>
            </XGroup.Item>
            <XGroup.Item>
              <Button w={157} onPress={handleToRUB}><H4>RUB</H4></Button>
            </XGroup.Item>
          </XGroup>
          <YStack paddingHorizontal="$4">
            <Paragraph size="$2" fontFamily="$hack" mb="$2">{summaryHead}</Paragraph>
            <Paragraph mb="$2" dangerouslySetInnerHTML={{ __html: summaryBody.replace(/\n/g, "<br />")}}/>
            <YStack>
              <H3>Стоимость: {discontedPrice} {currency}</H3>
            </YStack>
          </YStack>
        
          <YStack ai="center" mt="$2" mb="$6">
            { isSignedIn ? (
              currency == "RUB" ? (
                    <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                      await handleTransferCompletedRUB();
                    }}>Проверить Перевод</Button>
                ) : (
                  <>
                    <XStack space={10} fw="wrap">
                    <BinanceButton 
                        discontedPrice={discontedPrice}
                        sku={sku}
                        description={description}
                        cource={cource}
                        text={text}
                        textError={textError}
                        createPayment={createPayment}
                      />
                      <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                        await handleTransferCompletedUsdtSelf();
                      }}>Проверить Перевод</Button>
                    </XStack>
                  </>
                )
              ) : (
              <Button bc="$backgroundFocus" aria-label="Close" onPress={() => router.push("/signin")}>Войти</Button>
            )}
          </YStack> 
        </YStack>
    </YStack>
    </>
  );
} 

function SheetCoupon({ price, discontedPrice, setDiscountedPrice, open, onOpenChange, coupon }) {
  const [position, setPosition] = useState(0)

  //this is for coupon input
  /* const coupon = process.env.NEXT_PUBLIC_SECRET_COUPON; */
  const sale = process.env.NEXT_PUBLIC_SECRET_SALE;
  /* const friend = process.env.NEXT_PUBLIC_SECRET_FRIEND; */
  

  const [couponInput, setCouponInput] = useState("");

  const applyDiscount = () => {
  // Make sure the variables are defined
  if (sale) {
    const discountMap = {
      [String(sale)]: 0.8,
    };

    const discountFactor = discountMap[couponInput] || 1;
    setDiscountedPrice(price * discountFactor);
    } else {
      // Handle the case where the variables are not defined
      console.warn("Coupon codes are not defined.");
    }
  };
  
  useEffect(() => {
    if (coupon && coupon !== "undefined") {
      setCouponInput(coupon);
      applyDiscount();
    } else {
      setDiscountedPrice(price);
    }
  }, [price, coupon]);

  return (
    <>
    {open && (
      <XStack ai="center" space="$2" mt="$4">
        <Input 
          w='90%' 
          f={1} 
          placeholder={`Есть вписка ?`} 
          value={couponInput} 
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setCouponInput(e.nativeEvent.text)} 
        />
        <Button onPress={applyDiscount}>ПРИМЕНИТЬ</Button>
      </XStack>
    )}
    </>
  );
}
