import { YStack, Paragraph, XStack } from "tamagui";
import React from "react";

import {AudioPlayer} from "./AudioPlayer";
import { ParagraphCustom } from "./CustomText";

export type Exercise = {
  text: string;
  audio: string;
};

interface ExercisesBlockAudioProps {
  exercises: Exercise[];
}

export const ExercisesBlockAudio: React.FC<ExercisesBlockAudioProps> = ({ exercises }) => {
  return (
    <YStack m="$6" ai="flex-start" maw={800}>
     {exercises.map(({text, audio}, index) => (
        <XStack  key={index}>
          <YStack>
            <ParagraphCustom text={text} />
          </YStack>
          <YStack>
            <AudioPlayer src={audio}/>
          </YStack>
        </XStack>
      ))}
    </YStack>
  )
}