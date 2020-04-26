const fs = require('fs')
const path = require('path')
const withLess = require('@zeit/next-less')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const withCss = require('@zeit/next-css')

const cssConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
}

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
}

const lessConfig = {
  
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config, { isServer }) => {
    
    config.node = {
      fs: 'empty',
    }

    config.plugins.push(new AntdDayjsWebpackPlugin())

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    return config
  },
}

const nextConfig = {
  env: {},
}

module.exports = withPlugins(
  [
    [withLess, lessConfig],
    [withCss, cssConfig],
    withBundleAnalyzer(bundleAnalyzerConfig),
  ],
  nextConfig
)
