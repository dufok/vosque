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

import { ContentLesson9_2 } from './type_Lesson9_2';
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

export function lesson9_2Screen() {

   // Part Config
 
   const { data: currentUser } = trpc.user.current.useQuery();
   const { data, isLoading, error } = trpc.entry.all.useQuery();
   const isSignedIn = !!currentUser;
 
   const { data: userLessons } = trpc.user.userLessons.useQuery();
   const NinthPartTwoLesson = userLessons?.[12];
   
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

  const content = NinthPartTwoLesson?.content as ContentLesson9_2;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson10"});
  const lessonLinkPageDown = useLink({ href: "/lesson9"});

  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;

  return (
      <YStack>
        <HeaderComp />
        { isSignedIn && (
      <YStack f={1}>
          <YStack ai="center" mt="$10">
            <WelcomeBlock
              name={NinthPartTwoLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

            <HeaderBlock header={content?.headerBlock1}/>
            <SquareText text={content?.squareText1} />
            <DescriptionBlock description={content?.descriptionBlock2} />
            <TableBlock table={content?.tableBlock1} />
            <TableBlock table={content?.tableBlock2} />
            <TableBlock table={content?.tableBlock3} />
            <TableBlock table={content?.tableBlock4} />
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
            <TableBlock table={content?.tableBlock5} />

            {/* Домашнее задание */}

            <HeaderBlock header={content?.headerBlock2} />
            <LangTest4 example={example4_1} tests={tests4_1} />
            <LangTest1 example={example1_1} tests={tests1_1} />

            <HeaderBlock header={content?.headerBlock3} />
            <YStack  mt="$4" w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content?.video3}/>
            </YStack>
            <HeaderBlock header={content?.headerBlock4} />
            <ExercisesBlockText exercises={exercises1} />

            <HeaderBlock header={content?.headerBlock5} />
            <LangTest1 example={example1_2} tests={tests1_2} />
            <LifeHackerBlock
              lifehackimage={content?.lifeHackerBlock2.image}
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
          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 9"}
          lessonLinkPageUPname={"Урок 10"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>    
  );
} 