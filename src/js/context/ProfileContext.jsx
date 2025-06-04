import { createContext } from 'react'
import useProfiles from '../hooks/useProfiles'

const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [profiles, updateProfiles, profile, updateProfile, data, dataRegister, result, setResult] = useProfiles()
    return (
        <ProfileContext.Provider
            value={{
                profiles,
                updateProfiles,
                profile,
                updateProfile,
                data,
                dataRegister,
                result,
                setResult,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}
export { ProfileContext, ProfileProvider }
