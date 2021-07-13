export interface PaginationType<X, Y> {
  skip?: number;
  take?: number;
  cursor?: X;
  orderBy?: Y;
}

export const convertBooleanObject = (obj: any) => {
  const newObj = { ...obj };

  const keyArr = Object.keys(obj);

  for (let i of keyArr) {
    newObj[i] === 'true' ? (newObj[i] = true) : (newObj[i] = false);
  }

  return newObj;
};
