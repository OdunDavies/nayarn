import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Truck, RefreshCw, Clock, Globe, Package } from "lucide-react";

const shippingZones = [
  {
    zone: "Nigeria (Lagos)",
    standard: "3-5 business days",
    express: "1-2 business days",
    standardCost: "₦3,500",
    expressCost: "₦7,000"
  },
  {
    zone: "Nigeria (Other States)",
    standard: "5-7 business days",
    express: "2-3 business days",
    standardCost: "₦5,000",
    expressCost: "₦10,000"
  },
  {
    zone: "West Africa",
    standard: "7-14 business days",
    express: "5-7 business days",
    standardCost: "$25",
    expressCost: "$45"
  },
  {
    zone: "International",
    standard: "14-21 business days",
    express: "7-10 business days",
    standardCost: "$40",
    expressCost: "$75"
  }
];

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping & Returns | NaYarn</title>
        <meta name="description" content="Learn about NaYarn's shipping policies, delivery times, and return process for handcrafted crochet fashion." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Shipping & Returns</h1>
            <p className="text-muted-foreground text-lg">
              Every NaYarn piece is handcrafted with care. Please allow additional time for creation before shipping.
            </p>
          </motion.div>
        </section>

        {/* Production Time Notice */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center"
          >
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="luxury-heading text-2xl mb-3">Handmade Production Time</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each piece is crafted to order, taking <strong className="text-foreground">7-14 business days</strong> to create, 
              depending on complexity. Shipping times begin after production is complete.
            </p>
          </motion.div>
        </section>

        {/* Free Shipping Banner */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-foreground text-background rounded-lg p-8 text-center"
          >
            <Truck className="w-10 h-10 mx-auto mb-4" />
            <h3 className="font-display text-xl mb-2">Free Shipping</h3>
            <p className="text-background/80">
              On all orders over ₦100,000 (Nigeria) or $150 (International)
            </p>
          </motion.div>
        </section>

        {/* Shipping Zones Table */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="luxury-heading text-2xl">Shipping Zones & Rates</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-medium">Destination</th>
                    <th className="text-left py-4 px-4 font-medium">Standard Delivery</th>
                    <th className="text-left py-4 px-4 font-medium">Standard Cost</th>
                    <th className="text-left py-4 px-4 font-medium">Express Delivery</th>
                    <th className="text-left py-4 px-4 font-medium">Express Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{zone.zone}</td>
                      <td className="py-4 px-4 text-muted-foreground">{zone.standard}</td>
                      <td className="py-4 px-4">{zone.standardCost}</td>
                      <td className="py-4 px-4 text-muted-foreground">{zone.express}</td>
                      <td className="py-4 px-4">{zone.expressCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* Returns Policy */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-6 h-6 text-primary" />
                <h2 className="luxury-heading text-2xl">Returns & Exchanges</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We want you to love your NaYarn piece. If you're not completely satisfied, 
                  we accept returns within <strong className="text-foreground">14 days</strong> of delivery.
                </p>
                <p>
                  Items must be unworn, unwashed, and in original condition with tags attached. 
                  Due to the handmade nature of our pieces, we cannot accept returns on custom-sized items 
                  unless there is a manufacturing defect.
                </p>
                <p>
                  For exchanges, please contact us within 7 days of receiving your order. 
                  We'll work with you to ensure you get the perfect fit.
                </p>
              </div>
            </div>

            <div>
              <h3 className="luxury-heading text-xl mb-6">Return Process</h3>
              <ol className="space-y-4">
                {[
                  "Email us at returns@nayarn.com with your order number",
                  "Receive your return authorization and shipping label",
                  "Pack your item securely in its original packaging",
                  "Ship within 7 days of authorization",
                  "Refund processed within 5-7 business days of receipt"
                ].map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </section>

        {/* Non-Returnable Items */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-muted/30 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="luxury-heading text-xl">Non-Returnable Items</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Custom-sized pieces (unless defective)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Items marked as final sale
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Worn, washed, or altered items
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Items without original tags
              </li>
            </ul>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Shipping;
