import { Paragraph, YStack, XStack, H3, H4, H5 } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

import { HelpComp } from "@my/ui/src/components/HelpComp";

export type Exercise = {
  text: string;
  example1: string;
  help1: string;
  example2: string;
  help2: string;
  example3: string;
  help3: string;
  example4: string;
  help4: string;
  example5: string;
  help5: string;
  example6: string;
  help6: string;
  example7: string;
  help7: string;
  example8: string;
  help8: string;
  example9: string;
  help9: string;
  example10: string;
  help10: string;
};

interface ExercisesBlockTextProps {
  exercises: Exercise[];
}

export const ExercisesBlockText: React.FC<ExercisesBlockTextProps> = ({ exercises }) => {
  return (
    <YStack m="$6" ai="flex-start" w="90%" maw={900}>
      {exercises.map((exercise, index) => (
        <YStack mt="$3" key={index}>
          <Paragraph marginBottom="$2" ta="left">{exercise.text}</Paragraph>
          <YStack ml="$2">
            {exercise.example1 && 
              <XStack>
                <ParagraphCustom text={exercise.example1} />
                {exercise.help1 && <HelpComp texts={exercise.help1} html={index} />}
              </XStack>
            }
            {exercise.example2 &&
              <XStack>
                <ParagraphCustom text={exercise.example2} />
                {exercise.help2 && <HelpComp texts={exercise.help2} html={index} />}
              </XStack>
            }
            {exercise.example3 &&
              <XStack>
                <ParagraphCustom text={exercise.example3} />
                {exercise.help3 && <HelpComp texts={exercise.help3} html={index} />}
              </XStack>
            }
            {exercise.example4 &&
              <XStack>
                <ParagraphCustom text={exercise.example4} />
                {exercise.help4 && <HelpComp texts={exercise.help4} html={index} />}
              </XStack>
            }
            {exercise.example5 &&
              <XStack>
                <ParagraphCustom text={exercise.example5} />
                {exercise.help5 && <HelpComp texts={exercise.help5} html={index} />}
              </XStack>
            }
            {exercise.example6 &&
              <XStack>
                <ParagraphCustom text={exercise.example6} />
                {exercise.help6 && <HelpComp texts={exercise.help6} html={index} />}
              </XStack>
            }
            {exercise.example7 &&
              <XStack>
                <ParagraphCustom text={exercise.example7} />
                {exercise.help7 && <HelpComp texts={exercise.help7} html={index} />}
              </XStack>
            }
            {exercise.example8 &&
              <XStack>
                <ParagraphCustom text={exercise.example8} />
                {exercise.help8 && <HelpComp texts={exercise.help8} html={index} />}
              </XStack>
            }
            {exercise.example9 &&
              <XStack>
                <ParagraphCustom text={exercise.example9} />
                {exercise.help9 && <HelpComp texts={exercise.help9} html={index} />}
              </XStack>
            }
            {exercise.example10 &&
              <XStack>
                <ParagraphCustom text={exercise.example10} />
                {exercise.help10 && <HelpComp texts={exercise.help10} html={index} />}
              </XStack>
            }
          </YStack>
        </YStack>
      ))}
    </YStack>
  )
}