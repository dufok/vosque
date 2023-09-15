import { Paragraph, YStack, AlertDialog, Button, XStack } from "tamagui";
import React,{useEffect, useState} from "react";
import { useRouter } from "solito/router";
import { ParagraphCustom } from './CustomText'

export function PopAtention({ isOpen: initialIsOpen }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const handleOnClick = () => {
    router.push(`/userpage`);
    setIsOpen(false);
  };

  return (
      <AlertDialog native open={isOpen}>
      <AlertDialog.Trigger asChild>
        {/* <Button zIndex={100_000} style={{ position: 'fixed', bottom: '50px', right: '10px'}} onPress={() => setIsOpen(true)}>Скидка</Button> */}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          style={{ opacity: 0.3 }}
          enterStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          maw='80%'
        >
          <YStack space="$1">
            <AlertDialog.Title>Начни обучение бесплатно прямо сейчас!</AlertDialog.Title>
            <AlertDialog.Description>
              🧉🧉🧉
            </AlertDialog.Description>

            <ParagraphCustom text="Мы рады предложить вам уникальную возможность: ^первый урок аргентинского испанского абсолютно бесплатно с VOSQUE!^" />
            <ParagraphCustom text="Почему это стоит попробовать:" />
            <ParagraphCustom text="^Изучайте язык, находясь где-угодно^: Наш онлайн-курс позволит вам изучать испанский язык без привязки к месту и времени. Уроки доступны вам 24/7." />
            <ParagraphCustom text="^Оцените качество обучения:^ Первый урок — это ваш шанс оценить уникальную методику VOSQUE и познакомиться с преподавателем." />
            <ParagraphCustom text="^Погрузитесь в аргентинские реалии:^ Изучая испанский с VOSQUE, Вы не только поймёте структуру испанского языка и начнете на нем разговаривать, но и узнаете много полезной информации для жизни в Аргентине." />
            <ParagraphCustom text="^Как начать обучение:^" />
            <ParagraphCustom text="- Просто нажмите на кнопку &apos;Начать бесплатно&apos; ниже."/>
            <ParagraphCustom text="- Зарегистрируйтесь на нашем сайте." />
            <ParagraphCustom text="- Получите мгновенный доступ к первому уроку." />
            <ParagraphCustom text="^Не упустите свой шанс!^ Начните свое обучение с нами уже сегодня и поймите наконец, КАК же «работает» аргентинский испанский язык!" />

            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button onPress={() => setIsOpen(false)}>Закрыть</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  onPress={handleOnClick}
                >
                  Начать бесплатно
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
