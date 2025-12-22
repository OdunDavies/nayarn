import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Thank you for subscribing!", {
      description: "You'll be the first to know about new collections and exclusive offers.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-xs tracking-widest uppercase mb-4 text-background/70">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-4">
            Join the NaYarn Family
          </h2>
          <p className="text-background/70 mb-10">
            Be the first to discover new collections, exclusive offers, and behind-the-scenes 
            glimpses into our craft.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-background/30 text-background placeholder:text-background/50 focus:border-background h-12"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-background text-foreground hover:bg-background/90 tracking-widest uppercase text-xs font-medium h-12 px-8"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-background/50 mt-6">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
