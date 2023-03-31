import { 
  YStack,
  H3,
  XStack,
  Dialog,
  Adapt,
  Sheet,
  Button,
  Unspaced,
  Square,
  Switch,
  Label,
  SizeTokens,
  Input
  } from 'tamagui';
import { X } from '@tamagui/lucide-icons'
import React, { useState } from "react";

export function ButtonPay(props: {
  title: string
  description: string
  curse: string
  coupon: string
  pricerub: number
  priceusdt: number
  size: SizeTokens
}){
  //this is for switch 
  const id = `switch-${props.size.toString().slice(1)}`
  //this is for swithc currency
  const [currency, setCurrency] = useState("RUB")
  const handleCerrencyChange = (e) => {
    setCurrency(e.target.value);
  };
  const price =
    currency === "RUB" ? props.pricerub : props.priceusdt;
  

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
  

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Square
          bc="$background"
          animation="bouncy"
          elevation="$4"
          w="$15"
          h="$10"
          br="$5"
          m="$1.5"
          hoverStyle={{
            scale: 1.2,
          }}
          pressStyle={{
            scale: 0.9,
          }}
          >
          <H3>{props.title}</H3>
        </Square>
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
            <Dialog.Close displayWhenAdapted asChild>
              <YStack>
                <YStack>
                    <Switch
                        id={id} size={props.size}
                        name="currency"
                        value="RUB"
                        checked={ currency === "RUB"}
                        onPress={handleCerrencyChange}
                        >
                      <Switch.Thumb animation="quick" />
                    </Switch>
                    <Label size={props.size} htmlFor={id} >
                      Перевод рубли на карту РФ "НОМЕР КАРТЫ"
                    </Label>
                </YStack>
                <YStack>
                    <Switch id={id} size={props.size}
                        name="currency"
                        value="USDT"
                        checked={ currency === "USDT"}
                        onPress={handleCerrencyChange}
                        >
                      <Switch.Thumb animation="quick" />
                    </Switch>
                    <Label size="$3" htmlFor={id}>
                      Перевод USDT на крипто кошелек по Binance ID "НОМЕР ID"<br/>
                      либо по адресу кошелька"АДРЕC"
                    </Label>
                </YStack>
                <YStack>
                  <XStack ai="center" space="$2">
                    <Input f={1} size={props.size} placeholder={`ВАШ КУПОН`} id="coupon-input"/>
                    <Button size={props.size} onPress={applyDiscount} >ПРИМЕНИТЬ</Button>
                  </XStack>
                </YStack>
                <YStack>
                  <H3>Стоимость: {discontedPrice} " " {currency} </H3>
                </YStack>
                <YStack>
                  <Button w="50%"> Перевод выполнен ! </Button>
                </YStack>
              </YStack>
            </Dialog.Close>
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