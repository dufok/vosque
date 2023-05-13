import { YStack, XStack,Button } from "tamagui";
import React from "react";
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';

export function NavigationBlock({lessonLinkPageUP, lessonLinkPageDOWN}) {
  return (
    <XStack m="$2" mt="$6" f={1}>
      <YStack f={0.5} ai="flex-start">
        <Button {...lessonLinkPageDOWN} icon={ArrowLeft}>
          Урок 1
        </Button>
      </YStack>
      <YStack f={0.5} ai="flex-end">
        <Button {...lessonLinkPageUP} icon={ArrowRight}>
          Урок 2
        </Button> 
      </YStack>
    </XStack>
  )
}