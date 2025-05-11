import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getPostsWithComments, createComment } from '../../services/api';

export const usePostsWithComments = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false); 

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPostsWithComments();
      if (response?.posts) {
        setPosts(response.posts);
      } else {
        toast.error("Error al obtener las publicaciones");
        console.error("Respuesta inválida:", response);
      }
    } catch (error) {
      toast.error("Error al obtener las publicaciones");
      console.error("Error en fetchPosts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateComment = async (commentData) => {
    setCommentLoading(true);
    try {
      const response = await createComment(commentData);

      if (response?.comment) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === commentData.post
              ? { ...post, comments: [...post.comments, response.comment] }
              : post
          )
        );
        toast.success("Comentario creado exitosamente");
      } else {
        toast.error("No se pudo crear el comentario");
        console.error("Respuesta inválida:", response);
      }
    } catch (error) {
      toast.error("Error al crear el comentario");
      console.error("Error en handleCreateComment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  return {
    posts,
    loading,
    fetchPosts,
    handleCreateComment, 
    commentLoading, 
  };
};