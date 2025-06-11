import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProfileClient } from '../pages/ProfileClient'
import { AppContextProvider } from '../context/AppContext'
import { NotFound } from '../containers/NotFound'
import { ProfileProvider } from '../context/ProfileContext.jsx'

export const AppRouter = () => {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/perfil-cliente"
                        element={
                            <ProfileProvider>
                                <ProfileClient />
                            </ProfileProvider>
                        }
                    />

                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    )
}
