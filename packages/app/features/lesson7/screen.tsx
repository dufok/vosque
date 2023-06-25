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

import { ContentLesson7 } from './type_Lesson7';
import { ContentLesson7_2 } from './type_Lesson7';

export function lesson7Screen() {
  // Part Config


  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();

  const lessonName = "урок 7";
  const SeventhLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  const partName =  "l7p2";
  const SeventhPartTwoLesson = userLessons?.find(lesson => lesson.name === partName);

  // Part Content

  const content = SeventhLesson?.content as ContentLesson7;
  const content2 = SeventhPartTwoLesson?.content as ContentLesson7_2;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson8"});
  const lessonLinkPageDown = useLink({ href: "/lesson6"});

  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;

  // Part 2 Content

  const textExample1 = Object.values(content2?.textExampleBlock1 || {});
  const tests1_2 = Object.values(content2?.langTest1_2.testContent || {});
  const example1_2 = content2?.langTest1_2.example;
  const tests1_3 = Object.values(content2?.langTest1_3.testContent || {});
  const example1_3 = content2?.langTest1_3.example;
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
          name={SeventhLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        <HeaderBlock header={content?.headerBlock1}/>
        <HeaderBlock header={content?.headerBlock3}/>
        <TableBlock table={content?.tableBlock1} />
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
        <SquareText text={content?.squareText2} />
        <TableBlock table={content?.tableBlock2} />
        <XStack fw="wrap" jc="center">
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
          <LifeHackerBlock
            lifehacktitle={content?.lifeHackerBlock3.title}
            descriptions={[
              content?.lifeHackerBlock3.description1,
              content?.lifeHackerBlock3.description2,
              content?.lifeHackerBlock3.description3,
              content?.lifeHackerBlock3.description4,
            ]}
            contents={[
              content?.lifeHackerBlock3.content1,
              content?.lifeHackerBlock3.content2,
              content?.lifeHackerBlock3.content3,
              content?.lifeHackerBlock3.content4,
            ]}
          />
        </XStack>

          {/* Домашнее задание */}

        <HeaderBlock header={content?.headerBlock2} />
        <SquareText text={content?.squareText3} />
        <LangTest4 example={example4_1} tests={tests4_1} />
        <SquareText text={content?.squareText4} />
        <LangTest1 example={example1_1} tests={tests1_1} />
        
        <WelcomeBlock
            name={content2?.name}
            description={content2?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content2?.video}/>
            </YStack>

        <HeaderBlock header={content2?.headerBlock1}/>
        <DescriptionBlock description={content2?.descriptionBlock1} />
        <TextExampleBlock textExamples={textExample1}/>

        <HeaderBlock header={content2?.headerBlock2}/>
        <SquareText text={content2?.squareText2} />
        <LangTest1 example={example1_2} tests={tests1_2} />
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

        {/* Домашнее задание */}

        <HeaderBlock header={content2?.headerBlock3} />
        <SquareText text={content2?.squareText3} />
        <LangTest1 example={example1_3} tests={tests1_3} />

        {/* Дополнительные материалы */}

        <HeaderBlock header={content2?.headerBlock4} />
        <ExercisesBlockAudio exercises={exercisesBlockAudio1}/>

      </YStack>
      <NavigationBlock
        lessonLinkPageDOWNname={"Урок 6"}
        lessonLinkPageUPname={"Урок 8"}
        lessonLinkPageUP={lessonLinkPageUP} 
        lessonLinkPageDOWN={lessonLinkPageDown}/>
    </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 