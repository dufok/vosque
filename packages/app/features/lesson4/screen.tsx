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

import { ContentLesson4 } from './type_Lesson4';
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
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { ExercisesBlockAudio } from "@my/ui/src/components/ExercisesBlockAudio";
import { DopDialog } from "@my/ui/src/components/DopDialog";

export function lesson4Screen() {

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const lessonName = "урок 4";
  const FourthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));
  
  //CONSTS

  const content = FourthLesson?.content as ContentLesson4;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson5"});
  const lessonLinkPageDown = useLink({ href: "/lesson3"});

  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const textExample2 = Object.values(content?.textExampleBlock2 || {});
  const textExample3 = Object.values(content?.textExampleBlock3 || {});
  const textExample4 = Object.values(content?.textExampleBlock4 || {});
  const textExample5 = Object.values(content?.textExampleBlock5 || {});
  const textExample8 = Object.values(content?.textExampleBlock8 || {});
  const textExample9 = Object.values(content?.textExampleBlock9 || {});
  const textExample10 = Object.values(content?.textExampleBlock10 || {});
  const textExample11 = Object.values(content?.textExampleBlock11 || {});
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;
  const tests1_3 = Object.values(content?.langTest1_3.testContent || {});
  const example1_3 = content?.langTest1_3.example;
  const tests1_4 = Object.values(content?.langTest1_4.testContent || {});
  const example1_4 = content?.langTest1_4.example;
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
  const wordToTranslate4 = Object.values(content?.wordToTranslateBlock4 || {});

  const dopDialog1 = Object.values(content?.dopDialog1 || {});
  const exercisesBlockAudio1 = Object.values(content?.exercisesBlockAudio1 || {});


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
          name={FourthLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        <HeaderBlock header={content?.headerBlock1}/>
        <TableBlock table={content?.tableBlock1} />
        <SquareText text={content?.squareText1} />
        <TextExampleBlock textExamples={textExample1}/>
        <SquareText text={content?.squareText2} />
        <TextExampleBlock textExamples={textExample2}/>

        <HeaderBlock header={content?.headerBlock3} />
        <SquareText text={content?.squareText3} />
        <LangTest1 example={example1_1} tests={tests1_1} />
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

        {/* ВСПОМНИМ ПРИЛАГАТЕЛЬНЫЕ */}

        <HeaderBlock header={content?.headerBlock2} />
        <SquareText text={content?.squareText2} />
        <DescriptionBlock description={content?.descriptionBlock3} />
        <TextExampleBlock textExamples={textExample3}/>
        <DescriptionBlock description={content?.descriptionBlock4} />
        <TextExampleBlock textExamples={textExample4}/>
        <DescriptionBlock description={content?.descriptionBlock5} />
        <TextExampleBlock textExamples={textExample5}/>
        <SquareText text={content?.squareText5} />
        <LangTest1 example={example1_2} tests={tests1_2} />

        <HeaderBlock header={content?.headerBlock4} />
        <DescriptionBlock description={content?.descriptionBlock7} />
        <SquareText text={content?.squareText8} />
        <TextExampleBlock textExamples={textExample8}/>
        <SquareText text={content?.squareText9} />
        <TextExampleBlock textExamples={textExample9}/>
        <SquareText text={content?.squareText10} />
        <LangTest1 example={example1_3} tests={tests1_3} />

        <HeaderBlock header={content?.headerBlock5} />
        <DescriptionBlock description={content?.descriptionBlock8} />
        <TextExampleBlock textExamples={textExample10}/>
        <DescriptionBlock description={content?.descriptionBlock10} />
        <TextExampleBlock textExamples={textExample11}/>
        <DescriptionBlock description={content?.descriptionBlock11} />

        <SquareText text={content?.squareText11} />
        <LangTest1 example={example1_4} tests={tests1_4} />

            {/* БЛОК ЛЕКСИКИ */}

        <HeaderBlock header={content?.headerBlock12} />
        <WordToTranslateBlock words={wordToTranslate1} />
        <SquareText text={content?.squareText12} />
        <WordToTranslateBlock words={wordToTranslate2} />
        <XStack fw="wrap" jc="center"  >
          <LifeHackerBlock
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
          <LifeHackerBlock
            lifehacktitle={content?.lifeHackerBlock3.title}
            descriptions={[
              content?.lifeHackerBlock3.description1,
              content?.lifeHackerBlock3.description2,
              content?.lifeHackerBlock3.description3,
              content?.lifeHackerBlock3.description4,
            ]}
            contents={[
              content?.lifeHackerBlock3.content1,
              content?.lifeHackerBlock3.content2,
              content?.lifeHackerBlock3.content3,
              content?.lifeHackerBlock3.content4,
            ]}
          />
        </XStack>
        <SquareText text={content?.squareText13} />
        <WordToTranslateBlock words={wordToTranslate3} />
        <SquareText text={content?.squareText14} />
        <WordToTranslateBlock words={wordToTranslate4} />

                  {/* Дополнительные материалы */}

        <HeaderBlock header={content?.headerBlock6} />

        <DopDialog contents={dopDialog1}/>
        
      </YStack>
      <NavigationBlock
        lessonLinkPageDOWNname={"Урок 3"}
        lessonLinkPageUPname={"Урок 5"}
        lessonLinkPageUP={lessonLinkPageUP} 
        lessonLinkPageDOWN={lessonLinkPageDown}/>
    </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 