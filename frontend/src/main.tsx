import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const authService = "http://localhost:5001"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="864485028601-73576p4qn0vf2aciiut7q6lsh5apq2cb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>

  </StrictMode>,
)
