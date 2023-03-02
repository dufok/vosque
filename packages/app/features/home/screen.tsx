import {
  Button,
  H1,
  H3,
  H5,
  Paragraph,
  Separator,
  XStack,
  YStack,
  Image,
  Avatar
} from "@my/ui";
import React, { useRef, useEffect,  useState } from "react";
import { useLink } from "solito/link";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import '../../background.css';


export function HomeScreen() {
  const { signOut, userId } = useAuth();
  const userLinkProps = useLink({
    href: "/user/nate",
  });
  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });
  const lesson1Props = useLink({
    href: "/lesson1",
  });

  const { data, isLoading, error } = trpc.entry.all.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  
  /*if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  }*/

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="flex-start" className="background-image" miw={500} space="$6">
      <YStack>
          <Image
            als="center"
            src="https://link.us1.storjshare.io/raw/jx3mkaq7sfl37heqxnwzlw5mglhq/vosque/images/Logo.png"
            accessibilityLabel="vosque logo"
            width={400}
            height={200}
          />
        <H1 ta="center" tt="uppercase" fos={50} fow="$4" mt="$20" mb="$20" >
          Курс аргентинского испанского языка
        </H1>
      </YStack>
      <YStack ai="center" >
        <Paragraph miw={500} maw={800} ta='center'>
          Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
        </Paragraph>
        <XStack m="$5" jc='space-around' ai="flex-start" fw='wrap' maw={1600}>
          <YStack
              p="$4"
              bw={1}
              boc="$color1"
              bc="$background"
              br="$10" 
              w={400}
              shadowColor={"$shadowColor"}
              shadowRadius={15}
              shadowOffset={{ width: 0, height: 4 }}
              space="$4"
              m="$4"
              >
            <H5 ta="center" mt="$2" color="$color1" maw={350}>
              Курс аргентинского испанского языка
            </H5>
            <Separator />
            <Paragraph ta="center" maw={350} >
              Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
            </Paragraph>
          </YStack>
          <YStack
            bw={1}
            boc="$color1"
            bc="$background"
            br="$10" 
            w={400}
            p="$4"
            shadowColor={"$shadowColor"}
            shadowRadius={15}
            shadowOffset={{ width: 0, height: 4 }}
            space="$4"
            m="$4"
            >
            <H5 ta="center" mt="$2" color="$color1" maw={350} >
              Культурный контекст
            </H5>
            <Separator />
            <Paragraph ta='center' maw={350} >
              Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
            </Paragraph>
          </YStack>
          <YStack
            bw={1}
            boc="$color1"
            bc="$background"
            br="$10" 
            w={400}
            p="$4"
            shadowColor={"$shadowColor"}
            shadowRadius={15}
            shadowOffset={{ width: 0, height: 4 }}
            space="$4"
            m="$4"
            >
            <H5 ta="center" mt="$2" color="$color1" maw={350} >
              Структура языка
            </H5>
            <Separator />
            <Paragraph ta='center' maw={350} >
              Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
            </Paragraph>
          </YStack>  
        </XStack>
      </YStack> 
      <YStack f={1} ai="center" mt='$20' pt='$10' pb='$10' space="$6" backgroundColor="$color1">
        <Avatar circular size="$20">
          <Avatar.Image
            accessibilityLabel="Анастасия Лукьянова"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$backgroundHover" />
        </Avatar>
        <YStack maw={800}>
          <H3 ta="center" >Анастасия Лукьянова</H3>
          <H1 ta="center" >Куратор курса</H1>
          <Paragraph ta="center">
            Я - билингв, носитель русского и испанских языков. Родившись в Эквадоре, в 5 лет я переехала в Россию, в 16 поступила в МГУ на филологический факультет, в 19 отправилась на стажировку в Мексику, а в 23, закончив университет с красным дипломом по специальности "Преподаватель и переводчик испанского языка", переехала в Аргентину. Уже 10 лет я преподаю язык и рада делиться своими знаниями и опытом.
          </Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <H1 ta="center">Отзывы</H1>
        <Paragraph ta="center">
          Что говорят наши студенты
        </Paragraph>
        <Separator />
        <XStack jc='space-around' fw='wrap' maw={1600} space="$6" >
          <YStack maw={300}>
            <H3 ta="center">Александр</H3>
            <Paragraph>
              Я уже несколько лет изучаю испанский язык, но никак не могу выучить грамматику. В этом курсе я научился грамматике и разговорной речи одновременно. Спасибо!
            </Paragraph>
          </YStack>
          <YStack maw={300}>
            <H3 ta="center">Александра</H3>
            <Paragraph>
              Я уже несколько лет изучаю испанский язык, но никак не могу выучить грамматику. В этом курсе я научился грамматике и разговорной речи одновременно. Спасибо!
            </Paragraph>
          </YStack>
          <YStack maw={300}>
            <H3 ta="center">Александр</H3>
            <Paragraph>
              Я уже несколько лет изучаю испанский язык, но никак не могу выучить грамматику. В этом курсе я научился грамматике и разговорной речи одновременно. Спасибо!
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>
      <YStack mt='$20' maw={1600}>
        <H1 ta="center">Подробнее о курсе</H1> 
        <Paragraph ta="center">
          Почему он самый лучший ?
        </Paragraph>
        <Separator />
        <XStack jc='space-around' ai='baseline' fw='wrap' space="$6">
          <YStack
            bw={1}
            boc="$color1"
            bc="$background"
            br="$10" 
            w={400}
            p="$4"
            shadowColor={"$shadowColor"}
            shadowRadius={15}
            shadowOffset={{ width: 0, height: 4 }}
            >
            <H3 ta="center">Видео с профессиональным преподавателем-билингвом</H3>
            <Paragraph>
              Видео, которые приятно и интересно смотреть. Анастасия - носитель испанского и русского языков - доступно ведет уроки, объясняя все правила, давая примеры и рассказывая про разные жизненные ситуации, с которыми Вы можете столкнуться.
            </Paragraph>
          </YStack>
          <YStack
            bw={1}
            boc="$color1"
            bc="$background"
            br="$10" 
            w={400}
            p="$4"
            shadowColor={"$shadowColor"}
            shadowRadius={15}
            shadowOffset={{ width: 0, height: 4 }}
            >
            <H3 ta="center">Теория на доступном</H3>
            <Paragraph maw={350} ta='center'>
              После каждого видео Вы увидите теоретический блок - в котором вся теория разложена по полочкам в таблицы для удобства визуального восприятия
            </Paragraph>
          </YStack>
          <YStack
            bw={1}
            boc="$color1"
            bc="$background"
            br="$10" 
            w={400}
            p="$4"
            shadowColor={"$shadowColor"}
            shadowRadius={15}
            shadowOffset={{ width: 0, height: 4 }}
            >
            <H3 ta="center">Практика</H3>
            <Paragraph maw={350} ta='center'>
              После каждого видео Вы увидите теоретический блок - в котором вся теория разложена по полочкам в таблицы для удобства визуального восприятия
            </Paragraph>
          </YStack>
          <YStack
            bw={1}
            boc="$color1"
            bc="$background"
            br="$10" 
            w={400}
            p="$4"
            shadowColor={"$shadowColor"}
            shadowRadius={15}
            shadowOffset={{ width: 0, height: 4 }}
            >
            <H3 ta="center">Видео диалогов между носителями на каждую пройденную тему!</H3>
            <Paragraph maw={350} ta='center'>
              Это уникально! В конце каждого грамматического урока Вас ждут видео, записаные специально для этого курса носителями языка:
              Вы не просто учите материал, Вы сразу видите, как использовать его в живую!
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>
      <YStack pt='$10' pb='$10' backgroundColor="$backgroundFocus" >
        <H1 fow='200' >
          записаться
        </H1>
      </YStack>
      <XStack space>
        <Button {...lesson1Props} theme={"gray"}>
          Lesson 1 (text)
        </Button>
      </XStack>
      <XStack space>
        <Button {...userLinkProps} theme={"gray"}>
          User Page(Routing)
        </Button>
      </XStack>
      <SignedOut>
        <XStack space ai="center">
          <Button {...signInLinkProps} theme={"gray"}>
            Sign In(Clerk)
          </Button>
          <Button {...signUpLinkProps} theme={"gray"}>
            Sign Up(Clerk)
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Button
          onPress={() => {
            signOut();
          }}
          theme={"red"}
        >
          Sign Out
        </Button>
      </SignedIn>
      <YStack p="$2">
        <Paragraph>tRPC Query Demo</Paragraph>
        {data?.map((entry) => (
          <Paragraph opacity={0.5} key={entry.id}>
            {entry.id}
          </Paragraph>
        ))}
      </YStack>
    </YStack>
  );
}