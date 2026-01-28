// Xandi avatar asset path
// Wrapped in try-catch for SSR compatibility (import.meta.url may not work in all environments)
function getXandiAvatarUrl(): string {
  try {
    return new URL("./assets/images/xandi-avatar.png", import.meta.url).href;
  } catch {
    // Fallback for SSR environments where import.meta.url is not a valid URL
    return "";
  }
}

export const XANDI_AVATAR_URL = getXandiAvatarUrl();
