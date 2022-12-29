var path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

var config = {
	entry: {
		todo: path.join(__dirname, "src", "todo", "main.js"),
	},
	output: {
		path: path.join(__dirname, "..", "app", "static", "build"),
		filename: "[name].js",
	},
	resolve: {
		alias: {
			// vue$: "vue/dist/vue.esm.js"
			"@": path.resolve(path.join(__dirname, "src", "todo")),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"],
			},

			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
		],
	},
	plugins: [new VueLoaderPlugin()],
};

if (process.env.hasOwnProperty("PRODUCTION")) {
	console.log("Start build app");
	config.watch = false;
	config.devtool = "source-map";
	config.mode = "production";
} else {
	console.log("Start watch app");
	config.watch = true;
	config.devtool = "inline-source-map";
	config.mode = "development";
}

module.exports = config;
