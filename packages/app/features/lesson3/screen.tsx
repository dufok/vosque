import { Paragraph, YStack, Button } from "@my/ui";
import React from "react";
import { useLink } from "solito/link";

export function lesson3Screen() {
  const userpageLinkProps = useLink({
    href: "/userpage",
  });
  const lesson1LinkProps = useLink({
    href: "/lesson1",
  });
  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        УРОК 3. Глаголы “быть”.
      </Paragraph>
      <YStack pt="$10" pb="$10" >
        <Button f={1} {...lesson1LinkProps} theme={"gray"}>
          Следующий урок
        </Button>
      </YStack>
      <YStack pt="$10" pb="$10" backgroundColor="$backgroundHover" >
        <Button f={1} {...userpageLinkProps} theme={"gray"}>
          ЛИЧНЫЙ КАБИНЕТ (ВОЙТИ/ЗАПИСАТЬСЯ)
        </Button>
      </YStack>
    </YStack>
  );
} 