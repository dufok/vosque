import React, { useEffect, useState } from "react";
import { YStack, H1, Paragraph, Button, XStack, Input } from "@my/ui";
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

  const [name, setName] = useState("");
  const createEntryMutation = trpc.entry.create.useMutation();

  const handleCreate = async () => {
    try {
      await createEntryMutation.mutate({ name });
      setName("");
    } catch (error) {
      console.error(error);
    }
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
          <Paragraph>User Email: {currentUser.email}</Paragraph>
          <Paragraph>Add new entry:</Paragraph>
          <XStack ai="center" space="$2">
            <Input f={1} size="$2" placeholder={currentUser.name || "none"} value={name} onChangeText={setName} />
            <Button size="$2" onPress={handleCreate}>
              Add
            </Button>
          </XStack>
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
