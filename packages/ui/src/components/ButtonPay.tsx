import { 
  YStack,
  H3,
  H6,
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
  Image,
  Paragraph
  } from 'tamagui';
import { X } from '@tamagui/lucide-icons'
import React, { useState , useEffect } from "react";
import { useLink } from "solito/link";
import { trpc } from "app/utils/trpc";
import { DollarSign } from '@tamagui/lucide-icons';
import { ToastComp } from "@my/ui/src/components/ToastComp";



export function ButtonPay(props: {
  description: string
  course: string
  coupon: string
  pricerub: number
  priceusdt: number
  size: SizeTokens
}){
  //this is for switch 
  const id = `switch-${props.size.toString().slice(1)}`
  
  //this is for swithc currency
  const [currency, setCurrency] = useState("RUB");
  const price = currency === "RUB" ? props.pricerub : currency === "USDT" ? props.priceusdt : 0;
  
  const handleCerrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  //this for paying options
  const summaryCardBody = `Номер карты СберБанка. После перевода подтвердите нажав ниже кнопку "Перевод Выполнен"`;
  const summaryUSDTBody = `Номер кошелька USDT (TRC20). После перевода подтвердите нажав ниже кнопку "Перевод Выполнен"`;
  const summaryCardHead = `0000 0000 0000 0000`;
  const summaryUSDTHead = `TVyFKcfTPAmEdF5iYX3XiveLQ6HaV1UQ38`;

  const summaryBody = currency === "RUB" ? summaryCardBody : currency === "USDT" ? summaryUSDTBody : "";
  const summaryHead = currency === "RUB" ? summaryCardHead : currency === "USDT" ? summaryUSDTHead : "";


  //this is for coupon input
  
  const [discontedPrice, setDiscountedPrice] = useState(price)

  const applyDiscount = () => {
    const inputElement = document.getElementById("coupon-input");
    const inputValue = inputElement instanceof HTMLInputElement ? inputElement.value : null;
    if (inputValue === props.coupon) {
      setDiscountedPrice(price * 0.75);
    } else {
      setDiscountedPrice(price);
    } 
  };

  // This is for Lesson pack Mutation
  const { data: currentUser } = trpc.user.current.useQuery();
  const updateUserLessonPack = trpc.user.updateUserLessonPack.useMutation();

  const handleTransferCompleted = async () => {
    if (!currentUser) {
      return;
    }
    await updateUserLessonPack.mutateAsync({ userId: currentUser.id, lessonPackName: props.course });
  };

  //this is for user check
  const userpageLinkProps = useLink({
    href: "/userpage",
  });

  const isSignedIn = !!currentUser;

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
          icon: DollarSign,
        };
        break;
      
      default:
        setList([]);
        break
    }

    setList([...list, toastProperties]);

  };


  useEffect(() => {
    setDiscountedPrice(price);
  }, [price]);

  return (
    
    <Dialog modal>
      <ToastComp 
        toastList={list}
        position="bottom-right"
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
        <Paragraph color="$background" ta="center">
          Тариф <br/> Online </Paragraph></Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" space>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          o={0.5}
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
          <Dialog.Description>
            {props.description}
          </Dialog.Description>
            <YStack ai="center" m="$4">
              {isSignedIn && (
                <YStack p="$4" space="$4">
                  <XStack ai="center" space="$4">
                      <Switch
                          bc="$backgroundFocus"
                          id={id} size={props.size}
                          name="currency"
                          value="RUB"
                          checked={ currency === "RUB"}
                          onPress={ handleCerrencyChange }
                          >
                        <Switch.Thumb animation="quick" />
                      </Switch>
                      <Separator mih={30} vertical />
                      <Label pl="$0" miw={100} jc="flex-start" size={props.size} htmlFor={id} >
                        Перевод в рублях на карту РФ
                      </Label>
                  </XStack>
                  <XStack ai="center" mt="$4" space="$4">
                      <Switch
                          bc="$backgroundFocus"
                          id={id} size={props.size}
                          name="currency"
                          value="USDT"
                          checked={ currency === "USDT" }
                          onPress={handleCerrencyChange}
                          ai="flex-start"
                          >
                        <Switch.Thumb animation="quick" />
                      </Switch>
                      <Separator mih={30} vertical />
                      <Label pl="$0" miw={100} jc="flex-start" size={props.size} htmlFor={id}>
                        Перевод в USDT на крипто кошелек
                      </Label>
                  </XStack>
                  <Paragraph>{summaryHead}</Paragraph>
                  <Paragraph>{summaryBody}</Paragraph>
                  <XStack ai="center" space="$2" mt="$4">
                    <Input f={1} size={props.size} placeholder={`Есть вписка ?`} id="coupon-input"/>
                    <Button size={props.size} onPress={applyDiscount} >ПРИМЕНИТЬ</Button>
                  </XStack>
                  <YStack>
                    <H3>Стоимость: {discontedPrice} {currency}</H3>
                  </YStack>
                
                  <YStack ai="flex-end" mt="$2">
                    <Dialog.Close displayWhenAdapted asChild>
                      <Button bc="$backgroundFocus" aria-label="Close" onPress={async () => {
                          await handleTransferCompleted();
                          showToast("success");
                      }}> Перевод выполнен ! </Button>
                    </Dialog.Close>
                  </YStack>
                </YStack>
              )}
              {!isSignedIn && (
                <YStack ai="center" space="$2">
                  <H3>Для покупки курса необходимо авторизоваться</H3>
                  <Button {...userpageLinkProps} elevation="$0.5" br="$2" bw="$1" boc="$backgroundPress" >
                    <Paragraph ta="center" color="$backgroundPress">Авторизоваться</Paragraph>
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