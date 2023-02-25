import {
  Anchor,
  Button,
  H1,
  H3,
  Paragraph,
  Separator,
  XStack,
  YStack,
  Image,
} from "@my/ui";
import React, { useEffect } from "react";
import { useLink } from "solito/link";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";

export function HomeScreen() {
  const { signOut, userId } = useAuth();
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

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  /* 
  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>
  } */

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600} px="$3">
          <Image
            src="https://link.us1.storjshare.io/raw/jw4pebfkpzdu47ufm2ati3jxxjha/images/Logo.PNG"
            accessibilityLabel="vosque logo"
            width={800}
            height={400}
          />
        <H1 ta="center" mt="$2">
          Курс аргентинского испанского языка
        </H1>
        <Paragraph ta="center">
          Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
        </Paragraph>
        <XStack space="$2" ai="center">
        <Paragraph ta="center">
          This template uses Expo, Next, Solito, tRPC, Tamagui, Clerk, and
          Prisma. If you're a beginner and is a little overwhelmed, I've also
          made a{" "}
          <Anchor
            color="$color12"
            href="https://youtu.be/aTEv0-ZBbWk"
            target="_blank"
          >
            video
          </Anchor>{" "}
          explanation on how this template works and how to get started!
        </Paragraph>
        <Paragraph ta="center">
          This template uses Expo, Next, Solito, tRPC, Tamagui, Clerk, and
          Prisma. If you're a beginner and is a little overwhelmed, I've also
          made a{" "}
          <Anchor
            color="$color12"
            href="https://youtu.be/aTEv0-ZBbWk"
            target="_blank"
          >
            video
          </Anchor>{" "}
          explanation on how this template works and how to get started!
        </Paragraph>
        </XStack>
        <Separator />
      </YStack>

      <H3 ta="center">Some Demos</H3>
      <YStack p="$2">
        <Paragraph>tRPC Query Demo</Paragraph>
        {data?.map((entry) => (
          <Paragraph opacity={0.5} key={entry.id}>
            {entry.id}
          </Paragraph>
        ))}
      </YStack>

      <XStack space>
        <Button {...userLinkProps} theme={"gray"}>
          User Page(Routing)
        </Button>
      </XStack>

      <SignedOut>
        <XStack space ai="center">
          <Button {...signInLinkProps} theme={"gray"}>
            Sign In(Clerk)
          </Button>
          <Button {...signUpLinkProps} theme={"gray"}>
            Sign Up(Clerk)
          </Button>
        </XStack>
      </SignedOut>

      <SignedIn>
        <Button
          onPress={() => {
            signOut();
          }}
          theme={"red"}
        >
          Sign Out
        </Button>
      </SignedIn>
    </YStack>
  );
}
