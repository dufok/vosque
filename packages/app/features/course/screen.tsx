import {
  Paragraph,
  YStack,
  XStack,
  H3,
  H1,
  H2,
  H5,
  Avatar,
  Circle,
  Square,
  Image,
  Button,
  Separator,
  ProgressFrame
            } from "@my/ui";
import { useLink } from "solito/link";
import React from "react";
import { HeaderComp } from '@my/ui/src/components/HeaderComp';
import { SubMenu} from '@my/ui/src/components/SubMenu';
import { PhraseBooks } from "@my/ui/src/components/PhraseBooks";
import { ButtonPay } from "@my/ui/src/components/ButtonPay";
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';


export function courseScreen() {
  const userpageLinkProps = useLink({href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
  
  
  return (
    <YStack mt="$10">
      <HeaderComp />
      <WelcomeCourse />
      <StructureCourse />
      <ProgramCourse />
      <PhraseBooks phasebookLinkProps={phasebookLinkProps}/>
      <OtherProducts />
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 



function WelcomeCourse() {
  return (
        <YStack space="$4" ai="center">
          <YStack maw={600}>  
            <H1 ta="center" mt={50} mb={50}>
              Базовый курс аргентинского испанского
            </H1>
            <VideoPlayer linkVideo="https://cdn.vosque.education/images/welcome.mp4?raw"/>
          </YStack>
          <H2 tt="uppercase" ta="center" mt={50} >
            Тарифы
          </H2>
          <XStack jc='space-around' ai='stretch' fw='wrap' p='$6'>
            <YStack p='$6'>
              <ButtonPay
                description="Тестовое описание"
                course="Lesson Pack 0"
                coupon="MYARGENTINA"
                pricerub={24000}
                priceusdt={200}
                size="$2"
                />
            </YStack>
            <YStack p='$6'>
              <Button elevation="$0.5" br="$2" bw="$1" boc="$backgroundPress" h={80} w={270} >
                <Paragraph ta="center" color="$backgroundPress">Тариф <br /> с преподователем</Paragraph>
              </Button>
            </YStack>
          </XStack>
        </YStack>
  );
}

function StructureCourse() {
  return (
    <YStack bc="$backgroundFocus" space="$4" ai="center" p="$4">
      <H2 tt="uppercase" ta="center" col="$background">
        Структура курса
      </H2>
      <XStack mt="$4" jc='space-around'  ai='stretch' fw='wrap' maw={1100}>
        <YStack  p="$6" maw={380}>
          <H5 fontWeight="bold" col="$background">Видео с профессиональным<br/>преподавателем-билингвом</H5>
          <Paragraph mt="$2"   ta="left" col="$background">Видео, которые приятно и интересно смотреть. Анастасия - носитель испанского и русского языков - доступно ведет уроки, объясняя все правила, давая примеры и рассказывая про разные жизненные ситуации, с которыми Вы можете столкнуться</Paragraph>
        </YStack>
        <YStack  p="$6" maw={380}> 
          <H5 fontWeight="bold" col="$background">Доступная теория</H5>
          <Paragraph mt="$4"  ta="left" col="$background">После каждого видео Вы увидите теоретический блок, в котором вся теория разложена по полочкам в таблицы для удобства визуального восприятия.</Paragraph>
        </YStack>
        <YStack  p="$6" maw={380}>
          <H5 fontWeight="bold" col="$background">Большое количество упражнений</H5>
          <Paragraph mt="$4"  ta="left" col="$background">После прочтения теоретического блока и закрепления правил, Вам предстоит сделать большое количество разнообразных упражнений. Фразы в упражнениях - именно те, которые Вам понадобятся в ежедневном общении и по ходу выполнения заданий Вы сможете узнать еще много полезного об аргентинском испанском!</Paragraph>
        </YStack>
        <YStack  p="$6" maw={380}>
          <H5 fontWeight="bold" col="$background">Диалоги между носителями<br/>на каждую пройденную тему</H5>
          <Paragraph mt="$4"  ta="left" col="$background">Это уникально! В конце каждого грамматического урока Вас ждут видео, записаные специально для этого курса носителями языка: Вы не просто учите материал, Вы сразу видите, как использовать его в живую!</Paragraph>
        </YStack>
      </XStack>
    </YStack>
  )
} 

function ProgramCourse() {
  return (
    <YStack space="$4" ai="center" p="$4">
      <H2 tt="uppercase" ta="center" >
        Программа курса
      </H2>
      <XStack mt="$4" jc='space-around'  ai='stretch' fw='wrap' maw={1100}>
        <YStack  p="$6" maw={380}>
          <XStack>
            <Image src={{uri: 'https://cdn.vosque.education/images/course-fonetica.png?raw', width: 35, height: '100%'}}
              height="100%"
              width="100%"
              />
            <YStack ml="$2">
              <H5 fontWeight="bold" >Фонетика</H5>
              <Paragraph mt="$2"   ta="left" >Здесь идет текст с описанием товара</Paragraph>
            </YStack>
          </XStack>
        </YStack>
        <YStack  p="$6" maw={380}>
          <XStack>
            <Image src={{uri: 'https://cdn.vosque.education/images/course-gramma.png?raw', width: 35, height: '100%'}}
              height="100%"
              width="100%"
              />
            <YStack ml="$2">
              <H5 fontWeight="bold" >Грамматика</H5>
              <Paragraph mt="$4"  ta="left" >Здесь идет текст с описанием товара</Paragraph>
            </YStack>
          </XStack>
        </YStack>
        <YStack  p="$6" maw={380}>
          <XStack>
            <Image src={{uri: 'https://cdn.vosque.education/images/course-lecsica.png?raw', width: 40, height: '100%'}}
              height="100%"
              width="100%"
              />
            <YStack ml="$2">
              <H5 fontWeight="bold" >Лексика</H5>
              <Paragraph mt="$4"  ta="left" >Здесь идет текст с описанием товара</Paragraph>
            </YStack>
          </XStack>
        </YStack>
        <YStack  p="$6" maw={380}>
          <XStack>
            <Image  src={{uri: 'https://cdn.vosque.education/images/course-speac.png?raw', width: 35, height: '100%' }}
              height="100%"
              width="100%"
              />
            <YStack ml="$2">
              <H5 fontWeight="bold" >Разговорная речь</H5>
              <Paragraph mt="$4"  ta="left" >Здесь идет текст с описанием товара</Paragraph>
            </YStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  )
}

function OtherProducts() {
  return (
    <YStack space="$4" ai="center" p="$4" mt="$8" mb="$8">
      <Button bg="$backgroundPress" color="$background" w={200} h={50} br="$2" >ДРУГИЕ ПРОДУКТЫ</Button>
    </YStack>
  )
}