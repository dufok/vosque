import { YStack, Avatar } from "tamagui";
import React from "react";

export function ImageCircle({img}) {
  return (
    <YStack ai="center" mt="$6" >
      <Avatar circular size="$4" backgroundColor="$backgroundFocus">
        <Avatar.Image src={img} scale="50%" />
        <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
      </Avatar>
    </YStack>
  );
} 