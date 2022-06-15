import Nav from "./Navbar"
import HTTP404 from "./HTTP404";
import { fakeTaskObj } from './fakeData';
import { useParams } from "react-router-dom";
import React from "react";

function TaskDetail() {
    let params = useParams();

    function getTask(id_) {
      return fakeTaskObj.items.find(
        (task) => task.id === id_
      );
    }

    let task = getTask(parseInt(params.taskID, 10)) || false;

    console.log(task)

    return (
        <main>
            <Nav />
            {task ?
                <div><h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>{task.deadline && task.deadline}</p>
                <p>{task.completed ? "Completed" : "Not Completed"}</p>
                <h2>Task user =  {task.owner.email}</h2></div>
                : <HTTP404 />}
        </main>
   );
}

export default TaskDetail;