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
    <YStack m="$6" ai="flex-start" w="90%" maw={900}>
      <YStack>
        {exercises.map(({text, audio}, index) => (
            <XStack key={index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <YStack marginVertical="$4" style={{flex: 1}}>
                <H3Custom text={text} />
              </YStack>
              <YStack ai="flex-start" jc="center">
                <AudioPlayer src={audio}/>
              </YStack>
            </XStack>
          ))}
      </YStack>
    </YStack>
  )
}