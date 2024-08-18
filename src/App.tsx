import './App.css'
import { ThemeProvider } from '@emotion/react'
import { Router } from './router/router'
import { WrapBoundary } from './utils/error/wrap-boundary'
import { theme } from './ui/emotion/teme'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <WrapBoundary>
          <Router />
        </WrapBoundary>
    </ThemeProvider>
  )
}

export default App
