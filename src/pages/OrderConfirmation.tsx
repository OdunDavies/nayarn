import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total: number;
  created_at: string;
}

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("id, customer_name, customer_email, total, created_at")
        .eq("id", orderId)
        .single();

      if (error || !data) {
        console.error("Error fetching order:", error);
        navigate("/");
        return;
      }

      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Order Confirmed | Mère et Fille</title>
        <meta name="description" content="Your order has been confirmed. Thank you for shopping with Mère et Fille." />
      </Helmet>
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl mb-4">
              Thank You for Your Order!
            </h1>

            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your order has been received and is being prepared with care by our artisans.
            </p>

            <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono font-medium">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Total</p>
                  <p className="font-medium">${Number(order.total).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmation Email</p>
                  <p className="font-medium">{order.customer_email}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-background border rounded-lg p-6 text-left">
                <Mail className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email to {order.customer_email} with your order details.
                </p>
              </div>
              <div className="bg-background border rounded-lg p-6 text-left">
                <Package className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">Handcrafted with Love</h3>
                <p className="text-sm text-muted-foreground">
                  Please allow 2-3 weeks for your order to be carefully crafted and shipped.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/shop")}>
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => navigate("/track")}>
                Track Your Order
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
