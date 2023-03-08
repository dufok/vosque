import {
  YStack,
  H1,
  H3,
  XStack,
  ZStack,
  Image,
  Square,
  Button
} from "@my/ui";
import React from "react";
//add background css
import '@my/ui/src/background.css';
//add Font style
import '@my/ui/src/styles.css'
//add Header
import { Header} from '@my/ui/src/components/HeaderComp';


export function testScreen() {
  return (
    <YStack f={1} className="background-image" miw={500} space="$6">
      <YStack ai="center">
        <H1 ta="center" fos={70} tt="uppercase" fow="$4" mt="$10" mb="$10" color="$color2" style={{ fontFamily: 'VosqueStyle' }}>
          Разговорники
        </H1>
        <XStack m="$5" jc='space-around' alignItems="center" fw='wrap' maw={1600}>
          <YStack
            position="relative"
            w={500} h={300}
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              аренда жилья
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              оформление документов
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              в ресторане
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              квир/на дейтинге
            </H3>
          </YStack>
          <YStack
            position="relative"
            w={500} h={300}
            >
            <Image
              src="https://placekitten.com/200/300"
              width={400}
              height={200}
              hoverStyle={{ opacity: 0.5 }}
            />
            <H3
              position="absolute"
              zi={50}
              tt="uppercase"
            >
              ругательства
            </H3>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
}