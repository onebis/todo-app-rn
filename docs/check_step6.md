# ステップ6: タブ編集・高度なインタラクション機能 - 最終チェックリスト

このチェックリストを使用して、ステップ6の実装が完了していることを確認してください。

---


## 📁 ファイル存在確認

以下のファイルがすべて作成されていることを確認してください:

### 新規共通コンポーネント (3ファイル)
- [x] `app/components/common/Modal.tsx` が存在する
- [x] `app/components/common/ColorPickerModal.tsx` が存在する
- [x] `app/components/common/IconPickerModal.tsx` が存在する

### 新規画面 (2ファイル)
- [x] `app/screens/EditTabScreen.tsx` が存在する
- [x] `app/screens/TabListScreen.tsx` が存在する

### 更新ファイル
- [x] `app/components/common/index.ts` が更新されている
- [x] `app/screens/index.ts` が更新されている
- [x] `app/screens/MainScreen.tsx` が更新されている
- [x] `app/(tabs)/index.tsx` が更新されている

**確認コマンド:**
```bash
ls -la app/components/common/Modal.tsx
ls -la app/components/common/ColorPickerModal.tsx
ls -la app/components/common/IconPickerModal.tsx
ls -la app/screens/EditTabScreen.tsx
ls -la app/screens/TabListScreen.tsx
```

**期待される結果:** すべてのファイルが存在する

---

## 🎨 Modalコンポーネントの確認

### `app/components/common/Modal.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `Modal` コンポーネントが定義されている
- [ ] `ModalProps` インターフェースが定義されている
- [ ] React Native の Modal がインポートされている

#### Props
- [ ] `visible: boolean` プロパティを受け取る
- [ ] `onClose: () => void` プロパティを受け取る
- [ ] `children: React.ReactNode` プロパティを受け取る
- [ ] `title?: string` プロパティを受け取る（オプション）

#### 実装
- [ ] React Native Modal を使用している
- [ ] transparent プロパティが true である
- [ ] animationType が "slide" である
- [ ] onRequestClose が onClose を呼び出す
- [ ] 背景（Pressable）をタップすると onClose が呼ばれる
- [ ] コンテンツエリアのタップで背景タップが伝播しない（stopPropagation）
- [ ] ヘッダーに閉じるボタン（✕）がある
- [ ] title が表示される
- [ ] children が表示される
- [ ] TailwindCSSが使用されている
  - [ ] bg-black/50（半透明背景）
  - [ ] bg-white, rounded-t-modal
  - [ ] p-lg

**確認コマンド:**
```bash
cat app/components/common/Modal.tsx | grep -E "(Modal|transparent|animationType)"
```

---

## 🎨 ColorPickerModalの確認

### `app/components/common/ColorPickerModal.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `ColorPickerModal` コンポーネントが定義されている
- [ ] `ColorPickerModalProps` インターフェースが定義されている
- [ ] Modal コンポーネントがインポートされている
- [ ] ColorIndicator がインポートされている
- [ ] COLOR_LIST がインポートされている

#### Props
- [ ] `visible: boolean` プロパティを受け取る
- [ ] `onClose: () => void` プロパティを受け取る
- [ ] `onSelectColor: (color: ColorType) => void` プロパティを受け取る
- [ ] `selectedColor: ColorType` プロパティを受け取る

#### 実装
- [ ] Modal コンポーネントを使用している
- [ ] title が "カラーを選択" である
- [ ] FlatList でカラーを表示している
- [ ] numColumns が 6 である
- [ ] COLOR_LIST を data として使用している
- [ ] ColorIndicator でカラーを表示している
- [ ] 選択中のカラーがハイライトされている（bg-gray-200）
- [ ] カラー選択時に handleSelectColor が呼ばれる
- [ ] handleSelectColor で onSelectColor と onClose が呼ばれる

**確認コマンド:**
```bash
cat app/components/common/ColorPickerModal.tsx | grep -E "(ColorPickerModal|numColumns|COLOR_LIST)"
```

---

## 🎨 IconPickerModalの確認

### `app/components/common/IconPickerModal.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `IconPickerModal` コンポーネントが定義されている
- [ ] `IconPickerModalProps` インターフェースが定義されている
- [ ] Modal コンポーネントがインポートされている
- [ ] IconComponent がインポートされている
- [ ] ICON_LIST がインポートされている

