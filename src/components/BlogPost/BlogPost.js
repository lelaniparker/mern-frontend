import React from "react";
import { Heading, Box } from "react-bulma-components";
import { Link } from "react-router-dom";

// BlogPost component displays a single blog post.
const BlogPost = props => {
    const { blogPost } = props
    // Gets the variables out from the blogPost object that was passed in as props.
    const { title, username, content, category, _id } = blogPost

    // There is a link to the individual blog post, that uses the id of the blog post.
    // Category is only displayed if there is one. 
    return (
        <Box>
            <Heading><Link to={`/blog/${_id}`}>{title}</Link></Heading>
            <p>Author: {username}</p>
            {category && <p>Category: {category}</p>}
            <br></br>
            <p>{content}</p>
        </Box>
    )
}

export default BlogPost