import { author, homepage, version } from '../build/package';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  format: 'umd',
  entry: 'index.js',
  dest: 'build/monte.js',
  moduleName: 'monte',
  banner: `// ${homepage} Version ${version} Copyright ${(new Date).getFullYear()} ${author.name}`,
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel(),
  ],
  globals: {
    d3: 'd3',
  },
  sourceMap: true,
};
