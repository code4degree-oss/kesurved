'use client';

import { useState } from 'react';
import { Search, FileSpreadsheet, Package, CheckCircle2, Truck, PackageCheck, XCircle, Clock } from 'lucide-react';

type OrderStatus = 'ALL' | 'NEW' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface OrderRow {
  id: string;
  customer: string;
  phone: string;
  items: number;
  total: number;
  weight: number;
  status: OrderStatus;
  date: string;
  canCancel: boolean;
}

// TODO: Fetch from API
const INITIAL_ORDERS: OrderRow[] = [];

const STATUS_CONFIG = {
  ALL: { label: 'All', icon: Package, color: 'text-gray-500', bg: 'bg-gray-100 text-gray-700' },
  NEW: { label: 'New', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100 text-blue-700' },
  PACKED: { label: 'Packed', icon: CheckCircle2, color: 'text-yellow-500', bg: 'bg-yellow-100 text-yellow-700' },
  SHIPPED: { label: 'Shipped', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-100 text-purple-700' },
  DELIVERED: { label: 'Delivered', icon: PackageCheck, color: 'text-green-500', bg: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelled', icon: XCircle, color: 'text-red-500', bg: 'bg-red-100 text-red-700' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<OrderStatus>('ALL');
  const [search, setSearch] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  const filteredOrders = orders.filter((o) => {
    const matchesTab = activeTab === 'ALL' || o.status === activeTab;
    const matchesSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedOrders(newSelected);
  };

  const selectAll = () => {
    if (selectedOrders.size === filteredOrders.filter(o => o.status === 'NEW').length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(filteredOrders.filter(o => o.status === 'NEW').map(o => o.id)));
    }
  };

  const markAsPacked = () => {
    setOrders(orders.map(o => selectedOrders.has(o.id) ? { ...o, status: 'PACKED' as OrderStatus } : o));
    setSelectedOrders(new Set());
  };

  const exportToExcel = () => {
    const packedOrders = orders.filter(o => o.status === 'PACKED');
    if (packedOrders.length === 0) {
      alert('No packed orders to export. Mark orders as PACKED first.');
      return;
    }
    // TODO: Real Excel generation using xlsx + india-post-config
    alert(`Exporting ${packedOrders.length} packed orders to India Post Excel format...`);
    setOrders(orders.map(o => o.status === 'PACKED' ? { ...o, status: 'SHIPPED' as OrderStatus } : o));
  };

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const packedCount = orders.filter(o => o.status === 'PACKED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-sm text-gray-500 mt-1">{orders.length} total orders</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedOrders.size > 0 && (
            <button
              onClick={markAsPacked}
              className="flex items-center gap-2 bg-yellow-500 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
            >
              <CheckCircle2 size={16} />
              Mark as Packed ({selectedOrders.size})
            </button>
          )}
          <button
            onClick={exportToExcel}
            disabled={packedCount === 0}
            className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet size={16} />
            Export Excel ({packedCount})
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((status) => {
          const config = STATUS_CONFIG[status];
          const count = status === 'ALL' ? orders.length : orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === status
                  ? 'bg-white shadow-sm border border-gray-200 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
            >
              <config.icon size={16} className={activeTab === status ? config.color : ''} />
              {config.label}
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" onChange={selectAll} className="rounded border-gray-300" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Items</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Weight</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    {order.status === 'NEW' && (
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        className="rounded border-gray-300"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.items}</td>
                  <td className="px-4 py-3 text-gray-500">{order.weight}g</td>
                  <td className="px-4 py-3 font-bold text-gray-900">₹{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.bg}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{order.date}</td>
                  <td className="px-4 py-3 text-right">
                    {order.status === 'NEW' && (
                      <button
                        onClick={() => updateStatus(order.id, 'PACKED')}
                        className="text-xs font-medium text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Mark Packed
                      </button>
                    )}
                    {order.status === 'SHIPPED' && (
                      <button
                        onClick={() => updateStatus(order.id, 'DELIVERED')}
                        className="text-xs font-medium text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No orders found</p>
          </div>
        )}
      </div>

      {/* Cancel Policy Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm text-amber-700">
        <strong>Cancel Policy:</strong> Customers can cancel orders within 4 hours of placing. After that, cancellation is not allowed.
      </div>
    </div>
  );
}
