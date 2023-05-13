import { Paragraph, YStack, XStack, Input } from 'tamagui';
import React, { useState, useEffect } from "react";

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
      <XStack space={4}>
        <Paragraph>{example.question}</Paragraph>
        <Paragraph>{example.unswer.join(', ')}</Paragraph>
      </XStack>
      {tests.map(({ question, unswer }, index) => {
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
          <XStack space={4} key={index}>
            <Paragraph>{question}</Paragraph>
            <YStack>
              <Input 
                size="$3" 
                placeholder={"Ваш ответ"}
                onChangeText={handleAnswerChange}
                style={{ borderColor: isCorrect === false ? 'red' : 'initial' }}
              />
              {isCorrect === false && <Paragraph color="red">Incorrect</Paragraph>}
            </YStack>
          </XStack>
        );
      })}
    </YStack>
  );
}
