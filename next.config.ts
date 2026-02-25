import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep heavy server-only packages out of the client bundle
  serverExternalPackages: [
    "bcryptjs",
    "nodemailer",
    "@prisma/client",
    "prisma",
    "cloudinary",
    "razorpay",
  ],

  // Tree-shake large icon / UI packages so only used icons are compiled
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-icons",
      "@radix-ui/react-label",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "recharts",
      "framer-motion",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
