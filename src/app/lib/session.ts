import { SignJWT, jwtVerify } from "jose";
import { cookies } from 'next/headers'
import type { JWTPayload } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY || "default_secret_key");
const TOKEN_EXPIRATION = "7d"; // مدت زمان انقضا

// تعریف نوع برای Payload
interface TokenPayload extends JWTPayload {
  userId: number;
  name?: string;
}

// ایجاد توکن
export const createToken = async (payload: TokenPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(SECRET_KEY);
};

// اعتبارسنجی توکن
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as TokenPayload; // افزودن نوع برای Payload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// تنظیم کوکی
export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: true,
    expires: 7 * 24 * 60 * 60, // 7 روز,
    sameSite: 'lax',
    path: '/',
  });
};

// پاک کردن کوکی
export const clearCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
