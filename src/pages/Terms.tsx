import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | NaYarn</title>
        <meta name="description" content="NaYarn's terms of service outline the rules and guidelines for using our website and purchasing our handcrafted crochet products." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: December 1, 2024
            </p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-12">
              <div>
                <h2 className="luxury-heading text-2xl mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using NaYarn's website (nayarn.com) and purchasing our products, 
                  you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Products & Orders</h2>
                
                <h3 className="font-medium text-lg mt-6 mb-3">Handmade Nature</h3>
                <p className="text-muted-foreground mb-4">
                  All NaYarn products are handcrafted by skilled artisans. Due to the handmade nature 
                  of our products, slight variations in color, size, and pattern are normal and should 
                  be considered part of the unique character of each piece.
                </p>

                <h3 className="font-medium text-lg mt-6 mb-3">Made-to-Order</h3>
                <p className="text-muted-foreground mb-4">
                  Most of our products are made to order. Production time is typically 7-14 business 
                  days depending on the complexity of the piece. This time is in addition to shipping time.
                </p>

                <h3 className="font-medium text-lg mt-6 mb-3">Custom Sizing</h3>
                <p className="text-muted-foreground">
                  When you provide custom measurements, you are responsible for the accuracy of those 
                  measurements. Custom-sized items cannot be returned unless there is a manufacturing 
                  defect. We recommend reviewing our size guide carefully before ordering.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Pricing & Payment</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    All prices are displayed in Nigerian Naira (₦) or US Dollars ($) and include applicable taxes
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Shipping costs are calculated at checkout based on destination and method
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    We reserve the right to modify prices at any time without notice
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Payment must be received in full before production begins
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    We accept major credit cards, debit cards, and approved payment methods
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Shipping & Delivery</h2>
                <p className="text-muted-foreground mb-4">
                  Please refer to our <a href="/shipping" className="text-primary hover:underline">Shipping & Returns</a> page 
                  for detailed information about shipping zones, delivery times, and costs.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Delivery times are estimates and not guaranteed
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Risk of loss passes to you upon delivery to the carrier
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    You are responsible for any customs duties or import taxes
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Returns & Refunds</h2>
                <p className="text-muted-foreground mb-4">
                  Please review our complete <a href="/shipping" className="text-primary hover:underline">Returns Policy</a>. 
                  Key points include:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Returns accepted within 14 days of delivery for standard-sized items
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Items must be unworn, unwashed, and in original condition
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Custom-sized items are non-returnable unless defective
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Refunds are processed within 5-7 business days of receiving the return
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  All content on this website, including but not limited to text, graphics, logos, 
                  images, designs, and product photographs, is the property of NaYarn and is protected 
                  by copyright and other intellectual property laws.
                </p>
                <p className="text-muted-foreground">
                  Our crochet patterns and designs are proprietary. Purchasing a product does not 
                  grant any rights to reproduce or resell the design.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">User Conduct</h2>
                <p className="text-muted-foreground mb-4">When using our website, you agree not to:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Violate any applicable laws or regulations
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Provide false or misleading information
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Interfere with the operation of the website
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Attempt to gain unauthorized access to any systems
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Use the website for any commercial purpose without authorization
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, NaYarn shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages arising from your use of our 
                  website or products. Our total liability shall not exceed the amount you paid for the 
                  specific product giving rise to the claim.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Disclaimer of Warranties</h2>
                <p className="text-muted-foreground">
                  Our products are provided "as is" without any warranties, express or implied, except 
                  as specifically stated. We warrant that our products are free from manufacturing 
                  defects at the time of delivery. This warranty does not cover normal wear and tear, 
                  damage from improper care, or alterations.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms of Service shall be governed by and construed in accordance with the 
                  laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting to the website. Your continued use of the website after 
                  changes constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Severability</h2>
                <p className="text-muted-foreground">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions 
                  will continue in full force and effect.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-8">
                <h2 className="luxury-heading text-xl mb-4">Questions?</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:legal@nayarn.com" className="text-primary hover:underline">
                    legal@nayarn.com
                  </a>{" "}
                  or visit our{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact page
                  </a>.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Terms;
