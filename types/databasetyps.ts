export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      balances: {
        Row: {
          account_number: string | null;
          balance_amount: number | null;
          user_id: string;
        };
        Insert: {
          account_number?: string | null;
          balance_amount?: number | null;
          user_id: string;
        };
        Update: {
          account_number?: string | null;
          balance_amount?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          invite_code: string | null;
          phonenumber: number | null;
          transfer_pin: string | null;
          updated_at: string | null;
          user_role: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          invite_code?: string | null;
          phonenumber?: number | null;
          transfer_pin?: string | null;
          updated_at?: string | null;
          user_role?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          invite_code?: string | null;
          phonenumber?: number | null;
          transfer_pin?: string | null;
          updated_at?: string | null;
          user_role?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      providers: {
        Row: {
          code: string | null;
          id: string;
          name: string | null;
          type: string | null;
        };
        Insert: {
          code?: string | null;
          id?: string;
          name?: string | null;
          type?: string | null;
        };
        Update: {
          code?: string | null;
          id?: string;
          name?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      sub_vendors: {
        Row: {
          business_name: string | null;
          created_at: string | null;
          id: string;
          invite_code: string | null;
          invited_by: string | null;
          location: string | null;
          phone_number: string | null;
          status: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          business_name?: string | null;
          created_at?: string | null;
          id?: string;
          invite_code?: string | null;
          invited_by?: string | null;
          location?: string | null;
          phone_number?: string | null;
          status: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          business_name?: string | null;
          created_at?: string | null;
          id?: string;
          invite_code?: string | null;
          invited_by?: string | null;
          location?: string | null;
          phone_number?: string | null;
          status?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sub_vendors_invited_by_fkey";
            columns: ["invited_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sub_vendors_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      top_up_requests: {
        Row: {
          amount: number | null;
          approved_at: string | null;
          business_name: string;
          created_at: string | null;
          id: string;
          invited_by: string | null;
          location: string | null;
          phone_number: string | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          approved_at?: string | null;
          business_name: string;
          created_at?: string | null;
          id?: string;
          invited_by?: string | null;
          location?: string | null;
          phone_number?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          approved_at?: string | null;
          business_name?: string;
          created_at?: string | null;
          id?: string;
          invited_by?: string | null;
          location?: string | null;
          phone_number?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "top_up_requests_invited_by_fkey";
            columns: ["invited_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "top_up_requests_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      topups_sub: {
        Row: {
          accountNumber: string | null;
          amount: string | null;
          created_at: string | null;
          id: string;
          main_vendor_id: string;
          status: string | null;
          sub_vendor_id: string;
        };
        Insert: {
          accountNumber?: string | null;
          amount?: string | null;
          created_at?: string | null;
          id?: string;
          main_vendor_id: string;
          status?: string | null;
          sub_vendor_id: string;
        };
        Update: {
          accountNumber?: string | null;
          amount?: string | null;
          created_at?: string | null;
          id?: string;
          main_vendor_id?: string;
          status?: string | null;
          sub_vendor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "topups_sub_main_vendor_id_fkey";
            columns: ["main_vendor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      transfer_logs: {
        Row: {
          amount: string | null;
          created_at: string | null;
          customer_number: string | null;
          favorite_numbers: string | null;
          id: string;
          provider_id: string | null;
          provider_name: string | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          amount?: string | null;
          created_at?: string | null;
          customer_number?: string | null;
          favorite_numbers?: string | null;
          id?: string;
          provider_id?: string | null;
          provider_name?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: string | null;
          created_at?: string | null;
          customer_number?: string | null;
          favorite_numbers?: string | null;
          id?: string;
          provider_id?: string | null;
          provider_name?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transfer_logs_provider_id_fkey";
            columns: ["provider_id"];
            isOneToOne: false;
            referencedRelation: "providers";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      topup_balance: {
        Args: { admin_id: string; user_id: string; topup_amount: number };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;
