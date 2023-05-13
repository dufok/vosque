import { Paragraph, YStack, H3 } from "tamagui";
import React from "react";

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
          <YStack key={index}>
            <H3 ta="left">{text}</H3>
            <Paragraph ta="left">{example}</Paragraph>
          </YStack>
        ))}
      </YStack>
  )
}