# patterns/

UI 表現のサンプル集。デモ単位で完結したコンポーネントを置き、Storybook と Vite アプリ（featured demo）両方から参照する。

## ディレクトリ規約

```
src/patterns/
  <category>/                  // 表現の大分類
    <library-or-technique>/    // 使用ライブラリ / 手法
      <variant>/               // バリエーション名（kebab-case）
        Demo.tsx               // React コンポーネント本体（必須）
        Demo.stories.tsx       // Storybook story（必須）
        README.md              // 必要に応じて
        *.glsl など            // 補助ファイル
```

### category 一覧（増やしてOK）

| category    | 用途                                                       |
| ----------- | ---------------------------------------------------------- |
| `3d`        | Three.js / WebGL / WebGPU 系の 3D・シェーダー表現           |
| `motion`    | motion (motion.dev) / CSS / Web Animations による動き      |
| `layout`    | Grid / Flex / Container Queries 等のレイアウト技法          |
| `interaction` | カーソル追従、スクロール、ジェスチャー等のインタラクション |
| `form`      | 入力系 UI                                                  |

カテゴリが既存に当てはまらない時は新しいディレクトリを切る。

## 命名規約

- ディレクトリ: `kebab-case`（`three-fluid-fx`, `helloworld`）
- React コンポーネント: `PascalCase` で named export（`ThreeFluidFxHelloWorld`）
- Storybook title: `<Category> / <Library or Technique> / <Variant>`（例: `3D / three-fluid-fx / HelloWorld`）

## 新しいデモを追加するときの手順

1. `src/patterns/<category>/<library>/<variant>/` を作成
2. `Demo.tsx` に named export でコンポーネントを実装
3. `Demo.stories.tsx` に story を書く（title を上記規約に揃える）
4. featured で見せたい場合は `src/App.tsx` を差し替え
