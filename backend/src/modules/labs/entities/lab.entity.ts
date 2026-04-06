export interface Lab {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  isActive?: boolean;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
