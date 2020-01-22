import axios from 'axios'

// This file sets our default axios api call. This constant is a link to our server that has been deployed
const deployedServer = "https://analyzevit-back.herokuapp.com/"

// Create an axios instance
export default axios.create({
    // If our deployedServer can not be reached it will default to the local host. For cors, it sends with credentials
    baseURL: deployedServer || 'http://localhost:3009',
    withCredentials: true
})