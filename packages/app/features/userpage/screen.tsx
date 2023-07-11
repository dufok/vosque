import React, { useEffect, useState } from "react";
import { YStack, XStack, H3, H5, Paragraph, Button, Input, Image, Spinner, Avatar, Anchor, Stack } from "@my/ui";
import { useLink } from "solito/link";
import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import { SubMenu } from '@my/ui/src/components/SubMenu';

export function userpageScreen() {

  const userpageLinkProps = useLink({ href: "/userpage"});

  const { data: currentUser, isLoading: isCurrentUserLoading } = trpc.user.current.useQuery();
  const isSignedIn = !!currentUser;

  const { data, isLoading, error } = trpc.entry.all.useQuery();

  const { data: userLessons, isLoading: isUserLessonsLoading } = trpc.user.userLessons.useQuery();

  const filteredUserLessons =  userLessons ? userLessons.filter(lesson => lesson.name.toLowerCase().includes("урок")) : [];
  const lessonCount = filteredUserLessons.length;

  
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isSignedIn) {
    if ( isLoading || isCurrentUserLoading || isUserLessonsLoading ) {
    return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
  }}

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack>
      <HeaderComp />
      <Welcome isSignedIn={isSignedIn} currentUser={currentUser} lessonCount={lessonCount}/>
      <Login />
      <Lessons isSignedIn={isSignedIn} lessonCount={lessonCount} userLessons={filteredUserLessons} />
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}

function Welcome({ isSignedIn, currentUser, lessonCount}) {

  type LessonPack = {
    id: number;
    name: string;
  }

 return (
    <YStack bc="$backgroundFocus" ai="center" pb="$4" pt="$6" mt="$10">
        <YStack space="$4" ai="center" p="$4">
          <H3 col="$background">Hola {currentUser?.userName} !</H3>
        </YStack>
        <YStack>
          <Image source={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
            height="100%"
            width="100%"
            />
        </YStack>
        {isSignedIn && (
        <YStack space="$3" w="90%" maw={600} ai="center">
          <Paragraph mb={20} mt={10} ta="center" col="$background">Добро пожаловать на курс!</Paragraph>
          <YStack ai="flex-start" space="$2">
            <Paragraph ta="left" col="$background"> Купленный тариф: </Paragraph>
            <Paragraph ta="left" col="$background"> Сколько уроков пройдено: {lessonCount}</Paragraph>
          </YStack>
        </YStack>
        )}
        {!isSignedIn && (
          <YStack mt="$5">
            <Paragraph mb={20} ta="center" col="$background">!!! Пройдите регистрацию !!! </Paragraph>
          </YStack>
        )}
    </YStack>
  );
}

function Lessons({ isSignedIn, lessonCount, userLessons }) {

  type ContentLesson = {
    image: string;
    href: string;
    description: string;
  }

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
    {isSignedIn && (
      <YStack pb="$6" pt="$6" ai="center" f={1}>
      <Paragraph pb="$4" ta="center">Список Уроков:</Paragraph>
        <XStack p="$2" fw="wrap" w="100%" maw={1000} jc="center">
          <YStack jc="flex-start" m="$1" $gtSm={{ width : '40%' }} w="90%">
            {userLessons.slice(0, Math.floor(userLessons.length / 2)).map(renderLesson)}
          </YStack>
          <YStack jc="flex-start" m="$1" $gtSm={{ width : '40%' }} w="90%">
            {userLessons.slice(Math.floor(userLessons.length / 2)).map(renderLesson)}
          </YStack>
        </XStack>
        {lessonCount === 0 && (
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
      )}
    </YStack>
  );
}



function Login() {
  const { signOut } = useAuth();

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
            Зарегестрироваться
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Button onPress={() => { signOut(); window.location.reload(); }} size="$2">
          Выйти
        </Button>
      </SignedIn>
    </YStack>
  );
}
