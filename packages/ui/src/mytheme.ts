import { createTheme } from 'tamagui'
import { tokens } from '@tamagui/theme-base'


const light = createTheme({

  background: '#557048', // default background light
  backgroundHover: tokens.color.green3Light,
  backgroundPress: tokens.color.green4Light,
  backgroundFocus: tokens.color.green5Light,
  borderColor: tokens.color.green4Light,
  borderColorHover: tokens.color.green6Light,
  colorHover: tokens.color.green11Light,
  colorPress: tokens.color.green10Light,
  colorFocus: tokens.color.green6Light,
  shadowColor: tokens.color.green5Light,
  shadowColorHover: tokens.color.green6Light,
  color: tokens.color.green12Light,
  borderColorPress: '#B8D3D1',
  borderColorFocus: '#5ABCB9',
  color1: 'hsl(0, 0%, 99.0%)',
  color2: 'hsl(0, 0%, 97.0%)',
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
  background: '#171614', //default background Dark
  backgroundHover: tokens.color.green2Dark,
  backgroundPress: tokens.color.green3Dark,
  backgroundFocus: tokens.color.green4Dark,
  borderColor: tokens.color.green3Dark,
  borderColorHover: tokens.color.green4Dark,
  colorHover: tokens.color.green11Dark,
  colorPress: tokens.color.green10Dark,
  colorFocus: tokens.color.green6Dark,
  shadowColor: tokens.color.green6Dark,
  shadowColorHover: tokens.color.green7Dark,
  color: '#ddd',
  borderColorPress: '#B8D3D1',
  borderColorFocus: '#3A2618',
  color1: '#191919',
  color2: '#232323',
  color3: '#282828',
  color4: '#323232',
  color5: '#383838',
  color6: '#424242',
  color7: '#494949',
  color8: '#545454',
  color9: '#626262',
  color10: '#a5a5a5',
  color11: '#B3B3B3',
  color12: '#E6E6E6',
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
// note the steps here

// we recommend doing this because it avoids a category of confusing type errors
// 1. to get ThemeNames/Theme, first create an object with all themes

const allThemes = {

  dark,
  light,
  dark_translucent,
  light_translucent,
}
// 2. then get the name type

type ThemeName = keyof typeof allThemes
// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme

type Themes = {

  [key in ThemeName]: BaseTheme

}
// 4. finally, export it with the stricter type

export const themes: Themes = allThemes
