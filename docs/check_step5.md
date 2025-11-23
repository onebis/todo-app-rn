# ステップ5: デザイン適用 - 最終チェックリスト

このチェックリストを使用して、ステップ5の実装が完了していることを確認してください。

---

## 📦 パッケージインストール確認

### NativeWindのインストール

- [x] `nativewind` がインストールされている
- [x] `tailwindcss` (devDependencies) がインストールされている

**確認コマンド:**
```bash
npm list nativewind
npm list tailwindcss
```

または

```bash
cat package.json | grep -E "(nativewind|tailwindcss)"
```

---

## 📁 設定ファイルの確認

### `tailwind.config.js`

- [x] ファイルが存在する（プロジェクトルート）
- [x] content に './app/**/*.{js,jsx,ts,tsx}' が含まれている
- [x] content に './components/**/*.{js,jsx,ts,tsx}' が含まれている
- [x] theme.extend が定義されている
- [x] カスタムカラーが定義されている
  - [x] app-background: '#E0E0E0'
  - [x] main-list-bg: '#F2F2F2'
  - [x] active-tab: '#F2F2F2'
  - [x] inactive-tab: '#BDBDBD'
  - [x] border-bottom: '#E0E0E0'
  - [x] close-button: '#616161'
  - [x] task-done: '#757575'
  - [x] disabled: '#BDBDBD'
  - [x] will-accept: 'rgba(242, 242, 242, 0.76)'
- [x] カスタムスペーシングが定義されている
  - [x] xs: '5px'
  - [x] sm: '10px'
  - [x] md: '20px'
  - [x] lg: '30px'
  - [x] xl: '40px'
- [x] カスタムborderRadiusが定義されている
  - [x] main: '24px'
  - [x] task-list: '10px'
  - [x] tab: '5px'
  - [x] modal: '20px'
- [x] カスタムfontSizeが定義されている
  - [x] body-large: '16px'
  - [x] body-medium: '14px'
  - [x] button: '14px'
- [x] fontWeightにmedium: '500'が定義されている

**確認コマンド:**
```bash
cat tailwind.config.js
```

---

### `babel.config.js`

- [x] ファイルが存在する
- [x] plugins に 'nativewind/babel' が含まれている

**確認コマンド:**
```bash
cat babel.config.js | grep nativewind
```

**期待される内容:**
```javascript
plugins: ['nativewind/babel']
```

---

### `app/types/nativewind.d.ts`

- [x] ファイルが存在する
- [x] `/// <reference types="nativewind/types" />` が含まれている

**確認コマンド:**
```bash
cat app/types/nativewind.d.ts
```

---

## 🎨 テーマ定数ファイルの確認

### `app/constants/theme.ts`

- [x] ファイルが存在する
- [x] COLORS 定数が定義されている
  - [x] backgroundColor: '#E0E0E0'
  - [x] mainListBackgroundColor: '#F2F2F2'
  - [x] activeTabColor: '#F2F2F2'
  - [x] inactiveTabColor: '#BDBDBD'
  - [x] borderBottomColor: '#E0E0E0'
  - [x] willAcceptColor: 'rgba(242, 242, 242, 0.76)'
  - [x] closeButtonColor: '#616161'
  - [x] textNormal: '#000000'
  - [x] textDone: '#757575'
  - [x] textDisabled: '#BDBDBD'
  - [x] primary: '#2196F3'
  - [x] delete: '#F44336'
  - [x] success: '#4CAF50'
  - [x] warning: '#FFC107'
  - [x] loading: '#9C27B0'
  - [x] white: '#FFFFFF'
- [x] SPACING 定数が定義されている
  - [x] xs: 5, sm: 10, md: 20, lg: 30, xl: 40
- [x] BORDER_RADIUS 定数が定義されている
  - [x] main: 24, taskList: 10, tab: 5, modal: 20, fab: 28
- [x] FONT_SIZE 定数が定義されている
  - [x] bodyLarge: 16, bodyMedium: 14, button: 14, title: 20
  - [x] icon.small: 24, icon.medium: 30, icon.large: 50
- [x] FONT_WEIGHT 定数が定義されている
  - [x] normal: '400', medium: '500', bold: '700'
- [x] SHADOW 定数が定義されている
  - [x] standard, dragHover, fab
- [x] SIZES 定数が定義されている
  - [x] header: 60, tabItem: 70, fab: 56, checkbox: 30, touchTarget: 48
- [x] LAYOUT 定数が定義されている
  - [x] taskListWidth: 0.8, tabListWidth: 0.2

