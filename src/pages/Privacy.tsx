import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | NaYarn</title>
        <meta name="description" content="NaYarn's privacy policy explains how we collect, use, and protect your personal information." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Privacy Policy</h1>
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
            className="max-w-3xl mx-auto prose prose-neutral"
          >
            <div className="space-y-12">
              <div>
                <h2 className="luxury-heading text-2xl mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  At NaYarn ("we," "our," or "us"), we are committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you visit our website nayarn.com and make purchases from us.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Information We Collect</h2>
                <h3 className="font-medium text-lg mt-6 mb-3">Personal Information</h3>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly, including:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Name and contact information (email, phone, address)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Billing and shipping addresses
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Payment information (processed securely through our payment provider)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Body measurements (for custom sizing)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Communication preferences
                  </li>
                </ul>

                <h3 className="font-medium text-lg mt-6 mb-3">Automatically Collected Information</h3>
                <p className="text-muted-foreground">
                  When you visit our site, we automatically collect device information, browser type, 
                  IP address, pages visited, and referring URLs through cookies and similar technologies.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">How We Use Your Information</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Process and fulfill your orders
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Create custom-sized garments based on your measurements
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Send order confirmations and shipping updates
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Respond to your inquiries and provide customer support
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Send marketing communications (with your consent)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Improve our website and services
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Prevent fraud and ensure security
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <strong className="text-foreground">Service Providers:</strong> Payment processors, shipping carriers, and email services
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <strong className="text-foreground">Artisans:</strong> Measurements shared for custom sizing (no contact information)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Cookies & Tracking</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Remember your preferences and cart contents
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Analyze site traffic and usage patterns
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Personalize your experience
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You can control cookies through your browser settings. Note that disabling cookies 
                  may affect site functionality.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information. Payment information is encrypted and processed through 
                  secure, PCI-compliant payment processors. We never store full credit card details 
                  on our servers.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Access the personal information we hold about you
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Request correction of inaccurate information
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Request deletion of your information (subject to legal requirements)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    Opt out of marketing communications at any time
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, contact us at privacy@nayarn.com.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary to fulfill the purposes 
                  outlined in this policy, unless a longer retention period is required by law. Order 
                  information is retained for accounting and legal purposes.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">International Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than your 
                  own. We ensure appropriate safeguards are in place for such transfers.
                </p>
              </div>

              <div>
                <h2 className="luxury-heading text-2xl mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-8">
                <h2 className="luxury-heading text-xl mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p>Email: privacy@nayarn.com</p>
                  <p>General inquiries: hello@nayarn.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Privacy;
