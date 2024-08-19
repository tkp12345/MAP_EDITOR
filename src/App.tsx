import './App.css'
import { ThemeProvider } from '@emotion/react'
import { Router } from './router/router'
import { WrapBoundary } from './utils/error/wrap-boundary'
import { theme } from './ui/emotion/teme'
import { Toast } from './ui/emotion/toast'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <WrapBoundary>
          <Router />
          <Toast />
        </WrapBoundary>
    </ThemeProvider>
  )
}

export default App
