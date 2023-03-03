import * as React from 'react';
import { XStack, YStack } from "tamagui";
import { NextLink } from './NextLink';
import { HeaderProps } from './HeaderProps';

export const HeaderLinks = ({ showExtra, forceShowAllLinks }: HeaderProps) => {
  return (
    <>
      <NextLink prefetch={false} href="/">
        <HeadAnchor
          $sm={{
            display: forceShowAllLinks ? 'flex' : 'none',
          }}
        >
          Docs
        </HeadAnchor>
      </NextLink>

      <NextLink prefetch={false} href="/">
        <HeadAnchor
          $md={{
            display: forceShowAllLinks ? 'flex' : 'none',
          }}
        >
          Blog
        </HeadAnchor>
      </NextLink>

      <NextLink prefetch={false} href="/lesson1">
        <HeadAnchor
          $md={{
            display: forceShowAllLinks ? 'flex' : 'none',
          }}
        >
          More
        </HeadAnchor>
      </NextLink>
    </>
  );
};

const HeadAnchor = ({ children, ...rest }) => {
  return (
    <YStack
      as="a"
      tag="h3"
      cur="pointer"
      px="$2"
      {...rest}
      bb="$md $gray600"
      $sm={{
        bb: 'none',
      }}
      $lg={{
        mx: '$3',
        px: 0,
        pb: '$1',
      }}
    >
      {children}
    </YStack>
  );
};
