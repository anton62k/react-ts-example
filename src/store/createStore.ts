import { Store } from "./Store";
import { IStore } from "./IStore";

export function createStore(allowedChars: string): IStore {
  const store: Store = new Store();
  store.setAllowedChars(allowedChars);
  return store;
}
