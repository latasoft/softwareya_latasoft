/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Webpack custom configuration
  webpack(config, options) {
    // Disable caching temporarily
    config.cache = false;
    
    // Existing file loader rules
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/, // Include the file types you need
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos',
          outputPath: 'static/videos',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
  
  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.softwareya.cl',
          },
        ],
        destination: 'https://softwareya.cl/:path*',
        permanent: true, // 301 redirect from www to non-www
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'softwareya.cl',
          },
        ],
        destination: 'https://www.softwareya.cl/:path*',
        permanent: true, // Swap based on your preference
      },
    ];
  },
};

module.exports = nextConfig;
