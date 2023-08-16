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
import { ExercisesBlockText } from "@my/ui/src/components/ExercisesBlockText";
import { NavigationBlock } from "@my/ui/src/components/NavigationBlock";
import { TableBlock } from "@my/ui/src/components/TableBlock";
import { LangTest1 } from "@my/ui/src/components/LangTest1";
import { LangTest4 } from "@my/ui/src/components/LangTest4";
import { LifeHackerBlock } from "@my/ui/src/components/LifeHackerBlock";
import { DopDialog } from "@my/ui/src/components/DopDialog";

import { ContentLesson9 } from './type_Lesson9';
import { ContentLesson9_2 } from './type_Lesson9';

export function lesson9Screen() {
  const userpageLinkProps = useLink({ href: "/userpage"});

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <SpinnerOver />;
  }
  
  return (
    <YStack f={1} jc="space-between">
      <YStack>
        <HeaderComp />
        { isSignedIn ? <Lesson9SignIn /> : null}
      </YStack>
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}

function Lesson9SignIn() {

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

  const { data, isLoading, error } = trpc.entry.all.useQuery();
  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();
  const isLoadingOverall = userLessonsLoading || isLoading;
  const lessonLinkPageUP = useLink({ href: "/lesson10"});
  const lessonLinkPageDown = useLink({ href: "/lesson8"});
  if (isLoadingOverall) {
      return <SpinnerOver />;
    }

  const lessonName = "урок 9";
  const NinthLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  const partName =  "l9p2";
  const NinthPartTwoLesson = userLessons?.find(lesson => lesson.name === partName);

  // Part Content

  const content = NinthLesson?.content as ContentLesson9;
  const content2 = NinthPartTwoLesson?.content as ContentLesson9_2;

  const textExample1 = Object.values(content?.textExampleBlock1 || {});
  const tests4_1 = Object.values(content?.langTest4_1.testContent || {});
  const example4_1 = content?.langTest4_1.example;
  const tests1_1 = Object.values(content?.langTest1_1.testContent || {});
  const example1_1 = content?.langTest1_1.example;

  // Part Content 2

  const textExample2 = Object.values(content2?.textExampleBlock1 || {});
  const tests4_2 = Object.values(content2?.langTest4_1.testContent || {});
  const example4_2 = content2?.langTest4_1.example;
  const tests1_2 = Object.values(content2?.langTest1_1.testContent || {});
  const example1_2 = content2?.langTest1_1.example;
  const exercises1 = Object.values(content2?.exercisesBlockText1 || {});
  const tests1_3 = Object.values(content2?.langTest1_2.testContent || {});
  const example1_3 = content2?.langTest1_2.example;
  
  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1}>
    {isLoadingOverall && <SpinnerOver />}
    <YStack ai="center" mt="$10">
      <WelcomeBlock
        name={NinthLesson?.name}
        description={content?.description}/>
        <YStack  w="100%" $gtSm={{ width: "70%" }}>
          <VideoPlayer linkVideo={content?.video}/>
        </YStack>
      <ImageCircle img={content?.image}/>

      <HeaderBlock header={content?.headerBlock1}/>
        {isOpen && (
          <> 
            <HeaderBlock header={content?.headerBlock3}/>
            <TextExampleBlock textExamples={textExample1}/>
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
            <TableBlock table={content?.tableBlock4 } />
            <TableBlock table={content?.tableBlock5 } />
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

      <HeaderBlock header={content?.headerBlock2} />
      <SquareText text={content?.squareText1} />
      <LangTest4 example={example4_1} tests={tests4_1} />
      <SquareText text={content?.squareText2} />
      <LangTest1 example={example1_1} tests={tests1_1} />

      <WelcomeBlock
        name={content2?.name}
        description={content2?.description}/>
        <YStack  w="100%" $gtSm={{ width: "70%" }}>
          <VideoPlayer linkVideo={content2?.video}/>
        </YStack>

      <HeaderBlock header={content2?.headerBlock1}/>
        {isOpen2 && (
          <>
            <HeaderBlock header={content2?.headerBlock7}/>
            <TextExampleBlock textExamples={textExample2}/>
            <TableBlock table={content2?.tableBlock1} />
            <TableBlock table={content2?.tableBlock2} />
            <TableBlock table={content2?.tableBlock3} />
            <TableBlock table={content2?.tableBlock4} />
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
            <TableBlock table={content2?.tableBlock5} />
          </>
        )}
      <Button
      w={100}
      h={30}
      bw={1}
      br="$2"
      bg="$backgroundFocus"
      icon={isOpen2 ? ChevronUp : ChevronDown } color="$background" onPress={() => {toggleOpen2()}}/>

      {/* Блок Упражнений */}

      <HeaderBlock header={content2?.headerBlock2} />
      <SquareText text={content2?.squareText1} />
      <LangTest4 example={example4_2} tests={tests4_2} />
      <SquareText text={content2?.squareText2} />
      <LangTest1 example={example1_2} tests={tests1_2} />

      <HeaderBlock header={content2?.headerBlock3} />
      <YStack  mt="$4" w="100%" $gtSm={{ width: "70%" }}>
        <VideoPlayer linkVideo={content2?.video3}/>
      </YStack>

      {/* Время */}

      <HeaderBlock header={content2?.headerBlock4} />
      <ExercisesBlockText exercises={exercises1} />

      {/* Домашнее Задание */}

      <HeaderBlock header={content2?.headerBlock5} />
      <SquareText text={content2?.squareText3} />
      <LangTest1 example={example1_3} tests={tests1_3} />
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

              {/* Дополнительные материалы */}

      <HeaderBlock header={content2?.headerBlock6} />
      <DopDialog contents={content2?.dopDialog1}/>

    </YStack>
  <NavigationBlock
    lessonLinkPageDOWNname={"Урок 8"}
    lessonLinkPageUPname={"Урок 10"}
    lessonLinkPageUP={lessonLinkPageUP} 
    lessonLinkPageDOWN={lessonLinkPageDown}/>
</YStack>
  );
} 