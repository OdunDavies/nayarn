import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ShopProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  collection_id: string | null;
  sizes: string[];
  is_featured: boolean;
  created_at: string;
  image: string;
  images: string[];
  category: string;
  isNew: boolean;
}

export interface ShopCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

// Fetch all products with their images
export const useShopProducts = () => {
  return useQuery({
    queryKey: ["shop-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (id, image_url, is_primary, display_order),
          collections (id, name, slug)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform to match expected format
      return data.map((product): ShopProduct => {
        const sortedImages = (product.product_images || []).sort(
          (a, b) => a.display_order - b.display_order
        );
        const primaryImage = sortedImages.find((img) => img.is_primary);
        const mainImage = primaryImage?.image_url || sortedImages[0]?.image_url || "";

        // Check if product is "new" (created within last 30 days)
        const isNew = new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: Number(product.price),
          collection_id: product.collection_id,
          sizes: product.sizes || [],
          is_featured: product.is_featured,
          created_at: product.created_at,
          image: mainImage,
          images: sortedImages.map((img) => img.image_url),
          category: product.collections?.slug || "uncategorized",
          isNew,
        };
      });
    },
  });
};

// Fetch single product by ID
export const useShopProduct = (id: string) => {
  return useQuery({
    queryKey: ["shop-products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (id, image_url, is_primary, display_order),
          collections (id, name, slug)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      const sortedImages = (data.product_images || []).sort(
        (a, b) => a.display_order - b.display_order
      );
      const primaryImage = sortedImages.find((img) => img.is_primary);
      const mainImage = primaryImage?.image_url || sortedImages[0]?.image_url || "";

      const isNew = new Date(data.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        collection_id: data.collection_id,
        sizes: data.sizes || [],
        is_featured: data.is_featured,
        created_at: data.created_at,
        image: mainImage,
        images: sortedImages.map((img) => img.image_url),
        category: data.collections?.slug || "uncategorized",
        isNew,
      } as ShopProduct;
    },
    enabled: !!id,
  });
};

// Fetch featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (id, image_url, is_primary, display_order),
          collections (id, name, slug)
        `)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;

      return data.map((product): ShopProduct => {
        const sortedImages = (product.product_images || []).sort(
          (a, b) => a.display_order - b.display_order
        );
        const primaryImage = sortedImages.find((img) => img.is_primary);
        const mainImage = primaryImage?.image_url || sortedImages[0]?.image_url || "";

        const isNew = new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: Number(product.price),
          collection_id: product.collection_id,
          sizes: product.sizes || [],
          is_featured: product.is_featured,
          created_at: product.created_at,
          image: mainImage,
          images: sortedImages.map((img) => img.image_url),
          category: product.collections?.slug || "uncategorized",
          isNew,
        };
      });
    },
  });
};

// Fetch all collections
export const useShopCollections = () => {
  return useQuery({
    queryKey: ["shop-collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as ShopCollection[];
    },
  });
};
