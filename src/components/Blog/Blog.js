import React, { Fragment, useReducer } from "react";
import BlogPost from "../BlogPost/BlogPost";
import Axios from "axios";
import stateReducer from "../../config/stateReducer";

const Blog = () => {
    const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null)
    const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, [])

    function notLoaded() {
        return(
            <Fragment>
                Loading...
            </Fragment>
        )
    }

    function loaded() {
        return(
            <Fragment>
                {blogPosts.map(post => (
                    <BlogPost key={post._id} blogPost={post} />
                ))}
            </Fragment>
        )
    }

    return(
        <Fragment>

        </Fragment>
    )

}




// export class Blog extends React.Component {
//     constructor(props) {
//         super(props)
//         this.mounted = false;
//         this.state = {
//             loggedInUser: null,
//             blogPosts: []
//         }
//     }

//     componentDidMount() {
//         Axios.request({
//             url: 'https://analyzevit-back.herokuapp.com/posts',
//         })
//             .then(response => {
//                 this.mounted = true;
//                 this.setState({
//                     blogPosts: response.data
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     componentWillUnmount() {
//         this.mounted = false;
//     }

//     renderBlog() {
//         const { blogPosts } = this.state
//         if (this.state.blogPosts.length === 0) {
//             return (
//                 <Fragment>
//                     Let's put a loading spinner in here
//                 </Fragment>
//             )
//         } else {
//             return(
//                 <Fragment>
//                     {blogPosts.map(post => (
//                         <BlogPost key={post._id} blogPost={post} />
//                     ))}
//                 </Fragment>
//             )
//         }
//     }

//     render(){
//         return(
//             <Fragment>
//                 {this.renderBlog()}
//             </Fragment>
//         )
//     }

// }

export default Blog