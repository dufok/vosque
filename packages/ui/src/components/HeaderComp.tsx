import React from 'react';
import { Paragraph, XStack, Button, YStack, isClient } from 'tamagui';
import { TextLink } from 'solito/link';
import { useClerk } from '@clerk/clerk-react';


export function HeaderComp() {

  const { session } = useClerk();
  const isSignedIn = !!session;

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
            <Paragraph
              hoverStyle={{ opacity: 0.6}}>
                Разговорники
            </Paragraph>
          </TextLink>
          <TextLink prefetch={false} href="/course">
            <Paragraph  
              hoverStyle={{ opacity: 0.6}}>
                Курсы
            </Paragraph>
          </TextLink>
        </XStack>
        <YStack mr="$5">
          <TextLink href="/">
            <img src="https://cdn.vosque.education/images/Logo.PNG?raw" alt="Vosque Logo" width="50" height="50" />
          </TextLink>
        </YStack>
        <TextLink prefetch={false} href="/userpage">
          {isSignedIn && ( <Button color="$background"  backgroundColor="$backgroundPress" space="$4" > Личный Кабинет </Button> )}
          {!isSignedIn && ( <Button color="$background"  backgroundColor="$backgroundPress" space="$4" >Регистрация</Button> )}
        </TextLink>
      </XStack>
      
  );
}