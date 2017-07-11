import path from 'path';
import webpack from 'webpack';

export default {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, 'client/index.jsx')
	],
	output: {
		path: path.join(__dirname),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				include: path.join(__dirname, 'client'),
				loaders: ['react-hot-loader', 'babel-loader']
			},
			{ test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
			{ test: /(\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
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
