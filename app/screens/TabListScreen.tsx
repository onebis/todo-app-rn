/**
 * TabListScreen
 * タブ一覧・管理画面
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAppContext } from '../contexts';
import { ColorIndicator, IconComponent } from '../components/common';
import { DELETE_TAB_ID, SHADOW } from '../constants';

interface TabListScreenProps {
  onClose: () => void;
  onEditTab: (tabId: number) => void;
  onCreateTab: () => void;
}

export const TabListScreen: React.FC<TabListScreenProps> = ({
  onClose,
  onEditTab,
  onCreateTab,
}) => {
  const { tabList, appState } = useAppContext();

  // タブ削除確認
  const handleDeleteTab = (tabId: number, tabTitle: string) => {
    if (tabId === DELETE_TAB_ID) {
      Alert.alert('エラー', 'DELETEタブは削除できません');
      return;
    }

    Alert.alert(
      'タブを削除',
      `「${tabTitle}」を削除しますか？\nこのタブ内のすべてのタスクも削除されます。`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            await tabList.deleteTab(tabId, (newActiveTabId) => {
              appState.setActiveTabId(newActiveTabId);
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      {/* ヘッダー */}
      <View className="h-[60px] flex-row items-center px-md bg-white">
        <TouchableOpacity
          onPress={onClose}
          className="w-10 h-10 justify-center items-center"
        >
          <Text className="text-2xl text-black">✕</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-black text-center mr-10">
          タブ一覧
        </Text>
      </View>

      {/* タブリスト */}
      <FlatList
        data={tabList.state.tabList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white mx-md my-1 rounded-lg p-4 flex-row items-center">
            {/* 削除ボタン（DELETEタブ以外） */}
            {item.id !== DELETE_TAB_ID ? (
              <TouchableOpacity
                onPress={() => handleDeleteTab(item.id, item.title)}
                className="w-8 h-8 justify-center items-center mr-2"
              >
                <Text className="text-xl text-red-500">✕</Text>
              </TouchableOpacity>
            ) : (
              <View className="w-8 h-8 mr-2" />
            )}

            {/* タブ情報 */}
            <View className="flex-1 flex-row items-center">
              <ColorIndicator color={item.color as any} size={24} />
              <Text className="mx-3 text-body-large font-medium text-black flex-1">
                {item.title}
              </Text>
              <IconComponent icon={item.icon as any} size={24} />
            </View>

            {/* 編集ボタン */}
            <TouchableOpacity
              onPress={() => onEditTab(item.id)}
              className="w-10 h-10 justify-center items-center ml-2"
            >
              <Text className="text-xl text-blue-500">✎</Text>
            </TouchableOpacity>

            {/* ドラッグハンドル（今後実装） */}
            <View className="w-8 h-8 justify-center items-center ml-2">
              <Text className="text-xl text-gray-400">≡</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={onCreateTab}
        className="absolute bottom-5 left-1/2 -ml-7 w-14 h-14 rounded-full bg-blue-500 justify-center items-center"
        style={SHADOW.fab}
      >
        <Text className="text-3xl text-white">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
