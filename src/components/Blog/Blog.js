import React, { Fragment, useReducer } from "react";
import BlogPost from "../BlogPost/BlogPost";
import Axios from "axios";
import stateReducer from "../../config/stateReducer";
import { getAllBlogPosts } from "../../services/blogServices"

const Blog = () => {
    const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, [])

    return(
        <Fragment>
            {blogPosts.map(post => (
                <BlogPost key={post._id} blogPost={post} />
            ))}
        </Fragment>
    )

}

export default Blog