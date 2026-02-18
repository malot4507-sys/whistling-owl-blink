process.env.NEXT_DISABLE_SWC_NATIVE="1"; process.env.NEXT_DISABLE_SWC_WASM="1"; process.env.NEXT_PRIVATE_DISABLE_SWC="1"; process.env.NEXT_DISABLE_TURBO="1"; process.env.NEXT_FORCE_WASM="0";
process.env.NEXT_DISABLE_SWC_NATIVE="1"; process.env.NEXT_DISABLE_SWC_WASM="1"; process.env.NEXT_PRIVATE_DISABLE_SWC="1"; process.env.NEXT_DISABLE_TURBO="1"; process.env.NEXT_FORCE_WASM="0";
process.env.NEXT_DISABLE_SWC_NATIVE="1"; process.env.NEXT_DISABLE_SWC_WASM="1"; process.env.NEXT_PRIVATE_DISABLE_SWC="1"; process.env.NEXT_DISABLE_TURBO="1"; process.env.NEXT_FORCE_WASM="0";
process.env.NEXT_DISABLE_SWC_NATIVE="1"; process.env.NEXT_DISABLE_SWC_WASM="1"; process.env.NEXT_PRIVATE_DISABLE_SWC="1"; process.env.NEXT_DISABLE_TURBO="1"; process.env.NEXT_FORCE_WASM="0";
// 🔴 TERMUX FIX: Desactiva SWC y Turbopack
process.env.NEXT_DISABLE_SWC_NATIVE = "1";
process.env.NEXT_DISABLE_SWC_WASM = "1";
process.env.NEXT_PRIVATE_DISABLE_SWC = "1";
process.env.NEXT_DISABLE_TURBO = "1";
process.env.NEXT_FORCE_WASM = "0";
import nextMDX from "@next/mdx";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@tabler/icons-react",
      "framer-motion",
      "react-hook-form",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
    ],
  },

  reactStrictMode: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "www.robot-speed.com" },
      { protocol: "https", hostname: "robot-speed.com" },
    ],
    formats: ["image/avif", "image/webp"],
    loader: "default",
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

  poweredByHeader: false,
  compress: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? { properties: ["^data-testid$"] }
        : false,
  },

  transpilePackages: ["geist", "cobe"],

  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("."),
      "@components": path.resolve("./components"),
      "@lib": path.resolve("./lib"),
      "@constants": path.resolve("./constants"),
      "@context": path.resolve("./context"),
    };

    const isVercel =
      process.env.VERCEL === "1" ||
      process.env.VERCEL === "true" ||
      process.env.NEXT_PUBLIC_VERCEL === "1" ||
      process.env.VERCEL_ENV !== undefined ||
      process.env.VERCEL_URL !== undefined;

    const isProduction = process.env.NODE_ENV === "production";

    if (isVercel || isProduction) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /tailwind-cdn-loader/,
          path.resolve("./components/empty-loader.tsx")
        )
      );

      console.log(
        "🚫 [WEBPACK] tailwind-cdn-loader bloqueado (empty-loader activo)"
      );
    } else {
      console.log(
        "🎨 [WEBPACK] Development mode - tailwind-cdn-loader activo"
      );
    }

    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);

