import { Paragraph,
  YStack,
  XStack,
  H3,
  Square,
  Dialog,
  Adapt,
  Sheet,
  Button,
  Unspaced,
  Separator
 } from "@my/ui";
import { Player,
  BigPlayButton,
  PosterImage,
  LoadingSpinner,
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton
  } from 'video-react';
import { X } from '@tamagui/lucide-icons'
import React from "react";
import '../../background.css';
import PropTypes from 'prop-types';
import { Header } from '@my/ui/src/components/HeaderComp';
import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { LangTest, LangComponent } from '@my/ui/src/components/LangTest1';

import "./../../../../node_modules/video-react/dist/video-react.css"; // import css
//https://link.us1.storjshare.io/raw/jw264knny3k3jt6433cxg4adpuha/vosque/lessons/lesson1/Screenshot%202023-02-25%20033445.jpg

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

export function lesson1Screen() {
  return (
    <YStack ai="center" jc="flex-start" flex={1} space="$4" className="background-image">
    <Header />
      <Paragraph ta="center" fow="$16" >
        ЧАСТЬ 1. ФОНЕТИКА
      </Paragraph>
      <YStack
        bw={1}
        boc="$color1"
        bc="$background"
        br="$10" 
        m="$4"
        p="$4"
        miw={400}
        maw={800}
        shadowColor={"$shadowColor"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        >
        <YStack f={1} m="$2">
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
        <YStack mt="$10">
          <H3 ta="center">Сложные буквы</H3>
          <XStack jc="center" m="$4" fw='wrap'>
            <ButtonWithSheet
              Title="C"
              Description="Сложные Буквы"
              Colum1_1="1) перед a, o, u, согл. /К/"
              Colum2_1="2) перед e,i  /С/"
              Colum3_1="3) “CH” /Ч/"
              Colum1_2="casa, cosa, cucu"
              Colum2_2="cerveza, bici"
              Colum3_2="noche"
              />
            <ButtonWithSheet
              Title="G"
              Description="Сложные Буквы"
              Colum1_1="1) перед a, o, u, согл. /Г/"
              Colum2_1="2) перед e, i /Х/"
              Colum3_1="3)GUE /ге/, GUI /ги/"
              Colum1_2="gracias, gato, gota, gusano"
              Colum2_2="Argentina, gigante, Bélgica"
              Colum3_2="guitarra, guerra"
              />
            <ButtonWithSheet
              Title="H"
              Description="Сложные Буквы"
              Colum1_1="не читается"
              Colum1_2="hola - привет"
              Colum2_2="НО: ola - волна"
              />
            <ButtonWithSheet
              Title="K"
              Description="Сложные Буквы"
              Colum1_1="в заимствованиях из английского языка"
              Colum1_2="kiwi"
              Colum2_2="kilo"
              Colum3_2="kiosko"
              />
            <ButtonWithSheet
              Title="K"
              Description="Сложные Буквы"
              Colum1_1="в заимствованиях из английского языка"
              Colum1_2="kiwi"
              Colum2_2="kilo"
              Colum3_2="kiosko"
              />
            <ButtonWithSheet
              Title="L"
              Description="Сложные Буквы"
              Colum1_1="1) перед a, o, u, согл. /Л/"
              Colum2_1="2) перед e, i /ЛЬ/ "
              Colum3_1="3) “LL” = /Ж,Ш/ "
              Colum1_2="lana, lona, luna"
              Colum2_2="español, capital"
              Colum3_2="me llamo, pollo"
              />
            <ButtonWithSheet
              Title="Ñ"
              Description="Сложные Буквы"
              Colum1_1="всегда /НЬ/"
              Colum1_2="España"
              Colum2_2="Español"
              Colum3_2="niño"
              />
            <ButtonWithSheet
              Title="L"
              Description="Сложные Буквы"
              Colum1_1="Нужна только для того чтобы создать звук К перед е, i "
              Colum2_1="QUE /ке/"
              Colum3_1="QUI /ки/"
              Colum1_2="que - что"
              Colum2_2="queso"
              Colum3_2="kilo = quilo"
              />
            <ButtonWithSheet
              Title="R"
              Description="Сложные Буквы"
              Colum1_1="не то же самое RR"
              Colum1_2="pero  - но (but)"
              Colum2_2="perro - собака"
              />
            <ButtonWithSheet
              Title="W"
              Description="Сложные Буквы"
              Colum1_1="в заимствованиях из английского языка"
              Colum1_2="kiwi"
              />
            <ButtonWithSheet
              Title="X"
              Description="Сложные Буквы"
              Colum1_1="/кс/ "
              Colum1_2="taxi"
              Colum2_2="maxi"
              />
            <ButtonWithSheet
              Title="Y"
              Description="Сложные Буквы"
              Colum1_1="читается как  /Ж,Ш/  во всех случаях кроме союза Y"
              Colum1_2="yo"
              Colum2_2="ya"
              Colum3_2="yate"
              Colum4_2="Maria y Ana"
              />
            <ButtonWithSheet
              Title="Z"
              Description="Сложные Буквы"
              Colum1_1="всегда  /С/"
              Colum1_2="zebra"
              Colum2_2="cerveza"
              />
          </XStack>
        </YStack>
        <YStack>
          <H3 ta="center" >Обратите внимание:</H3>
          <YStack ml="$10">
            <Paragraph>
              GUE GUI = ге ги<br />
              QUE QUI  = ке ки<br />
              <br />
              Удвоение в испанском меняет смысл:<br />
              l - LL (lama - llama)<br />
              R - RR (pero - perro)<br />
              C-CC (canción - lección)<br />
              <br />
              Других удвоений не бывает: <br />
                  SS<br />
                  FF
            </Paragraph>
          </YStack>
        </YStack>
        <YStack>
        <LangComponent
            ButtonName="Check Answers"
            messageIncorect="This is incorrect">
            <LangTest 
              text1="1) El "
              text2=" Juan"
              question="escribo..."
              RightAnswer="es"
              size="200"
              />
            <LangTest 
              text1="2) Yo "
              text2=" Maria"
              question="escribo..."
              RightAnswer="soy"
              size="300"
              />
            <LangTest 
              text1="3) Nosotros "
              text2=" de Francia."
              question="escribo..."
              RightAnswer="somos"
              size="300"
              />
              <LangTest 
              text1="4) Ellos "
              text2=" en Moscú."
              question="escribo..."
              RightAnswer="son"
              size="300"
              />
              <LangTest 
              text1="5) Vos "
              text2=" inteligente."
              question="escribo..."
              RightAnswer="sos"
              size="300"
              />
              <LangTest 
              text1="6) Ellos "
              text2=" nerviosos."
              question="escribo..."
              RightAnswer="son"
              size="300"
              />
              <LangTest 
              text1="7) Yo "
              text2=" libre (свободен) hoy (сегодня)."
              question="escribo..."
              RightAnswer="estoy"
              size="300"
              />
              <LangTest 
              text1="8) Ustedes "
              text2=" mis amigos."
              question="escribo..."
              RightAnswer="son"
              size="300"
              />
              <LangTest 
              text1="9) Mis papás "
              text2=" ricos (богатые)."
              question="escribo..."
              RightAnswer="son"
              size="300"
              />
          </LangComponent>
        </YStack>
      </YStack>
    </YStack>
  );
} 