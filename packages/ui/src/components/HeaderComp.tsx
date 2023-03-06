import * as React from 'react';
import { useRouter } from 'next/router';
import { XStack, YStack, VisuallyHidden, Text, isClient, Paragraph, ParagraphProps } from 'tamagui';
import { NextLink } from './NextLink';
import { GithubIcon } from './GithubIcon';
import { HeaderProps } from './HeaderProps';

export function Header(props: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  if (isClient) {
    React.useEffect(() => {
      const onScroll = () => {
        setIsScrolled(window.scrollY > 30)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }, [])
  }

  return (
    <>
      <XStack
        className={`ease-out all ms200 ${
          isScrolled ? 'blur-light hover-highlights ' : ''
        }`}
        bbc="$borderColor"
        zi={50000}
        // @ts-ignore
        pos="fixed"
        top={0}
        my={isScrolled ? -2 : 0}
        left={0}
        right={0}
        elevation={isScrolled ? '$1' : 0}
        py={isScrolled ? '$0' : '$2'}
      >
        <YStack o={isScrolled ? 0.9 : 0} fullscreen bc="$background" />
        <HeaderContents floating {...props} />
      </XStack>
      <YStack height={54} w="100%" />
    </>
  )
}

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

export const HeaderLinks = ({ showExtra, forceShowAllLinks }: HeaderProps) => {
  return (
    <>
      <NextLink prefetch={false} href="/home">
        <HeadAnchor
          $sm={{
            display: forceShowAllLinks ? 'flex' : 'none',
          }}
        >
          <Text>Home</Text>
        </HeadAnchor>
      </NextLink>

      <NextLink prefetch={false} href="/">
        <HeadAnchor
          $md={{
            display: forceShowAllLinks ? 'flex' : 'none',
          }}
        >
          <Text>Home</Text>
        </HeadAnchor>
      </NextLink>

      <NextLink prefetch={false} href="/lesson1">
        <HeadAnchor
          $md={{
            display: forceShowAllLinks ? 'flex' : 'none',
          }}
        >
          <Text>Lesson 1</Text>
        </HeadAnchor>
      </NextLink>
    </>
  );
};

const HeadAnchor = React.forwardRef((props: ParagraphProps, ref) => (
  <Paragraph
    ref={ref as any}
    fontFamily="$silkscreen"
    px="$3"
    py="$2"
    cursor="pointer"
    size="$3"
    color="$color10"
    hoverStyle={{ opacity: 1, color: '$color' }}
    pressStyle={{ opacity: 0.25 }}
    // @ts-ignore
    tabIndex={-1}
    w="100%"
    // jc="flex-end"
    {...props}
  />
))
