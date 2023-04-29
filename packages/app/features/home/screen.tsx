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
  Square,
  Avatar,
  Circle
} from "@my/ui";
import React, { useState } from "react";
import { useLink } from "solito/link";
import { ImageBackground } from "react-native"

//import { Header } from '@my/ui/src/components/HeaderComp';
//add blocks animation
import { reviews } from '@my/ui/src/texts/reviews';
import { SignalLow } from "@tamagui/lucide-icons";



export function HomeScreen(props) {
  const userpageLinkProps = useLink({ href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
  const courseLinkProps = useLink({href: "/course"});

  const imageSource = { uri: 'http://cdn.vosque.education/images/ylona-maria-rybka-W9h9Tq-JLTk-unsplash%201.png?raw'};

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
    <YStack>
        <Welcome imageSource={imageSource} userpageLinkProps={userpageLinkProps} />
        <AboutAutor />
        <AboutCourse courseLinkProps={courseLinkProps} />
        <Prasephrase phasebookLinkProps={phasebookLinkProps}/>
        <ReviewSection />
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}


function Welcome({ imageSource, userpageLinkProps }){
  return(
    <YStack>
        <ImageBackground source={imageSource} style={{ flex: 1, width: '100%', height: '100%' }}>
          <YStack space="$4" ai="center">
            <Circle size={600} boc="$background" bw="$1">
              <H1 ta="center" mt="100" mb="$5" col="$background">
                Курсы аргентинского<br/>испанского языка
              </H1>
              <Paragraph p="$5" ta='center' col="$background">
                Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
              </Paragraph>
              <Button mt="100" {...userpageLinkProps} br={9} bw="$1" boc="$background">
                ВОЙТИ
              </Button>
            </Circle>
          </YStack>
        </ImageBackground>
      </YStack>
  )
};


function AboutAutor(){
  return(
    <XStack fw="wrap" >
      <YStack ai="center" jc="center" f={1}>
        <YStack p="$8">   
          <H3 ta="center" mt="$8" pos="relative" hoverStyle={{ opacity: 0 }}>
            Разговорная речь
          </H3>
          <Paragraph ta="center" bc="$background" pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }}>
            Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
          </Paragraph>
        </YStack >
          <YStack p="$8">          
              <H3 ta="center" mt="$8" pos="relative" hoverStyle={{ opacity: 0 }}>
                Культурный контекст
              </H3>
              <Separator />
              <Paragraph ta="center" bc="$background" pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }}>
                Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
              </Paragraph>
          </YStack>
          <YStack p="$8">             
              <H3 ta="center" mt="$8" pos="relative" hoverStyle={{ opacity: 0 }}>
                Структура языка
              </H3>
              <Separator />
              <Paragraph ta="center" bc="$background"  pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }}>
                Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
              </Paragraph>
          </YStack>
      </YStack>
      <YStack bc="$backgroundFocus" f={1}>
        <YStack ai="center">
          <Avatar size="$15" mt={85}>
            <Avatar.Image
              accessibilityLabel="Анастасия Лукьянова"
              src="https://cdn.vosque.education/images/avatar.png?raw"
            />
            <Avatar.Fallback backgroundColor="$backgroundFocus" />
          </Avatar>
          <H1 ta="center" col="$background">Анастасия Лукьянова</H1>
          <YStack>
            <YStack/>
                <Paragraph ta="center" col="$background" p="$8" maw={400}>
                    Я - билингв, носитель русского и испанских языков. Родившись в Эквадоре, в 5 лет я переехала в Россию, в 16 поступила в МГУ на филологический факультет, в 19 отправилась на стажировку в Мексику, а в 23, закончив университет с красным дипломом по специальности "Преподаватель и переводчик испанского языка", переехала в Аргентину. Уже 10 лет я преподаю язык и рада делиться своими знаниями и опытом.
                </Paragraph>
          </YStack>
        </YStack>
      </YStack>
    </XStack>
  )
}

function AboutCourse ({courseLinkProps}) {
    return(
        <YStack ai="center">
            <Avatar circular size="$6" mt={150}>
                <Avatar.Image
                src="https://cdn.vosque.education/images/img-home-course.png?raw"
                />
                <Avatar.Fallback backgroundColor="$backgroundFocus" />
            </Avatar>
            <H2 tt="uppercase">курсы</H2>
            <Paragraph mt={40} >Для вас, чтобы выучить родной<br/>испанский язык наилучшим образом</Paragraph>
            <XStack mt={53} fw="wrap">
                <YStack p={35}>
                <Button bc="$backgroundFocus" {...courseLinkProps}>
                    Базовый курс аргентинского испанского
                </Button>
                </YStack> 
                <YStack p={35}>
                    <Button>
                        Скоро Больше
                    </Button>
                </YStack>
            </XStack>
        </YStack>
        
    )
}

function Prasephrase({phasebookLinkProps: {href}}){
    return(
        <YStack ai="center" bc="$backgroundFocus" >
            <Avatar circular size="$6" mt={150}>
                <Avatar.Image
                src="https://cdn.vosque.education/images/img-home-phrasebook.png?raw"
                />
                <Avatar.Fallback backgroundColor="$backgroundHover" />
            </Avatar>
            <H2 tt="uppercase" col="$background">разговорники</H2>
            <H5 mt={50}>что это такое ?</H5>
            <Paragraph>Наши разговорники - это охуенная вещь потому что потому что</Paragraph>
            <YStack p={35}>
                <Button mt={50} href={href} br={9} bw="$1">
                    СМОТРЕТЬ ВСЕ
                </Button>
            </YStack> 
        </YStack>
    )
}

function ReviewSection () {
    return(
        <YStack ai="center">
            <H2 tt="uppercase" ta="center">Отзывы</H2>
            <Square h={600} w='100%' />
        </YStack>

    )
    
}

function SubMenu({userpageLinkProps}) {
    return(
        <YStack w="100%" pt="$10" pb="$10" backgroundColor="$backgroundFocus" >
            <Button {...userpageLinkProps}>
                ЛИЧНЫЙ КАБИНЕТ (ВОЙТИ/ЗАПИСАТЬСЯ)
            </Button>
      </YStack>
    )
}

