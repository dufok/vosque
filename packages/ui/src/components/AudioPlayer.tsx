import { YStack, Button } from "tamagui";
import React from "react";
import { Play } from '@tamagui/lucide-icons';

export function AudioPlayer({src}) {

  const start = () => {
    let audio = new Audio(src);
    audio.play();
  }


  return (
    <YStack m="$1" jc="center" ai="center">
      <Button icon={Play} onPress={start} boc={"$backgroundFocus"}/>
    </YStack>
  );
} 