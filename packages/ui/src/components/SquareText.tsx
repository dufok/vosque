import { H4, Square, YStack } from "tamagui";
import React from "react";

export function SquareText({text}) {
  return (
      <YStack alignSelf="flex-start" mt="$6" ml="$6" maw={1000}>
        <Square paddingHorizontal="$4" bc="$backgroundFocus">
          <H4 col="$background"> {text} </H4>
        </Square>
      </YStack>
    )
} 

       