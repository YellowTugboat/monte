import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  format: 'umd',
  entry: 'index.js',
  dest: 'build/monte.umd.js',
  moduleName: 'Monte',
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    babel(),
  ],
  globals: {
    d3: 'd3',
  },
  sourceMap: true,
};
