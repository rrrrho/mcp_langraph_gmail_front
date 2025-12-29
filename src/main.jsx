import { StrictMode } from 'react'
import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core';
import Layout from './components/Layout/index.tsx'

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  fontFamily: 'Albert Sans, sans-serif',
  colors: {
    red: [
      '#7E0000',
      '#B10000',
      '#E40000',
      '#FF1818',
      '#EE3223',
      '#F25E52'
    ]
}});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Layout>
          <App />
        </Layout>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
