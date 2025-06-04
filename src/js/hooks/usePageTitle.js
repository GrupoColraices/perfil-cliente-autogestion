import { useEffect } from 'react'

/**
 * @function
 * @name usePageTitle
 * @description The usePageTitle function is a custom hook in JavaScript that updates the document title with the provided title.
 * @param [title=Perfil Cliente] - The title parameter is a string that represents the desired page
 * title. If no title is provided, the default value is set to 'Perfil Cliente'.
 */
export const usePageTitle = (title = 'Perfil Cliente') => {
    useEffect(() => {
        document.title = title
    }, [title])
}
