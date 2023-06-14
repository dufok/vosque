import { Paragraph, YStack, Image, Avatar, H3, H5, H4 } from "tamagui";
import React from "react";
import { ParagraphCustom } from "./CustomText";

type Texts = {
  text: string;
}

interface LifeHackerBlockProps {
  lifehackimage: string;
  lifehacktitle: string;
  descriptions: string[];
  contents: { [key: string]: Texts }[];
}

export const LifeHackerBlock: React.FC<LifeHackerBlockProps> = ({
  lifehackimage,
  lifehacktitle,
  descriptions,
  contents,
}) => {
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
      <Avatar circular size="$4" backgroundColor="$backgroundFocus">
        <Avatar.Image src={lifehackimage} scale="50%" />
        <Avatar.Fallback backgroundColor="$backgroundFocus" />
      </Avatar>
      <H5 fontSize={18} ta="center" mt="$3" col="$backgroundPress" style={{ fontStyle: 'italic' }} >{lifehacktitle}</H5>
      {descriptions.map((description, i) => (
        <React.Fragment key={i}>
          <Paragraph mt="$3" ta="left">{description}</Paragraph>
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
