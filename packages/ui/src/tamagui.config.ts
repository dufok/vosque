import { createTamagui, createFont } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { size, tokens } from '@tamagui/theme-base'
import { createMedia } from '@tamagui/react-native-media-driver'
import { themes } from './mytheme'

import { animations } from './animations'

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
)

const headingViosqueFont = createFont({
  family: 'VosqueStyleH',
  size: {
    1: 40,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
  },
  lineHeight: {
    1: 45,
    2: 40,
    3: 35,
    4: 30,
    5: 25,
    6: 20,
  },
  weight: {
    1: '700',
    2: '700',
    3: '700',
    4: '700',
    5: '700',
    6: '700',
  },
  letterSpacing: {
    1: -0.5,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 1
  },
  face: {
    700: { normal: 'Montserrat-Bold' },
  },
})

const bodyVosqueFont = createFont({
  family: 'VosqueStyleB',
  size: {
    1: 40,
  },
  weight: {
    1: '400',
  },
  lineHeight: {
    1: 45,
  },
  letterSpacing: {
    1: -0.5,
  },
})




export const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingViosqueFont,
    body: bodyVosqueFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})
