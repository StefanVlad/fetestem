const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');


const config =  {
    // Tell webpack the root file of our client application
    entry: './src/client/client.js', //normally this would be index.js as well

    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
};


module.exports = merge(baseConfig, config);