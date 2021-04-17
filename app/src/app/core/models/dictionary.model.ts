export abstract class Dictionary<T> {
  [id: string]: T;
}

export type FilterValue = string | string[];

export type CustomFilters = Dictionary<FilterValue>;
