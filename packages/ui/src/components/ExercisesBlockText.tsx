import { Paragraph, YStack, XStack, H3, H4, H5 } from "tamagui";
import React from "react";
import { ParagraphCustom, ParagraphCustomGreen, ParagraphCustomMorron } from "./CustomText";

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

const renderExample = (example: string, help: string, index: number) => {
  if (example) {
    return (
      <XStack key={index}>
        <ParagraphCustomGreen text={example} />
        {help && <HelpComp texts={help} html={index} />}
      </XStack>
    )
  }
  return null;
}

export const ExercisesBlockText: React.FC<ExercisesBlockTextProps> = ({ exercises }) => {
  return (
    <YStack marginHorizontal="$6" marginVertical="$2"  ai="flex-start" w="90%" maw={900}>
      {exercises.map((exercise, index) => (
        <YStack mt="$3" key={index}>
          <Paragraph marginBottom="$2" ta="left">{exercise.text}</Paragraph>
          <YStack ml="$2">
            {renderExample(exercise.example1, exercise.help1, 1)}
            {renderExample(exercise.example2, exercise.help2, 2)}
            {renderExample(exercise.example3, exercise.help3, 3)}
            {renderExample(exercise.example4, exercise.help4, 4)}
            {renderExample(exercise.example5, exercise.help5, 5)}
            {renderExample(exercise.example6, exercise.help6, 6)}
            {renderExample(exercise.example7, exercise.help7, 7)}
            {renderExample(exercise.example8, exercise.help8, 8)}
            {renderExample(exercise.example9, exercise.help9, 9)}
            {renderExample(exercise.example10, exercise.help10, 10)}
          </YStack>
        </YStack>
      ))}
    </YStack>
  )
}