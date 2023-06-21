import { Paragraph, YStack, Image, Avatar, H3, H5, H4, Separator } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

type Texts = {
  text: string;
}

interface LifeHackerBlockProps {
  lifehacktitle: string;
  descriptions: string[];
  contents: { [key: string]: Texts }[];
}

export const LifeHackerBlock: React.FC<LifeHackerBlockProps> = ({
  lifehacktitle,
  descriptions,
  contents,
}) => {
  return (
    <YStack
      ai="center"
      bw={2}
      boc="$backgroundPress"
      bc="$background"
      br="$4"
      m="$4"
      p="$4"
      w="90%"
      maw={400}
      //shadowColor={"$shadowColor"}
      //shadowRadius={15}
      //shadowOffset={{ width: 0, height: 4 }}
    >
      <Image mt="$2"
        src={{ uri: `https://cdn.vosque.education/images/lifehack-img.png` , width: 30, height: 30}}
        width="50"
        height="50"
      />
      <Paragraph  fontSize={20} fontFamily="$hack" ta="center" mt="$3" col="$backgroundPress" style={{ fontStyle: 'italic' }} >{lifehacktitle}</Paragraph>
      <Separator mt="$2" w="60%"/>
      {descriptions.map((description, i) => (
        <React.Fragment key={i}>
          <YStack>
          <Paragraph col="$backgroundPress" mt="$3" ta="center">{description}</Paragraph>
          
          </YStack>
          {contents[i] && Object.values(contents[i]).map((content, j) => (
            <YStack mt="$3" ml="$3">
              <ParagraphCustom key={j} text={content.text} />
            </YStack>
          ))}
        </React.Fragment>
      ))}
    </YStack>
  );
};
