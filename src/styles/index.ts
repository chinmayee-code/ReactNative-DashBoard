import {extendTheme} from 'native-base';
import {fontFamily} from '../../app.json';
import {Dimensions} from 'react-native';

export const COLORS = {
  primary: '#00008B',
  secondary: '#000080',
  darkblue: '#3F00FF',
  gray: '#1F51FF',
  blue: '#A7C7E7',
  sapphire: '#4169E1',
  RoyalBlue: '#0F52BA',
  yo: '#B6D0E2',
};

export const FONTS = {
  100: {
    normal: `${fontFamily}-Light`,
    italic: `${fontFamily}-LightItalic`,
  },
  200: {
    normal: `${fontFamily}-ExtraLight`,
    italic: `${fontFamily}-ExtraLightItalic`,
  },
  300: {
    normal: `${fontFamily}-Regular`,
    italic: `${fontFamily}-Italic`,
  },
  400: {
    normal: `${fontFamily}-Medium`,
    italic: `${fontFamily}-MediumItalic`,
  },
  500: {
    normal: `${fontFamily}-SemiBold`,
    italic: `${fontFamily}-SemiBoldItalic`,
  },
  600: {
    normal: `${fontFamily}-Bold`,
    italic: `${fontFamily}-BoldItalic`,
  },
  700: {
    normal: `${fontFamily}-ExtraBold`,
    italic: `${fontFamily}-ExtraBoldItalic`,
  },
  800: {
    normal: `${fontFamily}-Black`,
    italic: `${fontFamily}-BlackItalic`,
  },
  900: {
    normal: `${fontFamily}-Black`,
    italic: `${fontFamily}-BlackItalic`,
  },
};

export const CustomTheme = extendTheme({
  colors: COLORS,
  fontConfig: {
    fontFamily: FONTS,
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily,
  },
});
export const {width, height} = Dimensions.get('screen');
