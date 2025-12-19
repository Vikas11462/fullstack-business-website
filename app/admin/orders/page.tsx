'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, CheckCircle, Clock, XCircle, Truck, Search, User, MapPin, Phone } from 'lucide-react';

type OrderItem = {
    id: string;
    quantity: number;
    price: number;
    product: {
        name: string;
    };
};

type Order = {
    id: string;
    created_at: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    total_amount: number;
    status: string;
    items?: OrderItem[];
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // 1. Fetch orders
            const { data: dbOrders, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (ordersError) throw ordersError;

            // 2. Fetch Order Items manually (avoiding join issues)
            const orderIds = dbOrders?.map((o: any) => o.id) || [];
            const validOrderIds = orderIds.filter((id: string) =>
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
            );

            let orderItems: any[] = [];

            if (validOrderIds.length > 0) {
                const { data: itemsData, error: itemsError } = await supabase
                    .from('order_items')
                    .select('*')
                    .in('order_id', validOrderIds);

                if (itemsError) throw itemsError;
                orderItems = itemsData || [];
            }

            // 3. Collect Product IDs from items
            const productIds = new Set<string>();
            orderItems.forEach((item: any) => {
                if (item.product_id) productIds.add(item.product_id);
            });

            // 4. Fetch Products
            const validProductIds = Array.from(productIds).filter(id =>
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
            );

            let productsMap: Record<string, any> = {};
            if (validProductIds.length > 0) {
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('id, name')
                    .in('id', validProductIds);

                if (productsError) throw productsError;

                productsData?.forEach(p => {
                    productsMap[p.id] = p;
                });
            }

            // 5. Map everything together
            const ordersWithDetails = dbOrders?.map((order: any) => {
                // Find items for this order
                const myItems = orderItems.filter((item: any) => item.order_id === order.id);

                // Map product details to items
                const myItemsWithProducts = myItems.map((item: any) => {
                    const product = productsMap[item.product_id];
                    return {
                        ...item,
                        product: {
                            name: product?.name || 'Unknown Product'
                        }
                    };
                });

                return {
                    ...order,
                    items: myItemsWithProducts
                };
            });

            setOrders(ordersWithDetails || []);

        } catch (err: any) {
            console.error('Error fetching orders:', err, err.message);
            setError(err.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            alert('Failed to update status');
        } else {
            fetchOrders(); // Refresh
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'processing': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200'; // Pending
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            case 'shipped': return <Truck className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const filteredOrders = orders.filter(order => {
        const query = searchQuery.toLowerCase();
        return (
            order.id.toLowerCase().includes(query) ||
            order.customer_name?.toLowerCase().includes(query) ||
            order.customer_phone?.includes(query)
        );
    });

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="text-primary animate-pulse">Loading orders...</div>
        </div>
    );

    return (
        <div className="space-y-8 p-4 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-primary">Orders Management</h1>
                    <p className="text-muted-foreground mt-1">View and manage customer orders.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search Order ID, Name, Phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                </div>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 p-4 text-red-600 border border-red-100">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                            {/* Card Header */}
                            <div className="flex flex-col gap-4 border-b border-gray-50 bg-gray-50/50 px-6 py-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-white p-2 shadow-sm border border-gray-100 text-xs font-mono font-bold text-gray-500">
                                        #{order.id.slice(0, 8)}
                                    </div>
                                    <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                    <span className="hidden text-sm text-gray-400 md:inline">|</span>
                                    <span className="text-sm font-medium text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium text-gray-500">Status:</label>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="rounded-lg border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-6 p-6 lg:grid-cols-3">
                                {/* Customer Info */}
                                <div className="lg:col-span-1 space-y-4 border-r border-gray-100 pr-6">
                                    <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                                        <User className="h-4 w-4 text-primary" />
                                        Customer Details
                                    </h3>
                                    <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <User className="h-4 w-4 mt-0.5 text-gray-400" />
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer_name || 'N/A'}</p>
                                                <p className="text-xs text-gray-500">Name</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="h-4 w-4 mt-0.5 text-gray-400" />
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer_phone || 'N/A'}</p>
                                                <p className="text-xs text-gray-500">Phone</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer_address || 'N/A'}</p>
                                                <p className="text-xs text-gray-500">Address</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                                        <Package className="h-4 w-4 text-primary" />
                                        Order Items
                                    </h3>
                                    <div className="rounded-lg border border-gray-100 overflow-hidden">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium">Product</th>
                                                    <th className="px-4 py-3 font-medium text-center">Qty</th>
                                                    <th className="px-4 py-3 font-medium text-right">Price</th>
                                                    <th className="px-4 py-3 font-medium text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {order.items?.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50/50">
                                                        <td className="px-4 py-3 font-medium text-gray-900">
                                                            {item.product?.name || <span className="text-red-400 italic">Unknown Product ({item.id})</span>}
                                                        </td>
                                                        <td className="px-4 py-3 text-center text-gray-600">{item.quantity}</td>
                                                        <td className="px-4 py-3 text-right text-gray-600">₹{item.price}</td>
                                                        <td className="px-4 py-3 text-right font-medium text-gray-900">₹{item.price * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-gray-50 font-semibold text-gray-900">
                                                <tr>
                                                    <td colSpan={3} className="px-4 py-3 text-right">Total Amount</td>
                                                    <td className="px-4 py-3 text-right text-primary">₹{order.total_amount}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                        <div className="mb-4 rounded-full bg-gray-100 p-4">
                            <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No orders found</h3>
                        <p className="max-w-xs text-sm text-gray-500">
                            {searchQuery ? `No orders found matching "${searchQuery}"` : "Wait for your first customer order!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
