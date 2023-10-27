/* eslint-disable @typescript-eslint/no-unused-vars */
enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

enum Role {
  USER,
  MANAGER,
  ADMIN,
}

type Collectable = {
  name: string
  image: string
  tags: string[]
  // add later
}

type UserProfile = {
  id: string
  name: string
  collection: Collectable[]
  wishlist: Collectable[]
  wares: Collectable[]
  description: string
  image: string
  achievements: Achievement[]
  sales: Trade[]
  purchases: Trade[]
  reputation: number
  reviewsGiven: Review[]
  reviewsReceived: Review[]
  chats: Chat[]
}

type Trade = {
  id: string
  seller: UserProfile
  sellerId: string
  buyer: UserProfile
  buyerId: string
  collectable: Collectable
  collectableId: string
  status: Status
  price: number
}

type Achievement = {
  id: string
  name: string
  description: string
  image: string
  users: UserProfile[]
}

type Review = {
  id: string
  rating: number
  comment: string
  reviewee: UserProfile
  revieweeId: string
  reviewer: UserProfile
  reviewerId: string
}

type Chat = {
  id: number
  Message: Message[]
  users: UserProfile[]
}

type Message = {
  id: string
  chatId: number
  chat: Chat
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

type FormattedChat = {
  id: number
  latestMessage?: Message | null | undefined
  receiver: Receiver
  image: string
}

type Receiver = {
  description: string
  id: string
  image: string
  name: string
  reputation: number
}

type Profile = {
  id: string
  name: string
  description: string | null
  image: string | null
  reputation: number
}

type Collection = {
  name: string
  image: string | null
  tags: string[]
  collectables: Collectable[]
  collections: Campaign[]
}

type Campaign = {
  id: number
  name: string
  image: string
  tags: string[]
  start: Date
  end: Date
  isActive: boolean
  collections: Collection[]
  managers: User[]
}

type User = {
  id: string
  role: Role
  profile: Profile
  campaigns: Campaign[]
}
