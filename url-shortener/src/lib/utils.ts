import crypto from "crypto";

// Simple Base62 character set
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function base62Encode(num: number): string {
  if (num === 0) return BASE62[0];
  let result = "";
  while (num > 0) {
    const rem = num % 62;
    result = BASE62[rem] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

export function generateShortCode(length = 8): string {
  const randomBytes = crypto.randomBytes(8).readBigUInt64BE();
  const encoded = base62Encode(Number(randomBytes % BigInt(62 ** 10)));
  return encoded.slice(0, length);
}
