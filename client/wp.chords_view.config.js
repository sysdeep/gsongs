var path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

var config = {
	entry: {
		chords_view: path.join(__dirname, "src", "chords_view", "main.js"),
	},
	output: {
		path: path.join(__dirname, "..", "app", "static", "build"),
		filename: "[name].js",
	},
	resolve: {
		alias: {
			// 'vue$': 'vue/dist/vue.esm.js'
			"@": path.resolve(path.join(__dirname, "src", "gsongs")),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				// query: {
				// 	presets: ['es2015']
				// }
			},
			// {
			// 	test: /\.(css|html)$/,
			// 	loader: 'raw-loader'
			// },

			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"],
			},

			// {
			// 	test: /\.(png|jpg|gif|svg)$/,
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: '[name].[ext]?[hash]'
			// 	}
			// },

			{
				test: /\.vue$/,
				loader: "vue-loader",
				// query: {
				//     presets: ['es2015']
				// },
				// options: {
				// 	loaders: {
				// 		// js: 'babel-loader?presets[]=es2015'
				// 	}
				// 	// other vue-loader options go here
				// }
			},
		],
	},
	// plugins: [
	//   new webpack.optimize.UglifyJsPlugin(),
	// ]
	// plugins : [
	// 	new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
	// ]
	plugins: [new VueLoaderPlugin()],
};

if (process.env.hasOwnProperty("PRODUCTION")) {
	console.log("Start build app");
	config.watch = false;
	config.devtool = "source-map";
	// config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: config.devtool}));
	// config.stats = "normal";
	config.mode = "production";
} else {
	console.log("Start watch app");
	config.watch = true;
	config.devtool = "inline-source-map";
	config.mode = "development";
}

module.exports = config;
