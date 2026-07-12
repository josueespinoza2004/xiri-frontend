import { registerAction } from "@/core/actions/auth/register.action";
import { RegisterRequest } from "@/infrastructure/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => registerAction(userData),
  });

  return { registerMutation };
};
