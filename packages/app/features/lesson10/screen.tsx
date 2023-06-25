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

import { ContentLesson10 } from './type_Lesson10';
import { ContentLesson10_2 } from './type_Lesson10';

export function lesson10Screen() {

  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();

  const lessonName = "урок 10";
  const TenthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  const partName =  "l10p2";
  const TenthPartTwoLesson = userLessons?.find(lesson => lesson.name === partName);

  
  
  // Part Content

  const content = TenthLesson?.content as ContentLesson10;
  const content2 = TenthPartTwoLesson?.content as ContentLesson10_2;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson11"});
  const lessonLinkPageDown = useLink({ href: "/lesson9"});

  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;

  // Part 2 Content

  const tests1_2 = Object.values(content2?.langTest1_1.testContent || {});
  const example1_2 = content2?.langTest1_1.example;
  const tests1_3 = Object.values(content2?.langTest1_2.testContent || {});
  const example1_3 = content2?.langTest1_2.example;
  const wordToTranslate1 = Object.values(content2?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content2?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content2?.wordToTranslateBlock3 || {});
  const textExample1 = Object.values(content2?.textExampleBlock1 || {});

  const exercisesBlockAudio1 = Object.values(content2?.exercisesBlockAudio1 || {});

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
              name={TenthLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

            <HeaderBlock header={content?.headerBlock1}/>
            <TableBlock table={content?.tableBlock1} />
            <XStack fw="wrap" jc="center">
              <YStack w="50%" $sm={{width: "100%"}}>
                <ExercisesBlockText exercises={exercises1} />
              </YStack>
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
            </XStack>
                        {/* Домашнее задание */}

            <HeaderBlock header={content?.headerBlock2} />
            <LangTest4 example={example4_1} tests={tests4_1} />
            <LangTest1 example={example1_1} tests={tests1_1} />

            <WelcomeBlock
              name={content2?.name}
              description={content2?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content2?.video}/>
              </YStack>
            <ImageCircle img={content2?.image}/>

            <HeaderBlock header={content2?.headerBlock1}/>
            <TableBlock table={content2?.tableBlock1} />
            <SquareText text={content2?.squareText2} />
            <DescriptionBlock description={content2?.descriptionBlock1} />
            <TableBlock table={content2?.tableBlock2} />
            <TableBlock table={content2?.tableBlock3} />
            <SquareText text={content2?.squareText4} />
            <DescriptionBlock description={content2?.descriptionBlock2} />
            <TableBlock table={content2?.tableBlock4} />
            <SquareText text={content2?.squareText6} />
            <DescriptionBlock description={content2?.descriptionBlock3} />
            <TableBlock table={content2?.tableBlock5} />
            <SquareText text={content2?.squareText8} />
            <DescriptionBlock description={content2?.descriptionBlock4} />
            <TableBlock table={content2?.tableBlock6} />
            <SquareText text={content2?.squareText10} />
            <DescriptionBlock description={content2?.descriptionBlock5} />

            <HeaderBlock header={content2?.headerBlock2} />
            <LangTest1 example={example1_2} tests={tests1_2} />

            <HeaderBlock header={content2?.headerBlock3} />
            <SquareText text={content2?.squareText11} />
            <WordToTranslateBlock words={wordToTranslate1} />
            <SquareText text={content2?.squareText12} />
            <XStack fw="wrap" jc="center">
              <YStack w="100%" $gtSm={{ width: "60%" }}>
                <TextExampleBlock textExamples={textExample1}/>
              </YStack>
              <LifeHackerBlock
                lifehacktitle={content2?.lifeHackerBlock1.title}
                descriptions={[
                  content2?.lifeHackerBlock1.description1,
                  content2?.lifeHackerBlock1.description2,
                  content2?.lifeHackerBlock1.description3,
                  content2?.lifeHackerBlock1.description4,
                ]}
                contents={[
                  content2?.lifeHackerBlock1.content1,
                  content2?.lifeHackerBlock1.content2,
                  content2?.lifeHackerBlock1.content3,
                  content2?.lifeHackerBlock1.content4,
                ]}
              />
            </XStack>
            <SquareText text={content2?.squareText13} />
            <WordToTranslateBlock words={wordToTranslate2} />
            <SquareText text={content2?.squareText14} />
            <DescriptionBlock description={content2?.descriptionBlock6} />
            <WordToTranslateBlock words={wordToTranslate3} />

              {/* Домашнее задание */}

            <HeaderBlock header={content2?.headerBlock4} />
            <LangTest1 example={example1_3} tests={tests1_3} />

            {/* Дополнительные материалы */}

            <HeaderBlock header={content2?.headerBlock5} />
            <ExercisesBlockAudio exercises={exercisesBlockAudio1}/>

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 9"}
          lessonLinkPageUPname={"Урок 11"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>    
  );
} 