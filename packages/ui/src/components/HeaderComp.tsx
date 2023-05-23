import React from 'react';
import { Paragraph, XStack, Button, YStack, isClient } from 'tamagui';
import { TextLink } from 'solito/link';

export function HeaderComp() {

  return (
    <XStack
      ai="center"
      //tag="header"
      jc="space-between"
      backgroundColor="$background"
      //@ts-ignore
      pos="fixed"
      top={0}
      left={0}
      right={0}
      zi={50}
      opacity={0.95}
      paddingVertical="$2"
      paddingHorizontal="$6"
      elevation={2}
      >
        <XStack space="$4" $sm={{display: "none"}} >
          <TextLink prefetch={false} href="/phrasebook">
            <Paragraph >Разговорники</Paragraph>
          </TextLink>
          <TextLink prefetch={false} href="/course">
            <Paragraph >Курсы</Paragraph>
          </TextLink>
        </XStack>
        <TextLink href="/">
          <img src="https://cdn.vosque.education/images/Logo.PNG?raw" alt="Vosque Logo" width="50" height="50" />
        </TextLink>
        <TextLink prefetch={false} href="/userpage">
          <Button color="$background"  backgroundColor="$backgroundPress" space="$4" >Регистрация</Button>
        </TextLink>
      </XStack>
      
  );
}