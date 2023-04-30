import { Paragraph, YStack, Image, H5, H2, Button } from "@my/ui";
import React from "react";

export function PhraseBooks({phasebookLinkProps: {href}}){
  return(
      <YStack ai="center" bc="$backgroundFocus" >
          <Image mt={30} src={{uri: 'https://cdn.vosque.education/images/img-home-phrasebook.png?raw', width: 34, height: 67}}
          height="$8"
          width="$6"
          />
          <H2 tt="uppercase" col="$background">разговорники</H2>
          <H5 fontWeight="bold" mt={50}>что это такое ?</H5>
          <Paragraph> Мы пока что сами не знаем, все еще в разработке.</Paragraph>
          <YStack p={35}>
              <Button
                mt={50} href={href}
                br={9} bw="$1" boc="$background"
                bc="$backgroundFocus">
                  СМОТРЕТЬ ВСЕ
              </Button>
          </YStack> 
      </YStack>
  )
}