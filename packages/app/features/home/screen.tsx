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
  Avatar,
  styled
} from "@my/ui";
import React, { useRef, useEffect, useState } from "react";
import { useLink } from "solito/link";

import { Header} from '@my/ui/src/components/HeaderComp';
//add blocks animation
import { AnimatePresence } from '@tamagui/animate-presence';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { reviews } from '@my/ui/src/texts/reviews';

//Review block animation config
const YStackEnterable = styled(YStack, {
  variants: {
    isLeft: { true: { x: -300, opacity: 0 } },
    isRight: { true: { x: 300, opacity: 0 } },
  } as const,
})

export function HomeScreen(props) {
  const userLinkProps = useLink({
    href: "/user/nate",
  });
  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });
  //add link Props to lesson1
  const lesson1Props = useLink({
    href: "/lesson1",
  });

  //add animated block with Reviews
  const [[page, direction], setPage] = useState([0, 0])
  const reviewIndex = wrap(0, reviews.length, page)
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }
  const enterVariant = direction === 1 || direction === 0 ? 'isRight' : 'isLeft'
  const exitVariant = direction === 1 ? 'isLeft' : 'isRight'


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
    <YStack f={1} miw={500} space="$6">
      <Header />
      <YStack ai="center">
        <Image
          src="https://link.us1.storjshare.io/raw/jwgfjiapmo2t6vfo7gvkcarnk4la/vosque/images/Logo.PNG"
          accessibilityLabel="vosque logo"
          width={150}
          height={150}
        />
        <H1 ta="center" fos={90} fow="$4" mt="15" mb="$20" color="$color2" w={1000}>
          Курсы аргентинского испанского языка
        </H1>
      </YStack>
      <YStack ai="center" >
        <H3 fos={50} miw={300} maw={600} ta='center'>
          Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
        </H3>
        <XStack  mt="$4" jc='space-around' ai="flex-start" fw='wrap' >
          <YStack ai="center">
            <Avatar circular size="$8" y="$10" bc="$background" zi={100} >
              <Avatar.Image src='https://link.us1.storjshare.io/raw/jwgfjiapmo2t6vfo7gvkcarnk4la/vosque/images/circle_talking_talk.png' />
              <Avatar.Fallback bc="$background" />
            </Avatar>
            <YStack
                ai="center"
                p="$4"
                bw={3}
                br="$10"
                boc="$color2"
                w={400}
                shadowColor={"$shadowColor"}
                shadowRadius={15}
                shadowOffset={{ width: 0, height: 4 }}
                space="$4"
                m="$4"
                >              
              <H5 ta="center" mt="$8" color="$color1" w={350}>
                Разговорная речь
              </H5>
              <Separator />
              <Paragraph ta="center" color="$color1" w={350} >
                Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
              </Paragraph>
            </YStack>
          </YStack>
          <YStack ai="center">
            <Avatar circular size="$8" y="$10" bc="$background" zi={100} >
              <Avatar.Image src='https://link.us1.storjshare.io/raw/jwgfjiapmo2t6vfo7gvkcarnk4la/vosque/images/circle_kult_cots.png' />
              <Avatar.Fallback bc="$background" />
            </Avatar>
            <YStack
                ai="center"
                p="$4"
                bw={3}
                br="$10"
                boc="$color2"
                w={400}
                shadowColor={"$shadowColor"}
                shadowRadius={15}
                shadowOffset={{ width: 0, height: 4 }}
                space="$4"
                m="$4"
                >              
              <H5 ta="center" mt="$8" color="$color1" w={350}>
                Культурный контекст
              </H5>
              <Separator />
              <Paragraph ta="center" color="$color1" w={350} >
                Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
              </Paragraph>
            </YStack>
          </YStack>
          <YStack ai="center">
            <Avatar circular size="$8" y="$10" bc="$background" zi={100} >
              <Avatar.Image src='https://link.us1.storjshare.io/raw/jwgfjiapmo2t6vfo7gvkcarnk4la/vosque/images/circle_struct_lang.png' />
              <Avatar.Fallback bc="$background" />
            </Avatar>
            <YStack
                ai="center"
                p="$4"
                bw={3}
                br="$10"
                boc="$color2"
                w={400}
                shadowColor={"$shadowColor"}
                shadowRadius={15}
                shadowOffset={{ width: 0, height: 4 }}
                space="$4"
                m="$4"
                >              
              <H5 ta="center" mt="$8" color="$color1" w={350}>
                Структура языка
              </H5>
              <Separator />
              <Paragraph ta="center" color="$color1" w={350} >
                Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
              </Paragraph>
            </YStack>
          </YStack>
        </XStack>
      </YStack>
      <YStack f={1} ai="center" jc="center" pt='$10' pb='$10' space="$6"  >
        <Image pos="relative" width={1400} height={1400} src='https://link.us1.storjshare.io/raw/jwgfjiapmo2t6vfo7gvkcarnk4la/vosque/images/curator_fon.png'/>
        <YStack position="absolute"
          ai="center"
          jc="center"
          bw={3}
          boc="$color2"
          bc="$background"
          opacity={0.8}
          br="$10"
          p="$4"
          m="$4"
          space="$4"
          shadowColor={"$shadowColor"}
          shadowRadius={15}
          shadowOffset={{ width: 0, height: 4 }}
          zi={100}
          >
          <H1 ta="center" >Анастасия Лукьянова</H1>
          <XStack opacity={1}>
            <Avatar circular size="$20">
              <Avatar.Image
                accessibilityLabel="Анастасия Лукьянова"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$backgroundHover" />
            </Avatar>
            <YStack maw={600}>
              <YStack m="$2" />
              <H1 ta="center" >Куратор курса</H1>
              <Paragraph ta="center">
                Я - билингв, носитель русского и испанских языков. Родившись в Эквадоре, в 5 лет я переехала в Россию, в 16 поступила в МГУ на филологический факультет, в 19 отправилась на стажировку в Мексику, а в 23, закончив университет с красным дипломом по специальности "Преподаватель и переводчик испанского языка", переехала в Аргентину. Уже 10 лет я преподаю язык и рада делиться своими знаниями и опытом.
              </Paragraph>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
      <YStack ai="center" jc="center">
        <YStack
          position="relative"
          w={800} h={300}
          ai="center"
          >
          <Image
            src="https://placekitten.com/200/300"
            width={800}
            height={300}
            hoverStyle={{ opacity: 0.5 }}
          />
          <H3
            position="absolute"
            zi={50}
            tt="uppercase"
          >
            базовый курс аргентинского испанского
          </H3>
        </YStack>
      </YStack>
      <YStack ai="center">
        <H1 ta="center" fos={70} tt="uppercase" fow="$4" mt="$10" mb="$10" color="$color2" style={{ fontFamily: 'VosqueStyle' }}>
          Разговорники
        </H1>
        <XStack m="$5" jc="flex-end" ai="center" fw='wrap' maw={1600}>
          <YStack
            position="relative"
            w={500} h={300}
            ai="center"
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              аренда жилья
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            ai="center"
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              оформление документов
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            ai="center"
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              в ресторане
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            ai="center"
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              квир/на дейтинге
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            ai="center"
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              ругательства
            </H3>
          </YStack>
        </XStack>
      </YStack>
      <YStack ai="center">
        <H1 ta="center">Отзывы</H1>
        <Paragraph ta="center">
          Что говорят наши студенты
        </Paragraph>
        <Separator />
        <XStack ov="hidden" bc="$background" pos="relative" h={400} w={600} ai="center">
          <AnimatePresence enterVariant={enterVariant} exitVariant={exitVariant}>
            <YStackEnterable key={page} animation="bouncy" fullscreen x={0} o={1} ai="center">
              <YStack
                bw={1}
                boc="$color1"
                bc="$background"
                br="$10" 
                w={400}
                p="$4"
                m="$4"
                space="$4"
                shadowColor={"$shadowColor"}
                shadowRadius={15}
                shadowOffset={{ width: 0, height: 4 }}
                ai="center"
                onPress={() => paginate(1)}
                >
                  <Avatar circular size="$10">
                    <Avatar.Image
                      accessibilityLabel={reviews[reviewIndex].name}
                      src={reviews[reviewIndex].photo}
                    />
                    <Avatar.Fallback backgroundColor="$backgroundHover" />
                  </Avatar>
                  <H3>{reviews[reviewIndex].name}</H3>
                  <Paragraph>{reviews[reviewIndex].text}</Paragraph>
              </YStack>
            </YStackEnterable>
          </AnimatePresence>

          <Button
            accessibilityLabel="Carousel left"
            icon={ArrowLeft}
            size="$5"
            pos="absolute"
            l="$4"
            circular
            elevate
            onPress={() => paginate(-1)}
          />
          <Button
            accessibilityLabel="Carousel right"
            icon={ArrowRight}
            size="$5"
            pos="absolute"
            r="$4"
            circular
            elevate
            onPress={() => paginate(1)}
          />
        </XStack>
      </YStack>
      <YStack pt="$10" pb="$10" backgroundColor="$backgroundHover" >
        <H1 fow="200" ta="center">
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
    </YStack>
  );
}

//function wrap for Block with animated Reviews
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}