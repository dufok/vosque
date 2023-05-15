import { H2, YStack } from "tamagui";
import React from "react";

export function HeaderBlock({header}) {
  return (
      <YStack ai="center" mt="$4" marginHorizontal="$4">
        <H2 tt="uppercase" ta="center">{header}</H2>
      </YStack>
  );
} 