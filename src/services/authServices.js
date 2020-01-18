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

export async function logoutUser() {
    try {
        return api.get("/auth/logout")
    }
    catch (error) {
        console.log("an error occurred logging out", error)
        throw(error)
    }
}

export async function registerUser(userInfo) {
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