import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,  // Ensures React Router works on refresh
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});