/**
 * CORS設定ミドルウェア
 */
export default defineEventHandler((event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  }

  // ヘッダーを設定
  Object.entries(headers).forEach(([key, value]) => {
    setHeader(event, key, value)
  })

  // OPTIONSリクエストの場合は即座に返す
  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
    return
  }
})
