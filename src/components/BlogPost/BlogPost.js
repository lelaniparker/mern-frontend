import React from "react";
import { Section, Heading } from "react-bulma-components";
import { Link } from "react-router-dom";

const BlogPost = props => {
    const { blogPost, loggedInUser } = props
    const { title, username, content, category, _id } = blogPost

    return (
        <Section>
            <Heading><Link to={`/blog/${_id}`}>{title}</Link></Heading>
            <p>Author: {username}</p>
            {category && <p>Category: {category}</p>}
            <p>{content}</p>
        </Section>
    )
}

export default BlogPost