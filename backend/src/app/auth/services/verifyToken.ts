import { config } from '#config';
import * as jwt from '#lib/jwt';

export async function verifyToken(token: string): Promise<{ userId: string }> {
  try {
    return jwt.verify(token, config.jwt.secret) as { userId: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}