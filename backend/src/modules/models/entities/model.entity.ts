export interface Model {
  id: number;
  name: string;
  provider: string;
  description?: string;
  contextInput?: string;
  output?: string;
  multimodal?: boolean;
  speed?: string;
  bestFor?: string;
  contextLimit?: number;
  maxOutputTokens?: number;
  iconUrl?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  pricePerMToken?: string;
  inputPrice?: string;   // e.g. "$2.50"
  outputPrice?: string;  // e.g. "$15"
  badge?: 'Hot' | 'New';
  createdAt: Date;
  updatedAt: Date;
}
