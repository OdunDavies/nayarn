import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Our Story", href: "/about" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Free Shipping Banner */}
      <div className="bg-foreground text-background py-2.5 text-center">
        <p className="text-xs tracking-widest uppercase font-light">
          Complimentary Shipping on Orders Over $150
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="luxury-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="luxury-link text-xs tracking-widest uppercase font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-serif text-2xl lg:text-3xl tracking-wide">
                NaYarn
              </h1>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:opacity-70 transition-opacity" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
              <button className="hidden sm:block p-2 hover:opacity-70 transition-opacity" aria-label="Account">
                <User className="h-5 w-5" />
              </button>
              <button className="p-2 hover:opacity-70 transition-opacity relative" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[6.5rem] z-40 bg-background"
          >
            <nav className="luxury-container py-10">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="text-2xl font-serif tracking-wide"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-border"
                >
                  <Link
                    to="/account"
                    className="text-sm tracking-widest uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
