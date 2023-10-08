import { createClient, SupabaseClient } from '@supabase/supabase-js'

export default class SupabaseService {
  static instance: SupabaseClient

  constructor(
    supabaseUrl = process.env.SUPABASE_URL,
    supabaseKey = process.env.SUPABASE_SECRET_KEY
  ) {
    
    if (!supabaseUrl)
      throw new Error(
        `${SupabaseService.getClassName()} => supabaseUrl is required.`
      )
    if (!supabaseKey)
      throw new Error(
        `${SupabaseService.getClassName()} => supabaseKey is required.`
      )

    if (!SupabaseService.instance) {
      SupabaseService.instance = createClient(supabaseUrl, supabaseKey)
    }

    return SupabaseService.instance
  }

  static getClassName() {
    return SupabaseService.name
  }

  static getInstance() {
    if (!SupabaseService.instance) {
      new SupabaseService()
    }

    return SupabaseService.instance
  }
}
