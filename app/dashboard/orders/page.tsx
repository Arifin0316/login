import { auth } from "@/auth";
import { getSellerOrders } from '@/lib/data';
import { OrderStatus } from "@prisma/client";
import { redirect } from 'next/navigation';
import SellerOrderList from '@/components/orders/ordersAdmin/SellerOrderList';
import { Package, Clock, Check, XCircle, Truck } from 'lucide-react';

export default async function SellerOrdersPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  let { data: orders } = await getSellerOrders(session.user.id);
  orders = (orders ?? []).map(order => ({
    ...order,
    status: order.status as OrderStatus
  }));

  // Calculate order statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'PENDING').length,
    processing: orders.filter(order => order.status === 'PROCESSING').length,
    shipped: orders.filter(order => order.status === 'SHIPPED').length,
    delivered: orders.filter(order => order.status === 'DELIVERED').length,
    cancelled: orders.filter(order => order.status === 'CANCELLED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              Manage Orders
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Track and manage your customer orders</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Processing</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.processing}</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.delivered}</p>
              </div>
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cancelled</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.cancelled}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-500 dark:text-gray-400">When you receive orders, they will appear here.</p>
            </div>
          ) : (
            <div className="p-6">
              <SellerOrderList orders={orders} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}