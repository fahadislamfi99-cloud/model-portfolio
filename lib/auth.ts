import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.JWT_SECRET || "comatozze_super_secret_fallback_key_2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "comatozze2026!";

export function verifyPassword(pwd: string): boolean {
  if (!pwd) return false;
  return pwd === ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", SECRET).update(timestamp).digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, sig] = parts;
  const time = parseInt(timestamp, 10);
  if (isNaN(time)) return false;

  // Max session: 7 days
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - time > maxAge) return false;

  const expected = createHmac("sha256", SECRET).update(timestamp).digest("hex");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
