import {
  Button,
  H1,
  H2,
  H3,
  H4,
  H5,
  Paragraph,
  Separator,
  XStack,
  YStack,
  Spinner,
  Square,
  Avatar,
  Image,
  Circle,
  Tooltip,
  TooltipGroup,
  TooltipProps
} from "@my/ui";


import { useLink } from "solito/link";
import { SubMenu} from '@my/ui/src/components/SubMenu';
import { PhraseBooks } from "@my/ui/src/components/PhraseBooks";
import { ImageBackground, View} from "react-native"
import { HeaderComp } from "@my/ui/src/components/HeaderComp";
import React, { useState, useEffect } from 'react';
import { trpc } from "../../utils/trpc";


export function HomeScreen() {

  /*
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);
  */

  const userpageLinkProps = useLink({ href: "/userpage"});
  const phasebookLinkProps = useLink({href: "/phrasebook"});
  const courseLinkProps = useLink({href: "/course"});

  const imageSource = { uri: 'https://cdn.vosque.education/images/ylona-maria-rybka-W9h9Tq-JLTk-unsplash%201.png?raw'};
  const imageSource1 = { uri: 'https://cdn.vosque.education/images/avatar.png?raw'};
  



  //block with errors from Author 
  const { data, isLoading, error } = trpc.entry.all.useQuery();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);
  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }
  if (isLoading) {
    return <Spinner size="large" color="$backgroundFocus" ai="center" jc="center" f={1} />;
  }

  return (
    <YStack>
        <HeaderComp />
        <Welcome imageSource={imageSource} userpageLinkProps={userpageLinkProps} />
        <AboutAutor imageSource1={imageSource1}/>
        <AboutCourse courseLinkProps={courseLinkProps}/>
        <PhraseBooks phasebookLinkProps={phasebookLinkProps}/>
        <ReviewSection />
        <SubMenu userpageLinkProps={userpageLinkProps}/>
    </YStack>
  );
}


function Welcome({ imageSource, userpageLinkProps }){
  return(
    <YStack>
        <ImageBackground source={imageSource} style={{ flex: 1, width: '100%', height: '100%' }}>
          <YStack f={1} ai="center" h={600}>
            <Circle borderColor="$background" pos="relative"  bw="$1" size={600} $sm={{display: "none"}}/>
            <YStack space="$4" ai="center" mt="$13" pos="absolute" $sm={{mt: "$10"}}>
              <H1 mt="$8" ta="center" mb="$5" col="$background">
                Курсы аргентинского<br/>испанского языка
              </H1>
              <Paragraph p="$5" ta='center' col="$background" maw={600}>
                Курс аргентинского диалекта испанского языка для всех, кто хочет жить в Аргентине или по другим причинам интересуется культурой Аргентины и особенностями аргентинского испанского
              </Paragraph>
              <Button mt="100" {...userpageLinkProps} br={9} bw="$1" boc="$background">
                ВОЙТИ
              </Button>
            </YStack>
          </YStack>
        </ImageBackground>
      </YStack>
  )
};


function AboutAutor({imageSource1}){
  return(
    <XStack flexWrap="wrap" >

      <YStack ai="center" jc="center" w="100%" $gtSm={{ width: "50%" }} $sm={{ height: 500}} >
        <YStack p="$8" flex={0.3} ai="center" jc="center" w='100%'>
          <Square w="100%" pos="relative" hoverStyle={{ opacity: 0 }} >
            <H3 ta="center">
              Разговорная речь
            </H3>
          </Square>
          <Square w='80%' pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background" >
              Нет смысла учить язык, если потом не можешь на нем разговаривать. Уже с первых уроков нашего курса мы будем учиться строить диалоги - и не сухие, а так, как это делают носители.
            </Paragraph>
          </Square>
        </YStack >

        <YStack p="$8" flex={0.3} ai="center" jc="center" w='100%'>
          <Square w="100%" pos="relative" hoverStyle={{ opacity: 0 }}>        
            <H3 ta="center">
              Культурный контекст
            </H3>
          </Square>
          <Square w='80%' pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background">
              Все про Аргентину и не только - постоянные исторические и культурные отсылки помогут Вам лучше понять жителей Аргентины и быстрее влиться в среду.
            </Paragraph>
          </Square>
        </YStack>

        <YStack p="$8" flex={0.3} ai="center" jc="center" w='100%'>
          <Square  w="100%" pos="relative" hoverStyle={{ opacity: 0 }}>
            <H3 ta="center">
              Структура языка
            </H3>
          </Square>
          <Square w='80%'  pos="absolute" style={{ opacity: 0 }} hoverStyle={{ opacity: 1 }} ai="stretch" animation="bouncy">
            <Paragraph ta="left" bc="$background">
              Часто на курсах обещают разговорную речь, но не дают структуры. Этот метод подходит для детей, но голова взрослого человека работает иначе - весь материал будет структурирован в таблицах.
            </Paragraph>
          </Square>
        </YStack>
      </YStack>

      <YStack bc="$backgroundFocus" w="100%"
        $gtSm={{ width: "50%" }}>
        <YStack ai="center">
          <Avatar size="$15" mt={85}>
            <Avatar.Image
              accessibilityLabel="Анастасия Лукьянова"
              src={imageSource1}
            />
            <Avatar.Fallback backgroundColor="$backgroundFocus" />
          </Avatar>
          <H2 mt="$5" ta="center" col="$background">Анастасия Лукьянова</H2>
          <YStack>
            <YStack/>
              <Paragraph ta="left" col="$background" paddingHorizontal="$8" paddingBottom="$8" mt="$2">
                Я - билингв, носитель русского и испанских языков. Родившись в Эквадоре, в 5 лет я переехала в Россию, в 16 поступила в МГУ на филологический факультет, в 19 отправилась на стажировку в Мексику, а в 23, закончив университет с красным дипломом по специальности "Преподаватель и переводчик испанского языка", переехала в Аргентину. Уже 10 лет я преподаю язык и рада делиться своими знаниями и опытом.
              </Paragraph>
          </YStack>
        </YStack>
      </YStack>

    </XStack>
  )
}

