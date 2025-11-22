# ステップ2: データアクセス層(Repository)の実装 - 最終チェックリスト

このチェックリストを使用して、ステップ2の実装が完了していることを確認してください。

---

## 📁 ファイル存在確認

以下のファイルがすべて作成されていることを確認してください:

- [x] `app/repositories/storage.ts` が存在する
- [x] `app/repositories/TaskRepository.ts` が存在する
- [x] `app/repositories/TabRepository.ts` が存在する
- [x] `app/repositories/index.ts` が存在する

**確認コマンド:**
```bash
ls -la app/repositories/
```

**期待される結果:** 4つの .ts ファイルが存在する

---

## 🗄️ Storage クラスの確認

### `app/repositories/storage.ts`

- [x] ファイルが存在する
- [x] `Storage` クラスが定義されている
- [x] `save<T>(key: string, value: T): Promise<void>` メソッドが実装されている
- [x] `load<T>(key: string): Promise<T | null>` メソッドが実装されている
- [x] `remove(key: string): Promise<void>` メソッドが実装されている
- [x] `clear(): Promise<void>` メソッドが実装されている
- [x] `getAllKeys(): Promise<string[]>` メソッドが実装されている
- [x] すべてのメソッドが `static` である
- [x] AsyncStorage が正しくインポートされている
- [x] try-catch によるエラーハンドリングが実装されている
- [x] エラー時に console.error でログ出力している
- [x] JSON.stringify / JSON.parse が使用されている

**確認コマンド:**
```bash
cat app/repositories/storage.ts | grep -E "(save|load|remove|clear|getAllKeys)"
```

---

## 📝 TaskRepository の確認

### `app/repositories/TaskRepository.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `TaskRepository` クラスが定義されている
- [x] `TASKS_STORAGE_KEY = 'tasks'` 定数が定義されている
- [x] 必要な型・ユーティリティが正しくインポートされている
  - [x] `TaskEntity` from '../types'
  - [x] `Storage` from './storage'
  - [x] `getCurrentTimestamp` from '../utils'

#### Read 操作
- [x] `getAllTasks(): Promise<TaskEntity[]>` メソッドが実装されている
- [x] `getTasksByTabId(tabId: number): Promise<TaskEntity[]>` メソッドが実装されている
  - [x] tabId でフィルタリングしている
- [x] `getTaskById(taskId: number): Promise<TaskEntity | null>` メソッドが実装されている

#### Create 操作
- [x] `createTask(tabId: number): Promise<number>` メソッドが実装されている
  - [x] 新しいIDを自動生成している（最大ID + 1）
  - [x] subject が空文字列 ('') で初期化されている
  - [x] done が false で初期化されている
  - [x] order が 0 で初期化されている
  - [x] created が現在のタイムスタンプで設定されている
  - [x] 作成されたタスクのIDを返している

#### Update 操作
- [x] `updateTaskSubject(taskId: number, subject: string): Promise<void>` メソッドが実装されている
  - [x] タスクが見つからない場合にエラーをスローしている
- [x] `toggleTaskDone(taskId: number): Promise<void>` メソッドが実装されている
  - [x] done の値を反転している (!task.done)
  - [x] タスクが見つからない場合にエラーをスローしている
- [x] `updateTaskTabId(taskId: number, newTabId: number): Promise<void>` メソッドが実装されている
  - [x] tabId を更新している
  - [x] タスクが見つからない場合にエラーをスローしている

#### Delete 操作
- [x] `deleteTask(taskId: number): Promise<void>` メソッドが実装されている
  - [x] filter を使用してタスクを削除している
- [x] `deleteTasksByTabId(tabId: number): Promise<void>` メソッドが実装されている
  - [x] 指定されたタブのすべてのタスクを削除している
- [x] `deleteAllTasks(): Promise<void>` メソッドが実装されている
  - [x] すべてのタスクを削除している

