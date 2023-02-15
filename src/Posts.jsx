import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({});

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updatePost = (post) => {
    setUpdatedPost(post);
    handleShow();
  };

  const handleChange = (event) => {

    const {name, value} = event.target;

    setUpdatedPost((prev) => {
        return{
            ...prev,
            [name]: value,
        }
    })
  }

  const saveUpdatedPost = () => {
    axios.put(`/update/${updatedPost._id}`, updatedPost)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

    handleClose();
    window.location.reload();
}

  return (
    <div className="text-center p-5">
      <h1>Posts Page</h1>
      <Button onClick={() => navigate(-1)}>BACK</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              placeholder="Title"
              name="title"
              value={updatedPost.title ? updatedPost.title : ""}
              onChange={handleChange}
            />
            <br />
            <Form.Control
              placeholder="Description"
              name="description"
              value={updatedPost.description ? updatedPost.description : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {posts.map((post) => {
        return (
          <div className="card m-2" key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <Button
              className="display-inline"
              variant="outline-info"
              onClick={() => updatePost(post)}
            >
              UPDATE
            </Button>
            <Button
              className="display-inline"
              variant="outline-danger"
              onClick={() => deletePost(post._id)}
            >
              DELETE
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
