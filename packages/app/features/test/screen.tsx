import {
  Paragraph,
  YStack,
  XStack,
  H3,
  H1,
  H2,
  H4,
  Avatar,
  Circle,
  Square,
  Image,
  Button,
  Separator,
  ProgressFrame
            } from "@my/ui";
import { useLink } from "solito/link";
import React from 'react';


export function testScreen() {

  return (
    <YStack>
      <StructureCourse />

    </YStack>
  );
}






function StructureCourse() {
  return (
    <YStack bc="$backgroundFocus" space="$4" ai="center" p="$4">
      <H2 tt="uppercase" ta="center" col="$background">
        Структура курса
      </H2>
      <YStack maw={900}>
        <XStack mt="$4" jc="space-between" fw='wrap'>
          <YStack w='50%'>
            <H4 fontWeight="bold" col="$background">Видео с профессиональным<br/>преподавателем-билингвом</H4>
            <Paragraph ta="left" col="$background">Видео, которые приятно и интересно смотреть. Анастасия - носитель испанского и русского языков - доступно ведет уроки, объясняя все правила, давая примеры и рассказывая про разные жизненные ситуации, с которыми Вы можете столкнуться</Paragraph>
          </YStack>
          <YStack w='50%'>
            <XStack h='100%'>
              <Separator w='100%' vertical />
              <YStack w='50%'>
                <H4 fontWeight="bold" col="$background">Доступная теория</H4>
                <Paragraph ta="left" col="$background">После каждого видео Вы увидите теоретический блок, в котором вся теория разложена по полочкам в таблицы для удобства визуального восприятия.</Paragraph>
              </YStack>
            </XStack>
          </YStack>
          <YStack w='50%'>
            <Separator w='100%' />
            <H4 fontWeight="bold" col="$background">Большое количество упражнений</H4>
            <Paragraph ta="left" col="$background">После прочтения теоретического блока и закрепления правил, Вам предстоит сделать большое количество разнообразных упражнений. Фразы в упражнениях - именно те, которые Вам понадобятся в ежедневном общении и по ходу выполнения заданий Вы сможете узнать еще много полезного об аргентинском испанском!</Paragraph> 
          </YStack>
          <YStack w='50%'>
            <Separator w='100%' />  
            <H4 fontWeight="bold" col="$background">Диалоги между носителями<br/>на каждую пройденную тему</H4>
            <Paragraph ta="left" col="$background">Это уникально! В конце каждого грамматического урока Вас ждут видео, записаные специально для этого курса носителями языка: Вы не просто учите материал, Вы сразу видите, как использовать его в живую!</Paragraph>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  )
} 


