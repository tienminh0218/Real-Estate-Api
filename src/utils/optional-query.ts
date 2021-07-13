export interface IncludeUserType {
  broker?: boolean;
  company?: boolean;
  comments_project?: boolean;
  comments_Broker?: boolean;
  comments_Company?: boolean;
  comments_Property?: boolean;
  properties?: boolean;

  length: () => number;
}

export interface PaginationType<X, Y> extends IncludeUserType {
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
