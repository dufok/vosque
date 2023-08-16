import {
  Paragraph,
  YStack,
  Button,
  AnimatePresence
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect,useState} from "react";
import { useAuth } from "app/utils/clerk";
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
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { DopDialog } from "@my/ui/src/components/DopDialog";

import { ContentLesson8 } from './type_Lesson8';

export function lesson8Screen() {
  const userpageLinkProps = useLink({ href: "/userpage"});

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <SpinnerOver />;
  }
  
  return (
    <YStack f={1} jc="space-between">
      <YStack>
        <HeaderComp />
        { isSignedIn ? <Lesson8SignIn /> : null}
      </YStack>
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}

function Lesson8SignIn() {

    //Open or close treory block

    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    // Part Config
    const lessonLinkPageUP = useLink({ href: "/lesson9"});
    const lessonLinkPageDown = useLink({ href: "/lesson7"});
  
    const { data, isLoading, error } = trpc.entry.all.useQuery();
    useEffect(() => {
      console.log(data);
    }, [isLoading]);
    const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();
    const isLoadingOverall = userLessonsLoading || isLoading;
    if (isLoadingOverall) {
      return <SpinnerOver />;
    }

    const lessonName = "урок 8";
    const EightLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));
    
    const content = EightLesson?.content as ContentLesson8;
  
    // Part Content

    const textExample1 = Object.values(content?.textExampleBlock1 || {});
    const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
    const example4_1 = content?.langTest4_1.example;
    const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
    const example1_1 = content?.langTest1_1.example;
    const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
    const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});
    const wordToTranslate3 = Object.values(content?.wordToTranslateBlock3 || {});
    const wordToTranslate4 = Object.values(content?.wordToTranslateBlock4 || {});
    const tests1_2 = Object.values(content?.langTest1_2.testContent || {});
    const example1_2 = content?.langTest1_2.example;
    const dopDialog1 = Object.values(content?.dopDialog1 || {});

    if (error) {
      return <Paragraph>{error.message}</Paragraph>;
    }
  
  return (
    <YStack f={1}>
      {isLoadingOverall && <SpinnerOver />}
      <YStack ai="center" mt="$10">
        <WelcomeBlock
          name={EightLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        <HeaderBlock header={content?.headerBlock1}/>

            {isOpen && (
              <> 
              <TextExampleBlock textExamples={textExample1}/>
              <HeaderBlock header={content?.headerBlock2} />
              <SquareText text={content?.squareText1} />
              <LangTest4 example={example4_1} tests={tests4_1} />
              <SquareText text={content?.squareText2} />
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

              <HeaderBlock header={content?.headerBlock3} />
              <SquareText text={content?.squareText3} />
              <WordToTranslateBlock words={wordToTranslate1} />
              <SquareText text={content?.squareText4} />
              <WordToTranslateBlock words={wordToTranslate2} />
              <SquareText text={content?.squareText5} />
              <WordToTranslateBlock words={wordToTranslate3} />
              <SquareText text={content?.squareText6} />
              <WordToTranslateBlock words={wordToTranslate4} />
            </>
          )}
        <Button
        w={100}
        h={30}
        bw={1}
        br="$2"
        bg="$backgroundFocus"
        icon={isOpen ? ChevronUp : ChevronDown } color="$background" onPress={() => {toggleOpen()}}/>


        {/* Домашнее задание */}

        <HeaderBlock header={content?.headerBlock4} />
        <SquareText text={content?.squareText7} />
        <LangTest1 example={example1_2} tests={tests1_2} />

        {/* Дополнительные материалы */}

        <HeaderBlock header={content?.headerBlock5} />
        <DopDialog contents={content?.dopDialog1}/>

      </YStack>
      <NavigationBlock
        lessonLinkPageDOWNname={"Урок 7"}
        lessonLinkPageUPname={"Урок 9"}
        lessonLinkPageUP={lessonLinkPageUP} 
        lessonLinkPageDOWN={lessonLinkPageDown}/>
    </YStack>
  );
} 