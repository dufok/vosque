import { Paragraph, YStack, H3 } from "tamagui";
import React from "react";

export function WelcomeBlock({name, description}) {
  return (
    <YStack mt="$6" mb="$4">
        <H3 tt="uppercase" ta="center">{name}</H3>
        <Paragraph p="$2" ta="center">{description}</Paragraph>
    </YStack>
  );
}
