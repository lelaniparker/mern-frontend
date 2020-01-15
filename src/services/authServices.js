import api from "../config/api"

export async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    try {
        const response = await api.post("/auth/login", userInfo)
        console.log("got user back from server", response) 
        return response.data
    }
    catch(error){
        console.log("got error", error)
        throw(error)
    }
  }