function AboutCourse ({courseLinkProps}) {
    return(
      <View style={{
        flex: 1,
        position: 'relative',
      }}>
        <Image
          src={{ uri: 'https://cdn.vosque.education/images/img-course-trees-left.png?raw', width: 480, height: 480}}
          height='120%'
          width='120%'
          left={0}
          bottom={0}
          pos="absolute"
          $sm={{ display: 'none'}}
        />
        <Image
          src={{ uri: 'https://cdn.vosque.education/images/img-course-trees-right.png?raw', width: 274, height: 534}}
          height='120%'
          width='120%'
          right={0}
          bottom={0}
          pos="absolute"
          $sm={{ display: 'none' }}
        />
          <YStack ai="center" mb={200}

            $sm={{ mb: 50 }}
            style={{
            zIndex: 1
          }}>
            <Image
              mt={100}
              $xs={{ marginTop : 50}}
              src={{uri: 'https://cdn.vosque.education/images/img-home-course.png?raw', width: 50, height: 50}}
              height='100%'
              width='100%'
            />
            <H2 tt="uppercase">курсы</H2>
            <YStack mt={40} maw={800}>
              <Paragraph paddingHorizontal="$6" ta="center">Хотите научиться разговаривать, как аргентинцы? Наши курсы сфокусированы на грамматике и практических навыках, чтобы вы могли использовать новые знания в повседневной жизни и на работе.</Paragraph>
              <Paragraph paddingHorizontal="$6" mt="$5" ta="center">Присоединяйтесь к нашим курсам аргентинского испанского языка и расширьте свои горизонты!</Paragraph>
            </YStack>
            <XStack mt={53} fw="wrap" w='100%' jc="space-around" maw={850}>
              <YStack marginVertical="$4">
                <Button
                  backgroundColor="$backgroundPress"
                  elevation="$0.5"
                  br="$2"
                  bw="$1"
                  boc="$backgroundPress" h={70} w={350}
                  {...courseLinkProps}>
                    <Paragraph color="$background" ta="center">
                      Базовый курс <br/> аргентинского испанского
                    </Paragraph>
                </Button>
              </YStack> 
              <YStack marginVertical="$4">
                <Button
                  elevation="$0.5"
                  br="$2"
                  bw="$1"
                  boc="$backgroundPress"
                  h={70} w={350}>
                    <Paragraph color="$backgroundPress" ta="center">
                      Скоро Больше Курсов
                    </Paragraph>
                </Button>
              </YStack>
            </XStack>
          </YStack>
      </View>
    )
}
 
