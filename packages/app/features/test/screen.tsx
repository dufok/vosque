import React, { useEffect, useState } from "react";
import { YStack, XStack, H1, Paragraph, Button, Input} from "@my/ui";
import { useLink } from "solito/link";
import { Header } from "@my/ui/src/components/HeaderComp";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";

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
  const { signOut } = useAuth();
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();

  //Below is the code I'm trying to add New User Name to the database
  const [newUserName, setNewUserName] = useState("")

  const handleInputChange = (e) => {
    setNewUserName(e.target.value);
  };

  const updateUserName = trpc.user.update.useMutation();

  const handleUpdateUserName = async () => {
    if (!currentUser) {
      return;
    }
    await updateUserName.mutateAsync({ id: currentUser.id, userName: newUserName });
    setNewUserName("");
  };

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
      <H1>Test Screen</H1>
      {currentUser && (
        <>
          <Paragraph>User ID: {currentUser.id}</Paragraph>
          <Paragraph>User Email: {currentUser.email}</Paragraph>
          <Paragraph>User Name: {currentUser.userName}</Paragraph>
          <Input
            f={1}
            size="$2"
            value={newUserName}
            onChange={handleInputChange}
            placeholder={currentUser.userName}
          />
          <Button size="$2" onPress={handleUpdateUserName} theme="gray">
            Update User Name
          </Button>
        </>
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
