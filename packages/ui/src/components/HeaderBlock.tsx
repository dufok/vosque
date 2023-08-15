import { H2, YStack } from "tamagui";
import React from "react";

export function HeaderBlock({header}) {
  return (
      <YStack ai="center" marginVertical="$4" maw="90%">
        <H2 tt="uppercase" ta="center">{header}</H2>
      </YStack>
  );
} 