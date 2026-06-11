export interface Inventory {
  _id: string;
  productName: string;
  quantity: number;
  location?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}