import { H4, Paragraph, YStack, XStack, Separator } from "tamagui";
import React from "react";

export function WordToTranslateBlock({ words }) {

  if (!Array.isArray(words)) {
    console.error('words must be an array, but got', typeof words);
    return null; // Or return a default value or throw an error, as appropriate for your use case
  }

  const midIndex = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, midIndex);
  const secondHalf = words.slice(midIndex);

  return (
    <YStack m="$6" f={1}>
      <XStack fw="wrap" jc="space-around">
        <YStack f={0.5} maw={300}>
          {firstHalf.map((word, index) => (
            <YStack f={0.5} key={index} m="$2">
              <XStack>
                <H4 ta="left">{word.text1}</H4>
                <Separator m="$2" alignSelf="center"/>
                <H4 ta="right">{word.text2}</H4>
              </XStack>
              <Paragraph f={0.7} ta="center">{word.description ?? []}</Paragraph>
            </YStack>
          ))}
        </YStack>
        <YStack f={0.5} maw={300}>
          {secondHalf.map((word, index) => (
            <YStack key={index} f={0.5} m="$2">
              <XStack>
                <H4 ta="left">{word.text1}</H4>
                <Separator m="$2" alignSelf="center"/>
                <H4 ta="right">{word.text2}</H4>
              </XStack>
              <Paragraph f={0.7} ta="center">{word.description ?? []}</Paragraph>
            </YStack>
          ))}
        </YStack>
      </XStack>
    </YStack>
  );
}