import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // useEffect(() => {
  //   console.log(post);
  // },[post]);

  const handleClick = (event) => {
    event.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      navigate("/posts");
  };

  return (
    <div className="text-center px-5">
      <h1>Create a post</h1>
      <Form>
        <FormGroup>
          <FormControl
            className="mb-2"
            name="title"
            value={post.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <FormControl
            className="mb-2"
            name="description"
            value={post.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </FormGroup>
      </Form>
      <Button variant="outline-dark" onClick={handleClick}>
        CREATE POST
      </Button>
      &nbsp;
      <Button variant="outline-dark" onClick={() => navigate(-1)}>
        BACK
      </Button>
    </div>
  );
}

export default CreatePost;
