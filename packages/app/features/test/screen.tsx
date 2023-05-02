import React from "react";
import { YStack, XStack, H1, Paragraph, Button } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';
import { useToastController } from '@tamagui/toast';

export function testScreen() {

  const toast = useToastController();
  
  return (
  <YStack f={1} ai="center" miw={400} space="$6">
      <Button bc="$backgroundFocus" onClick={() => {
          toast.show('Нам нужно проверить ваш перевод!', {
              message: "Пока мы это делаем, вы уже можете начать изучать Испанский язык!"
          })
      }}> Перевод выполнен ! </Button>
    </YStack>
  );
}

