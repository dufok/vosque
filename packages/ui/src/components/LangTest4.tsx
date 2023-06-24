import {
  Paragraph,
  YStack,
  XStack,
  Input,
  Square,
  Separator,
  listItemStaticConfig,
  H4,
  H5,
  Button,
  Dialog,
  Adapt,
  Sheet,
  Unspaced
        } from 'tamagui';
import React, { useState, useEffect } from "react";
import { ParagraphCustom } from "./CustomText";
import { HelpComp } from "@my/ui/src/components/HelpComp";
import { X } from '@tamagui/lucide-icons'

export type Test = {
  description: string;
  question: string;
  unswer: string[];
  help: string;
}

interface LangTestProps {
  tests: Test[];
  example: { header: string, question: string, unswer: string };
}

export const LangTest4: React.FC<LangTestProps> = ({ tests, example }) => {

  const midIndex = Math.ceil(tests.length / 2);
  const firstHalf = tests.slice(0, midIndex);
  const secondHalf = tests.slice(midIndex);

  return (

    <YStack w="100%" f={1} p="$6" maw={1000} ai="center">

      
      {example && (
        <YStack ai="center" mb="$4" space={4}>
          <H4 ta="center" >{example.header}</H4>
        </YStack>
              
      )}

      <Separator w="60%" borderColor="$backgroundFocus" $sm={{width: "90%"}}/>    

      {tests && (
        <YStack ai="center" f={1} mt="$4">
          <XStack fw="wrap" jc="space-between">
            <YStack m="$2" w="100%" $gtSm={{ width: "45%" }}>
              {firstHalf.map(({ question, unswer, description, help }, index) => {
      

                return (
                  <YStack key={index}  w="100%" mb="$4">
                    { description && (
                      <YStack ai="center" mb="$2">
                        <H5 ta="center" mr="$2">{description}</H5>
                      </YStack>
                    )}
                    <YStack ai="flex-start" mb="$2">
                      <XStack>
                        <Paragraph mr="$2">{question}</Paragraph>
                        {help && <HelpComp texts={help} html={index} />}
                      </XStack>
                    </YStack>
                    <YStack ai="center">
                      <Separator mb="$2" w="40%" borderColor="$backgroundPress" /> 
                    </YStack>
                    <YStack ai="center">

                      <Dialog modal>
                        <Dialog.Trigger asChild>
                          <Button
                            br="$2"
                            bw="$1"
                            size="$2"
                            fontSize={13}
                            boc="$backgroundPress">
                              Проверить
                          </Button>
                        </Dialog.Trigger>

                        <Adapt when="sm" platform="touch">
                          <Sheet zIndex={200000} modal dismissOnSnapToBottom>
                            <Sheet.Frame padding="$4" space>
                              <Adapt.Contents />
                            </Sheet.Frame>
                            <Sheet.Overlay />
                          </Sheet>
                        </Adapt>

                        <Dialog.Portal>
                          <Dialog.Overlay
                            key="overlay"
                            animation="quick"
                            o={0.5}
                            enterStyle={{ o: 0 }}
                            exitStyle={{ o: 0 }}
                          />

                          <Dialog.Content
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
                            space
                          >
                          <Dialog.Title>Перевод</Dialog.Title>
                            <YStack ai="center" m="$4" maw={400}>
                              <Paragraph>{unswer}</Paragraph>
                            </YStack>
                          <Unspaced>
                            <Dialog.Close asChild>
                              <Button pos="absolute" t="$3" r="$3" size="$2" circular icon={X} />
                            </Dialog.Close>
                          </Unspaced>
                        </Dialog.Content>
                       </Dialog.Portal>
                      </Dialog>
                    </YStack>
                  </YStack>
                );
              })}
            </YStack>

            <YStack m="$2" w="100%" $gtSm={{ width: "45%" }} >  
              {secondHalf.map(({ question, unswer, description, help }, index) => {

                return (
                  <YStack key={index}  w="100%" mb="$4">
                    { description && (
                      <YStack ai="center" mb="$2">
                        <H5 ta="center" mr="$2">{description}</H5>
                      </YStack>
                    )}
                    <YStack ai="flex-start" mb="$2">
                      <XStack>
                        <Paragraph mr="$2">{question}</Paragraph>
                        {help && <HelpComp texts={help} html={index} />}
                      </XStack>
                    </YStack>
                    <YStack ai="center">
                      <Separator mb="$2" w="40%" borderColor="$backgroundPress" /> 
                    </YStack>
                    <YStack ai="center">

                      <Dialog modal>
                        <Dialog.Trigger asChild>
                          <Button
                            br="$2"
                            bw="$1"
                            size="$2"
                            fontSize={13}
                            boc="$backgroundPress">
                              Проверить
                          </Button>
                        </Dialog.Trigger>

                        <Adapt when="sm" platform="touch">
                          <Sheet zIndex={200000} modal dismissOnSnapToBottom>
                            <Sheet.Frame padding="$4" space>
                              <Adapt.Contents />
                            </Sheet.Frame>
                            <Sheet.Overlay />
                          </Sheet>
                        </Adapt>

                        <Dialog.Portal>
                          <Dialog.Overlay
                            key="overlay"
                            animation="quick"
                            o={0.5}
                            enterStyle={{ o: 0 }}
                            exitStyle={{ o: 0 }}
                          />

                          <Dialog.Content
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
                            space
                          >
                          <Dialog.Title>Перевод</Dialog.Title>
                              <Paragraph>{unswer}</Paragraph>
                          <Unspaced>
                            <Dialog.Close asChild>
                              <Button pos="absolute" t="$3" r="$3" size="$2" circular icon={X} />
                            </Dialog.Close>
                          </Unspaced>
                        </Dialog.Content>
                       </Dialog.Portal>
                      </Dialog>
                    </YStack>
                  </YStack>
                );
              })}
            </YStack>
          </XStack>
        </YStack>
      )}
    </YStack>
  );
}