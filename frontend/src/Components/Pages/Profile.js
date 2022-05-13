import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userinfo } = userLogin;

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{userinfo.name}</Card.Title>
          <Card.Text>{userinfo.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
