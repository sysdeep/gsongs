/**
 * 
 * 
 */
const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');


//--- dev - used in plugins
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;




var config = {
	entry: {

		"gsongs"			: path.normalize(path.join(__dirname, "src", "gsongs", "app.js")),
		
		//--- 2021.04.30 - disable - see in chunks
		// "gsongs_vendor"		: ["vue", "vue-router", "vuex", "axios"],
		
	},
	
	output: {
		path: path.normalize(path.join(__dirname, "..", "app", "static", "build")),
		filename: '[name].js',
	},

	resolve: {
		// extensions: ['.js'],
		// alias: { vue: 'vue/dist/vue.js' }
		alias: { 
			// 'vue$': 'vue/dist/vue.esm.js',
			"@"	: path.resolve(path.join(__dirname, "src", "gsongs"))
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


			// {
			// 	test: /\.(png|jpg|gif|svg)$/,
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: '[name].[ext]?[hash]'
			// 	}
			// },

			{
				test: /\.vue$/,
				loader: 'vue-loader',
				// query: {
				//     presets: ['es2015']
				// },
				// options: {
				// 	loaders: {
				// 		// js: 'babel-loader?presets[]=es2015'
				// 	}
				// 	// other vue-loader options go here
				// }
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

		//--- dev
		// new BundleAnalyzerPlugin(),
	],



	// mode: "production", // "production" | "development" | "none"


	//--- new cunks api
	optimization: {
		splitChunks: {
			// chunks: "all"
			cacheGroups: {
	// 			gsongs_vendor_split: {
	// 				name: 'gsongs_vendor_split',
    //       			chunks: 'initial',
    //       			minChunks: 2,
	// // 				// filename: '[name].bundle.js'
	// 			},

				//--- new webpack(Create a vendors chunk, which includes all code from node_modules in the whole application)
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'gsongs_vendor',
					chunks: 'all',
				},

				
				//--- не очень работает....
				//--- Create a commons chunk, which includes all code shared between entry points.
				// shared: {
				// 	name: 'shared',
				// 	chunks: 'initial',
				// 	minChunks: 2,
				// },


	// 			// mdispatch_store: {
	// 			// 	name: 'mdispatch_store',
    // //       			chunks: 'initial',
    // //       			minChunks: 2,
	// 			// 	// filename: '[name].bundle.js'
	// 			// }
			}
		}
	},



	// stats: {

	// }





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