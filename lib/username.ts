const USERNAME_RE = /^[\p{L}\p{N}._-]+$/u;

export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 32;
export const USERNAME_CHANGE_COOLDOWN_DAYS = 30;

export function isValidUsername(value: string) {
  const normalized = value.normalize("NFKC");
  return normalized.length >= USERNAME_MIN_LENGTH &&
    normalized.length <= USERNAME_MAX_LENGTH &&
    USERNAME_RE.test(normalized);
}

export function normalizeUsername(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("en-US");
}

export function routeToUsername(value: string) {
  return decodeURIComponent(value).replace(/^@/, "");
}

export function canChangeUsername(lastChangedAt: Date | null, now = new Date()) {
  if (!lastChangedAt) return true;
  const nextAllowed = new Date(lastChangedAt);
  nextAllowed.setUTCDate(nextAllowed.getUTCDate() + USERNAME_CHANGE_COOLDOWN_DAYS);
  return now >= nextAllowed;
}
