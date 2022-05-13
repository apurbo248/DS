import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/UserAction";

const Login = () => {
  const history= useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userinfo } = userLogin;

  useEffect(() => {
    if (userinfo) {
      history.push("/mynotes");
    }
  }, [history, userinfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="mt-5">
      <Container>
        <h2>Login</h2>
        {error && <Alert variant={"danger"}>{error}</Alert>}
        {loading && <Spinner animation="border" />}
        <Form className="container mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Log in
          </Button>
          <h6>
            New Customer ? <Link to="/registration">Register Here</Link>
          </h6>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
