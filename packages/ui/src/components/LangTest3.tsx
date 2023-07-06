import {
  Paragraph,
  YStack,
  XStack,
  Separator,
  H5,
  H4,
  Button,
  Unspaced
        } from 'tamagui';
import React, { useState, useEffect } from "react";
import { Sheet } from '@tamagui/sheet'
import { ChevronDown} from '@tamagui/lucide-icons'
import { X } from '@tamagui/lucide-icons'

export type Test = {
  description: string;
  question: string;
  unswer: string[];
}

interface LangTestProps {
  tests: Test[];
  example: { header: string, question: string, unswer: string };
  isOneColumn?: boolean;
}

export const LangTest3: React.FC<LangTestProps> = ({ tests, example, isOneColumn = false }) => {

  const midIndex = Math.ceil(tests.length / 2);
  const firstHalf = tests.slice(0, midIndex);
  const secondHalf = tests.slice(midIndex);

  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)

  const renderTest = ({ question, description }, index) => {
    return (
      <YStack key={index} mb="$4">
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
  }

  return (
    
    <YStack w="100%" f={1} paddingHorizontal="$6" mb="$4" maw={1000} ai="center">
      
      {example && (
        <YStack ai="center" mb="$4" space={4}>
          <H4 ta="center" >{example.header}</H4>
        </YStack>  
      )}

      <Separator w="60%" borderColor="$backgroundFocus" $sm={{width: "90%"}}/>    

      {tests && (
        <YStack ai="center" f={1} mt="$4">
          {isOneColumn
            ?<YStack m="$2" w="100%">
              <YStack>
                {[...firstHalf, ...secondHalf].map(renderTest)}
              </YStack>
            </YStack>
            :<XStack fw="wrap" jc="space-between">
              <YStack m="$2" w="100%" $gtSm={{ width: "45%" }}>
                {firstHalf.map(renderTest)}
              </YStack>
              <YStack m="$2" w="100%" $gtSm={{ width: "45%" }} >  
                {secondHalf.map(renderTest)}
              </YStack>
            </XStack>
          }

          <Separator w="60%" mb="$4" borderColor="$backgroundFocus" $sm={{width: "90%"}}/>
          <YStack ai="center">
            <Button
              br="$2"
              bw="$1"
              boc="$backgroundPress"
              onPress={() => {
                setOpen(true);
              }}>
                Проверить
            </Button>
            <Sheet
                forceRemoveScrollEnabled={open}
                modal={true}
                open={open}
                onOpenChange={setOpen}
                snapPoints={[85, 50, 25]}
                dismissOnSnapToBottom
                position={position}
                onPositionChange={setPosition}
                zIndex={100_000}
                
              >
              <Sheet.Overlay />
              <Sheet.Handle />
              <Sheet.Frame
                flex={1}
                padding="$4"
                justifyContent="center"
                alignItems="center"
                space="$5"
              >
                <Button size="$6" boc="$backgroundFocus" circular icon={ChevronDown} onPress={() => setOpen(false)} />
                <Sheet.ScrollView padding="$4" space>
                  <YStack ai="center" maw={800} mt="$4" p="$4">
                    <YStack w="100%">
                        {[...firstHalf, ...secondHalf].map(({ unswer, description}, index) => {
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
                  </YStack>
                </Sheet.ScrollView>
              </Sheet.Frame>
            </Sheet>

          </YStack>
        </YStack>
      )}
    </YStack>
  );
}