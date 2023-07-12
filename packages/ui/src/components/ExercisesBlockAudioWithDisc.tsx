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
    <YStack marginHorizontal="$6" ai="flex-start" width="90%" maw={900} mb="$4">
      <YStack>
      {exercises.map(({description, text, audio}, index) => (
        <XStack  key={index} w="100%" f={1}>
          <YStack ai="flex-start" jc="center" mr="$2">
            <AudioPlayer src={audio}/>
          </YStack>
          <YStack marginVertical="$4" mr="$2" f={0.8}> 
            <Paragraph fontFamily="$bodyBold" mb="$2" ta="left" >{description}</Paragraph>
            <ParagraphCustom text={text}/>
          </YStack>
        </XStack>
          ))}
      </YStack>
    </YStack>
  )
}