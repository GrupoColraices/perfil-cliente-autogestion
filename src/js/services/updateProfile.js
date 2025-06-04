const { VITE_API_URL } = import.meta.env

export const updateProfileHubspot = async (payload,token) => {
    const url = `${VITE_API_URL}/profiles/profile`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'c-token': token,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error updating profile: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error('Error en updateProfileHubspot:', error);
      throw error;
    }
};
  