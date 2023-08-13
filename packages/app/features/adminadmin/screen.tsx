import { Paragraph, YStack } from "@my/ui";
import React, {useEffect} from "react";
import { useRouter } from "solito/router";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";
import { trpc } from "app/utils/trpc";


export function adminadminScreen() {
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const { data: currentUser, isLoading: isUserLoading } = trpc.user.current.useQuery();
  console.log("currentUser", currentUser)
  //if curentUser empty then error in TRPC console
  if (isUserLoading) {
    return <SpinnerOver />;
  }
  if (!currentUser)
  {
    return <div> No data in currentUser !</div>;
  }
  const userEmail = currentUser.email;

  useEffect(() => {
    if (userEmail !== "adminEmail") {
      router.push("/");
    }
  }, [userEmail, adminEmail, router]);

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        adminadmin
      </Paragraph>
    </YStack>
  );
} 