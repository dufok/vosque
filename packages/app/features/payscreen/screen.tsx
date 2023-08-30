import {
  YStack
} from "@my/ui";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Text } from "react-native";
import { useAuth } from "app/utils/clerk";
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
