import { fakeTaskObj } from './fakeData';

import React from "react"

export default function Home() {
    const [taskObj, setTaskObj] = React.useState(fakeTaskObj.items);
    const [completedTasks, setCompletedTasks] = React.useState(0)

    React.useEffect(() => {
        taskObj.forEach((task) => {
            console.log('ll')
            if(task.completed){
                setCompletedTasks(prevCompletedTasks => prevCompletedTasks + 1)
            }
        })
        return () => setCompletedTasks(0) // Using React Strict Mode renders component twice so after component unmounts set back to zero to avoid bug of doubling number of completed tasks
    }, [taskObj])
    const tasks = taskObj.map((task) => {
        return <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.deadline && task.deadline}</p>
            <p>{task.completed ? "Completed" : "Not Completed"}</p>
        </div>
    })
    return (
        <section>
            <h1>Test</h1>
            {tasks}
            <p>You have {fakeTaskObj.total} tasks in total of which {completedTasks} are completed</p>
        </section>
    )
}
