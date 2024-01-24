import { sign, verify, TokenExpiredError } from 'jsonwebtoken';

import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET } from '@/env';
import {
  AccessTokenExpiredError,
  InvalidAccessTokenError,
} from '@/errors/customErrors';

export interface accessTokenPayload {
  userId: string;
}

export function issueAccessToken(payload: accessTokenPayload): string {
  const accessToken = sign({ payload }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  return accessToken;
}

export function verifyAccessToken(accessToken: string): accessTokenPayload {
  try {
    const { payload } = verify(accessToken, ACCESS_TOKEN_SECRET) as {
      payload: accessTokenPayload;
    };
    return payload;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw AccessTokenExpiredError(`Access token expired.`);
    }
    throw InvalidAccessTokenError(`Invalid access token.`);
  }
}
