import { Paragraph, YStack, Image, H3 } from "tamagui";
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
      <Image src={lifehackimage} width={50} height={50} />
      <H3>{lifehacktitle}</H3>
      {descriptions.map((description, i) => (
        <React.Fragment key={i}>
          <Paragraph ta="center">{description}</Paragraph>
          {contents[i] && Object.values(contents[i]).map((content, j) => (
            <ParagraphCustom key={j} text={content.text} />
          ))}
        </React.Fragment>
      ))}
    </YStack>
  );
};
