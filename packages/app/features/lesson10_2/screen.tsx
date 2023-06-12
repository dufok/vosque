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

import { ContentLesson10_2 } from './type_Lesson10_2';
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

export function lesson10_2Screen() {

  // Part Config

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson11"});
  const lessonLinkPageDown = useLink({ href: "/lesson10"});

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const TenthPartTwoLesson = userLessons?.[14];
  
  const content = TenthPartTwoLesson?.content as ContentLesson10_2;

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isLoading) {
      return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  // Part Content

  const tables1 = Object.values(content?.tableBlock1 || {});
  const tables2 = Object.values(content?.tableBlock2 || {});
  const tables3 = Object.values(content?.tableBlock3 || {});
  const tables4 = Object.values(content?.tableBlock4 || {});
  const tables5 = Object.values(content?.tableBlock5 || {});
  const tables6 = Object.values(content?.tableBlock6 || {});
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
  const textExample1 = Object.values(content?.textExampleBlock1 || {});



  return (
    <YStack>
        <HeaderComp />
        { isSignedIn && (
        <YStack f={1}>
          <YStack ai="center" mt="$10">
            <WelcomeBlock
              name={TenthPartTwoLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

            <HeaderBlock header={content?.headerBlock1}/>
            <SquareText text={content?.squareText1} />
            <TableBlock tables={tables1} />
            <SquareText text={content?.squareText2} />
            <DescriptionBlock description={content?.descriptionBlock1} />
            <TableBlock tables={tables2} />
            <SquareText text={content?.squareText3} />
            <TableBlock tables={tables3} />
            <SquareText text={content?.squareText4} />
            <DescriptionBlock description={content?.descriptionBlock2} />
            <SquareText text={content?.squareText5} />
            <TableBlock tables={tables4} />
            <SquareText text={content?.squareText6} />
            <DescriptionBlock description={content?.descriptionBlock3} />
            <SquareText text={content?.squareText7} />
            <TableBlock tables={tables5} />
            <SquareText text={content?.squareText8} />
            <DescriptionBlock description={content?.descriptionBlock4} />
            <SquareText text={content?.squareText9} />
            <TableBlock tables={tables6} />
            <SquareText text={content?.squareText10} />
            <DescriptionBlock description={content?.descriptionBlock5} />

            <HeaderBlock header={content?.headerBlock2} />
            <LangTest1 example={example1_1} tests={tests1_1} />

            <HeaderBlock header={content?.headerBlock3} />
            <SquareText text={content?.squareText11} />
            <WordToTranslateBlock words={wordToTranslate1} />
            <SquareText text={content?.squareText12} />
            <TextExampleBlock textExamples={textExample1}/>
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
            <SquareText text={content?.squareText13} />
            <WordToTranslateBlock words={wordToTranslate2} />
            <SquareText text={content?.squareText14} />
            <DescriptionBlock description={content?.descriptionBlock6} />
            <WordToTranslateBlock words={wordToTranslate3} />

              {/* Домашнее задание */}

            <HeaderBlock header={content?.headerBlock4} />
            <LangTest1 example={example1_2} tests={tests1_2} />

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 10 (часть 1)"}
          lessonLinkPageUPname={"Урок 11"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 