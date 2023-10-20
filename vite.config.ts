import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ command }) => {
	const config = {
		plugins: [react(), svgr()],
		base: '/'
	}

	if (command !== 'serve') {
		config.base = '/demo/'
	}

	return config
})
