import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';
import "leaflet/dist/leaflet.css";

export const authService = "http://localhost:5001";
export const restaurantService = "http://localhost:5002";
export const utilsService = "http://localhost:5003";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="864485028601-73576p4qn0vf2aciiut7q6lsh5apq2cb.apps.googleusercontent.com">
      <AppProvider>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>

  </StrictMode>,
)
