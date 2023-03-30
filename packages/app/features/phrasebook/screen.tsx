import { Paragraph, YStack, Button } from "@my/ui";
import React from "react";
import { useLink } from "solito/link";

export function phrasebookScreen() {
  const userpageLinkProps = useLink({
    href: "/userpage",
  });

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        Разговорники.
      </Paragraph>
      <YStack pt="$10" pb="$10" backgroundColor="$backgroundHover" >
        <Button f={1} {...userpageLinkProps} theme={"gray"}>
          ЛИЧНЫЙ КАБИНЕТ (ВОЙТИ/ЗАПИСАТЬСЯ)
        </Button>
      </YStack>
    </YStack>
  );
} 