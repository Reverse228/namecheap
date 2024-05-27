import path from "path";

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve("src");
    return config;
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
