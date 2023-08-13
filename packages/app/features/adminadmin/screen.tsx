import { Paragraph, YStack, XStack, H3, Button} from "@my/ui";
import React, {useEffect, useState} from "react";
import { useRouter } from "solito/router";
import { SpinnerOver } from "@my/ui/src/components/SpinnerOver";
import { trpc } from "app/utils/trpc";

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
  

  // Send email
  const sendEmailToUser = async (userEmail, lessonPackName) => {
    setShowSpinner(true); // Show spinner when sending email
    try {
      const htmlContent = `
        <h1>Hola!</h1>
        <p>Добро пожаловать на базовый курс аргентинского испанского языка!</p>
        <p>Теперь Вам доступны все уроки <strong>${lessonPackName}</strong>.</p>
        <p>Для того чтобы начать обучение, Вам необходимо зайти в свой личный кабинет и выбрать нужный урок. Ниже Вы найдете ссылку на него:</p>
        <a href="www.vosque.education/userpage">www.vosque.education/userpage</a>
        <p>Удачи и пишите по любым вопросам! ;)</p>
        <p>Анастасия, создатель платформы Vosque.education</p>
        <a href="https://t.me/vosque_help">Telegram: https://t.me/vosque_help</a>
      `;
  
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Доступ к Vosque.education',
          html: htmlContent, // Send the HTML content
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      // You can show a success message here if you want
    } catch (err) {
      console.error(err);
      // Handle the error as you see fit
    }
    setShowSpinner(false); // Hide spinner when email is sent
  };

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
                  <Button onClick={() => sendEmailToUser(user.email, lessonPackName)}><Paragraph size="$3">Send Email</Paragraph></Button>
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