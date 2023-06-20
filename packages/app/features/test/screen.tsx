import {
  Paragraph,
  YStack,
  XStack,
  Spinner,
 } from "@my/ui";
import { useLink } from "solito/link";
import React, {useEffect} from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";

import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
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
import { ExercisesBlockAudioWithDisc } from "@my/ui/src/components/ExercisesBlockAudioWithDisc";
import { ExercisesBlockAudio } from "@my/ui/src/components/ExercisesBlockAudio";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";

import { ContentLesson2 } from "../lesson2/type_Lesson2";

export function testScreen() {

  { /* THIS IS LESSONS SECTIOn 

  // TEST NEEDED SYNC TO SEED //
  type Lesson = {
    id: number;
    name: string;
    content: ContentLesson2;
  }
  type LessonData = {
    lessons: Lesson[];
  }
  const data: LessonData = require('../../../db/seed/seed.json');
  const SecondLesson = data.lessons[1]; */}

  //CONSTS


  return (
    <YStack>
      <HeaderComp />
      { /* THIS IS LESSONS SECTIOn */}

      { /* THIS IS LESSONS SECTIOn 
      <SubMenu userpageLinkProps={userpageLinkProps}/> */}
    </YStack>
  );
}


 
 