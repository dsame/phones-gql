const path = require('path');
const merge = require('webpack-merge'); // mergey JS objects utility
const validate = require('webpack-validator'); //verbose config validation
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack'); //util plugins
const CleanWebpackPlugin = require('clean-webpack-plugin'); //extract css to its own bundle

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  entry:  path.join(__dirname, 'server')+'/server.js',
  src: [
    path.join(__dirname, 'server'),
		path.join(__dirname, 'graphQL')
  ],
  build: path.join(__dirname, 'dist'),
  build_server: path.join(__dirname, 'dist/server')
};

const UTILS = {
  clean : function(path) {
    return {
      plugins: [
        new CleanWebpackPlugin([path], {
          // Without `root` CleanWebpackPlugin won't point to our
          // project and will fail to work.
          root: process.cwd()
        })
      ]
    };
  },
  setFreeVariable : function(key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
      plugins: [
        new webpack.DefinePlugin(env)
      ]
    };
  },
  babel : function(paths) {
    return {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015','es2017'],
            },
            include: paths
          }
        ]
      }
    };
  },
  setupJsonLoaders : function(paths) {
    return {
      module: {
        loaders: [
          {
            test: /\.json$/,
            loader: 'json',
            include: paths
          }
        ]
      }
    };
  }
}

const base = {
  entry: {
    // there are may be lot of entries with any names
    server: PATHS.entry
    // non-existing PATH property will cause an error  "TypeError: Cannot read property 'replace' of undefined"
    //myapp: PATHS.app
  },
  output: {
    // create the build files in "dist" directory
    path: PATHS.build_server,
    // non-existing PATHS property will cause the files will be created in the root
    // path: PATHS.dist,
    // create myapp.js in "dist" directory
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
	target: 'node'
};

const common = merge(
	base,
  UTILS.setupJsonLoaders(PATHS.src),
  UTILS.babel(PATHS.src)
);

var config;

switch(process.env.npm_lifecycle_event) {
  case 'build:server':
  case 'stats:server':
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      UTILS.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      UTILS.clean(PATHS.build_server)
    );
    break;
  case 'watch-dev-build:server':
  case 'watch:server':
    config = merge(common,
      {
        devtool: 'eval-source-map'
      }
    );
    break;
  default:
    config = merge(common, {});
}

module.exports = validate(config, {
  quiet: true
});
