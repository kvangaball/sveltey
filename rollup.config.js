// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'app/main.js',
  dest: 'bundle.js',
  format: 'iife',
  plugins: [
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: [ '.html' ],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'app/**.html'
    }),
    nodeResolve({
      module: true, // Default: true
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: true,  // Default: false
      extensions: [ '.js', '.json' ],  // Default: ['.js']
      preferBuiltins: false  // Default: true
    }),
    commonjs({
        include: 'node_modules/**',  // Default: undefined
        extensions: [ '.js' ],  // Default: [ '.js' ]
        ignoreGlobal: false,  // Default: false
        sourceMap: false,  // Default: true
        namedExports: {
          'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        }  // Default: undefined
      })
  ],
}
