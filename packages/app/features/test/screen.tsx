import React from "react";
import { YStack, XStack, H1, H2, H3, H4, H5, Paragraph, Button, Image, Input, Avatar, Square } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';
import { SubMenu } from '@my/ui/src/components/SubMenu';
import { SquareText } from "@my/ui/src/components/SquareText";
import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { ParagraphCustom } from '@my/ui/src/components/CustomText';
import { ContentLesson1 } from '../lesson1/type_Lesson1';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';



export function testScreen() {

  //lesson content
  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const firstLesson = userLessons?.[0];
  const content = firstLesson?.content as ContentLesson1;
  const ContentAccents = Object.values(content?.exercisesBlock.accent.contentAccents || {});

    return (
      <YStack>
        <SquareText text={content?.exercisesBlock.accent.header}/>
        <ExercisesBlockText exercises={ContentAccents}/>
      </YStack>
    );
  }
  
  // Exercises block text

  export type Exercise = {
    text: string;
    example: string;
  };

  interface ExercisesBlockTextProps {
    exercises: Exercise[];
  }

  const ExercisesBlockText: React.FC<ExercisesBlockTextProps> = ({ exercises }) => {
    return (
      <YStack mt="$4" ai="flex-start" maw={800}>
        {exercises.map(({ text, example }, index) => (
          <YStack key={index}>
            <H3 ta="left">{text}</H3>
            <Paragraph ta="left">{example}</Paragraph>
          </YStack>
        ))}
      </YStack>
    )
  }