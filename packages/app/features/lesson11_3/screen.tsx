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

import { ContentLesson11_3 } from './type_Lesson11_3';
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
import { LangTest3 } from "@my/ui/src/components/LangTest3";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";

export function lesson11_3Screen() {

  // Part Config

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson12"});
  const lessonLinkPageDown = useLink({ href: "/lesson11_2"});

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const EleventPartThrihLesson = userLessons?.[18];
  
  const content = EleventPartThrihLesson?.content as ContentLesson11_3;

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
  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
  const wordToTranslate4 = Object.values(content?.wordToTranslateBlock4 || {});
  const wordToTranslate5 = Object.values(content?.wordToTranslateBlock5 || {});
  const wordToTranslate6 = Object.values(content?.wordToTranslateBlock6 || {});
  const wordToTranslate7 = Object.values(content?.wordToTranslateBlock7 || {});
  const wordToTranslate8 = Object.values(content?.wordToTranslateBlock8 || {});
  const wordToTranslate9 = Object.values(content?.wordToTranslateBlock9 || {});
  const wordToTranslate10 = Object.values(content?.wordToTranslateBlock10 || {});
  const wordToTranslate11 = Object.values(content?.wordToTranslateBlock11 || {});
  const tests3_1 = Object.values(content?.langTest3_1.testContent || {});
  const example3_1 = content?.langTest3_1.example;


  return (
    <YStack>
        <HeaderComp />
        { isSignedIn && (
        <YStack f={1}>
          <YStack ai="center" mt="$10">
            <WelcomeBlock
              name={EleventPartThrihLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

            <HeaderBlock header={content?.headerBlock1}/>
            <DescriptionBlock description={content?.descriptionBlock1} />
            <DescriptionBlock description={content?.descriptionBlock2} />
            <SquareText text={content?.squareText1} />
            <TableBlock tables={tables1} />
            <SquareText text={content?.squareText2} />
            <TableBlock tables={tables2} />
            <ExercisesBlockText exercises={exercises1} />

            <HeaderBlock header={content?.headerBlock2} />
            <LangTest1 example={example1_1} tests={tests1_1} />

            <HeaderBlock header={content?.headerBlock3} />
            <DescriptionBlock description={content?.descriptionBlock3} />
            <TableBlock tables={tables3} />
            <DescriptionBlock description={content?.descriptionBlock4} />
            <TableBlock tables={tables4} />
          
            <HeaderBlock header={content?.headerBlock4} />
            <SquareText text={content?.squareText3} />
            <WordToTranslateBlock words={wordToTranslate1} />
            <SquareText text={content?.squareText4} />
            <WordToTranslateBlock words={wordToTranslate2} />
            <SquareText text={content?.squareText5} />
            <WordToTranslateBlock words={wordToTranslate3} />
            <SquareText text={content?.squareText6} />
            <WordToTranslateBlock words={wordToTranslate4} />
            <SquareText text={content?.squareText7} />
            <WordToTranslateBlock words={wordToTranslate5} />
            <SquareText text={content?.squareText8} />
            <WordToTranslateBlock words={wordToTranslate6} />
            <SquareText text={content?.squareText9} />
            <WordToTranslateBlock words={wordToTranslate7} />
            <SquareText text={content?.squareText10} />
            <WordToTranslateBlock words={wordToTranslate8} />
            <SquareText text={content?.squareText11} />
            <WordToTranslateBlock words={wordToTranslate9} />
            <SquareText text={content?.squareText12} />
            <WordToTranslateBlock words={wordToTranslate10} />
            <SquareText text={content?.squareText13} />
            <WordToTranslateBlock words={wordToTranslate11} />
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
            <DescriptionBlock description={content?.descriptionBlock5} />
            <LangTest3 example={example3_1} tests={tests3_1} />

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 11 (часть 2)"}
          lessonLinkPageUPname={"Урок 12"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 