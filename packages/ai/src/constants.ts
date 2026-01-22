// Xandi avatar asset path
// This will be resolved by the consuming app's bundler
export const XANDI_AVATAR_URL = new URL(
  "./assets/images/xandi-avatar.png",
  import.meta.url
).href;
