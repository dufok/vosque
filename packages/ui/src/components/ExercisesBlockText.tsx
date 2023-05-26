import { Paragraph, YStack, H3, H4 } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

export type Exercise = {
  text: string;
  example: string;
};

interface ExercisesBlockTextProps {
  exercises: Exercise[];
}

export const ExercisesBlockText: React.FC<ExercisesBlockTextProps> = ({ exercises }) => {
  return (
      <YStack m="$6" ai="flex-start" maw={800}>
        {exercises.map(({ text, example }, index) => (
          <YStack mt="$2" key={index}>
            <H4 ta="left">{text}</H4>
            <ParagraphCustom text={example} />
          </YStack>
        ))}
      </YStack>
  )
}