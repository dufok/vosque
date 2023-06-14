import { Asterisk } from '@tamagui/lucide-icons'
import {
  Adapt,
  Button,
  Label,
  Paragraph,
  Popover,
  XStack,
  YStack,
} from 'tamagui'

export function HelpComp({texts, html}) {
  return (
    <Popover size="$5" allowFlip placement="top" > 
      <Popover.Trigger asChild>
        <Button size="$1" icon={Asterisk} />
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ x: 0, y: -10, opacity: 0 }}
        exitStyle={{ x: 0, y: -10, opacity: 0 }}
        x={0}
        y={0}
        m="$4"
        opacity={1}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        elevate
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack m="$3" maw={300}>
            <Paragraph size="$3" htmlFor={html}>
              {texts}
            </Paragraph>
          <Popover.Close asChild>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  )
}