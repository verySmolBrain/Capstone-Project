export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _AchievementToProfile: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_AchievementToProfile_A_fkey"
            columns: ["A"]
            referencedRelation: "Achievement"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "_AchievementToProfile_B_fkey"
            columns: ["B"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      _CampaignToCollection: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_CampaignToCollection_A_fkey"
            columns: ["A"]
            referencedRelation: "Campaign"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "_CampaignToCollection_B_fkey"
            columns: ["B"]
            referencedRelation: "Collection"
            referencedColumns: ["name"]
          }
        ]
      }
      _ChatsUsers: {
        Row: {
          A: number
          B: string
        }
        Insert: {
          A: number
          B: string
        }
        Update: {
          A?: number
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_ChatsUsers_A_fkey"
            columns: ["A"]
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_ChatsUsers_B_fkey"
            columns: ["B"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      _collection: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_collection_A_fkey"
            columns: ["A"]
            referencedRelation: "Collectable"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "_collection_B_fkey"
            columns: ["B"]
            referencedRelation: "Collection"
            referencedColumns: ["name"]
          }
        ]
      }
      _managers: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_managers_A_fkey"
            columns: ["A"]
            referencedRelation: "Campaign"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "_managers_B_fkey"
            columns: ["B"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Achievement: {
        Row: {
          description: string
          image: string | null
          name: string
        }
        Insert: {
          description: string
          image?: string | null
          name: string
        }
        Update: {
          description?: string
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      Campaign: {
        Row: {
          end: string
          image: string | null
          isActive: boolean
          name: string
          start: string
          tags: string[] | null
        }
        Insert: {
          end: string
          image?: string | null
          isActive?: boolean
          name: string
          start?: string
          tags?: string[] | null
        }
        Update: {
          end?: string
          image?: string | null
          isActive?: boolean
          name?: string
          start?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      Chat: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      Collectable: {
        Row: {
          image: string | null
          name: string
          tags: string[] | null
        }
        Insert: {
          image?: string | null
          name: string
          tags?: string[] | null
        }
        Update: {
          image?: string | null
          name?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      CollectableCount: {
        Row: {
          count: number
          id: number
          inventoryId: string | null
          name: string
          waresId: string | null
          wishlistId: string | null
        }
        Insert: {
          count?: number
          id?: number
          inventoryId?: string | null
          name: string
          waresId?: string | null
          wishlistId?: string | null
        }
        Update: {
          count?: number
          id?: number
          inventoryId?: string | null
          name?: string
          waresId?: string | null
          wishlistId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "CollectableCount_inventoryId_fkey"
            columns: ["inventoryId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CollectableCount_name_fkey"
            columns: ["name"]
            referencedRelation: "Collectable"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "CollectableCount_waresId_fkey"
            columns: ["waresId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CollectableCount_wishlistId_fkey"
            columns: ["wishlistId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      Collection: {
        Row: {
          image: string | null
          name: string
          tags: string[] | null
        }
        Insert: {
          image?: string | null
          name: string
          tags?: string[] | null
        }
        Update: {
          image?: string | null
          name?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      Message: {
        Row: {
          chatId: number
          content: string
          createdAt: string
          id: number
          senderId: string
          updatedAt: string
        }
        Insert: {
          chatId: number
          content: string
          createdAt?: string
          id?: number
          senderId: string
          updatedAt: string
        }
        Update: {
          chatId?: number
          content?: string
          createdAt?: string
          id?: number
          senderId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_chatId_fkey"
            columns: ["chatId"]
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          }
        ]
      }
      Profile: {
        Row: {
          description: string | null
          id: string
          image: string | null
          name: string
          reputation: number
        }
        Insert: {
          description?: string | null
          id: string
          image?: string | null
          name: string
          reputation?: number
        }
        Update: {
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          reputation?: number
        }
        Relationships: [
          {
            foreignKeyName: "Profile_id_fkey"
            columns: ["id"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Review: {
        Row: {
          comment: string
          id: string
          rating: number
          revieweeId: string
          reviewerId: string
        }
        Insert: {
          comment: string
          id: string
          rating: number
          revieweeId: string
          reviewerId: string
        }
        Update: {
          comment?: string
          id?: string
          rating?: number
          revieweeId?: string
          reviewerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Review_revieweeId_fkey"
            columns: ["revieweeId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Review_reviewerId_fkey"
            columns: ["reviewerId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      Trade: {
        Row: {
          buyerId: string
          collectableName: string
          id: string
          price: number
          sellerId: string
          status: Database["public"]["Enums"]["Status"]
        }
        Insert: {
          buyerId: string
          collectableName: string
          id: string
          price: number
          sellerId: string
          status?: Database["public"]["Enums"]["Status"]
        }
        Update: {
          buyerId?: string
          collectableName?: string
          id?: string
          price?: number
          sellerId?: string
          status?: Database["public"]["Enums"]["Status"]
        }
        Relationships: [
          {
            foreignKeyName: "Trade_buyerId_fkey"
            columns: ["buyerId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Trade_collectableName_fkey"
            columns: ["collectableName"]
            referencedRelation: "Collectable"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Trade_sellerId_fkey"
            columns: ["sellerId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          id: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role: "USER" | "MANAGER" | "ADMIN"
      Status: "PENDING" | "ACCEPTED" | "DECLINED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
