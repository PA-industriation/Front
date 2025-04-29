import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import FullReload from 'vite-plugin-full-reload'

export default defineConfig({
    plugins: [
        vue(),
        FullReload(['main.html', 'catalog.html'])
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    server: {
        host: true,
        port: 3000,
    },
});