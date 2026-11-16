/** @type {import('next').NextConfig} */
const nextConfig = {
    // Dev only: lets the dev server (and its HMR socket) be reached at
    // http://127.0.0.1:3000, which is what Windows browsers use with WSL.
    allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
