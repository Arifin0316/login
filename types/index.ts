
export interface ProdakInterface {
  id: string;
  name: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: { name: string; id: string } | null;
  categoryId?: string | null | undefined;
  userId: string;
  user: {
      name: string | null;
  };
  description?: string | null | undefined;
  image?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}


export interface ProdakInterface1 {
  rating?: number;
  session?:true
  id: string;
  name: string;
  price: number;
  description: string | null;
  image: string | null;
  stock: number;
  categoryId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
  reviews?: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  }[];
}

export interface CreateOrderInput {
  shippingAddress: string;
  phoneNumber: string;
  notes?: string;
  shippingMethod?: string;
  shippingCost?: number;
}
