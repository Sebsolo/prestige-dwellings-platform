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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      google_oauth_tokens: {
        Row: {
          access_token: string
          created_at: string
          expires_at: string
          id: string
          refresh_token: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_at: string
          id?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_at?: string
          id?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      google_reviews_display: {
        Row: {
          active: boolean | null
          author_name: string
          author_url: string | null
          created_at: string | null
          id: number
          profile_photo_url: string | null
          rating: number
          relative_time_description: string
          sort_order: number | null
          text: string
          time: number
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          author_name: string
          author_url?: string | null
          created_at?: string | null
          id?: never
          profile_photo_url?: string | null
          rating: number
          relative_time_description: string
          sort_order?: number | null
          text: string
          time: number
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          author_name?: string
          author_url?: string | null
          created_at?: string | null
          id?: never
          profile_photo_url?: string | null
          rating?: number
          relative_time_description?: string
          sort_order?: number | null
          text?: string
          time?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      home_carousel_images: {
        Row: {
          active: boolean | null
          alt_text: string | null
          created_at: string | null
          id: number
          image_path: string
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          alt_text?: string | null
          created_at?: string | null
          id?: never
          image_path: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          alt_text?: string | null
          created_at?: string | null
          id?: never
          image_path?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
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
          meta_description_en: string | null
          meta_description_fr: string | null
          meta_title_en: string | null
          meta_title_fr: string | null
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
          meta_description_en?: string | null
          meta_description_fr?: string | null
          meta_title_en?: string | null
          meta_title_fr?: string | null
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
          meta_description_en?: string | null
          meta_description_fr?: string | null
          meta_title_en?: string | null
          meta_title_fr?: string | null
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
          bathrooms: number | null
          bedrooms: number | null
          cellar: boolean | null
          city: string | null
          created_at: string | null
          created_by: string | null
          description_en: string | null
          description_fr: string | null
          dpe_letter: string | null
          dpe_value: number | null
          excerpt_en: string | null
          excerpt_fr: string | null
          exposure: string | null
          featured: boolean
          features: Json | null
          floor_level: string | null
          furnishing: string | null
          ges_letter: string | null
          heating: string | null
          id: number
          indoor_parking: number | null
          interior_condition: string | null
          kitchen: string | null
          land_m2: number | null
          lat: number | null
          lng: number | null
          monthly_charges: number | null
          pool: boolean | null
          postal_code: string | null
          price: number | null
          ref: string | null
          rent_cc: number | null
          rent_hc: number | null
          rooms: number | null
          status: string | null
          title_en: string | null
          title_fr: string | null
          toilets: number | null
          total_floors: number | null
          transaction: string
          type: string
          updated_at: string | null
          year_built: number | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          area_m2?: number | null
          area_useful_m2?: number | null
          availability_date?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          cellar?: boolean | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description_en?: string | null
          description_fr?: string | null
          dpe_letter?: string | null
          dpe_value?: number | null
          excerpt_en?: string | null
          excerpt_fr?: string | null
          exposure?: string | null
          featured?: boolean
          features?: Json | null
          floor_level?: string | null
          furnishing?: string | null
          ges_letter?: string | null
          heating?: string | null
          id?: never
          indoor_parking?: number | null
          interior_condition?: string | null
          kitchen?: string | null
          land_m2?: number | null
          lat?: number | null
          lng?: number | null
          monthly_charges?: number | null
          pool?: boolean | null
          postal_code?: string | null
          price?: number | null
          ref?: string | null
          rent_cc?: number | null
          rent_hc?: number | null
          rooms?: number | null
          status?: string | null
          title_en?: string | null
          title_fr?: string | null
          toilets?: number | null
          total_floors?: number | null
          transaction: string
          type: string
          updated_at?: string | null
          year_built?: number | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          area_m2?: number | null
          area_useful_m2?: number | null
          availability_date?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          cellar?: boolean | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description_en?: string | null
          description_fr?: string | null
          dpe_letter?: string | null
          dpe_value?: number | null
          excerpt_en?: string | null
          excerpt_fr?: string | null
          exposure?: string | null
          featured?: boolean
          features?: Json | null
          floor_level?: string | null
          furnishing?: string | null
          ges_letter?: string | null
          heating?: string | null
          id?: never
          indoor_parking?: number | null
          interior_condition?: string | null
          kitchen?: string | null
          land_m2?: number | null
          lat?: number | null
          lng?: number | null
          monthly_charges?: number | null
          pool?: boolean | null
          postal_code?: string | null
          price?: number | null
          ref?: string | null
          rent_cc?: number | null
          rent_hc?: number | null
          rooms?: number | null
          status?: string | null
          title_en?: string | null
          title_fr?: string | null
          toilets?: number | null
          total_floors?: number | null
          transaction?: string
          type?: string
          updated_at?: string | null
          year_built?: number | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      revshare_settings: {
        Row: {
          apql_thresholds: Json
          bonus_settings: Json
          id: string
          percents: Json
          updated_at: string
        }
        Insert: {
          apql_thresholds?: Json
          bonus_settings?: Json
          id?: string
          percents?: Json
          updated_at?: string
        }
        Update: {
          apql_thresholds?: Json
          bonus_settings?: Json
          id?: string
          percents?: Json
          updated_at?: string
        }
        Relationships: []
      }
      showcase_items: {
        Row: {
          created_at: string
          detail_url: string
          group_slug: string
          id: number
          location_label: string
          poster_bucket: string
          poster_path: string
          price_label: string
          published: boolean
          sort_order: number
          updated_at: string
          video_bucket: string
          video_mp4_path: string | null
          video_webm_path: string | null
        }
        Insert: {
          created_at?: string
          detail_url: string
          group_slug?: string
          id?: number
          location_label: string
          poster_bucket?: string
          poster_path: string
          price_label: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          video_bucket?: string
          video_mp4_path?: string | null
          video_webm_path?: string | null
        }
        Update: {
          created_at?: string
          detail_url?: string
          group_slug?: string
          id?: number
          location_label?: string
          poster_bucket?: string
          poster_path?: string
          price_label?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          video_bucket?: string
          video_mp4_path?: string | null
          video_webm_path?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          appointment_url: string | null
          booking_url: string | null
          canva_share_url: string | null
          created_at: string
          google_business_url: string | null
          google_place_id: string | null
          id: string
          legal_footer: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          primary_color: string | null
          secondary_color: string | null
          site_description: string | null
          site_name: string | null
          updated_at: string
        }
        Insert: {
          appointment_url?: string | null
          booking_url?: string | null
          canva_share_url?: string | null
          created_at?: string
          google_business_url?: string | null
          google_place_id?: string | null
          id?: string
          legal_footer?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_description?: string | null
          site_name?: string | null
          updated_at?: string
        }
        Update: {
          appointment_url?: string | null
          booking_url?: string | null
          canva_share_url?: string | null
          created_at?: string
          google_business_url?: string | null
          google_place_id?: string | null
          id?: string
          legal_footer?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_description?: string | null
          site_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      static_pages: {
        Row: {
          id: number
          path: string
          published: boolean
          updated_at: string
        }
        Insert: {
          id?: number
          path: string
          published?: boolean
          updated_at?: string
        }
        Update: {
          id?: number
          path?: string
          published?: boolean
          updated_at?: string
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
      get_current_user_role: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_team_member: { Args: never; Returns: boolean }
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
