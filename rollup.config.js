import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'app/src/main.ts',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: `build/public/build/bundle.js`,
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ sourceMap: !production }),
        compilerOptions: {
          dev: !production,
        },
      }),
      css({ output: 'bundle.css' }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      typescript({
        tsconfig: 'app/tsconfig.json',
        sourceMap: !production,
        inlineSources: !production,
      }),
      copy({
        targets: [{ src: 'app/public', dest: `build/` }],
      }),
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
