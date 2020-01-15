import React from "react";
import { Section, Heading } from "react-bulma-components";

const BlogPost = props => {
    const { blogPost } = props
    const { title, username, content, category } = blogPost

    return (
        <Section>
            <Heading>{title}</Heading>
            <p>{username}</p>
            {category && <p>Category: {category}</p>}
            <p>{content}</p>
        </Section>
    )
}

export default BlogPost