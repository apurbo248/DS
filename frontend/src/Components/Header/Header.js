import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/UserAction";


const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userinfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/")
  };

  useEffect(() => {}, [userinfo]);
  return (
    <div>
      <Navbar bg="" expand="lg" style={{ backgroundColor: "#28FFBF" }}>
        <Container>
          <Navbar.Brand href="/">
            <Link to="/">Digital School</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userinfo ? (
                <div>
                  <Nav.Link>
                    <Link to="/mynotes">My notes</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/profile">Profile</Link>
                  </Nav.Link>
                  <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.2">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <div>
                  <Nav.Link>
                    <Link to="/login">Login</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/registration">Registration</Link>
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
