import { H4,Paragraph, YStack, XStack, Input, Square, Separator, listItemStaticConfig } from 'tamagui';
import React, { useState, useEffect } from "react";
import { ParagraphCustom } from "./CustomText";
import { IceCream, Triangle } from '@tamagui/lucide-icons';

import { ToastComp } from "@my/ui/src/components/ToastComp";
import { HelpComp } from "@my/ui/src/components/HelpComp";

/// dufok and gpt was here (^.^')
///
/// This component is used in the lesson3 screen
/// It is a test with a list of questions and answers
/// The user must enter the correct answer in the input field
/// If the answer is correct, the green icon is displayed
///
/// Json example:
///
/// "langTest1": {
///   "1": {
///       "header": "Урок 1. Приветствие",
///       "question": "Много русских людей сейчас в Аргентине. А вы откуда?",
///       "unswer": "*/Muchas personas rusas ahora están en Argentina. ¿Y ustedes de dónde son?/*"
///   },
///   "testContent": {
///       "1": {
///           "question": "1) Много русских людей сейчас в Аргентине. А вы откуда?",
///           "unswer": [
///               "muchas personas rusas ahora están en argentina. ¿y ustedes de dónde son?",
///               "muchas personas rusas ahora estan en argentina. ¿y ustedes de donde son?",
///               "muchas personas rusas ahora están en argentina. y ustedes de dónde son?",
///               "muchas personas rusas ahora estan en argentina. y ustedes de donde son?"
///           ]
///       },
///       "2": {
///           "question": "2) Люди из Аргентины очень веселые и спокойные.",
///           "unswer": [
///               "las personas de argentina son muy alegres y tranquilas.",
///               "las personas de argentina son mucho alegres y tranquilas."
///           ]
///       },
///       ...
///   }
/// }

export type Test = {
  question: string;
  unswer: string[];
  help: string;
}

interface LangTestProps {
  tests: Test[];
  example: { header: string, question: string, unswer: string };
  isOneColumn?: boolean;
}

export const LangTest1: React.FC<LangTestProps> = ({ tests, example, isOneColumn = false }) => {

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

  const renderTest = ({ question, unswer, help }, index) => {

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
          <XStack>
            <Paragraph mr="$2">{question}</Paragraph>
            {help && <HelpComp texts={help} html={index} />}
          </XStack>
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
  }
  
  return (

    <YStack w="100%" f={1} paddingHorizontal="$6" mb="$4" maw={1000} ai="center">

      <ToastComp 
        toastList={list}
        position="bottom-right"
        autoDelete={true}
        autoDeleteTime={3000}
      />
      
      {example && (
        <YStack ai="center" mb="$4" space={4}>
          <H4 ta="center" >{example.header}</H4>
          <ParagraphCustom text={example.question}/>
          <YStack m="$1"/>
          {example.unswer && (
            <YStack f={1}
              boc="$backgroundHover"
              borderWidth="$1"
              br="$3"
              p="$1.5"
              paddingHorizontal="$7"
              >
              <ParagraphCustom text={example.unswer}/>
            </YStack>
          )}
        </YStack>
      )}

      <Separator w="60%" borderColor="$backgroundFocus" $sm={{width: "90%"}}/>    

      {tests && (
      <YStack ai="center" f={1} mt="$4">
        {isOneColumn 
          ? <YStack m="$2" w="90%" $gtSm={{ width: "80%" }}>
              <YStack>
                {[...firstHalf, ...secondHalf].map(renderTest)}
              </YStack>
            </YStack>
          : <XStack fw="wrap" jc="space-between">
              <YStack m="$2" w="90%" $gtSm={{ width: "40%" }}>
                {firstHalf.map(renderTest)}
              </YStack>
              <YStack m="$2" w="90%" $gtSm={{ width: "40%" }}>
                {secondHalf.map(renderTest)}
              </YStack>
            </XStack>
        }
      </YStack>
      )}
    </YStack>
  );
}