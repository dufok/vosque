import React from "react";
import { useRouter } from "next/router";
import {
  YStack,
  H1,
  Paragraph,
  Button,
} from "@my/ui";
import "@my/ui/src/styles.css";
import { Header } from "@my/ui/src/components/HeaderComp";
import { UserDetailScreen } from "app/features/user/detail-screen";
import { trpc } from "../../utils/trpc";

export function testScreen() {
  const router = useRouter();
  const { id } = router.query;
  const { data: user, isLoading, error } = trpc.entry.all.useQuery(["user.current", { id: parseInt(id as string) }]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <YStack f={1} ai="center" miw={400} space="$6">
      <Header />
      <H1>Test Screen</H1>
      <Paragraph>
        {user ? (
          <UserDetailScreen id={user.id} email={user.email} />
        ) : (
          // Replace this with your sign-in link as needed
          <Button href="/signin">Sign In</Button>
        )}
      </Paragraph>
    </YStack>
  );
}
