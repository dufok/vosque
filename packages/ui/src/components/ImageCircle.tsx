import { YStack, Avatar } from "tamagui";
import React from "react";

export function ImageCircle({img}) {
  return (
    <YStack ai="center" marginTop="$6">
      <Avatar circular size="$4" backgroundColor="$backgroundFocus">
        <Avatar.Image source={img} scale="50%" />
        <Avatar.Fallback backgroundColor="$backgroundFocus" />
      </Avatar>
    </YStack>
  );
} 