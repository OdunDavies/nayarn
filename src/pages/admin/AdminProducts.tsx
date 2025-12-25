import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Plus, Search, Trash2, Edit, Package } from "lucide-react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProducts = () => {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.collections?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Products | NaYarn Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="luxury-heading text-3xl mb-2">Products</h1>
            <p className="text-muted-foreground">
              Manage your product catalog
            </p>
          </div>
          <Button variant="luxury" asChild>
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-sm" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredProducts.map((product) => {
                const primaryImage = product.product_images?.find(
                  (img) => img.is_primary
                );
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-16 w-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                      {primaryImage ? (
                        <img
                          src={primaryImage.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                          <Package className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.collections?.name || "No collection"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {product.is_featured && (
                          <span className="text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-sm">
                            Featured
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {product.sizes?.length || 0} sizes
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-medium">
                      ${product.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/products/${product.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{product.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProduct.mutate(product.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                {search ? "No products found" : "No products yet"}
              </p>
              {!search && (
                <Button variant="luxury-outline" asChild>
                  <Link to="/admin/products/new">Add Your First Product</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
