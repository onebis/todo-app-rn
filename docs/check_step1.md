## 📁 ディレクトリ構造の確認

以下のディレクトリがすべて作成されていることを確認してください:

- [x] `app/types/` ディレクトリが存在する
- [x] `app/models/` ディレクトリが存在する
- [x] `app/repositories/` ディレクトリが存在する
- [x] `app/viewmodels/` ディレクトリが存在する
- [x] `app/contexts/` ディレクトリが存在する
- [x] `app/components/common/` ディレクトリが存在する
- [x] `app/components/task/` ディレクトリが存在する
- [x] `app/components/tab/` ディレクトリが存在する
- [x] `app/screens/` ディレクトリが存在する
- [x] `app/utils/` ディレクトリが存在する
- [x] `app/constants/` ディレクトリが存在する

**確認コマンド:**
```bash
ls -la app/
```

---

## 📄 定数ファイルの確認

### `app/constants/app.ts`

- [x] ファイルが存在する
- [x] `DELETE_TAB_ID = 1` が定義されている
- [x] `DEFAULT_TAB_ID = 0` が定義されている
- [x] `MAX_TAB_TITLE_LENGTH = 8` が定義されている
- [x] `COLOR_LIST` が定義されている(19色)
- [x] `ColorType` 型が定義されている
- [x] `ICON_LIST` が定義されている(20種類)
- [x] `IconType` 型が定義されている
- [x] `DEFAULT_TABS` が定義されている(todoタブとDeleteタブ)

**確認コマンド:**
```bash
cat app/constants/app.ts
```

**期待される内容:**
- COLOR_LIST: red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey
- ICON_LIST: circle, square, triangle, star, heart, bookmark, flag, bell, home, work, school, shopping, fitness, music, movie, game, book, food, travel, code
- DEFAULT_TABS: id=0の"todo"タブとid=1の"Delete"タブ

---

## 🔧 型定義ファイルの確認

### `app/types/entities.ts`

- [x] ファイルが存在する
- [x] `TaskEntity` インターフェースが定義されている
- [x] TaskEntity に以下のフィールドが含まれている:
    - [x] `id: number`
    - [x] `subject: string`
    - [x] `done: boolean`
    - [x] `tabId: number`
    - [x] `order: number`
    - [x] `created: number`
- [x] `TabEntity` インターフェースが定義されている
- [x] TabEntity に以下のフィールドが含まれている:
    - [x] `id: number`
    - [x] `title: string`
    - [x] `color: string`
    - [x] `icon: string`
    - [x] `order: number`
    - [x] `created: number`

**確認コマンド:**
```bash
cat app/types/entities.ts
```

---

### `app/types/states.ts`

- [x] ファイルが存在する
- [x] `TaskState` インターフェースが定義されている
- [x] TaskState に以下のフィールドが含まれている:
    - [x] `id: number`
    - [x] `subject: string`
    - [x] `done: boolean`
    - [x] `tabId: number`
    - [x] `created: string` (ISO 8601形式)
- [x] `TabState` インターフェースが定義されている
- [x] TabState に以下のフィールドが含まれている:
    - [x] `id: number`
    - [x] `title: string`
    - [x] `color: string`
    - [x] `icon: string`
    - [x] `order: number`
- [x] `TaskListState` インターフェースが定義されている
- [x] TaskListState に以下のフィールドが含まれている:
    - [x] `taskList: TaskState[]`
    - [x] `isLoading: boolean`
    - [x] `error: string | null`
- [x] `TabListState` インターフェースが定義されている
- [x] TabListState に以下のフィールドが含まれている:
    - [x] `tabList: TabState[]`
    - [x] `isLoading: boolean`
    - [x] `error: string | null`
- [x] `AppState` インターフェースが定義されている
- [x] AppState に以下のフィールドが含まれている:
    - [x] `activeTabId: number`
    - [x] `activeEditId: number`
- [x] `EditTabState` インターフェースが定義されている
- [x] EditTabState に以下のフィールドが含まれている:
    - [x] `editTabId: number | null`
    - [x] `editTabTitle: string`
    - [x] `editTabColor: string`
    - [x] `editTabIcon: string`

**確認コマンド:**
```bash
cat app/types/states.ts
```

---

### `app/types/index.ts`

- [x] ファイルが存在する
- [x] `export * from './entities'` が含まれている
- [x] `export * from './states'` が含まれている

**確認コマンド:**
```bash
cat app/types/index.ts
```

---

## 🛠️ ユーティリティファイルの確認

### `app/utils/date.ts`

- [x] ファイルが存在する
- [x] `timestampToISO` 関数が定義されている
    - [x] パラメータ: `timestamp: number`
    - [x] 戻り値: `string` (ISO 8601形式)
