var webpack = require("webpack");
var config = require("./webpack.client.js");

config.cache = true;
config.debug = true;
config.devtool = "cheap-module-eval-source-map";

config.entry.unshift(
	"webpack-hot-middleware/client"
);

config.output.publicPath = "/dist/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: false, __DEV__: true}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

config.module.postLoaders = [
	{test: /\.js$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&presets[]=react&presets[]=react-hmre"], exclude: /node_modules/}
];

config.devServer = {
	publicPath: "/dist/",
	hot:         true,
	inline:      true,
	lazy:        false,
	quiet:       true,
	noInfo:      true,
	headers:     {"Access-Control-Allow-Origin": "*"},
	stats: {colors: true},
	host:        process.env.HOSTNAME || "localhost"
};

module.exports = config;
