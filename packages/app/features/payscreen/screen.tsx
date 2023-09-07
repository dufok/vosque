import {
  YStack
} from "@my/ui";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Text } from "react-native";
import { useAuth } from "app/utils/clerk";
import { PayContent } from "@my/ui/src/components/PayContent";

import { Analytics } from '@vercel/analytics/react';

export function payScreenScreen() {

  const router = useRouter();
  const { name, description, sku, pricerub, priceusdt, coupon } = router.query;
  if (!name || !description || !sku  || !pricerub || !priceusdt) {
    return <Text> No data in payscreen !</Text>;
  }
  
  return (
    <YStack f={1} jc="center" ai="center" space>
      <PayContent
        name={name}
        pricerub={pricerub}
        priceusdt={priceusdt}
        sku={sku}
        description={description}
        coupon={coupon}
        />
      <Analytics />
    </YStack>
  );
} 
