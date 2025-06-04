import { PrimaryButton } from "../components/PrimaryButton"
import { usePageTitle } from "../hooks/usePageTitle"


export const NotFound = () => {
    usePageTitle('404 Error! Página no encontrada')
    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <img className="max-w-xl" src="/assets/not_found.svg" alt="Page not found" />
            <PrimaryButton options={{ label: 'Volver al inicio', link: '/' }} />
        </section>

    )
}
