import api from '../config/api';

// gets user details from the server with a userId
export const retrieveUser = async (userId) => {
    try {
        const url = `user/${userId}`;
        return await api.get(url);
    }
    catch (error) {
        console.log("an error occurred trying to get a user");
        throw(error);
    }
}

// Api request to update the user details
export const putUser = async (userInfo) => {
    try {
        const url = `/${userInfo._id}`;
        const response = await api.put(url, userInfo);
        console.log("updated user info, response from server:", response)
        return response.data
    }
    catch(error) {
        console.log("error updating user: ", error);
        throw(error);
    }
}