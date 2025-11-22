/**
 * UIレイヤーの状態型定義
 */

/**
 * TaskState
 * UIで使用するタスクの状態
 */
export interface TaskState {
  id: number;
  subject: string;
  done: boolean;
  tabId: number;
  created: string; // ISO 8601形式
}

/**
 * TabState
 * UIで使用するタブの状態
 */
export interface TabState {
  id: number;
  title: string;
  color: string;
  icon: string;
  order: number;
}

/**
 * TaskListState
 * タスクリストの状態管理
 */
export interface TaskListState {
  taskList: TaskState[];
  isLoading: boolean;
  error: string | null;
}

/**
 * TabListState
 * タブリストの状態管理
 */
export interface TabListState {
  tabList: TabState[];
  isLoading: boolean;
  error: string | null;
}

/**
 * AppState
 * アプリケーション全体の状態
 */
export interface AppState {
  activeTabId: number; // 現在選択されているタブのID
  activeEditId: number; // 現在編集中のタスクID (0の場合は編集中のタスクなし)
}

/**
 * EditTabState
 * タブ作成・編集画面の状態
 */
export interface EditTabState {
  editTabId: number | null; // nullの場合は新規作成、数値の場合は編集
  editTabTitle: string;
  editTabColor: string;
  editTabIcon: string;
}
