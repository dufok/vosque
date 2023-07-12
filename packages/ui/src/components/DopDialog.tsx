import { YStack, XStack, Paragraph, Progress, Button } from "tamagui";
import React, { useState, useEffect } from "react";
import { Play, Pause } from '@tamagui/lucide-icons';

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  let minutesStr = minutes.toString().padStart(2, '0');
  let secondsStr = secs.toString().padStart(2, '0');
  return `${minutesStr}:${secondsStr}`;
}


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
        <PlayerDop key={index} src={content.src} />
      ))}
    </YStack>
  );
};

function PlayerDop({src}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audio = new Audio(src);

  audio.onloadedmetadata = () => {
    audio.ontimeupdate = () => {
      setProgress((audio.currentTime/audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    };
  }

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <YStack m="$1" jc="center" ai="center">
      <Button
        icon={isPlaying ? Pause : Play}
        onPress={togglePlay}
        boc={"$backgroundFocus"}
      />
      <XStack>
        <Progress value={progress} f={0.2}>
          <Progress.Indicator animation="bouncy" backgroundColor="$borderColor" f={0.5} />
        </Progress>
        <Paragraph color="$background" f={0.3}>
          {formatTime(currentTime)}
        </Paragraph>
      </XStack>
    </YStack>
  );
} 
