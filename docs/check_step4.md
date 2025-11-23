# ステップ4: メイン画面のUI & コア機能(タスクとタブの基本操作)の実装 - 最終チェックリスト

このチェックリストを使用して、ステップ4の実装が完了していることを確認してください。

---

## 📁 ファイル存在確認

以下のファイルがすべて作成されていることを確認してください:

### 共通コンポーネント (3ファイル)
- [x] `app/components/common/IconComponent.tsx` が存在する
- [x] `app/components/common/ColorIndicator.tsx` が存在する
- [x] `app/components/common/index.ts` が存在する

### タスクコンポーネント (3ファイル)
- [x] `app/components/task/TaskItem.tsx` が存在する
- [x] `app/components/task/TaskList.tsx` が存在する
- [x] `app/components/task/index.ts` が存在する

### タブコンポーネント (3ファイル)
- [x] `app/components/tab/TabItem.tsx` が存在する
- [x] `app/components/tab/TabList.tsx` が存在する
- [x] `app/components/tab/index.ts` が存在する

### 画面 (2ファイル)
- [x] `app/screens/MainScreen.tsx` が存在する
- [x] `app/screens/index.ts` が存在する

### エントリーポイント
- [x] `app/index.tsx` または `app/_layout.tsx` が更新されている

**確認コマンド:**
```bash
ls -la app/components/common/
ls -la app/components/task/
ls -la app/components/tab/
ls -la app/screens/
```

**期待される結果:** 合計11ファイル

---

## 🎨 共通コンポーネントの確認

### `app/components/common/IconComponent.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `IconComponent` コンポーネントが定義されている
- [ ] `IconComponentProps` インターフェースが定義されている
- [ ] React と React Native がインポートされている
- [ ] `IconType` from '../../constants/app' がインポートされている

#### ICON_MAP
- [ ] `ICON_MAP` 定数が定義されている
- [ ] `Record<IconType, string>` 型である
- [ ] 20種類のアイコンが含まれている
  - circle, square, triangle, star, heart, bookmark, flag, bell, home, work,
    school, shopping, fitness, music, movie, game, book, food, travel, code

#### Props
- [ ] `icon: IconType` プロパティを受け取る
- [ ] `size?: number` プロパティを受け取る（デフォルト: 24）
- [ ] `color?: string` プロパティを受け取る（デフォルト: '#000000'）

#### 実装
- [ ] アイコンを Text で表示している
- [ ] fontSize と color がスタイルに適用されている

**確認コマンド:**
```bash
cat app/components/common/IconComponent.tsx | grep -E "(IconComponent|ICON_MAP)"
```

---

### `app/components/common/ColorIndicator.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `ColorIndicator` コンポーネントが定義されている
- [ ] `ColorIndicatorProps` インターフェースが定義されている
- [ ] React と React Native がインポートされている
- [ ] `ColorType` from '../../constants/app' がインポートされている

#### COLOR_MAP
- [ ] `COLOR_MAP` 定数が定義されている
- [ ] `Record<ColorType, string>` 型である
- [ ] 19色が含まれている
  - red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
    green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey
- [ ] 各色に対応するHexコードが定義されている

#### Props
- [ ] `color: ColorType` プロパティを受け取る
- [ ] `size?: number` プロパティを受け取る（デフォルト: 30）

#### 実装
- [ ] View で円形インジケーターを表示している
- [ ] width, height, borderRadius, backgroundColor がスタイルに適用されている
- [ ] borderRadius が size / 2 である（円形）

**確認コマンド:**
```bash
cat app/components/common/ColorIndicator.tsx | grep -E "(ColorIndicator|COLOR_MAP)"
```

---

### `app/components/common/index.ts`

- [ ] ファイルが存在する
- [ ] `IconComponent` のエクスポートが含まれている
- [ ] `ColorIndicator` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/components/common/index.ts
```

---

## 📋 タスクコンポーネントの確認

### `app/components/task/TaskItem.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `TaskItem` コンポーネントが定義されている
- [ ] `TaskItemProps` インターフェースが定義されている
- [ ] React と React Native がインポートされている
- [ ] `TaskState` from '../../types' がインポートされている

