import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'

import packageJSON from './package.json' assert { type: 'json' }

const packageConf = packageJSON as typeof packageJSON & { module?: string; peerDependencies?: string[] }
const external = Object.keys(packageConf.peerDependencies || {})

export default [
  {
    input: './index.ts',
    output: [
      {
        file: packageConf.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageConf.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          jsx: 'react',
          incremental: false,
          outDir: 'dist',
          declaration: true,
          declarationDir: 'types',
        },
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.stories.tsx'],
      }),
      postcss(),
      terser(),
    ],
    external,
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]
