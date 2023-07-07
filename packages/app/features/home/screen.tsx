import {
  Button,
  H1,
  H2,
  H3,
  H4,
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

import { trpc } from "../../utils/trpc";

import { Sheet } from '@tamagui/sheet'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useLink } from "solito/link";
import { SubMenu} from '@my/ui/src/components/SubMenu';
import { PhraseBooks } from "@my/ui/src/components/PhraseBooks";
import { ImageBackground, View} from "react-native"
import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import React, { useState, useEffect } from 'react';

import texts from './rew.json';

export function HomeScreen() {

  const userpageLinkProps = useLink({ href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
  const courseLinkProps = useLink({href: "/course"});

  const imageSource = { uri: 'https://cdn.vosque.education/images/ylona-maria-rybka-W9h9Tq-JLTk-unsplash%201.png?raw'};
  const imageSource1 = { uri: 'https://cdn.vosque.education/images/avatar.png?raw'};
  
  const { data, isLoading, error } = trpc.entry.all.useQuery();

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
        <HeaderComp />
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
          <YStack f={1} ai="center" h={600}>
            <Circle borderColor="$background" pos="relative"  bw="$1" size={600} $sm={{display: "none"}}/>
            <YStack space="$4" ai="center" mt="$13" pos="absolute" $sm={{mt: "$10"}}>
              <H1 mt="$8" ta="center" mb="$5" col="$background">
                Курсы аргентинского<br/>испанского языка
              </H1>
              <Paragraph p="$5" ta='center' col="$background" maw={600}>
                Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
              </Paragraph>
              <Button mt="100" {...userpageLinkProps} br={9} bw="$1" boc="$background">
                ВОЙТИ
              </Button>
            </YStack>
          </YStack>
        </ImageBackground>
      </YStack>
  )
};


function AboutAutor({imageSource1}){
  return(
    <XStack flexWrap="wrap" >

      <YStack ai="center" jc="center" w="100%" $gtSm={{ width: "50%" }} $sm={{ height: 500}} >
        <YStack p="$8" flex={0.3} ai="center" jc="center" w='100%'>
          <Square w="100%" pos="relative" hoverStyle={{ opacity: 0 }} >
            <H3 ta="center">
              Разговорная речь
            </H3>
          </Square>
          <Square w='80%' pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background" >
              Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
            </Paragraph>
          </Square>
        </YStack >

        <YStack p="$8" flex={0.3} ai="center" jc="center" w='100%'>
          <Square w="100%" pos="relative" hoverStyle={{ opacity: 0 }}>        
            <H3 ta="center">
              Культурный контекст
            </H3>
          </Square>
          <Square w='80%' pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background">
              Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
            </Paragraph>
          </Square>
        </YStack>

        <YStack p="$8" flex={0.3} ai="center" jc="center" w='100%'>
          <Square  w="100%" pos="relative" hoverStyle={{ opacity: 0 }}>
            <H3 ta="center">
              Структура языка
            </H3>
          </Square>
          <Square w='80%'  pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
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
              source={imageSource1}
            />
            <Avatar.Fallback backgroundColor="$backgroundFocus" />
          </Avatar>
          <H2 mt="$5" ta="center" col="$background">Анастасия Лукьянова</H2>
          <YStack>
            <YStack/>
              <Paragraph ta="left" col="$background" paddingHorizontal="$8" paddingBottom="$8" mt="$2">
                Я - билингв, носитель русского и испанских языков. Родившись в Эквадоре, в 5 лет я переехала в Россию, в 16 поступила в МГУ на филологический факультет, в 19 отправилась на стажировку в Мексику, а в 23, закончив университет с красным дипломом по специальности "Преподаватель и переводчик испанского языка", переехала в Аргентину. Уже 10 лет я преподаю язык и рада делиться своими знаниями и опытом.
              </Paragraph>
          </YStack>
        </YStack>
      </YStack>
      <Separator w='100%' />
    </XStack>

  )
}

function AboutCourse ({courseLinkProps}) {
    return(
      <View style={{
        flex: 1,
        position: 'relative',
      }}>
        <Image
          source={{ uri: 'https://cdn.vosque.education/images/img-course-trees-left.png?raw', width: 480, height: 480}}
          height='120%'
          width='120%'
          left={0}
          bottom={0}
          pos="absolute"
          $sm={{ display: 'none'}}
        />
        <Image
          source={{ uri: 'https://cdn.vosque.education/images/img-course-trees-right.png?raw', width: 274, height: 534}}
          height='120%'
          width='120%'
          right={0}
          bottom={0}
          pos="absolute"
          $sm={{ display: 'none' }}
        />
          <YStack
            mt={100}
            ai="center"
            mb={200}
            $xs={{ marginTop : 50, mb: 50}}
            style={{
            zIndex: 1
          }}>
            <Image
              source={{uri: 'https://cdn.vosque.education/images/img-home-course.png', width: 50, height: 50}}
              height={50}
              width={50}
            />
            <H2 tt="uppercase">курсы</H2>
            <YStack mt={40} maw={800}>
              <Paragraph paddingHorizontal="$6" ta="center">Хотите научиться разговаривать, как аргентинцы? Наши курсы сфокусированы на грамматике и практических навыках, чтобы вы могли использовать новые знания в повседневной жизни и на работе.</Paragraph>
              <Paragraph paddingHorizontal="$6" mt="$5" ta="center">Присоединяйтесь к нашим курсам аргентинского испанского языка и расширьте свои горизонты!</Paragraph>
            </YStack>
            <XStack mt={53} fw="wrap" w='100%' jc="space-around" maw={850}>
              <YStack marginVertical="$4">
                <Button
                  backgroundColor="$backgroundPress"
                  elevation="$0.5"
                  br="$2"
                  bw="$1"
                  boc="$backgroundPress" h={70} w={350}
                  {...courseLinkProps}>
                    <Paragraph color="$background" ta="center">
                      Базовый курс <br/> аргентинского испанского
                    </Paragraph>
                </Button>
              </YStack> 
              <YStack marginVertical="$4">
                <Button
                  elevation="$0.5"
                  br="$2"
                  bw="$1"
                  boc="$backgroundPress"
                  h={70} w={350}>
                    <Paragraph color="$backgroundPress" ta="center">
                      Скоро Больше Курсов
                    </Paragraph>
                </Button>
              </YStack>
            </XStack>
          </YStack>
      </View>
    )
}
 
function ReviewSection () {
  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedText, setSelectedText] = useState<{name: string, text: string} | null>(null);

  const truncate = (str) => {
      return str.length > 25 ? str.substring(0, 25) + "..." : str;
  };

  const renderTexts = (texts) => {
      return texts.map((textObj, index) => (
          <YStack key={index} w='100%'>
              <Square
                  br="$2"
                  bc="$backgroundPress"
                  m="$4"
                  p="$3"
                  pressStyle={{ scale: 0.98 }}
                  onPress={() => {
                    setOpen(true);
                    setSelectedText(textObj);
                  }}
              >
                <Paragraph ta="center" >{truncate(textObj.text)}" - {textObj.name}</Paragraph>
              </Square>
          </YStack>
      ));
  };

  const texts1 = texts.slice(0, Math.ceil(texts.length / 2));
  const texts2 = texts.slice(Math.ceil(texts.length / 2));

  return(
        <YStack ai="center" marginVertical="$6">
          <H2 tt="uppercase" marginVertical="$4" ta="center">Отзывы</H2>
          <XStack fw="wrap" jc="center" w='100%'>
              <YStack ai="center">
                  {renderTexts(texts1)}
              </YStack>
              <YStack ai="center">
                  {renderTexts(texts2)}
              </YStack>
          </XStack>

          {selectedText &&  // Added this conditional rendering
            <Sheet
              forceRemoveScrollEnabled={open}
              modal={true}
              open={open}
              onOpenChange={setOpen}
              snapPoints={[85, 50, 25]}
              dismissOnSnapToBottom
              position={position}
              onPositionChange={setPosition}
              zIndex={100_000}
              
            >
              <Sheet.Overlay />
              <Sheet.Handle />
              <Sheet.Frame
                flex={1}
                padding="$4"
                justifyContent="center"
                alignItems="center"
                space="$5"
              >
                <Button size="$6" boc="$backgroundFocus" circular icon={ChevronDown} onPress={() => setOpen(false)} />
                <Sheet.ScrollView padding="$4" space>
                  <YStack>
                    <H2 tt="uppercase" mb="$2">{selectedText.name}</H2> 
                    <Paragraph >{selectedText.text}</Paragraph>
                  </YStack>
                </Sheet.ScrollView>
              </Sheet.Frame>
            </Sheet>
          }
        </YStack>
  )
}