export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          firstname: string | null
          id: number
          lastname: string | null
          message: string | null
          meta: Json | null
          phone: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          firstname?: string | null
          id?: never
          lastname?: string | null
          message?: string | null
          meta?: Json | null
          phone?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          firstname?: string | null
          id?: never
          lastname?: string | null
          message?: string | null
          meta?: Json | null
          phone?: string | null
          source?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_en: string | null
          alt_fr: string | null
          id: number
          path: string
          property_id: number | null
          sort_order: number | null
        }
        Insert: {
          alt_en?: string | null
          alt_fr?: string | null
          id?: never
          path: string
          property_id?: number | null
          sort_order?: number | null
        }
        Update: {
          alt_en?: string | null
          alt_fr?: string | null
          id?: never
          path?: string
          property_id?: number | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content_en: string | null
          content_fr: string | null
          cover_path: string | null
          created_at: string | null
          created_by: string | null
          id: number
          published_at: string | null
          slug: string | null
          status: string | null
          title_en: string | null
          title_fr: string | null
        }
        Insert: {
          content_en?: string | null
          content_fr?: string | null
          cover_path?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          published_at?: string | null
          slug?: string | null
          status?: string | null
          title_en?: string | null
          title_fr?: string | null
        }
        Update: {
          content_en?: string | null
          content_fr?: string | null
          cover_path?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          published_at?: string | null
          slug?: string | null
          status?: string | null
          title_en?: string | null
          title_fr?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          area_m2: number | null
          area_useful_m2: number | null
          availability_date: string | null
          bedrooms: number | null
          city: string | null
          created_at: string | null
          created_by: string | null
          description_en: string | null
          description_fr: string | null
          dpe_letter: string | null
          dpe_value: number | null
          excerpt_en: string | null
          excerpt_fr: string | null
          features: Json | null
          ges_letter: string | null
          id: number
          land_m2: number | null
          lat: number | null
          lng: number | null
          postal_code: string | null
          price: number | null
          ref: string | null
          rent_cc: number | null
          rent_hc: number | null
          rooms: number | null
          status: string | null
          title_en: string | null
          title_fr: string | null
          transaction: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          area_m2?: number | null
          area_useful_m2?: number | null
          availability_date?: string | null
          bedrooms?: number | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description_en?: string | null
          description_fr?: string | null
          dpe_letter?: string | null
          dpe_value?: number | null
          excerpt_en?: string | null
          excerpt_fr?: string | null
          features?: Json | null
          ges_letter?: string | null
          id?: never
          land_m2?: number | null
          lat?: number | null
          lng?: number | null
          postal_code?: string | null
          price?: number | null
          ref?: string | null
          rent_cc?: number | null
          rent_hc?: number | null
          rooms?: number | null
          status?: string | null
          title_en?: string | null
          title_fr?: string | null
          transaction: string
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          area_m2?: number | null
          area_useful_m2?: number | null
          availability_date?: string | null
          bedrooms?: number | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description_en?: string | null
          description_fr?: string | null
          dpe_letter?: string | null
          dpe_value?: number | null
          excerpt_en?: string | null
          excerpt_fr?: string | null
          features?: Json | null
          ges_letter?: string | null
          id?: never
          land_m2?: number | null
          lat?: number | null
          lng?: number | null
          postal_code?: string | null
          price?: number | null
          ref?: string | null
          rent_cc?: number | null
          rent_hc?: number | null
          rooms?: number | null
          status?: string | null
          title_en?: string | null
          title_fr?: string | null
          transaction?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string | null
          city: string | null
          id: number
          note: number | null
          published: boolean | null
          quote: string | null
        }
        Insert: {
          author?: string | null
          city?: string | null
          id?: never
          note?: number | null
          published?: boolean | null
          quote?: string | null
        }
        Update: {
          author?: string | null
          city?: string | null
          id?: never
          note?: number | null
          published?: boolean | null
          quote?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
