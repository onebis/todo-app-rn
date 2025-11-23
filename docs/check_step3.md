# ステップ3: グローバル状態管理(Context + ViewModel)の実装 - 最終チェックリスト

このチェックリストを使用して、ステップ3の実装が完了していることを確認してください。

---

## 📁 ファイル存在確認

以下のファイルがすべて作成されていることを確認してください:

### ViewModelファイル (5ファイル)
- [x] `app/viewmodels/TaskListViewModel.ts` が存在する
- [x] `app/viewmodels/TabListViewModel.ts` が存在する
- [x] `app/viewmodels/AppStateViewModel.ts` が存在する
- [x] `app/viewmodels/EditTabStateViewModel.ts` が存在する
- [x] `app/viewmodels/index.ts` が存在する

### Contextファイル (2ファイル)
- [x] `app/contexts/AppContext.tsx` が存在する
- [x] `app/contexts/index.ts` が存在する

### Utilityファイル (1ファイル)
- [x] `app/utils/initialization.ts` が存在する

**確認コマンド:**
```bash
ls -la app/viewmodels/
ls -la app/contexts/
ls -la app/utils/initialization.ts
```

**期待される結果:** ViewModels=5ファイル, Contexts=2ファイル, initialization.ts=1ファイル

---

## 📝 TaskListViewModel の確認

### `app/viewmodels/TaskListViewModel.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `useTaskListViewModel` カスタムフックが定義されている
- [x] 必要な型・ライブラリが正しくインポートされている
  - [x] `useState`, `useCallback` from 'react'
  - [x] `TaskState`, `TaskListState` from '../types'
  - [x] `TaskRepository` from '../repositories'
  - [x] `taskEntitiesToStates` from '../utils'
  - [x] `DELETE_TAB_ID` from '../constants/app'

#### State管理
- [x] `state` が `useState<TaskListState>` で定義されている
- [x] 初期値に `taskList: []`, `isLoading: false`, `error: null` が含まれている

