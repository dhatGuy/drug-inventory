import { useMutation } from "@tanstack/react-query";
import { ID } from "react-native-appwrite/src";

import { account } from "~/lib/appWrite";
import { useUserActions } from "~/store/authStore";

export const useCreateUser = () => {
  const { hydrate } = useUserActions();

  const createUser = async (email: string, password: string, name: string) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      hydrate();

      return newUser;
    } catch (error) {
      console.log("🚀 ~ createUser ~ error:", error);
      throw error;
    }
    // console.log("🚀 ~ createUser ~ response:", response);
  };

  return useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      createUser(email, password, name),
  });
};

export const useLoginUser = () => {
  const { hydrate } = useUserActions();
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      hydrate();
      return response;
    } catch (error) {
      console.log("🚀 ~ loginUser ~ error:", error);
      throw error;
    }
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
