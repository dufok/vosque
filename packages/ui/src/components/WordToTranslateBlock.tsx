import { Paragraph, YStack, XStack, Separator } from "tamagui";
import React from "react";

export function WordToTranslateBlock({ words }) {
  const midIndex = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, midIndex);
  const secondHalf = words.slice(midIndex);

  return (
    <YStack m="$6" >
      <XStack>
        <YStack>
          {firstHalf.map((word, index) => (
            <YStack key={index}>
              <XStack>
                <Paragraph ta="left">{word.text1}</Paragraph>
                <Separator />
                <Paragraph ta="right">{word.text2}</Paragraph>
              </XStack>
              <Paragraph ta="center">{word.description ?? []}</Paragraph>
            </YStack>
          ))}
        </YStack>
        <Separator vertical />
        <YStack>
          {secondHalf.map((word, index) => (
            <YStack key={index}>
              <XStack>
                <Paragraph ta="left">{word.text1}</Paragraph>
                <Separator />
                <Paragraph ta="right">{word.text2}</Paragraph>
              </XStack>
              <Paragraph ta="center">{word.description ?? []}</Paragraph>
            </YStack>
          ))}
        </YStack>
      </XStack>
    </YStack>
  );
}