#### メソッド実装
- [x] `fetchTasksByTabId(tabId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] isLoading を true に設定している
  - [x] TaskRepository.getTasksByTabId を呼び出している
  - [x] taskEntitiesToStates で変換している
  - [x] エラーハンドリングが実装されている
- [x] `createTask(tabId: number): Promise<number>` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.createTask を呼び出している
  - [x] fetchTasksByTabId を呼び出している
  - [x] 新しいタスクIDを返している
- [x] `updateTaskSubject(taskId: number, subject: string)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.updateTaskSubject を呼び出している
- [x] `toggleTaskDone(taskId: number, currentTabId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.toggleTaskDone を呼び出している
  - [x] fetchTasksByTabId を呼び出している
- [x] `softDeleteTask(taskId: number, currentTabId: number): Promise<number>` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.updateTaskTabId で DELETE_TAB_ID に移動している
  - [x] fetchTasksByTabId を呼び出している
  - [x] 元のタブIDを返している（Undo用）
- [x] `undoSoftDelete(taskId: number, originalTabId: number, currentTabId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.updateTaskTabId で元のタブに戻している
  - [x] fetchTasksByTabId を呼び出している
- [x] `permanentlyDeleteTask(taskId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.deleteTask を呼び出している
  - [x] fetchTasksByTabId(DELETE_TAB_ID) を呼び出している
- [x] `deleteAllTasksInTrash()` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.deleteTasksByTabId(DELETE_TAB_ID) を呼び出している
  - [x] fetchTasksByTabId(DELETE_TAB_ID) を呼び出している
- [x] `moveTaskToTab(taskId: number, targetTabId: number, currentTabId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.updateTaskTabId を呼び出している
  - [x] fetchTasksByTabId を呼び出している

#### 返り値
- [x] state とすべてのメソッドを返している

**確認コマンド:**
```bash
cat app/viewmodels/TaskListViewModel.ts | grep -E "useCallback"
```

**期待される結果:** 9個の useCallback が存在する

---

## 📑 TabListViewModel の確認

### `app/viewmodels/TabListViewModel.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `useTabListViewModel` カスタムフックが定義されている
- [x] 必要な型・ライブラリが正しくインポートされている
  - [x] `useState`, `useCallback` from 'react'
  - [x] `TabState`, `TabListState` from '../types'
  - [x] `TabRepository`, `TaskRepository` from '../repositories'
  - [x] `tabEntitiesToStates` from '../utils'
  - [x] `DEFAULT_TAB_ID` from '../constants/app'

#### State管理
- [x] `state` が `useState<TabListState>` で定義されている
- [x] 初期値に `tabList: []`, `isLoading: false`, `error: null` が含まれている

#### メソッド実装
- [x] `fetchAllTabs()` が実装されている
  - [x] `useCallback` でラップされている
  - [x] isLoading を true に設定している
  - [x] TabRepository.getAllTabs を呼び出している
  - [x] tabEntitiesToStates で変換している
  - [x] エラーハンドリングが実装されている
- [x] `initializeDefaultTabs()` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TabRepository.initializeDefaultTabs を呼び出している
  - [x] fetchAllTabs を呼び出している
- [x] `createTab(title: string, color: string, icon: string): Promise<number>` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TabRepository.createTab を呼び出している
  - [x] fetchAllTabs を呼び出している
  - [x] 新しいタブIDを返している
- [x] `updateTab(tabId: number, title: string, color: string, icon: string)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TabRepository.updateTab を呼び出している
  - [x] fetchAllTabs を呼び出している
- [x] `deleteTab(tabId: number, onTabDeleted: (newActiveTabId: number) => void)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TaskRepository.deleteTasksByTabId を呼び出している（カスケード削除）
  - [x] TabRepository.deleteTab を呼び出している
  - [x] fetchAllTabs を呼び出している
  - [x] onTabDeleted コールバックで新しいアクティブタブIDを通知している
- [x] `reorderTabs(oldIndex: number, newIndex: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] TabRepository.reorderTabs を呼び出している
  - [x] fetchAllTabs を呼び出している

#### 返り値
- [x] state とすべてのメソッドを返している

**確認コマンド:**
```bash
cat app/viewmodels/TabListViewModel.ts | grep -E "useCallback"
```

**期待される結果:** 6個の useCallback が存在する

---

## 🎯 AppStateViewModel の確認

### `app/viewmodels/AppStateViewModel.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `useAppStateViewModel` カスタムフックが定義されている
- [x] 必要な型・ライブラリが正しくインポートされている
  - [x] `useState`, `useCallback` from 'react'
  - [x] `AppState` from '../types'
  - [x] `DEFAULT_TAB_ID` from '../constants/app'

#### State管理
- [x] `state` が `useState<AppState>` で定義されている
- [x] 初期値に `activeTabId: DEFAULT_TAB_ID`, `activeEditId: 0` が含まれている

#### メソッド実装
- [x] `setActiveTabId(tabId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] activeTabId を更新している
  - [x] activeEditId を 0 に設定している（編集モード解除）
- [x] `setActiveEditId(taskId: number)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] activeEditId を更新している
- [x] `exitEditMode()` が実装されている
  - [x] `useCallback` でラップされている
  - [x] activeEditId を 0 に設定している

#### 返り値
- [x] state とすべてのメソッドを返している

**確認コマンド:**
```bash
cat app/viewmodels/AppStateViewModel.ts | grep -E "useCallback"
```

**期待される結果:** 3個の useCallback が存在する

---

## ✏️ EditTabStateViewModel の確認

### `app/viewmodels/EditTabStateViewModel.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `useEditTabStateViewModel` カスタムフックが定義されている
- [x] 必要な型・ライブラリが正しくインポートされている
  - [x] `useState`, `useCallback` from 'react'
  - [x] `EditTabState` from '../types'

#### 初期状態
- [x] `INITIAL_STATE` 定数が定義されている
  - [x] `editTabId: null` が含まれている
  - [x] `editTabTitle: ''` が含まれている
  - [x] `editTabColor: 'blue'` が含まれている
  - [x] `editTabIcon: 'circle'` が含まれている

#### State管理
- [x] `state` が `useState<EditTabState>` で定義されている
- [x] 初期値として `INITIAL_STATE` が使用されている

#### メソッド実装
- [x] `initializeForCreate()` が実装されている
  - [x] `useCallback` でラップされている
  - [x] editTabId を null に設定している
  - [x] その他のフィールドをデフォルト値に設定している
- [x] `initializeForEdit(tabId: number, title: string, color: string, icon: string)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] editTabId を tabId に設定している
  - [x] title, color, icon を設定している
- [x] `setEditTabTitle(title: string)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] タイトルを最大8文字に制限している (slice(0, 8))
  - [x] editTabTitle を更新している
