import {
  Paragraph,
  YStack,
  Spinner,
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect} from "react";

import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";

import { ContentLesson6 } from './type_Lesson6';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";
import { WelcomeBlock } from "@my/ui/src/components/WelcomeBlock";
import { ImageCircle } from "@my/ui/src/components/ImageCircle";
import { HeaderBlock } from "@my/ui/src/components/HeaderBlock";
import { DescriptionBlock } from "@my/ui/src/components/DescriptionBlock";
import { TextExampleBlock } from "@my/ui/src/components/TextExampleBlock";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { DopDialog } from "@my/ui/src/components/DopDialog";

export function lesson6Screen() {

  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();
  const isLoadingOverall = userLessonsLoading || isLoading;
  const lessonName = "урок 6";
  const SixthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  // Part Content

  const content = SixthLesson?.content as ContentLesson6;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson7"});
  const lessonLinkPageDown = useLink({ href: "/lesson5"});

  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});

  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const textExample2 = Object.values(content?.textExampleBlock2 || {});
  const dopDialog1 = Object.values(content?.dopDialog1 || {});

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
      {isLoadingOverall && <SpinnerOver />}
      <HeaderComp />
      { isSignedIn && (
       <YStack f={1}>
       <YStack ai="center" mt="$10">
         <WelcomeBlock
           name={SixthLesson?.name}
           description={content?.description}/>
           <YStack  w="100%" $gtSm={{ width: "70%" }}>
             <VideoPlayer linkVideo={content?.video}/>
           </YStack>
         <ImageCircle img={content?.image}/>

         <HeaderBlock header={content?.headerBlock1}/>
         <TableBlock table={content?.tableBlock1} />
         <TableBlock table={content?.tableBlock2} />
         <DescriptionBlock description={content?.descriptionBlock1} />
         <TableBlock table={content?.tableBlock3} />

         {/* ВАЖНАЯ ИНФОРМАЦИЯ ПРО ПРЕДЛОГ “А”: */}

         <HeaderBlock header={content?.headerBlock2}/>
         <DescriptionBlock description={content?.descriptionBlock2} />
         <TextExampleBlock textExamples={textExample1}/>

         {/* УКАЗАТЕЛЬНЫЕ МЕСТОИМЕНИЯ */}

         <DescriptionBlock description={content?.descriptionBlock3} />
         <HeaderBlock header={content?.headerBlock3}/>
         <TableBlock table={content?.tableBlock4} />
         <TextExampleBlock textExamples={textExample2}/>

         {/* БЛОК УПРАЖНЕНИЙ */}

         <HeaderBlock header={content?.headerBlock4} />
         <SquareText text={content?.squareText1} />
         <LangTest4 example={example4_1} tests={tests4_1} isOneColumn/>
         <SquareText text={content?.squareText2} />
         <LangTest1 example={example1_1} tests={tests1_1} />

         <HeaderBlock header={content?.headerBlock5} />
         <WordToTranslateBlock words={wordToTranslate1} />
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

           {/* Домашнее задание */}

         <HeaderBlock header={content?.headerBlock6} />
         <SquareText text={content?.squareText3} />
         <LangTest1 example={example1_2} tests={tests1_2} isOneColumn/>

            {/* Дополнительные материалы */}

          <HeaderBlock header={content?.headerBlock7} />
          <DopDialog contents={dopDialog1}/>

       </YStack>
       <NavigationBlock
         lessonLinkPageDOWNname={"Урок 5"}
         lessonLinkPageUPname={"Урок 7"}
         lessonLinkPageUP={lessonLinkPageUP} 
         lessonLinkPageDOWN={lessonLinkPageDown}/>
     </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 