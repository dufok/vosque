import {
  Paragraph,
  YStack,
  XStack,
  Spinner,
 } from "@my/ui";
import { useLink } from "solito/link";
import React,{useEffect} from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";

import { ContentLesson12 } from './type_Lesson12';
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

export function testScreen() {

  // Part Config

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson1"});
  const lessonLinkPageDown = useLink({ href: "/lesson11_3"});

  type Lesson = {
    id: number;
    name: string;
    content: ContentLesson12;
  }
  type LessonData = {
    lessons: Lesson[];
  }
  const data: LessonData = require('../../../db/seed/seed.json');
  const TwelfthLesson = data.lessons?.[18];
  
  const content = TwelfthLesson?.content as ContentLesson12;

  // Part Content

  const tables1 = Object.values(content?.tableBlock1 || {});
  const tables2 = Object.values(content?.tableBlock2 || {});
  const tables3 = Object.values(content?.tableBlock3 || {});
  const tables4 = Object.values(content?.tableBlock4 || {});
  const tables5 = Object.values(content?.tableBlock5 || {});
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
  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const exercises2 = Object.values(content?.exercisesBlockText2 || {});
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});



  return (
    <YStack>
        <HeaderComp />
        
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
            <XStack fw="wrap" jc="center">
              <TableBlock tables={tables1} />
              <TableBlock tables={tables2} />
              <TableBlock tables={tables3} />
            </XStack>
            
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
           

            <HeaderBlock header={content?.headerBlock2} />
            <LangTest3 example={example3_1} tests={tests3_1} />
          
            <LangTest1 example={example1_1} tests={tests1_1} />
            
            <HeaderBlock header={content?.headerBlock3} />
            <DescriptionBlock description={content?.descriptionBlock3} />
            <SquareText text={content?.squareText1} />
            
            <TableBlock tables={tables4} />
            
            <SquareText text={content?.squareText2} />
          
            <TableBlock tables={tables5} />



            <ExercisesBlockText exercises={exercises2} />


            <SquareText text={content?.squareText3} />

            <DescriptionBlock description={content?.descriptionBlock4} />
            <WordToTranslateBlock words={wordToTranslate1} />
            <DescriptionBlock description={content?.descriptionBlock5} />
            <SquareText text={content?.squareText4} />
            <LangTest1 example={example1_2} tests={tests1_2} />
            <SquareText text={content?.squareText5} />
            <LangTest1 example={example1_3} tests={tests1_3} />
            <SquareText text={content?.squareText6} />
            <LangTest1 example={example1_4} tests={tests1_4} />
            <SquareText text={content?.squareText7} />
            <WordToTranslateBlock words={wordToTranslate2} />
            <LangTest1 example={example1_5} tests={tests1_5} />
            <LangTest1 example={example1_6} tests={tests1_6} />
    

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 11 (часть 3)"}
          lessonLinkPageUPname={"Урок 1"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 