import {
  Paragraph,
  YStack,
  XStack,
  Button,
  AnimatePresence
 } from "@my/ui";
import { trpc } from "app/utils/trpc";
import { useLink } from "solito/link";
import React,{ useEffect, useState } from "react";
import { useAuth } from "app/utils/clerk";
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";

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

export function lesson1Screen() {

  const userpageLinkProps = useLink({ href: "/userpage"});

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <SpinnerOver />;
  }
  
  return (
    <YStack f={1} jc="space-between">
      <YStack>
        <HeaderComp />
        { isSignedIn ? <Lesson1SignIn /> : null}
      </YStack>
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}


function Lesson1SignIn() {
// Open or close treory block

  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

//user check for lesson

  const { data, isLoading, error } = trpc.entry.all.useQuery();
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

//lesson content

  const { data: userLessons, isLoading: userLessonsLoading } = trpc.user.userLessons.useQuery();
  const lessonLinkPageUP = useLink({ href: "/lesson2"});
  const lessonLinkPageDown = useLink({ href: "/lesson1"});
  const isLoadingOverall = userLessonsLoading || isLoading;
  if (isLoadingOverall) {
    return <SpinnerOver />;
  }
  
  const lessonName = "урок 1";
  const firstLesson = userLessons?.find(lesson => lesson.name.toLowerCase().includes(lessonName.toLowerCase()));

  //part with types from file json full

  const content = firstLesson?.content as ContentLesson1;

  const letters = Object.values(content?.buttonWithSheetBlock1 || {});
  const textExampleBlock1 = Object.values(content?.textExampleBlock1 || {});
  const textExampleBlock2 = Object.values(content?.textExampleBlock2 || {});
  const exercisesBlockAudioWithDisc1 = Object.values(content?.exercisesBlockAudioWithDisc1 || {});
  const exercisesBlockAudio1 = Object.values(content?.exercisesBlockAudio1 || {});
  const exercisesBlockAudio2 = Object.values(content?.exercisesBlockAudio2 || {});
  const exercises1 = Object.values(content?.exercisesBlockText1 || {});
  const wordToTranslateBlock1 = Object.values(content?.wordToTranslateBlock1 || {});

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1}>
      { isLoadingOverall && <SpinnerOver /> }
      <YStack ai="center" mt="$10">
        <WelcomeBlock
          name={firstLesson?.name}
          description={content?.description}/>
          <YStack  w="100%" $gtSm={{ width: "70%" }}>
            <VideoPlayer linkVideo={content?.video}/>
          </YStack>
        <ImageCircle img={content?.image}/>

        {/* ТЕОРЕТИЧЕСКИЙ БЛОК. */}

        <HeaderBlock header={content?.headerBlock1}/>
        <AnimatePresence>
        {isOpen && (
          <YStack
          enterStyle={{opacity: 0, y: -100}}
          animation='bouncy'
          ai="center"
          key={isOpen ? "open" : "closed"}
          >
            
            <SquareText text={content?.squareText1}/>
            <DescriptionBlock description={content?.descriptionBlock1}/>
            <ButtonSquereSheet letters={letters} />

            <SquareText text={content?.squareText2}/>
            <TextExampleBlock textExamples={textExampleBlock1}/>
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
            <TextExampleBlock textExamples={textExampleBlock2}/>
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
        <SquareText text={content?.squareText3}/>
        <ExercisesBlockAudioWithDisc exercises={exercisesBlockAudioWithDisc1} />

        <HeaderBlock header={content?.headerBlock3}/>
        <DescriptionBlock description={content?.descriptionBlock2}/>
        <SquareText text={content?.squareText4}/>
        <ExercisesBlockAudio exercises={exercisesBlockAudio1}/>
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
        
        <HeaderBlock header={content?.headerBlock4}/>
        <ExercisesBlockText exercises={exercises1}/>
        <SquareText text={content?.squareText5}/>
        <ExercisesBlockAudio exercises={exercisesBlockAudio2}/>
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

        <HeaderBlock header={content?.headerBlock5}/>
        <DescriptionBlock description={content?.descriptionBlock3}/>
        <WordToTranslateBlock words={wordToTranslateBlock1}/>
      </YStack>
      <NavigationBlock lessonLinkPageDOWNname={"Урок 1"} lessonLinkPageUPname={"Урок 2"} lessonLinkPageUP={lessonLinkPageUP} lessonLinkPageDOWN={lessonLinkPageDown}/>
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