function getXandiAvatarUrl(): string {
  try {
    return new URL("./assets/images/xandi-avatar.png", import.meta.url).href;
  } catch {
    return "";
  }
}

export const XANDI_AVATAR_URL = getXandiAvatarUrl();