#### Props
- [ ] `task: TaskState` プロパティを受け取る
- [ ] `isEditing: boolean` プロパティを受け取る
- [ ] `onToggleDone: (taskId: number) => void` プロパティを受け取る
- [ ] `onStartEdit: (taskId: number) => void` プロパティを受け取る
- [ ] `onUpdateSubject: (taskId: number, subject: string) => void` プロパティを受け取る
- [ ] `onEndEdit: () => void` プロパティを受け取る
- [ ] `onDelete: (taskId: number) => void` プロパティを受け取る

#### 実装
- [ ] useState で localSubject を管理している
- [ ] チェックボックス（TouchableOpacity）が実装されている
  - [ ] done が true の場合 '☑' を表示
  - [ ] done が false の場合 '☐' を表示
  - [ ] onPress で onToggleDone を呼び出す
- [ ] 編集モードと表示モードの切り替えが実装されている
  - [ ] isEditing が true の場合 TextInput を表示
  - [ ] isEditing が false の場合 Text を表示
- [ ] TextInput の実装
  - [ ] value に localSubject を設定
  - [ ] onChangeText で handleSubjectChange を呼び出す
  - [ ] onSubmitEditing で handleSubmit を呼び出す
  - [ ] autoFocus が true
- [ ] Text の実装
  - [ ] TouchableOpacity でラップ
  - [ ] onPress で onStartEdit を呼び出す
  - [ ] task.done が true の場合、グレー + 取り消し線のスタイル
- [ ] 削除ボタン（TouchableOpacity）が実装されている
  - [ ] onPress で onDelete を呼び出す
- [ ] StyleSheet.create でスタイルが定義されている

**確認コマンド:**
```bash
cat app/components/task/TaskItem.tsx | grep -E "(TaskItem|useState|TouchableOpacity)"
```

---

### `app/components/task/TaskList.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `TaskList` コンポーネントが定義されている
- [ ] `TaskListProps` インターフェースが定義されている
- [ ] React と React Native がインポートされている
- [ ] `TaskState` from '../../types' がインポートされている
- [ ] `TaskItem` from './TaskItem' がインポートされている

#### Props
- [ ] `tasks: TaskState[]` プロパティを受け取る
- [ ] `activeEditId: number` プロパティを受け取る
- [ ] タスク操作のコールバック関数を受け取る

#### 実装
- [ ] tasks.length === 0 の場合、空の状態UIを表示
  - [ ] 「タスクがありません」などのメッセージ
- [ ] FlatList でタスクを表示
  - [ ] data に tasks を設定
  - [ ] keyExtractor で item.id.toString() を使用
  - [ ] renderItem で TaskItem を表示
  - [ ] isEditing を item.id === activeEditId で判定
- [ ] StyleSheet.create でスタイルが定義されている
  - [ ] backgroundColor: '#F2F2F2'
  - [ ] borderRadius: 10

**確認コマンド:**
```bash
cat app/components/task/TaskList.tsx | grep -E "(TaskList|FlatList)"
```

---

### `app/components/task/index.ts`

- [ ] ファイルが存在する
- [ ] `TaskItem` のエクスポートが含まれている
- [ ] `TaskList` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/components/task/index.ts
```

---

## 📑 タブコンポーネントの確認

### `app/components/tab/TabItem.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `TabItem` コンポーネントが定義されている
- [ ] `TabItemProps` インターフェースが定義されている
- [ ] React と React Native がインポートされている
- [ ] `TabState` from '../../types' がインポートされている
- [ ] `IconComponent`, `ColorIndicator` from '../common' がインポートされている

#### Props
- [ ] `tab: TabState` プロパティを受け取る
- [ ] `isActive: boolean` プロパティを受け取る
- [ ] `onPress: (tabId: number) => void` プロパティを受け取る

#### 実装
- [ ] TouchableOpacity でラップされている
  - [ ] onPress で onPress(tab.id) を呼び出す
