const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
    optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
};