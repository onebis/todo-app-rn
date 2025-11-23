/**
 * IconComponent
 * アイコン表示用の共通コンポーネント
 */

import React from 'react';
import { Text } from 'react-native';
import { IconType } from '../../constants/app';

interface IconComponentProps {
  icon: IconType;
  size?: number;
  color?: string;
}

// アイコン名からマッピング（簡易実装）
const ICON_MAP: Record<IconType, string> = {
  circle: '●',
  square: '■',
  triangle: '▲',
  star: '★',
  heart: '♥',
  bookmark: '🔖',
  flag: '🚩',
  bell: '🔔',
  home: '🏠',
  work: '💼',
  school: '🎓',
  shopping: '🛒',
  fitness: '💪',
  music: '🎵',
  movie: '🎬',
  game: '🎮',
  book: '📚',
  food: '🍔',
  travel: '✈️',
  code: '💻',
};

export const IconComponent: React.FC<IconComponentProps> = ({
  icon,
  size = 24,
  color = '#000000',
}) => {
  const iconText = ICON_MAP[icon] || '●';

  return (
    <Text style={{ fontSize: size, color }}>
      {iconText}
    </Text>
  );
};
