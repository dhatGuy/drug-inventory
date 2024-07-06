import { Models } from "react-native-appwrite/src";
import { create } from "zustand";

import { account } from "~/lib/appWrite";

type AuthState = {
  status: "idle" | "authenticated" | "unauthenticated";
  user: Models.User<Models.Preferences> | null;
  actions: {
    setUser: (user: any) => void;
    hydrate: () => Promise<void>;
    setStatus: (status: "idle" | "authenticated" | "unauthenticated") => void;
    signOut: () => Promise<void>;
  };
};

const useAuthState = create<AuthState>((set, get) => ({
  status: "idle",
  user: null,
  actions: {
    setUser: (user: Models.User<Models.Preferences>) => set({ user }),
    hydrate: async () => {
      try {
        const loggedIn = await account.get();
        get().actions.setUser(loggedIn);
        get().actions.setStatus("authenticated");
      } catch (error) {
        get().actions.setUser(null);
        get().actions.setStatus("unauthenticated");
      }

      return Promise.resolve();
    },
    setStatus: (status: "idle" | "authenticated" | "unauthenticated") => set({ status }),
    signOut: async () => {
      await account.deleteSession("current");
      get().actions.setUser(null);
      get().actions.setStatus("unauthenticated");
    },
  },
}));

export const useUser = () => useAuthState((state) => state.user);
export const useAuthStatus = () => useAuthState((state) => state.status);

export const useUserActions = () => useAuthState((state) => state.actions);
