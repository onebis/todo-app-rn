/**
 * ColorIndicator
 * タブのカラーを表示するコンポーネント
 */

import type React from 'react';
import { View } from 'react-native';
import type { ColorType } from '../../constants/app';

interface ColorIndicatorProps {
  color: ColorType;
  size?: number;
  className?: string;
}

// カラー名からHexコードへのマッピング
const COLOR_MAP: Record<ColorType, string> = {
  red: '#F44336',
  pink: '#E91E63',
  purple: '#9C27B0',
  deepPurple: '#673AB7',
  indigo: '#3F51B5',
  blue: '#2196F3',
  lightBlue: '#03A9F4',
  cyan: '#00BCD4',
  teal: '#009688',
  green: '#4CAF50',
  lightGreen: '#8BC34A',
  lime: '#CDDC39',
  yellow: '#FFEB3B',
  amber: '#FFC107',
  orange: '#FF9800',
  deepOrange: '#FF5722',
  brown: '#795548',
  grey: '#9E9E9E',
  blueGrey: '#607D8B',
};

export const ColorIndicator: React.FC<ColorIndicatorProps> = ({
  color,
  size = 30,
  className = '',
}) => {
  const hexColor = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <View
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: hexColor,
      }}
    />
  );
};
