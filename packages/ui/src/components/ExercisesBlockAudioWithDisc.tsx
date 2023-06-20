import { Paragraph, YStack, XStack, H3 } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

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
    <YStack m="$6" ai="flex-start" w="90%" maw={900}>
      <YStack>
      {exercises.map(({description, text, audio}, index) => (
        <XStack  key={index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <YStack marginVertical="$4" style={{flex: 1}}> 
            <H3 mb="$2" ta="left" >{description}</H3>
            <ParagraphCustom text={text}/>
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