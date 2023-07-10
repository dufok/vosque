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
    <YStack marginHorizontal="$6" ai="flex-start" w="90%" maw={900} mb="$4">
      <YStack>
        {exercises.map(({text, audio}, index) => (
            <XStack key={index} fw="wrap" w="100%" f={1}>
              <YStack marginVertical="$4" f={0.6}>
                <H3Custom text={text} />
              </YStack>
              <YStack paddingHorizontal="$3" ai="flex-start" jc="center" f={0.4}>
                <AudioPlayer src={audio}/>
              </YStack>
            </XStack>
          ))}
      </YStack>
    </YStack>
  )
}