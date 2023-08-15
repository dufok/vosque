import {
  Paragraph,
  YStack,
  XStack,
  Switch,
  Label,
  Separator,
  Button,
  H3,
  Input
} from "@my/ui";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Text } from "react-native";

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { X } from '@tamagui/lucide-icons'
import { trpc } from "app/utils/trpc";
import { useLink } from "solito/link";
import { useAuth } from "app/utils/clerk";
import { Banknote } from '@tamagui/lucide-icons';
import { ToastComp } from "@my/ui/src/components/ToastComp";
import { sendTelegramMessage } from "@my/ui/src/components/sendTelegramMessage";
import { PayContent } from "@my/ui/src/components/PayContent";

export function payScreenScreen() {

  const router = useRouter();
  const { name, description, sku, pricerub, priceusdt } = router.query;
  if (!name || !description || !sku  || !pricerub || !priceusdt) {
    return <Text> No data in payscreen !</Text>;
  }

  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signin");
    }
  }, [isSignedIn]);

  return (
    <YStack f={1} jc="center" ai="center" space>
      <PayContent
        name={name}
        pricerub={pricerub}
        priceusdt={priceusdt}
        sku={sku}
        description={description}
        />
    </YStack>
  );
} 
