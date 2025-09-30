// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName =
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'sun.max.fill'
  | 'cloud.rain.fill'
  | 'cloud.sun.fill'
  | 'sun.cloudy.fill'
  | 'moon.fill'
  | 'cloud.moon.fill'
  | 'cloud.bolt.fill'
  | 'cloud.snow.fill'
  | 'wind'
  | 'humidity'
  | 'gauge'
  | 'location.fill';

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<IconSymbolName, ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'sun.max.fill': 'wb-sunny',
  'cloud.rain.fill': 'cloudy-snowing',
  'cloud.sun.fill': 'wb-sunny',
  'sun.cloudy.fill': 'wb-cloudy',
  'moon.fill': 'nights-stay',
  'cloud.moon.fill': 'nightlight',
  'cloud.bolt.fill': 'thunderstorm',
  'cloud.snow.fill': 'snowing',
  'wind': 'air',
  'humidity': 'water',
  'gauge': 'speed',
  'location.fill': 'my-location',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
