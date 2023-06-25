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

import { ContentLesson9 } from './type_Lesson9';
import { ContentLesson9_2 } from './type_Lesson9';

export function lesson9Screen() {

  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();

  const lessonName = "урок 9";
  const NinthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  const partName =  "l9p2";
  const NinthPartTwoLesson = userLessons?.find(lesson => lesson.name === partName);

  // Part Content

  const content = NinthLesson?.content as ContentLesson9;
  const content2 = NinthPartTwoLesson?.content as ContentLesson9_2;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson10"});
  const lessonLinkPageDown = useLink({ href: "/lesson8"});

  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;

  // Part Content 2

  const textExample2 = Object.values(content2?.textExampleBlock1 || {});
  const tests4_2 = Object.values(content2?.langTest4_1.testContent || {});
  const example4_2 = content2?.langTest4_1.example;
  const tests1_2 = Object.values(content2?.langTest1_1.testContent || {});
  const example1_2 = content2?.langTest1_1.example;
  const exercises1 = Object.values(content2?.exercisesBlockText1 || {});
  const tests1_3 = Object.values(content2?.langTest1_2.testContent || {});
  const example1_3 = content2?.langTest1_2.example;

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
              name={NinthLesson?.name}
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
            <DescriptionBlock description={content?.descriptionBlock3} />
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
            <TableBlock table={content?.tableBlock4 } />
            <TableBlock table={content?.tableBlock5 } />

            {/* Домашнее задание */}

            <HeaderBlock header={content?.headerBlock2} />
            <SquareText text={content?.squareText1} />
            <LangTest4 example={example4_1} tests={tests4_1} />
            <SquareText text={content?.squareText2} />
            <LangTest1 example={example1_1} tests={tests1_1} />

            {/* Блок Лексики */}

            <WelcomeBlock
              name={content2?.name}
              description={content2?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content2?.video}/>
              </YStack>

            <HeaderBlock header={content2?.headerBlock1}/>
            <HeaderBlock header={content2?.headerBlock7}/>
            <TextExampleBlock textExamples={textExample2}/>
            <TableBlock table={content2?.tableBlock1} />
            <TableBlock table={content2?.tableBlock2} />
            <TableBlock table={content2?.tableBlock3} />
            <TableBlock table={content2?.tableBlock4} />
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
            <TableBlock table={content2?.tableBlock5} />

            {/* Блок Упражнений */}

            <HeaderBlock header={content2?.headerBlock2} />
            <SquareText text={content?.squareText1} />
            <LangTest4 example={example4_2} tests={tests4_2} />
            <SquareText text={content?.squareText2} />
            <LangTest1 example={example1_2} tests={tests1_2} />

            <HeaderBlock header={content2?.headerBlock3} />
            <YStack  mt="$4" w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content2?.video3}/>
            </YStack>

            {/* Время */}

            <HeaderBlock header={content2?.headerBlock4} />
            <ExercisesBlockText exercises={exercises1} />

            {/* Домашнее Задание */}

            <HeaderBlock header={content2?.headerBlock5} />
            <SquareText text={content2?.squareText3} />
            <LangTest1 example={example1_3} tests={tests1_3} />
            <LifeHackerBlock
              lifehacktitle={content2?.lifeHackerBlock2.title}
              descriptions={[
                content2?.lifeHackerBlock2.description1,
                content2?.lifeHackerBlock2.description2,
                content2?.lifeHackerBlock2.description3,
                content2?.lifeHackerBlock2.description4,
              ]}
              contents={[
                content2?.lifeHackerBlock2.content1,
                content2?.lifeHackerBlock2.content2,
                content2?.lifeHackerBlock2.content3,
                content2?.lifeHackerBlock2.content4,
              ]}
            />

                    {/* Дополнительные материалы */}

            <HeaderBlock header={content2?.headerBlock6} />
            <ExercisesBlockAudio exercises={exercisesBlockAudio1}/>

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 8"}
          lessonLinkPageUPname={"Урок 10"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 