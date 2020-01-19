import api from "../config/api"

export const getBlogPost = (blogPosts, id) => {
    return blogPosts.filter(post => post._id === id)
}

// Gets all blog posts from the server
export const getAllBlogPosts = async () => {
  try {
      const response = await api.get("/posts")
      return response.data
  } catch (error) {
      console.log("got an error from the server fetching blog posts:", error)
      throw(error)
  }
}