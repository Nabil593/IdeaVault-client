/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true, // 👈 এটি Next.js-কে বলবে এক্সটার্নাল ইমেজ ডাউনলোড করে প্রসেস না করে সরাসরি ইউআরএল সোর্স ব্যবহার করতে
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
