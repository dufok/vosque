import { Paragraph, YStack, XStack, H3 } from "tamagui";
import React from "react";

export type Example = {
  description: string;
  example1: string;
  example2: string;
  example3: string;
  example4: string;
  prononce1: string;
  prononce2: string;
  prononce3: string;
  prononce4: string;
};

interface TextExampleBlockProps {
  textExamples: Example[];
}

export const TextExampleBlock: React.FC<TextExampleBlockProps> = ({ textExamples }) => {
  return (
    <YStack ai="flex-start" m="$6">
      {textExamples.map(({description, example1, example2, example3, example4, prononce1, prononce2, prononce3,  prononce4}, index) => (
        <YStack  key={index}>
          <H3 ta="left" >{description}</H3>
            <YStack ml="$10">
              <XStack>
                <YStack>
                  <Paragraph ta="left" >{example1 || ""}</Paragraph>
                  <Paragraph ta="left" >{example2 || ""}</Paragraph>
                  <Paragraph ta="left" >{example3 || ""}</Paragraph>
                  <Paragraph ta="left" >{example4 || ""}</Paragraph>
                </YStack>
                <YStack>
                  <Paragraph ta="left" >{prononce1 || ""}</Paragraph>
                  <Paragraph ta="left" >{prononce2 || ""}</Paragraph>
                  <Paragraph ta="left" >{prononce3 || ""}</Paragraph>
                  <Paragraph ta="left" >{prononce4 || ""}</Paragraph>
                </YStack>
              </XStack>
            </YStack>
        </YStack>
      ))}
    </YStack>
  )
}