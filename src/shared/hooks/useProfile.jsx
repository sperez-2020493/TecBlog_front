import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getUserInfo, likePostById } from '../../services/api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserInfo();

      if (response?.data && response?.data?.uid) {
        setProfile(response.data);
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

  const likePost = useCallback(async (postId) => {
    try {
      const response = await likePostById(postId);
      toast.success("¡Te gustó esta publicación!");
      return response;
    } catch (error) {
      toast.error("Error al dar like a la publicación");
      console.error("Error en likePost:", error);
      return { hasError: true, error };
    }
  }, []);

  return {
    profile,
    loading,
    getProfile,
    likePost, 
  };
};
