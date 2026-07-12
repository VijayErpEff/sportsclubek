const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          ...(isDev
            ? []
            : [
                {
                  key: "Content-Security-Policy",
                  value:
                    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https: https://www.google-analytics.com https://region1.google-analytics.com; frame-src 'self' https://www.google.com; media-src 'self' https:; frame-ancestors 'none';",
                },
              ]),
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/free-trial",
        destination: "/schedule",
        permanent: true,
      },
      {
        // Shareable shortcut for flyers/social — Upper Hand's login page has
        // no sign-up link, so this is the only path to account creation.
        source: "/signup",
        destination:
          "https://app.upperhand.io/customers/2578-level_up-sports-and-athletics-club/create_user",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
