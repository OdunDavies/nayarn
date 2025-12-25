import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { z } from "zod";
import {
  useCollection,
  useCreateCollection,
  useUpdateCollection,
} from "@/hooks/useCollections";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const collectionSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and dashes"),
  image_url: z.string().optional(),
});

const AdminCollectionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: existingCollection, isLoading: loadingCollection } =
    useCollection(id || "");
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (existingCollection) {
      setName(existingCollection.name);
      setDescription(existingCollection.description || "");
      setSlug(existingCollection.slug);
      setImageUrl(existingCollection.image_url || "");
    }
  }, [existingCollection]);

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEditing || !existingCollection?.slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `collections/${slug || "temp"}-${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(data.path);

      setImageUrl(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        name: name.trim(),
        description: description.trim() || undefined,
        slug: slug.trim(),
        image_url: imageUrl || undefined,
      };

      const result = collectionSchema.safeParse(formData);
      if (!result.success) {
        const errors = result.error.errors.map((e) => e.message).join(", ");
        toast.error(errors);
        setIsSubmitting(false);
        return;
      }

      if (isEditing) {
        await updateCollection.mutateAsync({ id, ...formData });
      } else {
        await createCollection.mutateAsync(formData);
      }

      navigate("/admin/collections");
    } catch (error) {
      console.error("Error saving collection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && loadingCollection) {
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
          {isEditing ? "Edit Collection" : "New Collection"} | NaYarn Admin
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-2xl">
        <div className="mb-6">
          <Link
            to="/admin/collections"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collections
          </Link>
          <h1 className="luxury-heading text-3xl">
            {isEditing ? "Edit Collection" : "New Collection"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card border border-border rounded-sm p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Collection Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Summer Collection"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                placeholder="e.g. summer-collection"
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be used in URLs: /shop/{slug || "your-slug"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this collection..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Collection Image</Label>
              {imageUrl ? (
                <div className="relative w-full max-w-sm">
                  <img
                    src={imageUrl}
                    alt="Collection"
                    className="w-full aspect-video object-cover rounded-sm"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setImageUrl("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed border-border rounded-sm cursor-pointer hover:border-muted-foreground transition-colors">
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
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
                "Update Collection"
              ) : (
                "Create Collection"
              )}
            </Button>
            <Button
              type="button"
              variant="luxury-outline"
              onClick={() => navigate("/admin/collections")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminCollectionForm;