- [ ] カラーインジケーターが表示されている
  - [ ] ColorIndicator コンポーネントを使用
  - [ ] color に tab.color を設定
- [ ] タブ名が表示されている
  - [ ] Text で tab.title を表示
  - [ ] numberOfLines={1} で1行に制限
- [ ] アイコンが表示されている
  - [ ] IconComponent を使用
  - [ ] icon に tab.icon を設定
- [ ] アクティブ状態のスタイルが適用されている
  - [ ] isActive が true の場合、backgroundColor が変わる
- [ ] StyleSheet.create でスタイルが定義されている
  - [ ] height: 70
  - [ ] borderTopRightRadius, borderBottomRightRadius: 5
  - [ ] アクティブ: backgroundColor: '#F2F2F2'
  - [ ] 非アクティブ: backgroundColor: '#BDBDBD'

**確認コマンド:**
```bash
cat app/components/tab/TabItem.tsx | grep -E "(TabItem|ColorIndicator|IconComponent)"
```

---

### `app/components/tab/TabList.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `TabList` コンポーネントが定義されている
- [ ] `TabListProps` インターフェースが定義されている
- [ ] React と React Native がインポートされている
- [ ] `TabState` from '../../types' がインポートされている
- [ ] `TabItem` from './TabItem' がインポートされている

#### Props
- [ ] `tabs: TabState[]` プロパティを受け取る
- [ ] `activeTabId: number` プロパティを受け取る
- [ ] `onTabPress: (tabId: number) => void` プロパティを受け取る

#### 実装
- [ ] FlatList でタブを表示
  - [ ] data に tabs を設定
  - [ ] keyExtractor で item.id.toString() を使用
  - [ ] renderItem で TabItem を表示
  - [ ] isActive を item.id === activeTabId で判定
- [ ] StyleSheet.create でスタイルが定義されている
  - [ ] width: '20%'
  - [ ] backgroundColor: '#E0E0E0'

**確認コマンド:**
```bash
cat app/components/tab/TabList.tsx | grep -E "(TabList|FlatList)"
```

---

### `app/components/tab/index.ts`

- [ ] ファイルが存在する
- [ ] `TabItem` のエクスポートが含まれている
- [ ] `TabList` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/components/tab/index.ts
```

---

## 🖥️ MainScreen の確認

### `app/screens/MainScreen.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `MainScreen` コンポーネントが定義されている
- [ ] React と React Native がインポートされている
- [ ] `TaskList` from '../components/task' がインポートされている
- [ ] `TabList` from '../components/tab' がインポートされている
- [ ] `useAppContext` from '../contexts' がインポートされている
- [ ] `DELETE_TAB_ID` from '../constants/app' がインポートされている

#### Context使用
- [ ] `useAppContext()` を呼び出している
- [ ] `taskList`, `tabList`, `appState` を取得している

#### 初期化処理（useEffect）
- [ ] 画面初期化の useEffect が実装されている
  - [ ] tabList.initializeDefaultTabs を呼び出している
  - [ ] tabList.fetchAllTabs を呼び出している
  - [ ] 最初のタブをアクティブにしている
  - [ ] taskList.fetchTasksByTabId を呼び出している
- [ ] タブ切り替えの useEffect が実装されている
  - [ ] activeTabId が変更されたときに taskList.fetchTasksByTabId を呼び出している

#### イベントハンドラー
- [ ] `handleAddTask` が実装されている
  - [ ] taskList.createTask を呼び出している
  - [ ] appState.setActiveEditId を呼び出している
- [ ] `handleEmptyTrash` が実装されている
  - [ ] taskList.deleteAllTasksInTrash を呼び出している
- [ ] `handleToggleDone` が実装されている
  - [ ] taskList.toggleTaskDone を呼び出している
- [ ] `handleStartEdit` が実装されている
  - [ ] appState.setActiveEditId を呼び出している
- [ ] `handleUpdateSubject` が実装されている
  - [ ] taskList.updateTaskSubject を呼び出している
- [ ] `handleEndEdit` が実装されている
  - [ ] appState.exitEditMode を呼び出している
