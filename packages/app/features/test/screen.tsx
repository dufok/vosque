import {
  YStack,
  XStack,
 } from "@my/ui";
import { useLink } from "solito/link";
import React from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";

import { ContentLesson2 } from './type_Lesson2';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";
import { WelcomeBlock } from "@my/ui/src/components/WelcomeBlock";
import { ImageCircle } from "@my/ui/src/components/ImageCircle";
import { HeaderBlock } from "@my/ui/src/components/HeaderBlock";
import { DescriptionBlock } from "@my/ui/src/components/DescriptionBlock";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest } from "@my/ui/src/components/LangTest1";

export function testScreen() {
  //hrefs
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson3"});
  const lessonLinkPageDown = useLink({ href: "/lesson2"});

  type Lesson = {
    id: number;
    name: string;
    content: ContentLesson2;
  }
  type LessonData = {
    lessons: Lesson[];
  }
  const data: LessonData = require('../../../db/seed/seed.json');
  const SecondLesson = data.lessons[1];

  //part with types from file json full
  const content = SecondLesson?.content as ContentLesson2;
  const tables1 = Object.values(content?.table1 || {});
  const blockText1 = Object.values(content?.blockText1 || {});
  const blockText2 = Object.values(content?.blockText2 || {});
  const tables2 = Object.values(content?.table2 || {});
  const tables3 = Object.values(content?.table3 || {});
  const tests1 = Object.values(content?.test1.testContent || {});
  const example1 = content?.test1.example;
  const tests2 = Object.values(content?.test2.testContent || {});
  const example2 = content?.test2.example;
  const tests3 = Object.values(content?.test3.testContent || {});
  const example3 = content?.test3.example;
  const blockText3 = Object.values(content?.blockText3 || {});
  const wordToTranlateBlock1 = Object.values(content?.wordToTranlateBlock1 || {});
  const blockText4 = Object.values(content?.blockText4 || {});
  const tables4 = Object.values(content?.table4 || {});
  const blockText8 = Object.values(content?.blockText8 || {});



  return (
    <YStack>
      <HeaderComp />
      {/* NEED TO ADD ISSIGIN */}
       <YStack f={1}>
        <YStack ai="center" mt="$10">
          <WelcomeBlock
            name={SecondLesson?.name}
            description={content?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content?.video}/>
            </YStack>
          <ImageCircle img={content?.image}/>

            {/* Теоритический Блок */}

          <HeaderBlock header={content?.header1}/>
          <TableBlock tables={tables1}/>

          {/* Важные Исключения */}

          <SquareText text={content?.squaretext1}/>
          <ExercisesBlockText exercises={blockText1}/>

          {/*  Множественное число */}

          <SquareText text={content?.squaretext2}/>
          <ExercisesBlockText exercises={blockText2}/>
          <SquareText text={content?.squaretext3}/>

          {/*  Неопределенный Артикль */}

          <HeaderBlock header={content?.header2}/>
          <XStack fw="wrap">
            <TableBlock tables={tables2}/>
            <LifeHackerBlock
                lifehackimage={content?.lifehack1.image}
                lifehacktitle={content?.lifehack1.title}
                lifehackdescription1={content?.lifehack1.description1}
                lifehackcontent1_1text={content?.lifehack1.content1[1].text}
                lifehackcontent1_2text={content?.lifehack1.content1[2].text}
                lifehackcontent1_3text={content?.lifehack1.content1[3].text}
                lifehackdescription2={content?.lifehack1.description2}
                lifehackcontent2_1text={content?.lifehack1.content2[1].text}
                lifehackcontent2_2text={content?.lifehack1.content2[2].text}
                lifehackcontent2_3text={content?.lifehack1.content2[3].text}
              />
            </XStack>

          {/* Определенный Артикль */}

          <HeaderBlock header={content?.header3}/>
          <TableBlock tables={tables3}/>
          <YStack ai="center">
            <XStack fw="wrap" jc="space-around" >
              <LifeHackerBlock
                  lifehackimage={content?.lifehack2.image}
                  lifehacktitle={content?.lifehack2.title}
                  lifehackdescription1={content?.lifehack2.description1}
                  lifehackcontent1_1text={content?.lifehack2.content1[1].text}
                  lifehackcontent1_2text={content?.lifehack2.content1[2].text}
                  lifehackcontent1_3text={content?.lifehack2.content1[3].text}
                  lifehackdescription2={content?.lifehack2.description2}
                  lifehackcontent2_1text={content?.lifehack2.content2[1].text}
                  lifehackcontent2_2text={content?.lifehack2.content2[2].text}
                  lifehackcontent2_3text={content?.lifehack2.content2[3].text}
                />
              <LifeHackerBlock
                  lifehackimage={content?.lifehack3.image}
                  lifehacktitle={content?.lifehack3.title}
                  lifehackdescription1={content?.lifehack3.description1}
                  lifehackcontent1_1text={content?.lifehack3.content1[1].text}
                  lifehackcontent1_2text={content?.lifehack3.content1[2].text}
                  lifehackcontent1_3text={content?.lifehack3.content1[3].text}
                  lifehackdescription2={content?.lifehack3.description2}
                  lifehackcontent2_1text={content?.lifehack3.content2[1].text}
                  lifehackcontent2_2text={content?.lifehack3.content2[2].text}
                  lifehackcontent2_3text={content?.lifehack3.content2[3].text}
                />
            </XStack>
          </YStack>
          <HeaderBlock header={content?.header4}/>
          <DescriptionBlock description={content?.description4}/>
          <LangTest tests={tests1} example={example1}/>
          <DescriptionBlock description={content?.description5}/>
          <LangTest tests={tests2} example={example2}/>
          <DescriptionBlock description={content?.description6}/>
          <LangTest tests={tests3} example={example3}/>
          <HeaderBlock header={content?.header5}/>
          <ExercisesBlockText exercises={blockText3}/>
          <WordToTranslateBlock words={wordToTranlateBlock1}/>
          <SquareText text={content?.squaretext5}/>
          <DescriptionBlock description={content?.description7}/>
          <ExercisesBlockText exercises={blockText4}/>
          <DescriptionBlock description={content?.description8}/>
          <TableBlock tables={tables4}/>
          <LifeHackerBlock
              lifehackimage={content?.lifehack4.image}
              lifehacktitle={content?.lifehack4.title}
              lifehackdescription1={content?.lifehack4.description1}
              lifehackcontent1_1text={content?.lifehack4.content1[1].text}
              lifehackcontent1_2text={content?.lifehack4.content1[2].text}
              lifehackcontent1_3text={content?.lifehack4.content1[3].text}
              lifehackdescription2={content?.lifehack4.description2}
              lifehackcontent2_1text={content?.lifehack4.content2[1].text}
              lifehackcontent2_2text={content?.lifehack4.content2[2].text}
              lifehackcontent2_3text={content?.lifehack4.content2[3].text}
            />
          <SquareText text={content?.squaretext8}/>
          <ExercisesBlockText exercises={blockText8}/>
        </YStack>
        <NavigationBlock  lessonLinkPageDOWNname={"Урок 1"} lessonLinkPageUPname={"Урок 3"} lessonLinkPageUP={lessonLinkPageUP} lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 
