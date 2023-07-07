import {
  Paragraph,
  YStack,
  XStack,
  Button,
  ToggleGroup
  } from 'tamagui';
import React, { useState, useEffect } from "react";
import { Play, Pause, Plus } from '@tamagui/lucide-icons';

export type Content = {
  text: string;
  src: string;
};

interface ContentsBlockAudioProps {
  contents: Content[];
}

export const DopDialog: React.FC<ContentsBlockAudioProps> = ({ contents }) => {

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState(new Audio());

  const togglePlay = (src:string) => {
    setAudio(new Audio(src));
    setIsPlaying(true);
  };

  const togglePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const togglePlus10sec = () => {
    if (audio) {
      audio.currentTime += 10;
    }
  };

  useEffect(() => {
    if (isPlaying && audio) {
      audio.play();
    }
  }, [isPlaying, audio]);


  return (
    <YStack ai="center" mb="$4" w="90%" maw={900}>
      {contents.map(({text, src}, index) => (
        <XStack key={index} style={{flexWrap: 'wrap'}}>
          {activeIndex === index ? (
            <ToggleGroup
            orientation="horizontal"
            id="alignment"
            type="single"
            w={200} h={50}
            >
              <ToggleGroup.Item value="left" aria-label="Left aligned">
                <Play onPress={() => togglePlay(src)} />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="center" aria-label="Center aligned">
                <Pause onPress={togglePause} />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="right" aria-label="Right aligned">
                <Plus onPress={togglePlus10sec} />
              </ToggleGroup.Item>
            </ToggleGroup>
          ):(
            <Button 
            onPress={() => togglePlay(src)}
            bc={'$borderColor'}
            w={200} h={50}
            m="$2"
            >
              <Paragraph col='$background'>{text}</Paragraph>
            </Button>
          )}
        </XStack>
      ))}
    </YStack>
  )
}

