import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export const useChatbotVisibility = () => {
    const location = useLocation()
    useEffect(() => {
        const updateChatbotVisibility = () => {
            const chatbotButton = document.querySelector('.dapta-chatbot-button')
            if (chatbotButton) {
                const shouldHideChatbot = location.pathname === '/login'
                chatbotButton.style.display = shouldHideChatbot ? 'none' : 'flex'
                return true
            } else {
                return false
            }
        }
        const intervalId = setInterval(() => {
            const isUpdated = updateChatbotVisibility()
            if (isUpdated) {
                clearInterval(intervalId)
            }
        }, 20)
        return () => clearInterval(intervalId)
    }, [location.pathname])
}
