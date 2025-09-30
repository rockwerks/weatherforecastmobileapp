// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
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
  | 'location.fill'
  | 'cloud.fill'
  | 'cloud.heavyrain.fill'
  | 'cloud.drizzle.fill'
  | 'cloud.sleet.fill'
  | 'cloud.bolt.rain.fill'
  | 'cloud.fog.fill'
  | 'sun.dust.fill'
  | 'tornado'
  | 'questionmark.circle.fill'
  | 'thermometer'
  | 'drop.fill'
  | 'barometer'
  | 'eye.fill'
  | 'sunrise.fill'
  | 'sunset.fill'
  | 'cloud.drizzle'
  | 'snow'
  | 'thunderstorm'
  | 'mist';

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
  'cloud.rain.fill': 'grain',
  'cloud.sun.fill': 'wb-cloudy',
  'sun.cloudy.fill': 'wb-cloudy',
  'moon.fill': 'nights-stay',
  'cloud.moon.fill': 'nightlight',
  'cloud.bolt.fill': 'thunderstorm',
  'cloud.snow.fill': 'snowing', 
  'wind': 'air',
  'humidity': 'water-drop',
  'gauge': 'speed',
  'location.fill': 'my-location',
  // Additional weather icons
  'cloud.fill': 'cloud',
  'cloud.heavyrain.fill': 'thunderstorm',
  'cloud.drizzle.fill': 'grain',
  'cloud.sleet.fill': 'ac-unit',
  'cloud.bolt.rain.fill': 'thunderstorm',
  'cloud.fog.fill': 'blur-on',
  'sun.dust.fill': 'wb-sunny',
  'tornado': 'cyclone',
  'questionmark.circle.fill': 'help-outline',
  'thermometer': 'thermostat',
  'drop.fill': 'water-drop',
  'barometer': 'compress',
  'eye.fill': 'visibility',
  'sunrise.fill': 'wb-twilight',
  'sunset.fill': 'wb-twilight',
  'cloud.drizzle': 'grain',
  'snow': 'ac-unit',
  'thunderstorm': 'thunderstorm',
  'mist': 'blur-on',
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
