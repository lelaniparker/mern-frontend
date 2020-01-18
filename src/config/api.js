import axios from 'axios'

const deployedServer = "https://analyzevit-back.herokuapp.com/"

// Create an axios instance
export default axios.create({
    // baseURL: 'http://localhost:3009',
    baseURL: deployedServer || 'http://localhost:3009',

    withCredentials: true
})