'use strict';
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf');

const outDir = 'frontend';
const myServerPort = 3000;
const myDevPort = 8090;

const NODE_ENV = process.env.NODE_ENV || 'development';
const dev = (NODE_ENV === 'development');

function addHash(template, hash) {
    return NODE_ENV === 'production' ?
        template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}


var svgoConfig = JSON.stringify({
    plugins: [{
        removeTitle: true
    }, {
        convertColors: {
            shorthex: false
        }
    }, {
        convertPathData: false
    }]
});

const webpackSiteConfig = {
    context: `${__dirname}/${outDir}`,
    entry: {
        app: './app',
        adminApp: './admin/adminApp',
        common: './common'
    },
    output: {
        path: __dirname + `/public/${outDir}`,
        publicPath: `/${outDir}/`,
        filename: addHash('[name].js', 'hash'),
        chunkFilename: addHash('[id].js', 'chunkhash'),
        library: '[name]'
    },

    resolve: {
        extensions: ['', '.js', '.less', '.hbs', '.css'],
        modulesDirectories: ["node_modules", "bower_components"]
    },

    resolveLoader: {
        modulesDirectories: ['node_modules', "lib"],
        moduleTemplates: ['*-loader'],
    },

    module: {

        loaders: [{
            test: /\.hbs$/,
            loader: 'ember-templates!minifyHbs'
        }, {
            test: /\.js$/,
            loader: "babel?presets[]=es2015"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.less$/,
            loader: 'style!css!less',
        }, {
            test: /\.svg$/,
            loader: 'svg-sprite?' + JSON.stringify({
                name: '[name]',
                prefixize: true,
                // spriteModule: path.resolve(__dirname, `${outDir}/bin/svgSpriteLoder`)
            }) + "!" + 'svgo?' + svgoConfig
        }, {
            test: /\.(png|jpg|ttf|eot|woff|woff2)$/,
            loader: addHash('file?name=[path][name].[ext]', 'hash:6')
        }]

    },
    emberTemplatesLoader: {
        precompile: require('./bower_components/ember/ember-template-compiler').precompile,
    },

    plugins: [{
            apply: (compiler) => {
                rimraf.sync(compiler.options.output.path);
            }
        },
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_DEV: JSON.stringify(dev),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: `${__dirname}/public/${outDir}`,
            prettyPrint: true,
        })
    ],
    devtool: NODE_ENV === 'development' ? "source-map" : null,
    devServer: {
        contentBase: `${__dirname}/public`,
        port: myDevPort,
        host: 'localhost', // default
        // hot: true,
        proxy: {
            '/': {
                target: `http://localhost:${myServerPort}/`,
                secure: false,
            },
        },
    }
};


if (!dev) {
    webpackSiteConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // warnings: false
            }
        })
    );
}

module.exports = webpackSiteConfig;
