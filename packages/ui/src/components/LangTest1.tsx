import { Paragraph, YStack, XStack, Button, Input, Dialog, Sheet, Adapt, Unspaced } from 'tamagui';
import React, { useState, Children, cloneElement } from "react";
import { X } from '@tamagui/lucide-icons';

export const LangTest = (props) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (text) => {
    setAnswer(text);
    props.onAnswerChange(text);
  };

  return (
    <YStack ai="flex-start" m="$6">
      <Paragraph mr={`${props.size}`}>
        {props.text1}{" "}
            <Input size="$3" placeholder={`${props.question}`}
            onChangeText={handleAnswerChange}
            />
        {" "}{props.text2}
      </Paragraph>
    </YStack>
  );
}

export const LangComponent = ({ children, ButtonName, messageIncorect }) => {
  const [ popoverVisible, setPopoverVisible] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const checkAnswers = () => {
    const correctAnswersArr = Children.map(children, (child) => child.props.RightAnswer.toLowerCase());
    const userAnswersArr = Children.map(children, (child, i) => {
      if (i in userAnswers) {
        return userAnswers[i].trim().toLowerCase();
      } else {
        return "";
      }
    });
  
    if (correctAnswersArr.every((answer, i) => answer.toLowerCase() === userAnswersArr[i])) {
      setPopoverVisible(false);
    } else {
      setPopoverVisible(true);
    } 
  };

  const renderPopoverContent = () => {
    const incorrectAnswers: JSX.Element[] = [];
  
    Children.forEach(children, (child, i) => {
      const userAnswer = userAnswers[i] ? userAnswers[i].trim().toLowerCase() : '';
      const correctAnswer = child.props.RightAnswer.trim().toLowerCase();
  
      if (userAnswer !== correctAnswer) {
        const incorrectAnswer = (
          <Paragraph key={i} maw={200} ta="right">
            {`${child.props.text1} ... ${child.props.text2}: ${userAnswer}`}
          </Paragraph>
        );
        incorrectAnswers.push(incorrectAnswer);
      }
    });
  
    if (incorrectAnswers.length) {
      return (
        <>
          {incorrectAnswers}
          <Paragraph mt="$4" ta="center">
            {messageIncorect}
          </Paragraph>
        </>
      );
    } else {
      return (
        <Paragraph mt="$4" ta="center">
          All answers are correct!
        </Paragraph>
      );
    }
  };

  const handleAnswerChange = (index, newAnswer) => {
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [index]: newAnswer }));
  };

  const clonedChildren = Children.map(children, (child, i) => {
    return cloneElement(child, { onAnswerChange: (newAnswer) => handleAnswerChange(i, newAnswer) });
  });

  return (
    <YStack ai="flex-start" m="$6">
      {clonedChildren}
      <Dialog modal>
        <Dialog.Trigger asChild>
          <Button size="$1" onPress={() => checkAnswers()}>{ButtonName}</Button>
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
            <Dialog.Title>Результат</Dialog.Title>
            <Dialog.Description>
              Проверка Теста
            </Dialog.Description>
            <YStack ai="center" m="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <XStack>
                  <YStack>
                      {renderPopoverContent()}
                  </YStack>
                </XStack>
              </Dialog.Close>
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
  );
};