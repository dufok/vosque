import { H4, H5, Paragraph, YStack, XStack, Separator } from "tamagui";
import React from "react";

import { HelpComp } from "@my/ui/src/components/HelpComp";



export function WordToTranslateBlock({ words }) {

  if (!Array.isArray(words)) {
    console.error('words must be an array, but got', typeof words);
    return null; // Or return a default value or throw an error, as appropriate for your use case
  }

  const midIndex = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, midIndex);
  const secondHalf = words.slice(midIndex);

  return (
    <YStack m="$6" p="$6" f={1} w="100%" maw={1000}>
      <XStack fw="wrap" jc="space-around" >
        <YStack maw={350} w="100%" $gtSm={{ width: "40%" }}>
          <XStack ai="center" fw="wrap" >
            <YStack m="$2" >
              {firstHalf.map((word, index) => (
                <Paragraph mt="$1.5" mb="$1.5" ta="left" key={index}>{word.text1}</Paragraph>
              ))}
            </YStack>
            <YStack m="$2" f={1}>
              {firstHalf.map((word, index) => (
                <YStack h={22} mt="$1.5" mb="$1.5" key={index} jc="center">
                  <Separator w="50%" borderColor="$backgroundFocus" key={index} alignSelf="center"/>
                </YStack>
              ))}
            </YStack>
            <YStack m="$2" > 
              {firstHalf.map((word, index) => (
                <XStack >
                    <Paragraph mt="$1.5" mb="$1.5" ta="left" key={index} >{word.text2}</Paragraph>
                    {word.description && <HelpComp texts={word.description} html={index} />}
                </XStack>
              ))}
            </YStack>
          </XStack>
        </YStack>
        <Separator vertical borderColor="$backgroundFocus"  marginHorizontal="$10"  $sm={{display: "none"}}/>
        <YStack maw={350}  w="100%" $gtSm={{ width: "40%" }}>
        <XStack ai="center" fw="wrap" >
            <YStack m="$2" >
              {secondHalf.map((word, index) => (
                <Paragraph mt="$1.5" mb="$1.5" ta="left" key={index}>{word.text1}</Paragraph>
              ))}
            </YStack>
            <YStack m="$2" f={1}>
              {secondHalf.map((word, index) => (
                <YStack h={22} mt="$1.5" mb="$1.5" key={index} jc="center">
                  <Separator w="50%" borderColor="$backgroundFocus" key={index} alignSelf="center"/>
                </YStack>
              ))}
            </YStack>
            <YStack m="$2">
              {secondHalf.map((word, index) => (
                <XStack >
                  <Paragraph mt="$1.5" mb="$1.5" ta="left" key={index} >{word.text2}</Paragraph>
                  {word.description && <HelpComp texts={word.description} html={index} />}
                </XStack>
              ))}
            </YStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}