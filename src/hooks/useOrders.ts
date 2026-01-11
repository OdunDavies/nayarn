import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders">;

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });
};

export const useOrder = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();

      if (error) throw error;
      return data as Order | null;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated");
    },
    onError: (error) => {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    },
  });
};

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "bg-yellow-500/10 text-yellow-600" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-500/10 text-blue-600" },
  { value: "processing", label: "Processing", color: "bg-purple-500/10 text-purple-600" },
  { value: "shipped", label: "Shipped", color: "bg-cyan-500/10 text-cyan-600" },
  { value: "delivered", label: "Delivered", color: "bg-green-500/10 text-green-600" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500/10 text-red-600" },
] as const;

export const getStatusColor = (status: string) => {
  const found = ORDER_STATUSES.find((s) => s.value === status);
  return found?.color || "bg-muted text-muted-foreground";
};
