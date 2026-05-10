export interface Jersey {
  id: string;
  team_user_id: string;
  team_id: string;
  user_id: string;
  email: string | null;
  size: string | null;
  number: string | null;
  color: string | null;
  name: string | null;
  is_loaned: boolean;
  is_active: boolean;
  owes_payment: boolean;
  amount_owed: number | null;
  jersey_type: string | null;
  purchase_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewJersey {
  team_user_id: string;
  team_id: string;
  user_id: string;
  email?: string | null;
  size?: string | null;
  number?: string | null;
  color?: string | null;
  name?: string | null;
  is_loaned?: boolean;
  is_active?: boolean;
  owes_payment?: boolean;
  amount_owed?: number | null;
  jersey_type?: string | null;
  purchase_date?: string | null;
}

export interface UpdateJersey {
  team_user_id?: string;
  user_id?: string;
  email?: string | null;
  size?: string | null;
  number?: string | null;
  color?: string | null;
  name?: string | null;
  is_loaned?: boolean;
  is_active?: boolean;
  owes_payment?: boolean;
  amount_owed?: number | null;
  jersey_type?: string | null;
  purchase_date?: string | null;
}

export const JERSEY_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'G'] as const;
export const JERSEY_TYPES = ['home', 'away', 'practice'] as const;
export const JERSEY_COLORS = ['black', 'yellow', 'white'] as const;