#### Props
- [ ] `visible: boolean` プロパティを受け取る
- [ ] `onClose: () => void` プロパティを受け取る
- [ ] `onSelectIcon: (icon: IconType) => void` プロパティを受け取る
- [ ] `selectedIcon: IconType` プロパティを受け取る

#### 実装
- [ ] Modal コンポーネントを使用している
- [ ] title が "アイコンを選択" である
- [ ] FlatList でアイコンを表示している
- [ ] numColumns が 6 である
- [ ] ICON_LIST を data として使用している
- [ ] IconComponent でアイコンを表示している
- [ ] 選択中のアイコンがハイライトされている（bg-gray-200）
- [ ] アイコン選択時に handleSelectIcon が呼ばれる
- [ ] handleSelectIcon で onSelectIcon と onClose が呼ばれる

**確認コマンド:**
```bash
cat app/components/common/IconPickerModal.tsx | grep -E "(IconPickerModal|numColumns|ICON_LIST)"
```

---

## 📦 共通コンポーネントエクスポートの確認

### `app/components/common/index.ts`

- [ ] ファイルが存在する
- [ ] IconComponent のエクスポートが含まれている
- [ ] ColorIndicator のエクスポートが含まれている
- [ ] Modal のエクスポートが含まれている
- [ ] ColorPickerModal のエクスポートが含まれている
- [ ] IconPickerModal のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/components/common/index.ts
```

**期待される内容:** 5つのエクスポート文

---

## 🖥️ EditTabScreenの確認

### `app/screens/EditTabScreen.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `EditTabScreen` コンポーネントが定義されている
- [ ] `EditTabScreenProps` インターフェースが定義されている
- [ ] useAppContext がインポートされている
- [ ] ColorIndicator, IconComponent, ColorPickerModal, IconPickerModal がインポートされている

#### Props
- [ ] `mode: 'create' | 'edit'` プロパティを受け取る
- [ ] `tabId?: number` プロパティを受け取る（オプション）
- [ ] `onClose: () => void` プロパティを受け取る

#### State管理
- [ ] useState で showColorPicker を管理している
- [ ] useState で showIconPicker を管理している
- [ ] editTabState を useAppContext から取得している
- [ ] tabList を useAppContext から取得している

#### 初期化（useEffect）
- [ ] mode が 'create' の場合、initializeForCreate を呼び出している
- [ ] mode が 'edit' の場合、initializeForEdit を呼び出している
- [ ] tabId からタブ情報を取得している

#### 保存処理（handleSave）
- [ ] タブ名のバリデーションを実装している（空チェック）
- [ ] mode が 'create' の場合、createTab を呼び出している
- [ ] mode が 'edit' の場合、updateTab を呼び出している
- [ ] 保存後、reset を呼び出している
- [ ] 保存後、onClose を呼び出している
- [ ] エラーハンドリングが実装されている（Alert.alert）

#### UI実装
- [ ] ヘッダーが実装されている
  - [ ] 閉じるボタン（✕）
  - [ ] タイトル（"タブを作成" または "タブを編集"）
- [ ] タブ名入力フィールドが実装されている
  - [ ] TextInput
  - [ ] maxLength={8}
  - [ ] autoFocus
  - [ ] 文字数カウンター（x/8）
- [ ] カラー選択ボタンが実装されている
  - [ ] ColorIndicator を表示
  - [ ] タップで showColorPicker を true に設定
- [ ] アイコン選択ボタンが実装されている
  - [ ] IconComponent を表示
  - [ ] タップで showIconPicker を true に設定
- [ ] 保存ボタンが実装されている
  - [ ] ラベルが mode に応じて変わる（"新規作成" / "確定"）
  - [ ] タップで handleSave を呼び出す
- [ ] ColorPickerModal が実装されている
- [ ] IconPickerModal が実装されている
- [ ] TailwindCSSが使用されている

**確認コマンド:**
```bash
cat app/screens/EditTabScreen.tsx | grep -E "(EditTabScreen|handleSave|maxLength)"
```

---

## 📑 TabListScreenの確認

### `app/screens/TabListScreen.tsx`

#### 基本構造
- [ ] ファイルが存在する
- [ ] `TabListScreen` コンポーネントが定義されている
- [ ] `TabListScreenProps` インターフェースが定義されている
- [ ] useAppContext がインポートされている
- [ ] ColorIndicator, IconComponent がインポートされている
- [ ] DELETE_TAB_ID がインポートされている

