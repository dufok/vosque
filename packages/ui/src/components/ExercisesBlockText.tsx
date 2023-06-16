import { Paragraph, YStack, H3, H4, H5 } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

export type Exercise = {
  text: string;
  example1: string;
  example2: string;
  example3: string;
  example4: string;
  example5: string;
  example6: string;
  example7: string;
  example8: string;
  example9: string;
  example10: string;
};

interface ExercisesBlockTextProps {
  exercises: Exercise[];
}

export const ExercisesBlockText: React.FC<ExercisesBlockTextProps> = ({ exercises }) => {
  return (
    <YStack ai="flex-start" w="100%" paddingHorizontal="$6" paddingVertical="$4" maw={1000}>
      {exercises.map((exercise, index) => (
        <YStack mt="$3" key={index}>
          <Paragraph fontSize={20} marginBottom="$2" ta="left">{exercise.text}</Paragraph>
          <YStack ml="$2">
            <ParagraphCustom text={exercise.example1} />
            <ParagraphCustom text={exercise.example2} />
            <ParagraphCustom text={exercise.example3} />
            <ParagraphCustom text={exercise.example4} />
            <ParagraphCustom text={exercise.example5} />
            <ParagraphCustom text={exercise.example6} />
            <ParagraphCustom text={exercise.example7} />
            <ParagraphCustom text={exercise.example8} />
            <ParagraphCustom text={exercise.example9} />
            <ParagraphCustom text={exercise.example10} />
          </YStack>
        </YStack>
      ))}
    </YStack>
  )
}