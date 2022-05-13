import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Actions/UserAction";

const Registration = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://www.google.com/search?q=user+picture&source=lnms&tbm=isch&sa=X&ved=2ahUKEwixxp7XlcHzAhW9uksFHUxyD7QQ_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1#imgrc=4C9OujEfKWS37M"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, userinfo } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userinfo) {
      history.push("/mynotes");
    }
  }, [history, userinfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords does not match");
    } else dispatch(register(name, email, password, pic));
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Digital_School");
      data.append("cloud_name", "apurbo");
      fetch("https://api.cloudinary.com/v1_1/apurbo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <div className="mt-5">
      <Container>
        <h2>Registration</h2>
        {error && <Alert variant={"danger"}>{error}</Alert>}
        {message && <Alert variant={"danger"}>{message}</Alert>}
        {loading && <Spinner animation="border" />}
        <Form className="container mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 w-50">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="input"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={confirmpassword}
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && <Alert variant="danger">{picMessage}</Alert>}

          <Form.Group className="mb-3 w-50">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Registration
          </Button>
          <h6>
            Have an account ? <Link to="/login">Login</Link>
          </h6>
        </Form>
      </Container>
    </div>
  );
};

export default Registration;
