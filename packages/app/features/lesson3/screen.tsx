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

import { ContentLesson3 } from './type_Lesson3';
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

//* CHANCHE testScreen *///
export function lesson3Screen() {
  //hrefs
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson3_2"});
  const lessonLinkPageDown = useLink({ href: "/lesson2"});

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  //lesson content
  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const ThirdLesson = userLessons?.[2];
  

  //part with types from file json full
  const content = ThirdLesson?.content as ContentLesson3;
  const tables1 = Object.values(content?.table1 || {});
  const blockText1 = Object.values(content?.blockText1 || {});
  const blockText2 = Object.values(content?.blockText2 || {});
  const tests1 = Object.values(content?.test1.testContent || {});
  const example1 = content?.test1.example;


  
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
              name={ThirdLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

        {/* Теоритический Блок */}

        <HeaderBlock header={content?.header1}/>
        <SquareText text={content?.squaretext1}/>
        <TableBlock tables={tables1}/>

        {/* Формы на “Usted” - “Ustedes”: */}

        <HeaderBlock header={content?.header2}/>
        <DescriptionBlock description={content?.description2}/>
        <DescriptionBlock description={content?.description3}/>
        <DescriptionBlock description={content?.description4}/>
        <DescriptionBlock description={content?.description5}/>
        <DescriptionBlock description={content?.description6}/>

        {/*  Построение простого вопроса: */}

        <SquareText text={content?.squaretext2}/>
        <ExercisesBlockText exercises={blockText1}/>

        {/*  ППостроение Отрицания: */}

        <SquareText text={content?.squaretext3}/>
        <ExercisesBlockText exercises={blockText2}/>

        {/*  Блок Упражнений */}

        <HeaderBlock header={content?.header3}/>
        <SquareText text={content?.squaretext4}/>
        <LangTest1 tests={tests1} example={example1}/>
      </YStack> 
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 2"}
          lessonLinkPageUPname={"Урок 3"}
          lessonLinkPageUP={lessonLinkPageUP}
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }