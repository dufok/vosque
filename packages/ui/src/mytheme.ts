import { createTheme } from 'tamagui'
import { tokens } from '@tamagui/theme-base'


const light = createTheme({

  background: '#FFFDEF', // default background light
  backgroundHover: '#A8A161',
  backgroundPress: '#918a50',
  backgroundFocus: '#76714A9E',
  borderColor: '#83503C',
  borderColorHover: '#b87d65',
  borderColorPress: '#83503C',
  borderColorFocus: '#83503C',
  placeholderColor: '#0A0C08',
  color: '#121610',
  colorHover: '#3A4733',
  colorPress: '#272F22',
  colorFocus: '#0A0C08',
  shadowColor: '#0A0C08',
  shadowColorHover: '#121610',
  color1: '#121610',
  color2: '#121610', 
  color3: 'hsl(0, 0%, 95.1%)',
  color4: 'hsl(0, 0%, 93.0%)',
  color5: 'hsl(0, 0%, 90.9%)',
  color6: 'hsl(0, 0%, 88.7%)',
  color7: 'hsl(0, 0%, 85.8%)',
  color8: 'hsl(0, 0%, 78.0%)',
  color9: 'hsl(0, 0%, 56.1%)',
  color10: 'hsl(0, 0%, 52.3%)',
  color11: 'hsl(0, 0%, 43.5%)',
  color12: 'hsl(0, 0%, 9.0%)',
})
// note: we set up a single consistent base type to validate the rest:

type BaseTheme = typeof light
// the rest of the themes use BaseTheme

const dark: BaseTheme = {
  background: '#FFFDEF', // default background light
  backgroundHover: '#A8A161',
  backgroundPress: '#918a50',
  backgroundFocus: '#76714A9E',
  borderColor: '#83503C',
  borderColorHover: '#b87d65',
  borderColorPress: '#83503C',
  borderColorFocus: '#83503C',
  placeholderColor: '#0A0C08',
  color: '#121610',
  colorHover: '#3A4733',
  colorPress: '#272F22',
  colorFocus: '#0A0C08',
  shadowColor: '#0A0C08',
  shadowColorHover: '#121610',
  color1: '#121610',
  color2: '#121610', 
  color3: 'hsl(0, 0%, 95.1%)',
  color4: 'hsl(0, 0%, 93.0%)',
  color5: 'hsl(0, 0%, 90.9%)',
  color6: 'hsl(0, 0%, 88.7%)',
  color7: 'hsl(0, 0%, 85.8%)',
  color8: 'hsl(0, 0%, 78.0%)',
  color9: 'hsl(0, 0%, 56.1%)',
  color10: 'hsl(0, 0%, 52.3%)',
  color11: 'hsl(0, 0%, 43.5%)',
  color12: 'hsl(0, 0%, 9.0%)',
}
// if you need to add non-token values, use createTheme

const dark_translucent: BaseTheme = createTheme({

  ...dark,

  background: 'rgba(0,0,0,0.7)',
  backgroundHover: 'rgba(0,0,0,0.5)',
  backgroundPress: 'rgba(0,0,0,0.25)',
  backgroundFocus: 'rgba(0,0,0,0.1)',

})
const light_translucent: BaseTheme = createTheme({

  ...light,

  background: 'rgba(255,255,255,0.85)',
  backgroundHover: 'rgba(250,250,250,0.85)',
  backgroundPress: 'rgba(240,240,240,0.85)',
  backgroundFocus: 'rgba(240,240,240,0.7)',
})
const dark_gray: BaseTheme = createTheme({

  ...dark,

  background: tokens.color.gray5Dark,
  backgroundHover: tokens.color.gray6Dark,
  backgroundPress: tokens.color.gray7Dark,
  backgroundFocus: tokens.color.gray8Dark,

})
const light_gray: BaseTheme = createTheme({

  ...light,

  background: tokens.color.gray5Light,
  backgroundHover: tokens.color.gray6Light,
  backgroundPress: tokens.color.gray7Light,
  backgroundFocus: tokens.color.gray8Light,
})
const dark_red: BaseTheme = createTheme({

  ...dark,

  background: tokens.color.red5Dark,
  backgroundHover: tokens.color.red6Dark,
  backgroundPress: tokens.color.red7Dark,
  backgroundFocus: tokens.color.red8Dark,

})
const light_red: BaseTheme = createTheme({

  ...light,

  background: tokens.color.red5Light,
  backgroundHover: tokens.color.red6Light,
  backgroundPress: tokens.color.red7Light,
  backgroundFocus: tokens.color.red8Light,
})

// note the steps here

// we recommend doing this because it avoids a category of confusing type errors
// 1. to get ThemeNames/Theme, first create an object with all themes

const allThemes = {

  dark,
  light,
  dark_translucent,
  light_translucent,
  dark_gray,
  light_gray,
  dark_red,
  light_red
}
// 2. then get the name type

type ThemeName = keyof typeof allThemes
// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme

type Themes = {

  [key in ThemeName]: BaseTheme

}
// 4. finally, export it with the stricter type

export const themes: Themes = allThemes
