import { Paragraph, YStack, XStack } from "tamagui";
import React from "react";
import { Player,
  BigPlayButton,
  PosterImage,
  LoadingSpinner,
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton
  } from 'video-react';
import PropTypes from 'prop-types';
import '@my/ui/src/video-react.css'; // import css

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

export function VideoPlayer({linkVideo}) {
  return (
    <YStack ai="center" maw={800}>
      <Player
        poster=""
        src={linkVideo}
        >
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar autoHide={false} className="my-class">
          <ForwardControl seconds={5} order={3.1} />
          <ForwardControl seconds={10} order={3.2} />
          <ForwardControl seconds={30} order={3.3} />
        </ControlBar>
      </Player>
    </YStack>
  );
} 