import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import AllBlogs from "./Pages/AllBlogs";
import SingleBlog from "./Pages/SingleBlog";
import Form from "./Pages/Form";

function App(props) {
  const url = "https://blogsai-628-cj.herokuapp.com/blogs/";
  const [blog, setBlog] = useState([]);
  const nullBlog = {
    title: "",
    body: "",
  };
  const [targetBlog, setTargetBlog] = useState(nullBlog);

  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setBlog(data);
  };
  useEffect(() => {
    getBlogs();
  }, []);

  const addBlogs = async (newBlog) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    getBlogs();
  };

  const getTargetBlog = (blog) => {
    setTargetBlog(blog);
    props.history.push("/edit");
  };

  const updateBlog = async (blog) => {
    const response = await fetch(url + blog.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    getBlogs();
  };
  const deleteBlog = async (blog) => {
    const response = await fetch(url + blog.id + "/", {
      method: "delete",
    });
    getBlogs();
    props.history.push("/");
  };

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
  };
  return (
    <div className="App">
      <h1 style={h1}>Christopher Test Blog</h1>
      <Link to="/new">
        <button style={button}>Create New Blog</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllBlogs {...routerProps} blog={blog} />}
        />

        <Route
          exact
          path="/blogs/:id"
          render={(routerProps) => (
            <SingleBlog
              {...routerProps}
              blogs={blog}
              edit={getTargetBlog}
              deleteBlog={deleteBlog}
            />
          )}
        />

        <Route
          exact
          path="/new"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialBlog={nullBlog}
              handleSubmit={addBlogs}
              buttonLabel="create blog"
            />
          )}
        />

        <Route
          exact
          path="/edit"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialBlog={targetBlog}
              handleSubmit={updateBlog}
              buttonLabel="updateblog"
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
