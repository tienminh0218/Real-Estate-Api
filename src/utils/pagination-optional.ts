export type PaginationType<X, Y> = {
  skip?: number;
  take?: number;
  cursor?: X;
  orderBy?: Y;
};
