import React from 'react';
import Blog from '../Componets/blog';

const AllBlogs = (props) => {
    return props.blog.map((blog) => <Blog blog={blog} key ={blog.id}/>)
    
}

export default AllBlogs
