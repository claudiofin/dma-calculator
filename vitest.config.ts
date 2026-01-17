import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'happy-dom',
        setupFiles: ['./vitest.setup.ts'],
        alias: {
            '@': path.resolve(__dirname, './'),
            '@react-native-community/slider': path.resolve(__dirname, './__mocks__/slider.js'),
            'expo-router/head': path.resolve(__dirname, './__mocks__/expo-router-head.js'),
            'expo-router': path.resolve(__dirname, './__mocks__/expo-router.js'),
            'moti': path.resolve(__dirname, './__mocks__/moti.js'),
            'react-native-reanimated': path.resolve(__dirname, './__mocks__/reanimated.js'),
            'nativewind': path.resolve(__dirname, './__mocks__/nativewind.js'),
            'lucide-react-native': path.resolve(__dirname, './__mocks__/lucide.js'),
            'react-native-safe-area-context': path.resolve(__dirname, './__mocks__/safe-area-context.js'),
            '@react-native-async-storage/async-storage': path.resolve(__dirname, './__mocks__/async-storage.js'),
        },
        deps: {
            optimizer: {
                web: {
                    include: ['react-native-web']
                }
            }
        },
        coverage: {
            provider: 'v8',
        },
        // Prevent parsing errors for native modules by assuming web environment mostly
        server: {
            deps: {
                inline: ['react-native-reanimated']
            }
        }
    },
    resolve: {
        alias: {
            'react-native': 'react-native-web',
        },
    },
});
