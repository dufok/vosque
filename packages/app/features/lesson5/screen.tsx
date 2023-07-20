import {
  Paragraph,
  YStack,
  XStack,
  Button,
  AnimatePresence
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect,useState} from "react";
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";

import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";
import { WelcomeBlock } from "@my/ui/src/components/WelcomeBlock";
import { ImageCircle } from "@my/ui/src/components/ImageCircle";
import { HeaderBlock } from "@my/ui/src/components/HeaderBlock";
import { TextExampleBlock } from "@my/ui/src/components/TextExampleBlock";
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { DopDialog } from "@my/ui/src/components/DopDialog";

import { ContentLesson5 } from './type_Lesson5';
import { ContentLesson5_2 } from './type_Lesson5';

export function lesson5Screen() {

  //Open or close treory block

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen2, setIsOpen2] = useState(true);

  const toggleOpen2 = () => {
    setIsOpen2(!isOpen2);
  };

  // Part Config
  
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons, isLoading: userLessonsLoading  } = trpc.user.userLessons.useQuery();
  const isLoadingOverall = userLessonsLoading || isLoading;
  const lessonName = "урок 5";
  const FifthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  const partName =  "l5p2";
  const FifthPartTwoLesson = userLessons?.find(lesson => lesson.name === partName);
  
  // Part Content

  const content = FifthLesson?.content as ContentLesson5;
  const content2 = FifthPartTwoLesson?.content as ContentLesson5_2;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson6"});
  const lessonLinkPageDown = useLink({ href: "/lesson4"});

  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
  const example1_2 = content?.langTest1_2.example;

  // Part 2 Content

  const textExample1 = Object.values(content2?.textExampleBlock1 || {});
  const textExample2 = Object.values(content2?.textExampleBlock2 || {});
  const tests1_3 = Object.values(content2?.langTest1_3.testContent || {});
  const example1_3 = content2?.langTest1_3.example;
  const tests1_4 = Object.values(content2?.langTest1_4.testContent || {});
  const example1_4 = content2?.langTest1_4.example;
  const tests4_2 = Object.values(content2?.langTest4_2.testContent || {});
  const example4_2 = content2?.langTest4_2.example;
  const exercises1 = Object.values(content2?.exercisesBlockText1 || {});
  const wordToTranslate2 = Object.values(content2?.wordToTranslateBlock2 || {});
  const wordToTranslate3 = Object.values(content2?.wordToTranslateBlock3 || {});
  const wordToTranslate4 = Object.values(content2?.wordToTranslateBlock4 || {});
  

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

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
            name={FifthLesson?.name}
            description={content?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content?.video}/>
            </YStack>
          <ImageCircle img={content?.image}/>


      <AnimatePresence>
        {isOpen && (
          <YStack
          enterStyle={{opacity: 0, y: -100}}
          animation='bouncy'
          > 
          <HeaderBlock header={content?.headerBlock1}/>
          <TableBlock table={content?.tableBlock1} />
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
            ]}/>
          </YStack>
        )}
      </AnimatePresence>
        <Button
        w={100}
        h={30}
        bw={1}
        br="$2"
        bg="$backgroundFocus"
        icon={isOpen ? ChevronUp : ChevronDown } color="$background" onPress={() => {toggleOpen()}}/>

          <HeaderBlock header={content?.headerBlock2}/>
          <SquareText text={content?.squareText1} />
          <LangTest4 example={example4_1} tests={tests4_1} />
          <SquareText text={content?.squareText2} />
          <LangTest1 example={example1_2} tests={tests1_2} />

          <WelcomeBlock
            name={content2?.name}
            description={content2?.description}/>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo={content2?.video}/>
            </YStack>

          <HeaderBlock header={content2?.headerBlock1}/>

          <AnimatePresence>
            {isOpen2 && (
              <YStack
              enterStyle={{opacity: 0, y: -100}}
              animation='bouncy'
              ai="center"
              >
                <SquareText text={content2?.squareText1} />
                <TextExampleBlock textExamples={textExample1}/>
                <SquareText text={content2?.squareText2} />
                <TextExampleBlock textExamples={textExample2}/>
              </YStack>
            )}
          </AnimatePresence>
          <Button
          w={100}
          h={30}
          bw={1}
          br="$2"
          bg="$backgroundFocus"
          icon={isOpen2 ? ChevronUp : ChevronDown } color="$background" onPress={() => {toggleOpen2()}}/>

          <HeaderBlock header={content2?.headerBlock2} />
          <SquareText text={content2?.squareText3} />
          <LangTest1 example={example1_3} tests={tests1_3} />
          <SquareText text={content2?.squareText4} />
          <LangTest4 example={example4_2} tests={tests4_2} isOneColumn/>

          <HeaderBlock header={content2?.headerBlock3} />  
          <ExercisesBlockText exercises={exercises1} />

          <XStack fw="wrap" jc="center">
            <LifeHackerBlock
              lifehacktitle={content2?.lifeHackerBlock1.title}
              descriptions={[
                content2?.lifeHackerBlock1.description1,
                content2?.lifeHackerBlock1.description2,
                content2?.lifeHackerBlock1.description3,
                content2?.lifeHackerBlock1.description4,
              ]}
              contents={[
                content2?.lifeHackerBlock1.content1,
                content2?.lifeHackerBlock1.content2,
                content2?.lifeHackerBlock1.content3,
                content2?.lifeHackerBlock1.content4,
              ]}
            />
            <LifeHackerBlock
              lifehacktitle={content2?.lifeHackerBlock2.title}
              descriptions={[
                content2?.lifeHackerBlock2.description1,
                content2?.lifeHackerBlock2.description2,
                content2?.lifeHackerBlock2.description3,
                content2?.lifeHackerBlock2.description4,
              ]}
              contents={[
                content2?.lifeHackerBlock2.content1,
                content2?.lifeHackerBlock2.content2,
                content2?.lifeHackerBlock2.content3,
                content2?.lifeHackerBlock2.content4,
              ]}
            />
          </XStack>
          <HeaderBlock header={content2?.headerBlock5} />
          <WordToTranslateBlock words={wordToTranslate2} />
          <SquareText text={content2?.squareText6} />
          <WordToTranslateBlock words={wordToTranslate3} />
          <SquareText text={content2?.squareText7} />
          <WordToTranslateBlock words={wordToTranslate4} />

            {/* Домашнее Задание */}

          <HeaderBlock header={content2?.headerBlock4} />
          <SquareText text={content2?.squareText5} />
          <LangTest1 example={example1_4} tests={tests1_4} />

            {/* Дополнительные материалы */}

          <HeaderBlock header={content2?.headerBlock6} />

          <DopDialog contents={content2?.dopDialog1}/>

        </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 4"}
          lessonLinkPageUPname={"Урок 6"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 