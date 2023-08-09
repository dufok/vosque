import { Paragraph, YStack } from "@my/ui";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { trpc } from "app/utils/trpc";
import { useLink } from "solito/link";
import { useAuth } from "app/utils/clerk";

export function payScreenScreen() {

  const SiginLinkProps = useLink({ href: "/signin"});
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signin");
    }
  }, [isSignedIn]);

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        payscreen
      </Paragraph>
    </YStack>
  );
} 