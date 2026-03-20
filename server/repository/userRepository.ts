import type { User as _User } from '~~/shared/types/auth'

interface UserWithPassword {
  id: string
  email: string
  name: string
  passwordHash: string
  avatar?: string
}

interface CreateUserInput {
  email: string
  passwordHash: string
  name: string
}

// モックデータ（実際はSupabase/Prismaを使用）
const users: UserWithPassword[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'テストユーザー',
    passwordHash: '$2a$10$mockHashedPassword', // 本来はbcryptでハッシュ化
    avatar: ''
  }
]

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserRepository {
  /**
   * メールアドレスでユーザー取得
   */
  static async findByEmail(email: string): Promise<UserWithPassword | null> {
    // TODO: 実際のDB操作
    // return await prisma.user.findUnique({ where: { email } })
    return users.find((u) => u.email === email) || null
  }

  /**
   * IDでユーザー取得
   */
  static async findById(id: string): Promise<UserWithPassword | null> {
    // TODO: 実際のDB操作
    // return await prisma.user.findUnique({ where: { id } })
    return users.find((u) => u.id === id) || null
  }

  /**
   * ユーザー作成
   */
  static async create(data: CreateUserInput): Promise<UserWithPassword> {
    // TODO: 実際のDB操作
    // return await prisma.user.create({ data })
    const newUser: UserWithPassword = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash,
      avatar: ''
    }
    users.push(newUser)
    return newUser
  }

  /**
   * ユーザー更新
   */
  static async update(id: string, data: Partial<CreateUserInput>): Promise<UserWithPassword> {
    // TODO: 実際のDB操作
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) {
      throw new Error('ユーザーが見つかりません')
    }

    const current = users[index]!
    users[index] = {
      id: current.id,
      email: data.email ?? current.email,
      name: data.name ?? current.name,
      passwordHash: data.passwordHash ?? current.passwordHash,
      avatar: current.avatar
    }
    return users[index]!
  }

  /**
   * ユーザー削除
   */
  static async delete(id: string): Promise<boolean> {
    // TODO: 実際のDB操作
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) {
      return false
    }
    users.splice(index, 1)
    return true
  }
}
