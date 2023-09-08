import { YStack, Button } from "tamagui";
import React, { useState , useEffect } from "react";
import { Play, Pause } from '@tamagui/lucide-icons';

export function AudioPlayer({src}) {

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audio, setAudio] = useState(new Audio(src));

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  // hook  for restart audio if remount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // This will reset the audio to the beginning
      }
    }
  }, [audio]); 


  return (
    <YStack m="$1" jc="center" ai="center">
      <Button
        icon={isPlaying ? Pause : Play}
        onPress={togglePlay}
        boc={"$backgroundFocus"}/>
    </YStack>
  );
} 