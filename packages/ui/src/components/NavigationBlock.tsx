import { YStack, XStack,Button } from "tamagui";
import React from "react";
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';

export function NavigationBlock({lessonLinkPageUP, lessonLinkPageDOWN, lessonLinkPageDOWNname, lessonLinkPageUPname}) {
  return (
    <XStack m="$2" mt="$6" f={1}>
      <YStack f={0.5} ai="flex-start">
        <Button bw={0} {...lessonLinkPageDOWN} icon={ArrowLeft}>
          {lessonLinkPageDOWNname}
        </Button>
      </YStack>
      <YStack f={0.5} ai="flex-end">
        <Button bw={0} {...lessonLinkPageUP} icon={ArrowRight}>
          {lessonLinkPageUPname}
        </Button> 
      </YStack>
    </XStack>
  )
}