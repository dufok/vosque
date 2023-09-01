import { Paragraph, YStack, AlertDialog, Button, XStack } from "tamagui";
import React,{useEffect, useState} from "react";

interface SaleButtonProps {
  isOpen: boolean;
}

export function SaleButton({ isOpen: initialIsOpen }: SaleButtonProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const sale = process.env.NEXT_PUBLIC_SECRET_SALE;

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);
  
  return (
    <AlertDialog native open={isOpen}>
    <AlertDialog.Trigger asChild>
      <Button zIndex={100_000} style={{ position: 'fixed', bottom: '10px', right: '10px'}} onPress={() => setIsOpen(true)}>ПРОМОКОД</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay
        key="overlay"
        animation="quick"
        style={{ opacity: 0.3 }}
        enterStyle={{ opacity: 0 }}
      />
      <AlertDialog.Content
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
        x={0}
        scale={1}
        opacity={1}
        y={0}
        maw='80%'
      >
        <YStack space>
          <AlertDialog.Title>Хорошие Новости!</AlertDialog.Title>
          <AlertDialog.Description>
            <YStack space="$2">
            <Paragraph>До 10 сентября действует скидка 20% на базовый курс аргентинского испанского.</Paragraph>
            <Paragraph mt="$2">Чтобы воспользоваться скидкой, скопируйте промокод {sale} и введите его на странице оплаты, предварительно выбрав подходящий тариф.</Paragraph>
            </YStack>
         </AlertDialog.Description>
          <XStack space="$3" justifyContent="flex-end">
            <AlertDialog.Cancel asChild>
              <Button onPress={() => setIsOpen(false)}>Закрыть</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                onPress={() => {
                  window.location.href = '/course';
                }}
              >
                Курс
              </Button>
            </AlertDialog.Action>
          </XStack>
        </YStack>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog>
);
}