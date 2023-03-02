import { Paragraph, XStack } from "tamagui";
import React from "react";

export function header() {
  return (
    <XStack
      f={1}
      as="header"
      position="absolute"
      top='0'
      py='2'
      px='4'
      boxShadow='0 0 4px rgba(0, 0, 0, 0.2)'
    >
      <nav>
        <text>Home</text>
        <text>About</text>
        <text>Contact</text>
      </nav>
    </XStack>
  );
} 