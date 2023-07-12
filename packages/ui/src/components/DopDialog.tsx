import {
  Paragraph,
  YStack,
  XStack,
  Progress
  } from 'tamagui';
import React, { useState, useEffect } from "react";
import { Play, Pause, Plus } from '@tamagui/lucide-icons';
const Audio = require('react-native').Audio; // Requiring once, instead of inside the component

export type Content = {
  text: string;
  src: string;
};

interface ContentsBlockAudioProps {
  contents: { [key: string]: Content };
}

export const DopDialog: React.FC<ContentsBlockAudioProps> = ({ contents }) => {
  const contentsArray = Object.values(contents);

  return (
    <YStack ai="center" mb="$4" w="90%" maw={900}>
      {contentsArray.map((content, index) => (
        <AudioPlayer key={index} src={content.src} />
      ))}
    </YStack>
  );
};

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(src));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [audio]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const progress = (currentTime / duration) * 100;

  return (
    <YStack
      maw={300}
      br="$1"
      boc="$backgroundFocus"
      h={20}
      f={1}
    >
      <XStack>
        {isPlaying ? (
          <Pause onPress={togglePlay} color="$background" size="$1" />
        ) : (
          <Play color="$background" onPress={togglePlay} size="$1" />
        )}
        <Progress value={progress} f={0.2}>
          <Progress.Indicator animation="bouncy" backgroundColor="$borderColor" f={0.5} />
        </Progress>
        <Paragraph color="$background" f={0.3}>
          {formatTime(currentTime)}
        </Paragraph>
      </XStack>
    </YStack>
  );
};

// Helper function to format time in seconds into MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
