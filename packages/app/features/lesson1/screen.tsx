import { Paragraph, YStack, H3 } from "@my/ui";
import { Player,
  BigPlayButton,
  PosterImage,
  LoadingSpinner,
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton
  } from 'video-react';
import React from "react";
import '../../background.css';
import PropTypes from 'prop-types';

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
    <YStack ai="center" jc="flex-start" flex={1} space="$10" className="background-image">
      <Paragraph ta="center" fow="$16" >
        ЧАСТЬ 1. ФОНЕТИКА
      </Paragraph>
      <YStack
        bw={1}
        boc="$color1"
        bc="$background"
        br="$10" 
        maw={1000}
        miw={400}
        p="$4"
        shadowColor={"$shadowColor"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        >
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
        <H3 ta="center"  mt='$10'>Сложные буквы</H3>
        <Paragraph maw={350} ta='center'>
           какой то текст
        </Paragraph>
      </YStack>
    </YStack>
  );
} 