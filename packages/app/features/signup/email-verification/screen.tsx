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

  const { data: currentUser } = trpc.user.current.useQuery();

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
      
      if (!currentUser) {
        return (
          <YStack f={1} jc="center" ai="center" space>
            <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />
          </YStack>
        );
      }

      push("/userpage");

    } else alert("Invalid verification code");
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Input
        placeholder="Verification code"
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
        Submit
      </Button>
    </YStack>
  );
}