- [ ] `handleDeleteTask` が実装されている
  - [ ] taskList.softDeleteTask を呼び出している
- [ ] `handleTabPress` が実装されている
  - [ ] appState.setActiveTabId を呼び出している

#### UI実装
- [ ] ローディング状態のUIが実装されている
  - [ ] ActivityIndicator を表示
- [ ] ヘッダーが実装されている
  - [ ] タイトルが表示されている
  - [ ] 設定ボタン（⚙）が表示されている
- [ ] メインコンテンツが実装されている
  - [ ] flexDirection: 'row' で横並び
  - [ ] TaskList と TabList を表示
  - [ ] TaskList の幅が80%相当（flex: 1）
  - [ ] TabList の幅が20%
- [ ] FABが実装されている
  - [ ] position: 'absolute', bottom: 20
  - [ ] DELETEタブの場合、ゴミ箱アイコン（🗑）
  - [ ] その他のタブの場合、追加アイコン（+）
  - [ ] onPress で handleEmptyTrash または handleAddTask を呼び出す

#### スタイル
- [ ] StyleSheet.create でスタイルが定義されている
- [ ] backgroundColor: '#E0E0E0'（アプリ背景）
- [ ] backgroundColor: '#F2F2F2'（タスクリスト背景）
- [ ] FABのスタイル（56x56、borderRadius: 28、backgroundColor: '#2196F3'）

**確認コマンド:**
```bash
cat app/screens/MainScreen.tsx | grep -E "(MainScreen|useEffect|handle)"
```

---

### `app/screens/index.ts`

- [ ] ファイルが存在する
- [ ] `MainScreen` のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/screens/index.ts
```

---

## 🚀 エントリーポイントの確認

### `app/index.tsx` または `app/_layout.tsx`

- [ ] ファイルが存在する
- [ ] `AppProvider` from './contexts' がインポートされている
- [ ] `MainScreen` from './screens' がインポートされている
- [ ] `AppProvider` でアプリ全体をラップしている
- [ ] `MainScreen` が表示されている

**確認コマンド:**
```bash
cat app/index.tsx | grep -E "(AppProvider|MainScreen)"
```

または

```bash
cat app/_layout.tsx | grep -E "(AppProvider|MainScreen)"
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

## 📊 ファイル数の確認

### コンポーネント数
- [x] 共通コンポーネント: 3ファイル（IconComponent, ColorIndicator, index）
- [x] タスクコンポーネント: 3ファイル（TaskItem, TaskList, index）
- [x] タブコンポーネント: 3ファイル（TabItem, TabList, index）
- [x] 画面: 2ファイル（MainScreen, index）

**合計: 11ファイル**

**確認コマンド:**
```bash
find app/components app/screens -name "*.tsx" -o -name "*.ts" | wc -l
```

**期待される結果:** 11

---

## 🎯 機能別チェック

### コンポーネント階層
- [ ] App → AppProvider → MainScreen
- [ ] MainScreen → TaskList → TaskItem
- [ ] MainScreen → TabList → TabItem
- [ ] TaskItem, TabItem → IconComponent, ColorIndicator

### タスク機能
- [ ] タスク一覧表示
- [ ] タスク追加（FAB）
- [ ] タスク編集（タップで編集モード）
- [ ] タスク件名更新（リアルタイム）
- [ ] タスク完了トグル（チェックボックス）
- [ ] タスク削除（削除ボタン → DELETEタブに移動）
- [ ] 編集モード終了（Enter or タブ切り替え）

### タブ機能
- [ ] タブ一覧表示
- [ ] タブ選択（タップ）
- [ ] アクティブタブのハイライト表示
- [ ] タブ切り替え時のタスク再取得

### DELETEタブ機能
- [ ] DELETEタブでFABがゴミ箱アイコンに変わる
- [ ] ゴミ箱を空にする機能

### 初期化
- [ ] デフォルトタブの自動作成
- [ ] 最初のタブの自動選択
- [ ] 初回タスク取得

---

## 🔍 UI/UXチェック

