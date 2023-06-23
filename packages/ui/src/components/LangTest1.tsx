import { Paragraph, YStack, XStack, Input, Square, Separator, listItemStaticConfig } from 'tamagui';
import React, { useState, useEffect } from "react";
import { ParagraphCustom } from "./CustomText";
import { IceCream, Triangle } from '@tamagui/lucide-icons';

import { ToastComp } from "@my/ui/src/components/ToastComp";
import { HelpComp } from "@my/ui/src/components/HelpComp";


export type Test = {
  question: string;
  unswer: string[];
}

interface LangTestProps {
  tests: Test[];
  example: Test;
}

export const LangTest1: React.FC<LangTestProps> = ({ tests, example }) => {

  const midIndex = Math.ceil(tests.length / 2);
  const firstHalf = tests.slice(0, midIndex);
  const secondHalf = tests.slice(midIndex);

  const [list, setList] = useState<any[]>([]);

  const showToast = (type, unswer) => {

    let toastProperties;

    switch (type) {
      case "success":
        toastProperties = {
          id: 1,
          title: "Отлично",
          description: "Это правильный ответ",
          backgroundColor: "#5cb85c",
          icon: IceCream,
        };
        break;
      case "error":
        toastProperties = {
          id: 2,
          title: "Упс",
          description: `Ответ должен быть таким "${unswer[0]}"`,
          backgroundColor: "#d9534f",
          icon: Triangle,
        };
        break;
      default:
        setList([]);
        break
    }

    setList([...list, toastProperties]);

  };
  
  return (

    <YStack w="100%" f={1} p="$6" maw={1000} ai="center">

      <ToastComp 
        toastList={list}
        position="bottom-right"
        autoDelete={true}
        autoDeleteTime={3000}
      />
      
      {example && (
        <YStack ai="center" mb="$4" space={4}>
              <ParagraphCustom text={example.question}/>
            <YStack m="$1"/>
            <YStack f={1} boc="$backgroundHover"  borderWidth="$1" br="$3" p="$1.5" paddingHorizontal="$7" >
              <ParagraphCustom text={example.unswer}/>
            </YStack>
        </YStack>
      )}

      <Separator w="60%" borderColor="$backgroundFocus" $sm={{width: "90%"}}/>    

      {tests && (
        <YStack ai="center" f={1} mt="$4">
          <XStack fw="wrap" jc="space-between">
            <YStack m="$2" w="90%" $gtSm={{ width: "40%" }}>
              {firstHalf.map(({ question, unswer }, index) => {
      
                const [answer, setAnswer] = useState("");
                const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
                const [inputFocus, setInputFocus] = useState(false);

                useEffect(() => {
                  if (answer !== "") {
                    setIsCorrect(unswer.includes(answer.toLowerCase()));
                  } else {
                    setIsCorrect(null);
                  }
                }, [answer, unswer]);

                const handleAnswerChange = (text, unswer) => {
                  setAnswer(text);

                  if (text !== "") {
                    setIsCorrect(unswer.includes(text.toLowerCase()));
                  } else {
                    setIsCorrect(null);
                  }
                };

                const handleInputFocus = () => {
                  setInputFocus(true);
                };

                const handleInputBlur = () => {
                  setInputFocus(false);
                
                  if (isCorrect !== null && answer !== "") {
                    showToast(isCorrect ? "success" : "error", unswer);
                  }
                }; 

                return (
                  <YStack key={index} ai="flex-start" w="100%" >
                    <YStack>
                      <Paragraph mr="$2">{question}</Paragraph>
                    </YStack>
                    <YStack jc="center" m="$2" w="100%" >
                        <Input 
                          size="$3" 
                          opacity={0.7}
                          br="$3"
                          placeholder={"Ваш ответ ..."}
                          onChangeText={(text) => handleAnswerChange(text, unswer)}
                          backgroundColor={isCorrect === true ? 'green' : '$background'}
                          borderColor={isCorrect === false ? 'red' : '$backgroundHover'}
                          borderWidth={isCorrect === false ? '$2' : '$1'}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                        />
                    </YStack>
                  </YStack>
                );
              })}
            </YStack>

            <YStack m="$2" w="90%" $gtSm={{ width: "40%" }} >  
              {secondHalf.map(({ question, unswer }, index) => {
                const [answer, setAnswer] = useState("");
                const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
                const [inputFocus, setInputFocus] = useState(false);
            

                useEffect(() => {
                  if (answer !== "") {
                    setIsCorrect(unswer.includes(answer.toLowerCase()));
                  } else {
                    setIsCorrect(null);
                  }
                }, [answer, unswer]);

                const handleAnswerChange = (text, unswer) => {
                  setAnswer(text);

                  if (text !== "") {
                    setIsCorrect(unswer.includes(text.toLowerCase()));
                  } else {
                    setIsCorrect(null);
                  }
                };

                const handleInputFocus = () => {
                  setInputFocus(true);
                };

                const handleInputBlur = () => {
                  setInputFocus(false);
                
                  if (isCorrect !== null && answer !== "") {
                    showToast(isCorrect ? "success" : "error", unswer);
                  }
                };

                return (
                  <YStack key={index} ai="flex-start" w="100%">
                    <YStack>
                      <Paragraph mr="$2" >{question}</Paragraph>
                    </YStack>
                    <YStack jc="center" m="$2" w="100%">
                        <Input 
                          size="$3" 
                          opacity={0.7}
                          br="$3"
                          placeholder={"Ваш ответ ..."}
                          onChangeText={(text) => handleAnswerChange(text, unswer)}
                          backgroundColor={isCorrect === true ? 'green' : '$background'}
                          borderColor={isCorrect === false ? 'red' : '$backgroundHover'}
                          borderWidth={isCorrect === false ? '$2' : '$1'}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                        />
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