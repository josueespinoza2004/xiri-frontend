import { getDepartmentsAction } from "@/core/actions/gastronomy/get-departments.action";
import { createDepartmentAction } from "@/core/actions/admin/create-department.action";
import { deleteDepartmentAction } from "@/core/actions/admin/delete-department.action";
import { updateDepartmentAction } from "@/core/actions/admin/update-department.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateParams {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

interface UpdateParams {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

export const useAdminDepartments = () => {
  const queryClient = useQueryClient();

  const departmentsQuery = useQuery({
    queryKey: ["gastronomy", "departments"],
    queryFn: getDepartmentsAction,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateParams) => createDepartmentAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gastronomy", "departments"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (params: UpdateParams) => updateDepartmentAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gastronomy", "departments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteDepartmentAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gastronomy", "departments"] });
    },
  });

  return {
    departmentsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
