import { useContext } from 'react'
import { ProfileContext } from '../context/ProfileContext'

export const Details = () => {
    const { profile } = useContext(ProfileContext)
    const viability = profile?.profile?.filter(
        (item) =>
            (!item.viability && item.title !== 'Ley de vivienda') ||
            (item.title === 'Actividad económica' && item.message !== null)
    )
    let generalMessage = (
        <li>
            <span>
                Para aplicar al cupo de crédito mencionado, le recomendamos tener en cuenta las siguientes condiciones:
            </span>
        </li>
    )
    if (viability?.every((item) => item.viability === true || item.viability === 'No Aplica')) {
        generalMessage = (
            <li>
                <span>¡Felicitaciones! </span>
                El esfuerzo por cuidar tu salud financiera ha valido la pena y ahora tienes un cupo de crédito sin
                ningún tipo de restricción.
            </li>
        )
    }
    return (
        <details>
            <summary>Detalle del resultado</summary>

            <ul>
                {generalMessage}
                {viability?.map((item) => (
                    <li key={item.title} className="sugerencia-item text-black">
                        <span>{item.title}: </span>
                        {item.message}
                    </li>
                )
                )}
            </ul>
        </details>
    )
}
