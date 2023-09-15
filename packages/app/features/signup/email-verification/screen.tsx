/* this page is just one input for email verification */
import { useState } from "react";
import { Button, Input, YStack, Spinner } from "@my/ui";
import { useAuth, useSignUp } from "app/utils/clerk";
import { useRouter } from "solito/router";
import { trpc } from "app/utils/trpc";
import { ToastComp } from "@my/ui/src/components/ToastComp";
import { Banana } from '@tamagui/lucide-icons';

export function EmailVerificationScreen() {
  const { push } = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const createUserMutation = trpc.user.create.useMutation();
  const sku = "VQ00LP";
  const { data: lessonPack } = trpc.user.lessonPackBySku.useQuery({ sku_number: sku });
  const updateUserLessonPack = trpc.user.updateUserLessonPack.useMutation();
  
  const { signUp, setSession } = useSignUp();
  if (!signUp) return null;

  // this is for toast message
  const [list, setList] = useState<any[]>([]);

  const showToast = (type) => {

    let toastProperties;

    switch (type) {
      case "error":
        toastProperties = {
          id: 2,
          title: "Упс",
          description: `Неверный номер. проверьте почту еще раз.`,
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

  const handleEmailVerificationOnPress = async () => {
    try {
      /* verify the email */
      await signUp.attemptEmailAddressVerification({ code: verificationCode });
  
      if (signUp.status === "complete") {
        const { createdSessionId } = signUp;
        if (createdSessionId) {
          await setSession(createdSessionId);
        }
  
        const userId = signUp.createdUserId!;
        console.log("Received userId:", userId);
        const userEmailAddress = signUp.emailAddress!;
  
        /* add user id and email into our database */
        createUserMutation.mutate({
          id: userId,
          email: userEmailAddress,
          userName: userEmailAddress,
        });
  
        /* add user lesson pack */
  
        const lessonPackName = lessonPack?.name; // Assuming the lesson pack name is stored in the 'name' property
        console.log("Received lessonPackName:", lessonPackName);
  
        if (lessonPackName) {
          await updateUserLessonPack.mutateAsync({ userId, lessonPackName })
            .catch((error) => {
              console.error("Error updating user lesson pack:", error);
            });
        }
  
        /* redirect to userpage */
        
        push("/userpage");
      } else {
        showToast("error");
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      showToast("error");
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
