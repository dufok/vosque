import React from "react";
import { YStack, XStack, H1, H3, H5, Paragraph, Button, Image, Input, Avatar, Square } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';
import { SubMenu } from '@my/ui/src/components/SubMenu';


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
    const userpageLinkProps = useLink({ href: "/userpage"});
    const lessonLinkPage = useLink({ href: "/lesson1"});
  
    return (
      <YStack>
        <Welcome />
        <Login />
        <Lessons />
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }
  
  function Welcome() {
  
  
    return (
      <YStack bc="$backgroundFocus" ai="center">
        <Paragraph>Личный Кабинет</Paragraph>
            <YStack space="$4" ai="center" p="$4">
              <H3 col="$background">Привет currentUser_userName !</H3>
            </YStack>
            <YStack>
              <Image src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
                height="100%"
                width="100%"
                />
            </YStack>
            <YStack>
              <Paragraph mb={20} ta="center" col="$background"> добро пожаловать на наш курс</Paragraph>
              <Paragraph col="$background"> Сколько уроков доступно: LessonCount</Paragraph>
              <Paragraph col="$background"> Сколько уроков пройдено: LessonCount</Paragraph>
              <Paragraph col="$background">Ваша почта: currentUser_email</Paragraph>
              <XStack space="$2">
                <Input
                  size="$2"
                  placeholder={`currentUser_userName`}
                />
                <Button size="$2">
                  Обновите Имя Пользователя
                </Button>
              </XStack>
              
            </YStack>
      </YStack>
    );
  }
  
  function Lessons() {

    const lessonLinkPage = useLink({ href: "/lesson1"});

    return (
      <YStack >
          <YStack pb="$6" pt="$6" ai="center">
            <Paragraph pb="$4" ta="center">Список Уроков</Paragraph>
              <XStack p="$2" fw="wrap" >
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
                <Lesson lessonLinkPage={lessonLinkPage}/>
              </XStack>
          </YStack>
      </YStack>
    );
  }
  
  
  function Login() {
  
    return (
      <YStack pt={20} pb={20} bc="$backgroundFocus" ai="center">
          <XStack space>
            <Button size="$2">
              Зарегестрироваться
            </Button>
            <Button size="$2">
              Войти
            </Button>
          </XStack>
      </YStack>
    );
  }

  function Lesson({lessonLinkPage}) {
    return (
        <YStack   ai="center" p="$2" hoverStyle={{ opacity: 0.8, scale: 1.05}}>
          <XStack ai="center">
            <Avatar circular size="$4" backgroundColor="$backgroundFocus">
              <Avatar.Image 
                src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw'}}
              />
              <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
            </Avatar>
            <YStack ml={10}>
              <H5> Leson Number</H5> 
              <Paragraph> This is nice lisson with nice peoople</Paragraph>
            </YStack>
          </XStack>
        </YStack>
    );
  }
  


