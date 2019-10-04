import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import postcss from 'rollup-plugin-postcss'
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import pkg from './package.json'


export default {
  input: 'src/index.js',
  external: [
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano(),
      ],
      extensions: ['.css']
    }),
    resolve(),
    babel({
      exclude: ['node_modules/**'],
    }),
    filesize(),
  ],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'es', exports: 'named' },
  ],
}
