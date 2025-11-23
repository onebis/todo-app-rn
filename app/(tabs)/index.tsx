/**
 * Home Screen - Todo App Main Screen with Navigation
 */

import React, { useState } from 'react';
import { MainScreen, EditTabScreen, TabListScreen } from '../screens';

type Screen = 'main' | 'tabList' | 'createTab' | 'editTab';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [editingTabId, setEditingTabId] = useState<number | undefined>();

  const navigateToTabList = () => setCurrentScreen('tabList');
  const navigateToCreateTab = () => setCurrentScreen('createTab');
  const navigateToEditTab = (tabId: number) => {
    setEditingTabId(tabId);
    setCurrentScreen('editTab');
  };
  const navigateToMain = () => {
    setCurrentScreen('main');
    setEditingTabId(undefined);
  };

  return (
    <>
      {currentScreen === 'main' && (
        <MainScreen onNavigateToTabList={navigateToTabList} />
      )}

      {currentScreen === 'tabList' && (
        <TabListScreen
          onClose={navigateToMain}
          onEditTab={navigateToEditTab}
          onCreateTab={navigateToCreateTab}
        />
      )}

      {currentScreen === 'createTab' && (
        <EditTabScreen
          mode="create"
          onClose={() => setCurrentScreen('tabList')}
        />
      )}

      {currentScreen === 'editTab' && editingTabId !== undefined && (
        <EditTabScreen
          mode="edit"
          tabId={editingTabId}
          onClose={() => setCurrentScreen('tabList')}
        />
      )}
    </>
  );
}
