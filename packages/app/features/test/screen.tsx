import {
  Button, XStack, YStack, H1, H2, H3, H4, H5, H6, Paragraph
 } from "@my/ui";

import React,{useEffect} from "react";


  export function testScreen() {
    
  return (
        <YStack space alignItems="center">
          <H1 size="$1" lineHeight="$1" letterSpacing="$1">TEST</H1>
          <H2>TEST</H2>
          <H3>TEST</H3>
          <H4>TEST</H4>
          <H5>TEST</H5>
          <H6>TEST</H6>
          <Paragraph>TEST</Paragraph>
        </YStack>
    )
  }
