import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, Ruler, Check, Loader2, Package } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useShopProduct, useShopProducts } from "@/hooks/useShopData";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useShopProduct(id || "");
  const { data: allProducts } = useShopProducts();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    length: "",
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="luxury-heading text-2xl mb-4">Product Not Found</h1>
            <Button variant="luxury-outline" asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const productImages = product.images.length > 0 ? product.images : [product.image].filter(Boolean);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      customMeasurements: showMeasurements ? measurements : undefined,
    }, quantity);
  };

  const relatedProducts = allProducts
    ?.filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4) || [];

  return (
    <>
      <Helmet>
        <title>{product.name} | NaYarn - Luxury Handmade Crochet Fashion</title>
        <meta
          name="description"
          content={product.description || `${product.name} - Handcrafted crochet fashion by NaYarn`}
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="luxury-container py-4 border-b border-border">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="py-10 lg:py-16">
          <div className="luxury-container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  {productImages.length > 0 && productImages[0] ? (
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        src={productImages[selectedImage]}
                        alt={`${product.name} - View ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="h-20 w-20" />
                    </div>
                  )}
                  
                  {/* Navigation Arrows */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* New Badge */}
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] tracking-widest uppercase px-3 py-1">
                      New
                    </span>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {productImages.length > 1 && (
                  <div className="flex gap-3">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-20 h-24 overflow-hidden transition-all ${
                          selectedImage === idx
                            ? "ring-2 ring-foreground"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:py-6"
              >
                <p className="luxury-subheading mb-2">
                  {product.category.replace("-", " ")}
                </p>
                <h1 className="luxury-heading text-3xl lg:text-4xl mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-serif mb-6">${product.price}</p>
                {product.description && (
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {product.description}
                  </p>
                )}

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Select Size</Label>
                      <Link
                        to="/size-guide"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                      >
                        Size Guide
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[3rem] h-12 px-4 border text-sm transition-all ${
                            selectedSize === size
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Measurements Toggle */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowMeasurements(!showMeasurements)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Ruler className="w-4 h-4" />
                    <span>{showMeasurements ? "Hide" : "Add"} Custom Measurements</span>
                    {showMeasurements && <Check className="w-4 h-4 text-primary" />}
                  </button>

                  <AnimatePresence>
                    {showMeasurements && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div>
                            <Label htmlFor="bust" className="text-xs text-muted-foreground">
                              Bust (inches)
                            </Label>
                            <Input
                              id="bust"
                              type="text"
                              placeholder="e.g., 36"
                              value={measurements.bust}
                              onChange={(e) =>
                                setMeasurements({ ...measurements, bust: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="waist" className="text-xs text-muted-foreground">
                              Waist (inches)
                            </Label>
                            <Input
                              id="waist"
                              type="text"
                              placeholder="e.g., 28"
                              value={measurements.waist}
                              onChange={(e) =>
                                setMeasurements({ ...measurements, waist: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="hips" className="text-xs text-muted-foreground">
                              Hips (inches)
                            </Label>
                            <Input
                              id="hips"
                              type="text"
                              placeholder="e.g., 38"
                              value={measurements.hips}
                              onChange={(e) =>
                                setMeasurements({ ...measurements, hips: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="length" className="text-xs text-muted-foreground">
                              Length (inches)
                            </Label>
                            <Input
                              id="length"
                              type="text"
                              placeholder="e.g., 42"
                              value={measurements.length}
                              onChange={(e) =>
                                setMeasurements({ ...measurements, length: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Custom measurements add 5-7 business days to production time.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <Label className="text-sm font-medium mb-3 block">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="luxury"
                  size="xl"
                  className="w-full mb-4"
                  onClick={handleAddToCart}
                  disabled={product.sizes.length > 0 && !selectedSize}
                >
                  {product.sizes.length > 0 && !selectedSize ? "Select a Size" : "Add to Cart"}
                </Button>

                {/* Product Details Accordion */}
                <Accordion type="single" collapsible className="border-t border-border">
                  <AccordionItem value="shipping">
                    <AccordionTrigger className="text-sm font-medium py-4">
                      Shipping & Returns
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Free shipping on orders over $200.</p>
                        <p>Handmade items ship within 7-14 business days.</p>
                        <p>Returns accepted within 14 days of delivery.</p>
                        <Link
                          to="/shipping"
                          className="text-foreground underline block mt-2"
                        >
                          Learn more about our shipping policy
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="care">
                    <AccordionTrigger className="text-sm font-medium py-4">
                      Care Instructions
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Hand wash in cold water with mild detergent.</p>
                        <p>Lay flat to dry – never hang or wring.</p>
                        <p>Store folded to maintain shape.</p>
                        <Link
                          to="/care"
                          className="text-foreground underline block mt-2"
                        >
                          View full care guide
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-border">
            <div className="luxury-container">
              <h2 className="luxury-heading text-2xl mb-10">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/shop/product/${item.id}`} className="block">
                      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Package className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-serif text-base group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;
