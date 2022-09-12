import { getMetricsViewMetadata } from "$lib/svelte-query/queries/metrics-view";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let metricsDefExists: boolean;

  await getMetricsViewMetadata(params.id).then((meta) => {
    if (meta.timeDimension !== undefined) {
      metricsDefExists = true;
    } else {
      metricsDefExists = false;
    }
  });

  if (metricsDefExists) {
    return {
      metricsDefId: params.id,
    };
  }

  // TODO: determine when the dashboard is invalid, then redirect
  // if (dashboardInvalid) {
  //   throw redirect(307, `/dashboard/${params.id}/edit`);
  // }

  throw error(404, "Dashboard not found");
}
