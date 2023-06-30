import {
  Paragraph,
  YStack,
  XStack,
  Button } from 'tamagui';
import React, { useState, useEffect } from "react";

export type Content = {
  text: string;
  src: string;
};

interface ContentsBlockAudioProps {
  contents: Content[];
}

export const DopDialog: React.FC<ContentsBlockAudioProps> = ({ contents }) => {

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = (src) => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      let newAudio = new Audio(src);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup function to stop audio playing if component unmounts
      if (audio) {
        audio.pause();
      }
    }
  }, [audio]);

  return (
    <YStack ai="center" w="90%" maw={900}>
      {contents.map(({text, src}, index) => (
          <XStack key={index} style={{flexWrap: 'wrap'}}>
            <Button 
              onPress={() => togglePlay(src)}
              bc={'$borderColor'}
              w={200} h={50}
              m="$2"
              >
                <Paragraph col='$background'>{text}</Paragraph>
              </Button>
          </XStack>
        ))}
    </YStack>
  )
}