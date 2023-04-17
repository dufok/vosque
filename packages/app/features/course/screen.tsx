import {
  Paragraph,
  YStack,
  XStack,
  H3,
  H1,
  H5,
  Avatar,
  Circle,
  Square,
  Image,
  Button,
  Separator
            } from "@my/ui";
import { useLink } from "solito/link";
import { Player,
  BigPlayButton,
  PosterImage,
  LoadingSpinner,
  ControlBar,
  ForwardControl,
            } from 'video-react';
import React from "react";
import PropTypes from 'prop-types';
import { Header } from '@my/ui/src/components/HeaderComp';
import { ButtonPay } from "@my/ui/src/components/ButtonPay";
import { trpc } from "../../utils/trpc";

import "./../../../../node_modules/video-react/dist/video-react.css"; // import css

//All for video-react
BigPlayButton.propTypes = {
  position: PropTypes.string,
};
PosterImage.propTypes = {
  poster: PropTypes.string,
};
ControlBar.propTypes = {
  // Hide the control bar automatically after the player is inactive
  // default: true
  autoHide: PropTypes.bool,
  // The waiting time for auto hide after player is inactive (in milliseconds)
  // default: 3000
  autoHideTime: PropTypes.number,
  // Do not render default controls, only use custom ones provided as children of <ControlBar>
  // default: false
  disableDefaultControls: PropTypes.bool,
  // Do not render the control bar if set it to true
  // default: false
  disableCompletely: PropTypes.bool,
};
ForwardControl.propTypes = {

  // How many seconds to go forward
  // default: 10
  seconds: PropTypes.oneOf([5, 10, 30]),

};

export function courseScreen() {
  const userpageLinkProps = useLink({
    href: "/userpage",
  });
  //add link Props to lesson1
  const phrasebookProps = useLink({
    href: "/phrasebook",
  });
  
  //check user login
  const { data: currentUser } = trpc.user.current.useQuery();
  const isSignedIn = !!currentUser;

  return (
    <YStack f={1} space="$4" ai="center">
      <Header />
      <Paragraph ta="center" fow="800">
        Страница курса
      </Paragraph>
      <YStack
        bw={1}
        boc="$color1"
        bc="$background"
        br="$10" 
        m="$4"
        p="$4"
        miw={400}
        maw={1000}
        shadowColor={"$shadowColor"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        >
        <YStack f={1} m="$5">
          <H1 ta="center" fow="800" w={600}>
            Базовый курс аргентинского испанского
          </H1>
        </YStack>
        <YStack f={1} m="$2" mt="$10">
          <Player
            autoPlay
            poster="https://link.us1.storjshare.io/raw/jw264knny3k3jt6433cxg4adpuha/vosque/lessons/lesson1/Screenshot%202023-02-25%20033445.jpg"
            src="https://link.us1.storjshare.io/raw/jvqqelv4y36p7bn2wbqndov4p2wq/vosque/lessons/lesson1/trailer_hd.mp4"
            >
            <LoadingSpinner />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} className="my-class">
              <ForwardControl seconds={5} order={3.1} />
              <ForwardControl seconds={10} order={3.2} />
              <ForwardControl seconds={30} order={3.3} />
            </ControlBar>
          </Player>
        </YStack>
        <YStack f={1} m="$5">
          <H1 ta="center" fow="800">
            Структура курса
          </H1>
        </YStack>
        <XStack mt="$4" jc='space-around' ai="flex-start" fw='wrap'>
          <YStack>
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
              <H5 ta="center" mt="$8" color="$color1" w={350}>Видео с профессиональным преподавателем-билингвом</H5>
            </YStack>
          </YStack>
          <YStack>
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
              <H5 ta="center" mt="$8" color="$color1" w={350}>Теория на доступном</H5>
            </YStack>
          </YStack>
          <YStack>
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
              <H5 ta="center" mt="$8" color="$color1" w={350}>Большое количество упражнений</H5>
            </YStack>
          </YStack>
          <YStack>
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
              <H5 ta="center" mt="$8" color="$color1" w={350}>Диалоги между носителями на каждую пройденную тему!</H5>
            </YStack>
          </YStack>
        </XStack>
        <YStack f={1} m="$5">
          <H1 ta="center" fow="800">
            Программа Курса
          </H1>
          <XStack mt="$4" jc='space-around' ai="flex-start" fw='wrap'>
            <Button m="$4" p="$8" w={350}>
            <H5 ta="center" tt="uppercase" color="$color1">Фонетика</H5>
            </Button>
            <Button m="$4" p="$8" w={350}>
              <H5 ta="center" tt="uppercase" color="$color1">Грамматика</H5>
            </Button>
            <Button m="$4" p="$8" w={350}>
              <H5 ta="center" tt="uppercase" color="$color1">Лексика</H5>
            </Button>
            <Button m="$4" p="$8" w={350}>
              <H5 ta="center" tt="uppercase" color="$color1">Разговорная речь</H5>
            </Button>
          </XStack>
        </YStack>
        <YStack f={1} m="$5">
          <H1 ta="center" fow="800">
            Тарифы
          </H1>
          <XStack mt="$4" jc='space-around' ai="flex-start" fw='wrap'>
            <Circle size={300} backgroundColor="$backgroundHover">
              <H3 ta="center">
                Тариф Онлайн
                Стоимость 200USDT
              </H3>
              {isSignedIn && (
              <ButtonPay
                title="Тестовый курс"
                description="Тестовое описание"
                course="Lesson Pack 0"
                coupon="MYARGENTINA"
                pricerub={24000}
                priceusdt={200}
                size="$2" />
              )}
              {!isSignedIn && (
              <Button {...userpageLinkProps} size="$2">
                <H5 ta="center" tt="uppercase" color="$color1">Тестовый курс</H5>
              </Button>
              )}
            </Circle>
            <Circle size={300} backgroundColor="$backgroundHover">
              <H3 ta="center">
                Тариф c преподавателем
                Стоимость 200USDT
              </H3>
              <ButtonPay
                title="Тестовый курс"
                description="Тестовое описание"
                course="Lesson Pack 0"
                coupon="MYARGENTINA"
                pricerub={24000}
                priceusdt={200}
                size="$2" />
            </Circle>
          </XStack>
        </YStack>
        <YStack f={1} m="$5">
          <Separator />
            <H1 ta="center" fow="300">
              Другие продукты
            </H1>
          <Separator />
        </YStack>
        <YStack f={1} m="$5">
          <XStack mt="$4" jc='space-around' ai="flex-start" fw='wrap'>
            <Square size={600}>
              <Image
                src="https://placekitten.com/200/300"
                width={300}
                height={600}
                hoverStyle={{ opacity: 0.5 }}
                //on press go to the link use props
                {...phrasebookProps}
              />
            </Square>
            <YStack>
              <H3 ta="center" tt="uppercase">
                Разговорники
              </H3>
            </YStack>
          </XStack>
        </YStack>
        <YStack f={1} m="$5">
          <Button {...userpageLinkProps} p="$8">
            <H5 ta="center" tt="uppercase" color="$color1" w={500}>ЛИЧНЫЙ КАБИНЕТ (ВОЙТИ/ЗАПИСАТЬСЯ)</H5>
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
} 