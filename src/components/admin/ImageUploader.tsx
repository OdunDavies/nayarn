import { useState, useCallback } from "react";
import { Upload, X, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  images: {
    id?: string;
    url: string;
    isPrimary?: boolean;
  }[];
  onImagesChange: (
    images: { id?: string; url: string; isPrimary?: boolean }[]
  ) => void;
  productId?: string;
  folder?: string;
}

const ImageUploader = ({
  images,
  onImagesChange,
  productId,
  folder = "products",
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${productId || "temp"}-${Date.now()}.${fileExt}`;

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

    return publicUrl;
  };

  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setUploading(true);

      try {
        const uploadPromises = Array.from(files).map(async (file) => {
          // Validate file type
          if (!file.type.startsWith("image/")) {
            throw new Error(`${file.name} is not an image file`);
          }

          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`${file.name} is too large. Maximum size is 5MB`);
          }

          const url = await uploadFile(file);
          return { url, isPrimary: images.length === 0 };
        });

        const newImages = await Promise.all(uploadPromises);
        onImagesChange([...images, ...newImages]);
        toast.success(`${files.length} image(s) uploaded successfully`);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to upload images"
        );
      } finally {
        setUploading(false);
      }
    },
    [images, onImagesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // If we removed the primary image, make the first one primary
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    onImagesChange(newImages);
  };

  const setPrimaryImage = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-sm p-8 text-center transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground",
          uploading && "opacity-50 pointer-events-none"
        )}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop images here, or
            </p>
            <label className="cursor-pointer">
              <span className="text-sm text-primary hover:underline">
                click to browse
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum 5MB per image
            </p>
          </>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={cn(
                "relative aspect-square bg-muted rounded-sm overflow-hidden group",
                image.isPrimary && "ring-2 ring-primary"
              )}
            >
              <img
                src={image.url}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Primary Badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm">
                  Primary
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!image.isPrimary && (
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    onClick={() => setPrimaryImage(index)}
                    title="Set as primary"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => removeImage(index)}
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