#### Props
- [ ] `onClose: () => void` プロパティを受け取る
- [ ] `onEditTab: (tabId: number) => void` プロパティを受け取る
- [ ] `onCreateTab: () => void` プロパティを受け取る

#### State管理
- [ ] tabList を useAppContext から取得している
- [ ] appState を useAppContext から取得している

#### タブ削除処理（handleDeleteTab）
- [ ] DELETE_TAB_ID のチェックが実装されている
- [ ] 削除確認ダイアログ（Alert.alert）が実装されている
- [ ] 確認メッセージが適切である
- [ ] キャンセルボタンがある
- [ ] 削除ボタンがある（destructive スタイル）
- [ ] tabList.deleteTab を呼び出している
- [ ] コールバックで appState.setActiveTabId を呼び出している

#### UI実装
- [ ] ヘッダーが実装されている
  - [ ] 閉じるボタン（✕）
  - [ ] タイトル（"タブ一覧"）
- [ ] FlatList でタブリストを表示している
  - [ ] data に tabList.state.tabList を設定
  - [ ] keyExtractor が実装されている
- [ ] タブアイテムが実装されている
  - [ ] 削除ボタン（DELETEタブ以外）
  - [ ] ColorIndicator
  - [ ] タブタイトル
  - [ ] IconComponent
  - [ ] 編集ボタン
  - [ ] ドラッグハンドル（≡）
- [ ] FABが実装されている
  - [ ] タップで onCreateTab を呼び出す
- [ ] TailwindCSSが使用されている

**確認コマンド:**
```bash
cat app/screens/TabListScreen.tsx | grep -E "(TabListScreen|handleDeleteTab|DELETE_TAB_ID)"
```

---

## 📦 画面エクスポートの確認

### `app/screens/index.ts`

- [ ] ファイルが存在する
- [ ] MainScreen のエクスポートが含まれている
- [ ] EditTabScreen のエクスポートが含まれている
- [ ] TabListScreen のエクスポートが含まれている

**確認コマンド:**
```bash
cat app/screens/index.ts
```

**期待される内容:** 3つのエクスポート文

---

## 🔄 ナビゲーション機能の確認

### `app/index.tsx` または `app/_layout.tsx`

#### State管理
- [ ] useState で currentScreen を管理している
- [ ] Screen 型が定義されている（'main' | 'tabList' | 'createTab' | 'editTab'）
- [ ] useState で editingTabId を管理している

#### ナビゲーション関数
- [ ] navigateToTabList が定義されている
- [ ] navigateToCreateTab が定義されている
- [ ] navigateToEditTab が定義されている（tabId を受け取る）
- [ ] navigateToMain が定義されている

#### 条件付きレンダリング
- [ ] currentScreen が 'main' の場合、MainScreen を表示
- [ ] currentScreen が 'tabList' の場合、TabListScreen を表示
- [ ] currentScreen が 'createTab' の場合、EditTabScreen（mode='create'）を表示
- [ ] currentScreen が 'editTab' の場合、EditTabScreen（mode='edit'）を表示
- [ ] 各画面に適切な props が渡されている

**確認コマンド:**
```bash
cat app/index.tsx | grep -E "(currentScreen|navigate)"
```

または

```bash
cat app/_layout.tsx | grep -E "(currentScreen|navigate)"
```

---

### `app/screens/MainScreen.tsx`の更新確認

#### Props追加
- [ ] MainScreenProps インターフェースが定義されている
- [ ] onNavigateToTabList プロパティが追加されている

#### 設定ボタン
- [ ] 設定ボタン（⚙）に onPress が設定されている
- [ ] onPress で onNavigateToTabList が呼ばれる

