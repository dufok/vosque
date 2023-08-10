import { 
  Button,
  Paragraph
  } from 'tamagui';
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useLink } from "solito/link";
import { useAuth } from "app/utils/clerk";

export function ButtonPay(props: {
  name: string
  description: string
  sku: string
  coupon: string
  pricerub: number
  priceusdt: number
}){

  const { isSignedIn } = useAuth();
  const router = useRouter();

  // This is a hack to make the button work with the Link component
  const handleOnClick = () => {
    const queryParams = new URLSearchParams({
      name: props.name,
      description: props.description,
      sku: props.sku,
      coupon: props.coupon,
      pricerub: props.pricerub.toString(),
      priceusdt: props.priceusdt.toString(),
    }).toString();
    if (!isSignedIn) {
      router.push('/signin');
    } else {
    router.push(`/payscreen?${queryParams}`);
    };
  };

  return (
    <Button
      onPress={handleOnClick}
      backgroundColor="$backgroundPress"
      elevation="$0.5"
      br="$2"
      bw="$1"
      boc="$backgroundPress"
      h={80}
      w={270}
      >
      <Paragraph color="$background" ta="center" dangerouslySetInnerHTML={{ __html: props.name.replace(/\n/g, "<br />")}}/>
    </Button>
  );
}