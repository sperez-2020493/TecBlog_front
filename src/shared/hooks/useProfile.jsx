import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getUserInfo, getProfilePicture } from '../../services/api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserInfo();

      if (response?.data && response?.data?.uid) {
        setProfile(response.data);

        const pictureUrl = await getProfilePicture();
        setProfilePicture(pictureUrl);
      } else {
        toast.error("Error al obtener el perfil del usuario");
        console.error("Respuesta inválida:", response);
      }
    } catch (error) {
      toast.error("Error al obtener el perfil del usuario");
      console.error("Error en getProfile:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    profilePicture,
    loading,
    getProfile,
  };
};