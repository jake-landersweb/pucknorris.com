export interface Jersey {
  id: string;
  team_user_id: string;
  team_id: string;
  user_id: string;
  size: string | null;
  number: string | null;
  color: string | null;
  name: string | null;
  is_loaned: boolean;
  is_paid: boolean;
  jersey_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewJersey {
  team_user_id: string;
  team_id: string;
  user_id: string;
  size?: string | null;
  number?: string | null;
  color?: string | null;
  name?: string | null;
  is_loaned?: boolean;
  is_paid?: boolean;
  jersey_type?: string | null;
}

export interface UpdateJersey {
  team_user_id?: string;
  user_id?: string;
  size?: string | null;
  number?: string | null;
  color?: string | null;
  name?: string | null;
  is_loaned?: boolean;
  is_paid?: boolean;
  jersey_type?: string | null;
}

export const JERSEY_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export const JERSEY_TYPES = ['home', 'away', 'practice'] as const;
export const JERSEY_COLORS = ['white', 'black', 'dark', 'light'] as const;
