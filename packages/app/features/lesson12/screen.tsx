import {
  Paragraph,
  YStack,
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
import { DescriptionBlock } from "@my/ui/src/components/DescriptionBlock";
import { TextExampleBlock } from "@my/ui/src/components/TextExampleBlock";
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest3 } from "@my/ui/src/components/LangTest3";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { WordToTranslateBlock } from "@my/ui/src/components/WordToTranslateBlock";
import { DopDialog } from "@my/ui/src/components/DopDialog";

import { ContentLesson12 } from './type_Lesson12';

export function lesson12Screen() {

  //Open or close treory block

    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

  // Part Config

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();
  const isLoadingOverall = userLessonsLoading || isLoading;
  const lessonName = "урок 12";
  const TwelfthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  // Part Content

  const content = TwelfthLesson?.content as ContentLesson12;

  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson1"});
  const lessonLinkPageDown = useLink({ href: "/lesson11"});

  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const exercises2 = Object.values(content?.exercisesBlockText2 || {});
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
  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const wordToTranslate1 = Object.values(content?.wordToTranslateBlock1 || {});
  const wordToTranslate2 = Object.values(content?.wordToTranslateBlock2 || {});

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
              name={TwelfthLesson?.name}
              description={content?.description}/>
              <YStack  w="100%" $gtSm={{ width: "70%" }}>
                <VideoPlayer linkVideo={content?.video}/>
              </YStack>
            <ImageCircle img={content?.image}/>

            <HeaderBlock header={content?.headerBlock1}/>

            <AnimatePresence>
              {isOpen && (
                <YStack
                enterStyle={{opacity: 0, y: -100}}
                animation='bouncy'
                > 
                  <ExercisesBlockText exercises={exercises1} />
                  <TableBlock table={content?.tableBlock1} />
                  <TableBlock table={content?.tableBlock2} />
                  <TableBlock table={content?.tableBlock3} />
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

            <HeaderBlock header={content?.headerBlock2} />
            <SquareText text={content?.squareText1} />
            <LangTest3 example={example3_1} tests={tests3_1} isOneColumn/>
            <SquareText text={content?.squareText2} />
            <LangTest1 example={example1_1} tests={tests1_1} />

            <HeaderBlock header={content?.headerBlock3} />
            <ExercisesBlockText exercises={exercises2} />

            <TableBlock table={content?.tableBlock4} />
            <TableBlock table={content?.tableBlock5} />
            <TextExampleBlock textExamples={textExample1}/>
            <SquareText text={content?.squareText3} />
            <DescriptionBlock description={content?.descriptionBlock4} />
            <WordToTranslateBlock words={wordToTranslate1} />
            <YStack mt="$5" />
            <DescriptionBlock description={content?.descriptionBlock5} />
            <SquareText text={content?.squareText4} />
            <LangTest1 example={example1_2} tests={tests1_2} />
            <SquareText text={content?.squareText5} />
            <LangTest1 example={example1_3} tests={tests1_3} />
            <SquareText text={content?.squareText6} />
            <LangTest1 example={example1_4} tests={tests1_4} />
            <SquareText text={content?.squareText7} />
            <WordToTranslateBlock words={wordToTranslate2} />
            <LangTest1 example={example1_5} tests={tests1_5} isOneColumn/>
            <LangTest1 example={example1_6} tests={tests1_6} isOneColumn/>
            <HeaderBlock header={content?.headerBlock3} />
            <DopDialog contents={content?.dopDialog1}/>

          </YStack>
        <NavigationBlock
          lessonLinkPageDOWNname={"Урок 11 (часть 3)"}
          lessonLinkPageUPname={"Урок 1"}
          lessonLinkPageUP={lessonLinkPageUP} 
          lessonLinkPageDOWN={lessonLinkPageDown}/>
      </YStack>
    )}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
  </YStack>
);
} 