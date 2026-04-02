import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const usePortalLinks = (search = "", page = 1) => {
  return useQuery({
    queryKey: ["portal-links", search, page],
    queryFn: async () => {
      const response = await api.get("/portal-links", {
        params: { search, page },
      });
      return response.data; 
    },
    keepPreviousData: true,
  });
};

export const useCreatePortalLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData) => {
      const response = await api.post("/portal-links", newData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-links"] });
    },
  });
};

export const useUpdatePortalLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const response = await api.put(`/portal-links/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-links"] });
    },
  });
};

export const useDeletePortalLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/portal-links/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-links"] });
    },
  });
};
