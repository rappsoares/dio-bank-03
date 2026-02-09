import { api } from "../api";

export type LoginResponse =
  | { sucess: true; user: { id: string; name: string; email: string } }
  | { sucess: false; error: "email" | "password" | "both" };

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const data: any = await api;

  const isEmailValid = email === data.email;
  const isPasswordValid = password === data.password;

  if (!isEmailValid && isPasswordValid) return { sucess: false, error: "email" };
  if (isEmailValid && !isPasswordValid) return { sucess: false, error: "password" };
  if (!isEmailValid && !isPasswordValid) return { sucess: false, error: "both" };

  return {
    sucess: true,
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
    },
  };
};
