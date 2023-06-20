import { YStack } from "@my/ui";
import { useSignIn } from "app/utils/clerk";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "solito/router";
import { SignUpSignInComponent } from "@my/ui/src/components/SignUpSignIn";
import { handleOAuthSignIn } from "app/utils/auth";

import React, { useState } from "react";

import { ToastComp } from "@my/ui/src/components/ToastComp";
import { Banana } from '@tamagui/lucide-icons';

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};



export function SignInScreen() {

  // this is for toast message
  const [list, setList] = useState<any[]>([]);

  const showToast = (type) => {

    let toastProperties;

    switch (type) {
      case "error":
        toastProperties = {
          id: 2,
          title: "Упс",
          description: `Неверный Логин или Пароль`,
          backgroundColor: "#d9534f",
          icon: Banana,
        };
        break;
      
      default:
        setList([]);
        break
    }

    setList([...list, toastProperties]);

  };

  // this is for user check

  const { push } = useRouter();

  const { isLoaded, signIn, setSession } = useSignIn();
  if (!setSession) return null;
  if (!isLoaded) return null;

  const redirectIfSignedIn = async () => {
    if (signIn.status == "complete") {
      push("/userpage");
    }
  };

  const handleOAuthSignInWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignIn(strategy, setSession, signIn);
    await redirectIfSignedIn();
  };

  const handleEmailSignInWithPress = async (emailAddress, password) => {
    try {
      await signIn.create({
        identifier: emailAddress,
        password,
      });
      await redirectIfSignedIn();
      } catch (error) {
      showToast("error");
      // Handle error
      console.error(error);
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <ToastComp 
        toastList={list}
        position="bottom-center"
        autoDelete={true}
        autoDeleteTime={3000}
      />
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  );
}
