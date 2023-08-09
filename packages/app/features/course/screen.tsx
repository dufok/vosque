/// This is page about Course.
/// dufok and gpt was here (^.^')

import {
  Paragraph,
  YStack,
  XStack,
  H1,
  H2,
  H4,
  Button,
  Separator
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
    <YStack>
      <HeaderComp />
      <WelcomeCourse />
      <StructureCourse />
      <ProgramCourse />
      <PhraseBooks phasebookLinkProps={phasebookLinkProps}/>
      {/* <OtherProducts /> */}
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
} 



function WelcomeCourse() {

  const payscreenLinkProps = useLink({href: "/payscreen"});
  
  return (
        <YStack space="$4" f={1}>
          <YStack ai="center" mt="$10">
            <H1 ta="center" mt={50} mb={50}>
              Базовый курс аргентинского испанского
            </H1>
            <YStack  w="100%" $gtSm={{ width: "70%" }}>
              <VideoPlayer linkVideo="https://cdn.vosque.education/images/welcome.mp4?raw"/>
            </YStack>
          <H2 tt="uppercase" ta="center" mt={50} >
            Тарифы
          </H2>
          <XStack jc='space-around' ai='stretch' fw='wrap' p='$6'>
            <YStack p='$6'>
              <ButtonPay
                name="Тариф <br/> Online"
                description="Самостоятельное обучение на онлайн курсе: 12 уроков в записи с упражнениями"
                sku="VQ02LP"
                coupon="MYARGENTINA"
                pricerub={9000}
                priceusdt={100}
                size="$2"
                />
            </YStack>
            <YStack p='$6'>
              <Button
                backgroundColor="$backgroundPress"
                elevation="$0.5"
                br="$2"
                bw="$1"
                boc="$backgroundPress"
                h={80}
                w={270}
                //onpres to link payscreenLinkProps
                {...payscreenLinkProps}
                >
                <Paragraph color="$background" ta="center">Тариф <br /> с преподователем</Paragraph>
              </Button>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
  );
}

function StructureCourse() {
  return (
    <YStack marginVertical="$10" bc="$backgroundFocus" space="$4" ai="center" p="$4">
      <H2 tt="uppercase" ta="center" col="$background">
        Структура курса
      </H2>
      <YStack maw={900}>
        <XStack mt="$4" jc="space-between" fw='wrap'>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <YStack w='100%' p='$5'>
              <H4 mb="$2" col="$background">Видео с профессиональным<br/>преподавателем-билингвом</H4>
              <Paragraph lineHeight={21} ta="left" col="$background">Видео, которые приятно и интересно смотреть. Анастасия - носитель испанского и русского языков - доступно ведет уроки, объясняя все правила, давая примеры и рассказывая про разные жизненные ситуации, с которыми Вы можете столкнуться</Paragraph>
            </YStack>
          </YStack>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <XStack h='100%'>
              <Separator w='100%' vertical $sm={{display: "none"}}/>
              <YStack w='100%' p='$5'>
                <H4 mb="$2" col="$background">Доступная теория</H4>
                <Paragraph lineHeight={21} ta="left" col="$background">После каждого видео Вы увидите теоретический блок, в котором вся теория разложена по полочкам в таблицы для удобства визуального восприятия.</Paragraph>
              </YStack>
            </XStack>
          </YStack>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <Separator w='100%' $sm={{display: "none"}}/>
            <YStack w='100%' p='$5'>
              <H4 mb="$2" col="$background">Большое количество упражнений</H4>
              <Paragraph lineHeight={21} ta="left" col="$background">После прочтения теоретического блока и закрепления правил, Вам предстоит сделать большое количество разнообразных упражнений. Фразы в упражнениях - именно те, которые Вам понадобятся в ежедневном общении и по ходу выполнения заданий Вы сможете узнать еще много полезного об аргентинском испанском!</Paragraph> 
            </YStack>
          </YStack>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <Separator w='100%' $sm={{display: "none"}}/>
            <XStack  h='100%'>
              <Separator w='100%' vertical $sm={{display: "none"}}/>
              <YStack w='100%' p='$5'>
                <H4 mb="$2" col="$background">Диалоги между носителями<br/>на каждую пройденную тему</H4>
                <Paragraph lineHeight={21} ta="left" col="$background">Это уникально! В конце каждого грамматического урока Вас ждут видео, записаные специально для этого курса носителями языка: Вы не просто учите материал, Вы сразу видите, как использовать его в живую!</Paragraph>
              </YStack>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  )
} 


function ProgramCourse() {
  return (
    <YStack marginVertical="$10" space="$4" ai="center" p="$4">
      <H2 tt="uppercase" ta="center" >
        Программа курса
      </H2>
      <YStack maw={900}>
        <XStack mt="$4" jc="space-between" fw='wrap'>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <YStack w='100%' p='$5'>
              <H4 mb="$2" >Фонетика</H4>
              <Paragraph lineHeight={21} ta="left" >В первом уроке мы изучим фонетику испанского языка в Аргентине. Это не самый интересный, но очень важный материал, который позволит Вам дальше читать слова и выражения правильно, а так же интонировать так, как это делают носители!</Paragraph>
            </YStack>
          </YStack>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <XStack h='100%'>
              <Separator w='100%' vertical $sm={{display: "none"}}/>
              <YStack w='100%' p='$5'>
                <H4 mb="$2" >Грамматика</H4>
                <Paragraph lineHeight={21} ta="left" >Структура и грамматика языка являются его основой. Это — скелет, на который впоследствии нанизываются лексика, произношение и многие другие элементы. Наш курс построен на последовательном изучении разных типов глаголов и конструкций, понимание которых поможет вам понять любые другие правила испанского языка. Мы уверены, что после прохождения нашего курса вы сможете говорить на испанском языке с легкостью и уверенностью, благодаря тщательно изученной грамматике.</Paragraph>
              </YStack>
            </XStack>
          </YStack>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <Separator w='100%' $sm={{display: "none"}}/>
            <YStack w='100%' p='$5'>
              <H4 mb="$2" >Лексика</H4>
              <Paragraph lineHeight={21} ta="left" >Лексика - это необходимый ингредиент для успешного общения на испанском языке. В нашем курсе вы не будете мучительно запоминать лексические блоки, вместо этого мы предлагаем только те слова и выражения, которые вам действительно пригодятся в повседневной жизни. Вы изучите множество полезных разговорных фраз и сокращений, которыми часто пользуются аргентинцы, а также многое другое. Мы хотим, чтобы вы овладели живым испанским языком, а не сухими предложениями из учебника.</Paragraph>
            </YStack>
          </YStack>
          <YStack w='50%' $sm={{ width: '100%' }}>
            <Separator w='100%' $sm={{display: "none"}}/>
            <XStack  h='100%'>
              <Separator w='100%' vertical $sm={{display: "none"}}/>
              <YStack w='100%' p='$5'>
                <H4 mb="$2" >Разговорная речь</H4>
                <Paragraph lineHeight={21} ta="left" >Испанский язык, изучаемый в пособиях, и испанский язык, который вы можете услышать на улице, существенно различаются друг от друга. В нашем курсе мы слушаем носителей языка для изучения различных разговорных форм и живых диалогов. Некоторые фразы в них могут показаться Вам даже слишком неформальными, но именно так говорят настоящие аргентинцы! Наша задача - научить вас понимать и поддерживать разговор на испанском языке в реальной жизни.</Paragraph>
              </YStack>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
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