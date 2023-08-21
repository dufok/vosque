import { Spinner, YStack } from "tamagui";
import React from "react";

export function SpinnerOver() {
  return (
    <YStack 
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      style={{
      position: 'fixed', // Use fixed position
      backgroundColor: 'rgba( 255, 255, 255, 0.25 )', // Semi-transparent background
      zIndex: 1000, // High z-index to overlay everything
    }}>
      <Spinner size="large" color="$backgroundFocus" />
    </YStack>
  );
} 