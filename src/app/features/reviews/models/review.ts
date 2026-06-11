export interface Review {
  _id: string;
  user: string;
  comment: string;
  rating: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}