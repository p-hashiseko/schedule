// server/api/code.get.ts
export default defineEventHandler((event) => {
  // コンソールにログを出して、リクエストが届いたか確認しやすくします
  console.log('Backend: Request received!');
  
  // 指定されたメッセージを返します
  return {
    message: "バックエンドと接続完了です！"
  };
});