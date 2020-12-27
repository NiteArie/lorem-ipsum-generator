const path = require('path');

module.exports = {
    entry: './src/script.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}