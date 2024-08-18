import './App.css'
import { Router } from './router/router'
import { WrapBoundary } from './utils/error/wrap-boundary'

function App() {

  return (
    <>
        <WrapBoundary>
            <Router />
        </WrapBoundary>
    </>
  )
}

export default App
