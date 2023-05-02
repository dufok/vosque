import React, { useEffect, useState } from "react";
import { YStack, XStack, H1, H5, Paragraph, Button, Input, Image} from "@my/ui";
import { useLink } from "solito/link";
import { Header } from "@my/ui/src/components/HeaderComp";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";

export function userpageScreen() {
  const userLinkProps = useLink({
    href: "/user/nate",
  });
  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });

  const { data, isLoading, error } = trpc.entry.all.useQuery();
  
  //part for lessons
  const { data: userLessons } = trpc.user.userLessons.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack>
      <Header />
      <Welcome />
      <Lessons />
      <Login />
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
    <YStack bc="$backgroundFocus" >
      <Paragraph>Личный Кабинет</Paragraph>
        {isSignedIn && (
          <YStack space="$4" ai="center" p="$4">
            <H1 col="$background">Привет {currentUser.userName} !</H1>
          </YStack>
        )}
          <YStack>
            <Image src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
              height="100%"
              width="100%"
              />
          </YStack>
        {isSignedIn && (
          <YStack>
            <Paragraph mb={20} col="$background"> добро пожаловать на наш курс</Paragraph>
            <Paragraph col="$background"> Сколько уроков доступно: {lessonCount}</Paragraph>
            <Paragraph col="$background"> Сколько уроков пройдено: {lessonCount}</Paragraph>
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
              <Paragraph> Ваша почта: {currentUser.email}</Paragraph>
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
    description: string;}

  const content = userLessons?.[0]?.content as ContentLesson;

 

  return (
    <YStack>
      {isSignedIn && (
        <YStack>
          <Paragraph>Список Уроков</Paragraph>
            {userLessons?.flatMap((lesson) =>
              lesson !== null ? [
                <XStack>
                  <Image key={lesson.id} src={{uri: 'https://cdn.vosque.education/images/userpage_welcome_image.png?raw', width: 80, height: 90}}
                    height="100%"
                    width="100%"
                    />
                    <YStack>
                      <H5 key={lesson.id}>{lesson.name}</H5>
                      <Paragraph key={lesson.id}>{content.description}</Paragraph>
                    </YStack>
                </XStack>
              ] : []
            )}
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
    <YStack>
      <SignedOut>
        <XStack space>
          <Button {...signInLinkProps} theme="gray">
            Sign In (Clerk)
          </Button>
          <Button {...signUpLinkProps} theme="gray">
            Sign Up (Clerk)
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Button onPress={() => signOut()} theme="red">
          Sign Out
        </Button>
      </SignedIn>
    </YStack>
  );
}
