import {
  Paragraph,
  YStack,
  XStack,
  H1,
  H2,
  H3,
  Image,
  Button,
  Separator,
  Spinner,
  Avatar,
  Square
 } from "@my/ui";
import { trpc } from "../../utils/trpc";
import { useLink } from "solito/link";
import React,{useEffect} from "react";
import { ButtonWithSheet } from '@my/ui/src/components/ButtonWithSheet';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { ParagraphCustom } from '@my/ui/src/components/CustomText';
import { ContentLesson1 } from './type_Lesson1';
import { VideoPlayer } from '@my/ui/src/components/VideoPlayer';
import { SquareText } from '@my/ui/src/components/SquareText';
import { SubMenu } from "@my/ui/src/components/SubMenu";


export function lesson1Screen() {
  //hrefs
  const userpageLinkProps = useLink({ href: "/userpage"});
  const lessonLinkPage = useLink({ href: "/lesson2"});

  //user check for lesson
  const { data: currentUser } = trpc.user.current.useQuery();
  const { data, isLoading, error } = trpc.entry.all.useQuery();
  const isSignedIn = !!currentUser;

  //lesson content
  const { data: userLessons } = trpc.user.userLessons.useQuery();
  const firstLesson = userLessons?.[0];

  //part with types from file json full
  const content = firstLesson?.content as ContentLesson1;
  const letters = content?.theoreticalBlock.complex.letters;
  const atentionBlocks = content?.theoreticalBlock.attention.atentionBlocks;
  const exercises = content?.exercisesBlock.training1.exercises;
  const exercises2 = content?.exercisesBlock.training2.exercises2;
  const linesAdditional = content?.exercisesBlock.additional.materials.readingPhrase.linesAdditional;
  const contentAccents = content?.exercisesBlock.accent.contentAccents;
  const lifehack1 = content?.lifehacks.lifehack1;
  const lifehack2 = content?.lifehacks.lifehack2;
  const lifehack3 = content?.lifehacks.lifehack3;

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  if (isLoading) {
      return <Spinner size="large" color="$green" ai="center" jc="center" f={1} />;
  }

  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <YStack>
      { isSignedIn && (
        <YStack>
          <Welcome
            name={firstLesson?.name}
            description={content?.description}/>
          <VideoPlayer
            linkVideo={content?.video}/>
          <TeoryBlock
            img={content?.theoreticalBlock.image}
            header={content?.theoreticalBlock.header}
            name1={content?.theoreticalBlock.alfabet.header}
            text1={content?.theoreticalBlock.alfabet.text} 
            name2={content?.theoreticalBlock.complex.header}
            description2={content?.theoreticalBlock.complex.description}
            lettersBlock={letters}
            name3={content?.theoreticalBlock.attention.title}
            AtentionBlocks={atentionBlocks}
            />
            {/*
          <ExercisesBlock />
          <AditionalBlock />
          <LifeHackerBlock />
          <AccentBlock />
          <ExercisesBlock2 />
          <LexicalBlock />
          <DialogBlock />
            */}
          <NavigationBlock lessonLinkPage={lessonLinkPage}/>
        </YStack>
      )}
        <SubMenu userpageLinkProps={userpageLinkProps}/>
      </YStack>
    );
  }

  // Welcome Block
  function Welcome({name, description}) {
    return (
      <YStack ai="center" mt="$6" mb="$4">
          <H3 tt="uppercase" ta="center"> Добро пожаловать на {name}</H3>
          <Paragraph p="$2" ta="center">{description}</Paragraph>
      </YStack>
    );
  }
    
    // Theoretical block (i think it is needed to make a component) (^.^')
  
  function TeoryBlock({img, header, name1, text1, name2, description2, lettersBlock, name3, AtentionBlocks}) {


    return (
      <YStack mt="$6" mb="$4">

        {/* Header Block */}
        <YStack ai="center">
          <Avatar circular size="$4" backgroundColor="$backgroundFocus">
            <Avatar.Image src={img}/>
            <Avatar.Fallback delayMs={600} backgroundColor="$backgroundFocus" />
          </Avatar>
          <H2 tt="uppercase" ta="center" mt="$4">{header}</H2>
        </YStack>

        {/* Specific Block */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text={name1}/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <Paragraph ta="center">{text1}</Paragraph>
          </YStack>
        </YStack>

        {/* Specific Block */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text={name2}/>
          <Paragraph ta="left">{description2}</Paragraph>
          <YStack mt="$4" ai="center" maw={800}>
            <XStack jc="center" m="$4" fw='wrap'>
                  {Object.values({lettersBlock}).map((letter) => (
                    <ButtonWithSheet
                      key={letter.name}
                      Title={letter.name}
                      Description={letter.description}
                      Colum1_1={letter.Colum1_1}
                      Colum2_1={letter.Colum2_1}
                      Colum3_1={letter.Colum3_1}
                      Colum4_1={letter.Colum4_1}
                      Colum1_2={letter.Colum1_2}
                      Colum2_2={letter.Colum2_2}
                      Colum3_2={letter.Colum3_2}
                      Colum4_2={letter.Colum4_2}
                    />
                  ))}
                </XStack>
          </YStack>
        </YStack>

        {/* Text with examples and Lifi Hack on the right */}
        <YStack m="$6" ai="flex-start" mt="$6">
          <SquareText text={name3}/>
          <YStack mt="$4" ai="flex-start" maw={800}>
            <XStack fw="wrap" ai="stretch">
              <YStack>
                {Object.values({AtentionBlocks}).map((atentionBlock) => (
                  <YStack>
                    <H3 ta="left" >{atentionBlock.description}</H3>
                      <YStack ml="$10">
                        <XStack>
                          <YStack>
                            <Paragraph ta="left" >{atentionBlock.example1}</Paragraph>
                            <Paragraph ta="left" >{atentionBlock.example2}</Paragraph>
                            <Paragraph ta="left" >{atentionBlock.example3}</Paragraph>
                            <Paragraph ta="left" >{atentionBlock.example4}</Paragraph>
                          </YStack>
                          <YStack>
                            <Paragraph ta="left" >{atentionBlock.prononce1}</Paragraph>
                            <Paragraph ta="left" >{atentionBlock.prononce2}</Paragraph>
                            <Paragraph ta="left" >{atentionBlock.prononce3}</Paragraph>
                            <Paragraph ta="left" >{atentionBlock.prononce4}</Paragraph>
                          </YStack>
                        </XStack>
                      </YStack>
                  </YStack>
                ))}
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
    
    {/*

            
            <YStack>
              <H3 ta="left" backgroundColor="red">{content?.theoreticalBlock.attention.title}</H3>
              <XStack>
                


                <YStack
                  ai="center"
                  bw={1}
                  boc="$color1"
                  bc="$background"
                  br="$10" 
                  m="$4"
                  p="$4"
                  miw={400}
                  maw={1000}
                  shadowColor={"$shadowColor"}
                  shadowRadius={15}
                  shadowOffset={{ width: 0, height: 4 }}
                >
                  <Image
                  src={lifehack1.image}
                  width={50}
                  height={50}
                  />
                  <H3>{lifehack1.title}</H3>
                  <Paragraph ta="center">{lifehack1.description1}</Paragraph>
                  <Paragraph ta="center">{lifehack1.content1[1].text}</Paragraph>
                  <Paragraph ta="center">{lifehack1.content1[2].text}</Paragraph>
                  <Paragraph ta="center">{lifehack1.content1[3].text}</Paragraph>
                  <Paragraph ta="center">{lifehack1.description2}</Paragraph>
                  <ParagraphCustom text={lifehack1.content2[1].text} />
                  <ParagraphCustom text={lifehack1.content2[2].text} />
                  <ParagraphCustom text={lifehack1.content2[3].text} />
                </YStack>
              </XStack>
            </YStack>




            <YStack>
              <H2 ta="center">{content?.exercisesBlock.header}</H2>
              <YStack>
                <H3 ta="left" backgroundColor="red">{content?.exercisesBlock.training1.header}</H3>
                <YStack>
                  {Object.values(exercises).map((exercise) => (
                    <XStack>
                      <YStack>
                        <H3 ta="left" >{exercise.description}</H3>
                        <Paragraph ta="left" >{exercise.text}</Paragraph>
                      </YStack>
                      <YStack>
                        <Player
                          src={exercise.audio}
                          >
                        </Player>
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.exercisesBlock.additional.header}</H2>
              <YStack>
                <H3 ta="left" backgroundColor="red">{content?.exercisesBlock.additional.materials.readingPhrase.description}</H3>
                <Paragraph ta="left" >{content?.exercisesBlock.additional.materials.readingPhrase.text}</Paragraph>
                <YStack>
                  {Object.values(linesAdditional).map((Line) => (
                    <XStack>
                      <YStack>
                        <ParagraphCustom text={Line.text} />
                      </YStack>
                      <YStack>
                        <Player
                          src={Line.audio}
                          >
                        </Player>
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            </YStack>
            <YStack>
              <XStack>
                <YStack
                  ai="center"
                  bw={1}
                  boc="$color1"
                  bc="$background"
                  br="$10" 
                  m="$4"
                  p="$4"
                  miw={400}
                  maw={1000}
                  shadowColor={"$shadowColor"}
                  shadowRadius={15}
                  shadowOffset={{ width: 0, height: 4 }}
                >
                  <Image
                  src={lifehack2.image}
                  width={50}
                  height={50}
                  />
                  <H3>{lifehack2.title}</H3>
                  <Paragraph ta="center">{lifehack2.description1}</Paragraph>
                </YStack>
                <YStack
                  ai="center"
                  bw={1}
                  boc="$color1"
                  bc="$background"
                  br="$10" 
                  m="$4"
                  p="$4"
                  miw={400}
                  maw={1000}
                  shadowColor={"$shadowColor"}
                  shadowRadius={15}
                  shadowOffset={{ width: 0, height: 4 }}
                >
                  <Image
                  src={lifehack3.image}
                  width={50}
                  height={50}
                  />
                  <H3>{lifehack3.title}</H3>
                  <Paragraph ta="center">{lifehack3.description1}</Paragraph>
                </YStack>
              </XStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.exercisesBlock.accent.header}</H2>
              <YStack>
                {Object.values(contentAccents).map((ContentAccent) => (
                  <YStack>
                    <H3 ta="left" >{ContentAccent.text}</H3>
                    <Paragraph ta="left" >{ContentAccent.example}</Paragraph>
                  </YStack>
                ))}
              </YStack>
            </YStack>
            <YStack>
              <H3 ta="left" backgroundColor="red">{content?.exercisesBlock.training2.header ?? []}</H3>
              <Paragraph ta="left" >{content?.exercisesBlock.training2.description ?? []}</Paragraph>
              <YStack>
                {Object.values(exercises2).map((exercise2) => (
                  <XStack>
                    <YStack>
                      <Paragraph ta="left" >{exercise2.text ?? []}</Paragraph>
                    </YStack>
                    <YStack>
                      <Player
                        src={exercise2.audio ?? []}
                        >
                      </Player>
                    </YStack>
                  </XStack>
                ))}
              </YStack>
            </YStack>
            <YStack>
              <H2 ta="center">{content?.vocabulary.header}</H2>
              <Paragraph ta="left" >{content?.vocabulary.description}</Paragraph>
              <XStack>
                <YStack>
                  {firstHalf.map((ContentVocabulary, index) => (
                  <YStack key={index}>
                    <XStack>
                      <Paragraph ta="left">{ContentVocabulary.text1}</Paragraph>
                      <Separator />
                      <Paragraph ta="right">{ContentVocabulary.text2}</Paragraph>
                    </XStack>
                    <Paragraph ta="center">{ContentVocabulary.description ?? []}</Paragraph>
                  </YStack>
                  ))}
                </YStack>
                <Separator vertical/>
                <YStack>
                  {secondHalf.map((ContentVocabulary, index) => (
                  <YStack key={index}>
                    <XStack>
                      <Paragraph ta="left">{ContentVocabulary.text1}</Paragraph>
                      <Separator />
                      <Paragraph ta="right">{ContentVocabulary.text2}</Paragraph>
                    </XStack>
                    <Paragraph ta="center">{ContentVocabulary.description ?? []}</Paragraph>
                  </YStack>
                  ))}
                </YStack>
              </XStack>
            </YStack>
            <YStack pt="$10" pb="$10" >
              <Button f={1} {...lesson2LinkProps} theme={"gray"} icon={ArrowRight}>
                Урок 2
              </Button>
            </YStack>
          </YStack>
        </YStack>
        )}
        <YStack f={1} pt="$10" pb="$10" backgroundColor="$backgroundHover" >
          <Button {...userpageLinkProps} theme={"gray"}>
            ВОЙТИ/ЗАПИСАТЬСЯ
          </Button>
        </YStack>
    </YStack>
  );
} 

*/}

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