import axios from 'axios';

const API_URL = 'https://6615df8fb8b8e32ffc7c0e13.mockapi.io/books';

export const fetchBooks = async (query: string) => {
    try {
        const response = await axios.get(`${API_URL}?search=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};