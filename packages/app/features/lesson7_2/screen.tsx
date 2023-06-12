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

import { ContentLesson7_2 } from './type_Lesson7_2';
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

export function lesson7_2Screen() {
  // Part Config
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson8"});
  const lessonLinkPageDown = useLink({ href: "/lesson7"});

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const SeventhPartTwoLesson = userLessons?.[9];
  
  const content = SeventhPartTwoLesson?.content as ContentLesson7_2;

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

  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;

  return (
    <YStack>
      <HeaderComp />
      { isSignedIn && (
      <YStack f={1}>
        <YStack ai="center" mt="$10">
          <WelcomeBlock
            name={SeventhPartTwoLesson?.name}
            description={content?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content?.video}/>
            </YStack>
          <ImageCircle img={content?.image}/>

          <HeaderBlock header={content?.headerBlock1}/>
          <DescriptionBlock description={content?.descriptionBlock1} />
          <TextExampleBlock textExamples={textExample1}/>

          <HeaderBlock header={content?.headerBlock2}/>
          <LangTest1 example={example1_1} tests={tests1_1} />
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

          {/* Домашнее задание */}

          <HeaderBlock header={content?.headerBlock3} />
          <LangTest1 example={example1_2} tests={tests1_2} />

        </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 7 (часть 1)"}
          lessonLinkPageUPname={"Урок 8"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 