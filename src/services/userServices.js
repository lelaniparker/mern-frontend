import api from '../config/api';

export const retrieveUser = async (userId) => {
    try {
        const url = `/${userId}`;
        return await api.get(url);
    }
    catch (error) {
        console.log("an error occurred trying to get a user");
        throw(error);
    }
}

export const postUser = async (userInfo) => {
    try {
        const url = `/${userInfo._id}`;
        const response = await api.post(url, userInfo);
        console.log("updated user info, response from server:", response)
        return response.data
    }
    catch(error) {
        console.log("error updating user: ", error);
        throw(error);
    }
}