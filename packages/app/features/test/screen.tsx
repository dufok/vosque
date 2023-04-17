import React from "react";
import { YStack, XStack, H1, Paragraph, Button } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';

export function testScreen() {
  
  return (
  <YStack f={1} ai="center" miw={400} space="$6">
    < Header />
  </YStack>
  );
}

