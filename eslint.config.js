import js from '@eslint/js';
import ts from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    js.configs.recommended,
    ...ts.configs.recommended,
    sonarjs.configs.recommended,
    {
        ignores: ['docs/**', 'dist/**', 'node_modules/**'],
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'semi': ['error', 'always'],
            'no-multiple-empty-lines': ['error', { 'max': 1 }],
        },
    },
]);