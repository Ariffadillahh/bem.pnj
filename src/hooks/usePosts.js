import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const usePosts = (params = {}) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const response = await api.get("/posts", { params });
      return response.data;
    },
  });
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await api.get(`/posts/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useGlobalSearch = (query) => {
  return useQuery({
    queryKey: ["globalSearch", query],
    queryFn: async () => {
      if (!query || query.trim().length < 2) return [];

      const response = await api.get(`/search?q=${query}`);
      return response.data.data;
    },
    enabled: !!query && query.trim().length >= 2,
    staleTime: 1000 * 60 * 5, 
  });
};
