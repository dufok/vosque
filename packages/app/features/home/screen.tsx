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
  Spinner,
  Square,
  Avatar,
  Image,
  Circle
} from "@my/ui";
import { useLink } from "solito/link";
import { SubMenu} from '@my/ui/src/components/SubMenu';
import { PhraseBooks } from "@my/ui/src/components/PhraseBooks";
import { ImageBackground } from "react-native"
import React, { useState, useEffect } from 'react';


export function HomeScreen(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);

  const userpageLinkProps = useLink({ href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
  const courseLinkProps = useLink({href: "/course"});

  const imageSource = { uri: 'http://cdn.vosque.education/images/ylona-maria-rybka-W9h9Tq-JLTk-unsplash%201.png?raw'};
  const imageSource1 = { uri: 'https://cdn.vosque.education/images/avatar.png?raw'};
  const imageSource2 = { uri: 'https://cdn.vosque.education/images/img-home-course.png?raw'};
  const imageSource3 = { uri: 'https://cdn.vosque.education/images/img-home-phrasebook.png?raw'};


/*
  //block with errors from Author 
  const { data, isLoading, error } = trpc.entry.all.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  }
  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }
  if (isLoading) {
    return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
  }
*/

  return (
    <YStack>
        <Welcome imageSource={imageSource} userpageLinkProps={userpageLinkProps} />
        <AboutAutor imageSource1={imageSource1}/>
        <AboutCourse courseLinkProps={courseLinkProps}/>
        <PhraseBooks phasebookLinkProps={phasebookLinkProps}/>
        <ReviewSection />
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}


function Welcome({ imageSource, userpageLinkProps }){
  return(
    <YStack>
        <ImageBackground source={imageSource} style={{ flex: 1, width: '100%', height: '100%' }}>
          <YStack space="$4" ai="center" h={600}>
              <H1 mt="$15" ta="center" mb="$5" col="$background">
                Курсы аргентинского<br/>испанского языка
              </H1>
              <Paragraph p="$5" ta='center' col="$background" maw={600}>
                Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
              </Paragraph>
              <Button mt="100" {...userpageLinkProps} br={9} bw="$1" boc="$background">
                ВОЙТИ
              </Button>
          </YStack>
        </ImageBackground>
      </YStack>
  )
};


function AboutAutor({imageSource1}){
  return(
    <XStack flexWrap="wrap" >

      <YStack ai="center" jc="center" w="100%" $gtSm={{ width: "50%" }}>
        <YStack p="$8" flex={0.3} ai="center" jc="center">
          <Square w="100%" pos="relative" hoverStyle={{ opacity: 0 }} >
            <H3 ta="center">
              Разговорная речь
            </H3>
          </Square>
          <Square f={1} pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background" >
              Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
            </Paragraph>
          </Square>
        </YStack >

        <YStack p="$8" flex={0.3} ai="center" jc="center">
          <Square w="100%" pos="relative" hoverStyle={{ opacity: 0 }}>        
            <H3 ta="center">
              Культурный контекст
            </H3>
          </Square>
          <Square f={1}  pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background">
              Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
            </Paragraph>
          </Square>
        </YStack>

        <YStack p="$8" flex={0.3} ai="center" jc="center">
          <Square  w="100%" pos="relative" hoverStyle={{ opacity: 0 }}>
            <H3 ta="center">
              Структура языка
            </H3>
          </Square>
          <Square f={1}  pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background">
              Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
            </Paragraph>
          </Square>
        </YStack>
      </YStack>

      <YStack bc="$backgroundFocus" w="100%"
        $gtSm={{ width: "50%" }}>
        <YStack ai="center">
          <Avatar size="$15" mt={85}>
            <Avatar.Image
              accessibilityLabel="Анастасия Лукьянова"
              src={imageSource1}
            />
            <Avatar.Fallback backgroundColor="$backgroundFocus" />
          </Avatar>
          <H1 ta="center" col="$background">Анастасия Лукьянова</H1>
          <YStack>
            <YStack/>
              <Paragraph ta="left" col="$background" p="$8">
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
        <YStack ai="center" mb={100}>
            <Image mt={100} src={{uri: 'https://cdn.vosque.education/images/img-home-course.png?raw', width: 34, height: 67}}
            height="$8"
            width="$6"
            />
            <H2 tt="uppercase">курсы</H2>
            <Paragraph ai="center" mt={40} >Для вас, чтобы выучить родной<br/>испанский язык наилучшим образом</Paragraph>
            <XStack mt={53} jc={"center"} fw="wrap">
              <YStack p="$5">
                <Button bc="$backgroundFocus" {...courseLinkProps}>
                    Базовый курс аргентинского испанского
                </Button>
              </YStack> 
              <YStack p="$5">
                <Button boc="$backgroundFocus" bw="$1" paddingHorizontal="$14">
                    Скоро Больше
                </Button>
              </YStack>
            </XStack>
        </YStack>
        
    )
}

function ReviewSection () {
    return(
        <YStack ai="center">
            <H2 tt="uppercase" ta="center">Отзывы</H2>
            <XStack p="$5" fw="wrap">
                <YStack space="$5" f={1}>
                  <Square br="$2" f={0.7} bc="$backgroundFocus"  m="$2" >
                    <Paragraph  ta="right" p="$3" >“Мы приехали с нулевым знанием..." Альфия</Paragraph>
                  </Square>
                  <Square br="$2" f={0.7} bc="$backgroundFocus"   m="$2" >
                    <Paragraph  ta="right" p="$3" >“Настя стала для меня третьим..."  Виталик</Paragraph>
                  </Square>
                  <Square  br="$2" f={0.7} bc="$backgroundFocus" m="$2" >
                    <Paragraph ta="right" p="$3" >“Анастасия прекрасный учитель." Ольга</Paragraph>
                  </Square>
                </YStack>
                {/*
                <YStack space="$6" p="$6">
                  <Button bc="$backgroundFocus" paddingHorizontal="$14">
                    TEST
                  </Button>
                  <Button bc="$backgroundFocus" paddingHorizontal="$14">
                    TEST
                  </Button>
                  <Button bc="$backgroundFocus" paddingHorizontal="$14">
                    TEST
                  </Button>
                </YStack>
                */}
            </XStack>
        </YStack>

    )
    
}

