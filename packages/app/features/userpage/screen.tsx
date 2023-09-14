import React, { useEffect, useState } from "react";
import {
  YStack,
  XStack,
  H2,
  H3,
  H5,
  Paragraph,
  Button,
  Input,
  Image,
  Avatar,
  Anchor,
  Stack } from "@my/ui";
import { useLink } from "solito/link";
import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";
import { trpc } from "app/utils/trpc";
import { SignedIn, SignedOut, useAuth } from "app/utils/clerk";
import { SubMenu } from '@my/ui/src/components/SubMenu';
import { useSignUp } from "app/utils/clerk";
import { useRouter } from "solito/router";

import { ParagraphCustom } from '@my/ui/src/components/CustomText'
import { SignUpSignInComponent } from '@my/ui/src/components/SignUpSignIn'

import { Analytics } from '@vercel/analytics/react';


export function userpageScreen() {

  const { isSignedIn, isLoaded } = useAuth();
  const [isUserLessonsLoading, setUserLessonsLoading] = useState(false);
  const [isUserPacksLoading, setUserPacksLoading] = useState(false);
  const userpageLinkProps = useLink({ href: "/userpage"});
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const router = useRouter();

  /* useEffect(() => {
    if (!isSignedIn && isLoaded) {
      router.push("/signup");
    }
  }, [isSignedIn]); */
  
  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if ((isLoading || isUserLessonsLoading || isUserPacksLoading) && !data) {
    return <SpinnerOver />;
  }
  
  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="space-between">
      <YStack>
        <HeaderComp />
        { isSignedIn && (
            <>
              <Welcome onUserLessonsLoadingChange={setUserLessonsLoading} onUserPacksLoadingChange={setUserPacksLoading} />
              <Login />
              <Lessons onUserLessonsLoadingChange={setUserLessonsLoading}/>
            </>
          )
        }
        {
          !isSignedIn && (
            <>
              <YStack mt={70} />
              <Login />
              <Message />
            </>
          )
        }
      </YStack>
      <SubMenu userpageLinkProps={userpageLinkProps}/>
      <Analytics />
    </YStack>
  );
}

