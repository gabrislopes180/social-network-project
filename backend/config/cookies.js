const isProduction = process.env.NODE_ENV === "production";

export const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  ...(isProduction && process.env.COOKIE_DOMAIN
    ? { domain: process.env.COOKIE_DOMAIN }
    : {}),
};
