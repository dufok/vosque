import * as React from 'react';
import { useRouter } from 'next/router';
import { XStack, YStack, VisuallyHidden, Text } from "tamagui";
import { NextLink } from './NextLink';
import { GithubIcon } from './GithubIcon';
import { HeaderProps } from './HeaderProps';
import { HeaderLinks } from './HeaderLinks';

export function HeaderContents(props: HeaderProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isInSubApp =
    router.pathname.startsWith('/takeout') || router.pathname.startsWith('/studio');

  return (
    <XStack
      ai="center"
      position="relative"
      tag="header"
      jc="space-between"
      pos="relative"
      zi={50000}
      py={props.floating ? 0 : '$2'}
    >
      <HeaderLinks {...props} />

      <XStack h={40} jc="flex-end" miw={160} pointerEvents="auto" tag="nav">
        <NextLink target="_blank" href="https://github.com/dufok1/vosque">
          <YStack
            $xs={{ maw: 0, mah: 0, ov: 'hidden', mr: '$-6' }}
            p="$2"
            opacity={0.7}
            hoverStyle={{ opacity: 1 }}
          >
            <VisuallyHidden>
              <Text>Github</Text>
            </VisuallyHidden>
            <GithubIcon width={23} />
          </YStack>
        </NextLink>
      </XStack>
    </XStack>
  );
}
