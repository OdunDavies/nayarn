import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCollectionInput {
  name: string;
  description?: string;
  image_url?: string;
  slug: string;
}

export interface UpdateCollectionInput extends Partial<CreateCollectionInput> {
  id: string;
}

export const useCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Collection[];
    },
  });
};

export const useCollection = (id: string) => {
  return useQuery({
    queryKey: ["collections", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Collection;
    },
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCollectionInput) => {
      const { data, error } = await supabase
        .from("collections")
        .insert(input)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create collection: ${error.message}`);
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateCollectionInput) => {
      const { data, error } = await supabase
        .from("collections")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update collection: ${error.message}`);
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("collections")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete collection: ${error.message}`);
    },
  });
};
