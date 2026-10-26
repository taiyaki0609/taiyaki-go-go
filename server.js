
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

// 公開するHTMLファイルを配信
app.use(express.static(path.join(__dirname), {
  index: "index.html"
}));

// サーバーの動作確認用
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Taiyaki Go Go!"
  });
});

// 安全のため、まだ未実装の匿名ビューは案内を表示
app.get("/viewer", (req, res) => {
  res.status(501).send(`
    <!DOCTYPE html>
    <html lang="ja">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>匿名ビュー - Taiyaki Go Go!</title>
    <body style="font-family:Arial,sans-serif;padding:30px;line-height:1.8">
      <h1>匿名ビュー</h1>
      <p>この機能は現在準備中です。</p>
      <p>サイトを安全に中継する機能は、今後のステップで実装します。</p>
      <a href="/">トップページへ戻る</a>
    </body>
    </html>
  `);
});

// エラー処理
app.use((req, res) => {
  res.status(404).send("ページが見つかりません。");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Taiyaki Go Go! is running on port ${PORT}`);
});
