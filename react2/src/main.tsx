import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import HomePage from './pages/HomePage.tsx'
import UserPage from './pages/UserPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    {/* <HomePage /> */}
    {/* <UserPage /> */}
    <App />
    </Provider>
  </StrictMode>,
)
