import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const AUTH_USER_KEY    = 'authenticatedUser'
const AUTH_EXPIRES_KEY = 'sessionExpiry'
const GESTOR_CODE_KEY  = 'gestorCode'

// Expira en 30 minutos
const EXPIRES_IN_MS    = 1000 * 60 * 30

const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState();

    const [isAuth, setIsAuth] = useState(() => {
        const expiry = parseInt(localStorage.getItem(AUTH_EXPIRES_KEY), 10)

        if (!expiry || Date.now() > expiry) {
            return false
        }

        const user = localStorage.getItem(AUTH_USER_KEY)
        return user ? JSON.parse(user) : false
    })

    // Sincronizar entre pestañas
    useEffect(() => {
        let timeoutId

        const logout = () => {
            localStorage.removeItem(AUTH_USER_KEY)
            localStorage.removeItem(AUTH_EXPIRES_KEY)
            localStorage.removeItem(GESTOR_CODE_KEY)
            setIsAuth(false)
        }

        const resetTimeout = () => {
            clearTimeout(timeoutId)
            const newExpiry = Date.now() + EXPIRES_IN_MS
            localStorage.setItem(AUTH_EXPIRES_KEY, newExpiry)
            timeoutId = setTimeout(logout, EXPIRES_IN_MS)
        }

        const events = ['click','keydown','mousemove','scroll','touchstart']
        events.forEach(evt => window.addEventListener(evt, resetTimeout))

        return () => {
            clearTimeout(timeoutId)
            events.forEach(evt => window.removeEventListener(evt, resetTimeout))
        }
    }, [])


    useEffect(() => {
        const onStorage = e => {
          if (e.key === AUTH_EXPIRES_KEY || e.key === AUTH_USER_KEY) {
            const expiry = parseInt(localStorage.getItem(AUTH_EXPIRES_KEY), 10)
            if (!expiry || Date.now() > expiry) {
              setIsAuth(false)
            } else {
              const user = localStorage.getItem(AUTH_USER_KEY)
              setIsAuth(user ? JSON.parse(user) : false)
            }
          }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const activateAuth = (authenticatedUser) => {
        // 1) calculo expiración
        const expiresAt = Date.now() + EXPIRES_IN_MS
        localStorage.setItem(AUTH_EXPIRES_KEY, expiresAt)

        // 2) guardo usuario
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authenticatedUser))

        // 3) genero y guardo gestorCode
        const username = authenticatedUser.username;
        const id = authenticatedUser.id;
        const code = `${username.split(' ')[0].toUpperCase()}_${id}`;
        localStorage.setItem(GESTOR_CODE_KEY, code);

        // 4) actualizo estado
        setIsAuth(authenticatedUser)
    }

    const removeAuth = () => {
        localStorage.removeItem(AUTH_USER_KEY)
        localStorage.removeItem(AUTH_EXPIRES_KEY)
        localStorage.removeItem(GESTOR_CODE_KEY)
        setIsAuth(false)
    }
    return(
        <AuthContext.Provider value={{ isAuth, activateAuth, removeAuth, email, setEmail }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, AuthContext }
