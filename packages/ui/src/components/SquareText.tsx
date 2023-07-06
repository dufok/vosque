import { H4, Square, XStack, YStack } from "tamagui";
import React from "react";

export function SquareText({text}) {
  return (

      <YStack mb="$4" ml="$6" w="90%" maw={1000} $sm={{ marginLeft : 0 }}  >
        <YStack ai="flex-start">
          <Square maw="90%" paddingHorizontal="$4" bc="$backgroundFocus">
            <H4 col="$background"> {text} </H4>
          </Square>
        </YStack>
      </YStack>
    )
} 

       