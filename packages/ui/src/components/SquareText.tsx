import { H4, Square, YStack } from "tamagui";
import React from "react";

export function SquareText({text}) {
  return (
    <YStack ai="flex-start" mt="$6" ml="$6">
      <Square paddingHorizontal="$4" bc="$backgroundFocus">
        <H4 col="$background"> {text} </H4>
      </Square>
    </YStack>
  )
} 

       