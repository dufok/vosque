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
import React, { useState } from "react";
import { useLink } from "solito/link";
import { Banana } from '@tamagui/lucide-icons'
import { HeaderComp } from '@my/ui/src/components/HeaderComp';
import { ToastComp } from "@my/ui/src/components/ToastComp";
import { SubMenu} from '@my/ui/src/components/SubMenu';


export function phrasebookScreen() {
  const userpageLinkProps = useLink({href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
 

  return (
    <YStack f={1} jc="space-between">
      <YStack>
        <HeaderComp />
        <WelcomeBlock />
        <ContentBlock />
      </YStack>
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 

export function WelcomeBlock(){
  return(
      <YStack mt="$10" paddingVertical="$10" ai="center" bc="$backgroundFocus" >
          <H2 tt="uppercase" col="$background">разговорники</H2>
          {/*<H5 fontWeight="bold" mt={50}>что это такое ?</H5>*/}
          <Paragraph col="$background" mt="$8" ta="center" maw={800} paddingHorizontal="$8"> Мы подготовили для Вас разговорники по темам, с помощью которых Вы сможете быстро овладеть полезными словами и выражениями для знакомств, работы и повседневного общения. Каждый разговорник представляет собой удобный и компактный способ изучения лексики. PDF-документ удобен в использовании на телефоне и содержит наиболее часто используемые фразы и слова, которые помогут вам в быстром и эффективном общении.
          </Paragraph>
      </YStack>
  )
}

export function ContentBlock(){
  // This is for Toast
  const [list, setList] = useState<any[]>([]);
  const showToast = (type) => {

    let toastProperties;
    switch (type) {
      case "no_info":
        toastProperties = {
          id: 1,
          title: "Ой! Скоро обновим!",
          description: "Этот раздел сайта в работе (^.^')",
          backgroundColor: "#5cb85c",
          icon: Banana,
        };
        break;      
      default:
        setList([]);
        break
    }
    setList([...list, toastProperties]);
  };
  return(
    <YStack ai="center">
      <ToastComp 
          toastList={list}
          position="bottom-center"
          autoDelete={true}
          autoDeleteTime={3000}
          />
      <YStack marginVertical="$10" w='100%' maw={800}>
        <H3 tt="uppercase" ta="center"> купить</H3>
        <XStack fw="wrap" jc="center">
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {showToast("no_info")}}>
            <H4 tt="uppercase"  col="$background">tinder</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {showToast("no_info")}}>
            <H4 tt="uppercase"  col="$background">grinder</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {showToast("no_info")}}>
            <H4 tt="uppercase"  col="$background">restaurante</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {showToast("no_info")}}>
            <H4 tt="uppercase"  col="$background">migraciones</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {showToast("no_info")}}>
            <H4 tt="uppercase"  col="$background">palabras <br/> malas</H4>
          </Button>
          <Button w={200} h={50} m="$5" bc="$backgroundPress" onPress={() => {showToast("no_info")}}>
            <H4 tt="uppercase"  col="$background">otros</H4>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}