#### 共通確認事項
- [x] すべてのメソッドが `static` である
- [x] すべてのメソッドが `async` である
- [x] イミュータブルな更新を行っている（スプレッド構文を使用）

**確認コマンド:**
```bash
cat app/repositories/TaskRepository.ts | grep -E "static async"
```

**期待される結果:** 12個の static async メソッドが存在する

---

## 📑 TabRepository の確認

### `app/repositories/TabRepository.ts`

#### 基本構造
- [x] ファイルが存在する
- [x] `TabRepository` クラスが定義されている
- [x] `TABS_STORAGE_KEY = 'tabs'` 定数が定義されている
- [x] 必要な型・ユーティリティが正しくインポートされている
  - [x] `TabEntity` from '../types'
  - [x] `Storage` from './storage'
  - [x] `getCurrentTimestamp` from '../utils'
  - [x] `DELETE_TAB_ID`, `DEFAULT_TABS` from '../constants/app'

#### Read 操作
- [x] `getAllTabs(): Promise<TabEntity[]>` メソッドが実装されている
  - [x] order でソートしている (sort((a, b) => a.order - b.order))
- [x] `getTabById(tabId: number): Promise<TabEntity | null>` メソッドが実装されている
- [x] `hasAnyTabs(): Promise<boolean>` メソッドが実装されている

#### Initialize 操作
- [x] `initializeDefaultTabs(): Promise<void>` メソッドが実装されている
  - [x] タブが既に存在する場合は何もしない
  - [x] DEFAULT_TABS をベースにデフォルトタブを作成している
  - [x] created に getCurrentTimestamp() を使用している

#### Create 操作
- [x] `createTab(title: string, color: string, icon: string): Promise<number>` メソッドが実装されている
  - [x] 新しいIDを自動生成している（最大ID + 1、最小値は2）
  - [x] order が 0 で初期化されている（先頭に追加）
  - [x] 既存のタブの order を +1 している
  - [x] created が現在のタイムスタンプで設定されている
  - [x] 作成されたタブのIDを返している

#### Update 操作
- [x] `updateTab(tabId: number, title: string, color: string, icon: string): Promise<void>` メソッドが実装されている
  - [x] title, color, icon を更新している
  - [x] タブが見つからない場合にエラーをスローしている
- [x] `updateTabOrder(tabId: number, newOrder: number): Promise<void>` メソッドが実装されている
  - [x] order を更新している
  - [x] タブが見つからない場合にエラーをスローしている

#### Delete 操作
- [x] `deleteTab(tabId: number): Promise<void>` メソッドが実装されている
  - [x] DELETE_TAB_ID (id=1) の削除を防止している
  - [x] タブ削除後に order を正規化している（0, 1, 2, ...）
- [x] `deleteAllTabs(): Promise<void>` メソッドが実装されている

#### Reorder 操作
- [x] `reorderTabs(oldIndex: number, newIndex: number): Promise<void>` メソッドが実装されている
  - [x] インデックスの範囲チェックを行っている
  - [x] splice を使用してタブを移動している
  - [x] 移動後に order を正規化している（0, 1, 2, ...）

#### 共通確認事項
- [x] すべてのメソッドが `static` である
- [x] すべてのメソッドが `async` である
- [x] イミュータブルな更新を行っている（スプレッド構文を使用）
- [x] DELETE_TAB_ID の特殊処理が実装されている

**確認コマンド:**
```bash
cat app/repositories/TabRepository.ts | grep -E "static async"
```

**期待される結果:** 11個の static async メソッドが存在する

---

## 📦 エクスポートの確認

### `app/repositories/index.ts`

