import { Paragraph, YStack, Image, H5, H2, Button } from "tamagui";
import React from "react";

export function PhraseBooks({phasebookLinkProps}){
  return(
      <YStack ai="center" bc="$backgroundFocus" >
          <Image mt={30} src={{uri: 'https://cdn.vosque.education/images/img-home-phrasebook.png?raw', width: 26, height: 63}}
          height="$8"
          width="$8"
          scale="80%"
          />
          <H2 tt="uppercase" col="$background">разговорники</H2>
          {/*<H5 fontWeight="bold" mt={50}>что это такое ?</H5>*/}
          <Paragraph col="$background" mt="$8" ta="center" maw={800} paddingHorizontal="$8"> Мы подготовили для Вас разговорники по темам, с помощью которых Вы сможете быстро овладеть полезными словами и выражениями для знакомств, работы и повседневного общения. Каждый разговорник представляет собой удобный и компактный способ изучения лексики. PDF-документ удобен в использовании на телефоне и содержит наиболее часто используемые фразы и слова, которые помогут вам в быстром и эффективном общении.
          </Paragraph>
          <YStack p={35}>
              <Button
                mt={50}
                {...phasebookLinkProps}
                color="$background"
                br={9} bw="$1" boc="$background"
                bc='none'>
                  СМОТРЕТЬ ВСЕ
              </Button>
          </YStack> 
      </YStack>
  )
}