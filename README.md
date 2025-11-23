# Todo App

React Nativeで構築されたタブベースのタスク管理アプリケーション

## 機能

- タスクの作成・編集・削除
- タスクの完了/未完了の切り替え
- タブによるタスクの分類
- タブのカスタマイズ（名前・カラー・アイコン）
- タブの並び替え
- ソフト削除（Undo機能付き）
- オフライン動作
- エラーハンドリング（ErrorBoundary）
- ユーザーフィードバック（Snackbar通知）
- パフォーマンス最適化

## 技術スタック

- **React Native** - クロスプラットフォームモバイルアプリフレームワーク
- **TypeScript** - 型安全な開発
- **Expo** - React Native開発プラットフォーム
- **TailwindCSS (NativeWind)** - ユーティリティファーストCSS
- **AsyncStorage** - ローカルストレージ
- **Context API** - グローバル状態管理

## アーキテクチャ

MVVM（Model-View-ViewModel）パターンを採用

```
app/
├── types/           # 型定義（Entity, State, など）
├── repositories/    # データアクセス層（Storage）
├── viewmodels/      # ビジネスロジック層（TaskListViewModel, TabListViewModel）
├── contexts/        # グローバル状態管理（AppContext, SnackbarContext）
├── components/      # UIコンポーネント
│   ├── common/      # 共通コンポーネント
│   ├── task/        # タスク関連コンポーネント
│   └── tab/         # タブ関連コンポーネント
├── screens/         # 画面コンポーネント
├── utils/           # ユーティリティ関数
└── constants/       # 定数定義
```

## セットアップ

### 前提条件

- Node.js 16以上
- npm または yarn
- iOS: Xcode（Macのみ）
- Android: Android Studio

### インストール

```bash
# 依存パッケージのインストール
npm install

# iOSの場合（Macのみ）
cd ios && pod install && cd ..
```

### 起動

```bash
# 開発サーバーの起動
npx expo start

# iOSシミュレーターで起動
npm run ios

# Androidエミュレーターで起動
npm run android

# Webブラウザで起動
npm run web
```

## 主要な機能

### タスク管理

- タスクの追加: FABボタン（+）をタップ
- タスクの編集: タスクをタップして件名を編集
- タスクの完了: チェックボックスをタップ
- タスクの削除: タスクを長押しまたはスワイプ
- Undo機能: 削除後3秒以内にUndoボタンで復元可能

### タブ管理

- タブ追加: 設定画面（⚙）から「新規タブ」をタップ
- タブ編集: タブリストでタブをタップして編集
- タブ削除: タブリストで削除ボタンをタップ
- カラー選択: 6色のカラーパレットから選択
- アイコン選択: 絵文字アイコンから選択

### DELETEタブ

- すべての削除済みタスクが自動的に移動
- ゴミ箱アイコン（🗑）で全削除可能
- 削除不可・編集不可の特殊タブ

## パフォーマンス最適化

- **useMemo**: 計算結果のメモ化
- **useCallback**: コールバック関数のメモ化
- **FlatList最適化**: removeClippedSubviews, maxToRenderPerBatch, windowSize
- **型ガード**: 開発環境での型検証

## エラーハンドリング

- **ErrorBoundary**: Reactエラーをキャッチして適切に表示
- **型ガード**: 開発環境でデータ構造を検証
- **エラーメッセージ**: ユーザーフレンドリーなエラー表示

## 開発

### TypeScriptコンパイルチェック

```bash
npx tsc --noEmit
```

### コード構造

- **Entity**: データベースモデル（TaskEntity, TabEntity）
- **State**: UI状態（TaskState, TabState）
- **ViewModel**: ビジネスロジック
- **Repository**: データ永続化

## ライセンス

MIT

## 作成者

React Native + TypeScript + TailwindCSSで構築された、モダンなタスク管理アプリケーション
