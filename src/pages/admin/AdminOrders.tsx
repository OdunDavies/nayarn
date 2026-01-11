import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { Search, Package, Eye, ChevronDown } from "lucide-react";
import { useOrders, useUpdateOrderStatus, ORDER_STATUSES, getStatusColor } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tables, Json } from "@/integrations/supabase/types";

type Order = Tables<"orders">;

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size?: string;
}

const AdminOrders = () => {
  const { data: orders, isLoading } = useOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate({ orderId, status: newStatus });
  };

  const parseOrderItems = (items: Json): OrderItem[] => {
    if (Array.isArray(items)) {
      return items as unknown as OrderItem[];
    }
    return [];
  };

  return (
    <>
      <Helmet>
        <title>Orders | NaYarn Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="luxury-heading text-3xl mb-2">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and update their status
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40 flex-1" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer_email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${Number(order.total).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              <Badge className={`${getStatusColor(order.status)} cursor-pointer`}>
                                {ORDER_STATUSES.find((s) => s.value === order.status)?.label || order.status}
                                <ChevronDown className="h-3 w-3 ml-1" />
                              </Badge>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {ORDER_STATUSES.map((status) => (
                              <DropdownMenuItem
                                key={status.value}
                                onClick={() => handleStatusChange(order.id, status.value)}
                                disabled={order.status === status.value}
                              >
                                <Badge className={`${status.color} mr-2`}>
                                  {status.label}
                                </Badge>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {search || statusFilter !== "all"
                  ? "No orders found matching your filters"
                  : "No orders yet"}
              </p>
            </div>
          )}
        </div>

        {/* Order stats */}
        {orders && orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ORDER_STATUSES.slice(0, 4).map((status) => {
              const count = orders.filter((o) => o.status === status.value).length;
              return (
                <div
                  key={status.value}
                  className="bg-card border border-border rounded-sm p-4"
                >
                  <p className="text-sm text-muted-foreground">{status.label}</p>
                  <p className="text-2xl font-semibold">{count}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p>{format(new Date(selectedOrder.created_at), "PPP 'at' p")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {ORDER_STATUSES.find((s) => s.value === selectedOrder.status)?.label || selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">${Number(selectedOrder.total).toFixed(2)}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t border-border pt-4">
                <h3 className="font-medium mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p>{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p>{selectedOrder.customer_email}</p>
                  </div>
                  {selectedOrder.customer_phone && (
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p>{selectedOrder.customer_phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-border pt-4">
                <h3 className="font-medium mb-3">Shipping Address</h3>
                <p className="text-sm">
                  {selectedOrder.shipping_address}<br />
                  {selectedOrder.shipping_city}, {selectedOrder.shipping_state} {selectedOrder.shipping_zip}<br />
                  {selectedOrder.shipping_country}
                </p>
              </div>

              {/* Order Items */}
              <div className="border-t border-border pt-4">
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="space-y-3">
                  {parseOrderItems(selectedOrder.order_items).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <p>{item.productName}</p>
                        <p className="text-muted-foreground">
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                        </p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-border pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${Number(selectedOrder.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${Number(selectedOrder.shipping_cost).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${Number(selectedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="border-t border-border pt-4">
                  <h3 className="font-medium mb-2">Order Notes</h3>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Status Update */}
              <div className="border-t border-border pt-4">
                <h3 className="font-medium mb-3">Update Status</h3>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedOrder.id, value);
                    setSelectedOrder({ ...selectedOrder, status: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminOrders;
