import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useAddProductImage,
  useDeleteProductImage,
} from "@/hooks/useProducts";
import { useCollections } from "@/hooks/useCollections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ImageUploader from "@/components/admin/ImageUploader";
import { Link } from "react-router-dom";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  description: z.string().max(2000, "Description is too long").optional(),
  price: z.number().min(0, "Price must be positive"),
  collection_id: z.string().nullable().optional(),
  sizes: z.array(z.string()),
  is_featured: z.boolean(),
});

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: existingProduct, isLoading: loadingProduct } = useProduct(
    id || ""
  );
  const { data: collections } = useCollections();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const addProductImage = useAddProductImage();
  const deleteProductImage = useDeleteProductImage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [sizes, setSizes] = useState<string[]>(["S", "M", "L", "XL", "XXL"]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<
    { id?: string; url: string; isPrimary?: boolean }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setDescription(existingProduct.description || "");
      setPrice(existingProduct.price.toString());
      setCollectionId(existingProduct.collection_id);
      setSizes(existingProduct.sizes || []);
      setIsFeatured(existingProduct.is_featured);
      setImages(
        existingProduct.product_images?.map((img) => ({
          id: img.id,
          url: img.image_url,
          isPrimary: img.is_primary,
        })) || []
      );
    }
  }, [existingProduct]);

  const handleSizeToggle = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        name: name.trim(),
        description: description.trim() || undefined,
        price: parseFloat(price),
        collection_id: collectionId || null,
        sizes,
        is_featured: isFeatured,
      };

      const result = productSchema.safeParse(formData);
      if (!result.success) {
        const errors = result.error.errors.map((e) => e.message).join(", ");
        toast.error(errors);
        setIsSubmitting(false);
        return;
      }

      let productId = id;

      if (isEditing) {
        await updateProduct.mutateAsync({ id, ...formData });

        // Handle image changes
        const existingImageIds = existingProduct?.product_images?.map(
          (img) => img.id
        ) || [];
        const currentImageIds = images
          .filter((img) => img.id)
          .map((img) => img.id);

        // Delete removed images
        const imagesToDelete = existingImageIds.filter(
          (imgId) => !currentImageIds.includes(imgId)
        );
        for (const imgId of imagesToDelete) {
          await deleteProductImage.mutateAsync(imgId!);
        }

        // Add new images
        const newImages = images.filter((img) => !img.id);
        for (let i = 0; i < newImages.length; i++) {
          await addProductImage.mutateAsync({
            productId: id,
            imageUrl: newImages[i].url,
            isPrimary: newImages[i].isPrimary,
            displayOrder: currentImageIds.length + i,
          });
        }
      } else {
        const result = await createProduct.mutateAsync(formData);
        productId = result.id;

        // Add images to new product
        for (let i = 0; i < images.length; i++) {
          await addProductImage.mutateAsync({
            productId: result.id,
            imageUrl: images[i].url,
            isPrimary: images[i].isPrimary,
            displayOrder: i,
          });
        }
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && loadingProduct) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isEditing ? "Edit Product" : "New Product"} | NaYarn Admin
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-4xl">
        <div className="mb-6">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="luxury-heading text-3xl">
            {isEditing ? "Edit Product" : "New Product"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card border border-border rounded-sm p-6 space-y-6">
            <h2 className="font-medium text-lg">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ivory Lace Maxi Dress"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collection">Collection</Label>
              <Select
                value={collectionId || "none"}
                onValueChange={(value) =>
                  setCollectionId(value === "none" ? null : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Collection</SelectItem>
                  {collections?.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-card border border-border rounded-sm p-6 space-y-4">
            <h2 className="font-medium text-lg">Available Sizes</h2>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_SIZES.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={sizes.includes(size)}
                    onCheckedChange={() => handleSizeToggle(size)}
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-card border border-border rounded-sm p-6 space-y-4">
            <h2 className="font-medium text-lg">Product Images</h2>
            <ImageUploader
              images={images}
              onImagesChange={setImages}
              productId={id}
            />
          </div>

          {/* Options */}
          <div className="bg-card border border-border rounded-sm p-6 space-y-4">
            <h2 className="font-medium text-lg">Options</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(!!checked)}
              />
              <div>
                <span className="font-medium">Featured Product</span>
                <p className="text-sm text-muted-foreground">
                  Display this product on the homepage
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              variant="luxury"
              disabled={isSubmitting}
              className="min-w-32"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : isEditing ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
            <Button
              type="button"
              variant="luxury-outline"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProductForm;
