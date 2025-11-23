/**
 * TabList
 * タブのリストを表示するコンポーネント
 */

import React from 'react';
import { View, FlatList } from 'react-native';
import { TabState } from '../../types';
import { TabItem } from './TabItem';

interface TabListProps {
  tabs: TabState[];
  activeTabId: number;
  onTabPress: (tabId: number) => void;
}

export const TabList: React.FC<TabListProps> = ({
  tabs,
  activeTabId,
  onTabPress,
}) => {
  return (
    <View className="w-[20%] bg-app-background">
      <FlatList
        data={tabs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TabItem
            tab={item}
            isActive={item.id === activeTabId}
            onPress={onTabPress}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};
