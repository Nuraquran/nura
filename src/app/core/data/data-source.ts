export interface DataSource<T, TQuery = void> {
  load(query: TQuery): Promise<readonly T[]>;
}