function Welcome({ onUserLessonsLoadingChange, onUserPacksLoadingChange }) {

  const { data: currentUser } = trpc.user.current.useQuery();
  const { data: userLessons, isLoading: isUserLessonsLoading } = trpc.user.userLessons.useQuery();
  const { data: userPacks, isLoading: isUserPacksLoading } = trpc.user.userLessonPacks.useQuery();

  useEffect(() => {
    if (userLessons) {
      onUserLessonsLoadingChange(isUserLessonsLoading);
    }
  }, [isUserLessonsLoading, userLessons]);
  
  useEffect(() => {
    if (userPacks) {
      onUserPacksLoadingChange(isUserPacksLoading);
    }
  }, [isUserPacksLoading, userPacks]);

  const filteredUserLessons =  Array.isArray(userLessons) ? userLessons.filter(lesson => lesson.name.toLowerCase().includes("урок")) : [];
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

function Lessons({ onUserLessonsLoadingChange}) {

  const { data: userLessons, isLoading: isUserLessonsLoading } = trpc.user.userLessons.useQuery();
  const filteredUserLessons =  Array.isArray(userLessons) ? userLessons.filter(lesson => lesson.name.toLowerCase().includes("урок")) : [];

  useEffect(() => {
    if (userLessons) {
      onUserLessonsLoadingChange(isUserLessonsLoading);
    }
  }, [isUserLessonsLoading, userLessons]);

  const lessonCount = filteredUserLessons.length;

  type ContentLesson = {
    image: string;
    href: string;
    description: string;
  }

  /* const contentLessons = userLessons?.map((lesson) => lesson.content) as ContentLesson[]; */

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
        <Paragraph pb="$4" ta="center">Список Уроков:</Paragraph>
        <XStack p="$2" fw="wrap" w="100%" maw={1000} jc="center">
          <YStack jc="flex-start" m="$1" $gtSm={{ width : '40%' }} w="90%">
            {filteredUserLessons?.slice(0, Math.floor(filteredUserLessons?.length / 2)).map(renderLesson)}
          </YStack>
          <YStack jc="flex-start" m="$1" $gtSm={{ width : '40%' }} w="90%">
            {filteredUserLessons?.slice(Math.floor(filteredUserLessons?.length / 2)).map(renderLesson)}
          </YStack>
        </XStack>
        { lessonCount === 0 && (
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

function Message() {

  const { push } = useRouter();

  const { isLoaded, signUp, setSession } = useSignUp();

  if (!setSession || !isLoaded) return null;

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    await signUp.create({
      emailAddress,
      password,
    });

    await signUp.prepareEmailAddressVerification();
    push("/signup/email-verification");
  };

  return (
    <YStack f={1} ai="center" >
      <YStack p='$5' maw={800} space="$4">
        <H2 ta="center">Добро пожаловать на платформу VOSQUE:</H2>
        <H3 ta="left">
          Получите практические навыки общения в Аргентине с нашим курсом! Разберитесь в местных особенностях и наконец-то научитесь эффективно взаимодействовать в аргентинской культуре!
        </H3>
        <H2 ta="center">
          Регистрация
        </H2>
        <ParagraphCustom text={"Присоединяйтесь к нам и наконец-то разберитесь с тем, как «работает» испанский язык! Мы предлагаем вам уникальную возможность оценить ^структуру и качество обучения^ в VOSQUE, а также узнать, как Анастасия, наш профессиональный преподаватель, может помочь вам овладеть испанским языком."}/>
      </YStack>
      <SignUpSignInComponent type='sign-up' handleEmailWithPress={handleEmailSignUpWithPress}/>
      <YStack p='$5' maw={800} space="$4">
        <H2 ta="center">
          Что вы получите на бесплатном уроке?
        </H2>
        <Paragraph ta="left">На вашем бесплатном уроке вы сможете:</Paragraph>
        <ParagraphCustom text={"Оценить уникальную методику обучения, которая придаст ^структуру и логику^ вашему изучению испанского языка. Познакомиться с нашим профессиональным преподавателем, посмотрев первый урок в записи. Убедиться, что даже если вы уже обучались испанскому языку на других курсах, теперь у вас есть возможность систематизировать разрозненные знания и наконец-то начать использовать язык в живом общении!"}/>
        <H3 ta="center">Преимущества VOSQUE</H3>
        <ParagraphCustom text={"^Гибкий график:^ Наши уроки доступны 24/7, чтобы подходить вашему графику."}/>
        <ParagraphCustom text={"^Качественное обучение:^ Анастасия, наш опытный преподаватель, объяснит Вам структуру языка, разложит все правила и темы по полочкам и наглядно покажет, как начать говорить с аргентинцами уже после второго урока!"}/>
        <ParagraphCustom text={"^Погружение в аргентинские реалии:^ Мы предлагаем уроки, которые позволят вам не только выучить язык, но и получить лайфхаки ^о жизни и общении в Аргентине^. Советы по более корректному употреблению слов, уместным реакциям, которые помогут вам попросить помощи, получить информацию и просто добиться результата в любой ситуации - все это и многое другое на курсе VOSQUE!"}/>
        <H2 ta="center">
          Как начать свое учебное путешествие?
        </H2>
        <ParagraphCustom text={"1. Заполните форму для регистрации, чтобы создать свой аккаунт на платформе VOSQUE."}/>
        <ParagraphCustom text={"2. После регистрации, вы получите мгновенный доступ к вашему бесплатному уроку."}/>
        <ParagraphCustom text={"3. Начните свое обучение испанскому языку с профессиональным ^структурированным подходом^ и опытным преподавателем."}/>
        <H2 ta="center">
          Поддержка и помощь
        </H2>
        <Paragraph>
          Если у вас возникли вопросы или затруднения, наша команда готова вам помочь. Свяжитесь с нами в телеграм: <Anchor href="https://t.me/vosque_help" target="_blank" rel="noopener noreferrer">vosque_help</Anchor>
        </Paragraph>
        <ParagraphCustom text={"Не упустите свой шанс начать свое обучение испанскому языку с профессиональным ^структурированным подходом^ и опытным преподавателем!"}/>
      </YStack>
    </YStack>
  );
}
