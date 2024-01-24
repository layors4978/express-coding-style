import config from 'config';

export const VERSION = config.get('version') as string;

export const HTTP_HOST = config.get('http.host') as string;
export const HTTP_PORT = config.get('http.port') as number;

// jwt
export const ACCESS_TOKEN_SECRET = config.get(
  'jwt.accessToken.secret',
) as string;
export const ACCESS_TOKEN_EXPIRES_IN = config.get(
  'jwt.accessToken.expiresIn',
) as number;