- [x] `setEditTabColor(color: string)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] editTabColor を更新している
- [x] `setEditTabIcon(icon: string)` が実装されている
  - [x] `useCallback` でラップされている
  - [x] editTabIcon を更新している
- [x] `reset()` が実装されている
  - [x] `useCallback` でラップされている
  - [x] state を INITIAL_STATE にリセットしている

#### 返り値
- [x] state とすべてのメソッドを返している

**確認コマンド:**
```bash
cat app/viewmodels/EditTabStateViewModel.ts | grep -E "useCallback"
```

**期待される結果:** 6個の useCallback が存在する

---

## 📦 ViewModels エクスポートの確認

### `app/viewmodels/index.ts`

- [x] ファイルが存在する
- [x] `useTaskListViewModel` のエクスポートが含まれている
- [x] `useTabListViewModel` のエクスポートが含まれている
- [x] `useAppStateViewModel` のエクスポートが含まれている
- [x] `useEditTabStateViewModel` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/viewmodels/index.ts
```

**期待される内容:**
```typescript
export { useTaskListViewModel } from './TaskListViewModel';
export { useTabListViewModel } from './TabListViewModel';
export { useAppStateViewModel } from './AppStateViewModel';
export { useEditTabStateViewModel } from './EditTabStateViewModel';
```

---

## 🌐 AppContext の確認

### `app/contexts/AppContext.tsx`

#### 基本構造
- [x] ファイルが存在する
- [x] React がインポートされている
- [x] createContext, useContext, ReactNode がインポートされている
- [x] すべてのViewModelがインポートされている

#### 型定義
- [x] `AppContextType` 型が定義されている
  - [x] `taskList: ReturnType<typeof useTaskListViewModel>` が含まれている
  - [x] `tabList: ReturnType<typeof useTabListViewModel>` が含まれている
  - [x] `appState: ReturnType<typeof useAppStateViewModel>` が含まれている
  - [x] `editTabState: ReturnType<typeof useEditTabStateViewModel>` が含まれている

#### Context作成
- [x] `AppContext` が `createContext<AppContextType | undefined>(undefined)` で作成されている

#### Providerコンポーネント
- [x] `AppProvider` コンポーネントが定義されている
- [x] `children: ReactNode` を props として受け取っている
- [x] `useTaskListViewModel()` を呼び出している
- [x] `useTabListViewModel()` を呼び出している
- [x] `useAppStateViewModel()` を呼び出している
- [x] `useEditTabStateViewModel()` を呼び出している
- [x] `value` オブジェクトを作成している
- [x] `AppContext.Provider` で children をラップしている

#### カスタムフック
- [x] `useAppContext` 関数が定義されている
- [x] `useContext(AppContext)` を呼び出している
- [x] context が undefined の場合にエラーをスローしている
- [x] エラーメッセージが適切である（"must be used within an AppProvider"）
- [x] context を返している

**確認コマンド:**
```bash
cat app/contexts/AppContext.tsx | grep -E "(AppProvider|useAppContext)"
```

---

## 📦 Contexts エクスポートの確認

### `app/contexts/index.ts`

- [x] ファイルが存在する
- [x] `AppProvider` のエクスポートが含まれている
- [x] `useAppContext` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/contexts/index.ts
```

**期待される内容:**
```typescript
export { AppProvider, useAppContext } from './AppContext';
```

---

## 🔧 Initialization ユーティリティの確認

### `app/utils/initialization.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `TabRepository` がインポートされている
- [x] `DEFAULT_TAB_ID` がインポートされている

#### 関数実装
- [x] `initializeApp(): Promise<number>` 関数が定義されている
- [x] try-catch ブロックが実装されている
- [x] `TabRepository.hasAnyTabs()` を呼び出している
- [x] タブが存在しない場合、`TabRepository.initializeDefaultTabs()` を呼び出している
- [x] `TabRepository.getAllTabs()` を呼び出している
- [x] タブが存在する場合、最初のタブのIDを返している
- [x] タブが存在しない場合、DEFAULT_TAB_ID を返している
- [x] エラー発生時、DEFAULT_TAB_ID を返している
- [x] エラーをコンソールに出力している

**確認コマンド:**
```bash
cat app/utils/initialization.ts
```

---

## 📦 Utils エクスポートの確認

### `app/utils/index.ts`

- [x] ファイルが存在する
- [x] `date` のエクスポートが含まれている
- [x] `converter` のエクスポートが含まれている
- [x] `initialization` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/utils/index.ts | grep initialization
```

**期待される内容:**
```typescript
export * from './initialization';
```

---

## 🧪 コンパイル確認

### TypeScriptコンパイルチェック

- [x] TypeScriptのコンパイルエラーがない

**確認コマンド:**
```bash
npx tsc --noEmit
```

**期待される結果:** エラーなしで完了

---

## 🔍 インポート確認

以下のインポートが正しく動作することを確認してください:

```typescript
// ViewModels
import {
  useTaskListViewModel,
  useTabListViewModel,
  useAppStateViewModel,
  useEditTabStateViewModel,
} from './app/viewmodels';

