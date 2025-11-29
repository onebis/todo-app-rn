/**
 * TabItem
 * 個別のタブを表示するコンポーネント
 */

import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TabState } from '../../types';
import { ColorIndicator, IconComponent } from '../common';

interface TabItemProps {
  tab: TabState;
  isActive: boolean;
  onPress: (tabId: number) => void;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(tab.id)}
      className={`h-[70px] py-sm px-4 mb-sm justify-center rounded-r-tab ${
        isActive ? 'bg-active-tab' : 'bg-inactive-tab'
      }`}
    >
      <View className="flex-row items-center gap-2">
        {/* カラーインジケーター */}
        <ColorIndicator color={tab.color as any} size={12} />

        {/* タブ名 */}
        <Text className="flex-1 text-body-medium font-medium text-black" numberOfLines={1}>
          {tab.title}
        </Text>

        {/* アイコン */}
        <IconComponent icon={tab.icon as any} size={16} />
      </View>
    </TouchableOpacity>
  );
};
