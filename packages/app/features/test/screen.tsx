import React from "react";
import { YStack, XStack, H1, H2, H3, H4, H5, Paragraph, Button, Image, Input, Avatar, Square } from "@my/ui";
import { useLink } from "solito/link";
import { Header } from '@my/ui/src/components/HeaderComp';
import { SubMenu } from '@my/ui/src/components/SubMenu';
import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { ParagraphCustom } from '@my/ui/src/components/CustomText';
import { ContentLesson1 } from '../lesson1/type_Lesson1';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';



export function testScreen() {
    
    const signInLinkProps = useLink({ href: "/signin" });
    const signUpLinkProps = useLink({ href: "/signup" });
    const userpageLinkProps = useLink({ href: "/userpage"});
    const lessonLinkPage = useLink({ href: "/lesson2"});
  
    return (
      <YStack>
        <Welcome />
        <VideoPlayer linkVideo="https://cdn.vosque.education/images/welcome.mp4?raw"/>
        <TeoryBlock />
        <ExercisesBlock />
        <AditionalBlock />
        <LifeHackerBlock />
        <AccentBlock />
        <ExercisesBlock2 />
        <LexicalBlock />
        <DialogBlock />
        <NavigationBlock lessonLinkPage={lessonLinkPage}/>
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }
  
  function Welcome() {
    return (
      <YStack ai="center" mt="$6" mb="$4">
          <H3 tt="uppercase" ta="center"> Добро пожаловать на firstLesson?.name</H3>
          <Paragraph p="$2" ta="center">content?.description</Paragraph>
      </YStack>
    );
  }

 // Theoretical block (i think it is needed to make a component) (^.^')
  
  function TeoryBlock() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
          <Avatar circular size="$4" backgroundColor="$backgroundFocus">
            <Avatar.Image src="https://cdn.vosque.education/images/course-fonetica.png?raw"/>
            <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
          </Avatar>
          <H2 tt="uppercase" ta="center" mt="$4"> content?. theoreticalBlock. header </H2>
        </YStack>

        {/* Specific Block */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text="Alfabet"/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <Paragraph ta="center"> A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z </Paragraph>
          </YStack>
        </YStack>

        {/* Specific Block */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text="Сложные Буквы"/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <Square size={300} bc="$backgroundFocus"/>
          </YStack>
        </YStack>

        {/* Text with examples and Lifi Hack on the right */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text="Обратите Внимание!"/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <XStack fw="wrap" ai="stretch">
              <YStack>
                <Square size={300} bc="$backgroundFocus"/>
              </YStack>
              <YStack>
                <Square size={300} bc="$backgroundFocus"/>
              </YStack>
            </XStack>
          </YStack>
        </YStack>
    </YStack>
    )
  }

  // Universal Squere Block with text

  function SquareText({text}) {
    return (
      <Square paddingHorizontal="$4" bc="$backgroundFocus">
        <H4 col="$background"> {text} </H4>
      </Square>
    )
  }

  // Exercises block

  function ExercisesBlock() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
         <H2 tt="uppercase" ta="center" mt="$4"> content?. exercisesBlock. header </H2>
        </YStack>
        
        {/* Text with exercises */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text="Упражнение 1"/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <YStack>
              <Square size={300} bc="$backgroundFocus"/>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }

  // Aditional block

  function AditionalBlock() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
         <H2 tt="uppercase" ta="center" mt="$4"> content?. aditionalBlock. header </H2>
        </YStack>
        
        {/* Text with examples */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text="Чтение фраз"/>
          <Paragraph ta="left"> content?. aditionalBlock. text </Paragraph>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <YStack>
              <Square size={300} bc="$backgroundFocus"/>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }

  // LifeHacker block (two neare left right)

  function LifeHackerBlock() {
    return (
      <YStack mb="$4">
        <YStack m="$6" ai="center">
          <YStack ai="flex-start" maw={800}>
            <XStack fw="wrap">
              <YStack>
                <Square size={300} bc="$backgroundFocus"/>
              </YStack>
              <YStack>
                <Square size={300} bc="$backgroundFocus"/>
              </YStack>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    );
  }

  // Accent block

  function AccentBlock() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
         <H2 tt="uppercase" ta="center" mt="$4"> content?. AccentBlock. header </H2>
        </YStack>

        <YStack m="$6" ai="flex-start" mt="$6">
          <YStack mt="$4" ai="flex-start" maw={800}>
            <YStack>
              <Square size={300} bc="$backgroundFocus"/>
            </YStack>
          </YStack>
        </YStack>

      </YStack>




    );
  }

  // Exercises block

  function ExercisesBlock2() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Text with exercises */}
        <YStack m="$6" ai="flex-start" >
          <SquareText text="Тренировка"/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <YStack>
              <Square size={300} bc="$backgroundFocus"/>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }


  // Lexical block

  function LexicalBlock() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
         <H2 tt="uppercase" ta="center" mt="$4"> content?. LecicalBlock. header </H2>
        </YStack>
      
        <YStack m="$6" ai="flex-start" mt="$6">
          <Paragraph ta="left"> content?. LecicalBlock. text </Paragraph>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <YStack>
              <Square size={300} bc="$backgroundFocus"/>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }

  // Dialog block

  function DialogBlock() {
    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
         <H2 tt="uppercase" ta="center" mt="$4"> content?. DialogBlock. header </H2>
        </YStack>

        <YStack m="$6" ai="flex-start" mt="$6">
          <YStack mt="$4" ai="flex-start" maw={800}>
            <YStack>
              <Square size={300} bc="$backgroundFocus"/>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    )
  }

  // Navigation block

  function NavigationBlock({lessonLinkPage}) {
    return (
      <XStack m="$2" mt="$6" f={1}>
        <YStack f={0.5} ai="flex-start">
          <Button {...lessonLinkPage} icon={ArrowLeft}>
            Урок 1
          </Button>
        </YStack>
        <YStack f={0.5} ai="flex-end">
          <Button {...lessonLinkPage} icon={ArrowRight}>
            Урок 2
          </Button> 
        </YStack>
      </XStack>
    )
  }