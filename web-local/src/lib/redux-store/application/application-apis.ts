import type {
  ActiveEntity,
  ApplicationState,
} from "@rilldata/web-local/common/data-modeler-state-service/entity-state-service/ApplicationEntityService";
import type { ApplicationStore } from "../../application-state-stores/application-store";
import { get } from "svelte/store";
import { store } from "../store-root";
import { setApplicationActiveState } from "./application-slice";
import { EntityType } from "@rilldata/web-local/common/data-modeler-state-service/entity-state-service/EntityStateService";
import { bootstrapMetricsDefinition } from "../metrics-definition/bootstrapMetricsDefinition";

export const syncApplicationState = (appStore: ApplicationStore) => {
  appStore.subscribe(() => {
    const appState: ApplicationState = get(appStore);
    if (
      appState.activeEntity?.id !==
        store.getState().application.activeEntity?.id ||
      appState.activeEntity?.type !==
        store.getState().application.activeEntity?.type
    ) {
      store.dispatch(setApplicationActiveState(appState.activeEntity));
      handleActiveEntityChange(appState.activeEntity);
    }
  });
};

/**
 * Whenever active entity changes we need to make sure the target entity has everything to display.
 * Based on the entity type we call the appropriate bootstrap to load related entities.
 */
export const handleActiveEntityChange = (activeEntity: ActiveEntity) => {
  if (
    activeEntity.type === EntityType.MetricsDefinition ||
    activeEntity.type === EntityType.MetricsExplorer
  ) {
    store.dispatch(bootstrapMetricsDefinition(activeEntity.id));
  }
};
