import React, { useEffect, useState } from "react";
import { Adapt, YStack, XStack, H1, H3, H5, Paragraph, Button, Input, Image, Spinner, Avatar, Anchor } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from "@my/ui/src/components/HeaderComp";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import { SubMenu } from '@my/ui/src/components/SubMenu';

export function userpageScreen() {

  const signInLinkProps = useLink({ href: "/signin" });
  const signUpLinkProps = useLink({ href: "/signup" });
  const userpageLinkProps = useLink({ href: "/userpage"});

  const { data, isLoading, error } = trpc.entry.all.useQuery();
  
  //part for lessons
  const { data: userLessons } = trpc.user.userLessons.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isLoading) {
    return <Spinner size="large"  color="$backgroundFocus" ai="center" jc="center" f={1} />;
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

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

  const { signOut } = useAuth();
  const { data: currentUser } = trpc.user.current.useQuery();
  const isSignedIn = !!currentUser;

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

  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const lessonCount = userLessons ? userLessons.length : 0;

  return (
    <YStack bc="$backgroundFocus" ai="center" pb="$4" pt="$6">
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
          <YStack>
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
    </YStack>
  );
}

function Lessons() {

  const { data: currentUser } = trpc.user.current.useQuery();
  const isSignedIn = !!currentUser;

  const { data: userLessons } = trpc.user.userLessons.useQuery();

  type ContentLesson = {
    image: string;
    href: string;
    description: string;
  }

  const contentLessons = userLessons?.map((lesson) => lesson.content) as ContentLesson[];

  return (
    <YStack>
      {isSignedIn && (
        <YStack pb="$6" pt="$6" ai="center" f={1}>
          <Paragraph pb="$4" ta="center">Список Уроков</Paragraph>
          <XStack p="$2" fw="wrap" >

            <Adapt platform="touch" when="sm">
              <YStack jc="flex-start">
                {userLessons?.slice(0, userLessons.length/2)?.map((lesson, index) =>
                  lesson !== null ? [
                    <YStack ai="center" p="$2" hoverStyle={{ opacity: 0.8, scale: 1.05}} maw={300}>
                      <XStack ai="center">
                        <Avatar circular size="$4" backgroundColor="$backgroundFocus">
                          <Avatar.Image 
                            src={contentLessons[index]?.image}
                          />
                          <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
                        </Avatar>
                        <YStack ml={10} flexWrap="wrap">
                          <H5 key={lesson.id}>
                            <Anchor
                              href={contentLessons[index]?.href}
                              target="_blank"
                            >{lesson.name}</Anchor></H5>
                          <Paragraph ww="initial" key={lesson.id}>{contentLessons[index]?.description}</Paragraph>
                        </YStack>
                      </XStack>
                    </YStack>
                  ] : []
                )}
              </YStack>
              <YStack jc="flex-start">
                {userLessons?.slice(userLessons.length/2)?.map((lesson, index) =>
                    lesson !== null ? [
                      <YStack ai="center" p="$2" hoverStyle={{ opacity: 0.8, scale: 1.05}}  maw={300}>
                        <XStack ai="center">
                          <Avatar circular size="$4" backgroundColor="$backgroundFocus">
                            <Avatar.Image 
                              src={contentLessons[index]?.image}
                            />
                            <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
                          </Avatar>
                          <YStack ml={10} flexWrap="wrap">
                            <H5 key={lesson.id}>
                              <Anchor
                                href={contentLessons[index]?.href}
                                target="_blank"
                              >{lesson.name}</Anchor></H5>
                            <Paragraph ww="initial" key={lesson.id}>{contentLessons[index]?.description}</Paragraph>
                          </YStack>
                        </XStack>
                      </YStack>
                    ] : []
                  )}
              </YStack>
            </Adapt>

            <Adapt platform="web" when="gtSm">
            <YStack jc="flex-start">
                {userLessons?.slice(0, userLessons.length/2)?.map((lesson, index) =>
                  lesson !== null ? [
                    <YStack ai="center" p="$2" hoverStyle={{ opacity: 0.8, scale: 1.05}}>
                      <XStack ai="center">
                        <Avatar circular size="$4" backgroundColor="$backgroundFocus">
                          <Avatar.Image 
                            src={contentLessons[index]?.image}
                          />
                          <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
                        </Avatar>
                        <YStack ml={10} flexWrap="wrap">
                          <H5 key={lesson.id}>
                            <Anchor
                              href={contentLessons[index]?.href}
                              target="_blank"
                            >{lesson.name}</Anchor></H5>
                          <Paragraph ww="initial" key={lesson.id}>{contentLessons[index]?.description}</Paragraph>
                        </YStack>
                      </XStack>
                    </YStack>
                  ] : []
                )}
              </YStack>
              <YStack jc="flex-start">
                {userLessons?.slice(userLessons.length/2)?.map((lesson, index) =>
                    lesson !== null ? [
                      <YStack ai="center" p="$2" hoverStyle={{ opacity: 0.8, scale: 1.05}}>
                        <XStack ai="center">
                          <Avatar circular size="$4" backgroundColor="$backgroundFocus">
                            <Avatar.Image 
                              src={contentLessons[index]?.image}
                            />
                            <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
                          </Avatar>
                          <YStack ml={10} flexWrap="wrap">
                            <H5 key={lesson.id}>
                              <Anchor
                                href={contentLessons[index]?.href}
                                target="_blank"
                              >{lesson.name}</Anchor></H5>
                            <Paragraph ww="initial" key={lesson.id}>{contentLessons[index]?.description}</Paragraph>
                          </YStack>
                        </XStack>
                      </YStack>
                    ] : []
                  )}
              </YStack>
            </Adapt>

          </XStack>
        </YStack>
      )}
    </YStack>
  );
}



function Login() {
  const { signOut } = useAuth();
  const { data: currentUser } = trpc.user.current.useQuery();

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
            Зарегестрироваться
          </Button>
          <Button {...signUpLinkProps} size="$2">
            Войти
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Button onPress={() => signOut()} size="$2">
          Выйти
        </Button>
      </SignedIn>
    </YStack>
  );
}
