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
import { X } from '@tamagui/lucide-icons'

export type Test = {
  description: string;
  question: string;
  unswer: string[];
}

interface LangTestProps {
  tests: Test[];
  example: { header: string, question: string, unswer: string };
}

export const LangTest3: React.FC<LangTestProps> = ({ tests, example }) => {

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
              {firstHalf.map(({ question, unswer, description}, index) => {
      

                return (
                  <YStack key={index}  w="100%" mb="$4">
                    { description && (
                      <YStack ai="flex-start" mb="$2">
                        <H5 mr="$2">{description}</H5>
                      </YStack>
                    )}
                    <YStack ai="flex-start" mb="$2">
                      <Paragraph mr="$2">{question}</Paragraph>
                    </YStack>
                  </YStack>
                );
              })}
            </YStack>

            <YStack m="$2" w="100%" $gtSm={{ width: "45%" }} >  
              {secondHalf.map(({ question, unswer, description }, index) => {

                return (
                  <YStack key={index}  w="100%" mb="$4">
                    { description && (
                      <YStack ai="flex-start" mb="$2">
                        <H5 mr="$2">{description}</H5>
                      </YStack>
                    )}
                    <YStack ai="flex-start" mb="$2">
                      <Paragraph mr="$2">{question}</Paragraph>
                    </YStack>
                  </YStack>
                );
              })}
            </YStack>
          </XStack>
          <Separator w="60%" mb="$4" borderColor="$backgroundFocus" $sm={{width: "90%"}}/>
          <YStack ai="center">
            
            <Dialog modal>
              <Dialog.Trigger asChild>
                <Button
                  br="$2"
                  bw="$1"
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
                <Dialog.Description>
                <YStack ai="center" maw={1000} mt="$4" p="$4">
                  <XStack fw="wrap" jc="space-between">
                    <YStack m="$2" w="100%" $gtSm={{ width: "45%" }}>
                      {firstHalf.map(({ question, unswer, description}, index) => {
              

                        return (
                          <YStack key={index}  w="100%" mb="$4">
                            { description && (
                              <YStack ai="flex-start" mb="$2">
                                <H5 mr="$2">{description}</H5>
                              </YStack>
                            )}
                            <YStack ai="flex-start" mb="$2">
                              <Paragraph mr="$2">{unswer}</Paragraph>
                            </YStack>
                          </YStack>
                        );
                      })}
                    </YStack>

                    <YStack m="$2" w="100%" $gtSm={{ width: "45%" }} >  
                      {secondHalf.map(({ question, unswer, description }, index) => {

                        return (
                          <YStack key={index}  w="100%" mb="$4">
                            { description && (
                              <YStack ai="flex-start" mb="$2">
                                <H5 mr="$2">{description}</H5>
                              </YStack>
                            )}
                            <YStack ai="flex-start" mb="$2">
                              <Paragraph mr="$2">{unswer}</Paragraph>
                            </YStack>
                          </YStack>
                        );
                      })}
                    </YStack>
                  </XStack>
                </YStack>
                </Dialog.Description>
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
      )}
    </YStack>
  );
}