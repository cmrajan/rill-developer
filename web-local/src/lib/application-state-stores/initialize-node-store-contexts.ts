/*global  RILL_VERSION, RILL_COMMIT */
import { browser } from "$app/environment";
import {
  createDerivedModelStore,
  createPersistentModelStore,
} from "@rilldata/web-local/lib/application-state-stores/model-stores";
import { createQueryHighlightStore } from "@rilldata/web-local/lib/application-state-stores/query-highlight-store";
import notificationStore from "@rilldata/web-local/lib/components/notifications/";
import type { ApplicationMetadata } from "@rilldata/web-local/lib/types";
import { setContext } from "svelte";
import { createStore } from "../application-state-stores/application-store";
import {
  createDerivedTableStore,
  createPersistentTableStore,
} from "../application-state-stores/table-stores";
import { syncApplicationState } from "../redux-store/application/application-apis";

/** determined by Vite's define option. */
declare global {
  const RILL_VERSION: string;
  const RILL_COMMIT: string;
}

/** This function will initialize the existing node stores and will connect them
 * to the Node server. It is best used in various application layouts to ensure that all children of the layout
 * get the same stores available to them. Once we have moved away from node & the resulting state model, we should
 * deprecate this function.
 */
export function initializeNodeStoreContexts() {
  let store;
  const queryHighlight = createQueryHighlightStore();

  /** set build-specific metadata as a context.  */
  const applicationMetadata: ApplicationMetadata = {
    version: RILL_VERSION, // constant defined in svelte.config.js
    commitHash: RILL_COMMIT, // constant defined in svelte.config.js
  };
  setContext("rill:app:metadata", applicationMetadata);

  /** Set the existing node stores, which are consumed through getContext within routes. */
  if (browser) {
    store = createStore();
    setContext("rill:app:store", store);
    setContext("rill:app:query-highlight", queryHighlight);
    setContext(`rill:app:persistent-table-store`, createPersistentTableStore());
    setContext(`rill:app:derived-table-store`, createDerivedTableStore());
    setContext(`rill:app:persistent-model-store`, createPersistentModelStore());
    setContext(`rill:app:derived-model-store`, createDerivedModelStore());
    notificationStore.listenToSocket(store.socket);
    syncApplicationState(store);
  }
}
