import React, { useEffect, useState } from "react";
import { YStack, XStack, H3, H5, Paragraph, Button, Input, Image, Spinner, Avatar, Anchor, Stack } from "@my/ui";
import { useLink } from "solito/link";
import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import { SubMenu } from '@my/ui/src/components/SubMenu';

export function userpageScreen() {

  const userpageLinkProps = useLink({ href: "/userpage"});

  const { data: currentUser, isLoading: isCurrentUserLoading } = trpc.user.current.useQuery();
  const isSignedIn = !!currentUser;

  const { data, isLoading, error } = trpc.entry.all.useQuery();

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const lessonCount = userLessons ? userLessons?.filter(lesson => lesson.name.toLowerCase().includes("урок")).length : 0;

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isSignedIn) {
    if (isLoading || isCurrentUserLoading) {
      return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
    }
  } else {
    if (isLoading) {
      return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
    }
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack>
      <HeaderComp />
      <Welcome isSignedIn={isSignedIn} currentUser={currentUser} lessonCount={lessonCount}/>
      <Login />
      <Lessons isSignedIn={isSignedIn} lessonCount={lessonCount} userLessons={userLessons} />
      <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}

function Welcome({ isSignedIn, currentUser, lessonCount}) {

  const [newUserName, setNewUserName] = useState("");

  const utils = trpc.useContext();
  const updateUserName = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.current.invalidate();
    },
  });

  const handleInputChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleUpdateUserName = async () => {
    if (!currentUser) {
      return;
    }
    await updateUserName.mutateAsync({ id: currentUser.id, userName: newUserName });
    setNewUserName("");
  };

  return (
    <YStack bc="$backgroundFocus" ai="center" pb="$4" pt="$6" mt="$10">
        <YStack space="$4" ai="center" p="$4">
          <H3 col="$background">Привет {currentUser?.userName} !</H3>
        </YStack>
        <YStack>
          <Image src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
            height="100%"
            width="100%"
            />
        </YStack>
        {isSignedIn && (
        <YStack space="$2" >
          <Paragraph mb={20} ta="center" col="$background"> добро пожаловать на наш курс</Paragraph>
          <Paragraph col="$background"> Сколько уроков доступно: {lessonCount}</Paragraph>
          <Paragraph col="$background"> Сколько уроков пройдено: {lessonCount}</Paragraph>
          <Paragraph col="$background">Ваша почта: {currentUser.email}</Paragraph>
          <XStack space="$2">
            <Input
              size="$2"
              value={newUserName}
              onChange={handleInputChange}
              placeholder={currentUser.userName}
            />
            <Button size="$2" onPress={handleUpdateUserName}>
              Обновите Имя Пользователя
            </Button>
          </XStack>
        </YStack>
        )}
        {!isSignedIn && (
          <YStack mt="$5">
            <Paragraph mb={20} ta="center" col="$background">!!! Пройдите регистрацию !!! </Paragraph>
          </YStack>
        )}
    </YStack>
  );
}

function Lessons({ isSignedIn, lessonCount, userLessons }) {

  type ContentLesson = {
    image: string;
    href: string;
    description: string;
  }

  const contentLessons = userLessons?.map((lesson) => lesson.content) as ContentLesson[];

  const courseLinkProps = useLink({href: "/course"});

  return (
    
    <YStack>
      {isSignedIn && (
        <YStack pb="$6" pt="$6" ai="center" f={1}>
        <Paragraph pb="$4" ta="center">Список Уроков:</Paragraph>
        <Stack p="$2" fd="column" $gtSm={{ fd: "row", fw: "wrap" }}>
            <YStack jc="flex-start" m="$1">
              {userLessons?.filter(lesson => lesson.name.toLowerCase().includes("урок")).slice(0, userLessons.length/2)?.map((lesson) =>
                lesson !== null ? [
                  <YStack p="$2" hoverStyle={{ opacity: 0.9, scale: 1.01}}>
                    <XStack ai="center">
                      <Avatar circular size="$4"  backgroundColor="$backgroundFocus">
                        <Avatar.Image 
                          src={lesson.content?.image} scale="50%"
                        />
                        <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
                      </Avatar>
                      <YStack m="$2" f={1}>
                        <H5 key={lesson.id}>
                          <Anchor
                            href={lesson.content?.href}
                          >{lesson.name}</Anchor></H5>
                        <Paragraph ww="initial" key={lesson.id}>{lesson.content?.description}</Paragraph>
                      </YStack>
                    </XStack>
                  </YStack>
                ] : []
              )}
            </YStack>
            <YStack jc="flex-start" m="$1">
              {userLessons?.filter(lesson => lesson.name.toLowerCase().includes("урок")).slice(userLessons.length/2)?.map((lesson) =>
                  lesson !== null ? [
                    <YStack p="$2" hoverStyle={{ opacity: 0.9, scale: 1.01}}>
                    <XStack ai="center">
                      <Avatar circular size="$4"  backgroundColor="$backgroundFocus">
                        <Avatar.Image 
                          src={lesson.content?.image} scale="50%"
                        />
                        <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
                      </Avatar>
                      <YStack m="$2" f={1}>
                        <H5 key={lesson.id}>
                          <Anchor
                            href={lesson.content?.href}
                          >{lesson.name}</Anchor></H5>
                        <Paragraph ww="initial" key={lesson.id}>{lesson.content?.description}</Paragraph>
                      </YStack>
                    </XStack>
                  </YStack>
                  ] : []
                )}
            </YStack>
        </Stack>
        {lessonCount === 0 && (
          <YStack>
            <YStack pb="$6" pt="$6" ai="center" f={1}>
              <Paragraph pb="$4" ta="center" > Спасибо за Регистрацию ! Посмотрите наши курсы и выберите программу  </Paragraph>
              <Button color="$background" bc="$backgroundFocus" {...courseLinkProps}>
                Базовый курс аргентинского испанского
              </Button>
            </YStack>
          </YStack>
        )}
      </YStack>
      )}
    </YStack>
  );
}



function Login() {
  const { signOut } = useAuth();

  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });

  return (
    <YStack pt={20} pb={20} bc="$backgroundFocus" ai="center">
      <SignedOut>
        <XStack space>
          <Button {...signInLinkProps} size="$2">
            Войти
          </Button>
          <Button {...signUpLinkProps} size="$2">
            Зарегестрироваться
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Button onPress={() => { signOut(); window.location.reload(); }} size="$2">
          Выйти
        </Button>
      </SignedIn>
    </YStack>
  );
}
