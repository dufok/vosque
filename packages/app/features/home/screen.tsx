import {
  Button,
  H1,
  H3,
  H5,
  Paragraph,
  Separator,
  XStack,
  YStack,
  Image,
  useControllableState,
  useEvent,
  ZStack
} from "@my/ui";
import React, { useEffect,  useState } from "react";
import { useLink } from "solito/link";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";

export function HomeScreen(props) {
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

  const [positionI, setPositionI] = useControllableState({
    strategy: 'most-recent-wins',
    prop: props.position,
    defaultProp: 0,
  })
  const position = positions[positionI]
  const onPress = useEvent(() => {
    setPositionI((x) => {
      return (x + 1) % positions.length
    })
  })

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
      </YStack>
      <ZStack maw={800} w={600} flex={1}>
        <YStack
        animation={ props.animation || 'bouncy' }
        onPress={onPress}
        y={30}
        x={30}
        bw={2}
        bc="$background"
        br="$10" 
        p="$2" 
        px="$7"
        py="$6"
        w={500}
        shadowColor={"$Color1"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        {...position}
        >
          <H5 ta="center" mt="$2">
            Курс аргентинского испанского языка
          </H5>
          <Paragraph>
            Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
          </Paragraph>
        </YStack> 
        <YStack
        animation={ props.animation || 'bouncy' }
        onPress={onPress}
        y={20}
        x={20}
        bw={2}
        bc="$background"
        br="$10" 
        p="$2" 
        pointerEvents="auto"
        px="$7"
        py="$6"
        w={500}
        shadowColor={"$Color1"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        {...position}
        >
          <H5 ta="center" mt="$2">
            Культурный контекст
          </H5>
          <Paragraph>
          Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
          </Paragraph>
        </YStack>
        <YStack
        animation={ props.animation || 'bouncy' }
        onPress={onPress}
        y={0}
        x={0}
        bw={2}
        bc="$background"
        br="$10" 
        p="$2"
        pointerEvents="auto"
        px="$7"
        py="$6"
        w={500}
        shadowColor={"$Color1"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        {...position}
        >
          <H5 ta="center" mt="$2">
            Структура языка
          </H5>
          <Paragraph>
          Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
          </Paragraph>
        </YStack>
      </ZStack>

      <Separator />
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

export const positions = [
  {
    x: 0,
    y: 0
  },
  {
    x: 0,
    y: 100
  },
  {
    x: 0,
    y: 200
  },
]
