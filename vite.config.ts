/*
 * @Description:
 * @Autor: henry.xiukun
 * @Date: 2024-12-23 14:52:35
 * @LastEditors: henry.xiukun
 */
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// 按需加载vxe-table,vxe-pc-ui
		lazyImport({
			resolvers: [
				VxeResolver({
					libraryName: 'vxe-table',
				}),
				VxeResolver({
					libraryName: 'vxe-pc-ui',
				}),
			],
		}),
	],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
