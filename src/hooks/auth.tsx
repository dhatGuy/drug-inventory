import { useMutation } from "@tanstack/react-query";
import { ID } from "react-native-appwrite/src";

import { account } from "~/lib/appWrite";
import { useUserActions } from "~/store/authStore";

export const useCreateUser = () => {
  const { setUser } = useUserActions();

  const createUser = async (email: string, password: string, name: string) => {
    await account.create(ID.unique(), email, password, name);
    const response = await account.createEmailPasswordSession(email, password);
    setUser(response);
    // console.log("🚀 ~ createUser ~ response:", response);

    return response;
  };

  return useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      createUser(email, password, name),
  });
};

export const useLoginUser = () => {
  const loginUser = async (email: string, password: string) => {
    const response = await account.createEmailPasswordSession(email, password);
    // console.log("🚀 ~ loginUser ~ response:", response);
    return response;
  };

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};

export const useLogoutUser = () => {
  const logoutUser = async () => {
    const response = await account.deleteSession("current");
    // console.log("🚀 ~ logoutUser ~ response:", response);
    return response;
  };

  return useMutation({
    mutationFn: () => logoutUser(),
  });
};
