import React, { Fragment } from "react";
import BlogPost from "../BlogPost/BlogPost";
import { getBlogPost } from "../../services/blogServices"
import { Section } from "react-bulma-components"

// This blog component displays either all blog posts or a single blog post.
const Blog = props => {
    const { match, blogPosts, loggedInUser } = props
    // If the url for this component has an id, this line will assign the parameters to the ID variable
    const id = match ? match.params.id : null

    // assigns the blog posts to a variable - if there is an id then this variable is reassigned to be only the
    // posts that match the id.
	let posts = blogPosts
	if(id) {
        posts = getBlogPost(blogPosts, id)
	}

    // The return statement maps the single blog post/s, returning them/displaying them from the BlogPost component
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