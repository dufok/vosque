import { Paragraph, YStack, XStack, H3, H4, H5,  Separator } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";
import { HelpComp } from "@my/ui/src/components/HelpComp";

type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;

export type Example = {
  description: string;
} & {
  [K in `example${NumberRange}` as K | `prononce${NumberRange}` | `help${NumberRange}`]: string;
};

interface TextExampleBlockProps {
  textExamples: Example[];
}

interface ExamplePrononce {
  example: string;
  prononce: string;
  help: string;
}

const extractExampleAndPrononce = (exampleObj: Example, count: number): ExamplePrononce[] => {
  let examplePrononceArray: ExamplePrononce[] = [];
  for(let i = 1; i <= count; i++) {
    examplePrononceArray.push({
      example: exampleObj[`example${i}` as keyof Example] || "",
      prononce: exampleObj[`prononce${i}` as keyof Example] || "",
      help: exampleObj[`help${i}` as keyof Example] || ""
    });
  }
  return examplePrononceArray;
};

export const TextExampleBlock: React.FC<TextExampleBlockProps> = ({ textExamples }) => {
  return (
    <YStack marginHorizontal="$6" mb="$4" ai="flex-start" f={1} w="90%" maw={900}>
      {textExamples.map((example, index) => {
        const examplePronouncePairs = extractExampleAndPrononce(example, 30);
        return (
          <YStack key={index} w="100%">
            <Paragraph fontFamily="$bodyBold" ta="left" mt="$2">{example.description}</Paragraph>
            <YStack style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {examplePronouncePairs.map(({example, prononce, help}, index) =>
                example || prononce ? (
                  <React.Fragment key={index}>
                    <YStack p="$2" style={{width: '50%', textAlign: 'left'}}>
                      <XStack>
                        <ParagraphCustom text={example} />
                        {help && <HelpComp texts={help} html={index} />}
                      </XStack>
                    </YStack>
                    <YStack p="$2">
                      <ParagraphCustom text={prononce}/>
                    </YStack>
                  </React.Fragment>
                ) : null )}
            </YStack>
          </YStack>
        );
      })}
    </YStack>
  );
};
