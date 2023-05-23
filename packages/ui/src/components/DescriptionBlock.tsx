import { Paragraph, YStack } from "tamagui";
import React from "react";

export function DescriptionBlock({description}) {
  return (
    <YStack ai="flex-start" w="100%" p="$6" maw={1000}>
      <Paragraph ta="left" >{description}</Paragraph>
    </YStack>
  );
} 