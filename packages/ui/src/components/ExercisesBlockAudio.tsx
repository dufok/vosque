import { YStack, Paragraph, XStack } from "tamagui";
import React from "react";

import {AudioPlayer} from "./AudioPlayer";
import { H3Custom } from "./CustomText";

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
          <YStack m="$3" f={1}>
            <H3Custom text={text} />
          </YStack>
          <YStack ai="flex-start" jc="center">
            <AudioPlayer src={audio}/>
          </YStack>
        </XStack>
      ))}
    </YStack>
  )
}