/**
 * AppContext
 * アプリケーション全体の状態を提供するContext
 */

import type React from 'react';
import { createContext, type ReactNode, useContext } from 'react';
import {
  useAppStateViewModel,
  useEditTabStateViewModel,
  useTabListViewModel,
  useTaskListViewModel,
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
