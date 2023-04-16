const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config: any = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config;
}

const cssLoaders = (extra?) => {
  const loaders = [MiniCssExtractPlugin.loader, "css-loader"];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
}

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "./index.tsx"),
  output: {
    filename: "client.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      "@api": path.resolve(__dirname, "src/api/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@utils": path.resolve(__dirname, "src/app/utils/"),
      "@stores": path.resolve(__dirname, "src/app/stores/"),
      "@pickers": path.resolve(__dirname, "src/app/pickers/"),
      "@components": path.resolve(__dirname, "src/app/components/"),
      "@ui": path.resolve(__dirname, "src/app/ui/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
    }
  },
  optimization: optimization(),
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3000,
    compress: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: "client.[contenthash].css"
    }),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin({
      profile: true,
      percentBy: "entries",
      modules: true,
      entries: true,
      dependencies: true,
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          mode: JSON.stringify(process.env.NODE_ENV),
          publicPath: JSON.stringify("/"),
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                  useBuiltIns: "entry",
                },
              ],
            ],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              [
                "css-modules-transform",
                {
                  extensions: [".css", ".scss"],
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: "url-loader?name=images/[name].[ext]",
            options: {
              limit: 1024,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  }
}