- [x] `isoToTimestamp` 関数が定義されている
    - [x] パラメータ: `isoString: string`
    - [x] 戻り値: `number`
- [x] `getCurrentTimestamp` 関数が定義されている
    - [x] パラメータ: なし
    - [x] 戻り値: `number`

**確認コマンド:**
```bash
cat app/utils/date.ts
```

---

### `app/utils/converter.ts`

- [x] ファイルが存在する
- [x] `taskEntityToState` 関数が定義されている
    - [x] パラメータ: `entity: TaskEntity`
    - [x] 戻り値: `TaskState`
- [x] `taskEntitiesToStates` 関数が定義されている
    - [x] パラメータ: `entities: TaskEntity[]`
    - [x] 戻り値: `TaskState[]`
- [x] `tabEntityToState` 関数が定義されている
    - [x] パラメータ: `entity: TabEntity`
    - [x] 戻り値: `TabState`
- [x] `tabEntitiesToStates` 関数が定義されている
    - [x] パラメータ: `entities: TabEntity[]`
    - [x] 戻り値: `TabState[]`
- [x] 必要な型とユーティリティが正しくインポートされている

**確認コマンド:**
```bash
cat app/utils/converter.ts
```

---

### `app/utils/index.ts`

- [x] ファイルが存在する
- [x] `export * from './date'` が含まれている
- [x] `export * from './converter'` が含まれている

**確認コマンド:**
```bash
cat app/utils/index.ts
```

---

## 📦 パッケージの確認

- [x] `@react-native-async-storage/async-storage` がインストールされている
- [x] `package.json` の `dependencies` に AsyncStorage が含まれている

**確認コマンド:**
```bash
npm list @react-native-async-storage/async-storage
```

または

```bash
cat package.json | grep async-storage
```

---

## ⚙️ TypeScript設定の確認

### `tsconfig.json`

- [x] ファイルが存在する
- [x] `"strict": true` が設定されている
- [x] `"esModuleInterop": true` が設定されている (expo/tsconfig.base から継承)
- [x] `"skipLibCheck": true` が設定されている (expo/tsconfig.base から継承)
- [x] `"resolveJsonModule": true` が設定されている (expo/tsconfig.base から継承)
- [x] `"moduleResolution": "node"` が設定されている (expo/tsconfig.base から継承)
- [x] `"allowSyntheticDefaultImports": true` が設定されている (expo/tsconfig.base から継承)

**確認コマンド:**
```bash
cat tsconfig.json
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

### インポート確認テスト

以下のインポートが正しく動作することを確認してください:

```typescript
// 定数のインポート
import { DELETE_TAB_ID, DEFAULT_TAB_ID, COLOR_LIST, ICON_LIST, DEFAULT_TABS } from './app/constants/app';

// 型のインポート
import { TaskEntity, TabEntity, TaskState, TabState, TaskListState, TabListState, AppState, EditTabState } from './app/types';

// ユーティリティのインポート
import { timestampToISO, isoToTimestamp, getCurrentTimestamp, taskEntityToState, taskEntitiesToStates, tabEntityToState, tabEntitiesToStates } from './app/utils';
```

- [x] すべてのインポートがエラーなく動作する

---

## 📊 ファイル数の確認

以下のファイルが正しく作成されていることを確認してください:

### 定数ファイル (1ファイル)
- [x] `app/constants/app.ts`

### 型定義ファイル (3ファイル)
- [x] `app/types/entities.ts`
- [x] `app/types/states.ts`
- [x] `app/types/index.ts`

### ユーティリティファイル (3ファイル)
- [x] `app/utils/date.ts`
- [x] `app/utils/converter.ts`
- [x] `app/utils/index.ts`

**合計: 7ファイル**

**確認コマンド:**
```bash
find app/constants app/types app/utils -type f -name "*.ts" | wc -l
```

**期待される結果:** 7

---

## 🎯 最終確認

すべての項目にチェックが入ったら、以下を実行してください:

### 1. 全ファイルのリスト表示
```bash
tree app/constants app/types app/utils
```

または

```bash
find app/constants app/types app/utils -type f
```

### 2. TypeScriptコンパイル
```bash
npx tsc --noEmit
```

### 3. Lintチェック (もし設定されている場合)
```bash
npm run lint
```

---

## ✅ 完了条件

以下のすべてが満たされている場合、ステップ1は完了です:

- [x] すべてのディレクトリが作成されている (11個)
- [x] すべてのファイルが作成されている (7個)
- [x] すべての定数が正しく定義されている
- [x] すべての型が正しく定義されている
- [x] すべてのユーティリティ関数が実装されている
- [x] AsyncStorageがインストールされている
- [x] TypeScriptのコンパイルエラーがない
- [x] すべてのインポートが正しく動作する

---