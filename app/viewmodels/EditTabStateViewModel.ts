/**
 * EditTabStateViewModel
 * タブ編集画面の状態とビジネスロジックを管理
 */

import { useCallback, useState } from 'react';
import type { EditTabState } from '../types';

const INITIAL_STATE: EditTabState = {
  editTabId: null,
  editTabTitle: '',
  editTabColor: 'blue',
  editTabIcon: 'circle',
};

export const useEditTabStateViewModel = () => {
  const [state, setState] = useState<EditTabState>(INITIAL_STATE);

  /**
   * 新規作成モードで初期化
   */
  const initializeForCreate = useCallback(() => {
    setState({
      editTabId: null,
      editTabTitle: '',
      editTabColor: 'blue',
      editTabIcon: 'circle',
    });
  }, []);

  /**
   * 編集モードで初期化
   */
  const initializeForEdit = useCallback(
    (tabId: number, title: string, color: string, icon: string) => {
      setState({
        editTabId: tabId,
        editTabTitle: title,
        editTabColor: color,
        editTabIcon: icon,
      });
    },
    []
  );

  /**
   * タブタイトルを更新
   */
  const setEditTabTitle = useCallback((title: string) => {
    // 最大8文字に制限
    const truncated = title.slice(0, 8);
    setState((prev) => ({
      ...prev,
      editTabTitle: truncated,
    }));
  }, []);

  /**
   * タブカラーを更新
   */
  const setEditTabColor = useCallback((color: string) => {
    setState((prev) => ({
      ...prev,
      editTabColor: color,
    }));
  }, []);

  /**
   * タブアイコンを更新
   */
  const setEditTabIcon = useCallback((icon: string) => {
    setState((prev) => ({
      ...prev,
      editTabIcon: icon,
    }));
  }, []);

  /**
   * 状態をリセット
   */
  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    initializeForCreate,
    initializeForEdit,
    setEditTabTitle,
    setEditTabColor,
    setEditTabIcon,
    reset,
  };
};
