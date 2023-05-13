import { Paragraph, YStack } from "tamagui";
import React from "react";

export function DescriptionBlock({description}) {
  return (
    <YStack ai="center" m="$6" maw={800}>
      <Paragraph ta="left" >{description}</Paragraph>
    </YStack>
  );
} 