**確認コマンド:**
```bash
cat app/constants/theme.ts | grep -E "(COLORS|SPACING|BORDER_RADIUS|FONT_SIZE)"
```

---

### `app/constants/index.ts`

- [x] ファイルが存在する
- [x] `export * from './theme'` が含まれている

**確認コマンド:**
```bash
cat app/constants/index.ts | grep theme
```

---

## 🎨 共通コンポーネントのデザイン適用確認

### `app/components/common/IconComponent.tsx`

- [x] ファイルが存在する
- [x] className プロパティが Props に追加されている
- [x] className がデフォルト値 '' で定義されている
- [x] Text コンポーネントに className が適用されている
- [x] StyleSheet が削除されている（または最小限）

**確認コマンド:**
```bash
cat app/components/common/IconComponent.tsx | grep className
```

---

### `app/components/common/ColorIndicator.tsx`

- [x] ファイルが存在する
- [x] className プロパティが Props に追加されている
- [x] className がデフォルト値 '' で定義されている
- [x] View コンポーネントに className が適用されている
- [x] `rounded-full` クラスが使用されている
- [x] StyleSheet が削除されている（または最小限）

**確認コマンド:**
```bash
cat app/components/common/ColorIndicator.tsx | grep -E "(className|rounded-full)"
```

---

## 📋 タスクコンポーネントのデザイン適用確認

### `app/components/task/TaskItem.tsx`

- [x] ファイルが存在する
- [x] StyleSheet.create が削除されている
- [x] すべてのスタイルが className に置き換えられている
- [x] TailwindCSSのユーティリティクラスが使用されている
  - [x] flex-row, items-center
  - [x] p-sm (padding)
  - [x] mr-sm, ml-sm (margin)
  - [x] bg-white (背景色)
  - [x] border-b, border-border-bottom (ボーダー)
  - [x] text-body-large (フォントサイズ)
  - [x] text-black, text-task-done (テキストカラー)
  - [x] line-through (完了タスクの取り消し線)
- [x] 条件付きスタイリングが実装されている
  - [x] task.done による text-task-done と line-through の切り替え
- [x] カスタムカラーが使用されている
  - [x] bg-white, border-border-bottom, text-task-done

**確認コマンド:**
```bash
cat app/components/task/TaskItem.tsx | grep -E "(className|StyleSheet)"
```

**期待される結果:** className が複数存在、StyleSheet が存在しない

---

### `app/components/task/TaskList.tsx`

- [x] ファイルが存在する
- [x] StyleSheet.create が削除されている
- [x] すべてのスタイルが className に置き換えられている
- [x] TailwindCSSのユーティリティクラスが使用されている
  - [x] flex-1
  - [x] justify-center, items-center
  - [x] bg-main-list-bg (背景色)
  - [x] rounded-task-list (border radius)
  - [x] text-body-large, text-disabled
- [x] カスタムカラーが使用されている
  - [x] bg-main-list-bg, text-disabled
- [x] カスタムborderRadiusが使用されている
  - [x] rounded-task-list

**確認コマンド:**
```bash
cat app/components/task/TaskList.tsx | grep -E "(className|bg-main-list-bg|rounded-task-list)"
```

---

## 📑 タブコンポーネントのデザイン適用確認

### `app/components/tab/TabItem.tsx`

- [x] ファイルが存在する
- [x] StyleSheet.create が削除されている
- [x] すべてのスタイルが className に置き換えられている
- [x] TailwindCSSのユーティリティクラスが使用されている
  - [x] h-[70px] (高さ)
  - [x] py-sm, px-4 (padding)
  - [x] mb-sm (margin)
  - [x] justify-center
  - [x] rounded-r-tab (border radius)
  - [x] flex-row, items-center, gap-2
  - [x] flex-1
  - [x] text-body-medium, font-medium, text-black
- [x] 条件付きスタイリングが実装されている
  - [x] isActive による bg-active-tab と bg-inactive-tab の切り替え
- [x] カスタムカラーが使用されている
  - [x] bg-active-tab, bg-inactive-tab
- [x] カスタムスペーシングが使用されている
  - [x] py-sm, mb-sm
- [x] カスタムborderRadiusが使用されている
  - [x] rounded-r-tab

**確認コマンド:**
```bash
cat app/components/tab/TabItem.tsx | grep -E "(className|bg-active-tab|bg-inactive-tab)"
```

---

### `app/components/tab/TabList.tsx`

