import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const from = 'app-svelte';
const to = 'build';

export default [
  {
    input: `${from}/src/main.ts`,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: `${to}/public/build/bundle.js`,
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ sourceMap: !production }),
        compilerOptions: {
          dev: !production,
        },
      }),
      replace({
        preventAssignment: true,
        'process.env': JSON.stringify({
          NAME: pkg.name,
          VERSION: pkg.version,
          AUTHOR: pkg.author,
          NODE_ENV: production ? 'production' : 'development',
        }),
      }),
      css({ output: 'bundle.css' }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      typescript({
        tsconfig: `${from}/tsconfig.json`,
        sourceMap: !production,
        inlineSources: !production,
      }),
      copy({
        targets: [{ src: `${from}/public`, dest: `${to}/` }],
      }),
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
