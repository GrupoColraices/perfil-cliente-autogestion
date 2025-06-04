import { useState } from 'react'

/**
 * @function useProfiles
 * @description Is a custom hook in JavaScript that manages state for profiles, profile
 * data, and a result.
 * @returns The function `useProfiles` returns an array with the following elements in order:
 */
const useProfiles = () => {
    const [data, setData] = useState()
    const [profiles, setProfiles] = useState([])
    const [profile, setProfile] = useState({})
    const [result, setResult] = useState(null)

    const updateProfiles = (values) => {
        setProfiles(values)
    }
    const updateProfile = (values) => {
        setProfile(values)
    }
    const dataRegister = (values) => {
        setData(values)
    }
    return [profiles, updateProfiles, profile, updateProfile, data, dataRegister, result, setResult]
}
export default useProfiles
