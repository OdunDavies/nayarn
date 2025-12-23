import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Filter, Grid3X3, LayoutGrid } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/data/products";

const Shop = () => {
  const { category: urlCategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
  const [sortBy, setSortBy] = useState("newest");
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
      default:
        return b.isNew ? 1 : -1;
    }
  });

  const categoryTitle = categories.find(c => c.value === selectedCategory)?.label || "All Products";

  return (
    <>
      <Helmet>
        <title>{categoryTitle} | NaYarn - Luxury Handmade Crochet Fashion</title>
        <meta
          name="description"
          content={`Explore NaYarn's ${categoryTitle.toLowerCase()}. Each piece is meticulously handcrafted with premium yarn and dedicated craftsmanship.`}
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Page Header */}
        <section className="py-16 lg:py-24 border-b border-border">
          <div className="luxury-container text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-subheading mb-3"
            >
              Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="luxury-heading text-4xl lg:text-5xl"
            >
              {categoryTitle}
            </motion.h1>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-10">
          <div className="luxury-container">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
              <div className="flex items-center gap-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 border-none bg-transparent focus:ring-0 text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 border-none bg-transparent focus:ring-0 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden lg:flex items-center gap-2 border-l border-border pl-4">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-2 ${gridCols === 3 ? "text-foreground" : "text-muted-foreground"}`}
                    aria-label="3 columns"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-2 ${gridCols === 4 ? "text-foreground" : "text-muted-foreground"}`}
                    aria-label="4 columns"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              } gap-8`}
            >
              {sortedProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/shop/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.isNew && (
                        <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] tracking-widest uppercase px-3 py-1">
                          New
                        </span>
                      )}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <Button variant="luxury" className="w-full" size="sm">
                          Quick Add
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                        {product.category.replace("-", " ")}
                      </p>
                      <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground">${product.price}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products found in this category.</p>
                <Button variant="luxury-outline" onClick={() => setSelectedCategory("all")}>
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Shop;
