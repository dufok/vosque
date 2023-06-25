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
import { LangTest3 } from "@my/ui/src/components/LangTest3";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { ExercisesBlockAudio } from "@my/ui/src/components/ExercisesBlockAudio";

import { ContentLesson11 } from './type_Lesson11';
import { ContentLesson11_2 } from './type_Lesson11';
import { ContentLesson11_3 } from './type_Lesson11';

export function lesson11Screen() {

  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();

  const lessonName = "урок 11";
  const EleventhLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));
  
  const partName1 =  "l11p2";
  const EleventPartTwohLesson = userLessons?.find(lesson => lesson.name === partName1);

  const partName2 =  "l11p3";
  const EleventPartThrihLesson = userLessons?.find(lesson => lesson.name === partName2);

  // Part Content

  const content = EleventhLesson?.content as ContentLesson11;
  const content2 = EleventPartTwohLesson?.content as ContentLesson11_2;
  const content3 = EleventPartThrihLesson?.content as ContentLesson11_3;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson12"});
  const lessonLinkPageDown = useLink({ href: "/lesson10"});

  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;

  // Part 2 Content

  const textExample2 = Object.values(content2?.textExampleBlock1 || {});
  const tests1_2 = Object.values(content2?.langTest1_1.testContent || {});
  const example1_2 = content2?.langTest1_1.example;

  //Part 3 Content

  const textExample3 = Object.values(content3?.textExampleBlock1 || {});
  const exercises1 = Object.values(content3?.exercisesBlockText1 || {});
  const tests1_3 = Object.values(content3?.langTest1_1.testContent || {});
  const example1_3 = content3?.langTest1_1.example
  const wordToTranslate1 = Object.values(content3?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content3?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content3?.wordToTranslateBlock3 || {});
  const wordToTranslate4 = Object.values(content3?.wordToTranslateBlock4 || {});
  const wordToTranslate5 = Object.values(content3?.wordToTranslateBlock5 || {});
  const wordToTranslate6 = Object.values(content3?.wordToTranslateBlock6 || {});
  const wordToTranslate7 = Object.values(content3?.wordToTranslateBlock7 || {});
  const wordToTranslate8 = Object.values(content3?.wordToTranslateBlock8 || {});
  const wordToTranslate9 = Object.values(content3?.wordToTranslateBlock9 || {});
  const wordToTranslate10 = Object.values(content3?.wordToTranslateBlock10 || {});
  const wordToTranslate11 = Object.values(content3?.wordToTranslateBlock11 || {});
  const tests3_1 = Object.values(content3?.langTest3_1.testContent || {});
  const example3_1 = content3?.langTest3_1.example;

  const exercisesBlockAudio1 = Object.values(content3?.exercisesBlockAudio1 || {});

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
              name={EleventhLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

            <HeaderBlock header={content?.headerBlock1}/>
            <HeaderBlock header={content?.headerBlock3}/>
            <TextExampleBlock textExamples={textExample1}/>
            <TableBlock table={content?.tableBlock1} />
            <TableBlock table={content?.tableBlock2} />
            <TableBlock table={content?.tableBlock3} />
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

              {/* Блок Упражнений */}  

            <HeaderBlock header={content?.headerBlock2} />
            <SquareText text={content?.squareText1} />
            <LangTest1 example={example1_1} tests={tests1_1} />


            <WelcomeBlock
              name={content2?.name}
              description={content2?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content2?.video}/>
            </YStack>

            <HeaderBlock header={content2?.headerBlock1}/>
            <HeaderBlock header={content2?.headerBlock3} />
            <TextExampleBlock textExamples={textExample2}/>
            <TableBlock table={content2?.tableBlock1} />
            <DescriptionBlock description={content2?.descriptionBlock3} />
            <TableBlock table={content2?.tableBlock2} />
            <TableBlock table={content2?.tableBlock3} />
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

            {/* Блок Упражнений */}  

            <HeaderBlock header={content2?.headerBlock2} />
            <SquareText text={content2?.squareText1} />
            <LangTest1 example={example1_2} tests={tests1_2} />

            <WelcomeBlock
              name={content3?.name}
              description={content3?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content3?.video}/>
            </YStack>

            <HeaderBlock header={content3?.headerBlock1}/>
            <HeaderBlock header={content3?.headerBlock6}/>
            <TextExampleBlock textExamples={textExample3}/>
            <TableBlock table={content3?.tableBlock1} />
            <TableBlock table={content3?.tableBlock2} />
            <ExercisesBlockText exercises={exercises1} />

            {/* Блок Упражнений */}  

            <HeaderBlock header={content3?.headerBlock2} />
            <SquareText text={content3?.squareText1} />
            <LangTest1 example={example1_3} tests={tests1_3} />

            <HeaderBlock header={content3?.headerBlock3} />
            <DescriptionBlock description={content3?.descriptionBlock3} />
            <TableBlock table={content3?.tableBlock3} />

            <HeaderBlock header={content3?.headerBlock4} />
            <SquareText text={content3?.squareText3} />
            <WordToTranslateBlock words={wordToTranslate1} />
            <SquareText text={content3?.squareText4} />
            <WordToTranslateBlock words={wordToTranslate2} />
            <SquareText text={content3?.squareText5} />
            <WordToTranslateBlock words={wordToTranslate3} />
            <SquareText text={content3?.squareText6} />
            <WordToTranslateBlock words={wordToTranslate4} />
            <SquareText text={content3?.squareText7} />
            <WordToTranslateBlock words={wordToTranslate5} />
            <SquareText text={content3?.squareText8} />
            <WordToTranslateBlock words={wordToTranslate6} />
            <SquareText text={content3?.squareText9} />
            <WordToTranslateBlock words={wordToTranslate7} />
            <SquareText text={content3?.squareText10} />
            <WordToTranslateBlock words={wordToTranslate8} />
            <SquareText text={content3?.squareText11} />
            <WordToTranslateBlock words={wordToTranslate9} />
            <SquareText text={content3?.squareText12} />
            <WordToTranslateBlock words={wordToTranslate10} />
            <SquareText text={content3?.squareText13} />
            <WordToTranslateBlock words={wordToTranslate11} />
            <LifeHackerBlock
              lifehacktitle={content3?.lifeHackerBlock1.title}
              descriptions={[
                content3?.lifeHackerBlock1.description1,
                content3?.lifeHackerBlock1.description2,
                content3?.lifeHackerBlock1.description3,
                content3?.lifeHackerBlock1.description4,
              ]}
              contents={[
                content3?.lifeHackerBlock1.content1,
                content3?.lifeHackerBlock1.content2,
                content3?.lifeHackerBlock1.content3,
                content3?.lifeHackerBlock1.content4,
              ]}
            />
            <HeaderBlock header={content3?.headerBlock5} />
            <SquareText text={content3?.squareText2} />
            <LangTest3 example={example3_1} tests={tests3_1} />

            {/* Дополнительные материалы */}

            <HeaderBlock header={content3?.headerBlock7} />
            <ExercisesBlockAudio exercises={exercisesBlockAudio1}/>

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 10"}
          lessonLinkPageUPname={"Урок 12"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 