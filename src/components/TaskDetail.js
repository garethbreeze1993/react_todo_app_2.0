import NavComponent from "./Navbar"
import HTTP404 from "./HTTP404";
import { fakeTaskObj } from './fakeData';
import { useParams } from "react-router-dom";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";


function TaskDetail() {
    let params = useParams();

    function getTask(id_) {
      return fakeTaskObj.items.find(
        (task) => task.id === id_
      );
    }

    let task = getTask(parseInt(params.taskID, 10)) || false;

    return (
        <main>
            <NavComponent />
            <Container>
                {task ?
                    <>
                    <CardGroup key={task.id}>
                <Card>
                      <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{task.deadline && task.deadline}</Card.Subtitle>
                        <Card.Text>
                            {task.description}
                        </Card.Text>
                          <Card.Text>
                          {task.completed ? "Completed" : "Not Completed"}
                        </Card.Text>
                      </Card.Body>
                </Card>
                    </CardGroup>
                    <Button variant="danger">Delete</Button> {!task.completed && <Button variant="success">Complete Task</Button>}
                    </>
                    : <HTTP404 />}
            </Container>
        </main>
   );
}

export default TaskDetail;