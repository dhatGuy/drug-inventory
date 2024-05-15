import { create } from "zustand";

type RouteState = {
  routeName: string | undefined;
  actions: {
    setRouteName: (routeName: string | undefined) => void;
  };
};

const useRouteState = create<RouteState>((set) => ({
  routeName: undefined,
  actions: {
    setRouteName: (routeName: string | undefined) => set({ routeName }),
  },
}));

export const useRouteName = () => useRouteState((state) => state.routeName);
export const useRouteActions = () => useRouteState((state) => state.actions);
