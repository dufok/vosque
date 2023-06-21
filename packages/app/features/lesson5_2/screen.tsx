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

import { ContentLesson5_2 } from './type_Lesson5_2';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";
import { WelcomeBlock } from "@my/ui/src/components/WelcomeBlock";
import { ImageCircle } from "@my/ui/src/components/ImageCircle";
import { HeaderBlock } from "@my/ui/src/components/HeaderBlock";
import { DescriptionBlock } from "@my/ui/src/components/DescriptionBlock";
import { TextExampleBlock } from "@my/ui/src/components/TextExampleBlock";
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest2 } from "@my/ui/src/components/LangTest2";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";

export function lesson5_2Screen() {
  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const FifthPartTwoLesson = userLessons?.[6];

  
  // Part Content

  const content = FifthPartTwoLesson?.content as ContentLesson5_2;
  
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson6"});
  const lessonLinkPageDown = useLink({ href: "/lesson5"});

  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const exercises2 = Object.values(content?.exercisesBlockText2 || {});
  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;
  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
  const wordToTranslate4 = Object.values(content?.wordToTranslateBlock4 || {});

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
          name={FifthPartTwoLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        <HeaderBlock header={content?.headerBlock1}/>
        <SquareText text={content?.squareText1} />
        <DescriptionBlock description={content?.descriptionBlock1} />
        <ExercisesBlockText exercises={exercises1} />
        <DescriptionBlock description={content?.descriptionBlock2} />
        <ExercisesBlockText exercises={exercises2} />
        <SquareText text={content?.squareText2} />
        <TextExampleBlock textExamples={textExample1}/>

        <HeaderBlock header={content?.headerBlock2} />
        <SquareText text={content?.squareText3} />
        <LangTest1 example={example1_1} tests={tests1_1} />
        <SquareText text={content?.squareText4} />
        <LangTest4 example={example4_1} tests={tests4_1} />

        <HeaderBlock header={content?.headerBlock3} />
        <DescriptionBlock description={content?.descriptionBlock3} />
        <WordToTranslateBlock words={wordToTranslate1} />
        <XStack fw="wrap" jc="center">
          <LifeHackerBlock
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
          <LifeHackerBlock
            lifehacktitle={content?.lifeHackerBlock2.title}
            descriptions={[
              content?.lifeHackerBlock2.description1,
              content?.lifeHackerBlock2.description2,
              content?.lifeHackerBlock2.description3,
              content?.lifeHackerBlock2.description4,
            ]}
            contents={[
              content?.lifeHackerBlock2.content1,
              content?.lifeHackerBlock2.content2,
              content?.lifeHackerBlock2.content3,
              content?.lifeHackerBlock2.content4,
            ]}
          />
        </XStack>
        <SquareText text={content?.squareText5} />
        <WordToTranslateBlock words={wordToTranslate2} />
        <SquareText text={content?.squareText6} />
        <WordToTranslateBlock words={wordToTranslate3} />
        <SquareText text={content?.squareText7} />
        <WordToTranslateBlock words={wordToTranslate4} />

          {/* Домашнее Задание */}

        <HeaderBlock header={content?.headerBlock4} />
        <LangTest1 example={example1_2} tests={tests1_2} />

      </YStack>
      <NavigationBlock
        lessonLinkPageDOWNname={"Урок 5 (часть 1)"}
        lessonLinkPageUPname={"Урок 6"}
        lessonLinkPageUP={lessonLinkPageUP} 
        lessonLinkPageDOWN={lessonLinkPageDown}/>
    </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 