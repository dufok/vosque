import React, { useState, useEffect } from "react";
import { YStack, XStack, H1, Paragraph, Button } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import { useLink } from "solito/link";

export function testScreen() {
  const signInLinkProps = useLink({
    href: "/signin",
  });
  const signUpLinkProps = useLink({
    href: "/signup",
  });

  const AdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const { signOut } = useAuth();
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser && currentUser.email === AdminEmail;

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser?.email !== AdminEmail) {
      setMessage("You are not allowed to seed the database");
    }
  }, [currentUser, AdminEmail]);

  const seedData = trpc.seed.seed.useMutation();

  const seedDatabase = async () => {
    try {
      await seedData.mutate();
      setMessage("Database seeded successfully");
    } catch (error) {
      setMessage("Error seeding the database");
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
    <H1>Админка</H1>
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
      <YStack f={1} pt="$10" pb="$10" backgroundColor="$backgroundHover">
        <Button f={1} onPress={seedDatabase} theme={"gray"}>
          SEED DATABASE
        </Button>
      </YStack>
    </YStack>
    )}
    <YStack pt="$10" pb="$10">
      <Paragraph ta="center">{message}</Paragraph>
    </YStack>
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

