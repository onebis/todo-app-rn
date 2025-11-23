/**
 * AppContext
 * アプリケーション全体の状態を提供するContext
 */

import React, { createContext, useContext, ReactNode } from 'react';
import {
  useTaskListViewModel,
  useTabListViewModel,
  useAppStateViewModel,
  useEditTabStateViewModel,
} from '../viewmodels';

// Context型定義
type AppContextType = {
  taskList: ReturnType<typeof useTaskListViewModel>;
  tabList: ReturnType<typeof useTabListViewModel>;
  appState: ReturnType<typeof useAppStateViewModel>;
  editTabState: ReturnType<typeof useEditTabStateViewModel>;
};

// Contextの作成
const AppContext = createContext<AppContextType | undefined>(undefined);

// Providerコンポーネント
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const taskList = useTaskListViewModel();
  const tabList = useTabListViewModel();
  const appState = useAppStateViewModel();
  const editTabState = useEditTabStateViewModel();

  const value: AppContextType = {
    taskList,
    tabList,
    appState,
    editTabState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// カスタムフックでContextを使用
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
