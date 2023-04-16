import React, { useEffect, useState } from "react";
import { YStack, XStack, H1, Paragraph, Button, Input} from "@my/ui";
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
  const { signOut } = useAuth();
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
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
    <YStack f={1} ai="center" miw={400} space="$6">
      <Header />
      <H1>Личный Кабинет</H1>
      {isSignedIn && (
        <YStack 
          bw={1}
          boc="$color1"
          bc="$background"
          br="$10" 
          m="$4"
          p="$4"
          miw={400}
          maw={1000}
          shadowColor={"$shadowColor"}
          shadowRadius={15}
          shadowOffset={{ width: 0, height: 4 }}
          >
          <Paragraph>User ID: {currentUser.id}</Paragraph>
          <Paragraph>User Email: {currentUser.email}</Paragraph>
          <Paragraph>User Name: {currentUser.userName}</Paragraph>
          <XStack space="$2" f={1}>
            <Input
              size="$2"
              value={newUserName}
              onChange={handleInputChange}
              placeholder={currentUser.userName}
            />
            <Button size="$2" onPress={handleUpdateUserName} theme="gray">
              Update User Name
            </Button>
          </XStack>
          <YStack>
            <Paragraph>Уроки</Paragraph>
            <Paragraph>Список Уроков</Paragraph>
              {userLessons?.flatMap((lesson) => 
                lesson !== null 
                  ? [<Paragraph opacity={0.5} key={lesson.id}>{lesson.name}</Paragraph>]
                  : []
              )}
          </YStack>
        </YStack>
      )}
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
      <YStack p="$2">
        <Paragraph>tRPC Query Demo</Paragraph>
        {data?.map((entry) => (
          <Paragraph opacity={0.5} key={entry.id}>
            {entry.id}
          </Paragraph>
        ))}
      </YStack>
    </YStack>
  );
}
