import productDress from "@/assets/product-dress.jpg";
import productSweater from "@/assets/product-sweater.jpg";
import productBeach from "@/assets/product-beach.jpg";
import productAccessories from "@/assets/product-accessories.jpg";
import productSet from "@/assets/product-set.jpg";
import productShirt from "@/assets/product-shirt.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import heroImage from "@/assets/hero-crochet.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  gender: string;
  isNew: boolean;
  description: string;
  details: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ivory Lace Maxi Dress",
    price: 285,
    image: productDress,
    images: [productDress, productBeach, productSet],
    category: "dresses",
    gender: "women",
    isNew: true,
    description: "A stunning floor-length maxi dress featuring intricate ivory lace crochet work. Each piece is handcrafted over 40+ hours by skilled artisans using premium organic cotton yarn.",
    details: [
      "100% Organic Cotton",
      "Handcrafted over 40+ hours",
      "Floor-length silhouette",
      "Intricate lace pattern",
      "Lined slip included",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Terracotta Cable Sweater",
    price: 195,
    image: productSweater,
    images: [productSweater, productShirt, productJacket],
    category: "sweaters",
    gender: "unisex",
    isNew: true,
    description: "A cozy cable-knit sweater in rich terracotta hues. Features traditional cable patterns reimagined with modern proportions for a relaxed, elevated look.",
    details: [
      "100% Merino Wool",
      "Handcrafted over 25+ hours",
      "Relaxed fit",
      "Traditional cable pattern",
      "Ribbed cuffs and hem",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Coastal Cover-Up Set",
    price: 165,
    image: productBeach,
    images: [productBeach, productAccessories, productSet],
    category: "beach-wear",
    gender: "women",
    isNew: false,
    description: "An airy beach cover-up set perfect for coastal escapes. Delicate openwork crochet creates a beautiful play of light and shadow.",
    details: [
      "100% Cotton Blend",
      "Handcrafted over 20+ hours",
      "Includes top and skirt",
      "Open weave design",
      "Adjustable ties",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Sage Macramé Bag",
    price: 125,
    image: productAccessories,
    images: [productAccessories, productSet, productBeach],
    category: "accessories",
    gender: "unisex",
    isNew: false,
    description: "A beautiful macramé bag in soft sage tones. Features intricate knotwork and a spacious interior, perfect for everyday elegance.",
    details: [
      "100% Organic Cotton Cord",
      "Handcrafted over 15+ hours",
      "Interior lining included",
      "Magnetic closure",
      "Adjustable strap",
      "Spot clean only"
    ],
    sizes: ["One Size"]
  },
  {
    id: 5,
    name: "Cream Crochet Set",
    price: 245,
    image: productSet,
    images: [productSet, productDress, productBeach],
    category: "sets",
    gender: "women",
    isNew: true,
    description: "A coordinated two-piece set in creamy off-white. Features a cropped top with scalloped edges and matching high-waisted bottoms.",
    details: [
      "100% Pima Cotton",
      "Handcrafted over 35+ hours",
      "Includes top and bottom",
      "Scalloped edges",
      "Elastic waistband",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Navy Textured Shirt",
    price: 175,
    image: productShirt,
    images: [productShirt, productSweater, productJacket],
    category: "shirts",
    gender: "men",
    isNew: false,
    description: "A refined short-sleeve shirt in deep navy with textured crochet details. Perfect for elevated casual occasions.",
    details: [
      "100% Egyptian Cotton",
      "Handcrafted over 18+ hours",
      "Relaxed fit",
      "Button-front closure",
      "Textured pattern",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 7,
    name: "Black Lace Cardigan",
    price: 220,
    image: productJacket,
    images: [productJacket, productSweater, productShirt],
    category: "jackets",
    gender: "women",
    isNew: true,
    description: "An elegant open-front cardigan featuring delicate black lace crochet. A versatile layering piece that adds sophistication to any outfit.",
    details: [
      "100% Supima Cotton",
      "Handcrafted over 30+ hours",
      "Open front design",
      "Intricate lace pattern",
      "3/4 length sleeves",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Natural Crochet Midi",
    price: 265,
    image: heroImage,
    images: [heroImage, productDress, productSet],
    category: "dresses",
    gender: "women",
    isNew: false,
    description: "A midi-length dress in natural undyed cotton. Features a flattering A-line silhouette with intricate pattern work throughout.",
    details: [
      "100% Undyed Organic Cotton",
      "Handcrafted over 38+ hours",
      "Midi length",
      "A-line silhouette",
      "Lined bodice",
      "Hand wash cold, lay flat to dry"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  }
];

export const categories = [
  { value: "all", label: "All Products" },
  { value: "dresses", label: "Dresses" },
  { value: "sweaters", label: "Sweaters" },
  { value: "sets", label: "Sets" },
  { value: "beach-wear", label: "Beach Wear" },
  { value: "accessories", label: "Accessories" },
  { value: "shirts", label: "Shirts" },
  { value: "jackets", label: "Jackets" },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};
