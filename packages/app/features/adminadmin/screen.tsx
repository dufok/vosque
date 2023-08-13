import { Paragraph, YStack, XStack, H3, Button} from "@my/ui";
import React, {useEffect, useState} from "react";
import { useRouter } from "solito/router";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";
import { trpc } from "app/utils/trpc";
import { sendEmailMessage } from "@my/ui/src/components/sendEmailMessage";

export function adminadminScreen() {
  const router = useRouter();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',') || [];
  const { data: currentUser, isLoading: isUserLoading, error: userError } = trpc.user.current.useQuery();
  const { data: allUsers, isLoading: isAllUsersLoading, error: allUsersError } = trpc.user.listAllUsers.useQuery();
  const { data: allSKUs, isLoading: allSKUsLoading ,error: allSKUsError } = trpc.user.listAllCourseSKUs.useQuery();
  const { data: userLessonPacksByID, isLoading: userLessonPacksLoading ,error: userLessonPacksError } = trpc.user.userLessonPacksByID.useQuery();
  const updateUserLessonPack = trpc.user.updateUserLessonPack.useMutation();
  const [showSpinner, setShowSpinner] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [lessonPackName, setLessonPackName] = useState<string | null>(null);


  if (userError || allUsersError || allSKUsError || userLessonPacksError) {
    return <div>Error loading data!</div>;
  }

  if (!currentUser || !allUsers || !allSKUs || !userLessonPacksByID) {
    return <div>No data!</div>;
  }

  // Update user lessons pack

  const LessonPackButton = ({ sku, userId, updateUserLessonPack }) => {
    const { data: lessonPack } = trpc.user.lessonPackBySku.useQuery({ sku_number: sku });
    const lessonPackName = lessonPack?.name; // Assuming the lesson pack name is stored in the 'name' property
  
    const handleUpdateUserLessonPacks = async () => {
      if (lessonPackName) {
        await updateUserLessonPack.mutateAsync({ userId, lessonPackName });
      }
    };
  
    return (
      <Button onClick={handleUpdateUserLessonPacks}>
        <Paragraph size="$3">Add Pack {sku}</Paragraph>
      </Button>
    );
  };
  
  const test = process.env.MAILJET_API_KEY
  console.log(test)
  // Send email
  

  // If currentUser empty then error in TRPC console
  if (isUserLoading) {
    return <SpinnerOver />;
  }

  const userEmail = currentUser.email;

  if (!adminEmails.includes(userEmail)) {
    router.push("/");
  }

  return (
    <>
      {(showSpinner || isUserLoading || isAllUsersLoading || allSKUsLoading || userLessonPacksLoading) && <SpinnerOver />}
      {updateError && <Paragraph color="red">{updateError}</Paragraph>}
      <YStack f={1} ai="center">
        <H3 mt="$6" ta="center" fow="800">
          adminadmin
        </H3>
        {isAllUsersLoading ? (
          <Paragraph ta="center" fow="800">Loading users...</Paragraph>
        ) : (
          <ul>
            {allUsers.map((user) => (
              <YStack
              borderRadius="$10"
              space
              shadowColor={"#00000020"}
              shadowRadius={26}
              shadowOffset={{ width: 0, height: 4 }}
              bg="$background"
              m={10}
              animation="bouncy"
              enterStyle={{
                scale: 1.5,
                y: -10,
                opacity: 0,
              }}
              ai="center"
              key={user.id}
              p="$4"
              >
                <XStack>
                  <Paragraph>
                    Email: 
                  </Paragraph>
                  <Paragraph fontFamily="$bodyBold">
                    {user.email}
                  </Paragraph>
                </XStack>
                <Paragraph>
                  ID: {user.id}
                </Paragraph>
                {userLessonPacksByID && userLessonPacksByID[user.id] ? (
                  <Paragraph>
                    Pack: {userLessonPacksByID[user.id]}
                  </Paragraph>
                ) : (
                  <Paragraph>
                    No Pack Assigned
                  </Paragraph>
                )}
                <XStack fw="wrap" space="$2">
                  <Button onClick={() => sendEmailMessage(user.email)}><Paragraph size="$3">Send Email</Paragraph></Button>
                  {allSKUs.map((sku) => (
                    <LessonPackButton key={sku} sku={sku} userId={currentUser.id} updateUserLessonPack={updateUserLessonPack} />
                  ))}
                </XStack>
              </YStack>
            ))}
          </ul>
        )}
      </YStack>
    </>
  );
} 