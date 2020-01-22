import api from "../config/api"

//  authServices makes api requests to do with the authorization on the website

//  This makes an api request to the server to login the user. The userInfo is passed in. If there is an error, the error is caught and then thrown.
export const loginUser = async (userInfo) => {
    try {
        const response = await api.post("/auth/login", userInfo)
        console.log("got user back from server", response)
        return response.data
    }
    catch(error){
        console.log("error: ", error)
        throw(error)
    }
}

// Logout user api request. Logs out the user
export const logoutUser = async () => {
    try {
        return api.get("/auth/logout")
    }
    catch (error) {
        console.log("an error occurred logging out", error)
        throw(error)
    }
}

// Register user post api request.
export const registerUser = async (userInfo) => {
    try {
        const response = await api.post("/auth/register", userInfo)
        console.log("got user back from server", response)
        return response.data
    }
    catch (error) {
        console.log("got error", error)
        throw(error)
    }
}

// Checks if the user is authenticated if the browser refreshes or if the user comes to the website and still has a valid session. 
export const userAuthenticated = async () => {
    try {
        const response =  await api.get("/auth/user")
        return response
    }
    catch(error) {
        console.log("an error occurred checking for authenticated user:", error)
        throw(error)
    }
}