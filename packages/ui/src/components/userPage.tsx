import {
  Paragraph,
  YStack,
  Button,
  H1,
  Input
  } from "@my/ui";
import React from "react";
import { useState } from 'react';
import { useAuth } from 'app/utils/clerk';
import { trpc } from 'app/utils/trpc';

export function userPage() {
  const { user } = useAuth();
  const { firstName, lastName, emailAddress } = user || {};
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    emailAddress,
  });
  const updateUserMutation = trpc.user.update.useMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateUserMutation.mutate(formData);
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">Личный кабинет</Paragraph>
      <YStack
        bw={1}
        boc="$color1"
        bc="$background"
        br="$10" 
        m="$4"
        p="$4"
        miw={350}
        maw={1000}
        shadowColor={"$shadowColor"}
        shadowRadius={15}
        shadowOffset={{ width: 0, height: 4 }}
        >
        <Paragraph ta="center" fow="800">Профиль</Paragraph>
        <Input
          value={formData.firstName}
          onChangeText={(text) =>
            setFormData({ ...formData, firstName: text })
          }
          placeholder="First Name"
        />
        <Input
          value={formData.lastName}
          onChangeText={(text) =>
            setFormData({ ...formData, lastName: text })
          }
          placeholder="Last Name"
        />
        <Input
          value={formData.emailAddress}
          onChangeText={(text) =>
            setFormData({ ...formData, emailAddress: text })
          }
          placeholder="Email Address"
        />
        <Button onPress={handleFormSubmit}>Save</Button>
      </YStack>
    </YStack>
  );
} 