import {
  Paragraph,
  YStack,
  Button,
  Image,
  H2,
  H3,
  H4,
  XStack
} from "@my/ui";
import React from "react";
import { useLink } from "solito/link";

import { HeaderComp } from '@my/ui/src/components/HeaderComp';
import { SubMenu} from '@my/ui/src/components/SubMenu';


export function phrasebookScreen() {
  const userpageLinkProps = useLink({href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
 

  return (
    <YStack>
      <HeaderComp />
      <WelcomeBlock />
      <ContentBlock />
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 

export function WelcomeBlock(){
  return(
      <YStack mt="$10" paddingVertical="$10" ai="center" bc="$backgroundFocus" >
          <Image mt={30} src={{uri: 'https://cdn.vosque.education/images/img-home-phrasebook.png?raw', width: 26, height: 63}}
          height="$8"
          width="$8"
          scale="80%"
          />
          <H2 tt="uppercase" col="$background">разговорники</H2>
          {/*<H5 fontWeight="bold" mt={50}>что это такое ?</H5>*/}
          <Paragraph col="$background" mt="$8" ta="center" maw={800} paddingHorizontal="$8"> Мы подготовили для Вас разговорники по темам, с помощью которых Вы сможете быстро овладеть полезными словами и выражениями для знакомств, работы и повседневного общения. Каждый разговорник представляет собой удобный и компактный способ изучения лексики. PDF-документ удобен в использовании на телефоне и содержит наиболее часто используемые фразы и слова, которые помогут вам в быстром и эффективном общении.
          </Paragraph>
      </YStack>
  )
}

export function ContentBlock(){
  return(
    <YStack ai="center">
      <YStack marginVertical="$10" w='100%' maw={800}>
        <H3 tt="uppercase" ta="center"> купить</H3>
        <XStack fw="wrap" jc="center">
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {}}>
            <H4 tt="uppercase"  col="$background">tinder</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {}}>
            <H4 tt="uppercase"  col="$background">grinder</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {}}>
            <H4 tt="uppercase"  col="$background">restaurante</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {}}>
            <H4 tt="uppercase"  col="$background">migraciones</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {}}>
            <H4 tt="uppercase"  col="$background">palabras <br/> malas</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {}}>
            <H4 tt="uppercase"  col="$background">otros</H4>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}


