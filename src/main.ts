import { mount } from 'svelte'
import App from './App.svelte'
import './app.css'

// Self-hosted fonts (no CDN)
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/400.css'

const app = mount(App, { target: document.getElementById('root')! })

export default app
