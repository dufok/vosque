import { YStack, Button } from "tamagui";
import React from "react";
import { Play } from '@tamagui/lucide-icons';

export function AudioPlayer({src}) {

  let audio = new Audio({src});

  const start = () => {
    audio.play();
  }


  return (
    <YStack jc="center" ai="center">
      <Button icon={Play} onPress={start} />
    </YStack>
  );
} 