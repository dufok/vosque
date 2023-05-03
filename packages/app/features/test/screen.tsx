import React from "react";
import { YStack, XStack, H1, H5, Paragraph, Button, Image, Input } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';


export function testScreen() {
    
    const userLinkProps = useLink({
      href: "/user/nate",
    });
    const signInLinkProps = useLink({
      href: "/signin",
    });
    const signUpLinkProps = useLink({
      href: "/signup",
    });
  
    return (
      <YStack>
        <Welcome />
        <Lessons />
        <Login />
      </YStack>
    );
  }
  
  function Welcome() {
  
  
    return (
      <YStack bc="$backgroundFocus" >
        <Paragraph>Личный Кабинет</Paragraph>
            <YStack space="$4" ai="center" p="$4">
              <H1 col="$background">Привет currentUser_userName !</H1>
            </YStack>
            <YStack>
              <Image src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
                height="100%"
                width="100%"
                />
            </YStack>
            <YStack>
              <Paragraph mb={20} col="$background"> добро пожаловать на наш курс</Paragraph>
              <Paragraph col="$background"> Сколько уроков доступно: LessonCount</Paragraph>
              <Paragraph col="$background"> Сколько уроков пройдено: LessonCount</Paragraph>
              <XStack space="$2">
                <Input
                  size="$2"
                  placeholder={`currentUser_userName`}
                />
                <Button size="$2">
                  Обновите Имя Пользователя
                </Button>
              </XStack>
              <Paragraph> Ваша почта: currentUser_email</Paragraph>
            </YStack>
      </YStack>
    );
  }
  
  function Lessons() {

    return (
      <YStack>
          <YStack>
            <Paragraph>Список Уроков</Paragraph>
            <XStack>
              <YStack>
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
              </YStack>
              <YStack>
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
                <Lesson />
              </YStack>
            </XStack>  
          </YStack>
      </YStack>
    );
  }
  
  
  function Login() {
  
    return (
      <YStack>
          <XStack space>
            <Button theme="gray">
              Sign In (Clerk)
            </Button>
            <Button theme="gray">
              Sign Up (Clerk)
            </Button>
          </XStack>
      </YStack>
    );
  }

  function Lesson() {
    return (
      <XStack>
        <Image src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
          height="100%"
          width="100%"
          />
        <YStack>
          <H5> Leson Number</H5>
          <Paragraph> This is nice lisson with nice peoople</Paragraph>
        </YStack>
      </XStack>
    );
  }
  


