import React from "react";
import { Button, Card } from "react-bootstrap";
import notes from "../Header/data/notes";
const Mynotes = () => {
  return (
    <div class="container">
      <h2>Wellcome to my notes</h2>

      {notes.map((note) => (
        <Card>
          <Card.Body className="d-flex ">
            <Card.Title className=" mr-4">{note.title}</Card.Title>

            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Mynotes;
