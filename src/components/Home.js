import { fakeTaskObj } from './fakeData';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Pagination from "react-bootstrap/Pagination";
import React from "react"
import CardGroup from "react-bootstrap/CardGroup";

export default function Home() {
    const [taskObj, setTaskObj] = React.useState(fakeTaskObj.items);
    const [completedTasks, setCompletedTasks] = React.useState(0)

    // url = {{URL}}tasks?page=1&size=25
    // Get total and size from API request to determine how many pages needed
    // Hardcode for now to implement frontend

    const total = 4;
    const size = 2;

    function calculateNoOfPages(total, size){
       let pages = total / size
       if(pages < 1){
           return 1
       }
       else if(! Number.isInteger(pages)){
           return Math.ceil(pages)
       }else{
           return pages
       }
    }

    const numberOfPages = calculateNoOfPages(total, size)



    React.useEffect(() => {
        taskObj.forEach((task) => {
            if(task.completed){
                setCompletedTasks(prevCompletedTasks => prevCompletedTasks + 1)
            }
        })
        return () => setCompletedTasks(0) // Using React Strict Mode renders component twice so after component unmounts set back to zero to avoid bug of doubling number of completed tasks
    }, [taskObj])

    let active = 1;
    let items = [];
    for (let number = 1; number <= numberOfPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }

    const tasks = taskObj.map((task) => {
        return <CardGroup key={task.id}>
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
                    <Card.Link href={`/tasks/${task.id}`}>More Details</Card.Link>
                  </Card.Body>
            </Card>
                </CardGroup>
    })
    return (
        <section>
            <Container>
                <h1>Tasks</h1>
                {tasks}
                <p>You have {fakeTaskObj.total} tasks in total of which {completedTasks} are completed</p>
                <Pagination>{items}</Pagination>
            </Container>
        </section>
    )
}
