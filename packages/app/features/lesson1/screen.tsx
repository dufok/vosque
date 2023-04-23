import {
  Paragraph,
  YStack,
  XStack,
  H1,
  H2,
  H3,
  Image,
  Button,
  Separator,
  Spinner
 } from "@my/ui";
import { Player,
  BigPlayButton,
  PosterImage,
  LoadingSpinner,
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton
  } from 'video-react';
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect} from "react";
import PropTypes from 'prop-types';
import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { ParagraphCustom } from '@my/ui/src/components/CustomText';
import { ContentLesson1 } from './type_Lesson1';

import "./../../../../node_modules/video-react/dist/video-react.css"; // import css
import { red } from "@tamagui/colors";

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
  const userpageLinkProps = useLink({
    href: "/userpage",
  });
  const lesson2LinkProps = useLink({
    href: "/lesson2",
  });

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  //lesson content
  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const firstLesson = userLessons?.[0];

  //part with types from file json full
  const content = firstLesson?.content as ContentLesson1;
  const letters = content?.theoreticalBlock.complex.letters;
  const atentionBlocks = content?.theoreticalBlock.attention.atentionBlocks;
  const exercises = content?.exercisesBlock.training1.exercises;
  const exercises2 = content?.exercisesBlock.training2.exercises2;
  const linesAdditional = content?.exercisesBlock.additional.materials.readingPhrase.linesAdditional;
  const contentAccents = content?.exercisesBlock.accent.contentAccents;
  const lifehack1 = content?.lifehacks.lifehack1;
  const lifehack2 = content?.lifehacks.lifehack2;
  const lifehack3 = content?.lifehacks.lifehack3;

  // Part for split last block on 2 parts
  const contentVocabularys = Object.values(content?.vocabulary.contentVocabularys  || {});

  // Split the array into two halves
  const midIndex = Math.ceil(contentVocabularys.length / 2);
  const firstHalf = contentVocabularys.slice(0, midIndex);
  const secondHalf = contentVocabularys.slice(midIndex);

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isLoading) {
    <YStack ai="center" jc="center" mih={600} flex={1} space="$4">
      <Spinner size="large" color="$green" />;
    </YStack>
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack ai="center" jc="flex-start" flex={1} space="$4">
        <YStack ai="center" jc="flex-start" flex={1} space="$4">
          <YStack mt="$4" p="$4" miw={400} maw={1000}>
            <H1 ta="center">{firstLesson?.name}</H1>
            <Paragraph ta="center">{content?.description}</Paragraph>
            <YStack f={1} m="$2" maw={800}>
              <Player
                autoPlay
                poster={content?.poster}
                src={content?.video}
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
            <YStack>
              <Image
                  src={content?.theoreticalBlock.image}
                  width={50}
                  height={50}
              />
              <H2>{content?.theoreticalBlock.header}</H2>
            </YStack>
            <YStack >
              <H3 ta="left" backgroundColor="red">{content?.theoreticalBlock.alfabet.header}</H3>
              <Paragraph ta="center" >{content?.theoreticalBlock.alfabet.text}</Paragraph>
            </YStack>
            <YStack>
              <H3 ta="left" backgroundColor="red">{content?.theoreticalBlock.complex.header}</H3>
              <Paragraph ta="center" >{content?.theoreticalBlock.complex.description}</Paragraph>
              <XStack jc="center" m="$4" fw='wrap'>
                {Object.values(letters).map((letter) => (
                  <ButtonWithSheet
                    key={letter.name}
                    Title={letter.name}
                    Description={letter.description}
                    Colum1_1={letter.Colum1_1}
                    Colum2_1={letter.Colum2_1}
                    Colum3_1={letter.Colum3_1}
                    Colum4_1={letter.Colum4_1}
                    Colum1_2={letter.Colum1_2}
                    Colum2_2={letter.Colum2_2}
                    Colum3_2={letter.Colum3_2}
                    Colum4_2={letter.Colum4_2}
                  />
                ))}
              </XStack>
            </YStack>
            <YStack>
              <H3 ta="left" backgroundColor="red">{content?.theoreticalBlock.attention.title}</H3>
              <XStack>
                <YStack>
                  {Object.values(atentionBlocks).map((atentionBlock) => (
                    <YStack>
                      <H3 ta="left" >{atentionBlock.description}</H3>
                        <YStack ml="$10">
                          <XStack>
                            <YStack>
                              <Paragraph ta="left" >{atentionBlock.example1}</Paragraph>
                              <Paragraph ta="left" >{atentionBlock.example2}</Paragraph>
                              <Paragraph ta="left" >{atentionBlock.example3}</Paragraph>
                              <Paragraph ta="left" >{atentionBlock.example4}</Paragraph>
                            </YStack>
                            <YStack>
                              <Paragraph ta="left" >{atentionBlock.prononce1}</Paragraph>
                              <Paragraph ta="left" >{atentionBlock.prononce2}</Paragraph>
                              <Paragraph ta="left" >{atentionBlock.prononce3}</Paragraph>
                              <Paragraph ta="left" >{atentionBlock.prononce4}</Paragraph>
                            </YStack>
                          </XStack>
                        </YStack>
                    </YStack>
                    ))}
                </YStack>
                <YStack
                  ai="center"
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
                  <Image
                  src={lifehack1.image}
                  width={50}
                  height={50}
                  />
                  <H3>{lifehack1.title}</H3>
                  <Paragraph ta="center">{lifehack1.description1}</Paragraph>
                  <Paragraph ta="center">{lifehack1.content1[1].text}</Paragraph>
                  <Paragraph ta="center">{lifehack1.content1[2].text}</Paragraph>
                  <Paragraph ta="center">{lifehack1.content1[3].text}</Paragraph>
                  <Paragraph ta="center">{lifehack1.description2}</Paragraph>
                  <ParagraphCustom text={lifehack1.content2[1].text} />
                  <ParagraphCustom text={lifehack1.content2[2].text} />
                  <ParagraphCustom text={lifehack1.content2[3].text} />
                </YStack>
              </XStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.exercisesBlock.header}</H2>
              <YStack>
                <H3 ta="left" backgroundColor="red">{content?.exercisesBlock.training1.header}</H3>
                <YStack>
                  {Object.values(exercises).map((exercise) => (
                    <XStack>
                      <YStack>
                        <H3 ta="left" >{exercise.description}</H3>
                        <Paragraph ta="left" >{exercise.text}</Paragraph>
                      </YStack>
                      <YStack>
                        <Player
                          src={exercise.audio}
                          >
                        </Player>
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.exercisesBlock.additional.header}</H2>
              <YStack>
                <H3 ta="left" backgroundColor="red">{content?.exercisesBlock.additional.materials.readingPhrase.description}</H3>
                <Paragraph ta="left" >{content?.exercisesBlock.additional.materials.readingPhrase.text}</Paragraph>
                <YStack>
                  {Object.values(linesAdditional).map((Line) => (
                    <XStack>
                      <YStack>
                        <ParagraphCustom text={Line.text} />
                      </YStack>
                      <YStack>
                        <Player
                          src={Line.audio}
                          >
                        </Player>
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            </YStack>
            <YStack>
              <XStack>
                <YStack
                  ai="center"
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
                  <Image
                  src={lifehack2.image}
                  width={50}
                  height={50}
                  />
                  <H3>{lifehack2.title}</H3>
                  <Paragraph ta="center">{lifehack2.description1}</Paragraph>
                </YStack>
                <YStack
                  ai="center"
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
                  <Image
                  src={lifehack3.image}
                  width={50}
                  height={50}
                  />
                  <H3>{lifehack3.title}</H3>
                  <Paragraph ta="center">{lifehack3.description1}</Paragraph>
                </YStack>
              </XStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.exercisesBlock.accent.header}</H2>
              <YStack>
                {Object.values(contentAccents).map((ContentAccent) => (
                  <YStack>
                    <H3 ta="left" >{ContentAccent.text}</H3>
                    <Paragraph ta="left" >{ContentAccent.example}</Paragraph>
                  </YStack>
                ))}
              </YStack>
            </YStack>
            <YStack>
              <H3 ta="left" backgroundColor="red">{content?.exercisesBlock.training2.header}</H3>
              <Paragraph ta="left" >{content?.exercisesBlock.training2.description}</Paragraph>
              <YStack>
                {Object.values(exercises2).map((exercise2) => (
                  <XStack>
                    <YStack>
                      <H3 ta="left" >{exercise2.description}</H3>
                      <Paragraph ta="left" >{exercise2.text}</Paragraph>
                    </YStack>
                    <YStack>
                      <Player
                        src={exercise2.audio}
                        >
                      </Player>
                    </YStack>
                  </XStack>
                ))}
              </YStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.vocabulary.header}</H2>
              <Paragraph ta="left" >{content?.vocabulary.description}</Paragraph>
              <XStack>
                <YStack>
                  {firstHalf.map((ContentVocabulary, index) => (
                  <YStack key={index}>
                    <XStack>
                      <Paragraph ta="left">{ContentVocabulary.text1}</Paragraph>
                      <Separator />
                      <Paragraph ta="right">{ContentVocabulary.text2}</Paragraph>
                    </XStack>
                    <Paragraph ta="center">{ContentVocabulary.description}</Paragraph>
                  </YStack>
                  ))}
                </YStack>
                <Separator vertical/>
                <YStack>
                  {secondHalf.map((ContentVocabulary, index) => (
                  <YStack key={index}>
                    <XStack>
                      <Paragraph ta="left">{ContentVocabulary.text1}</Paragraph>
                      <Separator />
                      <Paragraph ta="right">{ContentVocabulary.text2}</Paragraph>
                    </XStack>
                    <Paragraph ta="center">{ContentVocabulary.description}</Paragraph>
                  </YStack>
                  ))}
                </YStack>
              </XStack>
            </YStack>
            <YStack pt="$10" pb="$10" >
              <Button f={1} {...lesson2LinkProps} theme={"gray"}>
                Урок 2
              </Button>
            </YStack>
          </YStack>
        </YStack>
        <YStack f={1} pt="$10" pb="$10" backgroundColor="$backgroundHover" >
          <Button {...userpageLinkProps} theme={"gray"}>
            ВОЙТИ/ЗАПИСАТЬСЯ
          </Button>
        </YStack>
    </YStack>
  );
} 