import api from "../config/api"

export async function loginUser(userInfo) {
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