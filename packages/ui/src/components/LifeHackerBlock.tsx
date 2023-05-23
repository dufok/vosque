import { Paragraph, YStack, Image, H3 } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

export function LifeHackerBlock({
  lifehackimage,
  lifehacktitle,
  lifehackdescription1,
  lifehackcontent1_1text,
  lifehackcontent1_2text,
  lifehackcontent1_3text,
  lifehackdescription2,
  lifehackcontent2_1text,
  lifehackcontent2_2text,
  lifehackcontent2_3text}) {

  return (
      <YStack
          ai="center"
          bw={2}
          boc="$backgroundFocus"
          bc="$background"
          br="$4" 
          m="$4"
          p="$4"
          w="$20"
          shadowColor={"$shadowColor"}
          shadowRadius={15}
          shadowOffset={{ width: 0, height: 4 }}
        >
          <Image
          src={lifehackimage}
          width={50}
          height={50}
          />
          <H3>{lifehacktitle}</H3>
          <Paragraph ta="center">{lifehackdescription1}</Paragraph>
          <Paragraph ta="center">{lifehackcontent1_1text}</Paragraph>
          <Paragraph ta="center">{lifehackcontent1_2text}</Paragraph>
          <Paragraph ta="center">{lifehackcontent1_3text}</Paragraph>
          <Paragraph ta="center">{lifehackdescription2}</Paragraph>
          <ParagraphCustom text={lifehackcontent2_1text} />
          <ParagraphCustom text={lifehackcontent2_2text} />
          <ParagraphCustom text={lifehackcontent2_3text} />
      </YStack>
  )
}