- [x] ファイルが存在する
- [x] StyleSheet.create が削除されている
- [x] すべてのスタイルが className に置き換えられている
- [x] TailwindCSSのユーティリティクラスが使用されている
  - [x] w-[20%] (幅)
  - [x] bg-app-background (背景色)
- [x] カスタムカラーが使用されている
  - [x] bg-app-background

**確認コマンド:**
```bash
cat app/components/tab/TabList.tsx | grep -E "(className|w-\[20%\]|bg-app-background)"
```

---

## 🖥️ メイン画面のデザイン適用確認

### `app/screens/MainScreen.tsx`

- [x] ファイルが存在する
- [x] StyleSheet.create が削除されている
- [x] すべてのスタイルが className に置き換えられている
- [x] TailwindCSSのユーティリティクラスが使用されている
  - [x] flex-1
  - [x] bg-app-background
  - [x] justify-center, items-center
  - [x] h-[60px] (ヘッダー高さ)
  - [x] flex-row, justify-between
  - [x] px-md (padding)
  - [x] bg-white (ヘッダー背景)
  - [x] text-xl, font-bold, text-black
  - [x] p-sm (メインコンテンツpadding)
  - [x] mr-sm (margin)
  - [x] absolute, bottom-5, left-1/2, -ml-7
  - [x] w-14, h-14, rounded-full
  - [x] bg-blue-500
  - [x] shadow-lg
  - [x] text-3xl, text-white
- [x] カスタムカラーが使用されている
  - [x] bg-app-background, bg-white, bg-blue-500
- [x] カスタムスペーシングが使用されている
  - [x] px-md, p-sm, mr-sm
- [x] FABのシャドウが style プロパティで実装されている
  - [x] shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation

