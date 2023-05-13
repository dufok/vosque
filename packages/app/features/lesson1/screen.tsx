import {
  Paragraph,
  YStack,
  XStack,
  H1,
  H2,
  H3,
  Image,
  Button,
  Separator,
  Spinner,
  Avatar
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect} from "react";
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';

import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { ParagraphCustom } from '@my/ui/src/components/CustomText';
import { ContentLesson1 } from './type_Lesson1';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { AudioPlayer } from "@my/ui/src/components/AudioPlayer";
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";


export function lesson1Screen() {
  //hrefs
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPageUP = useLink({ href: "/lesson2"});
  const lessonLinkPageDown = useLink({ href: "/lesson1"});

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  //lesson content
  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const firstLesson = userLessons?.[0];

  //part with types from file json full
  const content = firstLesson?.content as ContentLesson1;

  const letters = Object.values(content?.theoreticalBlock.complex.letters || {});

  const atentionBlocks = content?.theoreticalBlock.attention.AtentionBlocks;
  const exercises = content?.exercisesBlock.training1.exercises;
  const exercises2 = content?.exercisesBlock.training2.exercises2;
  const linesAdditional = content?.exercisesBlock.additional.materials.readingPhrase.linesAdditional;
  
  const ContentAccents = Object.values(content?.exercisesBlock.accent.contentAccents || {});

  const lifehack1 = content?.lifehacks.lifehack1;
  const lifehack2 = content?.lifehacks.lifehack2;
  const lifehack3 = content?.lifehacks.lifehack3;
  const contentVocabularys = content?.vocabulary.contentVocabularys;

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
      { isSignedIn && (
        <YStack>
          <Welcome
            name={firstLesson?.name}
            description={content?.description}/>
          <VideoPlayer
            linkVideo={content?.video}/>
          <ImageCircle img={content?.image}/>

          

         
        </YStack>
      )}

     
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }

  // Welcome Block
  function Welcome({name, description}) {
    return (
      <YStack ai="center" mt="$6" mb="$4">
          <H3 tt="uppercase" ta="center"> Добро пожаловать на {name}</H3>
          <Paragraph p="$2" ta="center">{description}</Paragraph>
      </YStack>
    );
  }

  //*
  // Image block

  function ImageCircle({img}) {
    return (

      <YStack ai="center" mt="$6" >
        <Avatar circular size="$4" backgroundColor="$backgroundFocus">
          <Avatar.Image src={img}/>
          <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
        </Avatar>
      </YStack>

    );
  }

  