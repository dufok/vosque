import {
  YStack
} from "@my/ui";
import React from "react";
import '../../background.css';
import { LangTest, LangComponent } from '@my/ui/src/components/LangTest1';

export function testScreen() {


  return (
    <YStack f={1} jc="flex-start" className="background-image" miw={500} space="$6">
      <YStack m="$6">
          <LangComponent
            ButtonName="Check Answers"
            messageIncorect="This is incorrect">
            <LangTest 
              text1="1) El "
              text2=" Juan"
              question="escribo..."
              RightAnswer="es"
              size="200"
              >
            </LangTest>
            <LangTest 
              text1="1) Yo "
              text2=" Maria"
              question="escribo..."
              RightAnswer="soy"
              size="300"
              >
            </LangTest>
          </LangComponent>
      </YStack>
    </YStack>
  );
}