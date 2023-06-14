import { Paragraph, YStack, Square } from 'tamagui';
import React from "react";

export type Test = {
  question: string;
  unswer: string[];
}

interface LangTestProps {
  tests: Test[];
  example: Test;
}

export function LangTest4({ tests, example }) {
  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        LangTest4
      </Paragraph>
      <Square w={300} h={400} bg="red" />
    </YStack>
  );
} 