**確認コマンド:**
```bash
cat app/screens/MainScreen.tsx | grep -E "(className|bg-app-background)"
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

### キャッシュクリア確認

- [ ] Metro Bundler のキャッシュがクリアされている

**確認コマンド:**
```bash
npx react-native start --reset-cache
```

---

## 🎨 デザイン視覚確認

以下を実際にアプリで確認してください:

### カラーパレット
- [ ] アプリ背景色が #E0E0E0 である
- [ ] タスクリスト背景色が #F2F2F2 である
- [ ] アクティブタブ背景色が #F2F2F2 である
- [ ] 非アクティブタブ背景色が #BDBDBD である
- [ ] ヘッダー背景色が白である
- [ ] FAB背景色が青（#2196F3相当）である
- [ ] 完了タスクのテキストがグレー（#757575）である

### タイポグラフィ
- [ ] タスクテキストのサイズが16pxである
- [ ] タブタイトルのサイズが14pxである
- [ ] ヘッダータイトルのサイズが20pxである
- [ ] タブタイトルのフォントウェイトがmedium（500）である
- [ ] ヘッダータイトルのフォントウェイトがboldである
- [ ] 完了タスクに取り消し線が表示される

### スペーシング
- [ ] ヘッダーのpaddingが適切である（px-md = 20px）
- [ ] タスクアイテムのpaddingが適切である（p-sm = 10px）
- [ ] タブアイテムのpaddingが適切である（py-sm, px-4）
- [ ] メインコンテンツのpaddingが適切である（p-sm = 10px）
- [ ] タスクリストとタブリストの間隔が適切である（mr-sm = 10px）

### Border Radius
- [ ] タスクリストの角が丸い（10px）
- [ ] タブアイテムの右側の角が丸い（5px）
- [ ] FABが完全な円形である（rounded-full）

### シャドウ
- [ ] FABにシャドウが表示される
- [ ] シャドウが適切な強さである

### レイアウト
- [ ] タスクリストが左側80%を占める
- [ ] タブリストが右側20%を占める
- [ ] ヘッダーの高さが60pxである
- [ ] タブアイテムの高さが70pxである
- [ ] FABのサイズが56x56である

---

## 📊 ファイル更新確認

### 新規作成ファイル (3ファイル)
- [x] `tailwind.config.js`（プロジェクトルート）
- [x] `app/types/nativewind.d.ts`
- [x] `app/constants/theme.ts`

### 更新ファイル (8ファイル)
- [x] `babel.config.js`
- [x] `app/constants/index.ts`
- [x] `app/components/common/IconComponent.tsx`
- [x] `app/components/common/ColorIndicator.tsx`
- [x] `app/components/task/TaskItem.tsx`
- [x] `app/components/task/TaskList.tsx`
- [x] `app/components/tab/TabItem.tsx`
- [x] `app/components/tab/TabList.tsx`
- [x] `app/screens/MainScreen.tsx`

**確認コマンド:**
```bash
find . -name "tailwind.config.js" -o -path "./app/types/nativewind.d.ts" -o -path "./app/constants/theme.ts"
```

---

## ✅ 完了条件

以下のすべてが満たされている場合、ステップ5は完了です:

- [x] NativeWindがインストールされている
- [x] tailwind.config.js が正しく設定されている
- [x] babel.config.js が更新されている
- [x] nativewind の型定義が追加されている
- [x] theme.ts が作成され、すべての定数が定義されている
- [x] すべてのコンポーネントでTailwindCSSが使用されている
- [x] StyleSheet.create が削除されている（またはほぼ削除）
- [x] カスタムカラー、スペーシング、borderRadiusが使用されている
- [x] TypeScriptのコンパイルエラーがない
- [ ] アプリが正常に起動する
- [ ] デザインが仕様通りに表示される


---

## 🔍 トラブルシューティング

### チェックリストで問題が見つかった場合

1. **TailwindCSSのクラスが適用されない**
  - キャッシュをクリアしてください（`npx react-native start --reset-cache`）
  - `tailwind.config.js` の content パスを確認してください
  - `babel.config.js` に nativewind/babel が追加されているか確認してください
  - アプリを再ビルドしてください

2. **カスタムクラスが認識されない**
  - `tailwind.config.js` の theme.extend を確認してください
  - クラス名のスペルを確認してください
  - ハイフン（-）の使用が正しいか確認してください

3. **TypeScriptエラーが発生する**
  - `app/types/nativewind.d.ts` が作成されているか確認してください
  - nativewind パッケージがインストールされているか確認してください

4. **スタイルが期待通りに表示されない**
  - className と style の優先順位を確認してください
  - style プロパティが className を上書きしていないか確認してください
  - プラットフォーム固有の制限（iOS/Android）を確認してください

5. **ビルドエラーが発生する**
  - node_modules を削除して再インストールしてください
  - Podfile.lock を削除して `pod install` を実行してください（iOS）
  - Gradle キャッシュをクリアしてください（Android）

---

## 🧪 実機動作確認

以下を実際にアプリで確認してください:

### 起動確認
- [ ] アプリが正常に起動する
- [ ] クラッシュしない
- [ ] エラーメッセージが表示されない

### ビジュアル確認
- [ ] 全体的なデザインが統一されている
- [ ] カラーパレットが仕様通りである
- [ ] フォントサイズが適切である
- [ ] スペーシングが一貫している
- [ ] Border Radius が適用されている
- [ ] シャドウが表示されている

### インタラクション確認
- [ ] タッチ操作が正常に動作する
- [ ] スクロールが滑らかである
- [ ] アニメーションが自然である（該当する場合）

### レスポンシブ確認
- [ ] 画面サイズに応じて適切にレイアウトされる
- [ ] SafeAreaView が正しく機能している
- [ ] ノッチがある端末で正しく表示される

---

## 📐 デザイン仕様との照合

### カラーパレット照合表

| 要素 | 仕様 | 実装 | 確認 |
|------|------|------|------|
| アプリ背景 | #E0E0E0 | bg-app-background | [ ] |
| タスクリスト背景 | #F2F2F2 | bg-main-list-bg | [ ] |
| アクティブタブ | #F2F2F2 | bg-active-tab | [ ] |
| 非アクティブタブ | #BDBDBD | bg-inactive-tab | [ ] |
| ボーダー | #E0E0E0 | border-border-bottom | [ ] |
| 完了タスクテキスト | #757575 | text-task-done | [ ] |

### スペーシング照合表

| 要素 | 仕様 | 実装 | 確認 |
|------|------|------|------|
| 小さなギャップ | 5px | xs | [ ] |
| 標準アイテム間隔 | 10px | sm | [ ] |
| セクション間隔 | 20px | md | [ ] |
| コンテナマージン | 30px | lg | [ ] |
| フォームパディング | 40px | xl | [ ] |

### Border Radius照合表

| 要素 | 仕様 | 実装 | 確認 |
|------|------|------|------|
| メインコンテナ | 24px | main | [ ] |
| タスクリスト | 10px | task-list | [ ] |
| タブアイテム | 5px | tab | [ ] |
| モーダル | 20px | modal | [ ] |

---

**チェックリスト作成日:** 2025-11-22
**対象ステップ:** ステップ5 - デザイン適用