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
import { useAuth } from "app/utils/clerk";
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";

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
import { LangTest1 } from "@my/ui/src/components/LangTest1";

export function lesson2Screen() {
  
  const userpageLinkProps = useLink({ href: "/userpage"});

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <SpinnerOver />;
  }
  
  return (
    <YStack>
      <HeaderComp />
        { isSignedIn ? <Lesson2SignIn /> : null}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}

function Lesson2SignIn() {

  //Open or close treory block

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();

  const lessonName = "урок 2";
  const SecondLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

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

  const isLoadingOverall = userLessonsLoading || isLoading;

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1}>
      { isLoadingOverall && <SpinnerOver /> }
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

              
        <AnimatePresence>
          {isOpen && (
            <YStack
            enterStyle={{opacity: 0, y: -100}}
            animation='bouncy'
            ai="center"
            >
              
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


        {/*  Теоретический блок Упражнений */}

       <HeaderBlock header={content?.header4}/>
       <SquareText text={content?.squareText4}/>
       <LangTest1 tests={tests1} example={example1}/>
       <SquareText text={content?.squareText6}/>
       <LangTest1 tests={tests2} example={example2}/>
       <SquareText text={content?.squareText7}/>
       <LangTest1 tests={tests3} example={example3}/>

        {/*  Блок Лексики */}
       
       <HeaderBlock header={content?.header5}/>

       <WordToTranslateBlock words={wordToTranslateBlock1}/>

       <WordToTranslateBlock words={wordToTranslateBlock2}/>
       <SquareText text={content?.squareText5}/>

       <WordToTranslateBlock words={wordToTranslateBlock3}/>

       <DescriptionBlock description={content?.description8}/>
       <TableBlock table={content?.tableBlock4}/>
       <LifeHackerBlock
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
  );
} 
