/* this page is just one input for email verification */
import { useState } from "react";
import { Button, Input, YStack, Spinner } from "@my/ui";
import { useAuth, useSignUp } from "app/utils/clerk";
import { useRouter } from "solito/router";
import { trpc } from "app/utils/trpc";

export function EmailVerificationScreen() {
  const { push } = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const createUserMutation = trpc.user.create.useMutation();

  const { signUp, setSession } = useSignUp();
  if (!signUp) return null;

  const handleEmailVerificationOnPress = async () => {
    /* verify the email */
    await signUp.attemptEmailAddressVerification({ code: verificationCode });

    if (signUp.status === "complete") {
      const { createdSessionId } = signUp;
      if (createdSessionId) {
        await setSession(createdSessionId);
      }
      /* add user id and email into our database */
      createUserMutation.mutate({
        id: signUp.createdUserId!,
        email: signUp.emailAddress!,
        userName: signUp.emailAddress!,
      });

      /* redirect to userpage */
      
      push("/userpage");

    } else alert("Код не верный!");
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Input
        placeholder="Вставьте код из письма ..."
        onChangeText={(text) => {
          setVerificationCode(text);
        }}
      />

      {/* button for submitting */}
      <Button
        onPress={() => {
          handleEmailVerificationOnPress();
        }}
      >
        Проверить
      </Button>
    </YStack>
  );
}