function ReviewSection () {
    return(
        <YStack ai="center" w='100%'>
            <H2 tt="uppercase" mt="$6" ta="center">Отзывы</H2>
            <XStack p="$5" fw="wrap" jc="space-between">
                <YStack space="$5" f={1} >
                  <YStack f={0.7}>
                    <Tooltip placement="top" >
                      <Tooltip.Trigger>
                        <Square
                          br="$2"
                          bc="$backgroundPress"
                          m="$2"
                          pressStyle={{ scale: 0.98 }}>
                          <Paragraph ta="right" p="$3" >“Мы приехали с нулевым знанием..." Альфия</Paragraph>
                        </Square>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        scale={1}
                        x={0}
                        y={0}
                        opacity={1}
                        $sm={{ width: '90%' }}
                        width="60%"
                        alignSelf="center"
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        >
                        <Tooltip.Arrow />
                        <YStack >
                          <Paragraph  size="$2" lineHeight="$1">
                            "Мы приехали с нулевым знанием языка - смотрели несколько видео уроков в ютубе, и то это был не “кастижано”. Первые дни ощущали себя беспомощными и абсолютно потерянными. А потом познакомились с курсом Анастасии. Очень этому рада. Методично, наглядно, от урока к уроку - и я уже не боюсь ходить в магазины, разговаривать с таксистами, заводить новые знакомства. Очень доступно подан материал, усваивается легко. Порядок тем подобран очень грамотно, после первых же уроков в твоём словарном запасе появляются фразы, которые помогут тебе в бытовых вопросах. Благодарю за эти уроки!"
                          </Paragraph>
                          <Paragraph mt="$1" fontFamily="$bodyBold" ta="right">Альфия</Paragraph>
                        </YStack>
                      </Tooltip.Content>
                    </Tooltip>
                  </YStack>

                  <YStack f={0.7}>
                    <Tooltip placement="top" >
                      <Tooltip.Trigger>
                        <Square
                          br="$2"
                          bc="$backgroundPress"
                          m="$2"
                          pressStyle={{ scale: 0.98 }}>
                          <Paragraph ta="right" p="$3" >“Настя стала для меня третьим..."  Виталик</Paragraph>
                        </Square>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        scale={1}
                        x={0}
                        y={0}
                        opacity={1}
                        $sm={{ width: '90%' }}
                        width="60%"
                        alignSelf="center"
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        >
                        <Tooltip.Arrow />
                        <YStack >
                          <Paragraph  size="$2" lineHeight="$1">
                            “Настя стала для меня третьим преподавателем после двух аргентинцев до этого. Могу с уверенностью сказать, что она лучший преподаватель иностранного языка в моей жизни. Подача информации, задания, внимание к моим слабым сторонам и работа с ними - всё это буквально за пару месяцев позволило значительно перегнать не такой большой успех с другими преподавателями. Благодаря занятиям с ней я быстро смог подготовиться к своему первому собеседованию на испанском и поступить в ВУЗ в Аргентине. И самое главное, благодаря ей, я могу общаться с аргентинцами, а это лучшее, что может дать язык. Искренне рекомендую Настю как лучшего преподавателя испанского!”
                          </Paragraph>
                          <Paragraph mt="$1" fontFamily="$bodyBold" ta="right">Виталик</Paragraph>
                        </YStack>
                      </Tooltip.Content>
                    </Tooltip>
                  </YStack>

                  <YStack f={0.7}>
                    <Tooltip placement="top" >
                      <Tooltip.Trigger>
                        <Square 
                          br="$2" 
                          bc="$backgroundPress"
                          m="$2"
                          pressStyle={{ scale: 0.98 }}>
                          <Paragraph ta="right" p="$3" >“Анастасия прекрасный учитель." Ольга</Paragraph>
                        </Square>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        scale={1}
                        x={0}
                        y={0}
                        opacity={1}
                        $sm={{ width: '90%' }}
                        width="60%"
                        alignSelf="center"
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        >
                      <Tooltip.Arrow />
                        <YStack >
                          <Paragraph  size="$2" lineHeight="$1">
                            “Анастасия прекрасный учитель. Она занимается с двумя детьми 8 и 15 лет. Задачи разные, но Анастасия смогла прекрасно понять задачи, подстроиться под детей и это дало отличный результат! И младший и старший уверенно продвигаются в своих знаниях и что немаловажно полюбили сам язык и процесс! Анастасия применяет совершенно разные материалы и методы, что опять же положительно сказывается на восприятии детьми нового материала. Всем очень советуем этого преподавателя!”
                          </Paragraph>
                          <Paragraph mt="$1" fontFamily="$bodyBold" ta="right">Ольга</Paragraph>
                      </YStack>
                      </Tooltip.Content>
                    </Tooltip>
                  </YStack>
                </YStack>

                <YStack space="$5" f={1} >
                  <YStack f={0.7}>
                    <Tooltip placement="top" >
                      <Tooltip.Trigger>
                        <Square
                          br="$2"
                          bc="$backgroundPress"
                          m="$2"
                          pressStyle={{ scale: 0.98 }}>
                          <Paragraph ta="right" p="$3" >“Большое спасибо, за такие..." Екатерина</Paragraph>
                        </Square>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        scale={1}
                        x={0}
                        y={0}
                        opacity={1}
                        $sm={{ width: '90%' }}
                        width="60%"
                        alignSelf="center"
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        >
                        <Tooltip.Arrow />
                        <YStack >
                          <Paragraph  size="$2" lineHeight="$1">
                            “Большое спасибо, за такие интересные и продуктивные уроки! Все очень четко, структурно, все понятно и легко запоминается! Очень классно выстроена программа: во-первых, вся лексика - нужная, ничего лишнего! Все примеры фраз, упражнений - это именно то, с чем вы столкнетесь в бытовой жизни, когда приедете в испаноговорящую страну. Во-вторых, очень грамотно подобраны упражнения для отработки правил и домашнего задания. ВСЯ лексика постоянно повторяется, и ты не забываешь то, что было три урока назад. В-третьих, подача материала четко структурирована: все правила и исключения, ВСЕ понятно! Не нужно заучивать 100500 форм глаголов на разные случаи. Просто четко знаешь правило и действуешь по аналогии. Я с Настей занималась несколько месяцев до своего приезда в Аргентину, и этих знаний мне хватило, чтобы уверенно себя чувствовать. Я, конечно, не всегда понимала то, что мне говорят, но сама изъясниться всегда могла. Кстати, очень здорово, что Настя сама живет в Аргентине уже 5 лет, и знает все особенности местного диалекта. А также может помочь и с бытовыми вопросами: подсказать лучшие районы, посоветовать рестораны и блюда, проконсультировать по документам. Ещё хочу поделиться печальным опытом: по приезду в Аргентину я решила продолжить учить язык с местным учителем, и это был ужас! Никакой структуры! От слова СОВСЕМ! Мы сначала делали упражнение, а потом под упражнением увидели правило, по которому нужно делать это упражнение 🤷‍♀️🤦‍♀️. Я уже молчу о том, что на занятиях мы учили слова охотник, сапожник и вся лексика в таком духе… В общем, я просто уже дохаживала эти занятия и ждала с нетерпением, когда они закончатся…”
                          </Paragraph>
                          <Paragraph mt="$1" fontFamily="$bodyBold" ta="right">Екатерина</Paragraph>
                        </YStack>
                      </Tooltip.Content>
                    </Tooltip>
                  </YStack>
{/*
                  <YStack f={0.7}>
                    <Tooltip placement="top" >
                      <Tooltip.Trigger>
                        <Square br="$2" bc="$backgroundPress"   m="$2" >
                          <Paragraph ta="right" p="$3" >“Настя стала для меня третьим..."  Виталик</Paragraph>
                        </Square>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        scale={1}
                        x={0}
                        y={0}
                        opacity={1}
                        width="80%"
                        alignSelf="center"
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        >
                        <Tooltip.Arrow />
                        <YStack >
                          <Paragraph  size="$2" lineHeight="$1">
                            “Настя стала для меня третьим преподавателем после двух аргентинцев до этого. Могу с уверенностью сказать, что она лучший преподаватель иностранного языка в моей жизни. Подача информации, задания, внимание к моим слабым сторонам и работа с ними - всё это буквально за пару месяцев позволило значительно перегнать не такой большой успех с другими преподавателями. Благодаря занятиям с ней я быстро смог подготовиться к своему первому собеседованию на испанском и поступить в ВУЗ в Аргентине. И самое главное, благодаря ей, я могу общаться с аргентинцами, а это лучшее, что может дать язык. Искренне рекомендую Настю как лучшего преподавателя испанского!”
                          </Paragraph>
                          <Paragraph mt="$1" fontFamily="$bodyBold" ta="right">Виталик</Paragraph>
                        </YStack>
                      </Tooltip.Content>
                    </Tooltip>
                  </YStack>

                  <YStack f={0.7}>
                    <Tooltip placement="top" >
                      <Tooltip.Trigger>
                        <Square  br="$2"  bc="$backgroundPress" m="$2" >
                          <Paragraph ta="right" p="$3" >“Анастасия прекрасный учитель." Ольга</Paragraph>
                        </Square>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                        scale={1}
                        x={0}
                        y={0}
                        opacity={1}
                        width="80%"
                        alignSelf="center"
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                          },
                        ]}
                        >
                      <Tooltip.Arrow />
                        <YStack >
                          <Paragraph  size="$2" lineHeight="$1">
                            “Анастасия прекрасный учитель. Она занимается с двумя детьми 8 и 15 лет. Задачи разные, но Анастасия смогла прекрасно понять задачи, подстроиться под детей и это дало отличный результат! И младший и старший уверенно продвигаются в своих знаниях и что немаловажно полюбили сам язык и процесс! Анастасия применяет совершенно разные материалы и методы, что опять же положительно сказывается на восприятии детьми нового материала. Всем очень советуем этого преподавателя!”
                          </Paragraph>
                          <Paragraph mt="$1" fontFamily="$bodyBold" ta="right">Ольга</Paragraph>
                      </YStack>
                      </Tooltip.Content>
                    </Tooltip>
                  </YStack>
                  */}
                </YStack>
                      

            </XStack>
        </YStack>
    )
}
