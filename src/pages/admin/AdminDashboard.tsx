import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Package, FolderOpen, Plus, ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCollections } from "@/hooks/useCollections";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: collections, isLoading: collectionsLoading } = useCollections();

  const recentProducts = products?.slice(0, 5) || [];

  return (
    <>
      <Helmet>
        <title>Dashboard | NaYarn Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="luxury-heading text-3xl mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-sm">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                {productsLoading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-3xl font-serif">{products?.length || 0}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-sm">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Collections</p>
                {collectionsLoading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-3xl font-serif">
                    {collections?.length || 0}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-sm">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                {productsLoading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-3xl font-serif">
                    {products?.filter((p) => p.is_featured).length || 0}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button variant="luxury" asChild>
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
          <Button variant="luxury-outline" asChild>
            <Link to="/admin/collections/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Collection
            </Link>
          </Button>
        </div>

        {/* Recent Products */}
        <div className="bg-card border border-border rounded-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-serif text-xl">Recent Products</h2>
            <Link
              to="/admin/products"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {productsLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-sm" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : recentProducts.length > 0 ? (
            <div className="divide-y divide-border">
              {recentProducts.map((product) => {
                const primaryImage = product.product_images?.find(
                  (img) => img.is_primary
                );
                return (
                  <Link
                    key={product.id}
                    to={`/admin/products/${product.id}`}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-12 w-12 bg-muted rounded-sm overflow-hidden">
                      {primaryImage ? (
                        <img
                          src={primaryImage.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                          <Package className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.collections?.name || "No collection"}
                      </p>
                    </div>
                    <p className="text-muted-foreground">${product.price}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              No products yet.{" "}
              <Link
                to="/admin/products/new"
                className="text-primary hover:underline"
              >
                Add your first product
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
