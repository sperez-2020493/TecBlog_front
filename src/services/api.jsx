import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3001/TecBlog/v1",
    timeout: 3000,
    httpsAgent: false
});

export const getUserInfo = async () => {
    try {
        return await apiClient.get('/user/me');
    } catch (e) {
        console.error('Error al obtener la información del usuario:', e);
        return { error: true, e };
    }
};

export const getPostsWithComments = async () => {
    try {
        const response = await apiClient.get('/post/list');
        return response.data;
    } catch (e) {
        console.error('Error al obtener los posts con comentarios:', e);
        return { error: true, e };
    }
};

export const likePostById = async (postId) => {
    try {
        const response = await apiClient.post(`/post/like/${postId}`);
        console.log(response); 
        return response.data;
    } catch (e) {
        console.error(`Error al dar like al post con ID ${postId}:`, e);
        return { error: true, e };
    }
};

export const createComment = async (commentData) => {
    try {
        const response = await apiClient.post('/comment/create', commentData);
        return response.data;
    } catch (e) {
        console.error('Error al crear el comentario:', e);
        return { error: true, e };
    }
};
