import { ProfileProvider } from '../context/ProfileContext'
import { Form } from '../containers/Form'
import { Header } from '../components/Header'

export const ProfileClient = () => {
    return (
        <ProfileProvider>
            <main>
                <Header />
                <Form />
            </main>
        </ProfileProvider>
    )
}
