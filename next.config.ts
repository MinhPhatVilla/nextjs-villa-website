/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // cho phép load ảnh từ domain ngoài
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // ảnh placeholder mẫu
      },
      {
        protocol: 'https',
        hostname: 'cdn.minhphatvilla.vn', // ví dụ CDN bạn sẽ dùng sau này
      },
    ],
  },
}

export default nextConfig
