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
  Separator
  } from 'tamagui';
import { X } from '@tamagui/lucide-icons'
import React, { useState , useEffect } from "react";
import { useLink } from "solito/link";
import { trpc } from "app/utils/trpc";


export function ButtonPay(props: {
  title: string
  description: string
  course: string
  coupon: string
  pricerub: number
  priceusdt: number
  size: SizeTokens
  backgroundColor: string
}){
  //this is for switch 
  const id = `switch-${props.size.toString().slice(1)}`
  
  //this is for swithc currency
  const [currency, setCurrency] = useState("RUB");
  const price = currency === "RUB" ? props.pricerub : currency === "USDT" ? props.priceusdt : 0;
  
  const handleCerrencyChange = (e) => {
    setCurrency(e.target.value);
  };

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

  useEffect(() => {
    setDiscountedPrice(price);
  }, [price]);

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
       <Button als="center" bc={props.backgroundColor}> {props.title} </Button>
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
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Description>
            {props.description}
          </Dialog.Description>
            <YStack ai="center" m="$4">
              {/*{isSignedIn && (*/}
                <YStack miw={500} mih={300} p="$4" space="$4">
                  <XStack w={400} ai="center" space="$4">
                      <Switch
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
                        Перевод рубли на карту РФ "НОМЕР КАРТЫ"
                      </Label>
                  </XStack>
                  <Separator/>
                  <XStack w={400} ai="center" mt="$4" space="$4">
                      <Switch
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
                        Перевод USDT на крипто кошелек по Binance ID "НОМЕР ID"<br/>
                        либо по адресу кошелька"АДРЕC"
                      </Label>
                  </XStack>
                  <XStack ai="center" space="$2" mt="$4">
                    <Input f={1} size={props.size} placeholder={`ВАШ КУПОН`} id="coupon-input"/>
                    <Button size={props.size} onPress={applyDiscount} >ПРИМЕНИТЬ</Button>
                  </XStack>
                  <YStack>
                    <H3>Стоимость: {discontedPrice} {currency}</H3>
                  </YStack>
                
                  <YStack ai="flex-end" mt="$2">
                    <Dialog.Close displayWhenAdapted asChild>
                      <Button aria-label="Close" onPress={handleTransferCompleted}> Перевод выполнен ! </Button>
                    </Dialog.Close>
                  </YStack>
                </YStack>
              {/*})}*/}
              {!isSignedIn && (
                <YStack ai="center" space="$2">
                  <H3>Для покупки курса необходимо авторизоваться</H3>
                  <Button size={props.size} {...userpageLinkProps}>Авторизоваться</Button>
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