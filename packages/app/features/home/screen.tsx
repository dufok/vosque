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
  useControllableState,
  useEvent,
  Avatar,
  Stack
} from "@my/ui";
import React, { useRef, useEffect,  useState } from "react";
import { useLink } from "solito/link";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import '../../background.css';
import { useIsIntersecting } from '@my/ui/src/useOnIntersecting'


export function HomeScreen(props: any) {
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

  /*block with transluten appear//
  const ref = useRef<HTMLElement>(null)
  const hasIntersected = useIsIntersecting(ref, { once: true })*/
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasIntersected = useIsIntersecting(ref, { once: true });

  /*if (!hasIntersected) {
    return <YStack ref={ref} />
  }*/

  function handleScroll() {
    const scrollY = window.scrollY + (ref.current?.getBoundingClientRect().top || 0);
    if (scrollY > 3000) {
      setKey(Math.random());
    }
  }

  return (
    <YStack ai="center" jc="flex-start" flex={1} space="$10" className="background-image">
          <Image als="center"
            src="https://link.us1.storjshare.io/raw/jx3mkaq7sfl37heqxnwzlw5mglhq/vosque/images/Logo.png"
            accessibilityLabel="vosque logo"
            width={400}
            height={200}
          />
      <YStack mt='$20' space="$4">
        <H1 ta="center" tt="uppercase" fos={60} fow="$4" >
          Курс аргентинского испанского языка
        </H1>
      </YStack>
      <YStack mt='$20' maw={800}>
        <H3 ta="center">
          Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
        </H3>
      </YStack>
      <YStack mt='$5'>
          <Stack jc='space-around' ai='baseline' fd='row' fw='wrap' maw={1600} space="$4" onScroll={handleScroll} >
            <YStack
              key={key}
              enterStyle={{
                scale: 1.5,
                y: 500,
                opacity: 0,
                }}
              animation='bouncy'
              elevation="$4"
              opacity={1}
              scale={1}
              p="$4"
              y={0}
              bw={1}
              boc="$color1"
              bc="$background"
              br="$10" 
              w={400}
              shadowColor={"$shadowColor"}
              shadowRadius={15}
              shadowOffset={{ width: 0, height: 4 }}
              >
              <H5 ta="center" mt="$2" color="$color1" maw={350} {...props}>
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
              >
              <H5 ta="center" mt="$2" color="$color1" maw={350} >
                Структура языка
              </H5>
              <Separator />
              <Paragraph ta='center' maw={350} >
                Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
              </Paragraph>
            </YStack>
          </Stack>
      </YStack>
      <YStack mt='$20' pt='$10' pb='$10' space="$2" backgroundColor="$color1" style={{ flex: 1, width: '100%' }}>
        <Avatar circular als="center" size="$20">
          <Avatar.Image
            accessibilityLabel="Анастасия Лукьянова"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$backgroundHover" />
        </Avatar>
        <YStack>
          <H3 ta="center">Анастасия Лукьянова</H3>
          <Separator maw={350} />
          <H1 ta="center">Куратор курса</H1>
          <Paragraph ta="center" w={800}>
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
        <XStack>
          <YStack maw={300} space="$2">
            <H3 ta="center">Александр</H3>
            <Paragraph>
              Я уже несколько лет изучаю испанский язык, но никак не могу выучить грамматику. В этом курсе я научился грамматике и разговорной речи одновременно. Спасибо!
            </Paragraph>
          </YStack>
          <YStack maw={300} space="$2">
            <H3 ta="center">Александра</H3>
            <Paragraph>
              Я уже несколько лет изучаю испанский язык, но никак не могу выучить грамматику. В этом курсе я научился грамматике и разговорной речи одновременно. Спасибо!
            </Paragraph>
          </YStack>
          <YStack maw={300} space="$2">
            <H3 ta="center">Александр</H3>
            <Paragraph>
              Я уже несколько лет изучаю испанский язык, но никак не могу выучить грамматику. В этом курсе я научился грамматике и разговорной речи одновременно. Спасибо!
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>
      <YStack mt='$20' >
        <H1 ta="center">Подробнее о курсе</H1> 
        <Paragraph ta="center">
          Почему он самый лучший ?
        </Paragraph>
        <Separator />
        <Stack jc='space-around' ai='baseline' fd='row' fw='wrap' maw={1000} space="$4">
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
        </Stack>
      </YStack>
      <YStack pt='$10' pb='$10' style={{ flex: 1, width: '100%' }} backgroundColor="$backgroundFocus" >
        <H1 ta="center" fow="$8" >
          записаться
        </H1>
      </YStack>
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