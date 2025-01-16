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

export interface ProdakInterface1 {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  categoryId: string | null;
  description: string | null | undefined; // Allow null or undefined
  image: string | null | undefined; // Allow null or undefined
  stock: number;
  user: {
    name: string | null;
  };
}

// export interface ProdakInterface {
//   id: string;
//   name: string;
//   price: number;
//   description?: string;
//   image?: string;
//   stock: number;
//   categoryId?: string;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user: {
//     name: string | null;
//   };
// }