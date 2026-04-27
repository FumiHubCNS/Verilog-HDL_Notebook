# Verilog-HDL_Notebook

`vivado`を用いたFPGAプログラムを行うためのノートブック


まずは`VerliogーHDL`の書き方などを挙動を確認しながら学んでいきます。

このリポジトリはその過程で得たものなどをまとめておくためのものです。

ノートブックではコードを回路図に直して、シミュレータで挙動を確認します。
ノートブックでは以下を使用しています。

- `yosys`: Verliog-RTLの合成ツール
- `digitaljs`: 論理回路シミュレータ
- `yosys2digitaljs`: `yosys`を使って`digitaljs`で読める`json`  (hoge.v -> hoge.json)
- `observable`: javascriptが実行できるノートブック（Webサービス）
- `astro`: 静的サイトジェネレータ

作るときの手順は

1. `Verliog-HDL`でコードを書く(hoge.v)
2. `yosys2digitaljs`でjsonへ変換する(hoge.json)
3. `observable`で描画しつつ解説ページを書く
4. `astro`でGitHun Pages用のサイトを生成

