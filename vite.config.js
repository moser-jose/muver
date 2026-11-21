import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // mantém os nomes das variáveis (.env / Vercel) e a pasta de saída do antigo Create React App
  envPrefix: 'REACT_APP_',
  build: { outDir: 'build' },
})
