/**
 * 2018.03.24 - DEPRICATED
 * see separate configs for each app
 */
var path = require("path");
var webpack = require('webpack');

// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');



var config = {
	entry: {

		"gsongs"		: path.join(__dirname, "app", "srcv", "gsongs", "app.js"),
		"todo"			: path.join(__dirname, "app", "srcv", "todo", "main.js"),
		"chords_edit"	: path.join(__dirname, "app", "srcv", "chords_edit", "main.js"),
		"chords_view"	: path.join(__dirname, "app", "srcv", "chords_view", "main.js"),
		
		"vendor"	: ["vue", "axios"]
		
	},
	output: {
		path: path.join(__dirname, "app", "static", "build"),
		// path: __dirname + 'app/static/build',
		filename: '[name].js',
		// filename: 'templates.js',
	},
	resolve: {
		// extensions: ['.js'],
		// alias: { vue: 'vue/dist/vue.js' }
		alias: { 'vue$': 'vue/dist/vue.esm.js' }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.(css|html)$/,
				loader: 'raw-loader'
			},


			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				// query: {
				//     presets: ['es2015']
				// },
				options: {
					loaders: {
						js: 'babel-loader?presets[]=es2015'
					}
					// other vue-loader options go here
				}
			}
			
		]
	},
	// plugins: [
	//   new webpack.optimize.UglifyJsPlugin(),
	// ]
	plugins : [
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
	]
};
// var entries = {
// 	"projects": './public/srcv/projects/app.js',
// }
// var entries = {
// 	"protos2": {
// 		"protos2": './public/src/protos2/protos_page/app.js',
// 		"proto2": './public/src/protos2/proto_page/app.js',
// 	}
// }


// if(process.env.hasOwnProperty("PRODUCTION")){
// 	console.log("Start build app");
// 	config.watch = false;
// 	config.devtool = 'source-map';
// 	config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: config.devtool}));
// 	// config.stats = "normal";
// }else{
// 	console.log("Start watch app");
// 	config.watch = true;
// 	config.devtool = 'inline-source-map';
// }



var ENV = process.env.npm_lifecycle_event;

switch(ENV){
	
	case "dev":
		console.log("Start watch app");
		config.devtool = 'inline-source-map';
		break;

	case "build":
		console.log("Start build app");
		config.devtool = 'source-map';
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: config.devtool, compress: {	warnings: false	}}));
		break;
}
module.exports = config;