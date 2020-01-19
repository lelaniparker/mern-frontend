import React, { Fragment, useReducer } from "react";
import BlogPost from "../BlogPost/BlogPost"

const Blog = props => {
    const { blogPosts, loggedInUser } = props

    return(
        <Fragment>
            {blogPosts.map(post => (
                <BlogPost key={post._id} blogPost={post} loggedInUser={loggedInUser} />
            ))}
        </Fragment>
    )

}

export default Blog