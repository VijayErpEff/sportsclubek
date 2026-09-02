// ============================================================
// LEVELUP MEMBER APP
// Booking, scheduling, memberships, and accounts all live in the
// LevelUP Sports & Athletics app. It ships as a native iOS/Android
// app with a web version at app.levelupsports.us.
//
// Marketing-site CTAs never link straight to the store or the web
// app — they funnel through /app (see `appLink`), which opens the
// installed app when there is one, and otherwise offers the store
// download or the browser version.
// ============================================================

export const APP = {
  /** Store listing name */
  name: "LevelUP Sports & Athletics",

  /** Web version of the member app. Also the Universal Link / App Link host. */
  web: "https://app.levelupsports.us",

  /** Host portion of `web`, used to assemble Android intent:// links */
  host: "app.levelupsports.us",

  /** Apple App Store listing */
  ios: "https://apps.apple.com/us/app/levelup-sports-athletics/id6777309227",

  /** Google Play listing */
  android: "https://play.google.com/store/apps/details?id=levelup.com",

  /** Android package id — lets us build an open-or-fall-back intent:// link */
  androidPackage: "levelup.com",
} as const;

/**
 * Absolute URL into the web app.
 * `path` must start with "/" — pass "/" for the app home.
 */
export function appUrl(path = "/"): string {
  return path === "/" || !path ? APP.web : `${APP.web}${path}`;
}

/**
 * Internal smart link to /app.
 *
 * @param to    Path inside the app to land on once it opens (default: home)
 * @param label Short context label — GA4 attribution only, never shown
 */
export function appLink(to = "/", label?: string): string {
  const params = new URLSearchParams();
  if (to && to !== "/") params.set("to", to);
  if (label) params.set("c", label);
  const qs = params.toString();
  return qs ? `/app?${qs}` : "/app";
}

/** Store URL for a platform. Desktop visitors get the App Store listing. */
export function storeUrl(platform: "ios" | "android"): string {
  return platform === "android" ? APP.android : APP.ios;
}
