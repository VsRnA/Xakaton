import { config } from '#config';
import * as jwt from '#lib/jwt';

export async function generateToken(userId: string): Promise<string> {
  return jwt.sign(
    { userId },
    config.jwt.secret,
    { expiresIn: '7d' }
  );
}
