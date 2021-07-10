import 'dotenv/config';

type JWT_CONFIG = {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
};

export const getJwtConfig: JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: `${process.env.JWT_EXPIRATION_TIME}s` || '60s',
  },
};
