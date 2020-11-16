import React, {useState} from "react";
import {TasksType, FilterValuesType} from './App'
import './App.css';

type PropsTypeToDoList = {
    id: string
    title: string
    tasks: Array<TasksType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID:string, isDone:boolean, todoListID: string) => void
    filter:FilterValuesType
    removeTodoList: (todoListID: string) => void
}

function ToDoList(props: PropsTypeToDoList) {

    const [title, setTitle] = useState <string> ('')
    const [error, setError] = useState <string | null> (null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle, props.id)
            setTitle("")
        } else {
            setError('Title is required!')

        }
        setTitle("")
    }


    return (
        <div>
            <h3>{props.title}<button onClick={() => props.removeTodoList(props.id)}>X</button></h3>
            <div>
                <input value={title}
                       onChange={(event) => {
                           setTitle(event.currentTarget.value)
                       }}
                       onKeyPress={(event) => {
                           if (event.key === 'Enter') addTask()
                       }}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : '' }>
                                <input type="checkbox" checked={task.isDone} onChange={(e) => {props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}}/>
                                <span>{task.title}</span>
                                <button onClick={() => {
                                    props.removeTask(task.id, props.id)
                                }}>X
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => {
                    props.changeFilter("all", props.id)
                }}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => {
                    props.changeFilter("active", props.id)
                }}>Active
                </button>
                <button className={props.filter ==='completed' ? 'active-filter': ''} onClick={() => {
                    props.changeFilter("completed", props.id)
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList