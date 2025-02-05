/**
 * Generated by orval v6.10.1 🍺
 * Do not edit manually.
 * runtime.proto
 * OpenAPI spec version: version not set
 */
export type RuntimeServicePutRepoObjectBody = {
  blob?: string;
  delete?: boolean;
};

export type RuntimeServiceListReposParams = {
  pageSize?: number;
  pageToken?: string;
};

export type RuntimeServiceQueryDirectBody = {
  sql?: string;
  args?: unknown[];
  priority?: string;
  dryRun?: boolean;
};

export type RuntimeServiceQueryBody = {
  sql?: string;
  args?: unknown[];
  priority?: string;
  dryRun?: boolean;
};

export type RuntimeServiceMigrateDeleteBody = {
  name?: string;
};

export type RuntimeServiceMigrateSingleBody = {
  sql?: string;
  createOrReplace?: boolean;
  dryRun?: boolean;
};

export type RuntimeServiceMigrateBody = {
  blobs?: string[];
  dropDeleted?: boolean;
  dryRun?: boolean;
};

export type RuntimeServiceMetricsViewTotalsBody = {
  measureNames?: string[];
  timeStart?: string;
  timeEnd?: string;
  filter?: V1MetricsViewFilter;
};

export type RuntimeServiceMetricsViewToplistBody = {
  measureNames?: string[];
  timeStart?: string;
  timeEnd?: string;
  limit?: string;
  offset?: string;
  sort?: V1MetricsViewSort[];
  filter?: V1MetricsViewFilter;
};

export type RuntimeServiceMetricsViewTimeSeriesBody = {
  measureNames?: string[];
  timeStart?: string;
  timeEnd?: string;
  timeGranularity?: string;
  filter?: V1MetricsViewFilter;
};

export type RuntimeServiceListInstancesParams = {
  pageSize?: number;
  pageToken?: string;
};

export interface V1TriggerRefreshResponse {
  [key: string]: any;
}

export type V1SourceProperties = { [key: string]: any };

export interface V1Source {
  sql?: string;
  name?: string;
  connector?: string;
  properties?: V1SourceProperties;
}

export interface V1SchemaColumn {
  name?: string;
  type?: string;
  nullable?: boolean;
}

/**
 * UnmanagedTable represents a pre-existing table in the OLAP database (i.e. a table that
was NOT created through the runtime's migrations). The runtime periodically looks for
unmanaged tables in the database's information schema if the instance is created with exposed=true.
 */
export interface V1UnmanagedTable {
  name?: string;
  view?: boolean;
  schema?: V1SchemaColumn[];
}

/**
 * Repo represents a collection of file artifacts containing SQL statements.
It will usually by represented as a folder on disk, but may also be backed by a
database (for modelling in the cloud where no persistant file system is available).
 */
export interface V1Repo {
  repoId?: string;
  /** Driver for persisting artifacts. Supports "file" and "postgres". */
  driver?: string;
  /** DSN for driver. If the driver is "file", this should be the path to the root directory. */
  dsn?: string;
}

export type V1QueryResponseDataItem = { [key: string]: any };

export interface V1QueryResponse {
  meta?: V1SchemaColumn[];
  data?: V1QueryResponseDataItem[];
}

export type V1QueryDirectResponseDataItem = { [key: string]: any };

export interface V1QueryDirectResponse {
  meta?: V1SchemaColumn[];
  data?: V1QueryDirectResponseDataItem[];
}

export interface V1PutRepoObjectResponse {
  [key: string]: any;
}

export interface V1PingResponse {
  version?: string;
  time?: string;
}

export interface V1MigrateSingleResponse {
  [key: string]: any;
}

export interface V1MigrateResponse {
  [key: string]: any;
}

export interface V1MigrateDeleteResponse {
  [key: string]: any;
}

export type V1MetricsViewTotalsResponseData = { [key: string]: any };

export interface V1MetricsViewTotalsResponse {
  meta?: V1SchemaColumn[];
  data?: V1MetricsViewTotalsResponseData;
}

export type V1MetricsViewToplistResponseDataItem = { [key: string]: any };

export interface V1MetricsViewToplistResponse {
  meta?: V1SchemaColumn[];
  data?: V1MetricsViewToplistResponseDataItem[];
}

export type V1MetricsViewTimeSeriesResponseDataItem = { [key: string]: any };

export interface V1MetricsViewTimeSeriesResponse {
  meta?: V1SchemaColumn[];
  data?: V1MetricsViewTimeSeriesResponseDataItem[];
}

export interface V1MetricsViewSort {
  name?: string;
  ascending?: boolean;
}

export interface V1MetricsViewMetaResponse {
  metricsViewName?: string;
  fromObject?: string;
  dimensions?: MetricsViewDimension[];
  measures?: MetricsViewMeasure[];
}

export interface V1MetricsViewFilter {
  match?: string[];
  include?: MetricsViewFilterCond[];
  exclude?: MetricsViewFilterCond[];
}

export interface V1MetricsView {
  sql?: string;
  name?: string;
  fromObject?: string;
  dimensions?: MetricsViewDimension[];
  measures?: MetricsViewMeasure[];
}

export interface V1ListReposResponse {
  repos?: V1Repo[];
  nextPageToken?: string;
}

export interface V1ListRepoObjectsResponse {
  paths?: string[];
}

export interface V1ListInstancesResponse {
  instances?: V1Instance[];
  nextPageToken?: string;
}

export interface V1ListConnectorsResponse {
  connectors?: V1Connector[];
}

export interface V1ListCatalogObjectsResponse {
  objects?: V1CatalogObject[];
}

/**
 * Instance represents one connection to an OLAP datastore (such as DuckDB or Druid).
Migrations and queries are issued against a specific instance. The concept of
instances enables multiple data projects to be served by one runtime.
 */
export interface V1Instance {
  instanceId?: string;
  driver?: string;
  dsn?: string;
  /** Prefix to add to all table names created through Rill SQL (such as sources, models, etc.)
Use it as an alternative to database schemas. */
  objectPrefix?: string;
  /** Indicates that the underlying infra may be manipulated directly by users.
If true, the runtime will continuously poll the infra's information schema
to discover tables not created through the runtime. They will be added to the
catalog as UnmanagedTables. */
  exposed?: boolean;
  /** If true, the runtime will store the instance's catalog data (such as sources and metrics views)
in the instance's OLAP datastore instead of in the runtime's metadata store. This is currently
only supported for the duckdb driver. */
  embedCatalog?: boolean;
}

export interface V1GetRepoResponse {
  repo?: V1Repo;
}

export interface V1GetRepoObjectResponse {
  blob?: string;
}

export interface V1GetInstanceResponse {
  instance?: V1Instance;
}

export interface V1GetCatalogObjectResponse {
  object?: V1CatalogObject;
}

export interface V1DeleteRepoResponse {
  [key: string]: any;
}

export interface V1DeleteInstanceResponse {
  [key: string]: any;
}

export interface V1CreateRepoResponse {
  repo?: V1Repo;
}

export interface V1CreateRepoRequest {
  driver?: string;
  dsn?: string;
}

export interface V1CreateInstanceResponse {
  instanceId?: string;
  instance?: V1Instance;
}

export interface V1CreateInstanceRequest {
  driver?: string;
  dsn?: string;
  objectPrefix?: string;
  exposed?: boolean;
  embedCatalog?: boolean;
}

/**
 * Connector represents a connector available in the runtime.
It should not be confused with a source.
 */
export interface V1Connector {
  name?: string;
  displayName?: string;
  description?: string;
  properties?: ConnectorProperty[];
}

export interface V1CatalogObject {
  source?: V1Source;
  metricsView?: V1MetricsView;
  unmanagedTable?: V1UnmanagedTable;
}

export interface RpcStatus {
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
`Value` type union.

 The JSON representation for `NullValue` is JSON `null`.

 - NULL_VALUE: Null value.
 */
export type ProtobufNullValue =
  typeof ProtobufNullValue[keyof typeof ProtobufNullValue];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProtobufNullValue = {
  NULL_VALUE: "NULL_VALUE",
} as const;

export interface ProtobufAny {
  "@type"?: string;
  [key: string]: unknown;
}

export interface MetricsViewMeasure {
  name?: string;
  type?: string;
  description?: string;
}

export interface MetricsViewFilterCond {
  name?: string;
  in?: unknown[];
  like?: unknown[];
}

export interface MetricsViewDimension {
  name?: string;
  type?: string;
  primaryTime?: boolean;
  description?: string;
}

export type ConnectorPropertyType =
  typeof ConnectorPropertyType[keyof typeof ConnectorPropertyType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConnectorPropertyType = {
  TYPE_UNSPECIFIED: "TYPE_UNSPECIFIED",
  TYPE_STRING: "TYPE_STRING",
  TYPE_NUMBER: "TYPE_NUMBER",
  TYPE_BOOLEAN: "TYPE_BOOLEAN",
} as const;

export interface ConnectorProperty {
  key?: string;
  displayName?: string;
  description?: string;
  placeholder?: string;
  type?: ConnectorPropertyType;
  nullable?: boolean;
}
