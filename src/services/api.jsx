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

