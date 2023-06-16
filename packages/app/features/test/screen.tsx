import {
  Paragraph,
  YStack,
  XStack,
  Spinner,
 } from "@my/ui";
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

import { ContentLesson7 } from "../lesson7/type_Lesson7";

export function testScreen() {

  { /* THIS IS LESSONS SECTIOn

  // TEST NEEDED SYNC TO SEED //
  type Lesson = {
    id: number;
    name: string;
    content: ContentLesson7;
  }
  type LessonData = {
    lessons: Lesson[];
  }
  const data: LessonData = require('../../../db/seed/seed.json');
  const SeventhLesson = data.lessons[8];

  //CONSTS

  const content = SeventhLesson?.content as ContentLesson7;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson7_2"});
  const lessonLinkPageDown = useLink({ href: "/lesson6"});

  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;

   */}

 
  return (
    <YStack>
      <HeaderComp />
      { /* THIS IS LESSONS SECTIOn */}

      { /* THIS IS LESSONS SECTIOn 
      <SubMenu userpageLinkProps={userpageLinkProps}/>*/}
    </YStack>
  );
}
