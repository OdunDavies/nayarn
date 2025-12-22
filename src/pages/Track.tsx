import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Scissors, Truck, CheckCircle, Clock, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const orderStages = [
  {
    icon: Clock,
    title: "Order Confirmed",
    description: "Your order has been received and payment confirmed"
  },
  {
    icon: Scissors,
    title: "In Production",
    description: "Your piece is being handcrafted by our artisans (7-14 days)"
  },
  {
    icon: Package,
    title: "Quality Check",
    description: "Final inspection and careful packaging"
  },
  {
    icon: Truck,
    title: "Shipped",
    description: "On its way to you with tracking updates"
  },
  {
    icon: CheckCircle,
    title: "Delivered",
    description: "Enjoy your handcrafted NaYarn piece!"
  }
];

const Track = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) {
      toast({
        title: "Missing Information",
        description: "Please enter both your order number and email address.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Order Lookup",
      description: "This feature will be available once the store is live. Thank you for your patience!",
    });
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | NaYarn</title>
        <meta name="description" content="Track your NaYarn order status from production to delivery. Enter your order number to see real-time updates." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Track Your Order</h1>
            <p className="text-muted-foreground text-lg">
              Enter your order details below to see the status of your handcrafted piece.
            </p>
          </motion.div>
        </section>

        {/* Track Form */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                  Order Number
                </label>
                <Input
                  id="orderNumber"
                  type="text"
                  placeholder="e.g., NY-12345"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="The email used for your order"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button type="submit" variant="luxury" className="w-full h-12">
                <Search className="w-4 h-4 mr-2" />
                Track Order
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Can't find your order number? Check your order confirmation email or{" "}
              <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </motion.div>
        </section>

        {/* Order Stages */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="luxury-heading text-2xl text-center mb-12">Order Journey</h2>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

              <div className="space-y-8">
                {orderStages.map((stage, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start gap-6 md:gap-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                      <stage.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-8 md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-20" : "md:text-left md:pl-20"}`}>
                      <h3 className="font-display text-lg mb-2">{stage.title}</h3>
                      <p className="text-muted-foreground text-sm">{stage.description}</p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1 md:w-5/12" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted/30 rounded-lg p-8"
          >
            <h2 className="luxury-heading text-xl mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  q: "Why does production take 7-14 days?",
                  a: "Each piece is handcrafted to order. Depending on the complexity and size, a single garment can take 20-60 hours of skilled crochet work."
                },
                {
                  q: "My order shows 'In Production' for a week. Is this normal?",
                  a: "Yes! Complex pieces like dresses or sweaters require extensive work. This is not a delay—it's your artisan carefully crafting your unique piece."
                },
                {
                  q: "When will I receive tracking information?",
                  a: "You'll receive an email with tracking details as soon as your order ships. This is after the production phase is complete."
                },
                {
                  q: "Can I expedite my order?",
                  a: "Due to the handmade nature of our pieces, production time cannot be shortened. However, you can choose express shipping for faster delivery once complete."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Track;