**確認コマンド:**
```bash
cat app/screens/MainScreen.tsx | grep -E "(MainScreenProps|onNavigateToTabList)"
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

### 新規ファイル (5ファイル)
- [x] Modal.tsx
- [x] ColorPickerModal.tsx
- [x] IconPickerModal.tsx
- [x] EditTabScreen.tsx
- [x] TabListScreen.tsx

### 更新ファイル (4ファイル)
- [x] app/components/common/index.ts
- [x] app/screens/index.ts
- [x] app/screens/MainScreen.tsx
- [x] app/(tabs)/index.tsx

**確認コマンド:**
```bash
find app/components/common app/screens -name "*.tsx" | grep -E "(Modal|EditTab|TabList)" | wc -l
```

**期待される結果:** 5

---

## 🎯 機能別チェック

### モーダル機能
- [ ] カラー選択モーダルが開く
- [ ] カラーが6列グリッドで表示される
- [ ] カラーを選択できる
- [ ] 選択したカラーがハイライトされる
- [ ] カラー選択後、モーダルが閉じる
- [ ] アイコン選択モーダルが開く
- [ ] アイコンが6列グリッドで表示される
- [ ] アイコンを選択できる
- [ ] 選択したアイコンがハイライトされる
- [ ] アイコン選択後、モーダルが閉じる
- [ ] 背景タップでモーダルが閉じる
- [ ] 閉じるボタンでモーダルが閉じる

### タブ作成機能
- [ ] タブ作成画面に遷移できる
- [ ] タブ名を入力できる
- [ ] タブ名が8文字に制限される
- [ ] 文字数カウンターが表示される
- [ ] カラー選択ボタンをタップできる
- [ ] カラーを選択すると表示が更新される
- [ ] アイコン選択ボタンをタップできる
- [ ] アイコンを選択すると表示が更新される
- [ ] 新規作成ボタンでタブが作成される
- [ ] タブ名が空の場合、エラーが表示される
- [ ] 作成後、タブ一覧画面に戻る
- [ ] 閉じるボタンで画面が閉じる

### タブ編集機能
- [ ] タブ編集画面に遷移できる
- [ ] タブ情報が事前に入力されている
- [ ] タブ名を変更できる
- [ ] カラーを変更できる
- [ ] アイコンを変更できる
- [ ] 確定ボタンでタブが更新される
- [ ] 更新後、タブ一覧画面に戻る
- [ ] 閉じるボタンで画面が閉じる

### タブ削除機能
- [ ] 削除ボタンが表示される（DELETEタブ以外）
- [ ] DELETEタブには削除ボタンが表示されない
- [ ] 削除ボタンをタップすると確認ダイアログが表示される
- [ ] ダイアログにタブ名が表示される
- [ ] ダイアログに警告メッセージが表示される
- [ ] キャンセルボタンで削除を中止できる
- [ ] 削除ボタンでタブが削除される
- [ ] タブ削除後、タブ内のタスクも削除される
- [ ] 削除後、アクティブタブが変更される

### ナビゲーション機能
- [ ] メイン画面 → タブ一覧画面
- [ ] タブ一覧画面 → メイン画面
- [ ] タブ一覧画面 → タブ作成画面
- [ ] タブ作成画面 → タブ一覧画面
- [ ] タブ一覧画面 → タブ編集画面
- [ ] タブ編集画面 → タブ一覧画面

---

## ✅ 完了条件

以下のすべてが満たされている場合、ステップ6は完了です:

- [x] すべてのファイルが作成されている（5新規 + 4更新）
- [x] Modal コンポーネントが実装されている
- [x] ColorPickerModal が実装されている
- [x] IconPickerModal が実装されている
- [x] EditTabScreen が実装されている（作成・編集両対応）
- [x] TabListScreen が実装されている
- [x] ナビゲーション機能が実装されている
- [ ] タブ作成機能が動作する
- [ ] タブ編集機能が動作する
- [ ] タブ削除機能が動作する
- [ ] すべてのモーダルが動作する
- [x] バリデーションが実装されている
- [x] TypeScriptのコンパイルエラーがない
- [ ] アプリが正常に起動する
- [ ] すべての画面遷移が動作する

---

## 📝 次のステップ

ステップ6が完了したら、**ステップ7: 品質向上**に進んでください。

---

## 🔍 トラブルシューティング

### チェックリストで問題が見つかった場合

1. **ファイルが存在しない**
  - 実装指示スクリプトを再確認し、該当ファイルを作成してください

2. **モーダルが表示されない**
  - React Native の Modal を使用しているか確認してください
  - transparent プロパティが true か確認してください
  - visible プロパティが正しく渡されているか確認してください

3. **画面遷移が動作しない**
  - currentScreen の状態が正しく更新されているか確認してください
  - 条件付きレンダリングが正しいか確認してください
  - ナビゲーション関数が正しく呼ばれているか確認してください

4. **タブ削除が動作しない**
  - DELETE_TAB_ID のチェックが正しいか確認してください
  - Alert.alert が正しく実装されているか確認してください
  - tabList.deleteTab のコールバックが正しいか確認してください

5. **カラー/アイコン選択が動作しない**
  - FlatList の numColumns が 6 か確認してください
  - onSelectColor/onSelectIcon が正しく呼ばれているか確認してください
  - モーダルが閉じるか確認してください

6. **バリデーションが動作しない**
  - タブ名の trim() が実装されているか確認してください
  - 空チェックが正しいか確認してください
  - Alert.alert が呼ばれているか確認してください

---

## 🧪 実機動作確認

以下を実際にアプリで確認してください:

### 基本フロー確認
1. [ ] アプリを起動する
2. [ ] メイン画面が表示される
3. [ ] 設定ボタン（⚙）をタップする
4. [ ] タブ一覧画面が表示される
5. [ ] 既存のタブが表示される
6. [ ] FABをタップする
7. [ ] タブ作成画面が表示される

### タブ作成フロー
8. [ ] タブ名を入力する（例: "買い物"）
9. [ ] 文字数カウンターが更新される
10. [ ] カラーボタンをタップする
11. [ ] カラー選択モーダルが開く
12. [ ] カラーをタップして選択する
13. [ ] モーダルが閉じる
14. [ ] 選択したカラーが表示される
15. [ ] アイコンボタンをタップする
16. [ ] アイコン選択モーダルが開く
17. [ ] アイコンをタップして選択する
18. [ ] モーダルが閉じる
19. [ ] 選択したアイコンが表示される
20. [ ] 新規作成ボタンをタップする
21. [ ] タブ一覧画面に戻る
22. [ ] 新しいタブが一覧に表示される

### タブ編集フロー
23. [ ] タブの編集ボタン（✎）をタップする
24. [ ] タブ編集画面が表示される
25. [ ] タブ情報が事前に入力されている
26. [ ] タブ名を変更する
27. [ ] カラーを変更する
28. [ ] アイコンを変更する
29. [ ] 確定ボタンをタップする
30. [ ] タブ一覧画面に戻る
31. [ ] タブ情報が更新されている

### タブ削除フロー
32. [ ] タブの削除ボタン（✕）をタップする（DELETEタブ以外）
33. [ ] 確認ダイアログが表示される
34. [ ] タブ名が表示される
35. [ ] 警告メッセージが表示される
36. [ ] キャンセルボタンをタップする
37. [ ] ダイアログが閉じる
38. [ ] タブが削除されない
39. [ ] もう一度削除ボタンをタップする
40. [ ] 削除ボタン（赤）をタップする
41. [ ] タブが削除される
42. [ ] タブ一覧から消える

### DELETEタブ確認
43. [ ] DELETEタブを確認する
44. [ ] 削除ボタンが表示されない
45. [ ] 編集ボタンは表示される

### ナビゲーション確認
46. [ ] 閉じるボタンでメイン画面に戻る
47. [ ] メイン画面が表示される
48. [ ] 作成したタブが表示される

---

## 📐 UI/UX仕様との照合

### タブ一覧画面

| 要素 | 仕様 | 実装 | 確認 |
|------|------|------|------|
| ヘッダー | 閉じるボタン左、タイトル中央 | ✓ | [ ] |
| タブアイテム | 削除、カラー、タイトル、アイコン、編集、ハンドル | ✓ | [ ] |
| DELETEタブ | 削除ボタンなし | ✓ | [ ] |
| FAB | 画面下部中央、+アイコン | ✓ | [ ] |

### タブ作成/編集画面

| 要素 | 仕様 | 実装 | 確認 |
|------|------|------|------|
| ヘッダー | 閉じるボタン左、タイトル中央 | ✓ | [ ] |
| タブ名入力 | 8文字制限、文字数表示 | ✓ | [ ] |
| カラー選択 | ボタンでモーダル表示 | ✓ | [ ] |
| アイコン選択 | ボタンでモーダル表示 | ✓ | [ ] |
| 保存ボタン | 全幅、ラベル可変 | ✓ | [ ] |

### モーダル

| 要素 | 仕様 | 実装 | 確認 |
|------|------|------|------|
| グリッド | 6列 | ✓ | [ ] |
| 選択状態 | ハイライト表示 | ✓ | [ ] |
| 閉じる | タップ、背景タップ | ✓ | [ ] |
| アニメーション | スライドアップ | ✓ | [ ] |

---

**チェックリスト作成日:** 2025-11-22
**対象ステップ:** ステップ6 - タブ編集・高度なインタラクション機能