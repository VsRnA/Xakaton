import { config } from '#config';
import * as jwt from '#lib/jwt';

export async function generateToken(userGuid: string): Promise<string> {
  return jwt.sign(
    { userGuid },
    config.jwt.secret,
    { expiresIn: '7d' }
  );
}
