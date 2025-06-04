import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './js/context/AuthContext'
import { AppRouter } from './js/routes/AppRouter'
import './sass/app.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    </React.StrictMode>
)
