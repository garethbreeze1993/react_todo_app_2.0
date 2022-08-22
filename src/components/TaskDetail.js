import NavComponent from "./Navbar"
import HTTP404 from "./HTTP404";
import { useParams } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";


function TaskDetail() {
    const axios = require('axios').default;
    let params = useParams();
    let navigate = useNavigate();
    const [task, setTask] = React.useState({});
    const [error, setError] = React.useState(false);
    const [banner, setBanner] = React.useState(false);
    const [bannerMsg, setBannerMsg] = React.useState(false);
    const [bannerLvl, setBannerLvl] = React.useState('');

    let taskId = parseInt(params.taskID, 10) || false;

    React.useEffect(() => {
        axios.get(`http://127.0.0.1:8000/tasks/${taskId}`)
            .then(function (response) {
                setTask(response.data)
                console.log(response)
            })
            .catch(function (error) {
                if(error.response.status === 404){
                    setTask(false);
                }else {
                    setError(true)
                }
                console.log(error)
            })
    }, [axios, taskId])

    function handleComplete () {
        axios.put(`http://127.0.0.1:8000/tasks/complete/${taskId}`, {"completed": true})
            .then(function (response) {
                setTask(response.data);
                setBanner(true);
                setBannerMsg('Task is now complete')
                setBannerLvl("success")
            })
            .catch(function (error) {
                console.log(error)
                setBanner(true);
                setBannerMsg('Unable to complete contact the system administrator')
                setBannerLvl("danger")
            })
    }

    function handleDelete () {
        axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`)
            .then(function (response) {
                navigate("/", { state: { deleteObj: true } });
            })
            .catch(function (error) {
                console.error(error)
                setBanner(true);
                setBannerMsg('Unable to delete contact the system administrator')
                setBannerLvl("danger")
        })
    }

    const taskFound = task ?
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
                    <Button variant="danger" onClick={handleDelete}>Delete</Button> {!task.completed
                    && <Button variant="success" onClick={handleComplete}>Complete Task</Button>}
                    </>
                    : <HTTP404 />

    return (
        <main>
            <NavComponent />
            <Container>
                {banner && <Alert variant={bannerLvl}>{bannerMsg}</Alert>}
                {!error && taskFound}
                {error && <h4>Error when connecting to server please try again later!</h4>}
            </Container>
        </main>
   );
}

export default TaskDetail;