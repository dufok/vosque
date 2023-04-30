import { Paragraph, YStack, XStack, Button } from "tamagui";
import React from "react";
import { GithubIcon } from "./GithubIcon";

export function SubMenu({userpageLinkProps}) {
  return(
    <YStack w="100%" pt="$2" pb="$2" backgroundColor="$backgroundFocus" >
      <XStack jc="space-between">
      <YStack>
          <GithubIcon width={30}/>
        </YStack>
        <YStack>
          <Button {...userpageLinkProps} bc="backgroundPress" bw='0'>
            ВОЙТИ/ЗАПИСАТЬСЯ
          </Button>
        </YStack>
      </XStack>
    </YStack>
  )
}