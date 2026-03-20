export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body ?? {}

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'ユーザー名とパスワードを入力してください'
    })
  }

  // どんな値でも承認を返す
  return {
    success: true,
    data: {
      user: {
        id: '1',
        name: username,
        email: `${username}@example.com`
      },
      token: 'mock-token-' + Date.now()
    }
  }
})
