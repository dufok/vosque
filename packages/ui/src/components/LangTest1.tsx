import { Paragraph, YStack, XStack, Input, Square } from 'tamagui';
import React, { useState, useEffect } from "react";
import { ParagraphCustom } from "./CustomText"; 

export type Test = {
  question: string;
  unswer: string[];
}

interface LangTestProps {
  tests: Test[];
  example: Test;
}

export const LangTest: React.FC<LangTestProps> = ({ tests, example }) => {
  return (
    <YStack ai="flex-start" m="$6">
    {example && (
      <XStack space={4} fw="wrap">
          <ParagraphCustom text={example.question}/>
        <YStack m="$1"/>
        <YStack f={1} borderWidth="$0.5" br="$3" p="$1" paddingHorizontal="$4">
          <ParagraphCustom text={example.unswer}/>
        </YStack>
      </XStack>
      )}
      {tests && tests.map(({ question, unswer }, index) => {
        const [answer, setAnswer] = useState("");
        const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

        useEffect(() => {
          if (answer !== "") {
            setIsCorrect(unswer.includes(answer.toLowerCase()));
          } else {
            setIsCorrect(null);
          }
        }, [answer, unswer]);

        const handleAnswerChange = (text: string) => {
          setAnswer(text);
        };

        return (
          <XStack fw="wrap" key={index} ai="center" >
            <Paragraph mr="$2" >{question}</Paragraph>
            <YStack jc="center" f={1}>
                <Input 
                  size="$3" 
                  m="$2"
                  opacity={0.7}
                  placeholder={"Ваш ответ ..."}
                  onChangeText={handleAnswerChange}
                  backgroundColor={isCorrect === true ? 'green' : 'initial'}
                  borderColor={isCorrect === false ? 'red' : 'initial'}
                  borderWidth={isCorrect === false ? '$1' : '$0.5'}
                />
            </YStack>
          </XStack>
        );
      })}
    </YStack>
  );
}
