export interface Makeup {
  _id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}