// Context
import { AppProvider, useAppContext } from './app/contexts';

// Initialization
import { initializeApp } from './app/utils';
```

- [x] すべてのインポートがエラーなく動作する

---

## 📊 ファイル・メソッド数の確認

### ファイル数
- [x] ViewModels: 5ファイル
- [x] Contexts: 2ファイル
- [x] Utils: initialization.ts が存在

### useCallback数
- [x] TaskListViewModel: 9個
- [x] TabListViewModel: 6個
- [x] AppStateViewModel: 3個
- [x] EditTabStateViewModel: 6個

**確認コマンド:**
```bash
find app/viewmodels -name "*.ts" | wc -l  # 期待値: 5
find app/contexts -name "*.ts*" | wc -l   # 期待値: 2
grep -c "useCallback" app/viewmodels/TaskListViewModel.ts      # 期待値: 9
grep -c "useCallback" app/viewmodels/TabListViewModel.ts       # 期待値: 6
grep -c "useCallback" app/viewmodels/AppStateViewModel.ts      # 期待値: 3
grep -c "useCallback" app/viewmodels/EditTabStateViewModel.ts  # 期待値: 6
```

---

## 🎯 機能別チェック

### TaskListViewModel の機能
- [x] タスク取得: fetchTasksByTabId
- [x] タスク作成: createTask
- [x] タスク更新: updateTaskSubject
- [x] 完了トグル: toggleTaskDone
- [x] ソフト削除: softDeleteTask
- [x] Undo: undoSoftDelete
- [x] 完全削除: permanentlyDeleteTask
- [x] ゴミ箱クリア: deleteAllTasksInTrash
- [x] タブ間移動: moveTaskToTab

### TabListViewModel の機能
- [x] タブ取得: fetchAllTabs
- [x] 初期化: initializeDefaultTabs
- [x] タブ作成: createTab
- [x] タブ更新: updateTab
- [x] タブ削除: deleteTab（カスケード削除含む）
- [x] 並び替え: reorderTabs

### AppStateViewModel の機能
- [x] アクティブタブ設定: setActiveTabId
- [x] 編集タスク設定: setActiveEditId
- [x] 編集終了: exitEditMode

### EditTabStateViewModel の機能
- [x] 新規作成初期化: initializeForCreate
- [x] 編集初期化: initializeForEdit
- [x] タイトル更新: setEditTabTitle（8文字制限）
- [x] カラー更新: setEditTabColor
- [x] アイコン更新: setEditTabIcon
- [x] リセット: reset

### AppContext の機能
- [x] すべてのViewModelを統合
- [x] AppProvider でグローバル状態を提供
- [x] useAppContext でアクセス
- [x] エラーハンドリング

---

## 🔒 制約・バリデーションの確認

### タブタイトル制限
- [x] EditTabStateViewModel.setEditTabTitle で8文字に制限されている

**確認コマンド:**
```bash
cat app/viewmodels/EditTabStateViewModel.ts | grep "slice(0, 8)"
```

### 編集モード管理
- [x] AppStateViewModel.setActiveTabId でタブ切り替え時に編集モードを解除している

**確認コマンド:**
```bash
cat app/viewmodels/AppStateViewModel.ts | grep -A 3 "setActiveTabId"
```

### エラーハンドリング
- [x] すべてのViewModelで try-catch が実装されている
- [x] エラー発生時に state.error が設定されている
- [x] エラーがコンソールに出力されている

---

## ✅ 完了条件

以下のすべてが満たされている場合、ステップ3は完了です:

- [x] すべてのファイルが作成されている（8ファイル）
- [x] TaskListViewModel のすべてのメソッドが実装されている（9メソッド）
- [x] TabListViewModel のすべてのメソッドが実装されている（6メソッド）
- [x] AppStateViewModel のすべてのメソッドが実装されている（3メソッド）
- [x] EditTabStateViewModel のすべてのメソッドが実装されている（6メソッド）
- [x] すべてのメソッドが useCallback でラップされている
- [x] AppContext が正しく実装されている
- [x] useAppContext でエラーハンドリングが実装されている
- [x] initializeApp 関数が実装されている
- [x] TypeScriptのコンパイルエラーがない
- [x] すべてのエクスポートが正しく設定されている

---

**チェックリスト作成日:** 2025-11-22
**対象ステップ:** ステップ3 - グローバル状態管理(Context + ViewModel)の実装