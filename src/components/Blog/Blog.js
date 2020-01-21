import React, { Fragment, useReducer } from "react";
import BlogPost from "../BlogPost/BlogPost";
import { getBlogPost } from "../../services/blogServices"
import { Section,Heading } from "react-bulma-components"


const Blog = props => {
	const { match, blogPosts, loggedInUser } = props
    const id = match ? match.params.id : null

	let posts = blogPosts
	if(id) {
        posts = getBlogPost(blogPosts, id)
	}

    return(
        <Fragment>
            <Section>
            {posts.map(post => (
                <BlogPost key={post._id} blogPost={post} loggedInUser={loggedInUser} />
            ))}
            </Section>
        </Fragment>
    )

}

export default Blog