### レイアウト
- [ ] ヘッダーが表示されている（高さ60）
- [ ] タスクリストとタブリストが横並びで表示されている
- [ ] タスクリストが左側（80%相当）
- [ ] タブリストが右側（20%）
- [ ] FABが画面下部中央に配置されている

### スタイル
- [ ] アプリ背景色: #E0E0E0
- [ ] タスクリスト背景色: #F2F2F2
- [ ] タブリスト背景色: #E0E0E0
- [ ] アクティブタブ背景色: #F2F2F2
- [ ] 非アクティブタブ背景色: #BDBDBD
- [ ] FAB背景色: #2196F3

### タスクアイテム
- [ ] チェックボックスが表示されている
- [ ] 完了タスクがグレー + 取り消し線で表示されている
- [ ] 編集モードで TextInput が表示されている
- [ ] 削除ボタンが表示されている

### タブアイテム
- [ ] カラーインジケーターが表示されている
- [ ] タブ名が表示されている
- [ ] アイコンが表示されている
- [ ] 高さが70である
- [ ] 右側の角が丸い（borderTopRightRadius, borderBottomRightRadius）

---

## ✅ 完了条件

以下のすべてが満たされている場合、ステップ4は完了です:

- [x] すべてのファイルが作成されている（11ファイル）
- [x] すべてのコンポーネントが実装されている
- [x] MainScreen がすべての機能を統合している
- [x] AppProvider でグローバル状態を提供している
- [x] TypeScriptのコンパイルエラーがない
- [ ] アプリが起動する
- [ ] タスクの基本操作（追加、編集、完了、削除）ができる
- [ ] タブの基本操作（選択、切り替え）ができる
- [ ] DELETEタブでゴミ箱を空にできる
- [ ] UIが仕様に沿っている

---


## 🔍 トラブルシューティング

### チェックリストで問題が見つかった場合

1. **ファイルが存在しない**
  - 実装指示スクリプトを再確認し、該当ファイルを作成してください

2. **コンポーネントが表示されない**
  - インポートパスが正しいか確認してください
  - エクスポートが正しく設定されているか確認してください

3. **TypeScriptエラーが発生する**
  - 型定義が正しいか確認してください
  - Props の型が一致しているか確認してください

4. **アプリが起動しない**
  - Metro Bundler をリセットしてください（`npx react-native start --reset-cache`）
  - ネイティブモジュールをリビルドしてください

5. **Context が undefined になる**
  - AppProvider でアプリ全体をラップしているか確認してください

6. **タスクが表示されない**
  - 初期化処理が正しく実行されているか確認してください
  - fetchTasksByTabId が呼ばれているか確認してください
  - activeTabId が正しく設定されているか確認してください

7. **スタイルが適用されない**
  - StyleSheet.create を使用しているか確認してください
  - スタイル名が正しいか確認してください

---

## 🧪 実機動作確認

以下を実際にアプリで確認してください:

### 起動確認
- [ ] アプリが正常に起動する
- [ ] ローディング画面が表示される（初回のみ）
- [ ] メイン画面が表示される

### タブ確認
- [ ] 「todo」タブと「Delete」タブが表示される
- [ ] 「todo」タブがアクティブ状態で表示される
- [ ] タブをタップすると選択できる
- [ ] アクティブタブの背景色が変わる

### タスク確認
- [ ] FABをタップするとタスクが追加される
- [ ] 追加したタスクが編集モードで表示される
- [ ] タスク名を入力できる
- [ ] Enterキーで編集モードが終了する
- [ ] タスクをタップすると再度編集モードになる
- [ ] チェックボックスをタップすると完了/未完了が切り替わる
- [ ] 完了タスクがグレー + 取り消し線で表示される
- [ ] 削除ボタンをタップするとDELETEタブに移動する

### DELETEタブ確認
- [ ] DELETEタブを選択すると削除したタスクが表示される
- [ ] FABがゴミ箱アイコンに変わる
- [ ] FABをタップするとすべてのタスクが削除される

---

**チェックリスト作成日:** 2025-11-22
**対象ステップ:** ステップ4 - メイン画面のUI & コア機能(タスクとタブの基本操作)の実装