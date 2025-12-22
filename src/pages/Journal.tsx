import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "The Art of Handmade: Why Crochet is the Future of Fashion",
    excerpt: "In an era of fast fashion, handcrafted pieces represent a return to intentionality and craftsmanship. Discover why crochet is experiencing a renaissance.",
    category: "Craftsmanship",
    date: "December 15, 2024",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Meet the Makers: Stories from Our Artisan Community",
    excerpt: "Go behind the scenes with the talented women who bring NaYarn pieces to life. Their stories of skill, dedication, and creativity inspire everything we do.",
    category: "Community",
    date: "December 8, 2024",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 3,
    title: "Styling Your Crochet Pieces for Every Season",
    excerpt: "From summer beach days to cozy winter layers, learn how to incorporate handcrafted crochet into your year-round wardrobe.",
    category: "Style Guide",
    date: "November 28, 2024",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 4,
    title: "The Journey of a NaYarn Piece: From Yarn to Wardrobe",
    excerpt: "Follow a crochet dress from the first stitch to its final destination. This photo essay documents the 40+ hours of love that goes into each creation.",
    category: "Behind the Scenes",
    date: "November 15, 2024",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 5,
    title: "Caring for Your Handmade Treasures",
    excerpt: "Expert tips on washing, storing, and maintaining your crochet pieces so they remain beautiful for years to come.",
    category: "Care Guide",
    date: "November 1, 2024",
    readTime: "3 min read",
    featured: false
  },
  {
    id: 6,
    title: "Winter 2025 Collection: A Sneak Peek",
    excerpt: "Get an exclusive first look at our upcoming winter collection, featuring rich textures, warm tones, and cozy silhouettes perfect for the season.",
    category: "Collections",
    date: "October 20, 2024",
    readTime: "4 min read",
    featured: false
  }
];

const categories = ["All", "Craftsmanship", "Community", "Style Guide", "Behind the Scenes", "Care Guide", "Collections"];

const Journal = () => {
  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <>
      <Helmet>
        <title>Journal | NaYarn</title>
        <meta name="description" content="Stories, styling tips, and behind-the-scenes glimpses into the world of handcrafted crochet fashion at NaYarn." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">The Journal</h1>
            <p className="text-muted-foreground text-lg">
              Stories of craft, creativity, and the community behind every stitch.
            </p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="luxury-container mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  index === 0
                    ? "bg-foreground text-background"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="luxury-container mb-16">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid md:grid-cols-2 gap-8 bg-primary/5 rounded-lg overflow-hidden"
            >
              <div className="aspect-[4/3] md:aspect-auto bg-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground/40 text-sm">Featured Image</span>
              </div>
              <div className="p-8 md:py-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                    Featured
                  </span>
                  <span>{featuredArticle.category}</span>
                </div>
                <h2 className="luxury-heading text-2xl md:text-3xl mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                    <span className="text-border">•</span>
                    {featuredArticle.readTime}
                  </div>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          </section>
        )}

        {/* Article Grid */}
        <section className="luxury-container mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                className="group"
              >
                <div className="aspect-[4/3] bg-muted/20 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                  <span className="text-muted-foreground/40 text-sm group-hover:scale-105 transition-transform duration-300">
                    Article Image
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="text-primary">{article.category}</span>
                  <span className="text-border">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-display text-lg mb-3 group-hover:text-primary transition-colors">
                  <Link to="#">{article.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {article.date}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-foreground text-background rounded-lg p-8 md:p-12 text-center"
          >
            <h2 className="font-display text-2xl mb-4">Never Miss a Story</h2>
            <p className="text-background/80 max-w-xl mx-auto mb-6">
              Subscribe to our newsletter for new articles, behind-the-scenes content, 
              and exclusive early access to new collections.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg hover:bg-background/90 transition-colors"
            >
              Subscribe Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Journal;
