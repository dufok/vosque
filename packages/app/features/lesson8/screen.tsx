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

import { ContentLesson8 } from './type_Lesson8';
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
import { ExercisesBlockAudio } from "@my/ui/src/components/ExercisesBlockAudio";
import { DopDialog } from "@my/ui/src/components/DopDialog";

export function lesson8Screen() {

    // Part Config
    const userpageLinkProps = useLink({ href: "/userpage"});
    const lessonLinkPageUP = useLink({ href: "/lesson9"});
    const lessonLinkPageDown = useLink({ href: "/lesson7"});
  
    const { data: currentUser } = trpc.user.current.useQuery();
    const { data, isLoading, error } = trpc.entry.all.useQuery();
    const isSignedIn = !!currentUser;
  
    const { data: userLessons } = trpc.user.userLessons.useQuery();
    const EightLesson = userLessons?.[10];
    
    const content = EightLesson?.content as ContentLesson8;
  
    // Part Content

    const textExample1 = Object.values(content?.textExampleBlock1 || {});
    const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
    const example4_1 = content?.langTest4_1.example;
    const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
    const example1_1 = content?.langTest1_1.example;
    const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
    const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
    const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
    const wordToTranslate4 = Object.values(content?.wordToTranslateBlock4 || {});
    const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
    const example1_2 = content?.langTest1_2.example;
    const dopDialog1 = Object.values(content?.dopDialog1 || {});

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
          name={EightLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        <HeaderBlock header={content?.headerBlock1}/>
        <TextExampleBlock textExamples={textExample1}/>
        <HeaderBlock header={content?.headerBlock2} />
        <SquareText text={content?.squareText2} />
        <LangTest4 example={example4_1} tests={tests4_1} />
        <LangTest1 example={example1_1} tests={tests1_1} />
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

        <HeaderBlock header={content?.headerBlock3} />
        <SquareText text={content?.squareText3} />
        <WordToTranslateBlock words={wordToTranslate1} />
        <SquareText text={content?.squareText4} />
        <WordToTranslateBlock words={wordToTranslate2} />
        <SquareText text={content?.squareText5} />
        <WordToTranslateBlock words={wordToTranslate3} />
        <SquareText text={content?.squareText6} />
        <WordToTranslateBlock words={wordToTranslate4} />

        {/* Домашнее задание */}

        <HeaderBlock header={content?.headerBlock4} />
        <SquareText text={content?.squareText7} />
        <LangTest1 example={example1_2} tests={tests1_2} />

        {/* Дополнительные материалы */}

        <HeaderBlock header={content?.headerBlock5} />
        <DopDialog contents={dopDialog1}/>

      </YStack>
      <NavigationBlock
        lessonLinkPageDOWNname={"Урок 7"}
        lessonLinkPageUPname={"Урок 9"}
        lessonLinkPageUP={lessonLinkPageUP} 
        lessonLinkPageDOWN={lessonLinkPageDown}/>
    </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
  </YStack>
  );
} 