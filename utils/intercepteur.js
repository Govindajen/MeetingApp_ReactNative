import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const myAxios = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your actual API URL
    timeout: 10000, // Increased timeout for mobile networks
});

// Request interceptor
myAxios.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token'); // Get token from storage
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
myAxios.interceptors.response.use(
    async (response) => {
        // Save new token if returned in response
        if (response.data && response.data.token) {
            await AsyncStorage.setItem('token', response.data.token);
        }
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized, logging out...');
            await AsyncStorage.removeItem('token'); // Clear token on 401
            // You can navigate to the login screen if needed
        }
        return Promise.reject(error);
    }
);

export default myAxios;
