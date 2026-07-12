import { loginAction } from "@/core/actions/auth/login.action";
import { LoginRequest } from "@/infrastructure/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => loginAction(credentials),
  });

  return { loginMutation };
};
