import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, 'client/index.jsx')
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin("public/css/styles.css"),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'server/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
	],
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				include: path.join(__dirname, 'client'),
				loaders: ['babel-loader']
			},
			{ test: /(\.css)$/, loaders: ExtractTextPlugin.extract({ fallback:'style-loader', use:'css-loader' })},
			{ test: /(\.scss)$/, loaders: ExtractTextPlugin.extract({ fallback:'style-loader', use:'css-loader?sourceMap!sass-loader' })},
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
			{ test: /\.(jpg|png|svg|jpeg)$/, loader: 'url-loader', options: { limit: 25000 } },
			{ test: /materialize-css\/bin\//, loader: 'imports?jQuery=jquery,$=jquery,hammerjs' }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
		}
	},
	node: {
		net: 'empty',
		dns: 'empty'
	}
};
