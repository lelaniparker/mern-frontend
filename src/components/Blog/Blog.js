import React, { Fragment, useReducer } from "react";
import BlogPost from "../BlogPost/BlogPost";
import { getBlogPost } from "../../services/blogServices"

const Blog = props => {
	const { match, blogPosts, loggedInUser } = props
    const id = match ? match.params.id : null

	let posts = blogPosts
	if(id) {
        posts = getBlogPost(blogPosts, id)
	}

    return(
        <Fragment>
            {posts.map(post => (
                <BlogPost key={post._id} blogPost={post} loggedInUser={loggedInUser} />
            ))}
        </Fragment>
    )

}

export default Blog