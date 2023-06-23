import { Paragraph, YStack, XStack, H3, H4, H5,  Separator } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

export type Example = {
  description: string;
    example1: string;
    prononce1: string;
    help1: string;
    example2: string;
    prononce2: string;
    help2: string;
    example3: string;
    prononce3: string;
    help3: string;
    example4: string;
    prononce4: string;
    help4: string;
    example5: string;
    prononce5: string;
    help5: string;
    example6: string;
    prononce6: string;
    help6: string;
    example7: string;
    prononce7: string;
    help7: string;
    example8: string;
    prononce8: string;
    help8: string;
    example9: string;
    prononce9: string;
    help9: string;
    example10: string;
    prononce10: string;
    help10: string;
    example11: string;
    prononce11: string;
    help11: string;
    example12: string;
    prononce12: string;
    help12: string;
    example13: string;
    prononce13: string;
    help13: string;
    example14: string;
    prononce14: string;
    help14: string;
    example15: string;
    prononce15: string;
    help15: string;
    example16: string;
    prononce16: string;
    help16: string;
    example17: string;
    prononce17: string;
    help17: string;
    example18: string;
    prononce18: string;
    help18: string;
    example19: string;
    prononce19: string;
    help19: string;
    example20: string;
    prononce20: string;
    help20: string;
    example21: string;
    prononce21: string;
    help21: string;
    example22: string;
    prononce22: string;
    help22: string;
    example23: string;
    prononce23: string;
    help23: string;
    example24: string;
    prononce24: string;
    help24: string;
    example25: string;
    prononce25: string;
    help25: string;
    example26: string;
    prononce26: string;
    help26: string;
    example27: string;
    prononce27: string;
    help27: string;
    example28: string;
    prononce28: string;
    help28: string;
    example29: string;
    prononce29: string;
    help29: string;
    example30: string;
    prononce30: string;
    help30: string;
};

interface TextExampleBlockProps {
  textExamples: Example[];
}

interface ExamplePrononce {
  example: string;
  prononce: string;
}

const extractExampleAndPrononce = (exampleObj: Example, count: number): ExamplePrononce[] => {
  let examplePrononceArray: ExamplePrononce[] = [];
  for(let i = 1; i <= count; i++) {
    examplePrononceArray.push({
      example: exampleObj[`example${i}` as keyof Example] || "",
      prononce: exampleObj[`prononce${i}` as keyof Example] || ""
    });
  }
  return examplePrononceArray;
};

export const TextExampleBlock: React.FC<TextExampleBlockProps> = ({ textExamples }) => {
  return (
    <YStack m="$6" ai="flex-start" f={1} w="90%" maw={900}>
      {textExamples.map((example, index) => {
        const examplePronouncePairs = extractExampleAndPrononce(example, 30);
        return (
          <YStack key={index} w="100%" >
            <Paragraph fontFamily="$bodyBold" ta="left" mt="$2">{example.description}</Paragraph>
            <div style={{display: 'grid', gridTemplateColumns: '50% auto'}}>
              {examplePronouncePairs.map(({example, prononce}, index) =>
                example || prononce ? (
                  <React.Fragment key={index}>
                      <div style={{textAlign: 'left'}}>
                        <YStack p="$2">
                        <ParagraphCustom text={example}/>
                        </YStack>
                      </div>
                      <div>
                        <YStack p="$2" >
                          <ParagraphCustom text={prononce}/>
                        </YStack>
                      </div>
                  </React.Fragment>
                ) : null
              )}
            </div>
          </YStack>
        );
      })}
    </YStack>
  );
};