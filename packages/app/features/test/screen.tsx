import React, { useEffect, useState } from "react";
import { YStack, XStack, H1, Paragraph, Button, Input} from "@my/ui";
import { useLink } from "solito/link";
import { Header } from "@my/ui/src/components/HeaderComp";
import { trpc } from "../../utils/trpc";
import { SignedIn, SignedOut, useAuth } from "../../utils/clerk";
import { ButtonPay } from "@my/ui/src/components/ButtonPay";

export function testScreen() {

  return (
    <YStack f={1} ai="center" miw={400} space="$6">
      <Header />
      <H1>Тест Кнопки Купить</H1>
      <Paragraph>
        title: "Тестовый курс"<br/>
        description: "Тестовое описание"<br/>
        curse: "Тестовый курс"<br/>
        coupon: "MYARGENTINA"<br/>
        pricerub: {24000}<br/>
        priceusdt: {200}<br/>
        size: "$3"<br/>
      </Paragraph>
      <ButtonPay title="Тестовый курс" description="Тестовое описание" curse="Тестовый курс" coupon="MYARGENTINA" pricerub={24000} priceusdt={200} size="$3" />
    </YStack>
  );
}
