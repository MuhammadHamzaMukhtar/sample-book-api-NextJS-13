import { createHash } from 'crypto';

export default function generateRandomString(n: number) {
  const bytes = n / 2;
  const buffer = createHash('sha1').update(Date.now().toString()).digest('hex').slice(0, bytes);
  return buffer;
}
