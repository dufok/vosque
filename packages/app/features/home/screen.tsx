import {
  Button,
  H1,
  H2,
  H3,
  H5,
  Paragraph,
  Separator,
  XStack,
  YStack,
  Image,
  Avatar,
  Circle,
} from "@my/ui";
import React, { useState } from "react";
import { useLink } from "solito/link";

//import { Header } from '@my/ui/src/components/HeaderComp';
//add blocks animation
import { reviews } from '@my/ui/src/texts/reviews';



export function HomeScreen(props) {
  const userpageLinkProps = useLink({
    href: "/userpage",
  });
  const phasebookLinkProps = useLink({
    href: "/phrasebook",
  });
  const courseLinkProps = useLink({
    href: "/course",
  });



  /*
  //block with errors from Author 
  const { data, isLoading, error } = trpc.entry.all.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  /*
  /*if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  }*/
  /*
  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }
  */

  return (
    <YStack f={1} miw={600} space="$6" >
      <YStack f={1} ai="center">
        <YStack h={600}>
          <Image pos="relative" width={2000} height={600} src='http://cdn.vosque.education/images/ylona-maria-rybka-W9h9Tq-JLTk-unsplash%201.png?raw' />
        </YStack>
        <YStack position="absolute" zIndex={500} space="$4">
          <Circle size={600} boc={"$blue1Light"} bw="$1">
            <H1 ta="center" mt="100" mb="$5">
              Курсы аргентинского<br/>испанского языка
            </H1>
            <Paragraph w={400} ta='center'>
              Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
            </Paragraph>
            <Button {...userpageLinkProps} br="$1" bw={3} boc="$color2" >
              ВОЙТИ
            </Button>
          </Circle>
        </YStack>
      </YStack>
      <YStack ai="center" >
        <XStack  mt="$4" ai="flex-start">
          <YStack ai="center" >
            <YStack >   
                <H3 ta="center" mt="$8" w={350} pos="relative" hoverStyle={{ opacity: 0 }}>
                  Разговорная речь
                </H3>
                <Paragraph ta="center" bc="$background"  w={350} pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }}>
                  Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
                </Paragraph>
            </YStack>
            <YStack ai="center">          
                <H3 ta="center" mt="$8" w={350} pos="relative" hoverStyle={{ opacity: 0 }}>
                  Культурный контекст
                </H3>
                <Separator />
                <Paragraph ta="center" bc="$background" w={350} pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }}>
                  Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
                </Paragraph>
            </YStack>
            <YStack ai="center">             
                <H3 ta="center" mt="$8" w={350} pos="relative" hoverStyle={{ opacity: 0 }}>
                  Структура языка
                </H3>
                <Separator />
                <Paragraph ta="center" bc="$background" w={350} pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }}>
                  Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
                </Paragraph>
            </YStack>
          </YStack>
          <YStack ai="center" bc="$backgroundStrong">
            <Avatar size="$15">
              <Avatar.Image
                accessibilityLabel="Анастасия Лукьянова"
                src="http://cdn.vosque.education/images/avatar.png?raw"
              />
              <Avatar.Fallback backgroundColor="$backgroundFocus" />
            </Avatar>
            <H1 ta="center" >Анастасия Лукьянова</H1>
            <YStack maw={600}>
              <YStack m="$2" />
              <Paragraph ta="center">
                Я - билингв, носитель русского и испанских языков. Родившись в Эквадоре, в 5 лет я переехала в Россию, в 16 поступила в МГУ на филологический факультет, в 19 отправилась на стажировку в Мексику, а в 23, закончив университет с красным дипломом по специальности "Преподаватель и переводчик испанского языка", переехала в Аргентину. Уже 10 лет я преподаю язык и рада делиться своими знаниями и опытом.
              </Paragraph>
            </YStack>
          </YStack>
        </XStack>
      </YStack>
      <YStack ai="center">
        <Avatar circular size="$10">
          <Avatar.Image
            src="http://cdn.vosque.education/images/img-home-course.png?raw"
          />
          <Avatar.Fallback backgroundColor="$backgroundFocus" />
        </Avatar>
        <H2 tt="uppercase">курсы</H2>
        <Paragraph>Для вас, чтобы выучить родной испанский язык наилучшим образом</Paragraph>
        <XStack>
          <YStack>
            <Button {...courseLinkProps} w={350} h={72} br={9} boc={"$blue1Light"} bw="$1">
              Базовый курс аргентинского испанского
            </Button>
          </YStack> 
          <YStack>
            <Button w={350} h={72} br={9} boc={"$blue1Light"} bw="$1">
              Скоро Больше
            </Button>
          </YStack>
        </XStack>
      </YStack>
      <YStack ai="center" bc="$backgroundStrong" >
        <Avatar circular size="$10">
          <Avatar.Image
            src="http://cdn.vosque.education/images/img-home-phrasebook.png?raw"
          />
          <Avatar.Fallback backgroundColor="$backgroundHover" />
        </Avatar>
        <H2 tt="uppercase" color="$color1" >разговорники</H2>
        <H5>что это такое ?</H5>
        <Paragraph>Наши разговорники - это охуенная вещь потому что потому что</Paragraph>
        <YStack>
          <Button {...phasebookLinkProps} w={200} h={72} br={9} boc={"$blue1Light"} bw="$1">
            СМОТРЕТЬ ВСЕ
          </Button>
        </YStack> 
      </YStack>
      <YStack ai="center">
        <H2 tt="uppercase" ta="center">Отзывы</H2>
        

  
        
      </YStack>
      <YStack f={1} pt="$10" pb="$10" backgroundColor="$backgroundHover" >
        <Button {...userpageLinkProps} theme={"gray"}>
          ЛИЧНЫЙ КАБИНЕТ (ВОЙТИ/ЗАПИСАТЬСЯ)
        </Button>
      </YStack>
    </YStack>
  );
}