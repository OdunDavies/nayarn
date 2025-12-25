import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Plus, Search, Trash2, Edit, FolderOpen } from "lucide-react";
import { useCollections, useDeleteCollection } from "@/hooks/useCollections";
import { useProducts } from "@/hooks/useProducts";
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

const AdminCollections = () => {
  const { data: collections, isLoading } = useCollections();
  const { data: products } = useProducts();
  const deleteCollection = useDeleteCollection();
  const [search, setSearch] = useState("");

  const filteredCollections = collections?.filter((collection) =>
    collection.name.toLowerCase().includes(search.toLowerCase())
  );

  const getProductCount = (collectionId: string) => {
    return products?.filter((p) => p.collection_id === collectionId).length || 0;
  };

  return (
    <>
      <Helmet>
        <title>Collections | NaYarn Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="luxury-heading text-3xl mb-2">Collections</h1>
            <p className="text-muted-foreground">
              Organize your products into collections
            </p>
          </div>
          <Button variant="luxury" asChild>
            <Link to="/admin/collections/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Collection
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Collections Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-sm overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCollections && filteredCollections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="bg-card border border-border rounded-sm overflow-hidden group"
              >
                <div className="relative h-40 bg-muted">
                  {collection.image_url ? (
                    <img
                      src={collection.image_url}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <FolderOpen className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getProductCount(collection.id)} products
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/collections/${collection.id}`}>
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
                            <AlertDialogTitle>Delete Collection</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{collection.name}"?
                              Products in this collection will not be deleted but
                              will no longer be associated with a collection.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCollection.mutate(collection.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {collection.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-sm p-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              {search ? "No collections found" : "No collections yet"}
            </p>
            {!search && (
              <Button variant="luxury-outline" asChild>
                <Link to="/admin/collections/new">
                  Create Your First Collection
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCollections;
