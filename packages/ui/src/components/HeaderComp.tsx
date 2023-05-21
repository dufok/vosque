import React from 'react';
import { Paragraph, XStack, Button, YStack, isClient } from 'tamagui';    
import { useLink } from "solito/link";
import { TextLink } from 'solito/link';

export function Header() {
  const userpageLinkProps = useLink({ href: "/userpage"});

  return (
    <XStack
      ai="center"
      tag="header"
      jc="space-between"
      backgroundColor="$background"
      pos="absolute"
      top={0}
      left={0}
      right={0}
      bbc="$borderColor"
      zi={50000}
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
        <Button color="$background" backgroundColor="$backgroundPress" {...userpageLinkProps} space="$4" >Регистрация</Button>
      </XStack>
      
  );
}