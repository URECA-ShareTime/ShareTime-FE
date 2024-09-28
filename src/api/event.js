import axios from "axios";

export const getAllEvents = async () => {
    try {
        const response = await axios.get('http://localhost:8080/main/events');
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        console.log('get success: ', response.data);
        return response.data;
    } catch (error) {
        console.error('get failed: ', error);
        return [];
    }
}

export const createEvent = async (event) => {
    try {
        const response = await axios.post('http://localhost:8080/main/events', event);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        console.log('post success: ', response.data);
        return response.data;
    } catch (error) {
        console.error('post failed: ', error);
        return [];
    }
}