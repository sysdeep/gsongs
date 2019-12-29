const path = require("path");
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');



var config = {
	entry: {

		"spa"			: path.normalize(path.join(__dirname, "src", "spa", "app.js")),
		"spa_vendor"		: ["vue", "vue-router", "vuex", "axios"],
		
	},
	
	output: {
		path: path.normalize(path.join(__dirname, "..", "app", "static", "build")),
		filename: '[name].js',
	},

	resolve: {
		// extensions: ['.js'],
		// alias: { vue: 'vue/dist/vue.js' }
		alias: { 
			'vue$': 'vue/dist/vue.esm.js',
			"@"	: path.resolve(path.join(__dirname, "app", "srcv", "spa"))
		}
	},

	module: {
	
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				// query: {
				// 	presets: ['es2015']
				// }
			},

			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},

			// {
			// 	test: /\.(css|html)$/,
			// 	loader: 'raw-loader'
			// },


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
						// js: 'babel-loader?presets[]=es2015'
					}
					// other vue-loader options go here
				}
			}
			
		]
	},
	// plugins: [
	//   new webpack.optimize.UglifyJsPlugin(),
	// ]
	// plugins : [
	// 	new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
	// ]
	plugins : [
		new VueLoaderPlugin(),
	],


	//--- new cunks api
	optimization: {
		splitChunks: {
			// chunks: "all"
			cacheGroups: {
				mdispatch_vendor: {
					name: 'spa_vendor',
          			chunks: 'initial',
          			minChunks: 2,
					// filename: '[name].bundle.js'
				},

				// mdispatch_store: {
				// 	name: 'mdispatch_store',
    //       			chunks: 'initial',
    //       			minChunks: 2,
				// 	// filename: '[name].bundle.js'
				// }
			}
		}
	}
};



if(process.env.hasOwnProperty("PRODUCTION")){
	console.log("Start build app");
	config.watch = false;
	config.devtool = 'source-map';
	// config.plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: config.devtool}));
	// config.stats = "normal";
	config.mode = "production";
}else{
	console.log("Start watch app");
	config.watch = true;
	config.devtool = 'inline-source-map';
	config.mode = "development";
}



module.exports = config;