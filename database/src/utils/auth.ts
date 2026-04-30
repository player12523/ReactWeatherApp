import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET ?? "weather-app-dev-secret";

export function hashPassword(password: string) {
  return crypto
    .createHash("sha256")
    .update(`${SECRET}:${password}`)
    .digest("hex");
}

export function createToken(userId: number) {
  const payload = Buffer.from(JSON.stringify({ userId, createdAt: Date.now() })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function readToken(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { userId: number };
  } catch {
    return null;
  }
}
