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

export const getProfilePicture = async () => {
    try {
        const response = await axios.get('http://localhost:3001/profile-picture/Usuario-1746682644172.png', {
            withCredentials: true, 
            responseType: 'blob',  
        });

        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (e) {
        console.error('Error al obtener la imagen de perfil:', e);
        return { error: true, e };
    }
};