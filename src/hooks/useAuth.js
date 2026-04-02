import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/sign-in", credentials);
      return response.data;
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/sign-out");
      return response.data;
    },
  });
};

export const useUsers = (search = "", page = 1) => {
  return useQuery({
    queryKey: ["users", search, page],
    queryFn: async () => {
      const response = await api.get("/users", {
        params: { search, page },
      });
      return response.data;
    },
    keepPreviousData: true,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/users", userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (passwordData) => {
      const response = await api.post("/users/change-password", passwordData);
      return response.data;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      if (!updateData.password) delete updateData.password;
      const response = await api.put(`/users/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
