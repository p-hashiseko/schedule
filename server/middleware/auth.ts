/**
 * 認証ミドルウェア
 * リクエストヘッダーからトークンを検証し、ユーザー情報を取得
 *
 * 注意: 現在はDB設計中のため、このミドルウェアは無効化されています
 */
export default defineEventHandler(async (_event) => {
  // TODO: DB設計完了後に有効化する
  // 現在はすべてのリクエストを通す
  return

  /* 以下、DB設計完了後に有効化
  // APIリクエストのみ認証チェック
  const path = event.path || event.node.req.url || ''
  
  // API以外のリクエスト（ページレンダリング等）はスキップ
  if (!path.startsWith('/api/')) {
    return
  }
  
  // 認証不要のAPIエンドポイント
  const publicPaths = ['/api/auth/login', '/api/auth/register']
  
  if (publicPaths.some(p => path.startsWith(p))) {
    return
  }

  try {
    // Authorizationヘッダーからトークン取得
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: '認証が必要です'
      })
    }

    const token = authHeader.substring(7)
    
    // TODO: トークン検証
    // const payload = await verifyToken(token)
    // event.context.user = payload.user
    
    // モック: とりあえず通す
    event.context.user = {
      id: '1',
      email: 'user@example.com',
      name: 'テストユーザー'
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: '認証に失敗しました'
    })
  }
  */
})
