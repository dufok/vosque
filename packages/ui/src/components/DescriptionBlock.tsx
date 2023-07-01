import { Paragraph, YStack } from "tamagui";
import React from "react";

export function DescriptionBlock({description}) {
  return (
    <YStack marginHorizontal="$6" mb="$2" ai="flex-start" w="90%" maw={900}>
      <Paragraph ta="left" dangerouslySetInnerHTML={{ __html: description ? description.replace(/\n/g, "<br />") : '' }} />
    </YStack>
  );
} 