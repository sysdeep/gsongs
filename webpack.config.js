var path = require("path");
var webpack = require('webpack');

// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');



var config = {
	entry: {

        "gsongs":           path.join(__dirname, "app", "static", "srcv", "gsongs", "app.js"),
        //  __dirname + 'app/static/srcv/gsongs/app.js',
		// 'polyfills': './src/polyfills.ts',
		// 'vendor': './src/vendor.ts',
		
	},
	output: {
		path: path.join(__dirname, "app", "static", "build"),
		// path: __dirname + 'app/static/build',
		filename: '[name].js',
		// filename: 'templates.js',
	},
	resolve: {
		// extensions: ['.js'],
		alias: { vue: 'vue/dist/vue.js' }
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
	plugins : []
};
var entries = {
	"projects": './public/srcv/projects/app.js',
}
// var entries = {
// 	"protos2": {
// 		"protos2": './public/src/protos2/protos_page/app.js',
// 		"proto2": './public/src/protos2/proto_page/app.js',
// 	}
// }
var ENV = process.env.npm_lifecycle_event;
// console.log(ENV)
switch(ENV){
	
	case "dev":
		// config.entry["projects"] = entries["projects"];
		config.devtool = 'inline-source-map';
		break;
	// case "templates":
	// 	config.entry["templates"] = entries["templates"];
	// 	config.entry["template"] = entries["template"];
	// 	config.devtool = 'inline-source-map';
	// 	break;
	case "build":
		// config.entry["projects"] = entries["projects"];
		config.devtool = 'source-map';
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: config.devtool, compress: {	warnings: false	}}));
		config.plugins.push(new webpack.LoaderOptionsPlugin({minimize: true}))
		break;
}
module.exports = config;