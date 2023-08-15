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
    <YStack p="$2" mb="$4" f={1} w="100%" maw={900} $sm={{ marginHorizontal : "$4" }}>
      <XStack fw="wrap" jc="space-around" >
        <YStack  w="100%" $gtMd={{ width: "43%" }} maw={480}>
          <XStack ai="center" fw="wrap" >

            <YStack m="$2" >
              {firstHalf.map((word, index) => (
                <Paragraph mt="$1.5" mb="$1.5" ta="left" key={index + word.text1}>{word.text1}</Paragraph>
              ))}
            </YStack>

            <YStack m="$2" f={1}>
              {firstHalf.map((word, index) => (
                <YStack key={index + word.text1} h={18} mt="$1.5" mb="$1.5" jc="center">
                  <Separator w="50%" borderColor="$backgroundFocus" alignSelf="center"/>
                </YStack>
              ))}
            </YStack>

            <YStack m="$2" > 
              {firstHalf.map((word, index) => (
                <XStack key={index + word.text2}>
                    <Paragraph mt="$1.5" mb="$1.5" ta="left" >{word.text2}</Paragraph>
                    {word.description && <HelpComp texts={word.description} html={index} />}
                </XStack>
              ))}
            </YStack>

          </XStack>
        </YStack>

        <Separator vertical borderColor="$backgroundFocus"  marginHorizontal="$10"  $sm={{display: "none"}}/>
        
        <YStack  w="100%" $gtMd={{ width: "43%" }} maw={480}>
        <XStack ai="center" fw="wrap" >

            <YStack m="$2" >
              {secondHalf.map((word, index) => (
                <Paragraph mt="$1.5" mb="$1.5" ta="left" key={index + word.text1}>{word.text1}</Paragraph>
              ))}
            </YStack>

            <YStack m="$2" f={1}>
              {secondHalf.map((word, index) => (
                <YStack h={18} mt="$1.5" mb="$1.5" key={index + word.text1} jc="center">
                  <Separator w="50%" borderColor="$backgroundFocus" alignSelf="center"/>
                </YStack>
              ))}
            </YStack>

            <YStack m="$2">
              {secondHalf.map((word, index) => (
                <XStack key={index + word.text2}>
                  <Paragraph mt="$1.5" mb="$1.5" ta="left" >{word.text2}</Paragraph>
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