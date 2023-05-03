import React from "react";
import { YStack, XStack, H1, Paragraph, Button } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';
import { ToastProvider, Toast, useToastController, useToastState } from '@tamagui/toast';


export function testScreen() {
  return (
    <ToastProvider >
      <YStack space alignItems="center">
        <ToastControl />
        <CurrentToast />
      </YStack>
    </ToastProvider>
  )
}

const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

const ToastControl = () => {
  const toast = useToastController()
  return (
    <XStack space="$2" justifyContent="center">
      <Button
        onPress={() => {
          try {
            toast.show('Нам нужно проверить ваш перевод!', {
              message: "Пока мы это делаем, вы уже можете начать изучать Испанский язык!",
            })
          } catch (error) {
            console.error('Failed to show toast', error)
          }
        }}
      >
        Перевод выполнен !
      </Button>
    </XStack>
  )
}
