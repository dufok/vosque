import { Paragraph, YStack, XStack, Button } from "tamagui";
import React from "react";
import { GithubIcon } from "./GithubIcon";
import { InstagramIcon } from "./GithubIcon";
import { TelegramIcon } from "./GithubIcon";

export function SubMenu({userpageLinkProps}) {
  return(
    <YStack w="100%" pt="$2" pb="$2" backgroundColor="$backgroundFocus" >
      <XStack f={1} w="100%" ai="center" jc="space-between">
        <XStack alignSelf="flex-start" p="$3" space="$3">
          <a href="https://github.com/dufok" target="_blank" rel="noopener noreferrer">
            <GithubIcon width={30} color="$background" />
          </a>
          <InstagramIcon width={30} color="$background" />
          <a href="https://t.me/vosque_help" target="_blank" rel="noopener noreferrer">
            <TelegramIcon width={30} color="$background" />
          </a>
        </XStack>
        <YStack mr="$4">
          <Button {...userpageLinkProps} bc="backgroundPress" bw='0'>
            <Paragraph >
              ВОЙТИ / ЗАПИСАТЬСЯ
            </Paragraph>
          </Button>
        </YStack>
      </XStack>
    </YStack>
  )
}