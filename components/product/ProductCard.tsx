'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProdakInterface1 } from '@/types';
import { useEffect, useState } from 'react';
import CartButton from '@/components/product/addCart';
import { ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: ProdakInterface1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any; // Replace 'any' with the appropriate type if known
}

export default function ProductCard({ product, session }: ProductCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <Link href={`/prodak/${product.id}`} className="block relative">
        <div className="relative w-full pt-[100%] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          {/* Badge Container */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.stock <= 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Out of Stock
              </div>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Low Stock
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="min-h-[2.5rem]">
          <Link href={`/prodak/${product.id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 truncate">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2 min-h-[2.5rem]">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              Rp {product.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Stock: <span className="font-medium text-gray-700 dark:text-gray-200">{product.stock}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <CartButton product={product} session={session} />
        </div>
      </div>
    </div>
  );
}