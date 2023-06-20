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

import { ContentLesson2 } from './type_Lesson2';
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
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";

export function lesson2Screen() {

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  
  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const SecondLesson = userLessons?.[1]; 

  //lesson content

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson3"});
  const lessonLinkPageDown = useLink({ href: "/lesson1"});

  const content = SecondLesson?.content as ContentLesson2;

  const blockText1 = Object.values(content?.blockText1 || {});
  const blockText2 = Object.values(content?.blockText2 || {});
  const tests1 = Object.values(content?.test1.testContent || {});
  const example1 = content?.test1.example;
  const tests2 = Object.values(content?.test2.testContent || {});
  const example2 = content?.test2.example;
  const tests3 = Object.values(content?.test3.testContent || {});
  const example3 = content?.test3.example;
  const wordToTranslateBlock1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslateBlock2 = Object.values(content?.wordToTranslateBlock2 || {});
  const wordToTranslateBlock3 = Object.values(content?.wordToTranslateBlock3 || {});
  const wordToTranslateBlock4 = Object.values(content?.wordToTranslateBlock4 || {});


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
             name={SecondLesson?.name}
             description={content?.description}/>
             <YStack  w="100%" $gtSm={{ width: "70%" }}>
               <VideoPlayer linkVideo={content?.video}/>
             </YStack>
           <ImageCircle img={content?.image}/>

       {/* Теоритический Блок */}

       <HeaderBlock header={content?.header1}/>
       <TableBlock table={content?.tableBlock1}/>

       {/* Важные Исключения */}

       <SquareText text={content?.squareText1}/>
       <ExercisesBlockText exercises={blockText1}/>

       {/*  Множественное число */}

       <HeaderBlock header={content?.headerBlock2}/>
       <ExercisesBlockText exercises={blockText2}/>

       {/*  Неопределенный Артикль */}

       <HeaderBlock header={content?.headerBlock3}/>
        <TableBlock table={content?.tableBlock2}/>
        <LifeHackerBlock
          lifehackimage={content?.lifehack1.image}
          lifehacktitle={content?.lifehack1.title}
          descriptions={[
            content?.lifehack1.description1,
            content?.lifehack1.description2,
            content?.lifehack1.description3,
            content?.lifehack1.description4,
          ]}
          contents={[
            content?.lifehack1.content1,
            content?.lifehack1.content2,
            content?.lifehack1.content3,
            content?.lifehack1.content4,
          ]}
        />

       {/* Определенный Артикль */}

       <TableBlock table={content?.tableBlock3}/>
       <YStack ai="center">
         <XStack fw="wrap" jc="space-around" >
            <LifeHackerBlock
              lifehackimage={content?.lifehack2.image}
              lifehacktitle={content?.lifehack2.title}
              descriptions={[
                content?.lifehack2.description1,
                content?.lifehack2.description2,
                content?.lifehack2.description3,
                content?.lifehack2.description4,
              ]}
              contents={[
                content?.lifehack2.content1,
                content?.lifehack2.content2,
                content?.lifehack2.content3,
                content?.lifehack2.content4,
              ]}
            />
           <LifeHackerBlock
            lifehackimage={content?.lifehack3.image}
            lifehacktitle={content?.lifehack3.title}
            descriptions={[
              content?.lifehack3.description1,
              content?.lifehack3.description2,
              content?.lifehack3.description3,
              content?.lifehack3.description4,
            ]}
            contents={[
              content?.lifehack3.content1,
              content?.lifehack3.content2,
              content?.lifehack3.content3,
              content?.lifehack3.content4,
            ]}
          />
         </XStack>
       </YStack>

        {/*  Теоретический блок Упражнений */}

       <HeaderBlock header={content?.header4}/>
       <SquareText text={content?.squareText4}/>
       <DescriptionBlock description={content?.description4}/>
       <LangTest1 tests={tests1} example={example1}/>
       <SquareText text={content?.squareText6}/>
       <DescriptionBlock description={content?.description5}/>
       <LangTest1 tests={tests2} example={example2}/>
       <SquareText text={content?.squareText7}/>
       <DescriptionBlock description={content?.description6}/>
       <LangTest1 tests={tests3} example={example3}/>

        {/*  Блок Лексики */}
       
       <HeaderBlock header={content?.header5}/>

       <WordToTranslateBlock words={wordToTranslateBlock1}/>

       <WordToTranslateBlock words={wordToTranslateBlock2}/>
       <SquareText text={content?.squareText5}/>
       <DescriptionBlock description={content?.description7}/>

       <WordToTranslateBlock words={wordToTranslateBlock3}/>

       <DescriptionBlock description={content?.description8}/>
       <TableBlock table={content?.tableBlock4}/>
       <LifeHackerBlock
            lifehackimage={content?.lifehack4.image}
            lifehacktitle={content?.lifehack4.title}
            descriptions={[
              content?.lifehack4.description1,
              content?.lifehack4.description2,
              content?.lifehack4.description3,
              content?.lifehack4.description4,
            ]}
            contents={[
              content?.lifehack4.content1,
              content?.lifehack4.content2,
              content?.lifehack4.content3,
              content?.lifehack4.content4,
            ]}
        />
       <SquareText text={content?.squareText8}/>

       <WordToTranslateBlock words={wordToTranslateBlock4}/>

       </YStack>
       <NavigationBlock
        lessonLinkPageDOWNname={"Урок 1"}
        lessonLinkPageUPname={"Урок 3"}
        lessonLinkPageUP={lessonLinkPageUP}
        lessonLinkPageDOWN={lessonLinkPageDown}/>
       </YStack>
      )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 
