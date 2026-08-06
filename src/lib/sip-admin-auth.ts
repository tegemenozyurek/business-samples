const AUTH_KEY = "sip-admin-auth";

export const SIP_ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
} as const;

function canUseStorage() {
  return typeof window !== "undefined" && !!window.sessionStorage;
}

export function isSipAdminAuthenticated() {
  if (!canUseStorage()) return false;
  return window.sessionStorage.getItem(AUTH_KEY) === "1";
}

export function loginSipAdmin(username: string, password: string) {
  const ok =
    username === SIP_ADMIN_CREDENTIALS.username &&
    password === SIP_ADMIN_CREDENTIALS.password;
  if (ok && canUseStorage()) {
    window.sessionStorage.setItem(AUTH_KEY, "1");
  }
  return ok;
}

export function logoutSipAdmin() {
  if (!canUseStorage()) return;
  window.sessionStorage.removeItem(AUTH_KEY);
}
