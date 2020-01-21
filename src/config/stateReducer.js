export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return action.data
        }
        case "setLoginError": {
            return action.data
        }
        case "setBlogPosts": {
            return action.data
        }
        case "setUserDetails": {
            return action.data
        }
        default:
            return state
    }
}