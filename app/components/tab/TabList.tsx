/**
 * TabList
 * タブのリストを表示するコンポーネント
 */

import type React from 'react';
import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import type { TabState } from '../../types';
import { TabItem } from './TabItem';

interface TabListProps {
  tabs: TabState[];
  activeTabId: number;
  onTabPress: (tabId: number) => void;
}

export const TabList: React.FC<TabListProps> = ({ tabs, activeTabId, onTabPress }) => {
  const renderItem = useCallback(
    ({ item }: { item: TabState }) => (
      <TabItem tab={item} isActive={item.id === activeTabId} onPress={onTabPress} />
    ),
    [activeTabId, onTabPress]
  );

  const keyExtractor = useCallback((item: TabState) => item.id.toString(), []);

  return (
    <View className="w-[20%] bg-app-background">
      <FlatList
        data={tabs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};
