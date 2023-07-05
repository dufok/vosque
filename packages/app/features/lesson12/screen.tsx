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
import { DopDialog } from "@my/ui/src/components/DopDialog";

import { ContentLesson12 } from './type_Lesson12';

export function lesson12Screen() {

  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const lessonName = "урок 12";
  const TwelfthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  // Part Content

  const content = TwelfthLesson?.content as ContentLesson12;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson1"});
  const lessonLinkPageDown = useLink({ href: "/lesson11_3"});

  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const exercises2 = Object.values(content?.exercisesBlockText2 || {});
  const tests3_1 = Object.values(content?.langTest3_1.testContent || {});
  const example3_1 = content?.langTest3_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;
  const tests1_3 = Object.values(content?.langTest1_3.testContent || {});
  const example1_3 = content?.langTest1_3.example;
  const tests1_4 = Object.values(content?.langTest1_4.testContent || {});
  const example1_4 = content?.langTest1_4.example;
  const tests1_5 = Object.values(content?.langTest1_5.testContent || {});
  const example1_5 = content?.langTest1_5.example;
  const tests1_6 = Object.values(content?.langTest1_6.testContent || {});
  const example1_6 = content?.langTest1_6.example;
  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
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
          name={TwelfthLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        <HeaderBlock header={content?.headerBlock1}/>
        <ExercisesBlockText exercises={exercises1} />

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

        <HeaderBlock header={content?.headerBlock2} />
        <SquareText text={content?.squareText1} />
        <LangTest3 example={example3_1} tests={tests3_1} isOneColumn/>
        <SquareText text={content?.squareText2} />
        <LangTest1 example={example1_1} tests={tests1_1} />

        <HeaderBlock header={content?.headerBlock3} />
        <ExercisesBlockText exercises={exercises2} />

        <TableBlock table={content?.tableBlock4} />
        <TableBlock table={content?.tableBlock5} />
        <TextExampleBlock textExamples={textExample1}/>
        <SquareText text={content?.squareText3} />
        <DescriptionBlock description={content?.descriptionBlock4} />
        <WordToTranslateBlock words={wordToTranslate1} />
        <DopDialog contents={dopDialog1}/>
        <YStack mt="$5" />
        <DescriptionBlock description={content?.descriptionBlock5} />
        <SquareText text={content?.squareText4} />
        <LangTest1 example={example1_2} tests={tests1_2} />
        <SquareText text={content?.squareText5} />
        <LangTest1 example={example1_3} tests={tests1_3} />
        <SquareText text={content?.squareText6} />
        <LangTest1 example={example1_4} tests={tests1_4} />
        <SquareText text={content?.squareText7} />
        <WordToTranslateBlock words={wordToTranslate2} />
        <LangTest1 example={example1_5} tests={tests1_5} isOneColumn/>
        <LangTest1 example={example1_6} tests={tests1_6} isOneColumn/>

      </YStack>
    <NavigationBlock
      lessonLinkPageDOWNname={"Урок 11 (часть 3)"}
      lessonLinkPageUPname={"Урок 1"}
      lessonLinkPageUP={lessonLinkPageUP} 
      lessonLinkPageDOWN={lessonLinkPageDown}/>
  </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 