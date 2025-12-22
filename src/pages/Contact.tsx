import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, MessageCircle, Instagram, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll respond within 24-48 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | NaYarn</title>
        <meta name="description" content="Get in touch with NaYarn for questions about orders, custom pieces, or collaborations. We'd love to hear from you." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have a question, custom request, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* Contact Grid */}
        <section className="luxury-container mb-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Email Us</h3>
                </div>
                <p className="text-muted-foreground">
                  <a href="mailto:hello@nayarn.com" className="hover:text-primary transition-colors">
                    hello@nayarn.com
                  </a>
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  For order inquiries:{" "}
                  <a href="mailto:orders@nayarn.com" className="hover:text-primary transition-colors">
                    orders@nayarn.com
                  </a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Response Time</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24-48 hours during business days (Monday - Friday, 9AM - 6PM WAT).
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Quick Questions?</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  DM us on Instagram for faster responses on simple questions.
                </p>
                <a
                  href="https://instagram.com/nayarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Instagram className="w-4 h-4" />
                  @nayarn
                </a>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-medium mb-3">Custom Orders</h3>
                <p className="text-muted-foreground text-sm">
                  Interested in a custom piece or special collaboration? Include details about your vision 
                  in your message, and we'll get back to you with possibilities and pricing.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-12"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-primary">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[180px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="luxury" 
                  className="w-full md:w-auto px-12 h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FAQ Prompt */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted/30 rounded-lg p-8 text-center"
          >
            <h2 className="luxury-heading text-xl mb-4">Before You Reach Out</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Many questions are answered in our help section. Check out our guides for quick answers:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/shipping" className="text-primary hover:underline text-sm">
                Shipping & Returns
              </a>
              <span className="text-border">•</span>
              <a href="/size-guide" className="text-primary hover:underline text-sm">
                Size Guide
              </a>
              <span className="text-border">•</span>
              <a href="/care" className="text-primary hover:underline text-sm">
                Care Instructions
              </a>
              <span className="text-border">•</span>
              <a href="/track" className="text-primary hover:underline text-sm">
                Track Order
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
