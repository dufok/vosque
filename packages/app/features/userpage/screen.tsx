import React, { useEffect, useState } from "react";
import { YStack, XStack, H3, H5, Paragraph, Button, Input, Image, Spinner, Avatar, Anchor, Stack } from "@my/ui";
import { useLink } from "solito/link";
import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";
import { trpc } from "app/utils/trpc";
import { SignedIn, SignedOut, useAuth } from "app/utils/clerk";
import { SubMenu } from '@my/ui/src/components/SubMenu';
import { useRouter } from "next/router";

import { Analytics } from '@vercel/analytics/react';


export function userpageScreen() {

  const { isSignedIn, isLoaded } = useAuth();
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data: userLessons, isLoading: isUserLessonsLoading } = trpc.user.userLessons.useQuery();
  const { data: userPacks, isLoading: isUserPacksLoading } = trpc.user.userLessonPacks.useQuery();
  const userpageLinkProps = useLink({ href: "/userpage"});
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      router.push("/signup");
    }
  }, [isSignedIn]);
  
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (!isLoaded || isLoading || isUserLessonsLoading || isUserPacksLoading) {
    return <SpinnerOver />;
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="space-between">
      <YStack>
        <HeaderComp />
        <Welcome userLessons={userLessons} userPacks={userPacks} currentUser={currentUser}/>
        <Login />
        <Lessons/>
      </YStack>
      <SubMenu userpageLinkProps={userpageLinkProps}/>
      <Analytics />
    </YStack>
  );
}

function Welcome({userLessons, userPacks, currentUser}) {

  const filteredUserLessons =  userLessons ? userLessons.filter(lesson => lesson.name.toLowerCase().includes("урок")) : [];
  const lessonCount = filteredUserLessons.length;

 return (
    <YStack bc="$backgroundFocus" ai="center" pt="$6" mt="$10">
      <YStack space="$2" ai="center" p="$4">
        <H3 col="$background" ta="center" >Hola {currentUser?.userName} !</H3>
        <H3 ta="center" col="$background">Добро пожаловать на курс!</H3>
      </YStack>
      <YStack>
        <Image source={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
          height="100%"
          width="100%"
          />
      </YStack>
      <YStack space="$3" w="90%" maw={600} ai="center">
        <YStack ai="flex-start" space="$2" p="$5">
          <Paragraph ta="left" col="$background"> 
            {Array.isArray(userPacks) ? userPacks.join(', ') : userPacks}
          </Paragraph>
          <Paragraph ta="left" col="$background"> Кол-во уроков: {lessonCount}</Paragraph>
        </YStack>
      </YStack>
    </YStack>
  );
}

function Lessons() {

  type ContentLesson = {
    image: string;
    href: string;
    description: string;
  }

  const { data: userLessons, isLoading: isUserLessonsLoading } = trpc.user.userLessons.useQuery();
  const filteredUserLessons =  userLessons ? userLessons.filter(lesson => lesson.name.toLowerCase().includes("урок")) : [];
  const lessonCount = filteredUserLessons.length;

  const isLoadingOverall = isUserLessonsLoading;

  const contentLessons = userLessons?.map((lesson) => lesson.content) as ContentLesson[];

  const courseLinkProps = useLink({href: "/course"});

  const renderLesson = (lesson) => {
    return (
    <YStack key={lesson.id} p="$2" hoverStyle={{ opacity: 0.9, scale: 1.01}}>
      <XStack ai="center">
        <Avatar circular size="$5" bg="$borderColor">
          <Avatar.Image 
            source={lesson.content?.image} scale="50%"
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$borderColor" />
        </Avatar>
        <YStack m="$2" f={1}>
          <H5>
            <Anchor
              href={lesson.content?.href}
            >{lesson.name}</Anchor></H5>
          <Paragraph ww="initial" >{lesson.content?.description}</Paragraph>
        </YStack>
      </XStack>
    </YStack>
    );
  }

  return (
    <YStack>
      <YStack pb="$6" pt="$6" ai="center" f={1}>
        { isLoadingOverall && <SpinnerOver /> }
        <Paragraph pb="$4" ta="center">Список Уроков:</Paragraph>
        <XStack p="$2" fw="wrap" w="100%" maw={1000} jc="center">
          <YStack jc="flex-start" m="$1" $gtSm={{ width : '40%' }} w="90%">
            {filteredUserLessons?.slice(0, Math.floor(filteredUserLessons?.length / 2)).map(renderLesson)}
          </YStack>
          <YStack jc="flex-start" m="$1" $gtSm={{ width : '40%' }} w="90%">
            {filteredUserLessons?.slice(Math.floor(filteredUserLessons?.length / 2)).map(renderLesson)}
          </YStack>
        </XStack>
        { !isUserLessonsLoading && lessonCount === 0 && (
          <YStack>
            <YStack pb="$6" pt="$6" ai="center" f={1}>
              <Paragraph pb="$4" ta="center" > Спасибо за Регистрацию ! Посмотрите наши курсы и выберите программу  </Paragraph>
              <Button color="$background" bc="$backgroundFocus" {...courseLinkProps}>
                Базовый курс аргентинского испанского
              </Button>
            </YStack>
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}


function Login() {
  const { signOut } = useAuth();
  const router = useRouter();
  
  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });

  return (
    <YStack pt={20} pb={20} bc="$backgroundFocus" ai="center">
      <SignedOut>
        <XStack space>
          <Button {...signInLinkProps} size="$2">
            Войти
          </Button>
          <Button {...signUpLinkProps} size="$2">
            Зарегистрироваться
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Button onPress={() => { signOut(); window.location.reload(); router.push("/")}} size="$2">
          Выйти
        </Button>
      </SignedIn>
    </YStack>
  );
}
