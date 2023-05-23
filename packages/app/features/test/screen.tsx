import {
  Paragraph,
  YStack,
  XStack,
  Spinner,
 } from "@my/ui";
import { useLink } from "solito/link";
import React,{useEffect} from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";

import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { ContentLesson1 } from './type_Lesson1';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";
import { WelcomeBlock } from "@my/ui/src/components/WelcomeBlock";
import { ImageCircle } from "@my/ui/src/components/ImageCircle";
import { HeaderBlock } from "@my/ui/src/components/HeaderBlock";
import { DescriptionBlock } from "@my/ui/src/components/DescriptionBlock";
import { TextExampleBlock } from "@my/ui/src/components/TextExampleBlock";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { ExercisesBlockAudioWithDisc } from "@my/ui/src/components/ExercisesBlockAudioWithDisc";
import { ExercisesBlockAudio } from "@my/ui/src/components/ExercisesBlockAudio";
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";


  export function testScreen() {

   //hrefs
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson2"});
  const lessonLinkPageDown = useLink({ href: "/lesson1"});

  //user check for lesson

  type Lesson = {
    id: number;
    name: string;
    content: ContentLesson1;
  }
  type LessonData = {
    lessons: Lesson[];
  }
  const data: LessonData = require('../../../db/seed/seed.json');
  const firstLesson = data.lessons[0];

 

 
  //part with types from file json full
  const content = firstLesson?.content as ContentLesson1;
  const letters = Object.values(content?.theoreticalBlock.complex.letters || {});
  const atentionBlocks = Object.values(content?.theoreticalBlock.attention.atentionBlocks || {});
  const exercises = Object.values(content?.exercisesBlock.training1.exercises || {});
  const linesAdditional = Object.values(content?.exercisesBlock.additional.materials.readingPhrase.linesAdditional || {});
  const exercises2 = Object.values(content?.exercisesBlock.training2.exercises2  || {});
  const ContentAccents = Object.values(content?.exercisesBlock.accent.contentAccents || {});
  const lifehack1 = content?.lifehacks.lifehack1;
  const lifehack2 = content?.lifehacks.lifehack2;
  const lifehack3 = content?.lifehacks.lifehack3;
  const contentVocabularys = Object.values(content?.vocabulary.contentVocabularys || {});


  return (
    <YStack>
      <HeaderComp />
      {/* RETURN IS SIGIN */}
        <YStack f={1}>
          <YStack ai="center">
            <WelcomeBlock
              name={firstLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

          {/* ТЕОРЕТИЧЕСКИЙ БЛОК. */}
         
            <HeaderBlock header={content?.theoreticalBlock.header}/>
            <SquareText text={content?.theoreticalBlock.alfabet.header}/>
            <HeaderBlock header={content?.theoreticalBlock.alfabet.text}/>
            <SquareText text={content?.theoreticalBlock.complex.header}/>
          
            <DescriptionBlock description={content?.theoreticalBlock.complex.description}/>
            <ButtonSquereSheet letters={letters} />
       

        {/* Обратите внимание: */}
  
            <SquareText text={content?.theoreticalBlock.attention.title}/>
            <YStack>  
              <XStack fw="wrap">
                <TextExampleBlock textExamples={atentionBlocks}/>
                  <LifeHackerBlock
                    lifehackimage={lifehack1.image}
                    lifehacktitle={lifehack1.title}
                    lifehackdescription1={lifehack1.description1}
                    lifehackcontent1_1text={lifehack1.content1[1].text}
                    lifehackcontent1_2text={lifehack1.content1[2].text}
                    lifehackcontent1_3text={lifehack1.content1[3].text}
                    lifehackdescription2={lifehack1.description2}
                    lifehackcontent2_1text={lifehack1.content2[1].text}
                    lifehackcontent2_2text={lifehack1.content2[2].text}
                    lifehackcontent2_3text={lifehack1.content2[3].text}
                  />
              </XStack>
            </YStack>
      

        {/* БЛОК УПРАЖНЕНИЙ */}

       
          <HeaderBlock header={content?.exercisesBlock.header}/>
          <SquareText text={content?.exercisesBlock.training1.header}/>
          <ExercisesBlockAudioWithDisc exercises={exercises} />
 

        {/* Дополнительные Материалы */}

        
          <HeaderBlock header={content?.exercisesBlock.additional.header}/>
          <SquareText text={content?.exercisesBlock.additional.materials.readingPhrase.description}/>
          <DescriptionBlock description={content?.exercisesBlock.additional.materials.readingPhrase.text}/>
          <ExercisesBlockAudio exercises={linesAdditional}/>
          <YStack ai="center">
            <XStack fw="wrap" jc="space-around" >
            <LifeHackerBlock
                lifehackimage={lifehack2.image}
                lifehacktitle={lifehack2.title}
                lifehackdescription1={lifehack2.description1}
                lifehackcontent1_1text={""}
                lifehackcontent1_2text={""}
                lifehackcontent1_3text={""}
                lifehackdescription2={""}
                lifehackcontent2_1text={""}
                lifehackcontent2_2text={""}
                lifehackcontent2_3text={""}
              />
              <LifeHackerBlock
                lifehackimage={lifehack3.image}
                lifehacktitle={lifehack3.title}
                lifehackdescription1={lifehack3.description1}
                lifehackcontent1_1text={""}
                lifehackcontent1_2text={""}
                lifehackcontent1_3text={""}
                lifehackdescription2={""}
                lifehackcontent2_1text={""}
                lifehackcontent2_2text={""}
                lifehackcontent2_3text={""}
              />
            </XStack>
          </YStack>
   
        {/* БЛОК УДАРЕНИЕ */}

  
          <SquareText text={content?.exercisesBlock.accent.header}/>
          <ExercisesBlockText exercises={ContentAccents}/>

        {/* БЛОК ТРЕНИРОВКА */}

          <SquareText text={content?.exercisesBlock.training2.header}/>
          <DescriptionBlock description={content?.exercisesBlock.training2.description}/>
          <ExercisesBlockAudio exercises={exercises2}/>

        {/* БЛОК  ЛЕКСИКИ */}

          <SquareText text={content?.vocabulary.header}/>
          <DescriptionBlock description={content?.vocabulary.description}/>
          <WordToTranslateBlock words={contentVocabularys}/>
       

        
      </YStack>
      <NavigationBlock lessonLinkPageDOWNname={"Урок 1"} lessonLinkPageUPname={"Урок 2"} lessonLinkPageUP={lessonLinkPageUP} lessonLinkPageDOWN={lessonLinkPageDown}/>
    </YStack>
       {/* RETURN IS SIGIN */}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }

  //ButtonSquereSheet block

  export type Letter = {
    name: string;
    description: string;
    Colum1_1: string;
    Colum2_1: string;
    Colum3_1: string;
    Colum4_1: string;
    Colum1_2: string;
    Colum2_2: string;
    Colum3_2: string;
    Colum4_2: string;
  };

  interface ButtonSquereSheetProps {
    letters: Letter[];
  }

  const ButtonSquereSheet: React.FC<ButtonSquereSheetProps> = ({ letters }) => {
    return (
      <YStack mt="$4" ai="center" f={1} maw={800}>
        <XStack jc="center" m="$4" fw='wrap' ai="center">
          {letters.map(({name, description, Colum1_1, Colum2_1, Colum3_1, Colum4_1, Colum1_2, Colum2_2, Colum3_2, Colum4_2}) => (
           <ButtonWithSheet
           key={name}
           Title={name}
           Description={description}
           Colum1_1={Colum1_1}
           Colum2_1={Colum2_1}
           Colum3_1={Colum3_1}
           Colum4_1={Colum4_1}
           Colum1_2={Colum1_2}
           Colum2_2={Colum2_2}
           Colum3_2={Colum3_2}
           Colum4_2={Colum4_2}
         />
          ))}
        </XStack>
      </YStack>
    )
  }