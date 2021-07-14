export interface PaginationType<X, Y> {
  skip?: number;
  take?: number;
  cursor?: X;
  orderBy?: Y;
}

export const generateIncludeQuery = (
  listRelation: string[],
  listIncludeQuery: string[],
) => {
  const newObj = {};
  let count = 0;

  listRelation.forEach((item) => {
    if (listIncludeQuery.includes(item)) {
      count++;
      newObj[item] = true;
    }
  });

  return count ? newObj : undefined;
};
