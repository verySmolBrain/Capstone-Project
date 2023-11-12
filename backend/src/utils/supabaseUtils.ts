import { PrismaClient } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import jwtDecode from 'jwt-decode'

import { SupabaseClient } from '@supabase/supabase-js'
import SupabaseService from '@Source/utils/Supabase.service'
import { JsonObject } from '@prisma/client/runtime/library'

export const supabase = (): SupabaseClient => {
  return SupabaseService.getInstance()
}

export const rawPrisma = new PrismaClient()

export async function requestHandler(token: string) {
  const { data: user } = await supabase().auth.getUser(token)

  const { role } = (await rawPrisma.user.findFirst({
    where: {
      id: extractId(token),
    },
  })) ?? { role: 'USER' }

  /**
   *  This is ZenStack's implementation of RLS.
   *  Essentially there are permissions in the schema.zmodel in root directory that handles permissions
   *
   *  For example: @@allow('view', auth() == user)
   *
   *  Querying a normal Prisma client with await prisma.profile.findMany({}) will return all records even
   *  those that don't belong to the user. However, now that our Prisma client is wrapped in ZenStack's,
   *  if we query, we only get the records that belong to the user.
   *
   *  There are more examples in the schema.zmodel file.
   *
   *  @@allow('update,delete', auth() == user) means that only the user can update or delete their own records.
   *  Most of these are pretty self-explanatory. If you encounter an error / bug where your query doesn't
   *  return everything / what you want, check the schema.zmodel file to see if there are any restrictions
   *  applied to your query!
   */

  return enhance(rawPrisma, { user: { id: user?.user?.id, role: role } })
}

export const validateUser = async (token: string): Promise<boolean> => {
  const { data: user } = await supabase().auth.getUser(token)
  if (!user?.user?.id) {
    return false
  }
  return true
}

// extracts user id from JWT token
export const extractId = (token: string): string => {
  const decoded: JsonObject = jwtDecode(token)
  return decoded.sub!.toString()
}
