import { H4, Square, XStack, YStack } from "tamagui";
import React from "react";

export function SquareText({text}) {
  return (

      <YStack mt="$6" ml="$6" w="100%" maw={1000}>
        <YStack ai="flex-start">
          <Square paddingHorizontal="$4" bc="$backgroundFocus">
            <H4 col="$background"> {text} </H4>
          </Square>
        </YStack>
      </YStack>
    )
} 

       