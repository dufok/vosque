import {
  Paragraph,
  YStack,
  XStack,
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect} from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";

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
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { DopDialog } from "@my/ui/src/components/DopDialog";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";

import { ContentLesson3 } from "../lesson3/type_Lesson3";
import { ContentLesson3_2 } from "../lesson3/type_Lesson3";


export function lesson3Screen() {

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  //lesson content
  const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();
  const isLoadingOverall = userLessonsLoading || isLoading;
  // Find the required lesson by its name
   const lessonName = "Урок 3. Глаголы \"быть\"";
   const ThirdLesson = userLessons?.find(lesson => lesson.name === lessonName);

   const partName =  "l3p2";
   const ThirdLessonPartTwo = userLessons?.find(lesson => lesson.name === partName);

  //part with types from file json full

  const content = ThirdLesson?.content as ContentLesson3;
  const content2 = ThirdLessonPartTwo?.content as ContentLesson3_2;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson4"});
  const lessonLinkPageDown = useLink({ href: "/lesson2"});

  const blockText1 = Object.values(content?.blockText1 || {});
  const blockText2 = Object.values(content?.blockText2 || {});
  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const exercises1 = Object.values(content?.exercisesBlockText1 || {});

  //Part 2

  const exercises2 = Object.values(content2?.exercisesBlockText2 || {});
  const tests2_1 = Object.values(content2?.langTest2_1.testContent || {});
  const tests1_2 = Object.values(content2?.langTest1_2.testContent || {});
  const tests1_3 = Object.values(content2?.langTest1_3.testContent || {});
  const tests4_2 = Object.values(content2?.langTest4_1.testContent || {});
  const tests1_5 = Object.values(content2?.langTest1_5.testContent || {});
  const example2_1 = content2?.langTest2_1.example;
  const example1_2 = content2?.langTest1_2.example;
  const example1_3 = content2?.langTest1_3.example;
  const example4_2 = content2?.langTest4_1.example;
  const example1_5 = content2?.langTest1_5.example;
  const wordToTranslate1 = Object.values(content2?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content2?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content2?.wordToTranslateBlock3 || {});
  const dopDialog1 = Object.values(content2?.dopDialog1 || {});
  
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack>
      {isLoadingOverall && <SpinnerOver />}
      <HeaderComp />
      { isSignedIn && (
        <YStack f={1}>
          <YStack ai="center" mt="$10">
              <WelcomeBlock
                name={ThirdLesson?.name}
                description={content?.description}/>
                <YStack  w="100%" $gtSm={{ width: "70%" }}>
                  <VideoPlayer linkVideo={content?.video}/>
                </YStack>
              <ImageCircle img={content?.image}/>

          {/* Теоритический Блок */}

          <HeaderBlock header={content?.header1}/>
          <SquareText text={content?.squareText1}/>
          <TableBlock table={content?.tableBlock1}/>

          {/* Формы на “Usted” - “Ustedes”: */}

          <HeaderBlock header={content?.header2}/>
          <ExercisesBlockText exercises={exercises1} />

          {/*  Построение простого вопроса: */}

          <HeaderBlock header={content?.headerBlock3}/>
          <ExercisesBlockText exercises={blockText1}/>

          {/*  Построение Отрицания: */}

          <HeaderBlock header={content?.headerBlock4}/>
          <ExercisesBlockText exercises={blockText2}/>

          {/*  Блок Упражнений */}

          <HeaderBlock header={content?.header3}/>
          <SquareText text={content?.squareText4}/>
          <LangTest4 example={example4_1} tests={tests4_1} />

          {/* Часть 2 */}

          <WelcomeBlock
            name={content2?.name}
            description={content2?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content?.video}/>
            </YStack>

          <HeaderBlock header={content2?.headerBlock1}/>
          <TableBlock table={content2?.tableBlock1} />

          <HeaderBlock header={content2?.headerBlock2} />
          <SquareText text={content2?.squareText2} />
          <LangTest2 example={example2_1} tests={tests2_1}/>

          <HeaderBlock header={content2?.headerBlock5}/>
          <YStack ai="center" f={1}>
            <XStack fw="wrap" jc="center">
              <YStack maw={600} $sm={{ width: "100%" }} mt="$3">
                <DescriptionBlock description={content2?.descriptionBlock2} />
                <DescriptionBlock description={content2?.descriptionBlock3} />
                <DescriptionBlock description={content2?.descriptionBlock4} />
                <ExercisesBlockText exercises={exercises2} />
              </YStack>
              <YStack $sm={{ width: "100%" }} ai="center">
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
              </YStack>
            </XStack>
          </YStack>

          <SquareText text={content2?.squareText3} />
          <LangTest1 example={example1_2} tests={tests1_2} />
          <SquareText text={content2?.squareText4} />

          <LangTest1 example={example1_3} tests={tests1_3} isOneColumn/>

          <HeaderBlock header={content2?.headerBlock3} />
          <SquareText text={content2?.squareText5} />
          <WordToTranslateBlock words={wordToTranslate1} />
          <DescriptionBlock description={content2?.descriptionBlock5} />
          <WordToTranslateBlock words={wordToTranslate2} />
          <SquareText text={content2?.squareText8} />
          <DescriptionBlock description={content2?.descriptionBlock6} />
          <WordToTranslateBlock words={wordToTranslate3} />

          {/* Блок дополнительных материалов */}

          <HeaderBlock header={content2?.headerBlock6} />
          <DescriptionBlock description={content2?.descriptionBlock10} />
          <DopDialog contents={dopDialog1}/>

          {/* Домашнее Задание */}

          <HeaderBlock header={content2?.headerBlock4} />\
          <SquareText text={content2?.squareText6} />
          <LangTest4 example={example4_2} tests={tests4_2} />
          <SquareText text={content2?.squareText7} />
          <LangTest1 example={example1_5} tests={tests1_5} />

        </YStack> 
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 2"}
          lessonLinkPageUPname={"Урок 4"}
          lessonLinkPageUP={lessonLinkPageUP}
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }