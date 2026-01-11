import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerEmail: z.string().email("Invalid email address").max(255),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(5, "Please enter a valid address").max(500),
  shippingCity: z.string().min(2, "Please enter a city").max(100),
  shippingState: z.string().min(2, "Please enter a state/province").max(100),
  shippingZip: z.string().min(3, "Please enter a valid postal code").max(20),
  shippingCountry: z.string().min(2, "Please select a country"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "JP", name: "Japan" },
];

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 15;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + shippingCost;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",
      shippingCountry: "US",
      notes: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        product_id: item.productId,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        size: item.size,
        custom_measurements: item.customMeasurements,
      }));

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone || null,
          shipping_address: data.shippingAddress,
          shipping_city: data.shippingCity,
          shipping_state: data.shippingState,
          shipping_zip: data.shippingZip,
          shipping_country: data.shippingCountry,
          order_items: orderItems,
          subtotal: totalPrice,
          shipping_cost: shippingCost,
          total: orderTotal,
          notes: data.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const { error: itemsError } = await supabase.from("order_items").insert(
        orderItems.map((item) => ({
          order_id: order.id,
          product_id: typeof item.product_id === 'string' ? item.product_id : undefined,
          product_name: item.product_name,
          product_price: item.product_price,
          quantity: item.quantity,
          size: item.size,
          custom_measurements: item.custom_measurements,
        }))
      );

      if (itemsError) {
        console.error("Error inserting order items:", itemsError);
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke(
        "send-order-confirmation",
        {
          body: {
            orderId: order.id,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            orderItems: orderItems,
            subtotal: totalPrice,
            shippingCost: shippingCost,
            total: orderTotal,
            shippingAddress: data.shippingAddress,
            shippingCity: data.shippingCity,
            shippingState: data.shippingState,
            shippingZip: data.shippingZip,
            shippingCountry: data.shippingCountry,
          },
        }
      );

      if (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Checkout | Mère et Fille</title>
        </Helmet>
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-display text-2xl mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some beautiful handcrafted pieces to your cart.
            </p>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Checkout | Mère et Fille</title>
        <meta name="description" content="Complete your order for handcrafted crochet pieces." />
      </Helmet>
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-4xl mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="font-display text-xl">Contact Information</h2>
                      
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                      <h2 className="font-display text-xl">Shipping Address</h2>

                      <FormField
                        control={form.control}
                        name="shippingAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street, Apt 4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shippingCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shippingState"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State / Province</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shippingZip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shippingCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {COUNTRIES.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                      <h2 className="font-display text-xl">Additional Notes</h2>
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special requests or notes for your order..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Place Order - $${orderTotal.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-8 h-fit">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h2 className="font-display text-xl mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                  {items.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          {item.size && (
                            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          )}
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shippingCost > 0 ? (
                          `$${shippingCost.toFixed(2)}`
                        ) : (
                          <span className="text-green-600">Free</span>
                        )}
                      </span>
                    </div>
                    {totalPrice < FREE_SHIPPING_THRESHOLD && (
                      <p className="text-sm text-muted-foreground">
                        Add ${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} more for free shipping
                      </p>
                    )}
                    <div className="flex justify-between text-lg font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