- [x] ファイルが存在する
- [x] `Storage` のエクスポートが含まれている
- [x] `TaskRepository` のエクスポートが含まれている
- [x] `TabRepository` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/repositories/index.ts
```

**期待される内容:**
```typescript
export { Storage } from './storage';
export { TaskRepository } from './TaskRepository';
export { TabRepository } from './TabRepository';
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
import { Storage, TaskRepository, TabRepository } from './app/repositories';
```

- [x] すべてのインポートがエラーなく動作する

---

## 📊 メソッド数の確認

### Storage クラス
- [x] 5つのメソッドが存在する
  - save, load, remove, clear, getAllKeys

### TaskRepository クラス
- [x] 10個のメソッドが存在する
  - getAllTasks, getTasksByTabId, getTaskById
  - createTask
  - updateTaskSubject, toggleTaskDone, updateTaskTabId
  - deleteTask, deleteTasksByTabId, deleteAllTasks

### TabRepository クラス
- [x] 10個のメソッドが存在する
  - getAllTabs, getTabById, hasAnyTabs
  - initializeDefaultTabs
  - createTab
  - updateTab, updateTabOrder
  - deleteTab, deleteAllTabs
  - reorderTabs

**確認コマンド:**
```bash
grep -c "static async" app/repositories/TaskRepository.ts
grep -c "static async" app/repositories/TabRepository.ts
```

**期待される結果:** TaskRepository=10, TabRepository=10

---

## 🎯 機能別チェック

### CRUD 操作の網羅性

#### Task の CRUD
- [x] Create: createTask
- [x] Read: getAllTasks, getTasksByTabId, getTaskById
- [x] Update: updateTaskSubject, toggleTaskDone, updateTaskTabId
- [x] Delete: deleteTask, deleteTasksByTabId, deleteAllTasks

#### Tab の CRUD
- [x] Create: createTab, initializeDefaultTabs
- [x] Read: getAllTabs, getTabById, hasAnyTabs
- [x] Update: updateTab, updateTabOrder
- [x] Delete: deleteTab, deleteAllTabs

#### 特殊操作
- [x] Tab並び替え: reorderTabs
- [x] タブ間タスク移動: updateTaskTabId
- [x] タブ削除時の保護: DELETE_TAB_ID チェック

---

## 🔒 制約・バリデーションの確認

### DELETE_TAB_ID の保護
- [x] TabRepository.deleteTab で DELETE_TAB_ID の削除を防止している

**確認コマンド:**
```bash
cat app/repositories/TabRepository.ts | grep -A 3 "DELETE_TAB_ID"
```

### エラーハンドリング
- [x] Storage のすべてのメソッドに try-catch がある
- [x] TaskRepository の update メソッドでタスク未検出時にエラーをスローする
- [x] TabRepository の update/delete メソッドでタブ未検出時にエラーをスローする
- [x] TabRepository.reorderTabs でインデックス範囲チェックがある

---

## 📝 データ構造の確認

### ID生成
- [x] TaskRepository.createTask で最大ID + 1 を使用
- [x] TabRepository.createTab で最大ID + 1 を使用（最小値2）

### Order 管理
- [x] TabRepository.getAllTabs で order でソート
- [x] TabRepository.createTab で既存タブの order を +1
- [x] TabRepository.deleteTab で order を正規化
- [x] TabRepository.reorderTabs で order を正規化

### デフォルト値
- [x] TaskRepository.createTask で subject='', done=false, order=0
- [x] TabRepository.createTab で order=0（先頭配置）
- [x] TabRepository.initializeDefaultTabs で DEFAULT_TABS を使用

---

## ✅ 完了条件

以下のすべてが満たされている場合、ステップ2は完了です:

- [x] すべてのファイルが作成されている（4ファイル）
- [x] Storage クラスのすべてのメソッドが実装されている（5メソッド）
- [x] TaskRepository のすべてのメソッドが実装されている（10メソッド）
- [x] TabRepository のすべてのメソッドが実装されている（10メソッド）
- [x] すべてのメソッドが static である
- [x] TypeScriptのコンパイルエラーがない
- [x] DELETE_TAB_ID の保護が実装されている
- [x] エラーハンドリングが適切に実装されている
- [x] イミュータブルな更新が実装されている
- [x] Order の正規化処理が実装されている

---
