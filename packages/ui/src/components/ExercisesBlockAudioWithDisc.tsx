import { Paragraph, YStack, XStack, H3 } from "tamagui";
import React from "react";

import { AudioPlayer } from "./AudioPlayer";

export type Exercise = {
  description: string;
  text: string;
  audio: string
};

interface ExercisesBlockAudioWithDiscProps {
  exercises: Exercise[];
}

 export const ExercisesBlockAudioWithDisc: React.FC<ExercisesBlockAudioWithDiscProps> = ({ exercises }) => {
  return (
    <YStack m="$6" ai="flex-start" maw={800}>
      <YStack>
      {exercises.map(({description, text, audio}, index) => (
        <XStack  key={index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <YStack m="$1 style={{flex: 1}}"> 
            <H3 ta="left" >{description}</H3>
            <Paragraph ta="left" >{text}</Paragraph>
          </YStack>
          <YStack ai="center" style={{flex: 1}}>
            <AudioPlayer src={audio}/>
          </YStack>
        </XStack>
          ))}
      </YStack>
    </YStack>
  )
}