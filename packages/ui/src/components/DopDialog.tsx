import {
  Paragraph,
  YStack,
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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = (src:string) => {
    setIsPlaying(true);
    if (audio) {
      audio.src = src;
      setIsPlaying(true);
      audio.play().catch((error) => console.error(error));
    }
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
    if (typeof window !== "undefined") {
      // Audio is only available in the browser, check for window
      setAudio(new Audio());
    }
  }, []);  // Run this effect only once on mount

  return (
    <YStack ai="center" mb="$4" w="90%" maw={900}>
      {contents.map(({text, src}, index) => (
        <YStack key={index}>
          {activeIndex === index ? (
            <ToggleGroup
            orientation="horizontal"
            id="alignment"
            type="single"
            size="$5"
            m="$2"
            backgroundColor="$borderColor"
            >
              <ToggleGroup.Item 
                backgroundColor="$borderColor"
                value="left"
                aria-label="Left aligned">
                <Play color='$background' onPress={() => togglePlay(src)} />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                backgroundColor="$borderColor"
                value="center"
                aria-label="Center aligned">
                <Pause color='$background' onPress={togglePause} />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                backgroundColor="$borderColor"
                value="right"
                aria-label="Right aligned">
                <Plus color='$background' onPress={togglePlus10sec} />
              </ToggleGroup.Item>
            </ToggleGroup>
          ):(
            <Button 
              onPress={() => {
              setActiveIndex(index);
              }}
              bc={'$borderColor'}
              w={160} h={48}
              m="$2"
              >
              <Paragraph col='$background'>{text}</Paragraph>
            </Button>
          )}
        </YStack>
      ))}
    </YStack>
  )
}