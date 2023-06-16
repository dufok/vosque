import {
  Paragraph,
  YStack,
  XStack,
  Spinner,
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect} from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";

import { ContentLesson3_2 } from './type_Lesson3_2';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";
import { WelcomeBlock } from "@my/ui/src/components/WelcomeBlock";
import { ImageCircle } from "@my/ui/src/components/ImageCircle";
import { HeaderBlock } from "@my/ui/src/components/HeaderBlock";
import { DescriptionBlock } from "@my/ui/src/components/DescriptionBlock";
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest2 } from "@my/ui/src/components/LangTest2";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";

export function lesson3_2Screen() {
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson4"});
  const lessonLinkPageDown = useLink({ href: "/lesson3"});

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const ThirdPartTwoLesson = userLessons?.[3];
  

  const content = ThirdPartTwoLesson?.content as ContentLesson3_2;
  const exercises2 = Object.values(content?.exercisesBlockText2 || {});
  const tests2_1 = Object.values(content?.langTest2_1.testContent || {});
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const tests1_3 = Object.values(content?.langTest1_3.testContent || {});
  const tests1_4 = Object.values(content?.langTest1_4.testContent || {});
  const tests1_5 = Object.values(content?.langTest1_5.testContent || {});
  const example2_1 = content?.langTest2_1.example;
  const example1_2 = content?.langTest1_2.example;
  const example1_3 = content?.langTest1_3.example;
  const example1_4 = content?.langTest1_4.example;
  const example1_5 = content?.langTest1_5.example;
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
  
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isLoading) {
      return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack>
      <HeaderComp />
      { isSignedIn && (
      <YStack f={1}>
        <YStack ai="center" mt="$10">
          <WelcomeBlock
            name={ThirdPartTwoLesson?.name}
            description={content?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content?.video}/>
            </YStack>
          <ImageCircle img={content?.image}/>

          <HeaderBlock header={content?.headerBlock1}/>
          <TableBlock table={content?.tableBlock1} />

          <HeaderBlock header={content?.headerBlock2} />
          <DescriptionBlock description={content?.descriptionBlock1} />
          <LangTest2 example={example2_1} tests={tests2_1}/>

          <SquareText text={content?.squareText2} />
          <YStack ai="center" f={1}>
            <XStack fw="wrap" jc="center">
              <YStack maw={600} $sm={{ width: "100%" }} >
                <DescriptionBlock description={content?.descriptionBlock2} />
                <DescriptionBlock description={content?.descriptionBlock3} />
                <DescriptionBlock description={content?.descriptionBlock4} />
                <ExercisesBlockText exercises={exercises2} />
              </YStack>
              <YStack $sm={{ width: "100%" }} ai="center">
                <LifeHackerBlock
                  lifehackimage={content?.lifeHackerBlock1.image}
                  lifehacktitle={content?.lifeHackerBlock1.title}
                  descriptions={[
                    content?.lifeHackerBlock1.description1,
                    content?.lifeHackerBlock1.description2,
                    content?.lifeHackerBlock1.description3,
                    content?.lifeHackerBlock1.description4,
                  ]}
                  contents={[
                    content?.lifeHackerBlock1.content1,
                    content?.lifeHackerBlock1.content2,
                    content?.lifeHackerBlock1.content3,
                    content?.lifeHackerBlock1.content4,
                  ]}
                />
              </YStack>
            </XStack>
          </YStack>

          <SquareText text={content?.squaeText3} />
          <LangTest1 example={example1_2} tests={tests1_2} />
          <SquareText text={content?.squareText4} />
          <LangTest1 example={example1_3} tests={tests1_3} />

          <HeaderBlock header={content?.headerBlock3} />
          <SquareText text={content?.squareText5} />
          <WordToTranslateBlock words={wordToTranslate1} />
          <DescriptionBlock description={content?.descriptionBlock5} />
          <WordToTranslateBlock words={wordToTranslate2} />
          <SquareText text={content?.squareText8} />
          <DescriptionBlock description={content?.descriptionBlock6} />
          <WordToTranslateBlock words={wordToTranslate3} />

          <HeaderBlock header={content?.headerBlock4} />
          <DescriptionBlock description={content?.descriptionBlock7} />
          <LangTest1 example={example1_4} tests={tests1_4} />
          <DescriptionBlock description={content?.descriptionBlock8} />
          <LangTest1 example={example1_5} tests={tests1_5} />
        </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 3 (часть 1)"}
          lessonLinkPageUPname={"Урок 4"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}
