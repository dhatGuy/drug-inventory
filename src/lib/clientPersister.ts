import {
  StoragePersisterOptions,
  experimental_createPersister,
} from "@tanstack/query-persist-client-core";
import { defaultShouldDehydrateQuery } from "@tanstack/react-query";
import { mmkvStorage } from "./utils";

const clientStorage = {
  setItem: (key, value) => {
    mmkvStorage.set(key, value);
  },
  getItem: (key) => {
    const value = mmkvStorage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key) => {
    mmkvStorage.delete(key);
  },
} as StoragePersisterOptions["storage"];

export const clientPersister = experimental_createPersister({
  storage: clientStorage,
  // maxAge: Infinity,
  filters: {
    predicate: (q) => {
      // console.log(defaultShouldDehydrateQuery(q), q.meta?.stash !== false);
      return defaultShouldDehydrateQuery(q) && q.meta?.stash !== false;
    },
  },
});
